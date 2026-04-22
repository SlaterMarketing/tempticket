/**
 * Fills messages/{locale}.json from messages/en.json using machine translation.
 *
 * Default provider: Google Translate (unofficial, via google-translate-api-x) — no API key.
 * Optional: OpenAI for higher quality — set OPENAI_API_KEY and --provider=openai
 *
 * Usage:
 *   node scripts/translate-messages.mjs
 *   node scripts/translate-messages.mjs --locale=es
 *   node scripts/translate-messages.mjs --provider=openai
 *   node scripts/translate-messages.mjs --dry-run
 */

import "dotenv/config";
import { translate } from "google-translate-api-x";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

/** @type {readonly string[]} — keep aligned with src/i18n/config.ts */
const LOCALES = [
  "en",
  "es",
  "pt-BR",
  "fr",
  "de",
  "it",
  "nl",
  "pl",
  "ru",
  "uk",
  "tr",
  "ar",
  "hi",
  "id",
  "vi",
  "th",
  "ms",
  "fil",
  "ja",
  "ko",
  "zh-CN",
  "zh-TW",
  "bn",
  "ta",
  "te",
  "mr",
  "gu",
  "kn",
  "ml",
  "pa",
  "ur",
  "fa",
  "he",
  "el",
  "cs",
  "sk",
  "hu",
  "ro",
  "bg",
  "hr",
  "sr",
  "sl",
  "sv",
  "da",
  "nb",
  "fi",
  "et",
  "lv",
  "lt",
  "sw",
];

/** Google Translate `to` code; forceTo used for all calls */
const GOOGLE_TO = {
  en: "en",
  es: "es",
  "pt-BR": "pt",
  fr: "fr",
  de: "de",
  it: "it",
  nl: "nl",
  pl: "pl",
  ru: "ru",
  uk: "uk",
  tr: "tr",
  ar: "ar",
  hi: "hi",
  id: "id",
  vi: "vi",
  th: "th",
  ms: "ms",
  fil: "tl",
  ja: "ja",
  ko: "ko",
  "zh-CN": "zh-CN",
  "zh-TW": "zh-TW",
  bn: "bn",
  ta: "ta",
  te: "te",
  mr: "mr",
  gu: "gu",
  kn: "kn",
  ml: "ml",
  pa: "pa",
  ur: "ur",
  fa: "fa",
  he: "he",
  el: "el",
  cs: "cs",
  sk: "sk",
  hu: "hu",
  ro: "ro",
  bg: "bg",
  hr: "hr",
  sr: "sr",
  sl: "sl",
  sv: "sv",
  da: "da",
  nb: "nb",
  fi: "fi",
  et: "et",
  lv: "lv",
  lt: "lt",
  sw: "sw",
};

const CHUNK_SIZE = Number(process.env.TRANSLATE_CHUNK_SIZE ?? 12);
const CHUNK_PAUSE_MS = Number(process.env.TRANSLATE_CHUNK_PAUSE_MS ?? 900);

/**
 * next-intl ICU placeholders must stay ASCII `{name}`. MT often rewrites them.
 * Mask per chunk line so indices are unambiguous after a multi-line translate.
 */
function maskLineIcu(/** @type {string} */ s, /** @type {number} */ lineId) {
  /** @type {string[]} */
  const order = [];
  const byName = new Map();
  const masked = s.replace(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g, (_, name) => {
    let idx = byName.get(name);
    if (idx === undefined) {
      idx = order.length;
      order.push(name);
      byName.set(name, idx);
    }
    return `⟦L${lineId}P${idx}⟧`;
  });
  return { masked, names: order };
}

/** @param {string} s @param {number} lineId @param {string[]} names */
function unmaskLineIcu(s, lineId, names) {
  return s.replace(/⟦L(\d+)P(\d+)⟧/g, (m, lid, pidx) => {
    if (Number(lid) !== lineId) return m;
    const name = names[Number(pidx)];
    return name !== undefined ? `{${name}}` : m;
  });
}

/** single-translate endpoint is slower but more reliable for CJK / rate limits */
async function gt(/** @type {string} */ text, /** @type {string} */ googleTo) {
  let lastErr;
  for (let attempt = 0; attempt < 6; attempt++) {
    try {
      return await translate(text, {
        from: "en",
        to: googleTo,
        forceTo: true,
        forceBatch: false,
      });
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
    }
  }
  throw lastErr;
}

