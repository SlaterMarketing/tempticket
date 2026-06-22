import { BOOKING_STATUS } from "@/lib/booking/status";
import { db } from "@/lib/db";
import {
  analyticsEvents,
  analyticsSessions,
  bookings,
  users,
} from "@/lib/db/schema";
import {
  SERVICE_FEE_BY_CURRENCY,
  type CheckoutCurrencyCode,
} from "@/lib/pricing";
import { and, count, desc, eq, gte, inArray, isNotNull, isNull, lte, sql } from "drizzle-orm";

/** Date window for admin analytics (current + previous period of equal length). */
export type AnalyticsQueryRange = {
  from: Date;
  to: Date;
  prevFrom: Date;
  prevTo: Date;
};

const FUNNEL_STEPS = [
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

export const FAILURE_EVENT_NAMES = [
  "search_failed",
  "booking_failed",
  "checkout_abandoned",
] as const;

/** Short labels for admin funnel chart (avoid technical event names). */
export const FUNNEL_STEP_LABELS: Record<(typeof FUNNEL_STEPS)[number], string> =
  {
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

const PAID_STATUSES = [
  BOOKING_STATUS.PAID,
  BOOKING_STATUS.DUFFEL_PROCESSING,
  BOOKING_STATUS.CONFIRMED,
] as const;

const PAID_STATUS_SET = new Set<string>(PAID_STATUSES);

export function serviceFeeToUsdCents(currency: string, cents: number): number {
  const key = currency.toLowerCase() as CheckoutCurrencyCode;
  const local = SERVICE_FEE_BY_CURRENCY[key] ?? SERVICE_FEE_BY_CURRENCY.usd;
  const usd = SERVICE_FEE_BY_CURRENCY.usd;
  if (!local) return cents;
  return Math.round((cents * usd) / local);
}

async function countDistinctEventVisitors(from: Date, to: Date): Promise<number> {
  const row = await db()
    .select({
      n: sql<number>`count(distinct ${analyticsEvents.visitorId})`,
    })
    .from(analyticsEvents)
    .where(
      and(
        gte(analyticsEvents.ts, from),
        lte(analyticsEvents.ts, to),
        isNotNull(analyticsEvents.visitorId),
      ),
    );
  return Number(row[0]?.n ?? 0);
}

async function countSessionsStarted(from: Date, to: Date): Promise<number> {
  const row = await db()
    .select({ n: count() })
    .from(analyticsSessions)
    .where(
      and(
        gte(analyticsSessions.startedAt, from),
        lte(analyticsSessions.startedAt, to),
      ),
    );
  return Number(row[0]?.n ?? 0);
}

async function countEvents(
  name: string,
  from: Date,
  to: Date,
): Promise<number> {
  const row = await db()
    .select({ n: count() })
    .from(analyticsEvents)
    .where(
      and(
        eq(analyticsEvents.name, name),
        gte(analyticsEvents.ts, from),
        lte(analyticsEvents.ts, to),
      ),
    );
  return Number(row[0]?.n ?? 0);
}

async function paidBookingsInRange(from: Date, to: Date) {
  return db()
    .select()
    .from(bookings)
    .where(
      and(
        inArray(bookings.status, [
          BOOKING_STATUS.PAID,
          BOOKING_STATUS.DUFFEL_PROCESSING,
          BOOKING_STATUS.CONFIRMED,
        ]),
        gte(bookings.createdAt, from),
        lte(bookings.createdAt, to),
      ),
    );
}

async function revenueUsdCentsSum(from: Date, to: Date): Promise<number> {
  const rows = await paidBookingsInRange(from, to);
  let sum = 0;
  for (const b of rows) {
    sum += serviceFeeToUsdCents(b.currency, b.serviceFeeCents);
  }
  return sum;
}

export type KpiSnapshot = {
  visitors: number;
  visitorsPrev: number;
  sessions: number;
  sessionsPrev: number;
  signups: number;
  signupsPrev: number;
  logins: number;
  loginsPrev: number;
  checkoutStarted: number;
  checkoutStartedPrev: number;
  bookingsPaid: number;
  bookingsPaidPrev: number;
  revenueUsdCents: number;
  revenueUsdCentsPrev: number;
  conversionPct: number;
  conversionPctPrev: number;
  checkoutAbandoned: number;
  checkoutAbandonedPrev: number;
  bookingFailed: number;
  bookingFailedPrev: number;
  paidButNotConfirmed: number;
  paidButNotConfirmedPrev: number;
  guestBookingsPaid: number;
  guestBookingsPaidPrev: number;
};

async function countPaidButNotConfirmed(from: Date, to: Date): Promise<number> {
  const row = await db()
    .select({ n: count() })
    .from(bookings)
    .where(
      and(
        eq(bookings.stripePaymentStatus, "paid"),
        isNull(bookings.duffelOrderId),
        gte(bookings.createdAt, from),
        lte(bookings.createdAt, to),
      ),
    );
  return Number(row[0]?.n ?? 0);
}

async function countGuestConfirmedBookings(from: Date, to: Date): Promise<number> {
  const row = await db()
    .select({ n: count() })
    .from(bookings)
    .where(
      and(
        eq(bookings.status, BOOKING_STATUS.CONFIRMED),
        isNull(bookings.userId),
        gte(bookings.createdAt, from),
        lte(bookings.createdAt, to),
      ),
    );
  return Number(row[0]?.n ?? 0);
}

export async function getAdminKpis(
  range: AnalyticsQueryRange,
): Promise<KpiSnapshot> {
  const { from, to, prevFrom, prevTo } = range;
  const [
    visitors,
    visitorsPrev,
    sessions,
    sessionsPrev,
    signups,
    signupsPrev,
    logins,
    loginsPrev,
    checkoutStarted,
    checkoutStartedPrev,
    bookingsPaidRows,
    bookingsPaidRowsPrev,
    revenueUsdCents,
    revenueUsdCentsPrev,
    checkoutAbandoned,
    checkoutAbandonedPrev,
    bookingFailed,
    bookingFailedPrev,
    paidButNotConfirmed,
    paidButNotConfirmedPrev,
    guestBookingsPaid,
    guestBookingsPaidPrev,
  ] = await Promise.all([
    countDistinctEventVisitors(from, to),
    countDistinctEventVisitors(prevFrom, prevTo),
    countSessionsStarted(from, to),
    countSessionsStarted(prevFrom, prevTo),
    countEvents("signup", from, to),
    countEvents("signup", prevFrom, prevTo),
    countEvents("login", from, to),
    countEvents("login", prevFrom, prevTo),
    countEvents("checkout_started", from, to),
    countEvents("checkout_started", prevFrom, prevTo),
    paidBookingsInRange(from, to),
    paidBookingsInRange(prevFrom, prevTo),
    revenueUsdCentsSum(from, to),
    revenueUsdCentsSum(prevFrom, prevTo),
    countEvents("checkout_abandoned", from, to),
    countEvents("checkout_abandoned", prevFrom, prevTo),
    countEvents("booking_failed", from, to),
    countEvents("booking_failed", prevFrom, prevTo),
    countPaidButNotConfirmed(from, to),
    countPaidButNotConfirmed(prevFrom, prevTo),
    countGuestConfirmedBookings(from, to),
    countGuestConfirmedBookings(prevFrom, prevTo),
  ]);

  const bookingsPaid = bookingsPaidRows.length;
  const bookingsPaidPrev = bookingsPaidRowsPrev.length;
  const conversionPct = visitors > 0 ? (bookingsPaid / visitors) * 100 : 0;
  const conversionPctPrev =
    visitorsPrev > 0 ? (bookingsPaidPrev / visitorsPrev) * 100 : 0;

  return {
    visitors,
    visitorsPrev,
    sessions,
    sessionsPrev,
    signups,
    signupsPrev,
    logins,
    loginsPrev,
    checkoutStarted,
    checkoutStartedPrev,
    bookingsPaid,
    bookingsPaidPrev,
    revenueUsdCents,
    revenueUsdCentsPrev,
    conversionPct,
    conversionPctPrev,
    checkoutAbandoned,
    checkoutAbandonedPrev,
    bookingFailed,
    bookingFailedPrev,
    paidButNotConfirmed,
    paidButNotConfirmedPrev,
    guestBookingsPaid,
    guestBookingsPaidPrev,
  };
}

export type FunnelStep = { name: string; count: number; conversionPct: number | null };

export async function getFailureMetrics(
  range: AnalyticsQueryRange,
): Promise<{ name: string; count: number }[]> {
  const { from, to } = range;
  const names = [...FAILURE_EVENT_NAMES];
  const out: { name: string; count: number }[] = [];
  for (const name of names) {
    out.push({ name, count: await countEvents(name, from, to) });
  }
  return out;
}

export async function getFunnel(
  range: AnalyticsQueryRange,
): Promise<FunnelStep[]> {
  const { from, to } = range;
  const out: FunnelStep[] = [];
  for (const name of FUNNEL_STEPS) {
    const row = await db()
      .select({
        n: sql<number>`count(distinct ${analyticsEvents.visitorId})`,
      })
      .from(analyticsEvents)
      .where(
        and(
          eq(analyticsEvents.name, name),
          gte(analyticsEvents.ts, from),
          lte(analyticsEvents.ts, to),
          isNotNull(analyticsEvents.visitorId),
        ),
      );
    out.push({ name, count: Number(row[0]?.n ?? 0), conversionPct: null });
  }
  for (let i = 0; i < out.length - 1; i++) {
    const cur = out[i]!.count;
    const next = out[i + 1]!.count;
    out[i]!.conversionPct = cur > 0 ? (next / cur) * 100 : null;
  }
  return out;
}

export type RevenueDay = { day: string; usdCents: number };

export async function getRevenueByDay(
  range: AnalyticsQueryRange,
): Promise<RevenueDay[]> {
  const { from, to } = range;
  const rows = await paidBookingsInRange(from, to);
  const byDay = new Map<string, number>();
  for (const b of rows) {
    const day = b.createdAt.toISOString().slice(0, 10);
    const add = serviceFeeToUsdCents(b.currency, b.serviceFeeCents);
    byDay.set(day, (byDay.get(day) ?? 0) + add);
  }
  return [...byDay.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, usdCents]) => ({ day, usdCents }));
}

