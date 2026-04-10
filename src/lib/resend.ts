import { Resend } from "resend";

export function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(key);
}

/** Resend `from` address: `{EMAIL_FROM_LOCAL}@{EMAIL_DOMAIN}` (default local part: `noreply`). */
export function getEmailFrom() {
  const domain = process.env.EMAIL_DOMAIN?.trim();
  if (!domain) {
    throw new Error(
      "EMAIL_DOMAIN is not set (e.g. yourdomain.com or resend.dev for testing)",
    );
  }
  const local = (process.env.EMAIL_FROM_LOCAL ?? "noreply").trim() || "noreply";
  return `${local}@${domain}`;
}
