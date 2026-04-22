const BRAND_BLUE = "#2262bb";
const BRAND_GREEN = "#38aa90";
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

export type LoginEmailInput = {
  code: string;
  magicLinkUrl: string;
  ttlMinutes: number;
};

export function buildLoginEmail({
  code,
  magicLinkUrl,
  ttlMinutes,
}: LoginEmailInput): { subject: string; html: string; text: string } {
  const subject = `Your ${APP_NAME} sign-in code: ${code}`;
  const logoUrl = `${appUrl()}/tempticket.png`;
  const supportEmail = `support@${process.env.EMAIL_DOMAIN ?? "tempticket.com"}`;

  const digitBlocks = code
    .split("")
    .map(
      (d) => `
        <td align="center" valign="middle"
            style="width:44px;height:56px;background:rgba(255,255,255,0.08);border:1px solid ${CARD_ACCENT};border-radius:10px;
                   font:700 28px/1 Arial,Helvetica,sans-serif;color:#ffffff;letter-spacing:1px;">
          ${escapeHtml(d)}
        </td>
        <td style="width:8px;font-size:0;line-height:0;">&nbsp;</td>`,
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
      Your ${escapeHtml(APP_NAME)} sign-in code is ${escapeHtml(code)}. It expires in ${ttlMinutes} minutes.
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PAGE_BG};">
      <tr>
        <td align="center" style="padding:32px 16px;">

          <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0"
                 style="width:560px;max-width:560px;">
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
                      Secure sign-in<br />
                      <strong>${escapeHtml(APP_NAME)}</strong>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:18px 8px 6px;">
                <h1 style="margin:0;font:700 26px/1.25 Arial,Helvetica,sans-serif;color:${BRAND_BLUE};">
                  Sign in to ${escapeHtml(APP_NAME)}
                </h1>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:0 8px 24px;">
                <p style="margin:8px 0 0;font:400 15px/1.55 Arial,Helvetica,sans-serif;color:${MUTED};">
                  Use the one-tap button below, or paste the 6-digit code into the sign-in page.
                </p>
              </td>
            </tr>

            <!-- Code card -->
            <tr>
              <td style="padding:0 0 16px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                       style="background:${CARD_BG};border-radius:16px;overflow:hidden;">
                  <tr>
                    <td align="center" style="padding:24px 24px 6px;font:700 13px/1 Arial,Helvetica,sans-serif;color:#ffffff;letter-spacing:2px;text-transform:uppercase;">
                      Your sign-in code
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding:18px 24px 8px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                        <tr>${digitBlocks}</tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding:0 24px 20px;font:400 13px/1.5 Arial,Helvetica,sans-serif;color:rgba(255,255,255,0.78);">
                      Expires in ${ttlMinutes} minutes. Only use it if you requested this sign-in.
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding:0 24px 26px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td align="center" bgcolor="${BRAND_GREEN}" style="border-radius:12px;">
                            <a href="${magicLinkUrl}"
                               style="display:inline-block;padding:14px 32px;font:700 15px/1 Arial,Helvetica,sans-serif;color:#ffffff;text-decoration:none;letter-spacing:1px;text-transform:uppercase;border-radius:12px;background:${BRAND_GREEN};">
                              Sign in with one click
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:4px 16px 0;">
                <p style="margin:0;font:400 13px/1.6 Arial,Helvetica,sans-serif;color:${MUTED};">
                  Button not working? Copy and paste this URL into your browser:<br />
                  <a href="${magicLinkUrl}" style="color:${BRAND_BLUE};text-decoration:underline;word-break:break-all;">${magicLinkUrl}</a>
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:28px 16px 0;">
                <p style="margin:0;font:400 12px/1.6 Arial,Helvetica,sans-serif;color:${MUTED};">
                  Didn't request a sign-in code? You can safely ignore this email.<br />
                  Need help? Email us at <a href="mailto:${supportEmail}" style="color:${BRAND_BLUE};text-decoration:underline;">${supportEmail}</a>.
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
    `Sign in to ${APP_NAME}`,
    ``,
    `Your sign-in code: ${code}`,
    `It expires in ${ttlMinutes} minutes.`,
    ``,
    `Or click to sign in: ${magicLinkUrl}`,
    ``,
    `If you didn't request this, you can ignore this email.`,
  ].join("\n");

  return { subject, html, text };
}
