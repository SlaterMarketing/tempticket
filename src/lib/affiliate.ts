/** Default partner; AFFILIATE_URL / AFFILIATE_PARTNER_NAME override it, and AFFILIATE_URL=off disables affiliate mode. */
const DEFAULT_AFFILIATE_URL = "https://volward.com/r/tempticket";
const DEFAULT_AFFILIATE_PARTNER_NAME = "Volward";
/** Volward's cheapest one-way reservation, in whole USD. AFFILIATE_PRICE_FROM_USD overrides it. */
const DEFAULT_AFFILIATE_PRICE_FROM_USD = 14;

export type AffiliatePartner = {
  url: string;
  name: string;
  /** Lowest price the partner advertises, in whole USD, or null if unknown. */
  priceFromUsd: number | null;
};

/**
 * When affiliate mode is on, /book hands visitors to the affiliate partner and
 * the in-house Duffel booking flow is switched off.
 */
export function getAffiliatePartner(): AffiliatePartner | null {
  const override = process.env.AFFILIATE_URL?.trim();
  if (override?.toLowerCase() === "off") return null;
  const url = override || DEFAULT_AFFILIATE_URL;
  const name =
    process.env.AFFILIATE_PARTNER_NAME?.trim() ||
    (override ? "our partner" : DEFAULT_AFFILIATE_PARTNER_NAME);
  const priceEnv = Number(process.env.AFFILIATE_PRICE_FROM_USD?.trim());
  const priceFromUsd =
    Number.isFinite(priceEnv) && priceEnv > 0
      ? priceEnv
      : override
        ? null
        : DEFAULT_AFFILIATE_PRICE_FROM_USD;
  return { url, name, priceFromUsd };
}

/** Allowed values for the `src` query param on /api/go/partner (which CTA was clicked). */
const SOURCE_RE = /^[a-z0-9][a-z0-9-]{0,63}$/;

export function sanitizeClickSource(raw: string | null): string | null {
  const v = raw?.trim().toLowerCase();
  return v && SOURCE_RE.test(v) ? v : null;
}

/** Link to the click-counting redirect, tagged with the CTA that sent the visitor. */
export function partnerHref(source: string): string {
  return `/api/go/partner?src=${encodeURIComponent(source)}`;
}
