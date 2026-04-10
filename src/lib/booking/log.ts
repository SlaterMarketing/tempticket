import { db } from "@/lib/db";
import { bookingEvents } from "@/lib/db/schema";
import type { Booking } from "@/lib/db/schema";

export async function logBookingEvent(
  booking: Pick<Booking, "id">,
  event: string,
  payload?: Record<string, unknown> | null,
) {
  await db().insert(bookingEvents).values({
    bookingId: booking.id,
    event,
    payload: payload ?? null,
  });
}
