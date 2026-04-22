import { completeLogin } from "@/lib/auth/complete-login";
import { db } from "@/lib/db";
import { loginCodes } from "@/lib/db/schema";
import { defaultLocale } from "@/i18n/config";
import { and, desc, eq, isNull, isNotNull } from "drizzle-orm";
import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

function sanitiseNext(raw: string | null): string {
  if (!raw) return "/account/bookings";
  const trimmed = raw.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return "/account/bookings";
  }
  return trimmed.length > 512 ? "/account/bookings" : trimmed;
}

function localisedUrl(base: URL, path: string) {
  return new URL(path, base);
}

function errorRedirect(base: URL, reason: string) {
  const url = localisedUrl(base, `/${defaultLocale}/login`);
  url.searchParams.set("error", reason);
  return NextResponse.redirect(url);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email")?.toLowerCase().trim() ?? "";
  const token = url.searchParams.get("token")?.trim() ?? "";
  const next = sanitiseNext(url.searchParams.get("next"));

  if (!email || !token) {
    return errorRedirect(url, "invalid_link");
  }

  const rows = await db()
    .select()
    .from(loginCodes)
    .where(
      and(
        eq(loginCodes.email, email),
        isNull(loginCodes.usedAt),
        isNotNull(loginCodes.tokenHash),
      ),
    )
    .orderBy(desc(loginCodes.createdAt))
    .limit(5);

  const providedHash = createHash("sha256").update(token).digest();

  let matched: (typeof rows)[0] | null = null;
  for (const row of rows) {
    if (row.expiresAt < new Date()) continue;
    if (!row.tokenHash) continue;
    try {
      const stored = Buffer.from(row.tokenHash, "hex");
      if (
        stored.length === providedHash.length &&
        timingSafeEqual(stored, providedHash)
      ) {
        matched = row;
        break;
      }
    } catch {
      continue;
    }
  }

  if (!matched) {
    return errorRedirect(url, "expired_link");
  }

  await db()
    .update(loginCodes)
    .set({ usedAt: new Date() })
    .where(eq(loginCodes.id, matched.id));

  await completeLogin(email, "/login/magic");

  return NextResponse.redirect(localisedUrl(url, next));
}
