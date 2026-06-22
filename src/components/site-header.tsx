"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { logoutAction } from "@/app/actions/auth";
import { cn } from "@/lib/utils";

export function SiteHeader({
  email,
  showAdmin,
}: {
  email?: string | null;
  showAdmin?: boolean;
}) {
  const t = useTranslations("SiteHeader");
  const pathname = usePathname();
  /** Full-bleed booking flow: no top nav (step chrome lives in the page). */
  if (pathname === "/book" || pathname.startsWith("/book/")) {
    return null;
  }

  const isHome = pathname === "/";

  /** Home: light sticky bar so mobile matches desktop (no transparent overlay on dark system UI). */
  const isFloatingNav = isHome;

  return (
    <header
      className={cn(
        "sticky top-0 z-50",
        isFloatingNav
          ? "border-b border-[color:var(--brand-blue)]/10 bg-[rgb(236_248_243/0.94)] backdrop-blur-md"
          : "border-b bg-background/95 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-2 px-4 py-2 sm:min-h-20 sm:gap-4 sm:py-3">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2 font-semibold tracking-tight text-foreground sm:gap-4"
        >
          <Image
            src="/tempticket.png"
            alt={t("brandAlt")}
            width={64}
            height={64}
            className="h-11 w-11 shrink-0 object-contain sm:h-16 sm:w-16"
            priority
          />
          <Logo className="truncate text-xl leading-none sm:text-3xl" />
        </Link>
        <nav className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-4 text-sm sm:text-xl">
          <LocaleSwitcher
            className={cn(
              "shrink-0",
              isFloatingNav && "text-[color:var(--brand-blue)]",
            )}
          />
          {email ? (
            <>
              <Link
                href="/account/bookings"
                className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-blue)] focus-visible:ring-offset-2"
              >
                {t("myBookings")}
              </Link>
              {showAdmin ? (
                <Link
                  href="/admin"
                  className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-blue)] focus-visible:ring-offset-2"
                >
                  {t("admin")}
                </Link>
              ) : null}
              <form action={logoutAction}>
                <Button type="submit" variant="ghost" size="lg" className="text-xl">
                  {t("signOut")}
                </Button>
              </form>
            </>
          ) : (
            <Link
              href="/book"
              className={cn(
                "shrink-0 rounded-full px-4 py-2 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--brand-blue)] focus-visible:ring-offset-2 sm:px-6 sm:py-3",
                isHome
                  ? "bg-[color:var(--brand-green)] text-white shadow-sm hover:bg-[color:var(--brand-green)]/90"
                  : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
              )}
            >
              {t("book")}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
