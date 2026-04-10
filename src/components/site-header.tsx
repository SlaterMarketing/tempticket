"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  /** Full-bleed booking flow: no top nav (step chrome lives in the page). */
  if (pathname === "/book" || pathname.startsWith("/book/")) {
    return null;
  }

  const isHome = pathname === "/";

  /** Home: sticky + transparent still sits over the body’s white bg; absolute lets the page wash show through. */
  const isFloatingNav = isHome;

  return (
    <header
      className={cn(
        "z-50",
        isFloatingNav
          ? "absolute inset-x-0 top-0 border-0 bg-transparent"
          : "sticky top-0 border-b bg-background/80 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-4 font-semibold tracking-tight text-foreground"
        >
          <Image
            src="/tempticket.png"
            alt="TempTicket"
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 object-contain"
            priority
          />
          <Logo className="text-3xl leading-none" />
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4 text-xl">
          {email ? (
            <>
              <Link
                href="/account/bookings"
                className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-blue)] focus-visible:ring-offset-2"
              >
                My bookings
              </Link>
              {showAdmin ? (
                <Link
                  href="/admin"
                  className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-blue)] focus-visible:ring-offset-2"
                >
                  Admin
                </Link>
              ) : null}
              <form action={logoutAction}>
                <Button type="submit" variant="ghost" size="lg" className="text-xl">
                  Sign out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(
                  "rounded-lg px-4 py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-blue)] focus-visible:ring-offset-2",
                  isFloatingNav
                    ? "text-[color:var(--brand-blue)] hover:text-[color:var(--brand-blue)]/75"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                Sign in
              </Link>
              <Link
                href="/book"
                className={cn(
                  "rounded-full px-6 py-3 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--brand-blue)] focus-visible:ring-offset-2",
                  isHome
                    ? "bg-[color:var(--brand-green)] text-white shadow-sm hover:bg-[color:var(--brand-green)]/90"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                )}
              >
                Book
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
