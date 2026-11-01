import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  getGuide,
  getGuideUi,
  getGuides,
  guideTranslations,
} from "@/lib/guides";
import { getServerSiteUrl } from "@/lib/site-url";
import { GuideCta } from "../guide-cta";

type Params = Promise<{ locale: string; slug: string }>;

function guideUrl(locale: string, slug: string) {
  return new URL(`/${locale}/guides/${slug}`, getServerSiteUrl()).toString();
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuide(locale, slug);
  if (!guide) return {};
  const url = guideUrl(locale, guide.slug);
  const translations = guideTranslations(guide.key);
  const languages: Record<string, string> = {};
  for (const [loc, s] of Object.entries(translations)) {
    languages[loc] = guideUrl(loc, s);
  }
  if (translations.en) languages["x-default"] = guideUrl("en", translations.en);
  return {
    title: `${guide.title} | TempTicket`,
    description: guide.description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "article",
      url,
      title: guide.title,
      description: guide.description,
    },
  };
}

export default async function GuidePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const guide = getGuide(locale, slug);
  const ui = getGuideUi(locale);
  if (!guide || !ui) notFound();
  setRequestLocale(locale);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: guide.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const related = getGuides(locale).filter((g) => g.slug !== guide.slug);

  return (
    <article className="mx-auto max-w-2xl px-4 py-12 text-[0.9375rem] leading-relaxed text-foreground">
      <script
        type="application/ld+json"
        // JSON.stringify output of static data; escape "<" so it can't close the tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link href="/" className="hover:underline">
          {ui.home}
        </Link>{" "}
        /{" "}
        <Link href="/guides" className="hover:underline">
          {ui.guides}
        </Link>
      </nav>
      <h1 className="text-3xl font-bold tracking-tight text-[color:var(--brand-blue)] md:text-4xl">
        {guide.h1}
      </h1>
      <p className="mt-5 text-lg text-slate-600">{guide.intro}</p>
      {guide.disclosure ? (
        <p className="mt-4 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
          {guide.disclosure}
        </p>
      ) : null}

      {guide.table ? (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="mb-2 text-left font-semibold text-[color:var(--brand-blue)]">
              {guide.table.caption}
            </caption>
            <thead>
              <tr className="border-b">
                {guide.table.headers.map((h) => (
                  <th key={h} scope="col" className="px-2 py-2 text-left font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guide.table.rows.map((row) => (
                <tr key={row[0]} className="border-b last:border-0">
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="px-2 py-2 text-left font-medium">
                        {cell}
                      </th>
                    ) : (
                      <td key={i} className="px-2 py-2">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {guide.table.note ? (
            <p className="mt-2 text-xs text-muted-foreground">{guide.table.note}</p>
          ) : null}
        </div>
      ) : null}

      <GuideCta source={`guide-${guide.key}-top`} ui={ui} />

      {guide.sections.map((s) => (
        <section key={s.heading} className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold text-[color:var(--brand-blue)]">
            {s.heading}
          </h2>
          {s.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
      ))}

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-[color:var(--brand-blue)]">
          {ui.commonQuestions}
        </h2>
        {guide.faqs.map((f) => (
          <div key={f.q}>
            <h3 className="font-semibold">{f.q}</h3>
            <p className="mt-1 text-muted-foreground">{f.a}</p>
          </div>
        ))}
      </section>

      <GuideCta source={`guide-${guide.key}-bottom`} ui={ui} />

      {guide.sources?.length ? (
        <section className="mb-6 text-xs text-muted-foreground">
          <h2 className="font-semibold uppercase tracking-wider">
            {ui.sourcesHeading}
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {guide.sources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  rel="noopener nofollow"
                  target="_blank"
                  className="underline-offset-2 hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          {guide.checked ? (
            <p className="mt-2">
              {ui.lastChecked(
                new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
                  new Date(`${guide.checked}T00:00:00Z`),
                ),
              )}
            </p>
          ) : null}
        </section>
      ) : null}

      <p className="text-xs text-muted-foreground">{ui.disclaimer}</p>

      <section className="mt-10 border-t pt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {ui.moreGuides}
        </h2>
        <ul className="mt-3 space-y-2 text-sm">
          {related.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/guides/${g.slug}`}
                className="text-[color:var(--brand-blue)] hover:underline"
              >
                {g.h1}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
