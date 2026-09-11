#!/usr/bin/env node
// @ts-check
/**
 * Phase B: data/branshes/manifest.json -> lib/products.ts の products 配列を差し替え
 *
 * 実行: node scripts/build-products.mjs --manifest data/branshes/manifest.json
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DEFAULT_MANIFEST = join(ROOT, "data", "branshes", "manifest.json");
const OUTPUT_PATH = join(ROOT, "lib", "products.ts");
const PUBLIC_DIR = join(ROOT, "public");

const GIRL_KEYWORDS = ["女児", "ガール", "ワンピ", "スカート", "リボン", "フリル", "女の子"];
const BOY_KEYWORDS = ["男児", "ボーイ", "男の子"];

/** @param {string} manifestPath */
function loadManifest(manifestPath) {
  if (!existsSync(manifestPath)) {
    console.error(`manifest not found: ${manifestPath}`);
    process.exit(1);
  }
  return JSON.parse(readFileSync(manifestPath, "utf8"));
}

/** @param {string} name @param {string} categoryHref */
function inferGender(name, categoryHref) {
  if (categoryHref === "/category/baby") return "baby";
  const isGirl = GIRL_KEYWORDS.some((kw) => name.includes(kw));
  const isBoy = BOY_KEYWORDS.some((kw) => name.includes(kw));
  if (isGirl && !isBoy) return "girl";
  if (isBoy && !isGirl) return "boy";
  return "boy";
}

/** @param {string} sizeLabel */
function buildSizes(sizeLabel, categoryHref) {
  const label = String(sizeLabel ?? "").trim();
  if (/cm$/i.test(label)) {
    return [{ label: label.replace(/cm$/i, ""), inStock: true }];
  }
  if (categoryHref === "/category/shoes") {
    return ["14", "15", "16", "17"].map((s) => ({ label: s, inStock: true }));
  }
  if (categoryHref === "/category/baby") {
    return ["60", "70", "80"].map((s) => ({ label: s, inStock: true }));
  }
  if (categoryHref === "/category/accessories" || categoryHref === "/category/bags") {
    return [{ label: "FREE", inStock: true }];
  }
  return ["90", "100", "110", "120"].map((s) => ({ label: s, inStock: true }));
}

/** @param {object} product */
function toTsProduct(product, index) {
  const name = String(product.name ?? product.id);
  const categoryHref = product.categoryHref ?? `/category/${product.categorySlug ?? "tops"}`;
  const gender = inferGender(name, categoryHref);
  const color = product.color ? [product.color] : ["マルチ"];
  const images = (product.images ?? []).filter((p) =>
    existsSync(join(PUBLIC_DIR, p.replace(/^\//, ""))),
  );
  if (images.length === 0) {
    console.warn(`warn: no local images for ${product.id}`);
  }

  return {
    id: String(product.id),
    slug: String(product.slug ?? product.id),
    brand: product.brand || "branshes",
    name,
    price: Number(product.price) || 0,
    salePrice: product.isSale ? Number(product.price) || undefined : undefined,
    images,
    gender,
    category: categoryHref,
    colors: color,
    sizes: buildSizes(product.size, categoryHref),
    description: `${name}。ブランシェス公式サイトより取得した商品データです。`,
    material: "詳細は商品ページをご確認ください。",
    care: "洗濯表示に従ってください。",
    rating: 4.5,
    reviewCount: 0,
    isNew: index < 4,
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
  ];
  if (product.salePrice) {
    lines.push(`    salePrice: ${product.salePrice},`);
  }
  lines.push(`    images: ${JSON.stringify(product.images)},`);
  lines.push(`    gender: ${tsString(product.gender)},`);
  lines.push(`    category: ${tsString(product.category)},`);
  lines.push(`    colors: ${JSON.stringify(product.colors)},`);
  lines.push(`    sizes: ${JSON.stringify(product.sizes)},`);
  lines.push(`    description: ${tsString(product.description)},`);
  lines.push(`    material: ${tsString(product.material)},`);
  lines.push(`    care: ${tsString(product.care)},`);
  lines.push(`    rating: ${product.rating},`);
  lines.push(`    reviewCount: ${product.reviewCount},`);
  if (product.isNew) lines.push("    isNew: true,");
  if (product.rank) lines.push(`    rank: ${product.rank},`);
  lines.push("  },");
  return lines.join("\n");
}

function main() {
  const flagIndex = process.argv.indexOf("--manifest");
  const manifestPath =
    flagIndex >= 0 && process.argv[flagIndex + 1]
      ? resolve(ROOT, process.argv[flagIndex + 1])
      : DEFAULT_MANIFEST;

  const manifest = loadManifest(manifestPath);
  const products = (manifest.products ?? []).map(toTsProduct);
  const productsBlock = products.map(renderProduct).join("\n");

  const source = readFileSync(OUTPUT_PATH, "utf8");
  const startMarker = "export const products: Product[] = [";
  const endMarker = "\n];\n\nexport function getRanking";
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker);
  if (start < 0 || end < 0) {
    console.error("lib/products.ts の products 配列を見つけられません");
    process.exit(1);
  }

  const next =
    source.slice(0, start + startMarker.length) +
    "\n" +
    productsBlock +
    source.slice(end);

  writeFileSync(OUTPUT_PATH, next, "utf8");
  console.log(`updated ${products.length} products in lib/products.ts`);
}

main();
