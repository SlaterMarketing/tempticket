/**
 * Copy any keys present in messages/en.json but missing from other locale files.
 * Existing translations are preserved; gaps are filled with English (for translators / parity).
 *
 * Usage: node scripts/sync-missing-message-keys.mjs
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const messagesDir = join(__dirname, "..", "messages");

/**
 * @param {unknown} localeVal
 * @param {unknown} enVal
 */
function fillMissing(localeVal, enVal) {
  if (enVal === null || enVal === undefined) return localeVal;

  if (Array.isArray(enVal)) {
    if (!Array.isArray(localeVal)) {
      return enVal.map((item) => fillMissing(undefined, item));
    }
    return enVal.map((enItem, i) => fillMissing(localeVal[i], enItem));
  }

  if (typeof enVal === "object") {
    const loc =
      localeVal && typeof localeVal === "object" && !Array.isArray(localeVal)
        ? localeVal
        : /** @type {Record<string, unknown>} */ ({});
    const out = { ...loc };
    for (const k of Object.keys(enVal)) {
      if (!(k in out)) {
        out[k] = fillMissing(undefined, enVal[k]);
      } else {
        out[k] = fillMissing(out[k], enVal[k]);
      }
    }
    return out;
  }

  return localeVal !== undefined ? localeVal : enVal;
}

const enPath = join(messagesDir, "en.json");
const en = JSON.parse(readFileSync(enPath, "utf8"));

const files = readdirSync(messagesDir).filter(
  (f) => f.endsWith(".json") && f.toLowerCase() !== "en.json",
);

let updated = 0;
for (const f of files) {
  const path = join(messagesDir, f);
  const locale = JSON.parse(readFileSync(path, "utf8"));
  const merged = fillMissing(locale, en);
  const before = readFileSync(path, "utf8");
  const after = `${JSON.stringify(merged, null, 2)}\n`;
  if (before !== after) {
    writeFileSync(path, after, "utf8");
    updated += 1;
  }
}

console.log(`Synced missing keys from en.json into ${updated} locale file(s).`);
