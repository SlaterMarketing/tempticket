import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { rtlLocales } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { isAdminEmail } from "@/lib/auth/admin";
import { getSession } from "@/lib/auth/session";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
        "http://localhost:3000",
    ),
    title: t("defaultTitle"),
    description: t("defaultDescription"),
    icons: {
      icon: "/favicon.ico",
      apple: "/tempticket.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const session = await getSession();
  const showAdmin = session ? isAdminEmail(session.email) : false;
  const dir = rtlLocales.has(locale) ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${jakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-0 min-h-dvh flex-col bg-background text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <SiteHeader email={session?.email ?? null} showAdmin={showAdmin} />
            <div className="flex min-h-0 flex-1 flex-col">{children}</div>
            <Toaster richColors position="top-center" />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
