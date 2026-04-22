import { z } from "zod";

/** Postgres `uuid` / cookie validation for analytics ids. */
export const PG_UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const ANALYTICS_VISITOR_COOKIE = "tt_vid";
export const ANALYTICS_SESSION_COOKIE = "tt_sid";

/** Middleware forwards attribution on new sessions (read in Node / track). */
export const HEADER_NEW_SESSION = "x-tt-new-session";
export const HEADER_PATHNAME = "x-tt-pathname";
export const HEADER_UTM_SOURCE = "x-tt-utm-source";
export const HEADER_UTM_MEDIUM = "x-tt-utm-medium";
export const HEADER_UTM_CAMPAIGN = "x-tt-utm-campaign";
export const HEADER_UTM_TERM = "x-tt-utm-term";
export const HEADER_UTM_CONTENT = "x-tt-utm-content";
export const HEADER_GCLID = "x-tt-gclid";
export const HEADER_REFERRER_HOST = "x-tt-referrer-host";
export const HEADER_COUNTRY = "x-tt-country";

export const ANALYTICS_EVENT_NAMES = [
  "page_view",
  "signup",
  "login",
  "book_page_view",
  "search_performed",
  "offer_viewed",
  "checkout_started",
  "checkout_completed",
  "booking_confirmed",
  "booking_failed",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENT_NAMES)[number];

export const analyticsEventNameSchema = z.enum(
  ANALYTICS_EVENT_NAMES as unknown as [
    AnalyticsEventName,
    ...AnalyticsEventName[],
  ],
);

/** Client beacon may only send these (server routes use full set). */
export const CLIENT_ALLOWED_ANALYTICS_EVENTS: AnalyticsEventName[] = [
  "page_view",
];