function sourceLabel(utm: string | null, refHost: string | null): string {
  const u = utm?.trim();
  if (u) return u;
  const r = refHost?.trim();
  if (r) return r;
  return "direct";
}

export type TrafficSourceGroupBy = "source" | "campaign" | "medium";

function sessionAttributionLabel(
  s: {
    utmSource: string | null;
    utmMedium: string | null;
    utmCampaign: string | null;
    referrerHost: string | null;
  },
  groupBy: TrafficSourceGroupBy,
): string {
  if (groupBy === "campaign") {
    const c = s.utmCampaign?.trim();
    if (c) return c;
  }
  if (groupBy === "medium") {
    const m = s.utmMedium?.trim();
    if (m) return m;
  }
  return sourceLabel(s.utmSource, s.referrerHost);
}

function routeKey(
  origin: string | null | undefined,
  destination: string | null | undefined,
): string | null {
  const o = origin?.trim().toUpperCase();
  const d = destination?.trim().toUpperCase();
  if (!o || !d || o.length !== 3 || d.length !== 3) return null;
  return `${o}→${d}`;
}

function payloadRouteKey(payload: Record<string, unknown> | null): string | null {
  if (!payload) return null;
  return routeKey(
    typeof payload.origin === "string" ? payload.origin : null,
    typeof payload.destination === "string" ? payload.destination : null,
  );
}

