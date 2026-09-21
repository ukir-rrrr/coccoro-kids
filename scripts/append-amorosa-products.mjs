#!/usr/bin/env node
// @ts-check
/**
 * data/amorosa/manifest.json の商品を lib/products.ts に追加（既存は維持）
 * 実行: node scripts/append-amorosa-products.mjs
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveGender } from "./infer-gender.mjs";
import { resolveStorePrice } from "./product-pricing.mjs";
import { buildProductCopy } from "./product-copy.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const MANIFEST = join(ROOT, "data", "amorosa", "manifest.json");
const OUTPUT_PATH = join(ROOT, "lib", "products.ts");
const PUBLIC_DIR = join(ROOT, "public");
const CATEGORY = "/category/accessories";

function buildSizes(categoryHref) {
  if (categoryHref === "/category/accessories" || categoryHref === "/category/bags") {
    return [{ label: "FREE", inStock: true }];
  }
  return [{ label: "FREE", inStock: true }];
}

/** @param {object} product @param {number} index */
function toTsProduct(product, index) {
  const name = String(product.name ?? product.id);
  const categoryHref = CATEGORY;
  const gender = resolveGender({ ...product, gender: product.gender || "baby" });
  const variantLabel = String(product.size ?? "").trim();
  const colors =
    variantLabel && variantLabel !== "Default Title" && variantLabel !== "FREE"
      ? [variantLabel]
      : ["マルチ"];
  const images = (product.images ?? []).filter((p) =>
    existsSync(join(PUBLIC_DIR, p.replace(/^\//, ""))),
  );
  if (images.length === 0) {
    console.warn(`warn: no local images for ${product.slug}`);
  }

  const { price } = resolveStorePrice(product);
  const id = String(product.id);
  const copy = buildProductCopy({ id, name, category: categoryHref, gender });

  return {
    id,
    slug: String(product.slug ?? product.id),
    brand: product.brand || "amorosa-mamma",
    name,
    price,
    images,
    gender,
    category: categoryHref,
    colors,
    sizes: buildSizes(categoryHref),
    description: copy.description,
    material: copy.material,
    care: copy.care,
    rating: 4.5,
    reviewCount: 0,
    isNew: true,
    rank: product.rank ?? index + 1,
  };
}

/** @param {unknown} value */
function tsString(value) {
  return JSON.stringify(String(value));
}

/** @param {ReturnType<typeof toTsProduct>} product */
function renderProduct(product) {
  const lines = [
    "  {",
    `    id: ${tsString(product.id)},`,
    `    slug: ${tsString(product.slug)},`,
    `    brand: ${tsString(product.brand)},`,
    `    name: ${tsString(product.name)},`,
    `    price: ${product.price},`,
    `    images: ${JSON.stringify(product.images)},`,
    `    gender: ${tsString(product.gender)},`,
    `    category: ${tsString(product.category)},`,
    `    colors: ${JSON.stringify(product.colors)},`,
    `    sizes: ${JSON.stringify(product.sizes)},`,
    `    description: ${tsString(product.description)},`,
    `    material: ${tsString(product.material)},`,
    `    care: ${tsString(product.care)},`,
    `    rating: ${product.rating},`,
    `    reviewCount: ${product.reviewCount},`,
    "    isNew: true,",
    `    rank: ${product.rank},`,
    "  },",
  ];
  return lines.join("\n");
}

function existingSlugs(source) {
  const slugs = new Set();
  for (const m of source.matchAll(/slug: "([^"]+)"/g)) {
    slugs.add(m[1]);
  }
  return slugs;
}

function main() {
  const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
  const source = readFileSync(OUTPUT_PATH, "utf8");
  const slugs = existingSlugs(source);

  const incoming = (manifest.products ?? []).filter((p) => !slugs.has(String(p.slug)));
  if (incoming.length === 0) {
    console.log("追加する Amorosa 商品がありません（既に登録済み）");
    return;
  }

  const tsProducts = incoming.map((p, i) => toTsProduct(p, i));
  const block = tsProducts.map(renderProduct).join("\n");

  const endMarker = "\n];\n\nexport function getNewArrivals";
  const end = source.indexOf(endMarker);
  if (end < 0) {
    console.error("products 配列の終端が見つかりません");
    process.exit(1);
  }

  const next = `${source.slice(0, end)}\n${block}${source.slice(end)}`;
  writeFileSync(OUTPUT_PATH, next, "utf8");
  console.log(`added ${tsProducts.length} products to lib/products.ts (${CATEGORY})`);
}

main();
