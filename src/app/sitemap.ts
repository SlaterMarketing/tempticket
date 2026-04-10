import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const base = (
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

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
