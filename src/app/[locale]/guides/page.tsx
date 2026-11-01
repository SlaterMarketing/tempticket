import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { GUIDE_LOCALES, getGuideUi, getGuides } from "@/lib/guides";
import { getServerSiteUrl } from "@/lib/site-url";
import { GuideCta } from "./guide-cta";

type Params = Promise<{ locale: string }>;

function indexUrl(locale: string) {
  return new URL(`/${locale}/guides`, getServerSiteUrl()).toString();
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const ui = getGuideUi(locale);
  if (!ui) return {};
  const languages: Record<string, string> = { "x-default": indexUrl("en") };
  for (const loc of GUIDE_LOCALES) languages[loc] = indexUrl(loc);
  return {
    title: `${ui.indexTitle} | TempTicket`,
    description: ui.indexDescription,
    alternates: { canonical: indexUrl(locale), languages },
  };
}

export default async function GuidesIndexPage({ params }: { params: Params }) {
  const { locale } = await params;
  const ui = getGuideUi(locale);
  if (!ui) notFound();
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-[color:var(--brand-blue)] md:text-4xl">
        {ui.indexTitle}
      </h1>
      <p className="mt-4 text-lg text-slate-600">{ui.indexDescription}</p>
      <ul className="mt-8 space-y-5">
        {getGuides(locale).map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guides/${g.slug}`}
              className="text-lg font-semibold text-[color:var(--brand-blue)] hover:underline"
            >
              {g.h1}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">{g.description}</p>
          </li>
        ))}
      </ul>
      <GuideCta source="guides-index" ui={ui} />
    </div>
  );
}
