import {
  confirmBookingFromDuffelWebhook,
  failBookingFromDuffelWebhook,
} from "@/lib/booking/finalize";
import { logBookingEvent } from "@/lib/booking/log";
import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import crypto from "node:crypto";

export type DuffelWebhookEvent = {
  id: string;
  type: string;
  idempotency_key: string;
  live_mode: boolean;
  created_at: string;
  api_version?: string;
  data?: {
    object?: Record<string, unknown>;
  } | null;
};

export function verifyDuffelWebhookSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
): boolean {
  if (!signatureHeader?.trim()) return false;

  let timestamp: string | undefined;
  let signature: string | undefined;
  for (const part of signatureHeader.split(",")) {
    const eqIdx = part.indexOf("=");
    if (eqIdx === -1) continue;
    const key = part.slice(0, eqIdx);
    const value = part.slice(eqIdx + 1);
    if (key === "t") timestamp = value;
    if (key === "v1") signature = value;
  }
  if (!timestamp || !signature) return false;

  const expected = crypto
    .createHmac("sha256", Buffer.from(secret, "utf8"))
    .update(`${timestamp}.${rawBody}`, "utf8")
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, "utf8"),
      Buffer.from(expected, "utf8"),
    );
  } catch {
    return false;
  }
}

export function parseDuffelWebhookEvent(rawBody: string): DuffelWebhookEvent | null {
  try {
    const parsed = JSON.parse(rawBody) as { data?: DuffelWebhookEvent };
    if (!parsed.data?.type || !parsed.data.idempotency_key) {
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

function extractOfferIdFromFailure(
  event: DuffelWebhookEvent,
): string | null {
  const key = event.idempotency_key;
  if (key.startsWith("off_")) return key;

  const obj = event.data?.object;
  if (typeof obj?.offer_id === "string") return obj.offer_id;
  if (typeof obj?.selected_offers === "object" && obj.selected_offers !== null) {
    const offers = obj.selected_offers as unknown[];
    const first = offers[0];
    if (typeof first === "string" && first.startsWith("off_")) return first;
  }
  return null;
}

function failureMessageFromEvent(event: DuffelWebhookEvent): string {
  const obj = event.data?.object;
  if (obj && typeof obj === "object") {
    const errors = obj.errors;
    if (Array.isArray(errors) && errors.length > 0) {
      const first = errors[0] as Record<string, unknown>;
      if (typeof first.message === "string") return first.message;
    }
  }
  return "Duffel order creation failed.";
}

export async function handleDuffelWebhookEvent(
  event: DuffelWebhookEvent,
): Promise<void> {
  const source = "/api/webhooks/duffel";

  switch (event.type) {
    case "ping.triggered":
      return;

    case "order.created":
      await confirmBookingFromDuffelWebhook(
        event.idempotency_key,
        source,
        event.data?.object ?? null,
      );
      return;

    case "order.creation_failed": {
      const offerId = extractOfferIdFromFailure(event);
      if (!offerId) return;
      const message = failureMessageFromEvent(event);
      await failBookingFromDuffelWebhook(offerId, message, source);
      return;
    }

    case "order.airline_initiated_change_detected": {
      const orderId = event.idempotency_key;
      const rows = await db()
        .select()
        .from(bookings)
        .where(eq(bookings.duffelOrderId, orderId))
        .limit(1);
      const booking = rows[0];
      if (!booking) return;

      await logBookingEvent({ id: booking.id }, "airline_schedule_change", {
        source,
        webhook_event_id: event.id,
        order_id: orderId,
      });
      return;
    }

    default:
      return;
  }
}
