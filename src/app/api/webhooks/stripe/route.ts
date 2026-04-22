import { logBookingEvent } from "@/lib/booking/log";
import { BOOKING_STATUS } from "@/lib/booking/status";
import { trackInternalEventSafe } from "@/lib/analytics/track";
import { db } from "@/lib/db";
import { bookings, users, type Booking } from "@/lib/db/schema";
import { getDuffel } from "@/lib/duffel";
import { getEmailFrom, getResend } from "@/lib/resend";
import { getStripe } from "@/lib/stripe";
import type {
  CreateOrderPassenger,
  Order,
} from "@duffel/api/dist/booking/Orders/OrdersTypes";
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

  await logBookingEvent({ id: bookingId }, "stripe_paid", { session_id: session.id });

  const acPaid = analyticsContextFromBooking(booking);
  void trackInternalEventSafe({
    name: "checkout_completed",
    visitorId: acPaid.visitorId,
    sessionId: acPaid.sessionId,
    userId: acPaid.userId,
    path: "/api/webhooks/stripe",
    payload: {
      booking_id: bookingId,
      stripe_session_id: session.id,
    },
  });

  const passengers = JSON.parse(booking.passengersJson) as {
    id: string;
    title: CreateOrderPassenger["title"];
    given_name: string;
    family_name: string;
    born_on: string;
    gender: CreateOrderPassenger["gender"];
    email: string;
    phone_number: string;
  }[];

  const duffelPassengers: CreateOrderPassenger[] = passengers.map((p) => ({
    id: p.id,
    title: p.title,
    given_name: p.given_name,
    family_name: p.family_name,
    born_on: p.born_on,
    gender: p.gender,
    email: p.email,
    phone_number: p.phone_number,
  }));

  await db()
    .update(bookings)
    .set({
      status: BOOKING_STATUS.DUFFEL_PROCESSING,
      updatedAt: new Date(),
    })
    .where(eq(bookings.id, bookingId));

  try {
    const duffel = getDuffel();
    const offerRes = await duffel.offers.get(booking.duffelOfferId);
    const offer = offerRes.data;

    if (booking.orderType === "pay_later") {
      const orderRes = await duffel.orders.create({
        selected_offers: [offer.id],
        passengers: duffelPassengers,
        type: "pay_later",
      });
      await finalizeBooking(bookingId, orderRes.data);
    } else {
      const orderRes = await duffel.orders.create({
        selected_offers: [offer.id],
        passengers: duffelPassengers,
        type: "instant",
        payments: [
          {
            type: "balance",
            amount: offer.total_amount,
            currency: offer.total_currency,
          },
        ],
      });
      await finalizeBooking(bookingId, orderRes.data);
    }
  } catch (e) {
    console.error("Duffel order failed", e);
    await db()
      .update(bookings)
      .set({
        status: BOOKING_STATUS.FAILED,
        failureReason: e instanceof Error ? e.message : "Duffel booking failed",
        updatedAt: new Date(),
      })
      .where(eq(bookings.id, bookingId));
    await logBookingEvent({ id: bookingId }, "duffel_failed", {
      message: e instanceof Error ? e.message : String(e),
    });
    const acFail = analyticsContextFromBooking(booking);
    void trackInternalEventSafe({
      name: "booking_failed",
      visitorId: acFail.visitorId,
      sessionId: acFail.sessionId,
      userId: acFail.userId,
      path: "/api/webhooks/stripe",
      payload: {
        booking_id: bookingId,
        message: e instanceof Error ? e.message : String(e),
      },
    });
  }

  return NextResponse.json({ received: true });
}

async function finalizeBooking(bookingId: string, order: Order) {
  const firstCarrier =
    order.slices?.[0]?.segments?.[0]?.marketing_carrier?.iata_code ?? null;

  await db()
    .update(bookings)
    .set({
      status: BOOKING_STATUS.CONFIRMED,
      duffelOrderId: order.id,
      duffelBookingRef: order.booking_reference ?? null,
      airlineIata: firstCarrier,
      updatedAt: new Date(),
    })
    .where(eq(bookings.id, bookingId));

  await logBookingEvent({ id: bookingId }, "duffel_confirmed", {
    order_id: order.id,
    booking_reference: order.booking_reference,
  });

  const bookingRows = await db()
    .select()
    .from(bookings)
    .where(eq(bookings.id, bookingId))
    .limit(1);
  const b = bookingRows[0];
  if (!b) return;

  const ac = analyticsContextFromBooking(b);
  void trackInternalEventSafe({
    name: "booking_confirmed",
    visitorId: ac.visitorId,
    sessionId: ac.sessionId,
    userId: ac.userId,
    path: "/api/webhooks/stripe",
    payload: {
      booking_id: bookingId,
      order_id: order.id,
      booking_reference: order.booking_reference ?? null,
    },
  });

  let to = b.customerEmail?.trim() ?? null;
  if (!to && b.userId) {
    const urows = await db()
      .select({ email: users.email })
      .from(users)
      .where(eq(users.id, b.userId))
      .limit(1);
    to = urows[0]?.email ?? null;
  }
  if (!to) return;

  const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "TempTicket";
  const ref = order.booking_reference ?? order.id;
  try {
    const resend = getResend();
    await resend.emails.send({
      from: getEmailFrom(),
      to,
      subject: `${appName} — Your reservation details`,
      text: `Your booking reference is ${ref}. Keep order id ${order.id} for support. Check the airline's website with your name and this reference to verify the reservation. This is documentation for onward-travel requirements only—not legal or immigration advice.`,
    });
  } catch (err) {
    console.error("Booking confirmation email failed", err);
    await logBookingEvent({ id: bookingId }, "email_failed", {
      message: err instanceof Error ? err.message : String(err),
    });
  }
}
