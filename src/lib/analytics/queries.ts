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
import { and, count, desc, eq, gte, inArray, isNotNull, lte, sql } from "drizzle-orm";

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
  "search_performed",
  "offer_viewed",
  "checkout_started",
  "checkout_completed",
  "booking_confirmed",
] as const;

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
};

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
  };
}

export type FunnelStep = { name: string; count: number };

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
    out.push({ name, count: Number(row[0]?.n ?? 0) });
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

export type TrafficSourceRow = {
  source: string;
  sessions: number;
  signups: number;
  paidBookings: number;
  revenueUsdCents: number;
};

export async function getTrafficSources(
  range: AnalyticsQueryRange,
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
        sourceLabel(s.utmSource, s.referrerHost),
      );
    }
  }

  const sessionsBySource = new Map<string, number>();
  for (const s of sessionRows) {
    const label = sourceLabel(s.utmSource, s.referrerHost);
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
