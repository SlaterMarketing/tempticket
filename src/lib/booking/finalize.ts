import { logBookingEvent } from "@/lib/booking/log";
import { BOOKING_STATUS } from "@/lib/booking/status";
import { trackInternalEventSafe } from "@/lib/analytics/track";
import { db } from "@/lib/db";
import { bookings, users, type Booking } from "@/lib/db/schema";
import { getDuffel } from "@/lib/duffel";
import { formatDuffelError } from "@/lib/duffel-error";
import { getEmailFrom, getResend } from "@/lib/resend";
import type {
  CreateOrderPassenger,
  Order,
} from "@duffel/api/dist/booking/Orders/OrdersTypes";
import { eq } from "drizzle-orm";

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

export type StoredPassenger = {
  id: string;
  title: CreateOrderPassenger["title"];
  given_name: string;
  family_name: string;
  born_on: string;
  gender: CreateOrderPassenger["gender"];
  email: string;
  phone_number: string;
};

export function parsePassengers(booking: Booking): CreateOrderPassenger[] {
  const passengers = JSON.parse(booking.passengersJson) as StoredPassenger[];
  return passengers.map((p) => ({
    id: p.id,
    title: p.title,
    given_name: p.given_name,
    family_name: p.family_name,
    born_on: p.born_on,
    gender: p.gender,
    email: p.email,
    phone_number: p.phone_number,
  }));
}

/**
 * Creates the Duffel order for a booking and writes the success/failure state
 * to the DB. Shared by the Stripe webhook and the admin retry action.
 */
export async function createDuffelOrderForBooking(
  booking: Booking,
  source: string,
): Promise<
  | { ok: true; order: Order }
  | { ok: false; message: string }
> {
  await db()
    .update(bookings)
    .set({
      status: BOOKING_STATUS.DUFFEL_PROCESSING,
      failureReason: null,
      updatedAt: new Date(),
    })
    .where(eq(bookings.id, booking.id));

  try {
    const duffel = getDuffel();
    const offerRes = await duffel.offers.get(booking.duffelOfferId);
    const offer = offerRes.data;
    const passengers = parsePassengers(booking);

    const orderRes =
      booking.orderType === "pay_later"
        ? await duffel.orders.create({
            selected_offers: [offer.id],
            passengers,
            type: "pay_later",
          })
        : await duffel.orders.create({
            selected_offers: [offer.id],
            passengers,
            type: "instant",
            payments: [
              {
                type: "balance",
                amount: offer.total_amount,
                currency: offer.total_currency,
              },
            ],
          });

    await finalizeBooking(booking.id, orderRes.data, source);
    return { ok: true, order: orderRes.data };
  } catch (e) {
    const message = formatDuffelError(e);
    console.error("Duffel order failed", e);
    await db()
      .update(bookings)
      .set({
        status: BOOKING_STATUS.FAILED,
        failureReason: message,
        updatedAt: new Date(),
      })
      .where(eq(bookings.id, booking.id));
    await logBookingEvent({ id: booking.id }, "duffel_failed", {
      message,
      source,
    });
    const ac = analyticsContextFromBooking(booking);
    void trackInternalEventSafe({
      name: "booking_failed",
      visitorId: ac.visitorId,
      sessionId: ac.sessionId,
      userId: ac.userId,
      path: source,
      payload: { booking_id: booking.id, message },
    });
    return { ok: false, message };
  }
}

async function finalizeBooking(
  bookingId: string,
  order: Order,
  source: string,
) {
  const firstCarrier =
    order.slices?.[0]?.segments?.[0]?.marketing_carrier?.iata_code ?? null;

  await db()
    .update(bookings)
    .set({
      status: BOOKING_STATUS.CONFIRMED,
      duffelOrderId: order.id,
      duffelBookingRef: order.booking_reference ?? null,
      airlineIata: firstCarrier,
      failureReason: null,
      updatedAt: new Date(),
    })
    .where(eq(bookings.id, bookingId));

  await logBookingEvent({ id: bookingId }, "duffel_confirmed", {
    order_id: order.id,
    booking_reference: order.booking_reference,
    source,
  });

  const bookingRows = await db()
    .select()
    .from(bookings)
    .where(eq(bookings.id, bookingId))
    .limit(1);
  const b = bookingRows[0];
  if (!b) return;

  const ac = analyticsContextFromBooking(b);
  void trackInternalEventSafe({
    name: "booking_confirmed",
    visitorId: ac.visitorId,
    sessionId: ac.sessionId,
    userId: ac.userId,
    path: source,
    payload: {
      booking_id: bookingId,
      order_id: order.id,
      booking_reference: order.booking_reference ?? null,
    },
  });

  let to = b.customerEmail?.trim() ?? null;
  if (!to && b.userId) {
    const urows = await db()
      .select({ email: users.email })
      .from(users)
      .where(eq(users.id, b.userId))
      .limit(1);
    to = urows[0]?.email ?? null;
  }
  if (!to) return;

  const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "TempTicket";
  const ref = order.booking_reference ?? order.id;
  try {
    const resend = getResend();
    await resend.emails.send({
      from: getEmailFrom(),
      to,
      subject: `${appName} — Your reservation details`,
      text: `Your booking reference is ${ref}. Keep order id ${order.id} for support. Check the airline's website with your name and this reference to verify the reservation. This is documentation for onward-travel requirements only—not legal or immigration advice.`,
    });
  } catch (err) {
    console.error("Booking confirmation email failed", err);
    await logBookingEvent({ id: bookingId }, "email_failed", {
      message: err instanceof Error ? err.message : String(err),
    });
  }
}
