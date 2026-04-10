import { db } from "@/lib/db";
import { loginCodes, users } from "@/lib/db/schema";
import {
  createSessionToken,
  setSessionCookie,
} from "@/lib/auth/session";
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
    .where(
      and(
        eq(loginCodes.email, email),
        isNull(loginCodes.usedAt),
      ),
    )
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
    return NextResponse.json({ error: "Invalid or expired code" }, { status: 401 });
  }

  await db()
    .update(loginCodes)
    .set({ usedAt: new Date() })
    .where(eq(loginCodes.id, matched.id));

  const existing = await db().select().from(users).where(eq(users.email, email)).limit(1);
  let userId: string;
  if (existing[0]) {
    userId = existing[0].id;
  } else {
    const inserted = await db()
      .insert(users)
      .values({ email })
      .returning({ id: users.id });
    userId = inserted[0]!.id;
  }

  const token = await createSessionToken({ sub: userId, email });
  await setSessionCookie(token);

  return NextResponse.json({ ok: true });
}
