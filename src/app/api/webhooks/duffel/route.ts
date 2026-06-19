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

  const rawBody = Buffer.from(await req.arrayBuffer());
  const signature =
    req.headers.get("x-duffel-signature") ??
    req.headers.get("X-Duffel-Signature");

  if (!signature) {
    console.error("Duffel webhook missing X-Duffel-Signature header");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  if (!verifyDuffelWebhookSignature(rawBody, signature, secret)) {
    console.error("Duffel webhook signature failed", {
      bodyBytes: rawBody.length,
      secretChars: secret.trim().length,
    });
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }

  const event = parseDuffelWebhookEvent(rawBody.toString("utf8"));
  if (!event) {
    console.error("Duffel webhook invalid payload", rawBody.slice(0, 500));
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
