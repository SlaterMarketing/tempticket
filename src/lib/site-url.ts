/**
 * Canonical public origin for server-generated URLs (emails, Stripe redirects, metadata, sitemap).
 * Uses NEXT_PUBLIC_APP_URL — set it at runtime on Docker (e.g. Dokploy) so links match production.
 */
export function getServerSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_APP_URL?.trim() || "";
  return (raw.replace(/\/$/, "") || "http://localhost:3000").trim();
}
