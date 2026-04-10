import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pngToIco from "png-to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pngPath = path.join(root, "public", "tempticket.png");
const outPath = path.join(root, "src", "app", "favicon.ico");

const buf = await pngToIco(pngPath);
fs.writeFileSync(outPath, buf);
console.log("Wrote", outPath);
