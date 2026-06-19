import { reconcileStripeCheckoutPayment } from "@/lib/booking/reconcile-stripe-payment";
import { BOOKING_STATUS } from "@/lib/booking/status";
import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { getStripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

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

  const needsReconcile =
    booking.status === BOOKING_STATUS.PENDING_CHECKOUT ||
    ((booking.status === BOOKING_STATUS.PAID ||
      booking.status === BOOKING_STATUS.FAILED) &&
      !booking.duffelOrderId);

  if (!needsReconcile) {
    return NextResponse.json({ received: true });
  }

  await reconcileStripeCheckoutPayment(
    booking,
    session,
    "/api/webhooks/stripe",
  );

  return NextResponse.json({ received: true });
}
