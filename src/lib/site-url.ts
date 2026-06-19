function normalizeOrigin(input: string): string {
  let trimmed = input.trim().replace(/\/$/, "");
  if (!/^https?:\/\//i.test(trimmed)) {
    const isLocal =
      trimmed.startsWith("localhost") ||
      trimmed.startsWith("127.0.0.1") ||
      trimmed.startsWith("[::1]");
    trimmed = `${isLocal ? "http" : "https"}://${trimmed}`;
  }
  return trimmed;
}

function isLocalhostOrigin(origin: string): boolean {
  try {
    const { hostname } = new URL(normalizeOrigin(origin));
    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "[::1]"
    );
  } catch {
    return false;
  }
}

/**
 * Canonical public origin for server-generated URLs (emails, Stripe redirects, metadata, sitemap).
 *
 * Prefer APP_URL (runtime, server-only). NEXT_PUBLIC_APP_URL is inlined at build time, so a
 * localhost build value breaks production emails unless Vercel/Docker runtime fallbacks apply.
 */
export function getServerSiteUrl(): string {
  const appUrl = process.env.APP_URL?.trim();
  if (appUrl) return normalizeOrigin(appUrl);

  const publicUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (publicUrl && !isLocalhostOrigin(publicUrl)) {
    return normalizeOrigin(publicUrl);
  }

  if (process.env.NODE_ENV === "production") {
    const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
    if (vercelProd) return normalizeOrigin(vercelProd);

    const vercelUrl = process.env.VERCEL_URL?.trim();
    if (vercelUrl) return normalizeOrigin(vercelUrl);
  }

  if (publicUrl) return normalizeOrigin(publicUrl);
  return "http://localhost:3000";
}
