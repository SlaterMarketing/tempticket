import { trackServerEventSafe } from "@/lib/analytics/track";
import { getDuffel } from "@/lib/duffel";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ offerId: string }> },
) {
  const { offerId } = await ctx.params;
  if (!offerId?.startsWith("off_")) {
    return NextResponse.json({ error: "Invalid offer" }, { status: 400 });
  }
  try {
    const duffel = getDuffel();
    const res = await duffel.offers.get(offerId);
    const o = res.data;
    void trackServerEventSafe("offer_viewed", {
      path: `/api/offers/${offerId}`,
      payload: {
        offer_id: o.id,
        total_currency: o.total_currency,
        total_amount: o.total_amount,
      },
    });
    return NextResponse.json({
      id: o.id,
      total_amount: o.total_amount,
      total_currency: o.total_currency,
      expires_at: o.expires_at,
      payment_requirements: o.payment_requirements,
      available_services: o.available_services,
      passenger_identity_documents_required:
        o.passenger_identity_documents_required,
      passengers: o.passengers,
      slices: o.slices,
      owner: o.owner,
    });
  } catch {
    return NextResponse.json({ error: "Offer not found or expired" }, { status: 404 });
  }
}
