"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/events", label: "Booking events" },
] as const;

export function AdminNav() {
  const pathname = usePathname();
  const sp = useSearchParams();
  const qs = sp.toString();

  return (
    <nav className="flex flex-wrap gap-2 border-b border-border pb-4">
      {links.map(({ href, label }) => {
        const active =
          href === "/admin"
            ? pathname === "/admin"
            : pathname === href || pathname.startsWith(`${href}/`);
        const search = qs ? `?${qs}` : "";
        return (
          <Link
            key={href}
            href={`${href}${search}`}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
