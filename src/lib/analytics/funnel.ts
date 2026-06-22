export const FUNNEL_STEPS = [
  "page_view",
  "book_page_view",
  "search_attempted",
  "search_performed",
  "offer_selected",
  "book_ticket_preview_viewed",
  "book_passenger_details_viewed",
  "checkout_started",
  "checkout_completed",
  "booking_confirmed",
] as const;

export type FunnelStepName = (typeof FUNNEL_STEPS)[number];

export const BOOKING_FUNNEL_STEPS = [
  "book_page_view",
  "search_attempted",
  "search_performed",
  "offer_selected",
  "book_ticket_preview_viewed",
  "book_passenger_details_viewed",
  "checkout_started",
  "checkout_completed",
  "booking_confirmed",
] as const;

export type BookingFunnelStepName = (typeof BOOKING_FUNNEL_STEPS)[number];

/** Short labels for admin funnel chart (avoid technical event names). */
export const FUNNEL_STEP_LABELS: Record<FunnelStepName, string> = {
  page_view: "Any page view",
  book_page_view: "Book · step 1 (find flights)",
  search_attempted: "Book · search submitted",
  search_performed: "Book · flights returned",
  offer_selected: "Book · offer selected",
  book_ticket_preview_viewed: "Book · step 2 (trip preview)",
  book_passenger_details_viewed: "Book · step 3 (travelers & pay)",
  checkout_started: "Checkout started",
  checkout_completed: "Checkout paid",
  booking_confirmed: "Booking confirmed",
};

export type FunnelEvent = { name: string; ts: Date };

export type FunnelStep = {
  name: string;
  count: number;
  conversionPct: number | null;
};

/**
 * Deepest consecutive funnel step reached in one session (ordered by timestamp).
 * Returns 0 when no steps from `steps` are present.
 */
export function computeSessionSequentialDepth(
  events: FunnelEvent[],
  steps: readonly string[],
): number {
  const stepSet = new Set(steps);
  const stepTimes = new Map<string, Date[]>();

  for (const e of events) {
    if (!stepSet.has(e.name)) continue;
    const arr = stepTimes.get(e.name) ?? [];
    arr.push(e.ts);
    stepTimes.set(e.name, arr);
  }

  let depth = 0;
  let minTs = new Date(0);

  for (const step of steps) {
    const times = stepTimes.get(step);
    if (!times?.length) break;

    const sorted = [...times].sort((a, b) => a.getTime() - b.getTime());
    const next = sorted.find((t) => t.getTime() >= minTs.getTime());
    if (!next) break;

    depth++;
    minTs = next;
  }

  return depth;
}

/** Map per-session depths to cumulative step counts and step-to-step conversion %. */
export function aggregateSequentialFunnel(
  sessionDepths: number[],
  steps: readonly string[],
): FunnelStep[] {
  const stepCount = steps.length;
  const cumulative = new Array<number>(stepCount).fill(0);

  for (const depth of sessionDepths) {
    for (let i = 0; i < stepCount; i++) {
      if (depth >= i + 1) cumulative[i]!++;
    }
  }

  const out: FunnelStep[] = steps.map((name, i) => ({
    name,
    count: cumulative[i] ?? 0,
    conversionPct: null,
  }));

  for (let i = 0; i < out.length - 1; i++) {
    const cur = out[i]!.count;
    const next = out[i + 1]!.count;
    out[i]!.conversionPct = cur > 0 ? (next / cur) * 100 : null;
  }

  return out;
}
