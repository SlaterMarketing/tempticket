import {
  analyticsEventNameSchema,
  CLIENT_ALLOWED_ANALYTICS_EVENTS,
} from "@/lib/analytics/constants";
import { insertAnalyticsEvent, recordSession } from "@/lib/analytics/track";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  name: analyticsEventNameSchema,
  path: z.string().optional(),
  payload: z.record(z.string(), z.unknown()).optional(),
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
  const clientAllowed = new Set(CLIENT_ALLOWED_ANALYTICS_EVENTS);
  if (!clientAllowed.has(parsed.data.name)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const ctx = await recordSession();
    await insertAnalyticsEvent({
      name: parsed.data.name,
      visitorId: ctx.visitorId,
      sessionId: ctx.sessionId,
      userId: ctx.userId,
      path: parsed.data.path ?? null,
      payload: parsed.data.payload ?? null,
    });
  } catch (e) {
    console.error("[api/analytics/track]", e);
  }

  return new NextResponse(null, { status: 204 });
}
