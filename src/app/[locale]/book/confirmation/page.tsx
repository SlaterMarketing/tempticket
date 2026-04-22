import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, BadgeCheck, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildPublicMetadata } from "@/lib/i18n/metadata";
import { ConfirmationToast } from "./confirmation-toast";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return buildPublicMetadata(
    locale,
    "book/confirmation",
    t("bookConfirmationTitle"),
    t("bookConfirmationDescription"),
  );
}

export default async function BookConfirmationPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    session_id?: string;
    admin_test?: string;
    booking_id?: string;
  }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("BookConfirmation");
  const sp = await searchParams;
  const isAdminTest = sp.admin_test === "1";

  const primary = cn(
    buttonVariants({ size: "lg" }),
    "inline-flex min-w-[10rem] items-center justify-center gap-2 rounded-xl border-0 bg-[color:var(--brand-green)] font-semibold text-white shadow-md transition duration-200 hover:bg-[color:var(--brand-green)]/90 hover:shadow-lg",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-blue)] focus-visible:ring-offset-2",
  );
  const secondary = cn(
    buttonVariants({ size: "lg", variant: "outline" }),
    "inline-flex min-w-[10rem] items-center justify-center gap-2 rounded-xl border-2 border-[color:var(--brand-blue)] bg-white/90 font-semibold text-[color:var(--brand-blue)] shadow-sm transition hover:bg-white hover:shadow-md",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-blue)] focus-visible:ring-offset-2",
  );

  return (
    <div className="min-h-screen w-full bg-subtle-how pb-16 pt-8 md:pb-24 md:pt-12">
      <div className="mx-auto max-w-lg px-4 md:max-w-xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--brand-blue)] opacity-90 transition hover:opacity-100"
        >
          <ArrowLeft className="size-4 shrink-0" aria-hidden />
          {t("backHome")}
        </Link>

        <ConfirmationToast sessionId={sp.session_id} />

        {isAdminTest ? (
          <div className="mt-6 rounded-lg border border-dashed border-amber-500/70 bg-amber-50/90 px-4 py-3 text-sm text-amber-900">
            <p className="font-semibold">Admin test booking</p>
            <p className="mt-1 text-amber-900/80">
              Stripe was skipped; the Duffel order was created directly.
              {sp.booking_id ? (
                <>
                  {" "}
                  Booking id:{" "}
                  <span className="font-mono text-xs">{sp.booking_id}</span>
                </>
              ) : null}
            </p>
          </div>
        ) : null}

        <section className="mt-8 overflow-hidden rounded-2xl border border-[color:var(--brand-blue)]/10 bg-feature-card-sky shadow-[0_20px_50px_-14px_rgba(34,98,187,0.18)] ring-1 ring-[color:var(--brand-blue)]/8 md:mt-10 md:rounded-3xl">
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
                  {t("body")}
                </p>
                <div className="heading-accent-bar-left mt-3" />
              </div>
            </div>

            <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
              <p>{t("detail")}</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/book" className={primary}>
                  {t("bookAnother")}
                  <ChevronRight className="size-4 opacity-90" aria-hidden />
                </Link>
                <Link
                  href={{
                    pathname: "/login",
                    query: { next: "/account/bookings" },
                  }}
                  className={secondary}
                >
                  {t("signInHistory")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
