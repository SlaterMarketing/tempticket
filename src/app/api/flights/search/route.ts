import { getDuffel } from "@/lib/duffel";
import { orderOffersHoldCheapestFirst } from "@/lib/flights/pick-best-hold-offer";
import { NextResponse } from "next/server";
import { z } from "zod";

const sliceSchema = z.object({
  origin: z.string().min(3).max(3),
  destination: z.string().min(3).max(3),
  departure_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const bodySchema = z.object({
  slices: z.array(sliceSchema).min(1).max(2),
  passengers: z
    .array(z.object({ type: z.enum(["adult", "child", "infant_without_seat"]) }))
    .min(1)
    .max(9),
  cabin_class: z
    .enum(["economy", "premium_economy", "business", "first"])
    .optional()
    .default("economy"),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid search", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const duffel = getDuffel();
    const res = await duffel.offerRequests.create({
      return_offers: true,
      slices: parsed.data.slices.map((s) => ({
        origin: s.origin,
        destination: s.destination,
        departure_date: s.departure_date,
      })),
      passengers: parsed.data.passengers,
      cabin_class: parsed.data.cabin_class,
    } as Parameters<typeof duffel.offerRequests.create>[0]);

    const offers = res.data.offers ?? [];
    const slim = offers.slice(0, 40).map((o) => ({
      id: o.id,
      total_amount: o.total_amount,
      total_currency: o.total_currency,
      expires_at: o.expires_at,
      owner: o.owner,
      slices: o.slices.map((sl) => ({
        origin: sl.origin.iata_code,
        destination: sl.destination.iata_code,
        departing_at: sl.segments?.[0]?.departing_at,
        arriving_at:
          sl.segments?.[sl.segments.length - 1]?.arriving_at ?? null,
        duration: sl.duration,
        segments:
          sl.segments?.map((seg) => ({
            marketing_carrier: seg.marketing_carrier.iata_code,
            operating_carrier: seg.operating_carrier.iata_code,
            departing_at: seg.departing_at,
            arriving_at: seg.arriving_at,
          })) ?? [],
      })),
      payment_requirements: o.payment_requirements,
    }));

    const offersOrdered = orderOffersHoldCheapestFirst(slim);

    return NextResponse.json({
      offer_request_id: res.data.id,
      offers: offersOrdered,
    });
  } catch (e) {
    console.error("Duffel search error", e);
    return NextResponse.json(
      { error: "Flight search failed. Try different dates or airports." },
      { status: 502 },
    );
  }
}
