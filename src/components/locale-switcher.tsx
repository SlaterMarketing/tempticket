"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

function localeLabel(code: string): string {
  try {
    return (
      new Intl.DisplayNames(["en"], { type: "language" }).of(
        code === "fil" ? "fil" : code,
      ) ?? code
    );
  } catch {
    return code;
  }
}

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const href =
    searchParams.size > 0
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

  return (
    <label className={cn("flex items-center gap-2 text-sm", className)}>
      <span className="sr-only">{t("ariaLabel")}</span>
      <span className="hidden text-muted-foreground sm:inline">
        {t("language")}
      </span>
      <select
        value={locale}
        aria-label={t("ariaLabel")}
        className="max-w-[10.5rem] rounded-md border border-input bg-background px-2 py-1.5 text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-blue)]"
        onChange={(e) => {
          router.replace(href, { locale: e.target.value });
        }}
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeLabel(loc)}
          </option>
        ))}
      </select>
    </label>
  );
}
