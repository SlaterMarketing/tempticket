import type { Order } from "@duffel/api/dist/booking/Orders/OrdersTypes";

type SegmentPassenger = {
  cabin_class?: string | null;
  cabin_class_marketing_name?: string | null;
};

const BRAND_BLUE = "#2262bb";
const BRAND_BLUE_DARK = "#1b4f99";
const BRAND_GREEN = "#38aa90";
const BRAND_GREEN_LIGHT = "#c7eadf";
const MUTED = "#6b7280";
const CARD_BG = "#1b3a73";
const CARD_ACCENT = "#2b5da8";
const PAGE_BG = "#f5f7fb";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "TempTicket";

function appUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ).replace(/\/$/, "");
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseIso(iso: string) {
  const t = iso.replace(/Z$/, "");
  const d = new Date(`${t}Z`);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

function formatLongDate(iso: string) {
  const d = parseIso(iso);
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = d.toLocaleString("en-GB", {
    month: "long",
    timeZone: "UTC",
  });
  const year = d.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}

function formatShortDate(iso: string) {
  const d = parseIso(iso);
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const year = d.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

function cabinLabel(passengers: SegmentPassenger[] | undefined) {
  const first = passengers?.[0];
  if (!first) return null;
  const raw =
    first.cabin_class_marketing_name ?? first.cabin_class ?? "economy";
  return raw.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function passengerDisplay(p: {
  title?: string | null;
  given_name: string;
  family_name: string;
}) {
  const title = (p.title ?? "").trim();
  const cap = title ? title.charAt(0).toUpperCase() + title.slice(1) : "";
  const given = p.given_name.trim();
  const family = p.family_name.trim();
  return cap ? `${cap}. ${given} ${family}` : `${given} ${family}`;
}

export type ConfirmationEmailInput = {
  order: Order;
  bookingId: string;
  itineraryUrl: string;
};

export function buildConfirmationEmailSubject(order: Order): string {
  const first = order.slices[0]?.segments[0];
  const last =
    order.slices[order.slices.length - 1]?.segments?.slice(-1)[0] ?? first;
  const origin = first?.origin?.iata_code ?? "";
  const destination = last?.destination?.iata_code ?? "";
  const date = first ? formatShortDate(first.departing_at) : "";
  if (origin && destination && date) {
    return `Your trip from ${origin} to ${destination} on ${date} is confirmed!`;
  }
  return `${APP_NAME} — Your reservation is confirmed`;
}

export function buildConfirmationEmail(
  input: ConfirmationEmailInput,
): { subject: string; html: string; text: string } {
  const { order, itineraryUrl } = input;
  const firstPax = order.passengers?.[0];
  const passengerLabel = firstPax
    ? `${firstPax.family_name}`.trim()
    : "traveller";
  const allPassengerNames = order.passengers.map((p) => passengerDisplay(p));
  const pnr = order.booking_reference ?? order.id;
  const airlineName = order.owner?.name ?? "—";
  const logoUrl = `${appUrl()}/tempticket.png`;
  const accountUrl = `${appUrl()}/account/bookings`;
  const supportEmail = `support@${process.env.EMAIL_DOMAIN ?? "tempticket.com"}`;

  const subject = buildConfirmationEmailSubject(order);

  const slicesHtml = order.slices
    .map((slice) => {
      const first = slice.segments[0];
      const last = slice.segments[slice.segments.length - 1];
      if (!first || !last) return "";
      const departDate = formatLongDate(first.departing_at);
      const fromIata = first.origin?.iata_code ?? "—";
      const fromCity =
        first.origin?.city_name ?? first.origin?.name ?? "";
      const toIata = last.destination?.iata_code ?? "—";
      const toCity =
        last.destination?.city_name ?? last.destination?.name ?? "";
      const cabin = cabinLabel(
        first.passengers as unknown as SegmentPassenger[] | undefined,
      );

      return `
        <tr>
          <td style="padding:0 28px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="border-top:1px solid ${CARD_ACCENT};margin:22px 0 4px;">
              <tr><td style="height:18px;font-size:0;line-height:0;">&nbsp;</td></tr>
              <tr>
                <td align="center" style="font:700 13px/1 Arial,Helvetica,sans-serif;letter-spacing:2px;color:#ffffff;text-transform:uppercase;padding-bottom:4px;">
                  Departure
                </td>
              </tr>
              <tr>
                <td align="center" style="font:400 14px/1.4 Arial,Helvetica,sans-serif;color:rgba(255,255,255,0.78);padding-bottom:20px;">
                  ${escapeHtml(departDate)}${cabin ? ` &nbsp;·&nbsp; ${escapeHtml(cabin)}` : ""}
                </td>
              </tr>
            </table>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" width="38%" style="padding:4px 0 22px;">
                  <div style="font:500 12px/1 Arial,Helvetica,sans-serif;color:rgba(255,255,255,0.75);letter-spacing:1px;text-transform:uppercase;">From</div>
                  <div style="font:700 34px/1 Arial,Helvetica,sans-serif;color:#ffffff;margin-top:8px;letter-spacing:1px;">${escapeHtml(fromIata)}</div>
                  <div style="font:400 13px/1.3 Arial,Helvetica,sans-serif;color:rgba(255,255,255,0.82);margin-top:6px;">${escapeHtml(fromCity)}</div>
                </td>
                <td align="center" width="24%" style="padding:4px 0 22px;">
                  <div style="display:inline-block;width:46px;height:46px;border-radius:10px;background:${BRAND_BLUE};line-height:46px;text-align:center;font:700 22px/46px Arial,Helvetica,sans-serif;color:#ffffff;">&#9992;</div>
                </td>
                <td align="center" width="38%" style="padding:4px 0 22px;">
                  <div style="font:500 12px/1 Arial,Helvetica,sans-serif;color:rgba(255,255,255,0.75);letter-spacing:1px;text-transform:uppercase;">To</div>
                  <div style="font:700 34px/1 Arial,Helvetica,sans-serif;color:#ffffff;margin-top:8px;letter-spacing:1px;">${escapeHtml(toIata)}</div>
                  <div style="font:400 13px/1.3 Arial,Helvetica,sans-serif;color:rgba(255,255,255,0.82);margin-top:6px;">${escapeHtml(toCity)}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>`;
    })
    .join("");

  const passengersHtml = allPassengerNames
    .map(
      (n) =>
        `<div style="font:500 15px/1.5 Arial,Helvetica,sans-serif;color:#ffffff;padding:4px 0;">&#128100;&nbsp;&nbsp;${escapeHtml(
          n,
        )}</div>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:${PAGE_BG};-webkit-font-smoothing:antialiased;">
    <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0;">
      Your reservation is confirmed. PNR ${escapeHtml(pnr)}. Itinerary PDF attached.
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
           style="background:${PAGE_BG};">
      <tr>
        <td align="center" style="padding:32px 16px;">

          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
                 style="width:600px;max-width:600px;">
            <!-- Top bar: logo + itinerary header -->
            <tr>
              <td style="padding:0 4px 16px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="left" valign="middle">
                      <img src="${logoUrl}" alt="${escapeHtml(APP_NAME)}" width="56" height="56"
                           style="display:block;border:0;outline:none;text-decoration:none;width:56px;height:56px;border-radius:12px;" />
                    </td>
                    <td align="right" valign="middle"
                        style="font:400 13px/1.5 Arial,Helvetica,sans-serif;color:${BRAND_BLUE};">
                      Flight Itinerary for: <strong>${escapeHtml(passengerLabel)}</strong><br />
                      Confirmation code: <strong>${escapeHtml(pnr)}</strong>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Headline -->
            <tr>
              <td align="center" style="padding:18px 8px 6px;">
                <h1 style="margin:0;font:700 26px/1.25 Arial,Helvetica,sans-serif;color:${BRAND_BLUE};">
                  Your booking is confirmed!
                </h1>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:0 8px 24px;">
                <p style="margin:8px 0 0;font:400 15px/1.55 Arial,Helvetica,sans-serif;color:${MUTED};">
                  Thank you for choosing ${escapeHtml(APP_NAME)}.<br />
                  Your reservation is confirmed and your itinerary is attached to this email.
                </p>
              </td>
            </tr>

            <!-- Flight details card -->
            <tr>
              <td style="padding:0 0 16px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                       style="background:${CARD_BG};border-radius:16px;overflow:hidden;">
                  <tr>
                    <td align="center" style="padding:22px 24px 4px;font:700 14px/1 Arial,Helvetica,sans-serif;color:#ffffff;letter-spacing:2px;text-transform:uppercase;">
                      Flight details
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:18px 28px 4px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td width="50%" align="left" style="padding:8px 0;">
                            <div style="font:500 12px/1 Arial,Helvetica,sans-serif;color:rgba(255,255,255,0.72);letter-spacing:1px;text-transform:uppercase;">PNR Code</div>
                            <div style="font:700 18px/1.2 Arial,Helvetica,sans-serif;color:#ffffff;margin-top:6px;letter-spacing:1px;">${escapeHtml(pnr)}</div>
                          </td>
                          <td width="50%" align="right" style="padding:8px 0;">
                            <div style="font:500 12px/1 Arial,Helvetica,sans-serif;color:rgba(255,255,255,0.72);letter-spacing:1px;text-transform:uppercase;">Airline</div>
                            <div style="font:700 16px/1.25 Arial,Helvetica,sans-serif;color:#ffffff;margin-top:6px;">${escapeHtml(airlineName)}</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  ${slicesHtml}

                  <tr>
                    <td style="padding:0 28px;">
                      <div style="border-top:1px solid ${CARD_ACCENT};margin:6px 0 18px;"></div>
                      <div align="center" style="font:700 13px/1 Arial,Helvetica,sans-serif;color:#ffffff;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">Passengers</div>
                      ${passengersHtml}
                    </td>
                  </tr>
                  <tr><td style="height:24px;font-size:0;line-height:0;">&nbsp;</td></tr>
                </table>
              </td>
            </tr>

            <!-- CTA card -->
            <tr>
              <td align="center" style="padding:4px 0 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="center" bgcolor="${BRAND_GREEN}" style="border-radius:12px;">
                      <a href="${itineraryUrl}"
                         style="display:inline-block;padding:14px 32px;font:700 15px/1 Arial,Helvetica,sans-serif;color:#ffffff;text-decoration:none;letter-spacing:1px;text-transform:uppercase;border-radius:12px;background:${BRAND_GREEN};">
                        Download your ticket
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:12px 24px 4px;">
                <p style="margin:0;font:400 13px/1.5 Arial,Helvetica,sans-serif;color:${MUTED};">
                  Your itinerary PDF is attached to this email, and always available in
                  <a href="${accountUrl}" style="color:${BRAND_BLUE};text-decoration:underline;">your account</a>.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding:28px 16px 0;">
                <p style="margin:0;font:400 12px/1.6 Arial,Helvetica,sans-serif;color:${MUTED};">
                  Questions or issues with your order?<br />
                  Please email us at <a href="mailto:${supportEmail}" style="color:${BRAND_BLUE};text-decoration:underline;">${supportEmail}</a> — a member of the support team will be happy to help.
                </p>
                <p style="margin:18px 0 0;font:400 11px/1.6 Arial,Helvetica,sans-serif;color:#9aa3b2;">
                  This reservation is documentation for onward-travel requirements only and is not legal or immigration advice.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    `Your booking is confirmed!`,
    ``,
    `Confirmation code (PNR): ${pnr}`,
    `Airline: ${airlineName}`,
    ``,
    ...order.slices.map((sl) => {
      const f = sl.segments[0];
      const l = sl.segments[sl.segments.length - 1];
      if (!f || !l) return "";
      return `- ${formatLongDate(f.departing_at)}: ${f.origin?.iata_code} (${
        f.origin?.city_name ?? ""
      }) → ${l.destination?.iata_code} (${l.destination?.city_name ?? ""})`;
    }),
    ``,
    `Passengers: ${allPassengerNames.join(", ")}`,
    ``,
    `Download your itinerary: ${itineraryUrl}`,
    `Your bookings: ${accountUrl}`,
    ``,
    `Support: ${supportEmail}`,
    `This reservation is documentation for onward-travel requirements only and is not legal or immigration advice.`,
  ].join("\n");

  return { subject, html, text };
}
