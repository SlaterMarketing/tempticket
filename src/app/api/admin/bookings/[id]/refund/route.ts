import { isAdminEmail } from "@/lib/auth/admin";
import { getSession } from "@/lib/auth/session";
import { logBookingEvent } from "@/lib/booking/log";
import { BOOKING_STATUS } from "@/lib/booking/status";
import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { getStripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session || !isAdminEmail(session.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const rows = await db()
    .select()
    .from(bookings)
    .where(eq(bookings.id, id))
    .limit(1);
  const booking = rows[0];
  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  if (!booking.stripeSessionId) {
    return NextResponse.json(
      { error: "Booking has no Stripe session to refund." },
      { status: 409 },
    );
  }

  if (
    booking.stripePaymentStatus === "refunded" ||
    booking.status === BOOKING_STATUS.CANCELLED
  ) {
    return NextResponse.json(
      { error: "Booking is already refunded." },
      { status: 409 },
    );
  }

  if (booking.duffelOrderId) {
    return NextResponse.json(
      {
        error:
          "Duffel order exists on this booking; cancel it in Duffel before refunding the service fee.",
      },
      { status: 409 },
    );
  }

  try {
    const stripe = getStripe();
    const checkoutSession = await stripe.checkout.sessions.retrieve(
      booking.stripeSessionId,
    );
    const paymentIntent =
      typeof checkoutSession.payment_intent === "string"
        ? checkoutSession.payment_intent
        : checkoutSession.payment_intent?.id;
    if (!paymentIntent) {
      return NextResponse.json(
        { error: "No payment intent on this Stripe session." },
        { status: 409 },
      );
    }

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntent,
      reason: "requested_by_customer",
      metadata: { booking_id: booking.id, actor: session.email },
    });

    await db()
      .update(bookings)
      .set({
        status: BOOKING_STATUS.CANCELLED,
        stripePaymentStatus: "refunded",
        failureReason:
          booking.failureReason ?? "Refunded by support (offer unrecoverable).",
        updatedAt: new Date(),
      })
      .where(eq(bookings.id, booking.id));

    await logBookingEvent({ id: booking.id }, "refunded", {
      actor: session.email,
      stripe_refund_id: refund.id,
      amount: refund.amount,
      currency: refund.currency,
    });

    return NextResponse.json({
      ok: true,
      refund_id: refund.id,
      amount: refund.amount,
      currency: refund.currency,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Refund failed";
    console.error("[admin refund]", e);
    await logBookingEvent({ id: booking.id }, "refund_failed", {
      actor: session.email,
      message,
    });
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
