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
} from "@/lib/analytics/constants";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const VISITOR_MAX_AGE = 60 * 60 * 24 * 365 * 2;
const SESSION_MAX_AGE = 60 * 30;

const intlMiddleware = createIntlMiddleware(routing);

function newUuid() {
  return globalThis.crypto.randomUUID();
}

function referrerHostFromHeader(referer: string | null): string | null {
  if (!referer) return null;
  try {
    return new URL(referer).hostname || null;
  } catch {
    return null;
  }
}

function buildAnalyticsRequestHeaders(request: NextRequest): {
  requestHeaders: Headers;
  visitorId: string;
  sessionId: string;
  issuedNewVisitor: boolean;
} {
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(HEADER_PATHNAME, pathname);

  let visitorId = request.cookies.get(ANALYTICS_VISITOR_COOKIE)?.value?.trim();
  let issuedNewVisitor = false;
  if (!visitorId || !PG_UUID_RE.test(visitorId)) {
    visitorId = newUuid();
    issuedNewVisitor = true;
  }

  let sessionId = request.cookies.get(ANALYTICS_SESSION_COOKIE)?.value?.trim();
  let isNewSession = false;
  if (!sessionId || !PG_UUID_RE.test(sessionId)) {
    sessionId = newUuid();
    isNewSession = true;
  }

  const geoCountry =
    request.headers.get("x-vercel-ip-country") ??
    (request as NextRequest & { geo?: { country?: string } }).geo?.country ??
    null;

  if (isNewSession) {
    requestHeaders.set(HEADER_NEW_SESSION, "1");
    const q = request.nextUrl.searchParams;
    const utmSource = q.get("utm_source")?.trim();
    if (utmSource) requestHeaders.set(HEADER_UTM_SOURCE, utmSource);
    const utmMedium = q.get("utm_medium")?.trim();
    if (utmMedium) requestHeaders.set(HEADER_UTM_MEDIUM, utmMedium);
    const utmCampaign = q.get("utm_campaign")?.trim();
    if (utmCampaign) requestHeaders.set(HEADER_UTM_CAMPAIGN, utmCampaign);
    const utmTerm = q.get("utm_term")?.trim();
    if (utmTerm) requestHeaders.set(HEADER_UTM_TERM, utmTerm);
    const utmContent = q.get("utm_content")?.trim();
    if (utmContent) requestHeaders.set(HEADER_UTM_CONTENT, utmContent);
    const gclid = q.get("gclid")?.trim();
    if (gclid) requestHeaders.set(HEADER_GCLID, gclid);
    const refHost = referrerHostFromHeader(request.headers.get("referer"));
    if (refHost) requestHeaders.set(HEADER_REFERRER_HOST, refHost);
    if (geoCountry) requestHeaders.set(HEADER_COUNTRY, geoCountry);
  } else if (geoCountry) {
    requestHeaders.set(HEADER_COUNTRY, geoCountry);
  }

  return { requestHeaders, visitorId, sessionId, issuedNewVisitor };
}

function attachAnalyticsCookies(
  response: NextResponse,
  visitorId: string,
  sessionId: string,
  issuedNewVisitor: boolean,
) {
  if (issuedNewVisitor) {
    response.cookies.set(ANALYTICS_VISITOR_COOKIE, visitorId, {
      path: "/",
      maxAge: VISITOR_MAX_AGE,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }
  response.cookies.set(ANALYTICS_SESSION_COOKIE, sessionId, {
    path: "/",
    maxAge: SESSION_MAX_AGE,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

function shouldSkipIntl(pathname: string) {
  return (
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel")
  );
}

export default function proxy(request: NextRequest) {
  const { requestHeaders, visitorId, sessionId, issuedNewVisitor } =
    buildAnalyticsRequestHeaders(request);

  const pathname = request.nextUrl.pathname;

  if (shouldSkipIntl(pathname)) {
    const res = NextResponse.next({
      request: { headers: requestHeaders },
    });
    attachAnalyticsCookies(res, visitorId, sessionId, issuedNewVisitor);
    return res;
  }

  const reqForIntl = new NextRequest(request, { headers: requestHeaders });
  const res = intlMiddleware(reqForIntl);
  attachAnalyticsCookies(res, visitorId, sessionId, issuedNewVisitor);
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
