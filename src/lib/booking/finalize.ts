import { logBookingEvent } from "@/lib/booking/log";
import { BOOKING_STATUS } from "@/lib/booking/status";
import { trackInternalEventSafe } from "@/lib/analytics/track";
import { db } from "@/lib/db";
import { bookings, users, type Booking } from "@/lib/db/schema";
import { getDuffel } from "@/lib/duffel";
import { formatDuffelError } from "@/lib/duffel-error";
import { findFreshOffer, getOfferSnapshot } from "@/lib/booking/fresh-offer";
import { buildConfirmationEmail } from "@/lib/booking/confirmation-email";
import {
  itineraryFilename,
  renderItineraryPdf,
} from "@/lib/booking/itinerary-pdf";
import { getEmailFrom, getResend } from "@/lib/resend";
import { getServerSiteUrl } from "@/lib/site-url";
import type {
  CreateOrderPassenger,
  Order,
} from "@duffel/api/dist/booking/Orders/OrdersTypes";
import { eq, and, ne, or } from "drizzle-orm";

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

export function parsePassengers(
  booking: Pick<Booking, "passengersJson">,
): CreateOrderPassenger[] {
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

/** Places a pay-later (hold) order; never pays airfare from the Duffel balance. */
async function placeHoldOrder(
  offerId: string,
  passengers: CreateOrderPassenger[],
): Promise<Order> {
  const duffel = getDuffel();
  const offer = (await duffel.offers.get(offerId)).data;
  if (offer.payment_requirements?.requires_instant_payment !== false) {
    throw new Error("Offer can no longer be held without instant payment.");
  }
  const orderRes = await duffel.orders.create({
    selected_offers: [offer.id],
    passengers,
    type: "pay_later",
  });
  return orderRes.data;
}

/**
 * Creates the Duffel order for a booking and writes the success/failure state
 * to the DB. If the original offer can't be booked (usually because it
 * expired), re-searches the same route once and books the fresh fare.
 * Shared by checkout fulfilment and the admin retry/test actions.
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
    .where(
      and(eq(bookings.id, booking.id), ne(bookings.status, BOOKING_STATUS.CONFIRMED)),
    );

  let message = "Duffel order failed.";
  let order: Order | null = null;
  try {
    order = await placeHoldOrder(
      booking.duffelOfferId,
      parsePassengers(booking),
    );
  } catch (e) {
    message = formatDuffelError(e);
    console.error("Duffel order failed", e);
  }
  // Finalize outside the try so a DB/email error never triggers a second order.
  if (order) {
    await finalizeBooking(booking.id, order, source);
    return { ok: true, order };
  }

  const snapshot = getOfferSnapshot(booking);
  if (snapshot) {
    await logBookingEvent({ id: booking.id }, "duffel_first_attempt_failed", {
      message,
      source,
    });
    const fresh = await findFreshOffer(snapshot);
    if (fresh.ok) {
      const passengers = (
        JSON.parse(booking.passengersJson) as StoredPassenger[]
      ).map((p) => ({
        ...p,
        id: fresh.offer.passengerIdMap.get(p.id) ?? p.id,
      }));
      await db()
        .update(bookings)
        .set({
          duffelOfferId: fresh.offer.offerId,
          passengersJson: JSON.stringify(passengers),
          updatedAt: new Date(),
        })
        .where(eq(bookings.id, booking.id));
      await logBookingEvent({ id: booking.id }, "retry_offer_replaced", {
        new_offer_id: fresh.offer.offerId,
        new_total_amount: fresh.offer.totalAmount,
        new_total_currency: fresh.offer.totalCurrency,
        source,
      });
      try {
        order = await placeHoldOrder(
          fresh.offer.offerId,
          parsePassengers({ passengersJson: JSON.stringify(passengers) }),
        );
      } catch (e) {
        message = formatDuffelError(e);
        console.error("Duffel order failed on fresh offer", e);
      }
      if (order) {
        await finalizeBooking(booking.id, order, source);
        return { ok: true, order };
      }
    } else {
      message = `${message} (fresh search: ${fresh.message})`;
    }
  }

  await db()
    .update(bookings)
    .set({
      status: BOOKING_STATUS.FAILED,
      failureReason: message,
      updatedAt: new Date(),
    })
    .where(
      and(eq(bookings.id, booking.id), ne(bookings.status, BOOKING_STATUS.CONFIRMED)),
    );
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

async function finalizeBooking(
  bookingId: string,
  order: Order,
  source: string,
) {
  const firstCarrier =
    order.slices?.[0]?.segments?.[0]?.marketing_carrier?.iata_code ?? null;

  // Only the first caller to confirm sends the email (sync path and Duffel webhook can race).
  const confirmed = await db()
    .update(bookings)
    .set({
      status: BOOKING_STATUS.CONFIRMED,
      duffelOrderId: order.id,
      duffelBookingRef: order.booking_reference ?? null,
      airlineIata: firstCarrier,
      failureReason: null,
      updatedAt: new Date(),
    })
    .where(
      and(eq(bookings.id, bookingId), ne(bookings.status, BOOKING_STATUS.CONFIRMED)),
    )
    .returning({ id: bookings.id });
  if (confirmed.length === 0) return;

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

  let pdfBuffer: Buffer | null = null;
  try {
    pdfBuffer = await renderItineraryPdf({ order, bookingId });
  } catch (err) {
    console.error("Itinerary PDF render failed", err);
    await logBookingEvent({ id: bookingId }, "itinerary_pdf_failed", {
      message: err instanceof Error ? err.message : String(err),
    });
  }

  const appUrl = getServerSiteUrl();
  const { subject, html, text } = buildConfirmationEmail({
    order,
    bookingId,
    itineraryUrl: `${appUrl}/api/bookings/${bookingId}/itinerary`,
  });

  try {
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: getEmailFrom(),
      to,
      subject,
      html,
      text,
      attachments: pdfBuffer
        ? [
            {
              filename: itineraryFilename(order),
              content: pdfBuffer,
            },
          ]
        : undefined,
    });
    if (error) {
      console.error("Booking confirmation email failed", error);
      await logBookingEvent({ id: bookingId }, "email_failed", {
        message:
          typeof error === "object"
            ? JSON.stringify(error)
            : String(error),
      });
    }
  } catch (err) {
    console.error("Booking confirmation email failed", err);
    await logBookingEvent({ id: bookingId }, "email_failed", {
      message: err instanceof Error ? err.message : String(err),
    });
  }
}

/** Sync booking state when Duffel sends order.created (backup to the synchronous API path). */
export async function confirmBookingFromDuffelWebhook(
  orderId: string,
  source: string,
  embeddedOrder?: Record<string, unknown> | null,
): Promise<void> {
  const byOrderId = await db()
    .select()
    .from(bookings)
    .where(eq(bookings.duffelOrderId, orderId))
    .limit(1);
  let booking = byOrderId[0];

  const offerId =
    typeof embeddedOrder?.offer_id === "string"
      ? embeddedOrder.offer_id
      : null;

  if (!booking && offerId) {
    const byOffer = await db()
      .select()
      .from(bookings)
      .where(
        and(
          eq(bookings.duffelOfferId, offerId),
          or(
            eq(bookings.status, BOOKING_STATUS.PAID),
            eq(bookings.status, BOOKING_STATUS.DUFFEL_PROCESSING),
          ),
        ),
      )
      .limit(1);
    booking = byOffer[0];
  }

  if (!booking || booking.status === BOOKING_STATUS.CONFIRMED) {
    return;
  }

  const duffel = getDuffel();
  const orderRes = await duffel.orders.get(orderId);
  await finalizeBooking(booking.id, orderRes.data, source);
}

/** Mark a booking failed when Duffel sends order.creation_failed. */
export async function failBookingFromDuffelWebhook(
  offerId: string,
  message: string,
  source: string,
): Promise<void> {
  const rows = await db()
    .select()
    .from(bookings)
    .where(
      and(
        eq(bookings.duffelOfferId, offerId),
        or(
          eq(bookings.status, BOOKING_STATUS.PAID),
          eq(bookings.status, BOOKING_STATUS.DUFFEL_PROCESSING),
        ),
      ),
    )
    .limit(1);
  const booking = rows[0];
  if (!booking) return;

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
    via: "webhook",
  });
}
