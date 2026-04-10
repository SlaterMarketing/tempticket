/**
 * We only sell pay-later / holdable itineraries (requires_instant_payment === false).
 * Among those, pick lowest total in the search currency (Duffel uses one currency per request).
 */

export type OfferHoldSortable = {
  id: string;
  total_amount: string;
  total_currency: string;
  payment_requirements?: { requires_instant_payment?: boolean } | null;
};

export function isHoldOffer(o: OfferHoldSortable): boolean {
  return o.payment_requirements?.requires_instant_payment === false;
}

function parseAmount(s: string): number {
  const n = Number.parseFloat(s);
  return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY;
}

/** Cheapest holdable offer, or undefined if none. */
export function pickBestHoldOffer<T extends OfferHoldSortable>(
  offers: T[],
): T | undefined {
  const holdable = offers.filter(isHoldOffer);
  if (holdable.length === 0) return undefined;
  return [...holdable].sort(
    (a, b) => parseAmount(a.total_amount) - parseAmount(b.total_amount),
  )[0];
}

/** All holdable offers, cheapest first (instant-pay fares are dropped). */
export function orderOffersHoldCheapestFirst<T extends OfferHoldSortable>(
  offers: T[],
): T[] {
  const holdable = offers.filter(isHoldOffer);
  return [...holdable].sort(
    (a, b) => parseAmount(a.total_amount) - parseAmount(b.total_amount),
  );
}
