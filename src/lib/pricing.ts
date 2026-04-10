/** Service fee in smallest currency unit (e.g. cents). Adjust before launch. */
export const SERVICE_FEE_BY_CURRENCY: Record<string, number> = {
  usd: 1200,
  eur: 1100,
  gbp: 1000,
  thb: 45000,
};

export function serviceFeeForCurrency(currency: string) {
  const key = currency.toLowerCase();
  return SERVICE_FEE_BY_CURRENCY[key] ?? SERVICE_FEE_BY_CURRENCY.usd;
}
