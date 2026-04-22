import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import {
  analyticsEvents,
  analyticsSessions,
  analyticsVisitors,
} from "@/lib/db/schema";
import { cookies, headers } from "next/headers";
import { eq } from "drizzle-orm";
import {
  ANALYTICS_SESSION_COOKIE,
  ANALYTICS_VISITOR_COOKIE,
  HEADER_COUNTRY,
  HEADER_GCLID,
  HEADER_NEW_SESSION,
  HEADER_PATHNAME,
  HEADER_REFERRER_HOST,
  HEADER_UTM_CAMPAIGN,
  HEADER_UTM_CONTENT,
  HEADER_UTM_MEDIUM,
  HEADER_UTM_SOURCE,
  HEADER_UTM_TERM,
  PG_UUID_RE,
  type AnalyticsEventName,
} from "./constants";

function deviceFromUserAgent(ua: string | null): string {
  if (!ua) return "unknown";
  return /Mobile|Android|iPhone|iPad/i.test(ua) ? "mobile" : "desktop";
}

async function resolveAuthUserId(): Promise<string | null> {
  const session = await getSession();
  const sub = session?.sub?.trim();
  if (!sub || !PG_UUID_RE.test(sub)) return null;
  return sub;
}

export async function recordSession(): Promise<{
  visitorId: string | null;
  sessionId: string | null;
  userId: string | null;
}> {
  const h = await headers();
  const jar = await cookies();
  const vid = jar.get(ANALYTICS_VISITOR_COOKIE)?.value?.trim() ?? null;
  const sid = jar.get(ANALYTICS_SESSION_COOKIE)?.value?.trim() ?? null;
  if (!vid || !sid || !PG_UUID_RE.test(vid) || !PG_UUID_RE.test(sid)) {
    return { visitorId: null, sessionId: null, userId: null };
  }

  const authUserId = await resolveAuthUserId();
  const isNewSession = h.get(HEADER_NEW_SESSION) === "1";
  const pathname = h.get(HEADER_PATHNAME) ?? null;
  const country = h.get(HEADER_COUNTRY) ?? null;
  const ua = h.get("user-agent") ?? null;
  const device = deviceFromUserAgent(ua);

  const existingVisitor = await db()
    .select({ id: analyticsVisitors.id, userId: analyticsVisitors.userId })
    .from(analyticsVisitors)
    .where(eq(analyticsVisitors.id, vid))
    .limit(1);

  if (!existingVisitor[0]) {
    await db().insert(analyticsVisitors).values({
      id: vid,
      firstSeenAt: new Date(),
      lastSeenAt: new Date(),
      firstUtmSource: h.get(HEADER_UTM_SOURCE) ?? null,
      firstUtmMedium: h.get(HEADER_UTM_MEDIUM) ?? null,
      firstUtmCampaign: h.get(HEADER_UTM_CAMPAIGN) ?? null,
      firstUtmTerm: h.get(HEADER_UTM_TERM) ?? null,
      firstUtmContent: h.get(HEADER_UTM_CONTENT) ?? null,
      firstGclid: h.get(HEADER_GCLID) ?? null,
      firstReferrerHost: h.get(HEADER_REFERRER_HOST) ?? null,
      firstLandingPath: pathname,
      country,
      userId: authUserId ?? null,
    });
  } else {
    const nextUserId =
      authUserId && !existingVisitor[0].userId ? authUserId : undefined;
    await db()
      .update(analyticsVisitors)
      .set({
        lastSeenAt: new Date(),
        ...(nextUserId ? { userId: nextUserId } : {}),
      })
      .where(eq(analyticsVisitors.id, vid));
  }

  const existingSession = await db()
    .select()
    .from(analyticsSessions)
    .where(eq(analyticsSessions.id, sid))
    .limit(1);

  if (!existingSession[0]) {
    await db().insert(analyticsSessions).values({
      id: sid,
      visitorId: vid,
      userId: authUserId ?? null,
      startedAt: new Date(),
      lastActivityAt: new Date(),
      utmSource: isNewSession ? h.get(HEADER_UTM_SOURCE) ?? null : null,
      utmMedium: isNewSession ? h.get(HEADER_UTM_MEDIUM) ?? null : null,
      utmCampaign: isNewSession ? h.get(HEADER_UTM_CAMPAIGN) ?? null : null,
      utmTerm: isNewSession ? h.get(HEADER_UTM_TERM) ?? null : null,
      utmContent: isNewSession ? h.get(HEADER_UTM_CONTENT) ?? null : null,
      gclid: isNewSession ? h.get(HEADER_GCLID) ?? null : null,
      referrerHost: isNewSession ? h.get(HEADER_REFERRER_HOST) ?? null : null,
      landingPath: pathname,
      sessionCountry: country,
      userAgent: ua,
      device,
    });
  } else {
    const nextUserId =
      authUserId && !existingSession[0].userId ? authUserId : undefined;
    await db()
      .update(analyticsSessions)
      .set({
        lastActivityAt: new Date(),
        ...(nextUserId ? { userId: nextUserId } : {}),
      })
      .where(eq(analyticsSessions.id, sid));
  }

  return { visitorId: vid, sessionId: sid, userId: authUserId };
}

