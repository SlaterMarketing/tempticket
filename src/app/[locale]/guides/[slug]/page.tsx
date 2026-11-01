import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { GUIDE_LOCALE, GUIDES, getGuide } from "@/lib/guides";
import { getServerSiteUrl } from "@/lib/site-url";
import { GuideCta } from "../guide-cta";

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuide(slug);
  if (locale !== GUIDE_LOCALE || !guide) return {};
  const url = new URL(
    `/${GUIDE_LOCALE}/guides/${guide.slug}`,
    getServerSiteUrl(),
  ).toString();
  return {
    title: `${guide.title} | TempTicket`,
    description: guide.description,
    alternates: { canonical: url },
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
  const guide = getGuide(slug);
  if (locale !== GUIDE_LOCALE || !guide) notFound();
  setRequestLocale(locale);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const related = GUIDES.filter((g) => g.slug !== guide.slug);

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
          Home
        </Link>{" "}
        /{" "}
        <Link href="/guides" className="hover:underline">
          Guides
        </Link>
      </nav>
      <h1 className="text-3xl font-bold tracking-tight text-[color:var(--brand-blue)] md:text-4xl">
        {guide.h1}
      </h1>
      <p className="mt-5 text-lg text-slate-600">{guide.intro}</p>

      <GuideCta source={`guide-${guide.slug}-top`} />

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
          Common questions
        </h2>
        {guide.faqs.map((f) => (
          <div key={f.q}>
            <h3 className="font-semibold">{f.q}</h3>
            <p className="mt-1 text-muted-foreground">{f.a}</p>
          </div>
        ))}
      </section>

      <GuideCta source={`guide-${guide.slug}-bottom`} />

      <p className="text-xs text-muted-foreground">
        This guide is general information, not legal or immigration advice.
        Entry rules change; always confirm with the official government source
        for your destination and your airline before you travel.
      </p>

      <section className="mt-10 border-t pt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          More guides
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
