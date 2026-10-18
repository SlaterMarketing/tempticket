import { completeLogin } from "@/lib/auth/complete-login";
import { db } from "@/lib/db";
import { loginCodes } from "@/lib/db/schema";
import { defaultLocale } from "@/i18n/config";
import { getServerSiteUrl } from "@/lib/site-url";
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

/**
 * Behind Docker/a reverse proxy `req.url` carries the internal host
 * (e.g. 0.0.0.0:3000), so redirects must use the public site origin.
 */
function publicUrl(path: string) {
  return new URL(path, getServerSiteUrl());
}

function errorRedirect(reason: string) {
  const url = publicUrl(`/${defaultLocale}/login`);
  url.searchParams.set("error", reason);
  return NextResponse.redirect(url);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email")?.toLowerCase().trim() ?? "";
  const token = url.searchParams.get("token")?.trim() ?? "";
  const next = sanitiseNext(url.searchParams.get("next"));

  if (!email || !token) {
    return errorRedirect("invalid_link");
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
    return errorRedirect("expired_link");
  }

  try {
    await completeLogin(email, "/login/magic");
  } catch (err) {
    console.error("[auth/magic] completeLogin failed", err);
    return errorRedirect("server_error");
  }

  await db()
    .update(loginCodes)
    .set({ usedAt: new Date() })
    .where(eq(loginCodes.id, matched.id));

  return NextResponse.redirect(publicUrl(next));
}
