#!/usr/bin/env node
// @ts-check
/**
 * 複数 manifest.json を1つにマージする（カテゴリ別 Phase A の後処理）。
 *
 * 実行例:
 *   node scripts/merge-manifests.mjs --out data/branshes/manifest.json data/branshes/manifests/*.json
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

function parseArgs() {
  const args = process.argv.slice(2);
  const outIndex = args.indexOf("--out");
  const outPath =
    outIndex >= 0 && args[outIndex + 1]
      ? resolve(ROOT, args[outIndex + 1])
      : resolve(ROOT, "data/branshes/manifest.json");
  const inputs = args.filter((arg, i) => {
    if (arg === "--out") return false;
    if (outIndex >= 0 && i === outIndex + 1) return false;
    return true;
  });
  return { outPath, inputs: inputs.map((p) => resolve(ROOT, p)) };
}

function main() {
  const { outPath, inputs } = parseArgs();
  if (inputs.length === 0) {
    console.error(
      "Usage: node scripts/merge-manifests.mjs [--out path] manifest1.json manifest2.json ...",
    );
    process.exit(1);
  }

  /** @type {Map<string, object>} */
  const byId = new Map();
  /** @type {string[]} */
  const sources = [];

  for (const path of inputs) {
    if (!existsSync(path)) {
      console.error(`skip (not found): ${path}`);
      continue;
    }
    const json = JSON.parse(readFileSync(path, "utf8"));
    sources.push(path.replace(ROOT + "/", "").replace(ROOT + "\\", ""));
    for (const product of json.products ?? []) {
      if (!product?.id) continue;
      byId.set(product.id, product);
    }
  }

  const products = [...byId.values()].sort((a, b) => {
    const cat = String(a.categorySlug ?? "").localeCompare(String(b.categorySlug ?? ""));
    if (cat !== 0) return cat;
    const rankA = a.rank ?? 9999;
    const rankB = b.rank ?? 9999;
    if (rankA !== rankB) return rankA - rankB;
    return String(a.id).localeCompare(String(b.id));
  });

  const merged = {
    generatedAt: new Date().toISOString(),
    source: {
      site: "branshes.com",
      mergedFrom: sources,
    },
    products,
  };

  writeFileSync(outPath, JSON.stringify(merged, null, 2), "utf8");
  const rel = outPath.replace(ROOT + "/", "").replace(ROOT + "\\", "");
  console.log(`merged ${products.length} products -> ${rel}`);
}

main();
