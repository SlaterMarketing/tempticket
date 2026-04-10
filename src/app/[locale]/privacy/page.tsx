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
    "privacy",
    t("privacyTitle"),
    t("privacyDescription"),
  );
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Privacy");
  const collectItems = t.raw("collectItems") as string[];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-sm leading-relaxed text-foreground space-y-4">
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
      <p>{t("summary")}</p>
      <h2 className="text-lg font-semibold mt-8">{t("collectHeading")}</h2>
      <ul className="list-disc pl-5 space-y-1">
        {collectItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h2 className="text-lg font-semibold mt-8">{t("whyHeading")}</h2>
      <p>{t("whyBody")}</p>
      <h2 className="text-lg font-semibold mt-8">{t("processorsHeading")}</h2>
      <p>{t("processorsBody")}</p>
      <h2 className="text-lg font-semibold mt-8">{t("retentionHeading")}</h2>
      <p>{t("retentionBody")}</p>
      <h2 className="text-lg font-semibold mt-8">{t("rightsHeading")}</h2>
      <p>{t("rightsBody")}</p>
    </div>
  );
}
