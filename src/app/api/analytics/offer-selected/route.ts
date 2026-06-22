import { trackServerEventSafe } from "@/lib/analytics/track";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  offer_id: z.string().min(1),
  origin: z.string().length(3).optional(),
  destination: z.string().length(3).optional(),
  date: z.string().optional(),
  total_amount: z.string().optional(),
  total_currency: z.string().optional(),
  airline: z.string().optional(),
  requires_instant_payment: z.boolean().optional(),
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
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  void trackServerEventSafe("offer_selected", {
    path: "/api/analytics/offer-selected",
    payload: parsed.data,
  });

  return new NextResponse(null, { status: 204 });
}
