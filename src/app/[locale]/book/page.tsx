import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { BookFlow } from "./book-flow";
import { trackServerEventSafe } from "@/lib/analytics/track";
import { isAdminEmail } from "@/lib/auth/admin";
import { getSession } from "@/lib/auth/session";
import { buildPublicMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return buildPublicMetadata(
    locale,
    "book",
    t("bookTitle"),
    t("bookDescription"),
  );
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await getSession();
  void trackServerEventSafe("book_page_view", {
    path: `/${locale}/book`,
  });
  const isAdmin = session ? isAdminEmail(session.email) : false;
  return (
    <BookFlow
      receiptEmailDefault={session?.email ?? null}
      locale={locale}
      isAdmin={isAdmin}
    />
  );
}
