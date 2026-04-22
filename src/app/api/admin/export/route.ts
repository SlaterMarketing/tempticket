import { getAdminRangeFromUrlParams } from "@/app/admin/_lib/range";
import { isAdminEmail } from "@/lib/auth/admin";
import { getSession } from "@/lib/auth/session";
import {
  getTopLandingPages,
  getTrafficSources,
} from "@/lib/analytics/queries";
import { db } from "@/lib/db";
import {
  analyticsEvents,
  analyticsSessions,
  bookingEvents,
  bookings,
} from "@/lib/db/schema";
import { and, desc, gte, lte } from "drizzle-orm";

function csvEscape(s: string) {
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function csvRow(cells: (string | number | null | undefined)[]) {
  return cells.map((c) => csvEscape(c == null ? "" : String(c))).join(",");
}

export async function GET(req: Request) {
  const session = await getSession();
  if (!session || !isAdminEmail(session.email)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const url = new URL(req.url);
  const kind = url.searchParams.get("kind") ?? "";
  const range = getAdminRangeFromUrlParams(url.searchParams);
  const { from, to } = range;

  let filename = "export.csv";
  let body = "";

  if (kind === "sessions") {
    filename = "sessions.csv";
    const rows = await db()
      .select()
      .from(analyticsSessions)
      .where(
        and(
          gte(analyticsSessions.startedAt, from),
          lte(analyticsSessions.startedAt, to),
        ),
      )
      .orderBy(desc(analyticsSessions.startedAt));
    const lines = [
      csvRow([
        "id",
        "visitor_id",
        "user_id",
        "started_at",
        "last_activity_at",
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "referrer_host",
        "landing_path",
        "device",
      ]),
      ...rows.map((r) =>
        csvRow([
          r.id,
          r.visitorId,
          r.userId,
          r.startedAt.toISOString(),
          r.lastActivityAt.toISOString(),
          r.utmSource,
          r.utmMedium,
          r.utmCampaign,
          r.referrerHost,
          r.landingPath,
          r.device,
        ]),
      ),
    ];
    body = lines.join("\n");
  } else if (kind === "analytics_events") {
    filename = "analytics_events.csv";
    const rows = await db()
      .select()
      .from(analyticsEvents)
      .where(
        and(gte(analyticsEvents.ts, from), lte(analyticsEvents.ts, to)),
      )
      .orderBy(desc(analyticsEvents.ts))
      .limit(50_000);
    const lines = [
      csvRow([
        "id",
        "ts",
        "name",
        "visitor_id",
        "session_id",
        "user_id",
        "path",
        "payload",
      ]),
      ...rows.map((r) =>
        csvRow([
          r.id,
          r.ts.toISOString(),
          r.name,
          r.visitorId,
          r.sessionId,
          r.userId,
          r.path,
          r.payload ? JSON.stringify(r.payload) : "",
        ]),
      ),
    ];
    body = lines.join("\n");
  } else if (kind === "bookings") {
    filename = "bookings.csv";
    const rows = await db()
      .select()
      .from(bookings)
      .where(
        and(gte(bookings.createdAt, from), lte(bookings.createdAt, to)),
      )
      .orderBy(desc(bookings.createdAt))
      .limit(50_000);
    const lines = [
      csvRow([
        "id",
        "created_at",
        "status",
        "user_id",
        "customer_email",
        "currency",
        "service_fee_cents",
        "duffel_offer_id",
      ]),
      ...rows.map((r) =>
        csvRow([
          r.id,
          r.createdAt.toISOString(),
          r.status,
          r.userId,
          r.customerEmail,
          r.currency,
          r.serviceFeeCents,
          r.duffelOfferId,
        ]),
      ),
    ];
    body = lines.join("\n");
  } else if (kind === "booking_events") {
    filename = "booking_events.csv";
    const rows = await db()
      .select()
      .from(bookingEvents)
      .where(
        and(
          gte(bookingEvents.createdAt, from),
          lte(bookingEvents.createdAt, to),
        ),
      )
      .orderBy(desc(bookingEvents.createdAt))
      .limit(50_000);
    const lines = [
      csvRow(["id", "created_at", "booking_id", "event", "payload"]),
      ...rows.map((r) =>
        csvRow([
          r.id,
          r.createdAt.toISOString(),
          r.bookingId,
          r.event,
          r.payload ? JSON.stringify(r.payload) : "",
        ]),
      ),
    ];
    body = lines.join("\n");
  } else if (kind === "sources") {
    filename = "traffic_sources.csv";
    const rows = await getTrafficSources(range);
    const lines = [
      csvRow([
        "source",
        "sessions",
        "signups",
        "paid_bookings",
        "revenue_usd_cents",
      ]),
      ...rows.map((r) =>
        csvRow([
          r.source,
          r.sessions,
          r.signups,
          r.paidBookings,
          r.revenueUsdCents,
        ]),
      ),
    ];
    body = lines.join("\n");
  } else if (kind === "landings") {
    filename = "landing_pages.csv";
    const rows = await getTopLandingPages(range, 500);
    const lines = [
      csvRow(["path", "sessions"]),
      ...rows.map((r) => csvRow([r.path, r.sessions])),
    ];
    body = lines.join("\n");
  } else {
    return new Response("Unknown export kind", { status: 400 });
  }

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
