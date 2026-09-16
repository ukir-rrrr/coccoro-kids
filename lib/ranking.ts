import { products, type Gender, type Product } from "@/lib/products";

/** 小さいほどランキング上位向き */
const CATEGORY_BIAS: Record<string, number> = {
  "/category/tops": 0,
  "/category/bottoms": 5,
  "/category/outer": 10,
  "/category/onepiece": 8,
  "/category/shoes": 25,
  "/category/baby": 15,
  "/category/innerwear": 40,
  "/category/accessories": 70,
  "/category/bags": 80,
  "/category/goods": 85,
};

const SMALL_GOODS_RE =
  /ソックス|靴下|ハイソックス|タイツ|レギンス|ストッキング|バッグ|リュック|プール|巾着|ナップサック|トート|ブランケット|タオル|キーチェーン|ヘアピン|氷のう|ビブ|ハンカチ/;

const UNDERWEAR_RE = /ショーツ|ボクサーパンツ|ブルマ|タンクトップ|キャミソール|パンツ/;

function normalizeRankingName(name: string): string {
  return name.replace(/\s+/g, " ").trim();
}

/** 数値が小さいほど「売れ筋っぽい」メインアイテム */
function rankingSortKey(product: Product): number {
  let key = (product.rank ?? 50) * 2;
  key += CATEGORY_BIAS[product.category] ?? 50;
  if (SMALL_GOODS_RE.test(product.name)) {
    key += 100;
  }
  return key;
}

export function getRanking(gender: Gender, limit = 4): Product[] {
  const sorted = products
    .filter((product) => product.gender === gender)
    .sort((a, b) => {
      const diff = rankingSortKey(a) - rankingSortKey(b);
      if (diff !== 0) return diff;
      return a.id.localeCompare(b.id);
    });

  const seenNames = new Set<string>();
  const picked: Product[] = [];

  for (const product of sorted) {
    const nameKey = normalizeRankingName(product.name);
    if (seenNames.has(nameKey)) continue;
    seenNames.add(nameKey);
    picked.push(product);
    if (picked.length >= limit) break;
  }

  return picked;
}

function recommendSortKey(product: Product): number {
  let key = rankingSortKey(product);
  if (product.category === "/category/innerwear") {
    key += 120;
    if (UNDERWEAR_RE.test(product.name)) {
      key += 80;
    }
  }
  return key;
}

/** トップス・ワンピなどを中心に、カテゴリと柄が偏らないおすすめ */
export function getRecommended(limit = 8): Product[] {
  const sorted = [...products].sort((a, b) => {
    const diff = recommendSortKey(a) - recommendSortKey(b);
    if (diff !== 0) return diff;
    return a.id.localeCompare(b.id);
  });

  const seenNames = new Set<string>();
  const categoryCounts = new Map<string, number>();
  let innerwearCount = 0;
  const picked: Product[] = [];

  for (const product of sorted) {
    const nameKey = normalizeRankingName(product.name);
    if (seenNames.has(nameKey)) continue;

    if (product.category === "/category/innerwear") {
      if (innerwearCount >= 1) continue;
      innerwearCount += 1;
    }

    const catCount = categoryCounts.get(product.category) ?? 0;
    if (catCount >= 1) continue;

    seenNames.add(nameKey);
    categoryCounts.set(product.category, catCount + 1);
    picked.push(product);
    if (picked.length >= limit) break;
  }

  if (picked.length < limit) {
    for (const product of sorted) {
      if (picked.some((p) => p.id === product.id)) continue;
      const nameKey = normalizeRankingName(product.name);
      if (seenNames.has(nameKey)) continue;
      seenNames.add(nameKey);
      picked.push(product);
      if (picked.length >= limit) break;
    }
  }

  return picked;
}
