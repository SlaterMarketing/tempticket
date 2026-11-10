/**
 * Transactional email sending.
 *
 * Primary provider: Cloudflare Email Service (REST API), used when
 * `CLOUDFLARE_EMAIL_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are set.
 * Fallback: Resend (REST API), used when only `RESEND_API_KEY` is set, so a
 * deploy that hasn't got the Cloudflare variables yet keeps sending.
 */

export type EmailAttachment = {
  filename: string;
  content: Buffer | Uint8Array;
  /** MIME type. Defaults from the file extension (pdf → application/pdf). */
  contentType?: string;
};

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
};

export type SendEmailResult = {
  provider: "cloudflare" | "resend";
  messageId: string | null;
};

export class EmailSendError extends Error {
  constructor(
    message: string,
    readonly provider: SendEmailResult["provider"],
    readonly status?: number,
  ) {
    super(message);
    this.name = "EmailSendError";
  }
}

/** Sender address: `{EMAIL_FROM_LOCAL}@{EMAIL_DOMAIN}` (default local part: `noreply`). */
export function getEmailFrom() {
  const domain = process.env.EMAIL_DOMAIN?.trim();
  if (!domain) {
    throw new Error(
      "EMAIL_DOMAIN is not set (a domain onboarded to Cloudflare Email Sending, e.g. tempticket.com)",
    );
  }
  const local = (process.env.EMAIL_FROM_LOCAL ?? "noreply").trim() || "noreply";
  return `${local}@${domain}`;
}

function getFromName() {
  return (
    process.env.EMAIL_FROM_NAME?.trim() ||
    process.env.NEXT_PUBLIC_APP_NAME?.trim() ||
    "TempTicket"
  );
}

function guessContentType(filename: string) {
  const ext = filename.toLowerCase().split(".").pop();
  switch (ext) {
    case "pdf":
      return "application/pdf";
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "txt":
      return "text/plain";
    case "ics":
      return "text/calendar";
    default:
      return "application/octet-stream";
  }
}

function toBase64(content: Buffer | Uint8Array) {
  return Buffer.from(content).toString("base64");
}

function describeErrors(body: unknown, fallback: string) {
  if (body && typeof body === "object") {
    const errors = (body as { errors?: { code?: unknown; message?: string }[] })
      .errors;
    if (Array.isArray(errors) && errors.length) {
      return errors
        .map((e) => [e.code, e.message].filter(Boolean).join(" "))
        .join("; ");
    }
    const message = (body as { message?: string }).message;
    if (message) return message;
  }
  return fallback;
}

async function sendViaCloudflare(
  input: SendEmailInput,
  accountId: string,
  token: string,
): Promise<SendEmailResult> {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/email/sending/send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: { address: getEmailFrom(), name: getFromName() },
        to: input.to,
        subject: input.subject,
        html: input.html,
        text: input.text,
        reply_to: input.replyTo,
        attachments: input.attachments?.map((a) => ({
          disposition: "attachment",
          filename: a.filename,
          type: a.contentType ?? guessContentType(a.filename),
          content: toBase64(a.content),
        })),
      }),
    },
  );

  const body = (await res.json().catch(() => null)) as {
    success?: boolean;
    result?: {
      message_id?: string;
      permanent_bounces?: string[];
      suppressed_recipients?: string[];
    };
  } | null;

  if (!res.ok || !body?.success) {
    throw new EmailSendError(
      `Cloudflare email send failed (${res.status}): ${describeErrors(body, res.statusText)}`,
      "cloudflare",
      res.status,
    );
  }

  const bounced = [
    ...(body.result?.permanent_bounces ?? []),
    ...(body.result?.suppressed_recipients ?? []),
  ];
  if (bounced.length) {
    throw new EmailSendError(
      `Cloudflare email not delivered to: ${bounced.join(", ")}`,
      "cloudflare",
      res.status,
    );
  }

  return { provider: "cloudflare", messageId: body.result?.message_id ?? null };
}

async function sendViaResend(
  input: SendEmailInput,
  apiKey: string,
): Promise<SendEmailResult> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${getFromName()} <${getEmailFrom()}>`,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      reply_to: input.replyTo,
      attachments: input.attachments?.map((a) => ({
        filename: a.filename,
        content: toBase64(a.content),
      })),
    }),
  });
  const body = (await res.json().catch(() => null)) as { id?: string } | null;
  if (!res.ok) {
    throw new EmailSendError(
      `Resend email send failed (${res.status}): ${describeErrors(body, res.statusText)}`,
      "resend",
      res.status,
    );
  }
  return { provider: "resend", messageId: body?.id ?? null };
}

/** Sends one transactional email. Throws `EmailSendError` when it isn't accepted. */
export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  if (!input.html && !input.text) {
    throw new Error("sendEmail needs html or text");
  }
  const cfToken = process.env.CLOUDFLARE_EMAIL_API_TOKEN?.trim();
  const cfAccount = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
  if (cfToken && cfAccount) {
    return sendViaCloudflare(input, cfAccount, cfToken);
  }
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    return sendViaResend(input, resendKey);
  }
  throw new Error(
    "Email is not configured: set CLOUDFLARE_EMAIL_API_TOKEN and CLOUDFLARE_ACCOUNT_ID",
  );
}
