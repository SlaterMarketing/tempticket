import { getDuffel } from "@/lib/duffel";
import { orderOffersHoldCheapestFirst } from "@/lib/flights/pick-best-hold-offer";

type Slice = { origin: string; destination: string; departure_date: string };
type PassengerType = "adult" | "child" | "infant_without_seat";
type CabinClass = "economy" | "premium_economy" | "business" | "first";

/** Hubs whose home carriers usually offer holdable (pay-later) fares on Duffel. */
const FALLBACK_HUBS = ["DOH", "DXB", "SIN"];
/** Day offsets tried when the requested date has no holdable fare, best first. */
const FALLBACK_DAY_SHIFTS = [1, -1, 2];

export type SearchFallback = {
  reason: "date" | "destination";
  origin: string;
  destination: string;
  departure_date: string;
};

export async function searchHoldableOffers(
  slices: Slice[],
  passengers: { type: PassengerType }[],
  cabinClass: CabinClass,
) {
  const duffel = getDuffel();
  const res = await duffel.offerRequests.create({
    return_offers: true,
    slices: slices.map((s) => ({
      origin: s.origin,
      destination: s.destination,
      departure_date: s.departure_date,
    })),
    passengers,
    cabin_class: cabinClass,
  } as Parameters<typeof duffel.offerRequests.create>[0]);

  const offers = (res.data.offers ?? []).slice(0, 40).map((o) => ({
    id: o.id,
    total_amount: o.total_amount,
    total_currency: o.total_currency,
    expires_at: o.expires_at,
    owner: o.owner,
    slices: o.slices.map((sl) => ({
      origin: sl.origin.iata_code,
      destination: sl.destination.iata_code,
      departing_at: sl.segments?.[0]?.departing_at,
      arriving_at: sl.segments?.[sl.segments.length - 1]?.arriving_at ?? null,
      duration: sl.duration,
      segments:
        sl.segments?.map((seg) => ({
          marketing_carrier: seg.marketing_carrier.iata_code,
          operating_carrier: seg.operating_carrier.iata_code,
          departing_at: seg.departing_at,
          arriving_at: seg.arriving_at,
        })) ?? [],
    })),
    payment_requirements: o.payment_requirements,
  }));

  return {
    offerRequestId: res.data.id,
    offers: orderOffersHoldCheapestFirst(offers),
  };
}

function shiftDate(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * Runs nearby-date and hub-destination searches in parallel and returns the
 * best one with holdable fares: closest date first, then hubs in list order.
 */
export async function findFallback(
  slice: Slice,
  passengers: { type: PassengerType }[],
  cabinClass: CabinClass,
) {
  const tomorrow = shiftDate(new Date().toISOString().slice(0, 10), 1);
  const candidates: SearchFallback[] = [
    ...FALLBACK_DAY_SHIFTS.map((days) => ({
      reason: "date" as const,
      origin: slice.origin,
      destination: slice.destination,
      departure_date: shiftDate(slice.departure_date, days),
    })).filter((c) => c.departure_date >= tomorrow),
    ...FALLBACK_HUBS.filter(
      (hub) => hub !== slice.origin && hub !== slice.destination,
    ).map((hub) => ({
      reason: "destination" as const,
      origin: slice.origin,
      destination: hub,
      departure_date: slice.departure_date,
    })),
  ];

  const results = await Promise.allSettled(
    candidates.map((c) =>
      searchHoldableOffers(
        [
          {
            origin: c.origin,
            destination: c.destination,
            departure_date: c.departure_date,
          },
        ],
        passengers,
        cabinClass,
      ),
    ),
  );

  for (const [i, r] of results.entries()) {
    if (r.status === "fulfilled" && r.value.offers.length > 0) {
      return { result: r.value, fallback: candidates[i]! };
    }
  }
  return null;
}
