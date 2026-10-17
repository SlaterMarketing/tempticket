import { ADMIN_EMAIL } from "@/lib/auth/admin";
import { logBookingEvent } from "@/lib/booking/log";
import { getEmailFrom, getResend } from "@/lib/resend";
import { getServerSiteUrl } from "@/lib/site-url";

async function sendPlainEmail(to: string, subject: string, text: string) {
  const { error } = await getResend().emails.send({
    from: getEmailFrom(),
    to,
    subject,
    text,
  });
  if (error) {
    throw new Error(
      typeof error === "object" ? JSON.stringify(error) : String(error),
    );
  }
}

/** Emails the site owner so a stuck or failed booking never goes unnoticed. */
export async function alertAdminAboutBooking(
  bookingId: string,
  subject: string,
  detail: string,
): Promise<void> {
  const adminUrl = `${getServerSiteUrl()}/admin/bookings`;
  try {
    await sendPlainEmail(
      ADMIN_EMAIL,
      `[TempTicket] ${subject}`,
      `${detail}\n\nBooking: ${bookingId}\n${adminUrl}`,
    );
  } catch (err) {
    console.error("Admin booking alert failed", err);
    await logBookingEvent({ id: bookingId }, "admin_alert_failed", {
      message: err instanceof Error ? err.message : String(err),
    });
  }
}

/** Tells the customer we couldn't reserve their flight and their card wasn't charged. */
export async function sendBookingFailedEmail(
  bookingId: string,
  to: string,
): Promise<void> {
  const bookUrl = `${getServerSiteUrl()}/book`;
  try {
    await sendPlainEmail(
      to,
      "TempTicket — we couldn't reserve that flight",
      [
        "Sorry, the airline didn't accept the reservation for the flight you picked, so we've cancelled the payment.",
        "Your card was not charged. The temporary hold on it will disappear within a few days, depending on your bank.",
        "",
        `You can pick another flight here: ${bookUrl}`,
        "",
        `Reference for support: ${bookingId}`,
      ].join("\n"),
    );
  } catch (err) {
    console.error("Booking failed email failed", err);
    await logBookingEvent({ id: bookingId }, "email_failed", {
      kind: "booking_failed",
      message: err instanceof Error ? err.message : String(err),
    });
  }
}
