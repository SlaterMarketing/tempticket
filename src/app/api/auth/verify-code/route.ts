import { completeLogin } from "@/lib/auth/complete-login";
import { db } from "@/lib/db";
import { loginCodes } from "@/lib/db/schema";
import bcrypt from "bcryptjs";
import { and, desc, eq, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  code: z.string().regex(/^\d{6}$/),
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
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const email = parsed.data.email.toLowerCase().trim();
  const code = parsed.data.code;

  const rows = await db()
    .select()
    .from(loginCodes)
    .where(and(eq(loginCodes.email, email), isNull(loginCodes.usedAt)))
    .orderBy(desc(loginCodes.createdAt))
    .limit(5);

  let matched: (typeof rows)[0] | null = null;
  for (const row of rows) {
    if (row.expiresAt < new Date()) continue;
    const ok = await bcrypt.compare(code, row.codeHash);
    if (ok) {
      matched = row;
      break;
    }
  }

  if (!matched) {
    return NextResponse.json(
      { error: "Invalid or expired code" },
      { status: 401 },
    );
  }

  await db()
    .update(loginCodes)
    .set({ usedAt: new Date() })
    .where(eq(loginCodes.id, matched.id));

  await completeLogin(email, "/login");

  return NextResponse.json({ ok: true });
}
