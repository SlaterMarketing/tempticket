/**
 * When AFFILIATE_URL is set, /book hands visitors to the affiliate partner and
 * the in-house Duffel booking flow is switched off.
 */
export function getAffiliatePartner(): { url: string; name: string } | null {
  const url = process.env.AFFILIATE_URL?.trim();
  if (!url) return null;
  const name = process.env.AFFILIATE_PARTNER_NAME?.trim() || "our partner";
  return { url, name };
}
