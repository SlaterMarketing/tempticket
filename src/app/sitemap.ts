import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { GUIDE_LOCALES, getGuides } from "@/lib/guides";
import { getServerSiteUrl } from "@/lib/site-url";

/** Only pages worth ranking: no sign-in, account or post-payment pages. */
const publicPaths = ["", "book", "terms", "privacy"] as const;

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
  for (const locale of GUIDE_LOCALES) {
    entries.push({ url: `${base}/${locale}/guides`, lastModified: now });
    for (const g of getGuides(locale)) {
      entries.push({
        url: `${base}/${locale}/guides/${g.slug}`,
        lastModified: now,
      });
    }
  }
  return entries;
}
