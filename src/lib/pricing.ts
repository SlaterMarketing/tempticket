import { z } from "zod";

/**
 * Top presentment currencies for checkout (~USD 15 equivalents, rounded for retail).
 * Amounts are Stripe `unit_amount`: minor units (cents, pence, etc.) except **zero-decimal**
 * currencies (JPY, KRW), where the value is in whole yen/won.
 */
export const CHECKOUT_CURRENCY_CODES = [
  "usd",
  "eur",
  "gbp",
  "jpy",
  "aud",
  "cad",
  "chf",
  "cny",
  "hkd",
  "sgd",
  "sek",
  "krw",
  "nok",
  "nzd",
  "inr",
  "mxn",
  "brl",
  "thb",
  "pln",
  "aed",
] as const;

export type CheckoutCurrencyCode = (typeof CHECKOUT_CURRENCY_CODES)[number];

export const checkoutCurrencySchema = z.enum(
  CHECKOUT_CURRENCY_CODES as unknown as [CheckoutCurrencyCode, ...CheckoutCurrencyCode[]],
);

/** Stripe `unit_amount` values (see zero-decimal note above). */
export const SERVICE_FEE_BY_CURRENCY: Record<CheckoutCurrencyCode, number> = {
  usd: 1500, // $15.00
  eur: 1400, // €14.00
  gbp: 1200, // £12.00
  jpy: 2300, // ¥2,300 (zero-decimal)
  aud: 2300, // A$23.00
  cad: 2100, // CA$21.00
  chf: 1300, // CHF 13.00
  cny: 10800, // CN¥108.00
  hkd: 11700, // HK$117.00
  sgd: 2000, // S$20.00
  sek: 15500, // 155.00 kr
  krw: 20500, // ₩20,500 (zero-decimal)
  nok: 16000, // 160.00 kr
  nzd: 2500, // NZ$25.00
  inr: 125000, // ₹1,250.00
  mxn: 25500, // MX$255.00
  brl: 8500, // R$85.00
  thb: 56000, // ฿560.00
  pln: 5900, // 59.00 zł
  aed: 5500, // AED 55.00
};

/** Shown in the pay-in dropdown; USD/EUR/GBP/THB first, then the rest. */
export const CHECKOUT_CURRENCY_OPTIONS: {
  value: CheckoutCurrencyCode;
  /** Uppercase ISO code (trigger + list row). */
  label: string;
  /** Longer name for tooltips / accessibility. */
  name: string;
}[] = [
  { value: "usd", label: "USD", name: "US dollar" },
  { value: "eur", label: "EUR", name: "Euro" },
  { value: "gbp", label: "GBP", name: "British pound" },
  { value: "thb", label: "THB", name: "Thai baht" },
  { value: "jpy", label: "JPY", name: "Japanese yen" },
  { value: "aud", label: "AUD", name: "Australian dollar" },
  { value: "cad", label: "CAD", name: "Canadian dollar" },
  { value: "chf", label: "CHF", name: "Swiss franc" },
  { value: "cny", label: "CNY", name: "Chinese yuan" },
  { value: "hkd", label: "HKD", name: "Hong Kong dollar" },
  { value: "sgd", label: "SGD", name: "Singapore dollar" },
  { value: "sek", label: "SEK", name: "Swedish krona" },
  { value: "krw", label: "KRW", name: "South Korean won" },
  { value: "nok", label: "NOK", name: "Norwegian krone" },
  { value: "nzd", label: "NZD", name: "New Zealand dollar" },
  { value: "inr", label: "INR", name: "Indian rupee" },
  { value: "mxn", label: "MXN", name: "Mexican peso" },
  { value: "brl", label: "BRL", name: "Brazilian real" },
  { value: "pln", label: "PLN", name: "Polish złoty" },
  { value: "aed", label: "AED", name: "UAE dirham" },
];

export function serviceFeeForCurrency(currency: string): number {
  const key = currency.toLowerCase() as CheckoutCurrencyCode;
  return SERVICE_FEE_BY_CURRENCY[key] ?? SERVICE_FEE_BY_CURRENCY.usd;
}
