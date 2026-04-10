import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import { resolveMessages } from "@/lib/i18n/load-messages";
import { routing } from "@/i18n/routing";
import { isAdminEmail } from "@/lib/auth/admin";
import { getSession } from "@/lib/auth/session";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const showAdmin = session ? isAdminEmail(session.email) : false;
  const cookieStore = await cookies();
  const fromCookie = cookieStore.get("NEXT_LOCALE")?.value;
  const localeGuess =
    fromCookie && hasLocale(routing.locales, fromCookie)
      ? fromCookie
      : routing.defaultLocale;
  const { locale, messages } = await resolveMessages(localeGuess);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers>
        <SiteHeader email={session?.email ?? null} showAdmin={showAdmin} />
        {children}
        <Toaster richColors position="top-center" />
      </Providers>
    </NextIntlClientProvider>
  );
}