export type RouteConversionRow = {
  route: string;
  searches: number;
  checkouts: number;
  confirmed: number;
  searchToCheckoutPct: number;
  checkoutToConfirmedPct: number;
};

export async function getRouteConversion(
  range: AnalyticsQueryRange,
): Promise<RouteConversionRow[]> {
  const { from, to } = range;

  const searchEvents = await db()
    .select({ payload: analyticsEvents.payload })
    .from(analyticsEvents)
    .where(
      and(
        eq(analyticsEvents.name, "search_performed"),
        gte(analyticsEvents.ts, from),
        lte(analyticsEvents.ts, to),
      ),
    );

  const checkoutEvents = await db()
    .select({ payload: analyticsEvents.payload })
    .from(analyticsEvents)
    .where(
      and(
        eq(analyticsEvents.name, "checkout_started"),
        gte(analyticsEvents.ts, from),
        lte(analyticsEvents.ts, to),
      ),
    );

  const confirmedBookings = await db()
    .select({ metadata: bookings.metadata })
    .from(bookings)
    .where(
      and(
        eq(bookings.status, BOOKING_STATUS.CONFIRMED),
        gte(bookings.createdAt, from),
        lte(bookings.createdAt, to),
      ),
    );

  const searches = new Map<string, number>();
  for (const e of searchEvents) {
    const key = payloadRouteKey(e.payload);
    if (!key) continue;
    searches.set(key, (searches.get(key) ?? 0) + 1);
  }

  const checkouts = new Map<string, number>();
  for (const e of checkoutEvents) {
    const key = payloadRouteKey(e.payload);
    if (!key) continue;
    checkouts.set(key, (checkouts.get(key) ?? 0) + 1);
  }

  const confirmed = new Map<string, number>();
  for (const b of confirmedBookings) {
    const meta = (b.metadata ?? {}) as Record<string, unknown>;
    const snap = meta.offer_snapshot as
      | { slices?: { origin?: string; destination?: string }[] }
      | undefined;
    const slice = snap?.slices?.[0];
    const key = routeKey(slice?.origin, slice?.destination);
    if (!key) continue;
    confirmed.set(key, (confirmed.get(key) ?? 0) + 1);
  }

  const routes = new Set<string>([
    ...searches.keys(),
    ...checkouts.keys(),
    ...confirmed.keys(),
  ]);

  return [...routes]
    .map((route) => {
      const s = searches.get(route) ?? 0;
      const c = checkouts.get(route) ?? 0;
      const f = confirmed.get(route) ?? 0;
      return {
        route,
        searches: s,
        checkouts: c,
        confirmed: f,
        searchToCheckoutPct: s > 0 ? (c / s) * 100 : 0,
        checkoutToConfirmedPct: c > 0 ? (f / c) * 100 : 0,
      };
    })
    .sort((a, b) => b.searches - a.searches);
}

