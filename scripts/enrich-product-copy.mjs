#!/usr/bin/env node
// @ts-check
/**
 * lib/products.ts の description / material / care を一括更新
 * 実行: node scripts/enrich-product-copy.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildProductCopy } from "./product-copy.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PRODUCTS_PATH = join(__dirname, "..", "lib", "products.ts");

const source = readFileSync(PRODUCTS_PATH, "utf8");
const blockRe = /\{\s*\n\s*id: "([^"]+)",[\s\S]*?\n  \},/g;

let count = 0;
const next = source.replace(blockRe, (block) => {
  const id = block.match(/^\{\s*\n\s*id: "([^"]+)"/m)?.[1];
  const name = block.match(/\n\s*name: "([^"]+)"/)?.[1];
  const category = block.match(/\n\s*category: "([^"]+)"/)?.[1];
  const gender = block.match(/\n\s*gender: "([^"]+)"/)?.[1];
  if (!id || !name || !category) return block;

  const copy = buildProductCopy({ id, name, category, gender });
  count += 1;

  let updated = block;
  updated = updated.replace(
    /\n\s*description: "[^"]*",/,
    `\n    description: ${JSON.stringify(copy.description)},`,
  );
  updated = updated.replace(
    /\n\s*material: "[^"]*",/,
    `\n    material: ${JSON.stringify(copy.material)},`,
  );
  updated = updated.replace(
    /\n\s*care: "[^"]*",/,
    `\n    care: ${JSON.stringify(copy.care)},`,
  );
  return updated;
});

writeFileSync(PRODUCTS_PATH, next, "utf8");
console.log(`updated copy for ${count} products in lib/products.ts`);
