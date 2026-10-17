import { trackServerEventSafe } from "@/lib/analytics/track";
import {
  findFallback,
  searchHoldableOffers,
  type SearchFallback,
} from "@/lib/flights/search-holdable";
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

  const firstSliceForAnalytics = parsed.data.slices[0];
  const searchAnalyticsBase = firstSliceForAnalytics
    ? {
        origin: firstSliceForAnalytics.origin,
        destination: firstSliceForAnalytics.destination,
        date: firstSliceForAnalytics.departure_date,
        cabin_class: parsed.data.cabin_class,
        passenger_count: parsed.data.passengers.length,
        slice_count: parsed.data.slices.length,
      }
    : null;

  if (searchAnalyticsBase) {
    void trackServerEventSafe("search_attempted", {
      path: "/api/flights/search",
      payload: searchAnalyticsBase,
    });
  }

  try {
    const primary = await searchHoldableOffers(
      parsed.data.slices,
      parsed.data.passengers,
      parsed.data.cabin_class,
    );
    let result = primary;
    let fallback: SearchFallback | null = null;

    // Most travellers need *any* onward flight; when the exact route/date has
    // no holdable fare, try nearby dates and big hubs before giving up.
    if (primary.offers.length === 0 && parsed.data.slices.length === 1) {
      const found = await findFallback(
        parsed.data.slices[0]!,
        parsed.data.passengers,
        parsed.data.cabin_class,
      );
      if (found) {
        result = found.result;
        fallback = found.fallback;
      }
    }

    const offersOrdered = result.offers;

    if (searchAnalyticsBase) {
      void trackServerEventSafe("search_performed", {
        path: "/api/flights/search",
        payload: {
          ...searchAnalyticsBase,
          offer_count: offersOrdered.length,
          fallback: fallback?.reason ?? null,
        },
      });
    }

    return NextResponse.json({
      offer_request_id: result.offerRequestId,
      offers: offersOrdered,
      fallback,
    });
  } catch (e) {
    console.error("Duffel search error", e);
    if (searchAnalyticsBase) {
      void trackServerEventSafe("search_failed", {
        path: "/api/flights/search",
        payload: searchAnalyticsBase,
      });
    }
    return NextResponse.json(
      { error: "Flight search failed. Try different dates or airports." },
      { status: 502 },
    );
  }
}
