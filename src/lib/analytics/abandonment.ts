import { trackInternalEventSafe } from "@/lib/analytics/track";
import { BOOKING_STATUS } from "@/lib/booking/status";
import { db } from "@/lib/db";
import { analyticsEvents, bookings, type Booking } from "@/lib/db/schema";
import { and, eq, isNotNull, lt, sql } from "drizzle-orm";

const ABANDONMENT_MINUTES = 30;

function analyticsContextFromBooking(b: Booking) {
  const meta = (b.metadata ?? {}) as Record<string, unknown>;
  return {
    visitorId:
      typeof meta.analyticsVisitorId === "string"
        ? meta.analyticsVisitorId
        : null,
    sessionId:
      typeof meta.analyticsSessionId === "string"
        ? meta.analyticsSessionId
        : null,
    userId: b.userId,
  };
}

async function hasAbandonmentEvent(bookingId: string): Promise<boolean> {
  const rows = await db()
    .select({ id: analyticsEvents.id })
    .from(analyticsEvents)
    .where(
      and(
        eq(analyticsEvents.name, "checkout_abandoned"),
        sql`${analyticsEvents.payload}->>'booking_id' = ${bookingId}`,
      ),
    )
    .limit(1);
  return rows.length > 0;
}

/** Emit checkout_abandoned once per stuck pending_checkout booking. */
export async function detectCheckoutAbandonment(): Promise<number> {
  const cutoff = new Date(Date.now() - ABANDONMENT_MINUTES * 60_000);

  const stuck = await db()
    .select()
    .from(bookings)
    .where(
      and(
        eq(bookings.status, BOOKING_STATUS.PENDING_CHECKOUT),
        isNotNull(bookings.stripeSessionId),
        lt(bookings.createdAt, cutoff),
      ),
    );

  let emitted = 0;
  for (const booking of stuck) {
    if (await hasAbandonmentEvent(booking.id)) continue;

    const minutesPending = Math.round(
      (Date.now() - booking.createdAt.getTime()) / 60_000,
    );
    const ac = analyticsContextFromBooking(booking);

    await trackInternalEventSafe({
      name: "checkout_abandoned",
      visitorId: ac.visitorId,
      sessionId: ac.sessionId,
      userId: ac.userId,
      path: "/lib/analytics/abandonment",
      payload: {
        booking_id: booking.id,
        minutes_pending: minutesPending,
      },
    });
    emitted += 1;
  }

  return emitted;
}
