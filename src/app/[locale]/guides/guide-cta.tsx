import { ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getAffiliatePartner, partnerHref } from "@/lib/affiliate";
import type { GuideUi } from "@/lib/guides";
import { cn } from "@/lib/utils";

const ctaClasses = cn(
  buttonVariants({ size: "lg" }),
  "inline-flex min-w-[12rem] items-center justify-center gap-2 rounded-xl border-0 bg-[color:var(--brand-green)] font-semibold text-white shadow-md transition duration-200 hover:bg-[color:var(--brand-green)]/90 hover:shadow-lg",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-blue)] focus-visible:ring-offset-2",
);

/** Call-to-action box used on guide pages; links straight to the partner in affiliate mode. */
export function GuideCta({ source, ui }: { source: string; ui: GuideUi }) {
  const partner = getAffiliatePartner();
  const price =
    partner?.priceFromUsd != null ? `$${partner.priceFromUsd}` : null;
  return (
    <aside className="my-10 rounded-2xl border border-[color:var(--brand-blue)]/10 bg-feature-card-sky p-6 shadow-sm md:p-8">
      <p className="text-lg font-bold text-[color:var(--brand-blue)]">
        {ui.ctaHeading(price)}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {ui.ctaBody}
      </p>
      <div className="mt-5">
        {partner ? (
          // Plain link to an API route (not a page): it counts the click, then redirects.
          <a href={partnerHref(source)} rel="sponsored nofollow" className={ctaClasses}>
            {ui.ctaButton}
            <ChevronRight className="size-4 opacity-90" aria-hidden />
          </a>
        ) : (
          <Link href="/book" className={ctaClasses}>
            {ui.ctaButton}
            <ChevronRight className="size-4 opacity-90" aria-hidden />
          </Link>
        )}
      </div>
    </aside>
  );
}
