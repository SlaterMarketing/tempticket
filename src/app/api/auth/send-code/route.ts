import { db } from "@/lib/db";
import { loginCodes } from "@/lib/db/schema";
import { OTP_TTL_MINUTES } from "@/lib/auth/constants";
import { getEmailFrom, getResend } from "@/lib/resend";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email().max(320),
});

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

  const code = crypto.getRandomValues(new Uint32Array(1))[0] % 900000 + 100000;
  const codeStr = String(code).padStart(6, "0");
  const codeHash = await bcrypt.hash(codeStr, 10);
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

  await db().insert(loginCodes).values({
    email,
    codeHash,
    expiresAt,
  });

  const resend = getResend();
  const from = getEmailFrom();
  const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "TempTicket";

  await resend.emails.send({
    from,
    to: email,
    subject: `Your ${appName} sign-in code`,
    text: `Your sign-in code is ${codeStr}. It expires in ${OTP_TTL_MINUTES} minutes.`,
  });

  return NextResponse.json({ ok: true });
}
