"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle, CreditCard, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

/** Vertical gap between where each card “sticks” — must fit the header row so the next card slides over only the body. */
const HEADER_STACK_REM = 6.75;

/** Extra scroll after the last card so stacked headers can breathe before CTAs. */
const LAST_STEP_TAIL =
  "pb-[min(22dvh,10rem)] md:pb-[min(26dvh,11rem)]";

const STEP_ICONS = [MapPin, CreditCard, CheckCircle] as const;
const STEP_STYLES = [
  {
    card: "bg-gradient-to-br from-[rgb(231_241_252)] via-white to-[rgb(226_244_248)] ring-1 ring-[color:var(--brand-blue)]/12",
    headerBg: "border-b border-[color:var(--brand-blue)]/10",
  },
  {
    card: "bg-gradient-to-br from-[rgb(253_235_244)] via-white to-[rgb(248_230_240)] ring-1 ring-[color:var(--brand-green)]/15",
    headerBg: "border-b border-[color:var(--brand-blue)]/10",
  },
  {
    card: "bg-gradient-to-br from-[rgb(236_247_241)] via-white to-[rgb(232_245_228)] ring-1 ring-[color:var(--brand-green)]/14",
    headerBg: "border-b border-[color:var(--brand-blue)]/10",
  },
] as const;

type StepMsg = { label: string; title: string; body: string };

/**
 * Full-height sticky cards with stepped `top` + z-index: each step is read in full, then the
 * next card slides over the lower part of the previous card until only the header band remains,
 * then all three headers stack before the section ends.
 */
export function BookingProcessTimeline({
  heading = null,
  afterLastStep = null,
}: {
  /** Shown above step 1 inside the same sticky wrapper so the title moves with step 1. */
  heading?: ReactNode;
  /** Shown below step 3 inside that step’s sticky wrapper (e.g. CTAs) so they stick and scroll with the card. */
  afterLastStep?: ReactNode;
}) {
  const t = useTranslations("BookingTimeline");
  const steps = t.raw("steps") as StepMsg[];

  return (
    <ol className="relative m-0 w-full list-none p-0">
      {steps.map((s, i) => {
        const StepIcon = STEP_ICONS[i] ?? MapPin;
        const style = STEP_STYLES[i] ?? STEP_STYLES[0]!;
        const stepNum = i + 1;
        return (
          <li
            key={s.label}
            className={cn(
              "sticky-booking-step-item relative",
              i === 0 &&
                "min-h-[calc(100dvh+min(40rem,68dvh))] md:min-h-[calc(100dvh+min(44rem,62dvh))]",
              i === 1 && "min-h-[min(124dvh,120rem)] md:min-h-[min(130dvh,130rem)]",
              i === 2 &&
                (afterLastStep
                  ? "min-h-[min(132dvh,125rem)] md:min-h-[min(138dvh,135rem)]"
                  : "min-h-[min(124dvh,120rem)] md:min-h-[min(130dvh,130rem)]"),
              i > 0 &&
                "sticky-booking-step-overlap -mt-[calc(100dvh-var(--booking-overlap-adjust,7.75rem))]",
              i === steps.length - 1 && LAST_STEP_TAIL,
            )}
          >
            <div
              className="sticky-booking-step-card sticky mx-auto w-full max-w-5xl"
              style={{
                top: `calc(var(--booking-nav-offset, 5rem) + ${i * HEADER_STACK_REM}rem)`,
                zIndex: 10 + i * 10,
              }}
            >
              {i === 0 && heading}
              <article
                className={cn(
                  "overflow-hidden rounded-3xl text-left shadow-[0_28px_60px_-16px_rgba(34,98,187,0.24)] md:rounded-[1.75rem]",
                  style.card,
                )}
              >
                <div
                  className={cn(
                    "px-8 py-7 md:px-14 md:py-9",
                    style.headerBg,
                  )}
                >
                  <div className="flex flex-wrap items-start justify-between gap-5 md:gap-6">
                    <div className="flex min-w-0 items-start gap-5 md:gap-6">
                      <span
                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/90 shadow-sm ring-1 ring-[color:var(--brand-blue)]/12 md:h-20 md:w-20"
                        aria-hidden
                      >
                        <StepIcon className="h-8 w-8 text-[color:var(--brand-blue)] md:h-10 md:w-10" />
                      </span>
                      <div className="min-w-0 pt-0.5 md:pt-1">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--brand-green)]">
                          {t("stepLabel", { step: stepNum })}
                        </p>
                        <h3 className="mt-1.5 text-3xl font-bold tracking-tight text-[color:var(--brand-blue)] md:mt-2 md:text-4xl">
                          {s.title}
                        </h3>
                      </div>
                    </div>
                    <span
                      className="select-none font-bold tabular-nums text-[color:var(--brand-blue)]/13 text-[4.5rem] leading-none tracking-tight md:text-[6.25rem]"
                      aria-hidden
                    >
                      {s.label}
                    </span>
                  </div>
                </div>
                <div className="px-8 pb-12 pt-8 md:px-14 md:pb-16 md:pt-11">
                  <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:max-w-3xl md:text-xl md:leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </article>
              {i === steps.length - 1 && afterLastStep ? (
                <div className="mt-10 w-full md:mt-14">{afterLastStep}</div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
