import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buildPublicMetadata } from "@/lib/i18n/metadata";
import {
  Briefcase,
  CalendarClock,
  Clock,
  Globe,
  Headset,
  Plane,
  ShieldCheck,
  Sparkles,
  PiggyBank,
  Zap,
  Timer,
  BadgeCheck,
  ChevronRight,
  Star,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { SectionDivider } from "@/components/section-divider";
import { LogoTicker } from "@/components/logo-ticker";
import { BackToTopButton } from "@/components/back-to-top-button";
import { BookingProcessTimeline } from "@/components/booking-process-timeline";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { SERVICE_FEE_BY_CURRENCY } from "@/lib/pricing";

const usdFeeDisplay = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}).format(SERVICE_FEE_BY_CURRENCY.usd / 100);

function BookNowButton({
  label,
  className,
  variant = "green",
  pulseCta = false,
}: {
  label: string;
  className?: string;
  variant?: "green" | "outline";
  /** Subtle glow pulse for final CTA emphasis */
  pulseCta?: boolean;
}) {
  return (
    <Link
      href="/book"
      className={cn(
        buttonVariants({ size: "lg" }),
        "inline-flex min-w-[11rem] items-center justify-center gap-2 rounded-xl font-semibold shadow-md transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variant === "green" &&
          "border-0 bg-[color:var(--brand-green)] text-white hover:bg-[color:var(--brand-green)]/90",
        variant === "outline" &&
          "border-2 border-[color:var(--brand-blue)] bg-white/90 text-[color:var(--brand-blue)] shadow-sm hover:bg-white hover:shadow-md",
        pulseCta && variant === "green" && "animate-cta-glow-pulse",
        className,
      )}
    >
      {label}
      <ChevronRight className="size-5 shrink-0 opacity-90" aria-hidden />
    </Link>
  );
}

function HeroTicketGraphic({
  priceLabel,
  departure,
  arrival,
  cityDep,
  cityArr,
  passenger,
  passengerValue,
  record,
  verified,
}: {
  priceLabel: string;
  departure: string;
  arrival: string;
  cityDep: string;
  cityArr: string;
  passenger: string;
  passengerValue: string;
  record: string;
  verified: string;
}) {
  return (
    <div
      className="animate-home-ticket-float relative mx-auto w-full max-w-md rounded-xl p-5 md:p-6"
      aria-hidden
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgb(34 98 187 / 0.11) 1px, transparent 0)",
        backgroundSize: "16px 16px",
      }}
    >
      <div className="relative rounded-xl border-2 border-dashed border-[color:var(--brand-blue)]/30 bg-subtle-ticket-face p-6 pt-7 shadow-[0_20px_50px_-12px_rgba(34,98,187,0.25)] backdrop-blur-sm">
        <p className="absolute right-4 top-4 z-10 rounded-full bg-[color:var(--brand-green)] px-3 py-1.5 text-xs font-bold tracking-tight text-white shadow-md">
          {priceLabel}
        </p>
        <div className="flex items-start justify-between gap-4 border-b border-dashed border-[color:var(--brand-blue)]/20 pb-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {departure}
            </p>
            <p className="text-2xl font-bold text-[color:var(--brand-blue)]">
              BKK
            </p>
            <p className="text-xs text-muted-foreground">{cityDep}</p>
          </div>
          <Plane className="mt-4 h-8 w-8 shrink-0 text-[color:var(--brand-green)]" />
          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {arrival}
            </p>
            <p className="text-2xl font-bold text-[color:var(--brand-blue)]">
              NRT
            </p>
            <p className="text-xs text-muted-foreground">{cityArr}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-between text-xs text-muted-foreground">
          <span>{passenger}</span>
          <span className="font-medium text-foreground">{passengerValue}</span>
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{record}</span>
          <span className="font-mono font-semibold tracking-wide text-[color:var(--brand-blue)]">
            ABC*12X
          </span>
        </div>
        <div className="relative mt-6">
          <div
            className="pointer-events-none absolute -right-2 bottom-1 z-10 flex h-[4.25rem] w-[4.25rem] -translate-y-1 rotate-[-16deg] items-center justify-center rounded-full border-[3px] border-dashed border-[color:var(--brand-blue)]/35 bg-white/75 shadow-sm backdrop-blur-[2px]"
            aria-hidden
          >
            <span className="text-center text-[0.58rem] font-extrabold uppercase leading-tight tracking-wide text-[color:var(--brand-blue)]/70">
              {verified}
            </span>
          </div>
          <div className="flex gap-0.5 opacity-40">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-8 w-1 rounded-full bg-foreground",
                  i % 3 === 0 && "w-1.5",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CtaTicketWatermark() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(22rem,78vw)] w-auto -translate-x-1/2 -translate-y-1/2 rotate-[12deg] text-[color:var(--brand-blue)] opacity-[0.07] select-none"
      viewBox="0 0 220 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 14h184c5 0 10 5 10 10v22c-12 0-12 14 0 14v22c-12 0-12 14 0 14v22c0 5-5 10-10 10H18c-5 0-10-5-10-10V94c12 0 12-14 0-14V54c12 0 12-14 0-14V24c0-5 5-10 10-10z"
        stroke="currentColor"
        strokeWidth="1.75"
        opacity="0.9"
      />
      <path
        d="M72 10v108"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeDasharray="5 6"
        opacity="0.45"
      />
      <rect
        x="82"
        y="36"
        width="112"
        height="8"
        rx="2"
        fill="currentColor"
        opacity="0.12"
      />
      <rect
        x="82"
        y="52"
        width="72"
        height="6"
        rx="2"
        fill="currentColor"
        opacity="0.1"
      />
    </svg>
  );
}