function parseArgs() {
  const only = process.argv.find((a) => a.startsWith("--locale="))?.slice(9);
  const dry = process.argv.includes("--dry-run");
  const provider =
    process.argv.find((a) => a.startsWith("--provider="))?.slice(11) ??
    process.env.TRANSLATE_PROVIDER ??
    "google";
  return { only, dry, provider };
}

/** @param {unknown} obj @param {string[]} acc */
function collectStrings(obj, acc) {
  if (typeof obj === "string") {
    acc.push(obj);
  } else if (Array.isArray(obj)) {
    for (const x of obj) collectStrings(x, acc);
  } else if (obj !== null && typeof obj === "object") {
    for (const k of Object.keys(/** @type {object} */ (obj))) {
      collectStrings(/** @type {Record<string, unknown>} */ (obj)[k], acc);
    }
  }
}

/** @param {unknown} obj @param {Iterator<string>} iter */
function applyStrings(obj, iter) {
  if (typeof obj === "string") {
    const n = iter.next();
    return n.value ?? obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((x) => applyStrings(x, iter));
  }
  if (obj !== null && typeof obj === "object") {
    /** @type {Record<string, unknown>} */
    const out = {};
    for (const k of Object.keys(obj)) {
      out[k] = applyStrings(/** @type {Record<string, unknown>} */ (obj)[k], iter);
    }
    return out;
  }
  return obj;
}

/** @param {string} translatedBlob */
function parseMarkedChunk(translatedBlob, /** @type {number} */ offset, len) {
  /** @type {string[]} */
  const out = [];
  const lines = translatedBlob.split(/\r?\n/).filter((l) => l.length > 0);
  /** @type {Map<number,string>} */
  const map = new Map();
  for (const line of lines) {
    const m = /^§§(\d+)§§(.*)$/.exec(line);
    if (!m) continue;
    map.set(Number(m[1]), m[2]);
  }
  for (let i = 0; i < len; i++) {
    const v = map.get(i);
    if (v === undefined) {
      throw new Error(`Missing segment ${i} in translated chunk`);
    }
    out.push(v);
  }
  return out;
}

/**
 * @param {string[]} slice
 * @param {string} googleTo
 */
async function translateChunkGoogle(slice, googleTo) {
  const safe = (s) =>
    s
      .replace(/\n+/g, " ")
      .replace(/§/g, "")
      .trimEnd();
  const maskedRows = slice.map((s, lineId) => {
    const base = safe(s);
    return { lineId, ...maskLineIcu(base, lineId) };
  });
  const blob = maskedRows.map((row, i) => `§§${i}§§${row.masked}`).join("\n");
  const { text } = await gt(blob, googleTo);
  try {
    const parts = parseMarkedChunk(text, 0, slice.length);
    return parts.map((part, i) =>
      unmaskLineIcu(part, maskedRows[i].lineId, maskedRows[i].names),
    );
  } catch {
    /** Chunk MT occasionally drops markers; translate line-by-line. */
    /** @type {string[]} */
    const out = [];
    for (let i = 0; i < slice.length; i++) {
      const row = maskedRows[i];
      const { text: one } = await gt(row.masked, googleTo);
      out.push(unmaskLineIcu(one, row.lineId, row.names));
      await new Promise((r) => setTimeout(r, 400));
    }
    return out;
  }
}

async function translateWithGoogle(/** @type {string} */ locale, /** @type {object} */ english) {
  const googleTo = GOOGLE_TO[/** @type {keyof typeof GOOGLE_TO} */ (locale)];
  if (!googleTo) {
    throw new Error(`No Google target mapping for ${locale}`);
  }

  const flat = [];
  collectStrings(english, flat);
  /** @type {string[]} */
  const translated = [];

  for (let i = 0; i < flat.length; i += CHUNK_SIZE) {
    const slice = flat.slice(i, i + CHUNK_SIZE);
    const part = await translateChunkGoogle(slice, googleTo);
    translated.push(...part);
    if (i + CHUNK_SIZE < flat.length) {
      await new Promise((r) => setTimeout(r, CHUNK_PAUSE_MS));
    }
  }

  if (translated.length !== flat.length) {
    throw new Error(
      `Length mismatch: expected ${flat.length} strings, got ${translated.length}`,
    );
  }

  const iter = translated.values();
  return applyStrings(english, iter);
}

