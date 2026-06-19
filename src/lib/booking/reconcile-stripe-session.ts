import { reconcileStripeCheckoutPayment } from "@/lib/booking/reconcile-stripe-payment";
import { BOOKING_STATUS } from "@/lib/booking/status";
import { db } from "@/lib/db";
import { bookings, type Booking } from "@/lib/db/schema";
import { getStripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import type { ReconcileStripeResult } from "@/lib/booking/reconcile-stripe-payment";

export type { ReconcileStripeResult };

/** Reconcile a booking using the Stripe Checkout session id from the success redirect. */
export async function reconcileByCheckoutSessionId(
  sessionId: string,
  source: string,
): Promise<ReconcileStripeResult> {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const bookingId = session.metadata?.booking_id;
  if (!bookingId) {
    return { ok: false, error: "Stripe session has no booking id." };
  }

  const rows = await db()
    .select()
    .from(bookings)
    .where(eq(bookings.id, bookingId))
    .limit(1);
  const booking = rows[0];
  if (!booking) {
    return { ok: false, error: "Booking not found for Stripe session." };
  }

  return reconcileStripeCheckoutPayment(booking, session, source);
}

/** Reconcile a pending booking by re-checking its stored Stripe Checkout session. */
export async function reconcilePendingStripeBooking(
  booking: Booking,
  source: string,
): Promise<ReconcileStripeResult | null> {
  if (booking.status !== BOOKING_STATUS.PENDING_CHECKOUT) {
    return null;
  }
  if (!booking.stripeSessionId) {
    return null;
  }
  if (booking.duffelOrderId) {
    return {
      ok: true,
      alreadyConfirmed: true,
      bookingReference: booking.duffelBookingRef,
    };
  }

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(
    booking.stripeSessionId,
  );
  return reconcileStripeCheckoutPayment(booking, session, source);
}
