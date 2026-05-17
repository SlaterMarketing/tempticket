import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getServerSiteUrl } from "@/lib/site-url";

const publicPaths = [
  "",
  "book",
  "book/confirmation",
  "login",
  "account/bookings",
  "terms",
  "privacy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getServerSiteUrl();
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();
  for (const locale of routing.locales) {
    for (const p of publicPaths) {
      const path = p === "" ? `/${locale}` : `/${locale}/${p}`;
      entries.push({
        url: `${base}${path}`,
        lastModified: now,
      });
    }
  }
  return entries;
}
