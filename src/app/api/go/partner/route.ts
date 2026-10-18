import { getAffiliatePartner } from "@/lib/affiliate";
import { trackServerEventSafe } from "@/lib/analytics/track";
import { getServerSiteUrl } from "@/lib/site-url";
import { NextResponse } from "next/server";

/** Counts the click, then redirects to the affiliate partner. */
export async function GET() {
  const partner = getAffiliatePartner();
  if (!partner) {
    return NextResponse.redirect(new URL("/book", getServerSiteUrl()));
  }
  void trackServerEventSafe("affiliate_click", {
    path: "/api/go/partner",
    payload: { partner: partner.name },
  });
  return NextResponse.redirect(partner.url);
}
