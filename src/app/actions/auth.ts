"use server";

import { hasLocale } from "next-intl";
import { cookies } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { clearSessionCookie } from "@/lib/auth/session";

export async function logoutAction() {
  await clearSessionCookie();
  const store = await cookies();
  const fromCookie = store.get("NEXT_LOCALE")?.value;
  const locale =
    fromCookie && hasLocale(routing.locales, fromCookie)
      ? fromCookie
      : routing.defaultLocale;
  redirect({ href: "/", locale });
}
