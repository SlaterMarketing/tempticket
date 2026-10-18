import { getTranslations } from "next-intl/server";
import { BadgeCheck, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function PartnerHandoff({ partnerName }: { partnerName: string }) {
  const t = await getTranslations("BookPartner");
  const primary = cn(
    buttonVariants({ size: "lg" }),
    "inline-flex min-w-[12rem] items-center justify-center gap-2 rounded-xl border-0 bg-[color:var(--brand-green)] font-semibold text-white shadow-md transition duration-200 hover:bg-[color:var(--brand-green)]/90 hover:shadow-lg",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-blue)] focus-visible:ring-offset-2",
  );

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-subtle-how pb-16 pt-8 md:pb-24 md:pt-12">
      <div className="mx-auto max-w-lg px-4 md:max-w-xl">
        <section className="overflow-hidden rounded-2xl border border-[color:var(--brand-blue)]/10 bg-feature-card-sky shadow-[0_20px_50px_-14px_rgba(34,98,187,0.18)] ring-1 ring-[color:var(--brand-blue)]/8 md:rounded-3xl">
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-start gap-4">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/90 shadow-sm ring-1 ring-[color:var(--brand-blue)]/12"
                aria-hidden
              >
                <BadgeCheck className="h-6 w-6 text-[color:var(--brand-green)]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-green)]">
                  {t("badge")}
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-[color:var(--brand-blue)] md:text-3xl">
                  {t("title")}
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
                  {t("body", { partner: partnerName })}
                </p>
              </div>
            </div>
            <div className="mt-8 space-y-3">
              {/* Plain link to an API route (not a page): it counts the click, then redirects. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/api/go/partner" rel="sponsored" className={primary}>
                {t("cta", { partner: partnerName })}
                <ChevronRight className="size-4 opacity-90" aria-hidden />
              </a>
              <p className="text-xs text-muted-foreground">
                {t("note", { partner: partnerName })}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
