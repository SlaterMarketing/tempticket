import {
  handleDuffelWebhookEvent,
  parseDuffelWebhookEvent,
  verifyDuffelWebhookSignature,
} from "@/lib/duffel-webhook";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const secret = process.env.DUFFEL_WEBHOOK_SECRET;
  if (!secret) {
    console.error("DUFFEL_WEBHOOK_SECRET missing");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const rawBody = await req.text();
  const signature = req.headers.get("x-duffel-signature");

  if (!verifyDuffelWebhookSignature(rawBody, signature, secret)) {
    console.error("Duffel webhook signature failed");
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }

  const event = parseDuffelWebhookEvent(rawBody);
  if (!event) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    await handleDuffelWebhookEvent(event);
  } catch (err) {
    console.error("[webhooks/duffel]", event.type, err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
