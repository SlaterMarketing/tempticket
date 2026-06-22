import { PG_UUID_RE } from "@/lib/analytics/constants";
import { db } from "@/lib/db";
import { analyticsEvents, bookings } from "@/lib/db/schema";
import { and, eq, isNotNull, isNull, sql } from "drizzle-orm";

/** Attach guest checkout bookings and past analytics events when the user signs in. */
export async function linkGuestBookingsToUser(
  userId: string,
  email: string,
): Promise<void> {
  if (!PG_UUID_RE.test(userId)) return;

  const emailLower = email.trim().toLowerCase();
  const guestBookings = await db()
    .select()
    .from(bookings)
    .where(
      and(
        isNull(bookings.userId),
        isNotNull(bookings.customerEmail),
        sql`lower(${bookings.customerEmail}) = ${emailLower}`,
      ),
    );

  for (const booking of guestBookings) {
    await db()
      .update(bookings)
      .set({ userId, updatedAt: new Date() })
      .where(eq(bookings.id, booking.id));

    const meta = (booking.metadata ?? {}) as Record<string, unknown>;
    const visitorId =
      typeof meta.analyticsVisitorId === "string"
        ? meta.analyticsVisitorId
        : null;
    if (!visitorId || !PG_UUID_RE.test(visitorId)) continue;

    await db()
      .update(analyticsEvents)
      .set({ userId })
      .where(
        and(
          eq(analyticsEvents.visitorId, visitorId),
          isNull(analyticsEvents.userId),
        ),
      );
  }
}
