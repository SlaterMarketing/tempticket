import { isAdminEmail } from "@/lib/auth/admin";
import { getSession } from "@/lib/auth/session";
import { logBookingEvent } from "@/lib/booking/log";
import { BOOKING_STATUS } from "@/lib/booking/status";
import { createDuffelOrderForBooking } from "@/lib/booking/finalize";
import { db } from "@/lib/db";
import { bookings, type Booking } from "@/lib/db/schema";
import { getDuffel } from "@/lib/duffel";
import { formatDuffelError } from "@/lib/duffel-error";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

type OfferSnapshot = {
  slices: { origin: string; destination: string; departure_date: string }[];
  passengers: { id: string; type: string; age: number | null }[];
  cabin_class: string;
  total_amount: string;
  total_currency: string;
  owner: string | null;
};

function getSnapshot(booking: Booking): OfferSnapshot | null {
  const meta = (booking.metadata ?? {}) as Record<string, unknown>;
  const raw = meta.offer_snapshot;
  if (!raw || typeof raw !== "object") return null;
  return raw as OfferSnapshot;
}

/** Returns true if the offer is still bookable (exists and not expired). */
async function isExistingOfferBookable(offerId: string): Promise<boolean> {
  try {
    const duffel = getDuffel();
    const res = await duffel.offers.get(offerId);
    const expiresAt = res.data.expires_at
      ? new Date(res.data.expires_at).getTime()
      : 0;
    if (!expiresAt) return false;
    return expiresAt - Date.now() > 30_000;
  } catch {
    return false;
  }
}

/** Duffel offer-request → pick the cheapest matching offer. */
async function findFreshOffer(snapshot: OfferSnapshot): Promise<
  | {
      ok: true;
      offerId: string;
      totalAmount: string;
      totalCurrency: string;
    }
  | { ok: false; message: string }
> {
  const duffel = getDuffel();
  try {
    const res = await duffel.offerRequests.create({
      return_offers: true,
      slices: snapshot.slices.map((s) => ({
        origin: s.origin,
        destination: s.destination,
        departure_date: s.departure_date,
      })),
      passengers: snapshot.passengers.map(
        (p) =>
          ({
            type: p.type as "adult" | "child" | "infant_without_seat",
          }) as Parameters<
            typeof duffel.offerRequests.create
          >[0]["passengers"][number],
      ),
      cabin_class: snapshot.cabin_class as
        | "economy"
        | "premium_economy"
        | "business"
        | "first",
    } as Parameters<typeof duffel.offerRequests.create>[0]);

    const offers = res.data.offers ?? [];
    if (offers.length === 0) {
      return { ok: false, message: "No offers returned for original route" };
    }

    const sameOwner = offers.filter(
      (o) => !snapshot.owner || o.owner?.iata_code === snapshot.owner,
    );
    const pool = sameOwner.length > 0 ? sameOwner : offers;
    const sorted = [...pool].sort(
      (a, b) => Number(a.total_amount) - Number(b.total_amount),
    );
    const pick = sorted[0];
    if (!pick) {
      return { ok: false, message: "No matching offers for original route" };
    }

    const origAmt = Number(snapshot.total_amount);
    const newAmt = Number(pick.total_amount);
    if (Number.isFinite(origAmt) && origAmt > 0 && newAmt > origAmt * 1.1) {
      return {
        ok: false,
        message: `Fresh fare too high: ${pick.total_currency} ${newAmt.toFixed(
          2,
        )} vs original ${snapshot.total_currency} ${origAmt.toFixed(
          2,
        )} (>10% increase). Refund instead.`,
      };
    }

    return {
      ok: true,
      offerId: pick.id,
      totalAmount: pick.total_amount,
      totalCurrency: pick.total_currency,
    };
  } catch (e) {
    return { ok: false, message: formatDuffelError(e) };
  }
}

async function swapOfferOnBooking(
  booking: Booking,
  offerId: string,
  amount: string,
  currency: string,
): Promise<Booking> {
  await db()
    .update(bookings)
    .set({ duffelOfferId: offerId, updatedAt: new Date() })
    .where(eq(bookings.id, booking.id));

  await logBookingEvent({ id: booking.id }, "retry_offer_replaced", {
    new_offer_id: offerId,
    new_total_amount: amount,
    new_total_currency: currency,
  });

  return { ...booking, duffelOfferId: offerId };
}

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

  if (
    booking.status !== BOOKING_STATUS.FAILED &&
    booking.status !== BOOKING_STATUS.PAID
  ) {
    return NextResponse.json(
      { error: `Cannot retry a booking in status "${booking.status}"` },
      { status: 409 },
    );
  }

  if (
    booking.stripePaymentStatus !== "paid" &&
    booking.stripePaymentStatus !== "partially_refunded"
  ) {
    return NextResponse.json(
      { error: "Booking has not been paid; nothing to retry." },
      { status: 409 },
    );
  }

  if (booking.duffelOrderId) {
    return NextResponse.json(
      {
        error: `Booking already has Duffel order ${booking.duffelOrderId}; nothing to retry.`,
      },
      { status: 409 },
    );
  }

  await logBookingEvent({ id: booking.id }, "retry_started", {
    actor: session.email,
    previous_status: booking.status,
    previous_reason: booking.failureReason,
  });

  let working = booking;
  const snapshot = getSnapshot(booking);

  // 1. If the existing offer is still bookable, try it first.
  const existingAlive = await isExistingOfferBookable(booking.duffelOfferId);

  if (existingAlive) {
    const first = await createDuffelOrderForBooking(
      working,
      "/api/admin/bookings/retry",
    );
    if (first.ok) {
      return NextResponse.json({
        ok: true,
        order_id: first.order.id,
        booking_reference: first.order.booking_reference ?? null,
      });
    }

    // First attempt failed; if we have a snapshot, try a fresh search.
    if (!snapshot || snapshot.slices.length === 0) {
      return NextResponse.json({ error: first.message }, { status: 502 });
    }
    await logBookingEvent({ id: booking.id }, "retry_first_attempt_failed", {
      message: first.message,
    });
  }

  // 2. Fresh-search fallback.
  if (!snapshot || snapshot.slices.length === 0) {
    return NextResponse.json(
      {
        error:
          "Original offer has expired and no search snapshot is stored for this booking. Refund instead.",
      },
      { status: 409 },
    );
  }

  const fresh = await findFreshOffer(snapshot);
  if (!fresh.ok) {
    await logBookingEvent({ id: booking.id }, "retry_no_offer", {
      message: fresh.message,
    });
    return NextResponse.json({ error: fresh.message }, { status: 409 });
  }

  working = await swapOfferOnBooking(
    working,
    fresh.offerId,
    fresh.totalAmount,
    fresh.totalCurrency,
  );

  const second = await createDuffelOrderForBooking(
    working,
    "/api/admin/bookings/retry",
  );

  if (!second.ok) {
    return NextResponse.json({ error: second.message }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    order_id: second.order.id,
    booking_reference: second.order.booking_reference ?? null,
  });
}
