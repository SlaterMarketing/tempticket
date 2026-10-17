import { logBookingEvent } from "@/lib/booking/log";
import { BOOKING_STATUS } from "@/lib/booking/status";
import { trackInternalEventSafe } from "@/lib/analytics/track";
import { createDuffelOrderForBooking } from "@/lib/booking/finalize";
import {
  alertAdminAboutBooking,
  sendBookingFailedEmail,
} from "@/lib/booking/notify";
import { db } from "@/lib/db";
import { bookings, type Booking } from "@/lib/db/schema";
import { getStripe } from "@/lib/stripe";
import { and, eq, inArray, isNull, lt, or } from "drizzle-orm";
import type Stripe from "stripe";

function analyticsContextFromBooking(b: Booking) {
  const meta = (b.metadata ?? {}) as Record<string, unknown>;
  return {
    visitorId:
      typeof meta.analyticsVisitorId === "string"
        ? meta.analyticsVisitorId
        : null,
    sessionId:
      typeof meta.analyticsSessionId === "string"
        ? meta.analyticsSessionId
        : null,
    userId: b.userId,
  };
}

export type ReconcileStripeResult =
  | {
      ok: true;
      alreadyConfirmed: boolean;
      bookingReference: string | null;
      bookingId: string;
    }
  | {
      ok: false;
      error: string;
      bookingId?: string;
      /** Another request is already creating the reservation. */
      inProgress?: boolean;
      /** Fulfilment failed and the card authorization was released (customer not charged). */
      failed?: boolean;
    };

/** A claim older than this is assumed to belong to a request that died mid-fulfilment. */
const STALE_PROCESSING_MS = 10 * 60 * 1000;

function isStaleProcessing(booking: Booking): boolean {
  return (
    booking.status === BOOKING_STATUS.DUFFEL_PROCESSING &&
    Date.now() - booking.updatedAt.getTime() > STALE_PROCESSING_MS
  );
}

type PaymentState =
  | { kind: "authorized"; paymentIntentId: string }
  | { kind: "captured"; paymentIntentId: string | null }
  | { kind: "unpaid" };

/**
 * New checkouts authorize only (manual capture); sessions created before that
 * change were captured immediately and report `payment_status: "paid"`.
 */
async function paymentStateForSession(
  session: Stripe.Checkout.Session,
): Promise<PaymentState> {
  const piId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : (session.payment_intent?.id ?? null);
  if (session.payment_status === "paid") {
    if (piId) {
      const pi = await getStripe().paymentIntents.retrieve(piId);
      if (pi.status === "requires_capture") {
        return { kind: "authorized", paymentIntentId: piId };
      }
    }
    return { kind: "captured", paymentIntentId: piId };
  }
  if (!piId || session.status !== "complete") return { kind: "unpaid" };
  const pi = await getStripe().paymentIntents.retrieve(piId);
  if (pi.status === "requires_capture") {
    return { kind: "authorized", paymentIntentId: piId };
  }
  if (pi.status === "succeeded") {
    return { kind: "captured", paymentIntentId: piId };
  }
  return { kind: "unpaid" };
}

function confirmedResult(booking: Booking): ReconcileStripeResult {
  return {
    ok: true,
    alreadyConfirmed: true,
    bookingReference: booking.duffelBookingRef,
    bookingId: booking.id,
  };
}

/**
 * Fulfils a booking from a completed Stripe Checkout session: claims the
 * booking so only one caller proceeds, creates the Duffel order, then captures
 * the card (or releases the authorization if no reservation could be made).
 * Shared by the Stripe webhook, the checkout return page and account pages.
 */
