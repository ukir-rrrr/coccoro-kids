import { getProductBySlug, products, type Gender, type Product } from "@/lib/products";

export type FeatureProductQuery = {
  categories?: string[];
  genders?: Gender[];
  /** 商品名に含まれる語のいずれか（正規表現） */
  namePattern?: string;
  limit?: number;
};

export type Feature = {
  slug: string;
  title: string;
  description: string;
  image: string;
  body: string[];
  productQuery: FeatureProductQuery;
  /** 一覧の先頭に固定したい商品 slug */
  highlightSlugs?: string[];
};

export const features: Feature[] = [
  {
    slug: "brand-special",
    title: "秋先のレイヤード＆アウター特集",
    description: "気温差のある季節に活躍する長袖と羽織りをセレクト",
    image: "/images/features/autumn-layer-outer.jpg",
    body: [
      "朝晩はひんやり、昼間はまだ暑い——秋は重ね着が活きる季節です。長袖Tシャツにライトアウターを一枚足すだけで、体温調節もしやすくなります。",
      "MIMORAでは、ジャケットやパーカー、袖の切り替えデザインのトップスなど、レイヤードしやすいアイテムをラインナップ。通園・通学から週末のお出かけまで、これからの季節の定番をまとめてご紹介します。",
    ],
    productQuery: {
      categories: ["/category/outer", "/category/tops"],
      namePattern: "長袖|ジャケット|パーカ|アウター|切替|トレーナ|ブルゾン|羽織",
      limit: 12,
    },
    highlightSlugs: ["4580802483486", "4580802554636", "4580802508622"],
  },
  {
    slug: "seasonal-function",
    title: "チェック＆デニムの秋コーデ",
    description: "これからの季節に使える定番柄とボトムス",
    image: "/images/features/autumn-check-denim.jpg",
    body: [
      "チェック柄のワンピースや、デニムのボトムスは、秋のコーディネートの軸になりやすい定番です。トップスを替えるだけで印象が変わるので、ママの買い足しにもおすすめ。",
      "男の子向けのテーパードデニムから、女の子向けのギンガムワンピまで、実際に取り扱いのあるアイテムからピックアップしました。サイズ展開も商品ページでご確認ください。",
    ],
    productQuery: {
      categories: ["/category/bottoms", "/category/onepiece", "/category/tops"],
      namePattern: "デニム|チェック|チュール|ワンピ|パンツ|スカート",
      limit: 12,
    },
    highlightSlugs: ["4580802474125", "2011000496845", "4580802543555"],
  },
  {
    slug: "baby-gift",
    title: "贈って喜ばれるベビーギフト特集",
    description: "出産祝いに選ばれやすいベビーウェアと小物",
    image: "/images/features/baby-gift.jpg",
    body: [
      "出産祝いは、肌にやさしく日常使いできるものを選びたいもの。ロンパースやジャンパースカート、ボディースーツなど、ベビーの肌に配慮したアイテムを中心にセレクトしました。",
      "性別を問わず使いやすいデザインから、はっきりしたモチーフ付きまで幅広くご用意しています。ギフト包装のご相談もお問い合わせから承ります。",
    ],
    productQuery: {
      categories: ["/category/baby"],
      genders: ["baby"],
      limit: 12,
    },
    highlightSlugs: ["4580802449260", "4580802433511", "2004000039228"],
  },
  {
    slug: "coordinate-recommend",
    title: "男の子・女の子・ベビーの秋コーデ",
    description: "BOY / GIRL / BABY それぞれのおすすめアイテム",
    image: "/images/features/autumn-kids-coordinate.jpg",
    body: [
      "「今日、何を着せるか迷わない」をコンセプトに、性別・年代別のおすすめをまとめました。トップスとボトムス、ワンピースなど、単品でも合わせやすいアイテムを中心にピックアップしています。",
      "気に入ったアイテムから取り入れてみてください。コーディネートの組み合わせ例はスタイリングページでもご覧いただけます。",
    ],
    productQuery: {
      categories: ["/category/tops", "/category/bottoms", "/category/onepiece"],
      limit: 12,
    },
    highlightSlugs: ["4580802416354", "4580802493928", "4580802449222"],
  },
];

function dedupeByName(list: Product[]): Product[] {
  const seen = new Set<string>();
  const out: Product[] = [];
  for (const product of list) {
    const key = product.name.trim();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(product);
  }
  return out;
}

export function getFeatureProducts(feature: Feature): Product[] {
  const limit = feature.productQuery.limit ?? 12;
  const nameRe = feature.productQuery.namePattern
    ? new RegExp(feature.productQuery.namePattern)
    : null;

  const highlights = (feature.highlightSlugs ?? [])
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is Product => product !== undefined);

  const highlightIds = new Set(highlights.map((product) => product.id));

  const candidates = products
    .filter((product) => {
      if (highlightIds.has(product.id)) return false;
      const { categories, genders } = feature.productQuery;
      if (categories?.length && !categories.includes(product.category)) return false;
      if (genders?.length && !genders.includes(product.gender)) return false;
      if (nameRe && !nameRe.test(product.name)) return false;
      return true;
    })
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));

  const merged = dedupeByName([...highlights, ...candidates]);
  return merged.slice(0, limit);
}
