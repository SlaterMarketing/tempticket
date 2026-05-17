import fs from "fs";
import { spawnSync } from "child_process";

const envPath = process.argv[2];
const dumpPath = process.argv[3];
if (!envPath || !dumpPath) {
  console.error(
    "Usage: node scripts/pg-restore-from-envfile.mjs <env-file> <backup.dump>",
  );
  process.exit(1);
}

function parseEnv(content) {
  /** @type {Record<string, string>} */
  const env = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq);
    let val = trimmed.slice(eq + 1);
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

const raw = fs.readFileSync(envPath, "utf8");
const env = parseEnv(raw);
const url = env.DATABASE_URL;
if (!url) throw new Error(`No DATABASE_URL in ${envPath}`);

const r = spawnSync(
  "pg_restore",
  ["--no-owner", "--no-acl", "-d", url, dumpPath],
  { stdio: "inherit" },
);
process.exit(r.status ?? 1);