export async function reconcileStripeCheckoutPayment(
  booking: Booking,
  session: Stripe.Checkout.Session,
  source: string,
): Promise<ReconcileStripeResult> {
  if (booking.stripeSessionId && booking.stripeSessionId !== session.id) {
    return { ok: false, error: "Stripe session does not match this booking." };
  }

  if (booking.duffelOrderId || booking.status === BOOKING_STATUS.CONFIRMED) {
    return confirmedResult(booking);
  }

  if (booking.status === BOOKING_STATUS.FAILED) {
    return {
      ok: false,
      error: booking.failureReason ?? "Booking failed.",
      bookingId: booking.id,
      failed: booking.stripePaymentStatus === "authorization_released",
    };
  }

  if (
    booking.status === BOOKING_STATUS.DUFFEL_PROCESSING &&
    !isStaleProcessing(booking)
  ) {
    return {
      ok: false,
      error: "Reservation is being created.",
      bookingId: booking.id,
      inProgress: true,
    };
  }

  if (
    booking.status !== BOOKING_STATUS.PENDING_CHECKOUT &&
    booking.status !== BOOKING_STATUS.PAID &&
    booking.status !== BOOKING_STATUS.DUFFEL_PROCESSING
  ) {
    return {
      ok: false,
      error: `Cannot reconcile a booking in status "${booking.status}".`,
    };
  }

  const payment = await paymentStateForSession(session);
  if (payment.kind === "unpaid") {
    return { ok: false, error: "Stripe checkout is not paid yet." };
  }

  const paymentStatus = payment.kind === "authorized" ? "authorized" : "paid";

  // Atomic claim: the webhook and the return page can arrive together.
  const claimed = await db()
    .update(bookings)
    .set({
      status: BOOKING_STATUS.DUFFEL_PROCESSING,
      stripePaymentStatus: paymentStatus,
      stripeSessionId: session.id,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(bookings.id, booking.id),
        isNull(bookings.duffelOrderId),
        or(
          inArray(bookings.status, [
            BOOKING_STATUS.PENDING_CHECKOUT,
            BOOKING_STATUS.PAID,
          ]),
          and(
            eq(bookings.status, BOOKING_STATUS.DUFFEL_PROCESSING),
            lt(bookings.updatedAt, new Date(Date.now() - STALE_PROCESSING_MS)),
          ),
        ),
      ),
    )
    .returning();
  const working = claimed[0];
  if (!working) {
    return {
      ok: false,
      error: "Reservation is being created.",
      bookingId: booking.id,
      inProgress: true,
    };
  }

  if (booking.status === BOOKING_STATUS.PENDING_CHECKOUT) {
    await logBookingEvent({ id: booking.id }, "stripe_paid", {
      session_id: session.id,
      payment: payment.kind,
      source,
    });

    const ac = analyticsContextFromBooking(booking);
    void trackInternalEventSafe({
      name: "checkout_completed",
      visitorId: ac.visitorId,
      sessionId: ac.sessionId,
      userId: ac.userId,
      path: source,
      payload: {
        booking_id: booking.id,
        stripe_session_id: session.id,
        reconciled: true,
      },
    });
  }

  const result = await createDuffelOrderForBooking(working, source);

  if (!result.ok) {
    let released = false;
    if (payment.kind === "authorized") {
      try {
        await getStripe().paymentIntents.cancel(payment.paymentIntentId);
        await db()
          .update(bookings)
          .set({
            stripePaymentStatus: "authorization_released",
            updatedAt: new Date(),
          })
          .where(eq(bookings.id, booking.id));
        released = true;
        await logBookingEvent({ id: booking.id }, "stripe_authorization_released", {
          payment_intent: payment.paymentIntentId,
        });
        if (working.customerEmail) {
          await sendBookingFailedEmail(booking.id, working.customerEmail);
        }
        await alertAdminAboutBooking(
          booking.id,
          "Booking failed (customer not charged)",
          `Duffel could not create the reservation, so the card authorization was released.\n\n${result.message}`,
        );
      } catch (err) {
        console.error("Stripe authorization cancel failed", err);
        await alertAdminAboutBooking(
          booking.id,
          "Booking failed and the card hold could not be released",
          `Duffel error: ${result.message}\nStripe error: ${err instanceof Error ? err.message : String(err)}\nCancel payment ${payment.paymentIntentId} in Stripe.`,
        );
      }
    } else {
      await alertAdminAboutBooking(
        booking.id,
        "Booking failed after payment (refund or retry needed)",
        result.message,
      );
    }
    return {
      ok: false,
      error: result.message,
      bookingId: booking.id,
      failed: released,
    };
  }

  if (payment.kind === "authorized") {
    try {
      await getStripe().paymentIntents.capture(payment.paymentIntentId);
      await db()
        .update(bookings)
        .set({ stripePaymentStatus: "paid", updatedAt: new Date() })
        .where(eq(bookings.id, booking.id));
      await logBookingEvent({ id: booking.id }, "stripe_captured", {
        payment_intent: payment.paymentIntentId,
      });
    } catch (err) {
      console.error("Stripe capture failed", err);
      await logBookingEvent({ id: booking.id }, "stripe_capture_failed", {
        message: err instanceof Error ? err.message : String(err),
      });
      await alertAdminAboutBooking(
        booking.id,
        "Reservation made but payment capture failed",
        `Capture payment ${payment.paymentIntentId} in Stripe.\n${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  return {
    ok: true,
    alreadyConfirmed: false,
    bookingReference: result.order.booking_reference ?? null,
    bookingId: booking.id,
  };
}