export async function insertAnalyticsEvent(args: {
  name: AnalyticsEventName;
  visitorId?: string | null;
  sessionId?: string | null;
  userId?: string | null;
  path?: string | null;
  payload?: Record<string, unknown> | null;
}) {
  const vid =
    args.visitorId && PG_UUID_RE.test(args.visitorId)
      ? args.visitorId
      : null;
  const sid =
    args.sessionId && PG_UUID_RE.test(args.sessionId)
      ? args.sessionId
      : null;
  const uid =
    args.userId && PG_UUID_RE.test(args.userId) ? args.userId : null;

  await db().insert(analyticsEvents).values({
    visitorId: vid,
    sessionId: sid,
    userId: uid,
    name: args.name,
    path: args.path ?? null,
    payload: args.payload ?? null,
  });
}

export async function trackServerEvent(
  name: AnalyticsEventName,
  options?: { path?: string; payload?: Record<string, unknown> },
) {
  const ctx = await recordSession();
  await insertAnalyticsEvent({
    name,
    visitorId: ctx.visitorId,
    sessionId: ctx.sessionId,
    userId: ctx.userId,
    path: options?.path ?? null,
    payload: options?.payload ?? null,
  });
}

export function trackServerEventSafe(
  name: AnalyticsEventName,
  options?: { path?: string; payload?: Record<string, unknown> },
) {
  return trackServerEvent(name, options).catch((err) => {
    console.error("[analytics]", name, err);
  });
}

export function trackInternalEventSafe(args: {
  name: AnalyticsEventName;
  visitorId?: string | null;
  sessionId?: string | null;
  userId?: string | null;
  path?: string | null;
  payload?: Record<string, unknown> | null;
}) {
  return insertAnalyticsEvent(args).catch((err) => {
    console.error("[analytics]", args.name, err);
  });
}

export async function linkVisitorToUser(visitorId: string, userId: string) {
  if (!PG_UUID_RE.test(visitorId) || !PG_UUID_RE.test(userId)) return;

  const v = await db()
    .select({ userId: analyticsVisitors.userId })
    .from(analyticsVisitors)
    .where(eq(analyticsVisitors.id, visitorId))
    .limit(1);

  if (v[0]?.userId && v[0].userId !== userId) return;

  if (v[0] && !v[0].userId) {
    await db()
      .update(analyticsVisitors)
      .set({ userId, lastSeenAt: new Date() })
      .where(eq(analyticsVisitors.id, visitorId));
  } else if (!v[0]) {
    await db().insert(analyticsVisitors).values({
      id: visitorId,
      firstSeenAt: new Date(),
      lastSeenAt: new Date(),
      userId,
    });
  } else {
    await db()
      .update(analyticsVisitors)
      .set({ lastSeenAt: new Date() })
      .where(eq(analyticsVisitors.id, visitorId));
  }

  await db()
    .update(analyticsSessions)
    .set({
      userId,
      lastActivityAt: new Date(),
    })
    .where(eq(analyticsSessions.visitorId, visitorId));
}