export type TrafficSourceRow = {
  source: string;
  sessions: number;
  signups: number;
  paidBookings: number;
  revenueUsdCents: number;
};

export async function getTrafficSources(
  range: AnalyticsQueryRange,
  groupBy: TrafficSourceGroupBy = "source",
): Promise<TrafficSourceRow[]> {
  const { from, to } = range;
  const sessionRows = await db()
    .select()
    .from(analyticsSessions)
    .where(
      and(
        gte(analyticsSessions.startedAt, from),
        lte(analyticsSessions.startedAt, to),
      ),
    )
    .orderBy(desc(analyticsSessions.startedAt));

  const visitorToSource = new Map<string, string>();
  for (const s of sessionRows) {
    if (!visitorToSource.has(s.visitorId)) {
      visitorToSource.set(
        s.visitorId,
        sessionAttributionLabel(s, groupBy),
      );
    }
  }

  const sessionsBySource = new Map<string, number>();
  for (const s of sessionRows) {
    const label = sessionAttributionLabel(s, groupBy);
    sessionsBySource.set(label, (sessionsBySource.get(label) ?? 0) + 1);
  }

  const signupEvents = await db()
    .select({
      visitorId: analyticsEvents.visitorId,
    })
    .from(analyticsEvents)
    .where(
      and(
        eq(analyticsEvents.name, "signup"),
        gte(analyticsEvents.ts, from),
        lte(analyticsEvents.ts, to),
        isNotNull(analyticsEvents.visitorId),
      ),
    );

  const signupsBySource = new Map<string, number>();
  for (const e of signupEvents) {
    const vid = e.visitorId!;
    const src = visitorToSource.get(vid) ?? "unknown";
    signupsBySource.set(src, (signupsBySource.get(src) ?? 0) + 1);
  }

  const completed = await db()
    .select({
      visitorId: analyticsEvents.visitorId,
      payload: analyticsEvents.payload,
    })
    .from(analyticsEvents)
    .where(
      and(
        eq(analyticsEvents.name, "checkout_completed"),
        gte(analyticsEvents.ts, from),
        lte(analyticsEvents.ts, to),
      ),
    );

  const bookingIds = new Set<string>();
  for (const e of completed) {
    const bid = e.payload && typeof e.payload === "object" && e.payload !== null && "booking_id" in e.payload
      ? String((e.payload as { booking_id?: unknown }).booking_id ?? "")
      : "";
    if (bid) bookingIds.add(bid);
  }

  const bookingRows =
    bookingIds.size > 0
      ? await db()
          .select()
          .from(bookings)
          .where(inArray(bookings.id, [...bookingIds]))
      : [];

  const bookingById = new Map(bookingRows.map((b) => [b.id, b]));

  const paidBySource = new Map<string, { n: number; revenueUsdCents: number }>();
  for (const e of completed) {
    const vid = e.visitorId;
    const src = vid ? visitorToSource.get(vid) ?? "unknown" : "unknown";
    const bid =
      e.payload &&
      typeof e.payload === "object" &&
      e.payload !== null &&
      "booking_id" in e.payload
        ? String((e.payload as { booking_id?: unknown }).booking_id ?? "")
        : "";
    const b = bid ? bookingById.get(bid) : undefined;
    if (!b || !PAID_STATUS_SET.has(b.status)) continue;
    const cur = paidBySource.get(src) ?? { n: 0, revenueUsdCents: 0 };
    cur.n += 1;
    cur.revenueUsdCents += serviceFeeToUsdCents(b.currency, b.serviceFeeCents);
    paidBySource.set(src, cur);
  }

  const sources = new Set<string>([
    ...sessionsBySource.keys(),
    ...signupsBySource.keys(),
    ...paidBySource.keys(),
  ]);

  return [...sources]
    .sort((a, b) => (sessionsBySource.get(b) ?? 0) - (sessionsBySource.get(a) ?? 0))
    .map((source) => ({
      source,
      sessions: sessionsBySource.get(source) ?? 0,
      signups: signupsBySource.get(source) ?? 0,
      paidBookings: paidBySource.get(source)?.n ?? 0,
      revenueUsdCents: paidBySource.get(source)?.revenueUsdCents ?? 0,
    }));
}

