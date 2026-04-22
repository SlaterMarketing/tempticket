import {
  ANALYTICS_VISITOR_COOKIE,
  PG_UUID_RE,
} from "@/lib/analytics/constants";
import {
  linkVisitorToUser,
  trackServerEventSafe,
} from "@/lib/analytics/track";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

/**
 * Upsert the user, set the session cookie, link analytics visitor, and fire login/signup events.
 * Shared by the 6-digit code flow and the magic-link flow.
 */
export async function completeLogin(email: string, path: string) {
  const existing = await db()
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  const isNewUser = !existing[0];

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

  const jar = await cookies();
  const vid = jar.get(ANALYTICS_VISITOR_COOKIE)?.value?.trim();
  if (vid && PG_UUID_RE.test(vid)) {
    await linkVisitorToUser(vid, userId);
  }

  const token = await createSessionToken({ sub: userId, email });
  await setSessionCookie(token);

  void trackServerEventSafe(isNewUser ? "signup" : "login", {
    path,
    payload: { email_domain: email.split("@")[1] ?? null },
  });

  return { userId, isNewUser };
}
