import { isAdminEmail } from "@/lib/auth/admin";
import { getSession } from "@/lib/auth/session";
import { logBookingEvent } from "@/lib/booking/log";
import { BOOKING_STATUS } from "@/lib/booking/status";
import { createDuffelOrderForBooking } from "@/lib/booking/finalize";
import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session || !isAdminEmail(session.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const rows = await db()
    .select()
    .from(bookings)
    .where(eq(bookings.id, id))
    .limit(1);
  const booking = rows[0];
  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  if (
    booking.status !== BOOKING_STATUS.FAILED &&
    booking.status !== BOOKING_STATUS.PAID
  ) {
    return NextResponse.json(
      { error: `Cannot retry a booking in status "${booking.status}"` },
      { status: 409 },
    );
  }

  if (
    booking.stripePaymentStatus !== "paid" &&
    booking.stripePaymentStatus !== "partially_refunded"
  ) {
    return NextResponse.json(
      { error: "Booking has not been paid; nothing to retry." },
      { status: 409 },
    );
  }

  if (booking.duffelOrderId) {
    return NextResponse.json(
      {
        error: `Booking already has Duffel order ${booking.duffelOrderId}; nothing to retry.`,
      },
      { status: 409 },
    );
  }

  await logBookingEvent({ id: booking.id }, "retry_started", {
    actor: session.email,
    previous_status: booking.status,
    previous_reason: booking.failureReason,
  });

  // Tries the stored offer first, then a fresh search of the same route.
  const result = await createDuffelOrderForBooking(
    booking,
    "/api/admin/bookings/retry",
  );

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    order_id: result.order.id,
    booking_reference: result.order.booking_reference ?? null,
  });
}
