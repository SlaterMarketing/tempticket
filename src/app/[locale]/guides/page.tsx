import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { GUIDE_LOCALE, GUIDES } from "@/lib/guides";
import { getServerSiteUrl } from "@/lib/site-url";
import { GuideCta } from "./guide-cta";

type Params = Promise<{ locale: string }>;

const TITLE = "Onward Ticket Guides by Country";
const DESCRIPTION =
  "Which countries ask for proof of onward travel, what airlines check at the desk, and how to get a verifiable flight reservation for a visa or one-way trip.";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== GUIDE_LOCALE) return {};
  return {
    title: `${TITLE} | TempTicket`,
    description: DESCRIPTION,
    alternates: {
      canonical: new URL(`/${GUIDE_LOCALE}/guides`, getServerSiteUrl()).toString(),
    },
  };
}

export default async function GuidesIndexPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (locale !== GUIDE_LOCALE) notFound();
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-[color:var(--brand-blue)] md:text-4xl">
        {TITLE}
      </h1>
      <p className="mt-4 text-lg text-slate-600">{DESCRIPTION}</p>
      <ul className="mt-8 space-y-5">
        {GUIDES.map((g) => (
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
      <GuideCta source="guides-index" />
    </div>
  );
}
