import { db } from "@/lib/db";
import { loginCodes } from "@/lib/db/schema";
import { OTP_TTL_MINUTES } from "@/lib/auth/constants";
import { buildLoginEmail } from "@/lib/auth/login-email";
import { getEmailFrom, getResend } from "@/lib/resend";
import bcrypt from "bcryptjs";
import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email().max(320),
  next: z.string().max(1024).optional(),
});

function sanitiseNext(raw: string | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return null;
  return trimmed.length > 512 ? null : trimmed;
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  const email = parsed.data.email.toLowerCase().trim();
  const next = sanitiseNext(parsed.data.next);

  const code = (crypto.getRandomValues(new Uint32Array(1))[0] % 900000) + 100000;
  const codeStr = String(code).padStart(6, "0");
  const codeHash = await bcrypt.hash(codeStr, 10);

  const token = randomBytes(32).toString("base64url");
  const tokenHash = createHash("sha256").update(token).digest("hex");

  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

  await db().insert(loginCodes).values({
    email,
    codeHash,
    tokenHash,
    expiresAt,
  });

  const appUrl = (
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ).replace(/\/$/, "");
  const magicLinkUrl = new URL(`${appUrl}/api/auth/magic`);
  magicLinkUrl.searchParams.set("email", email);
  magicLinkUrl.searchParams.set("token", token);
  if (next) magicLinkUrl.searchParams.set("next", next);

  const resend = getResend();
  const from = getEmailFrom();
  const { subject, html, text } = buildLoginEmail({
    code: codeStr,
    magicLinkUrl: magicLinkUrl.toString(),
    ttlMinutes: OTP_TTL_MINUTES,
  });

  await resend.emails.send({
    from,
    to: email,
    subject,
    html,
    text,
  });

  return NextResponse.json({ ok: true });
}
