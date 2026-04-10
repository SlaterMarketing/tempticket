import { getTranslations, setRequestLocale } from "next-intl/server";
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
    "terms",
    t("termsTitle"),
    t("termsDescription"),
  );
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Terms");

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-sm leading-relaxed text-foreground space-y-4">
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
      <p>{t("lead")}</p>
      <h2 className="text-lg font-semibold mt-8">{t("serviceHeading")}</h2>
      <p>{t("serviceBody")}</p>
      <h2 className="text-lg font-semibold mt-8">{t("legalHeading")}</h2>
      <p>{t("legalBody")}</p>
      <h2 className="text-lg font-semibold mt-8">{t("paymentsHeading")}</h2>
      <p>{t("paymentsBody")}</p>
      <h2 className="text-lg font-semibold mt-8">{t("useHeading")}</h2>
      <p>{t("useBody")}</p>
      <h2 className="text-lg font-semibold mt-8">{t("liabilityHeading")}</h2>
      <p>{t("liabilityBody")}</p>
    </div>
  );
}
