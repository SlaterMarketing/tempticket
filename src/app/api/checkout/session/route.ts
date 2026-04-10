import { getSession } from "@/lib/auth/session";
import { logBookingEvent } from "@/lib/booking/log";
import { BOOKING_STATUS } from "@/lib/booking/status";
import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { getDuffel } from "@/lib/duffel";
import { serviceFeeForCurrency } from "@/lib/pricing";
import { getStripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const passengerSchema = z.object({
  id: z.string(),
  title: z.enum(["mr", "ms", "mrs", "miss", "dr"]),
  given_name: z.string().min(1).max(100),
  family_name: z.string().min(1).max(100),
  born_on: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  gender: z.enum(["m", "f"]),
  email: z.string().email(),
  phone_number: z.string().min(8).max(32),
});

const bodySchema = z.object({
  offer_id: z.string(),
  passengers: z.array(passengerSchema).min(1).max(9),
  currency: z.enum(["usd", "eur", "gbp", "thb"]).default("usd"),
  receipt_email: z.string().email(),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const session = await getSession();
  const receiptEmail = parsed.data.receipt_email.trim().toLowerCase();

  const duffel = getDuffel();
  let offer;
  try {
    const res = await duffel.offers.get(parsed.data.offer_id);
    offer = res.data;
  } catch {
    return NextResponse.json({ error: "Offer expired or invalid" }, { status: 400 });
  }

  const offerPassengerIds = new Set(offer.passengers.map((p) => p.id));
  for (const p of parsed.data.passengers) {
    if (!offerPassengerIds.has(p.id)) {
      return NextResponse.json({ error: "Passenger ids must match offer" }, { status: 400 });
    }
  }

  const requiresInstant = offer.payment_requirements?.requires_instant_payment !== false;
  const duffelOrderMode = requiresInstant ? "instant" : "pay_later";

  const feeCents = serviceFeeForCurrency(parsed.data.currency);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const inserted = await db()
    .insert(bookings)
    .values({
      userId: session?.sub ?? null,
      customerEmail: receiptEmail,
      status: BOOKING_STATUS.PENDING_CHECKOUT,
      duffelOfferId: offer.id,
      orderType: duffelOrderMode,
      passengersJson: JSON.stringify(parsed.data.passengers),
      serviceFeeCents: feeCents,
      currency: parsed.data.currency,
      metadata: {
        duffelOrderMode,
        offer_total_amount: offer.total_amount,
        offer_total_currency: offer.total_currency,
      },
    })
    .returning({ id: bookings.id });

  const bookingId = inserted[0]!.id;
  await logBookingEvent({ id: bookingId }, "checkout_started", {
    offer_id: offer.id,
    duffel_order_mode: duffelOrderMode,
  });

  const stripe = getStripe();
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: receiptEmail,
    line_items: [
      {
        price_data: {
          currency: parsed.data.currency,
          product_data: {
            name: "Onward travel reservation service",
            description:
              "Service fee for a real airline reservation for proof of onward travel. Not legal or immigration advice.",
          },
          unit_amount: feeCents,
        },
        quantity: 1,
      },
    ],
    success_url: `${appUrl}/book/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/book?cancelled=1`,
    metadata: {
      booking_id: bookingId,
    },
  });

  await db()
    .update(bookings)
    .set({
      stripeSessionId: checkoutSession.id,
      updatedAt: new Date(),
    })
    .where(eq(bookings.id, bookingId));

  return NextResponse.json({ url: checkoutSession.url });
}