const featureIcons = [
  Zap,
  Clock,
  Globe,
  PiggyBank,
  CalendarClock,
  ShieldCheck,
] as const;
const personaIcons = [Sparkles, Plane, Globe, Briefcase] as const;
const trustIcons = [Timer, BadgeCheck, Headset] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return buildPublicMetadata(locale, "", t("homeTitle"), t("homeDescription"));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Home" });
  const trustStats = t.raw("trustStats") as { stat: string; label: string }[];
  const features = t.raw("features") as { title: string; body: string }[];
  const personas = t.raw("personas") as { title: string; body: string }[];
  const testimonials = t.raw("testimonials") as {
    flag: string;
    name: string;
    quote: string;
    avatar: string;
  }[];
  const visaSteps = t.raw("visaSteps") as {
    n: string;
    title: string;
    body: string;
  }[];
  const embassyFigures = t.raw("embassyFigures") as {
    quote: string;
    caption: string;
  }[];
  const faqItems = t.raw("faqItems") as { q: string; a: string }[];
  const priceFrom = t("ticketFrom", { price: usdFeeDisplay });

  return (
    <div id="top" className="relative bg-mint-grain">
      <BackToTopButton />
      {/* Hero + trust wave: one shell so mint grain & airiness run to the wave (no extra divider band) */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.34] mix-blend-soft-light"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 95% 62% at 50% -14%, rgb(255 255 255 / 0.92) 0%, transparent 62%), radial-gradient(ellipse 55% 48% at 86% 20%, rgb(227 238 252 / 0.3) 0%, transparent 68%)",
          }}
        />
        <section
          id="hero"
          className="relative z-10 flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 pb-12 pt-24 md:pb-16 md:pt-28"
          aria-labelledby="hero-heading"
        >
          <div className="relative mx-auto max-w-6xl rounded-xl bg-subtle-hero-card px-6 py-10 shadow-[0_25px_60px_-20px_rgba(34,98,187,0.2)] ring-1 ring-[color:var(--brand-blue)]/10 md:rounded-2xl md:px-12 md:py-14">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
              <div>
                <p className="mb-2 inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-green)] shadow-sm">
                  {t("heroBadge")}
                </p>
                <h1
                  id="hero-heading"
                  className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-[3.35rem] lg:leading-[1.08]"
                >
                  <span className="text-[color:var(--brand-blue)]">
                    {t("heroHeadingLead")}
                  </span>
                  <span className="bg-gradient-to-r from-[color:var(--brand-blue)] to-[color:var(--brand-green)] bg-clip-text text-transparent">
                    {t("heroHeadingAccent")}
                  </span>
                </h1>
                <p className="mt-5 max-w-xl text-pretty text-lg text-muted-foreground leading-relaxed">
                  {t("heroSub")}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <BookNowButton label={t("bookNow")} />
                  <Link
                    href="#how-it-works"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "lg" }),
                      "rounded-xl font-medium text-[color:var(--brand-blue)] hover:bg-[color:var(--brand-blue)]/5 hover:text-[color:var(--brand-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-blue)] focus-visible:ring-offset-2",
                    )}
                  >
                    {t("howItWorks")}
                  </Link>
                </div>
              </div>
              <HeroTicketGraphic
                priceLabel={priceFrom}
                departure={t("ticketDeparture")}
                arrival={t("ticketArrival")}
                cityDep={t("ticketBangkok")}
                cityArr={t("ticketTokyo")}
                passenger={t("ticketPassenger")}
                passengerValue={t("ticketPassengerVal")}
                record={t("ticketRecord")}
                verified={t("ticketVerified")}
              />
            </div>
          </div>
        </section>

        <SectionDivider variant="hero-to-trust" className="relative z-[1]" />
      </div>

      {/* Trust + features wave: one cream shell so subtle-trust runs to the wave */}
      <div className="relative -mt-px bg-subtle-trust">
        <section className="bg-transparent py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-4 sm:grid-cols-3 sm:gap-5 md:gap-6">
              {trustStats.map((item, i) => {
                const Icon = trustIcons[i] ?? Timer;
                return (
                  <div
                    key={item.label}
                    className="flex flex-col items-center rounded-xl border border-[color:var(--brand-blue)]/10 bg-white/75 p-6 text-center shadow-sm ring-1 ring-white/80 backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-[color:var(--brand-blue)]/16 hover:shadow-md sm:items-start sm:p-7 sm:text-left"
                  >
                    <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[color:var(--brand-blue)]/12 to-[color:var(--brand-blue)]/6 ring-1 ring-[color:var(--brand-blue)]/10">
                      <Icon
                        className="h-6 w-6 text-[color:var(--brand-blue)]"
                        aria-hidden
                      />
                    </div>
                    <p className="text-2xl font-bold tracking-tight text-[color:var(--brand-blue)] md:text-[1.65rem]">
                      {item.stat}
                    </p>
                    <p className="mt-2 max-w-[15rem] text-sm leading-snug text-muted-foreground sm:max-w-none">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <SectionDivider variant="trust-to-features" className="relative z-[1]" />
      </div>

      {/* Features + how wave: one features-gradient shell to the wave */}
      <div className="relative -mt-px bg-subtle-features">
        <section className="relative overflow-hidden bg-transparent pt-8 pb-16 md:pt-12 md:pb-24">
          <LogoTicker />
          <div
            aria-hidden
            className="feature-blob feature-blob-a -left-28 top-[18%] h-72 w-72 bg-[color:var(--brand-blue)] md:h-80 md:w-80"
          />
          <div
            aria-hidden
            className="feature-blob feature-blob-b -right-24 bottom-[12%] h-80 w-80 bg-[color:var(--brand-green)] md:h-96 md:w-96"
          />
          <div className="relative z-[1] mx-auto max-w-6xl px-4">
            <div
              className="mx-auto mb-8 h-px max-w-xs bg-gradient-to-r from-transparent via-[color:var(--brand-blue)]/20 to-transparent md:mb-10 md:max-w-sm"
              aria-hidden
            />
            <Reveal className="text-center">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-[color:var(--brand-blue)] md:text-4xl">
                {t("featuresTitle")}
              </h2>
              <div className="heading-accent-bar" />
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {t("featuresSub")}
              </p>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-7 lg:mt-14 lg:grid-cols-3 lg:gap-8">
              {features.map((item, i) => {
                const Icon = featureIcons[i] ?? Zap;
                const tint = [
                  "bg-feature-card-sky",
                  "bg-feature-card-blush",
                  "bg-feature-card-lime",
                  "bg-feature-card-warm",
                  "bg-feature-card-mint",
                  "bg-feature-card-white",
                ][i]!;
                const iconClass = [
                  "text-[color:var(--brand-blue)]",
                  "text-[color:var(--brand-green)]",
                  "text-[color:var(--brand-blue)]",
                  "text-[color:var(--brand-green)]",
                  "text-[color:var(--brand-blue)]",
                  "text-[color:var(--brand-green)]",
                ][i]!;
                const iconWrap = [
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white/85 shadow-sm ring-1 ring-[color:var(--brand-blue)]/14 transition-transform duration-300 ease-out group-hover:scale-105",
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white/80 shadow-sm ring-1 ring-[color:var(--brand-green)]/20 transition-transform duration-300 ease-out group-hover:scale-105",
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white/80 ring-1 ring-[color:var(--brand-green)]/12 transition-transform duration-300 ease-out group-hover:scale-105",
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white/75 ring-1 ring-[color:var(--brand-blue)]/10 transition-transform duration-300 ease-out group-hover:scale-105",
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white/70 ring-1 ring-[color:var(--brand-blue)]/10 transition-transform duration-300 ease-out group-hover:scale-105",
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-surface-mint/90 ring-1 ring-[color:var(--brand-green)]/18 transition-transform duration-300 ease-out group-hover:scale-105",
                ][i]!;
                return (
                  <Reveal key={item.title} delayMs={80 + i * 65}>
                    <div
                      className={cn(
                        "group h-full rounded-xl border border-transparent p-8 shadow-sm ring-1 ring-[color:var(--brand-blue)]/10 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--brand-blue)]/8 hover:shadow-lg hover:ring-[color:var(--brand-blue)]/16",
                        tint,
                      )}
                    >
                      <div className={iconWrap}>
                        <Icon
                          className={cn("h-7 w-7", iconClass)}
                          aria-hidden
                        />
                      </div>
                      <h3 className="mt-4 text-xl font-bold tracking-tight text-[color:var(--brand-blue)]">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
                        {item.body}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>          </div>
        </section>

        <SectionDivider variant="features-to-how" className="relative z-[1]" />
      </div>

      {/* How it works — Sticky stacked step cards */}
      <section
        id="how-it-works"
        className={cn(
          "-mt-px scroll-mt-24 bg-subtle-how pb-20 pt-10 md:pb-28 md:pt-14",
          "[--booking-nav-offset:5rem] md:[--booking-nav-offset:5.25rem]",
          "[--booking-overlap-adjust:10.75rem] md:[--booking-overlap-adjust:11.5rem]",
        )}
      >
        <div className="w-full px-4">
          <BookingProcessTimeline
            heading={
              <div className="pb-4 text-center md:pb-5">
                <Reveal className="text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-[color:var(--brand-blue)] md:text-4xl">
                    {t("processTitle")}
                  </h2>
                </Reveal>
              </div>
            }
            afterLastStep={
              <Reveal
                className="flex flex-wrap items-center justify-center gap-4"
                delayMs={80}
              >
                <BookNowButton
                  label={t("bookNow")}
                  className="transition duration-200 hover:brightness-105 active:scale-[0.98]"
                />
                <Link
                  href="#faq"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "inline-flex min-w-[11rem] items-center justify-center gap-2 rounded-xl border-2 border-[color:var(--brand-blue)] bg-white/90 px-8 font-semibold text-[color:var(--brand-blue)] shadow-sm transition duration-200 hover:bg-white hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-surface-mint",
                  )}
                >
                  {t("commonQuestions")}
                  <ChevronRight className="size-5 opacity-70" aria-hidden />
                </Link>
              </Reveal>
            }
          />
        </div>
      </section>

      {/* Personas */}
      <section className="-mt-px bg-subtle-personas py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[color:var(--brand-blue)] md:text-4xl">
              <Logo /> {t("personasTitle")}
            </h2>
            <div className="heading-accent-bar" />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {personas.map((p, i) => {
              const Icon = personaIcons[i] ?? Sparkles;
              return (
              <Reveal key={p.title} delayMs={i * 55}>
                <div className="h-full rounded-xl bg-subtle-persona-card p-6 shadow-sm ring-1 ring-black/[0.04] transition duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-black/[0.07]">
                  <Icon
                    className="h-9 w-9 text-[color:var(--brand-green)]"
                    aria-hidden
                  />
                  <h3 className="mt-3 text-lg font-bold text-[color:var(--brand-blue)]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                </div>
              </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="-mt-px bg-subtle-social py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[color:var(--brand-blue)] md:text-4xl">
              {t("socialTitle")}
            </h2>
            <div className="heading-accent-bar" />
            <p className="mx-auto mt-2 max-w-xl text-center text-xs text-muted-foreground">
              {t("socialNote")}
            </p>
            <div
              className="mt-5 flex justify-center gap-0.5"
              aria-hidden
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-[1.15rem] fill-[color:var(--brand-green)] text-[color:var(--brand-green)]"
                />
              ))}
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((row, i) => (
              <Reveal key={row.name} delayMs={i * 60}>
                <blockquote className="flex h-full flex-col rounded-xl border border-[color:var(--brand-blue)]/10 bg-subtle-testimonial p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[color:var(--brand-blue)] text-sm font-bold text-white"
                      aria-hidden
                    >
                      {row.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        <span aria-hidden>{row.flag}</span> {row.name}
                      </p>
                      <div className="mt-0.5 flex gap-0.5" aria-hidden>
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            className="size-3.5 fill-[color:var(--brand-green)] text-[color:var(--brand-green)]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{row.quote}&rdquo;
                  </p>
                </blockquote>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 flex justify-center">
            <BookNowButton label={t("bookNow")} />
          </Reveal>
        </div>
      </section>

      <SectionDivider variant="social-to-embassy" />

      {/* Embassy themes & Visa flexibility (Merged) */}
      <section className="-mt-px bg-subtle-embassy py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="right">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-[color:var(--brand-blue)] md:text-4xl">
                  {t("visaTitle")}
                </h2>
                <div className="heading-accent-bar-left" />
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {t("visaBody")}
                </p>
                <div className="mt-10 space-y-8">
                  {visaSteps.map((row) => (
                    <div key={row.n} className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--brand-green)] text-base font-bold text-white">
                        {row.n}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-[color:var(--brand-blue)]">
                          {row.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {row.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </Reveal>

            <Reveal direction="left" delayMs={80}>
              <div className="flex flex-col gap-5">
              <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--brand-blue)]/60">
                {t("embassyPublish")}
              </p>
              {embassyFigures.map((fig) => (
                <figure
                  key={fig.caption}
                  className="embassy-quote-card rounded-xl border border-[color:var(--brand-blue)]/10 bg-subtle-figure p-7 pl-8 pt-10 shadow-sm"
                >
                  <blockquote className="text-sm leading-relaxed text-muted-foreground">
                    <p>&ldquo;{fig.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-4 text-xs font-medium text-foreground">
                    {fig.caption}
                  </figcaption>
                </figure>
              ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SectionDivider variant="embassy-to-faq" />

      {/* FAQ */}
      <section id="faq" className="-mt-px scroll-mt-24 bg-subtle-faq py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-4">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[color:var(--brand-blue)] md:text-4xl">
              {t("faqTitle")}
            </h2>
            <div className="heading-accent-bar" />
          </Reveal>
          <div className="mt-10 space-y-3">
            {faqItems.map((item, i) => (
              <Reveal key={item.q} delayMs={i * 45}>
                <details className="group rounded-lg border border-[color:var(--brand-blue)]/15 bg-subtle-faq-item px-5 py-1 shadow-sm open:shadow-md">
                  <summary className="cursor-pointer list-none py-4 font-semibold text-[color:var(--brand-blue)] select-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-2">
                      {item.q}
                      <span
                        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-green)]/15 text-lg font-medium text-[color:var(--brand-green)] transition duration-200 group-open:rotate-45"
                        aria-hidden
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="border-t border-[color:var(--brand-blue)]/10 pb-4 pt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 text-center text-sm text-muted-foreground">
            <p>{t("faqFooter")}</p>
          </Reveal>
        </div>
      </section>

      {/* Final CTA — sky + soft clouds (outer fill avoids subpixel seam with FAQ) */}
      <section className="relative overflow-hidden bg-[color:var(--surface-sky)] py-20 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-subtle-cta-bg"
        />
        <CtaTicketWatermark />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-10 h-48 w-72 rounded-full bg-white/70 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 bottom-8 h-56 w-80 rounded-full bg-white/60 blur-3xl"
        />
        <Reveal className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-[color:var(--brand-blue)] md:text-4xl">
            {t("ctaTitle")} <Logo />.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("ctaPriceLine", { price: usdFeeDisplay })}
          </p>
          <BookNowButton
            label={t("bookNow")}
            className="mt-10"
            pulseCta
          />
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="-mt-px bg-subtle-footer text-white">
        <SectionDivider variant="footer" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="flex flex-col gap-10 md:flex-row md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/tempticket.png"
                  alt="TempTicket"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain brightness-0 invert"
                />
                <Logo mono className="text-xl" />
              </div>
              <p className="mt-3 max-w-xs text-sm leading-snug text-white/85">
                {t("footerTagline")}
              </p>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-16">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider opacity-80">
                  {t("footerServices")}
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link
                      href="/book"
                      className="rounded-sm opacity-90 underline-offset-4 hover:underline hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--brand-green)]"
                    >
                      {t("footerBook")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      className="rounded-sm opacity-90 underline-offset-4 hover:underline hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--brand-green)]"
                    >
                      {t("footerSignIn")}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider opacity-80">
                  {t("footerAccount")}
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link
                      href="/account/bookings"
                      className="rounded-sm opacity-90 underline-offset-4 hover:underline hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--brand-green)]"
                    >
                      {t("footerMyBookings")}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider opacity-80">
                  {t("footerLegal")}
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link
                      href="/terms"
                      className="rounded-sm opacity-90 underline-offset-4 hover:underline hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--brand-green)]"
                    >
                      {t("footerTerms")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="rounded-sm opacity-90 underline-offset-4 hover:underline hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--brand-green)]"
                    >
                      {t("footerPrivacy")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-8 text-xs opacity-80 sm:flex-row sm:text-left">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} <Logo mono />. {t("footerCopyright")}
            </p>
            <Link
              href="#top"
              className="rounded-sm font-medium text-white/95 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--brand-green)]"
            >
              {t("footerBackTop")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
