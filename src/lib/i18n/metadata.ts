import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getServerSiteUrl } from "@/lib/site-url";

function appBase(): URL {
  return new URL(getServerSiteUrl());
}

/**
 * Path without locale prefix, e.g. `''` for home, `'terms'`, `'book/confirmation'`.
 */
export function buildPublicMetadata(
  locale: string,
  pathWithoutLocale: string,
  title: string,
  description: string,
): Metadata {
  const base = appBase();
  const suffix =
    pathWithoutLocale === "" || pathWithoutLocale === "/"
      ? ""
      : `/${pathWithoutLocale.replace(/^\//, "")}`;

  const canonical = new URL(`/${locale}${suffix}`, base).toString();
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = new URL(`/${loc}${suffix}`, base).toString();
  }
  languages["x-default"] = new URL(
    `/${routing.defaultLocale}${suffix}`,
    base,
  ).toString();

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
  };
}
