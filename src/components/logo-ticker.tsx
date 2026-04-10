"use client";

import { cn } from "@/lib/utils";
import { DUFFEL_PARTNER_AIRLINE_LABELS } from "@/lib/duffel-partner-airlines";

type LogoTickerProps = {
  /** Visible heading above the marquee. */
  title?: string;
  labels?: string[];
  className?: string;
};

/**
 * Seamless horizontal marquee (e.g. partner airlines); duplicates items for infinite scroll.
 */
export function LogoTicker({
  title = "Airlines we partner with",
  labels = DUFFEL_PARTNER_AIRLINE_LABELS,
  className,
}: LogoTickerProps) {
  const row = [...labels, ...labels];

  return (
    <div
      className={cn(
        "mb-10 bg-transparent py-1 md:mb-12 md:py-2",
        className,
      )}
    >
      <div className="mx-auto mb-4 max-w-6xl px-4 md:mb-5">
        <h2 className="text-center text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--brand-blue)]/70 md:text-[0.8125rem]">
          {title}
        </h2>
        <p className="sr-only">Including {labels.join(", ")}.</p>
      </div>
      <div className="mask-linear-fade overflow-hidden" aria-hidden>
        <div className="flex w-max animate-logo-ticker items-center gap-5 pr-8 md:gap-6">
          {row.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="shrink-0 whitespace-nowrap rounded-full border border-[color:var(--brand-blue)]/12 bg-white/70 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--brand-blue)]/55 shadow-sm backdrop-blur-sm md:px-4 md:text-[11px]"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
