import type { Booking } from "@/lib/db/schema";
import { getDuffel } from "@/lib/duffel";
import { formatDuffelError } from "@/lib/duffel-error";
import { isHoldOffer } from "@/lib/flights/pick-best-hold-offer";

export type OfferSnapshot = {
  slices: { origin: string; destination: string; departure_date: string }[];
  passengers: { id: string; type: string; age: number | null }[];
  cabin_class: string;
  total_amount: string;
  total_currency: string;
  owner: string | null;
};

export function getOfferSnapshot(booking: Booking): OfferSnapshot | null {
  const meta = (booking.metadata ?? {}) as Record<string, unknown>;
  const raw = meta.offer_snapshot;
  if (!raw || typeof raw !== "object") return null;
  const snapshot = raw as OfferSnapshot;
  return snapshot.slices?.length > 0 ? snapshot : null;
}

export type FreshOffer = {
  offerId: string;
  totalAmount: string;
  totalCurrency: string;
  /** Original offer passenger id → passenger id on the fresh offer. */
  passengerIdMap: Map<string, string>;
};

/**
 * Re-searches the original route and picks the cheapest holdable offer
 * (same airline when possible) that is within 10% of the original fare.
 */
export async function findFreshOffer(
  snapshot: OfferSnapshot,
): Promise<{ ok: true; offer: FreshOffer } | { ok: false; message: string }> {
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

    const offers = (res.data.offers ?? []).filter(isHoldOffer);
    if (offers.length === 0) {
      return { ok: false, message: "No holdable offers for original route" };
    }

    const sameOwner = offers.filter(
      (o) => !snapshot.owner || o.owner?.iata_code === snapshot.owner,
    );
    const pool = sameOwner.length > 0 ? sameOwner : offers;
    const pick = [...pool].sort(
      (a, b) => Number(a.total_amount) - Number(b.total_amount),
    )[0]!;

    const origAmt = Number(snapshot.total_amount);
    const newAmt = Number(pick.total_amount);
    if (Number.isFinite(origAmt) && origAmt > 0 && newAmt > origAmt * 1.1) {
      return {
        ok: false,
        message: `Fresh fare too high: ${pick.total_currency} ${newAmt.toFixed(
          2,
        )} vs original ${snapshot.total_currency} ${origAmt.toFixed(
          2,
        )} (>10% increase).`,
      };
    }

    // Duffel returns offer passengers in request order, so map by position.
    const passengerIdMap = new Map<string, string>();
    for (const [i, p] of snapshot.passengers.entries()) {
      const fresh = pick.passengers[i];
      if (!fresh || fresh.type !== p.type) {
        return {
          ok: false,
          message: "Fresh offer passengers do not match the original booking",
        };
      }
      passengerIdMap.set(p.id, fresh.id);
    }

    return {
      ok: true,
      offer: {
        offerId: pick.id,
        totalAmount: pick.total_amount,
        totalCurrency: pick.total_currency,
        passengerIdMap,
      },
    };
  } catch (e) {
    return { ok: false, message: formatDuffelError(e) };
  }
}
