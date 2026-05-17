"use client";

import { Plane } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export type FlightTicketOfferPreview = {
  total_amount: string;
  total_currency: string;
  slices: Array<{
    origin: string;
    destination: string;
    departing_at: string | null;
    duration: string | null;
    segments: Array<{ marketing_carrier: string }>;
  }>;
};

function formatDuffelDuration(iso: string | null): string | null {
  if (!iso?.trim()) return null;
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/i.exec(iso.trim());
  if (!m) return iso;
  const h = m[1] ? Number.parseInt(m[1], 10) : 0;
  const min = m[2] ? Number.parseInt(m[2], 10) : 0;
  const parts: string[] = [];
  if (h) parts.push(`${h}h`);
  if (min) parts.push(`${min}m`);
  return parts.length ? parts.join(" ") : null;
}

function formatDepart(iso: string | null, locale: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  try {
    return new Intl.DateTimeFormat(locale, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return d.toISOString().slice(0, 16).replace("T", " ");
  }
}

function carriersForSlice(slice: FlightTicketOfferPreview["slices"][0]): string {
  const codes = [
    ...new Set(
      slice.segments.map((s) => s.marketing_carrier?.trim()).filter(Boolean),
    ),
  ] as string[];
  return codes.length ? codes.join(" · ") : "—";
}

export function FlightReservationTicket({
  offer,
  locale,
  className,
}: {
  offer: FlightTicketOfferPreview;
  locale: string;
  className?: string;
}) {
  const t = useTranslations("BookFlow");
  const totalLabel = `${offer.total_currency?.toUpperCase() ?? ""} ${offer.total_amount}`.trim();

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border-2 border-[color:var(--brand-blue)]/18 bg-gradient-to-br from-white via-[color:var(--brand-blue)]/[0.03] to-[color:var(--brand-green)]/[0.06] shadow-[0_24px_48px_-20px_rgba(34,98,187,0.22)] ring-1 ring-[color:var(--brand-blue)]/10",
        className,
      )}
    >
      {/* stub edge */}
      <div
        className="pointer-events-none absolute inset-y-10 left-0 w-3 -translate-x-1/2 rounded-full border border-[color:var(--brand-blue)]/15 bg-[color:var(--background)] shadow-inner"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-10 right-0 w-3 translate-x-1/2 rounded-full border border-[color:var(--brand-blue)]/15 bg-[color:var(--background)] shadow-inner"
        aria-hidden
      />

      <div className="relative px-6 pb-7 pt-6 sm:px-10 sm:pb-9 sm:pt-8">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-dashed border-[color:var(--brand-blue)]/22 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-[color:var(--brand-blue)]/10 text-[color:var(--brand-blue)]">
              <Plane className="size-5" aria-hidden />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[color:var(--brand-blue)]/65">
                {t("ticketBadge")}
              </p>
              <p className="mt-0.5 text-lg font-semibold tracking-tight text-[color:var(--brand-blue)]">
                {t("ticketHeading")}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {t("ticketTotalLabel")}
            </p>
            <p className="font-mono text-xl font-bold tabular-nums tracking-tight text-[color:var(--brand-blue)] sm:text-2xl">
              {totalLabel || "—"}
            </p>
          </div>
        </div>

        <div className="space-y-0 pt-5">
          {offer.slices.map((slice, idx) => {
            const carriers = carriersForSlice(slice);
            const dur = formatDuffelDuration(slice.duration);
            const depart = formatDepart(slice.departing_at, locale);
            return (
              <div key={`${slice.origin}-${slice.destination}-${idx}`}>
                {idx > 0 ? (
                  <div
                    className="my-6 border-t border-dashed border-[color:var(--brand-blue)]/18"
                    aria-hidden
                  />
                ) : null}
                <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-2">
                  <div className="text-center sm:text-right">
                    <p className="font-mono text-4xl font-black tracking-tighter text-[color:var(--brand-blue)] sm:text-5xl">
                      {slice.origin}
                    </p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">
                      {t("ticketDepart")}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-[color:var(--brand-blue)]/85">
                      {depart}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-1 px-2">
                    <div className="flex w-full items-center gap-2">
                      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[color:var(--brand-green)]/55 to-transparent" />
                      <Plane className="size-4 shrink-0 rotate-90 text-[color:var(--brand-green)] sm:rotate-0" aria-hidden />
                      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[color:var(--brand-green)]/55 to-transparent" />
                    </div>
                    {(dur || carriers !== "—") && (
                      <p className="max-w-[14rem] text-center text-[11px] leading-snug text-muted-foreground">
                        {[dur, carriers].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>

                  <div className="text-center sm:text-left">
                    <p className="font-mono text-4xl font-black tracking-tighter text-[color:var(--brand-blue)] sm:text-5xl">
                      {slice.destination}
                    </p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">
                      {t("ticketArriveAirport")}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 border-t border-[color:var(--brand-blue)]/12 pt-5 text-center text-xs leading-relaxed text-muted-foreground">
          {t("ticketFootnote")}
        </p>
      </div>
    </div>
  );
}
