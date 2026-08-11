export type Gender = "boy" | "girl" | "baby";

export type SizeOption = {
  label: string;
  inStock: boolean;
};

export type Product = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  price: number;
  salePrice?: number;
  images: string[];
  gender: Gender;
  category: string; // lib/categories.ts の href と一致
  colors: string[];
  sizes: SizeOption[];
  description: string;
  material: string;
  care: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  rank?: number;
};

const img = (slug: string) =>
  [`/images/products/${slug}/01.jpg`, `/images/products/${slug}/01.jpg`] as string[];

const kidsSizes = (outOfStock?: string): SizeOption[] =>
  ["90", "100", "110", "120"].map((label) => ({ label, inStock: label !== outOfStock }));

const babySizes = (outOfStock?: string): SizeOption[] =>
  ["60", "70", "80"].map((label) => ({ label, inStock: label !== outOfStock }));

const shoeSizes = (outOfStock?: string): SizeOption[] =>
  ["14", "15", "16", "17"].map((label) => ({ label, inStock: label !== outOfStock }));

const freeSize: SizeOption[] = [{ label: "FREE", inStock: true }];

export const products: Product[] = [
  {
    id: "p01",
    slug: "basic-crew-tshirt",
    brand: "Petit Marché",
    name: "ベーシッククルーネックTシャツ",
    price: 2200,
    images: img("basic-crew-tshirt"),
    gender: "boy",
    category: "/category/tops",
    colors: ["ホワイト", "ネイビー", "イエロー"],
    sizes: kidsSizes("120"),
    description:
      "毎日着たくなる、肌ざわりのやさしいベーシックなクルーネックTシャツ。シンプルなデザインだからコーディネートしやすく、単品でもレイヤードでも活躍します。",
    material: "綿100%（オーガニックコットン使用）",
    care: "洗濯機で洗えます（ネット使用推奨）。乾燥機のご使用はお控えください。",
    rating: 4.6,
    reviewCount: 32,
    isNew: true,
    rank: 1,
  },
  {
    id: "p02",
    slug: "border-tshirt",
    brand: "Little Step",
    name: "ボーダー半袖Tシャツ",
    price: 1980,
    salePrice: 1490,
    images: img("border-tshirt"),
    gender: "boy",
    category: "/category/tops",
    colors: ["ネイビー×ホワイト", "レッド×ホワイト"],
    sizes: kidsSizes(),
    description: "定番のボーダー柄Tシャツ。伸縮性のある生地で元気に動き回るお子さまにもぴったりです。",
    material: "綿95% ポリウレタン5%",
    care: "洗濯機で洗えます。タンブラー乾燥不可。",
    rating: 4.4,
    reviewCount: 18,
    rank: 2,
  },
  {
    id: "p03",
    slug: "canvas-sneaker",
    brand: "Little Step",
    name: "キャンバスローカットスニーカー",
    price: 3960,
    images: img("canvas-sneaker"),
    gender: "boy",
    category: "/category/shoes",
    colors: ["ホワイト", "ネイビー"],
    sizes: shoeSizes("14"),
    description: "軽量なキャンバス素材のローカットスニーカー。マジックテープ式で着脱も簡単です。",
    material: "アッパー：綿、ソール：合成ゴム",
    care: "汚れた場合は乾いた布で拭き取ってください。水洗いは避けてください。",
    rating: 4.5,
    reviewCount: 24,
    rank: 3,
  },
  {
    id: "p04",
    slug: "school-backpack-navy",
    brand: "Nuage Kids",
    name: "通園・通学リュック（ネイビー）",
    price: 5500,
    images: img("school-backpack-navy"),
    gender: "boy",
    category: "/category/bags",
    colors: ["ネイビー"],
    sizes: freeSize,
    description: "軽くて丈夫な通園・通学リュック。反射材つきで夜道でも安心です。",
    material: "本体：ポリエステル100%",
    care: "固く絞った布で拭き取ってください。洗濯機のご使用はできません。",
    rating: 4.7,
    reviewCount: 41,
    isNew: true,
    rank: 4,
  },
  {
    id: "p05",
    slug: "flower-onepiece",
    brand: "Ronde Fleur",
    name: "フラワープリントワンピース",
    price: 4400,
    salePrice: 3300,
    images: img("flower-onepiece"),
    gender: "girl",
    category: "/category/onepiece",
    colors: ["ピンク", "イエロー"],
    sizes: kidsSizes(),
    description: "春夏にぴったりの花柄ワンピース。ふんわりとしたシルエットで女の子らしい着こなしに。",
    material: "ポリエステル100%（裏地：綿100%）",
    care: "洗濯機で洗えます（弱水流推奨）。",
    rating: 4.8,
    reviewCount: 56,
    rank: 1,
  },
  {
    id: "p06",
    slug: "frill-onepiece",
    brand: "Ronde Fleur",
    name: "フリル袖ワンピース",
    price: 4950,
    images: img("frill-onepiece"),
    gender: "girl",
    category: "/category/onepiece",
    colors: ["ホワイト", "ピンク"],
    sizes: kidsSizes("90"),
    description: "袖のフリルがアクセントになった上品なワンピース。お出かけや発表会にもおすすめです。",
    material: "綿80% ポリエステル20%",
    care: "洗濯機で洗えます（ネット使用推奨）。",
    rating: 4.5,
    reviewCount: 21,
    isNew: true,
    rank: 2,
  },
  {
    id: "p07",
    slug: "ribbon-sneaker",
    brand: "Little Step",
    name: "リボン付きスニーカー",
    price: 4180,
    images: img("ribbon-sneaker"),
    gender: "girl",
    category: "/category/shoes",
    colors: ["ホワイト×ピンク"],
    sizes: shoeSizes(),
    description: "リボンのワンポイントが可愛いスニーカー。マジックテープで着脱も簡単です。",
    material: "アッパー：合成皮革、ソール：合成ゴム",
    care: "汚れた場合は乾いた布で拭き取ってください。",
    rating: 4.6,
    reviewCount: 19,
    rank: 3,
  },
  {
    id: "p08",
    slug: "school-backpack-pink",
    brand: "Nuage Kids",
    name: "通園・通学リュック（ピンク）",
    price: 5500,
    images: img("school-backpack-pink"),
    gender: "girl",
    category: "/category/bags",
    colors: ["ピンク"],
    sizes: freeSize,
    description: "軽くて丈夫な通園・通学リュック。反射材つきで夜道でも安心です。",
    material: "本体：ポリエステル100%",
    care: "固く絞った布で拭き取ってください。洗濯機のご使用はできません。",
    rating: 4.7,
    reviewCount: 33,
    rank: 4,
  },
  {
    id: "p09",
    slug: "soft-pajama-set",
    brand: "Nuage Kids",
    name: "パイル素材パジャマ上下セット",
    price: 3300,
    images: img("soft-pajama-set"),
    gender: "baby",
    category: "/category/innerwear",
    colors: ["ブルー", "ピンク"],
    sizes: babySizes(),
    description: "肌にやさしいパイル素材のパジャマ上下セット。吸水性が良く汗をかきやすい時期にも安心です。",
    material: "綿100%（パイル編み）",
    care: "洗濯機で洗えます。乾燥機のご使用はお控えください。",
    rating: 4.7,
    reviewCount: 29,
    isNew: true,
    rank: 1,
  },
  {
    id: "p10",
    slug: "cotton-rompers",
    brand: "Petit Marché",
    name: "コットンロンパース",
    price: 2970,
    images: img("cotton-rompers"),
    gender: "baby",
    category: "/category/baby",
    colors: ["ホワイト", "ミント"],
    sizes: babySizes("60"),
    description: "オーガニックコットンを使用したやさしい肌ざわりのロンパース。スナップボタンでお着替えも簡単です。",
    material: "綿100%（オーガニックコットン使用）",
    care: "洗濯機で洗えます（ネット使用推奨）。",
    rating: 4.8,
    reviewCount: 47,
    rank: 2,
  },
  {
    id: "p11",
    slug: "star-print-rompers",
    brand: "Petit Marché",
    name: "スタープリントロンパース",
    price: 3080,
    salePrice: 2470,
    images: img("star-print-rompers"),
    gender: "baby",
    category: "/category/baby",
    colors: ["ネイビー"],
    sizes: babySizes(),
    description: "スタープリントが可愛いロンパース。コットン素材で通気性も良く、季節を問わずお使いいただけます。",
    material: "綿100%",
    care: "洗濯機で洗えます（ネット使用推奨）。",
    rating: 4.5,
    reviewCount: 15,
    rank: 3,
  },
  {
    id: "p12",
    slug: "baby-pajama-set",
    brand: "Nuage Kids",
    name: "ベビーパジャマ（足つき）",
    price: 2860,
    images: img("baby-pajama-set"),
    gender: "baby",
    category: "/category/innerwear",
    colors: ["イエロー"],
    sizes: babySizes(),
    description: "足つきタイプで寝冷え防止に。伸縮性のある生地で寝返りが増える時期でも動きやすい設計です。",
    material: "綿95% ポリウレタン5%",
    care: "洗濯機で洗えます。乾燥機のご使用はお控えください。",
    rating: 4.6,
    reviewCount: 12,
    rank: 4,
  },
];

export function getRanking(gender: Gender, limit = 4): Product[] {
  return products
    .filter((product) => product.gender === gender)
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
    .slice(0, limit);
}

export function getNewArrivals(limit = 8): Product[] {
  return products.filter((product) => product.isNew).slice(0, limit);
}

export function getRecommended(limit = 8): Product[] {
  return [...products].reverse().slice(0, limit);
}

export function getProductsByCategory(categoryHref: string): Product[] {
  return products.filter((product) => product.category === categoryHref);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((candidate) => candidate.brand === product.brand && candidate.id !== product.id)
    .slice(0, limit);
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter((product) => product.brand === brand);
}

export function getProductsByGender(gender: Gender): Product[] {
  return products.filter((product) => product.gender === gender);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(q) || product.brand.toLowerCase().includes(q),
  );
}
