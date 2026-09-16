// @ts-check
/** @typedef {"boy" | "girl" | "baby"} Gender */

const GIRL_KEYWORDS = [
  "女児",
  "ガール",
  "女の子",
  "ワンピ",
  "スカート",
  "リボン",
  "フリル",
  "チュール",
  "キャミ",
  "タンク",
  "カチューシャ",
  "ヘアピン",
  "タイツ",
  "レギンス",
  "ブルマ",
  "ジャンパースカート",
  "プリンセス",
  "花柄",
  "花モチーフ",
  "さくらんぼ",
  "ハート",
  "フラワー",
  "うさぎ",
  "パール",
];

const BOY_KEYWORDS = [
  "男児",
  "ボーイ",
  "男の子",
  "ボクサーパンツ",
  "はたらく車",
  "車柄",
  "ボウリング",
  "ヤミー",
];

/**
 * @param {object} product
 * @returns {Gender}
 */
export function resolveGender(product) {
  const fromSource = String(product.gender ?? "").toLowerCase();
  if (fromSource === "boy" || fromSource === "girl" || fromSource === "baby") {
    return /** @type {Gender} */ (fromSource);
  }

  const name = String(product.name ?? "");
  const categoryHref =
    product.categoryHref ?? `/category/${product.categorySlug ?? "tops"}`;

  if (categoryHref === "/category/baby") {
    return "baby";
  }

  const isGirl = GIRL_KEYWORDS.some((kw) => name.includes(kw));
  const isBoy = BOY_KEYWORDS.some((kw) => name.includes(kw));
  if (isGirl && !isBoy) return "girl";
  if (isBoy && !isGirl) return "boy";

  if (categoryHref === "/category/onepiece") return "girl";
  if (categoryHref === "/category/innerwear" && /ショーツ|キャミ|タンク/.test(name)) {
    return "girl";
  }

  return "boy";
}
