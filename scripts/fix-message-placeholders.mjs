/**
 * Rewrites `{…}` segments in non-English message files so placeholder *names*
 * match `messages/en.json` (required by next-intl / ICU). Machine translation
 * often turns `{price}` into `{precio}` etc.
 *
 * Usage: node scripts/fix-message-placeholders.mjs
 */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const messagesDir = join(__dirname, "..", "messages");
const enPath = join(messagesDir, "en.json");

const en = JSON.parse(readFileSync(enPath, "utf8"));

/** @param {string} enStr @param {string} locStr */
function syncPlaceholdersFromEn(enStr, locStr) {
  const enPh = [...enStr.matchAll(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g)].map(
    (m) => m[1],
  );
  if (enPh.length === 0) return locStr;
  const re = /\{[^}]+\}/g;
  const matches = [...locStr.matchAll(re)];
  if (matches.length !== enPh.length) return locStr;
  let i = 0;
  return locStr.replace(re, () => `{${enPh[i++]}}`);
}

/** @param {unknown} enNode @param {unknown} locNode */
function fixPair(enNode, locNode) {
  if (typeof enNode === "string" && typeof locNode === "string") {
    return syncPlaceholdersFromEn(enNode, locNode);
  }
  if (Array.isArray(enNode) && Array.isArray(locNode)) {
    return enNode.map((e, i) => fixPair(e, locNode[i]));
  }
  if (
    enNode !== null &&
    locNode !== null &&
    typeof enNode === "object" &&
    typeof locNode === "object" &&
    !Array.isArray(enNode) &&
    !Array.isArray(locNode)
  ) {
    /** @type {Record<string, unknown>} */
    const loc = /** @type {Record<string, unknown>} */ (locNode);
    /** @type {Record<string, unknown>} */
    const out = { ...loc };
    for (const k of Object.keys(/** @type {object} */ (enNode))) {
      if (k in out) {
        out[k] = fixPair(
          /** @type {Record<string, unknown>} */ (enNode)[k],
          out[k],
        );
      }
    }
    return out;
  }
  return locNode;
}

let n = 0;
for (const file of readdirSync(messagesDir)) {
  if (!file.endsWith(".json") || file === "en.json") continue;
  const path = join(messagesDir, file);
  const loc = JSON.parse(readFileSync(path, "utf8"));
  const fixed = fixPair(en, loc);
  writeFileSync(path, `${JSON.stringify(fixed, null, 2)}\n`, "utf8");
  n++;
  console.log(file);
}
console.log(`Updated ${n} file(s).`);