export type LandingRow = { path: string; sessions: number };

export async function getTopLandingPages(
  range: AnalyticsQueryRange,
  limit = 12,
): Promise<LandingRow[]> {
  const { from, to } = range;
  const pathExpr = sql<string>`coalesce(nullif(trim(${analyticsSessions.landingPath}), ''), '(unknown)')`;
  const rows = await db()
    .select({
      path: pathExpr,
      sessions: count(),
    })
    .from(analyticsSessions)
    .where(
      and(
        gte(analyticsSessions.startedAt, from),
        lte(analyticsSessions.startedAt, to),
      ),
    )
    .groupBy(pathExpr);

  return rows
    .map((r) => ({
      path: r.path,
      sessions: Number(r.sessions),
    }))
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, limit);
}

function utcMonday(d: Date): Date {
  const x = new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
  );
  const dw = (x.getUTCDay() + 6) % 7;
  x.setUTCDate(x.getUTCDate() - dw);
  x.setUTCHours(0, 0, 0, 0);
  return x;
}

export type CohortRow = {
  label: string;
  size: number;
  activeByWeek: number[];
};

/** Weekly signup cohorts (UTC); `activeByWeek[w]` = distinct users with a session in week `w` after cohort Monday. */
export async function getCohortRetention(
  range: AnalyticsQueryRange,
  maxWeeks = 8,
): Promise<CohortRow[]> {
  const { to } = range;
  const cohortLookbackWeeks = 12;
  const cohortStart = new Date(
    to.getTime() - cohortLookbackWeeks * 7 * 86400000,
  );

  const cohortUsers = await db()
    .select({
      id: users.id,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(gte(users.createdAt, cohortStart));

  const byCohort = new Map<
    string,
    { label: string; monday: Date; userIds: Set<string> }
  >();

  for (const u of cohortUsers) {
    const mon = utcMonday(u.createdAt);
    const key = mon.toISOString().slice(0, 10);
    let bucket = byCohort.get(key);
    if (!bucket) {
      bucket = { label: key, monday: mon, userIds: new Set() };
      byCohort.set(key, bucket);
    }
    bucket.userIds.add(u.id);
  }

  const allUserIds = cohortUsers.map((u) => u.id);
  if (!allUserIds.length) return [];

  const userSessionRows = await db()
    .select({
      userId: analyticsSessions.userId,
      startedAt: analyticsSessions.startedAt,
    })
    .from(analyticsSessions)
    .where(
      and(
        isNotNull(analyticsSessions.userId),
        inArray(analyticsSessions.userId, allUserIds),
        gte(analyticsSessions.startedAt, cohortStart),
        lte(analyticsSessions.startedAt, to),
      ),
    );

  const cohorts = [...byCohort.values()].sort((a, b) =>
    a.monday.getTime() - b.monday.getTime(),
  );

  const out: CohortRow[] = [];
  for (const c of cohorts) {
    const activeByWeek: number[] = [];
    for (let w = 0; w < maxWeeks; w++) {
      const start = new Date(c.monday.getTime() + w * 7 * 86400000);
      const end = new Date(start.getTime() + 7 * 86400000);
      const active = new Set<string>();
      for (const row of userSessionRows) {
        if (!row.userId || !c.userIds.has(row.userId)) continue;
        const t = row.startedAt.getTime();
        if (t >= start.getTime() && t < end.getTime()) active.add(row.userId);
      }
      activeByWeek.push(active.size);
    }
    out.push({ label: c.label, size: c.userIds.size, activeByWeek });
  }

  return out;
}
