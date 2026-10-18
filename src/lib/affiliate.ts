/** Default partner; AFFILIATE_URL / AFFILIATE_PARTNER_NAME override it, and AFFILIATE_URL=off disables affiliate mode. */
const DEFAULT_AFFILIATE_URL = "https://volward.com/r/tempticket";
const DEFAULT_AFFILIATE_PARTNER_NAME = "Volward";

/**
 * When affiliate mode is on, /book hands visitors to the affiliate partner and
 * the in-house Duffel booking flow is switched off.
 */
export function getAffiliatePartner(): { url: string; name: string } | null {
  const override = process.env.AFFILIATE_URL?.trim();
  if (override?.toLowerCase() === "off") return null;
  const url = override || DEFAULT_AFFILIATE_URL;
  const name =
    process.env.AFFILIATE_PARTNER_NAME?.trim() ||
    (override ? "our partner" : DEFAULT_AFFILIATE_PARTNER_NAME);
  return { url, name };
}
