import type { MetadataRoute } from "next";
import { getServerSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const base = getServerSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
