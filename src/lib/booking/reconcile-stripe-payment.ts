import { logBookingEvent } from "@/lib/booking/log";
import { BOOKING_STATUS } from "@/lib/booking/status";
import { trackInternalEventSafe } from "@/lib/analytics/track";
import { createDuffelOrderForBooking } from "@/lib/booking/finalize";
import { db } from "@/lib/db";
import { bookings, type Booking } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
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
  | { ok: false; error: string };

/**
 * Marks a booking paid from a completed Stripe Checkout session and creates the
 * Duffel order when needed. Shared by the Stripe webhook and checkout return.
 */
export async function reconcileStripeCheckoutPayment(
  booking: Booking,
  session: Stripe.Checkout.Session,
  source: string,
): Promise<ReconcileStripeResult> {
  if (session.payment_status !== "paid") {
    return { ok: false, error: "Stripe checkout is not paid yet." };
  }

  if (booking.stripeSessionId && booking.stripeSessionId !== session.id) {
    return { ok: false, error: "Stripe session does not match this booking." };
  }

  if (booking.duffelOrderId) {
    return {
      ok: true,
      alreadyConfirmed: true,
      bookingReference: booking.duffelBookingRef,
      bookingId: booking.id,
    };
  }

  if (booking.status === BOOKING_STATUS.CONFIRMED) {
    return {
      ok: true,
      alreadyConfirmed: true,
      bookingReference: booking.duffelBookingRef,
      bookingId: booking.id,
    };
  }

  if (
    booking.status !== BOOKING_STATUS.PENDING_CHECKOUT &&
    booking.status !== BOOKING_STATUS.PAID &&
    booking.status !== BOOKING_STATUS.FAILED &&
    booking.status !== BOOKING_STATUS.DUFFEL_PROCESSING
  ) {
    return {
      ok: false,
      error: `Cannot reconcile a booking in status "${booking.status}".`,
    };
  }

  let working = booking;

  if (booking.status === BOOKING_STATUS.PENDING_CHECKOUT) {
    await db()
      .update(bookings)
      .set({
        status: BOOKING_STATUS.PAID,
        stripePaymentStatus: "paid",
        stripeSessionId: session.id,
        updatedAt: new Date(),
      })
      .where(eq(bookings.id, booking.id));

    await logBookingEvent({ id: booking.id }, "stripe_paid", {
      session_id: session.id,
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

    working = {
      ...booking,
      status: BOOKING_STATUS.PAID,
      stripePaymentStatus: "paid",
      stripeSessionId: session.id,
    };
  }

  const result = await createDuffelOrderForBooking(working, source);
  if (!result.ok) {
    return { ok: false, error: result.message };
  }

  return {
    ok: true,
    alreadyConfirmed: false,
    bookingReference: result.order.booking_reference ?? null,
    bookingId: booking.id,
  };
}