function stripJsonFence(text) {
  let s = text.trim();
  if (s.startsWith("```")) {
    s = s.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/u, "");
  }
  return s.trim();
}

/** @param {unknown} a @param {unknown} b */
function sameStructure(a, b) {
  if (a === null || b === null) return a === b;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!sameStructure(a[i], b[i])) return false;
    }
    return true;
  }
  if (typeof a === "object") {
    const ak = Object.keys(/** @type {object} */ (a)).sort();
    const bk = Object.keys(/** @type {object} */ (b)).sort();
    if (ak.length !== bk.length || ak.some((k, i) => k !== bk[i])) return false;
    for (const k of ak) {
      if (
        !sameStructure(
          /** @type {Record<string, unknown>} */ (a)[k],
          /** @type {Record<string, unknown>} */ (b)[k],
        )
      )
        return false;
    }
    return true;
  }
  return typeof a === typeof b;
}

async function translateWithOpenAI(/** @type {string} */ locale, /** @type {object} */ english) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY required for --provider=openai");
  }

  const base =
    process.env.OPENAI_BASE_URL?.replace(/\/$/, "") ??
    "https://api.openai.com/v1";
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  const userPrompt = `You are a professional translator for a SaaS that sells verifiable onward-flight reservations for visa applications and digital nomads.

Target locale: ${locale} (BCP 47). Match how native speakers expect travel/visa/booking sites to read in that market—clear, trustworthy, not overly casual.

Rules:
- Return ONLY valid JSON. No markdown code fences. No commentary before or after.
- The output MUST have the exact same keys, nesting, array lengths, and value types as the input. Only string values change.
- Preserve unchanged in the output text where they appear: TempTicket, PNR, BKK, NRT, ABC*12X, Stripe, Duffel, Neon, Resend, Schengen
- Preserve placeholders exactly: {price}, {step}, {index}, {status}
- Preserve emoji flag characters exactly (e.g. sample testimonials).
- For legal-style blocks (Terms/Privacy), stay faithful and formal.

Input JSON:
${JSON.stringify(english)}`;

  const res = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.25,
      messages: [
        {
          role: "system",
          content:
            "You translate JSON for a website strings catalog. Output only valid JSON matching the input shape.",
        },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI API ${res.status}: ${errText.slice(0, 500)}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    throw new Error("Unexpected API response shape");
  }

  let parsed;
  try {
    parsed = JSON.parse(stripJsonFence(content));
  } catch (e) {
    throw new Error(
      `Model did not return valid JSON for ${locale}: ${/** @type {Error} */ (e).message}\n---\n${String(content).slice(0, 800)}`,
    );
  }

  if (!sameStructure(english, parsed)) {
    throw new Error(
      `Translated JSON structure mismatch for ${locale}. Refusing to write file.`,
    );
  }

  return parsed;
}

const messagesDir = join(root, "messages");
const enPath = join(messagesDir, "en.json");

async function main() {
  const { only, dry, provider } = parseArgs();
  if (!existsSync(enPath)) {
    throw new Error(`Missing ${enPath}`);
  }

  const english = JSON.parse(readFileSync(enPath, "utf8"));
  mkdirSync(messagesDir, { recursive: true });

  const targets = LOCALES.filter((l) => l !== "en").filter(
    (l) => !only || l === only,
  );

  if (dry) {
    console.log(
      `[dry-run] provider=${provider} locales (${targets.length}): ${targets.join(", ")}`,
    );
    return;
  }

  console.log(
    `Translating ${targets.length} locale(s) with provider=${provider} (chunk=${CHUNK_SIZE}, pause=${CHUNK_PAUSE_MS}ms)…`,
  );

  for (const locale of targets) {
    process.stdout.write(`  ${locale}… `);
    try {
      let out;
      if (provider === "openai") {
        out = await translateWithOpenAI(locale, english);
      } else {
        out = await translateWithGoogle(locale, english);
      }
      writeFileSync(
        join(messagesDir, `${locale}.json`),
        `${JSON.stringify(out, null, 2)}\n`,
        "utf8",
      );
      console.log("ok");
    } catch (e) {
      console.log("FAILED");
      console.error(/** @type {Error} */ (e).message);
      process.exitCode = 1;
      break;
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
