import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AnalyticsBeacon } from "@/components/analytics-beacon";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import { AdminNav } from "@/app/admin/_components/admin-nav";
import { isAdminEmail } from "@/lib/auth/admin";
import { getSession } from "@/lib/auth/session";
import { resolveMessages } from "@/lib/i18n/load-messages";
import { routing } from "@/i18n/routing";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session || !isAdminEmail(session.email)) {
    redirect("/");
  }

  const showAdmin = true;
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
        <AnalyticsBeacon />
        <SiteHeader email={session.email} showAdmin={showAdmin} />
        <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
          <AdminNav />
          {children}
        </div>
        <Toaster richColors position="top-center" />
      </Providers>
    </NextIntlClientProvider>
  );
}
