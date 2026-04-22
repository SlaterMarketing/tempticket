import { logBookingEvent } from "@/lib/booking/log";
import { BOOKING_STATUS } from "@/lib/booking/status";
import { trackInternalEventSafe } from "@/lib/analytics/track";
import { createDuffelOrderForBooking } from "@/lib/booking/finalize";
import { db } from "@/lib/db";
import { bookings, type Booking } from "@/lib/db/schema";
import { getStripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

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

export async function POST(req: Request) {
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!whSecret) {
    console.error("STRIPE_WEBHOOK_SECRET missing");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, whSecret);
  } catch (err) {
    console.error("Stripe webhook signature failed", err);
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const bookingId = session.metadata?.booking_id;
  if (!bookingId) {
    return NextResponse.json({ received: true });
  }

  const rows = await db()
    .select()
    .from(bookings)
    .where(eq(bookings.id, bookingId))
    .limit(1);
  const booking = rows[0];
  if (!booking) {
    return NextResponse.json({ received: true });
  }

  if (
    booking.stripeSessionId &&
    booking.stripeSessionId !== session.id
  ) {
    return NextResponse.json({ received: true });
  }

  if (booking.status !== BOOKING_STATUS.PENDING_CHECKOUT) {
    return NextResponse.json({ received: true });
  }

  await db()
    .update(bookings)
    .set({
      status: BOOKING_STATUS.PAID,
      stripePaymentStatus: "paid",
      updatedAt: new Date(),
    })
    .where(eq(bookings.id, bookingId));

  await logBookingEvent({ id: bookingId }, "stripe_paid", {
    session_id: session.id,
  });

  const ac = analyticsContextFromBooking(booking);
  void trackInternalEventSafe({
    name: "checkout_completed",
    visitorId: ac.visitorId,
    sessionId: ac.sessionId,
    userId: ac.userId,
    path: "/api/webhooks/stripe",
    payload: {
      booking_id: bookingId,
      stripe_session_id: session.id,
    },
  });

  await createDuffelOrderForBooking(
    { ...booking, status: BOOKING_STATUS.PAID },
    "/api/webhooks/stripe",
  );

  return NextResponse.json({ received: true });
}
