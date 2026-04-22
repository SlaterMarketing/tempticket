import { isAdminEmail } from "@/lib/auth/admin";
import { getSession } from "@/lib/auth/session";
import {
  itineraryFilename,
  renderItineraryPdf,
} from "@/lib/booking/itinerary-pdf";
import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { getDuffel } from "@/lib/duffel";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
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
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const emailLower = session.email.trim().toLowerCase();
  const isOwner =
    booking.userId === session.sub ||
    booking.customerEmail?.trim().toLowerCase() === emailLower;
  const isAdmin = isAdminEmail(session.email);
  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!booking.duffelOrderId) {
    return NextResponse.json(
      { error: "No Duffel order associated with this booking." },
      { status: 409 },
    );
  }

  try {
    const duffel = getDuffel();
    const orderRes = await duffel.orders.get(booking.duffelOrderId);
    const pdf = await renderItineraryPdf({
      order: orderRes.data,
      bookingId: booking.id,
    });

    return new Response(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${itineraryFilename(
          orderRes.data,
        )}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (e) {
    console.error("[itinerary pdf]", e);
    return NextResponse.json(
      {
        error:
          e instanceof Error ? e.message : "Could not generate itinerary PDF.",
      },
      { status: 502 },
    );
  }
}
