import { getAffiliatePartner, sanitizeClickSource } from "@/lib/affiliate";
import { trackServerEventSafe } from "@/lib/analytics/track";
import { getServerSiteUrl } from "@/lib/site-url";
import { NextResponse, type NextRequest } from "next/server";

/** Counts the click (and which CTA sent it), then redirects to the affiliate partner. */
export async function GET(request: NextRequest) {
  const partner = getAffiliatePartner();
  if (!partner) {
    return NextResponse.redirect(new URL("/book", getServerSiteUrl()));
  }
  const source = sanitizeClickSource(request.nextUrl.searchParams.get("src"));
  void trackServerEventSafe("affiliate_click", {
    path: "/api/go/partner",
    payload: { partner: partner.name, source: source ?? "book-page" },
  });
  return NextResponse.redirect(partner.url);
}
