import { hasLocale } from "next-intl";
import {
  ANALYTICS_SESSION_COOKIE,
  ANALYTICS_VISITOR_COOKIE,
  PG_UUID_RE,
} from "@/lib/analytics/constants";
import { trackServerEventSafe } from "@/lib/analytics/track";
import { getSession } from "@/lib/auth/session";
import { routing } from "@/i18n/routing";
import { logBookingEvent } from "@/lib/booking/log";
import { BOOKING_STATUS } from "@/lib/booking/status";
import { db } from "@/lib/db";
import { bookings, users } from "@/lib/db/schema";
import { getDuffel } from "@/lib/duffel";
import { checkoutCurrencySchema, serviceFeeForCurrency } from "@/lib/pricing";
import { getStripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const passengerSchema = z.object({
  id: z.string(),
  given_name: z.string().min(1).max(100),
  family_name: z.string().min(1).max(100),
  born_on: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  gender: z.enum(["m", "f"]),
  email: z.string().email(),
  phone_number: z.string().min(8).max(32),
});

/** Duffel requires title; we derive it from gender so users don’t need another field. */
function duffelTitleFromGender(gender: "m" | "f") {
  return gender === "f" ? ("ms" as const) : ("mr" as const);
}

const bodySchema = z.object({
  offer_id: z.string(),
  passengers: z.array(passengerSchema).min(1).max(9),
  currency: checkoutCurrencySchema.default("usd"),
  receipt_email: z.string().email(),
  /** BCP 47 tag; used to build locale-prefixed Stripe return URLs. */
  locale: z.string().optional(),
});

async function resolveBookingUserId(sub: string | undefined) {
  const raw = sub?.trim();
  if (!raw || !PG_UUID_RE.test(raw)) return null;
  const row = await db()
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, raw))
    .limit(1);
  return row[0]?.id ?? null;
}

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

  try {
    const session = await getSession();
    const receiptEmail = parsed.data.receipt_email.trim().toLowerCase();

    const duffel = getDuffel();
    let offer;
    try {
      const res = await duffel.offers.get(parsed.data.offer_id);
      offer = res.data;
    } catch (e) {
      console.error("[checkout/session] offer", e);
      return NextResponse.json(
        { error: "Offer expired or invalid" },
        { status: 400 },
      );
    }

    const offerPassengerIds = new Set(offer.passengers.map((p) => p.id));
    for (const p of parsed.data.passengers) {
      if (!offerPassengerIds.has(p.id)) {
        return NextResponse.json(
          { error: "Passenger ids must match offer" },
          { status: 400 },
        );
      }
    }

    const requiresInstant =
      offer.payment_requirements?.requires_instant_payment !== false;
    const duffelOrderMode = requiresInstant ? "instant" : "pay_later";

    const feeCents = serviceFeeForCurrency(parsed.data.currency);
    const appUrl = (
      process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
    ).replace(/\/$/, "");
    const locale =
      parsed.data.locale && hasLocale(routing.locales, parsed.data.locale)
        ? parsed.data.locale
        : routing.defaultLocale;
    const localePath = `/${locale}`;

    const passengersWithTitle = parsed.data.passengers.map((p) => ({
      ...p,
      title: duffelTitleFromGender(p.gender),
    }));

    const bookingUserId = await resolveBookingUserId(session?.sub);

    const jar = await cookies();
    const analyticsVisitorId = jar.get(ANALYTICS_VISITOR_COOKIE)?.value?.trim();
    const analyticsSessionId = jar.get(ANALYTICS_SESSION_COOKIE)?.value?.trim();
    const analyticsIds =
      analyticsVisitorId &&
      analyticsSessionId &&
      PG_UUID_RE.test(analyticsVisitorId) &&
      PG_UUID_RE.test(analyticsSessionId)
        ? { analyticsVisitorId, analyticsSessionId }
        : {};

    const offerSnapshot = {
      slices: offer.slices.map((sl) => ({
        origin: sl.origin.iata_code,
        destination: sl.destination.iata_code,
        departure_date: (sl.segments?.[0]?.departing_at ?? "").slice(0, 10),
      })),
      passengers: offer.passengers.map((p) => ({
        id: p.id,
        type: p.type,
        age: "age" in p ? p.age ?? null : null,
      })),
      cabin_class:
        offer.slices?.[0]?.segments?.[0]?.passengers?.[0]?.cabin_class ??
        "economy",
      total_amount: offer.total_amount,
      total_currency: offer.total_currency,
      owner: offer.owner?.iata_code ?? null,
    };

    const inserted = await db()
      .insert(bookings)
      .values({
        userId: bookingUserId,
        customerEmail: receiptEmail,
        status: BOOKING_STATUS.PENDING_CHECKOUT,
        duffelOfferId: offer.id,
        orderType: duffelOrderMode,
        passengersJson: JSON.stringify(passengersWithTitle),
        serviceFeeCents: feeCents,
        currency: parsed.data.currency,
        metadata: {
          duffelOrderMode,
          offer_total_amount: offer.total_amount,
          offer_total_currency: offer.total_currency,
          offer_snapshot: offerSnapshot,
          ...analyticsIds,
        },
      })
      .returning({ id: bookings.id });

    const bookingId = inserted[0]!.id;
    await logBookingEvent({ id: bookingId }, "checkout_started", {
      offer_id: offer.id,
      duffel_order_mode: duffelOrderMode,
    });
    void trackServerEventSafe("checkout_started", {
      path: "/api/checkout/session",
      payload: {
        booking_id: bookingId,
        offer_id: offer.id,
        currency: parsed.data.currency,
        service_fee_cents: feeCents,
      },
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
      success_url: `${appUrl}${localePath}/book/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}${localePath}/book?cancelled=1`,
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
  } catch (err) {
    console.error("[checkout/session]", err);
    const message =
      err instanceof Error ? err.message : "Checkout could not be started";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
