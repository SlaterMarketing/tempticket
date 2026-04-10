/** Deep-merge message trees so sparse locale files override English fallbacks. */
export function deepMergeMessages(
  base: Record<string, unknown>,
  override: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    const b = base[key];
    const o = override[key];
    if (
      o !== null &&
      typeof o === "object" &&
      !Array.isArray(o) &&
      b !== null &&
      typeof b === "object" &&
      !Array.isArray(b)
    ) {
      out[key] = deepMergeMessages(
        b as Record<string, unknown>,
        o as Record<string, unknown>,
      );
    } else if (o !== undefined) {
      out[key] = o;
    }
  }
  return out;
}
