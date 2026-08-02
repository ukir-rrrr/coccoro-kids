export type Feature = {
  slug: string;
  title: string;
  description: string;
  image: string;
  body: string[];
  relatedProductSlugs: string[];
};

// DESIGN.txt「追加ページ(G2-2) > 特集」の4テーマに対応
export const features: Feature[] = [
  {
    slug: "brand-special",
    title: "今、選ばれる人気ブランド特集",
    description: "coccoro kidsが厳選するブランドの魅力をまとめて紹介",
    image: "/images/common/about.jpg",
    body: [
      "coccoro kidsでは、子供服・ベビー用品を専門に手がける実力派ブランドを厳選して取り扱っています。デザイン性はもちろん、素材の心地よさや縫製の丁寧さまで、実際にスタッフが着用・検品したうえでラインナップに加えています。",
      "オーガニックコットンを使ったベーシックウェアが人気の「Petit Marché」、女の子らしい甘さが魅力の「Ronde Fleur」、元気に歩き回る子供のためのシューズ＆バッグを展開する「Little Step」など、それぞれに得意分野があります。",
      "今回はその中から、特に反響の大きかったアイテムをピックアップしてご紹介します。",
    ],
    relatedProductSlugs: ["basic-crew-tshirt", "flower-onepiece", "canvas-sneaker"],
  },
  {
    slug: "seasonal-function",
    title: "夏を快適に過ごす機能性アイテム特集",
    description: "接触冷感・UVカットなど季節に合わせた機能素材アイテム",
    image: "/images/products/tshirt/01.jpg",
    body: [
      "気温が高くなるこれからの季節、子供たちが快適に過ごせるかどうかは服選びで大きく変わります。汗をかいてもべたつきにくい素材や、通気性の良いつくりのアイテムを選ぶのがポイントです。",
      "今回は、暑い季節でも動きやすく、洗濯にも強い機能性アイテムをセレクトしました。公園遊びやお出かけなど、アクティブな毎日にぴったりの一枚を見つけてください。",
    ],
    relatedProductSlugs: ["border-tshirt", "canvas-sneaker", "ribbon-sneaker"],
  },
  {
    slug: "baby-gift",
    title: "贈って喜ばれる出産祝いギフト特集",
    description: "予算・性別別に選べるベビーギフトセットのご紹介",
    image: "/images/products/rompers/01.jpg",
    body: [
      "出産祝いは、贈る相手のセンスに寄り添いながらも実用的なアイテムを選びたいもの。coccoro kidsでは、肌にやさしい素材のロンパースやパジャマなど、贈り物にも選ばれているアイテムをまとめました。",
      "性別を問わず使いやすいカラー展開のものから、男の子・女の子向けのはっきりとしたデザインまで幅広くご用意しています。ラッピングにも対応していますので、ぜひ大切な方への贈り物としてご検討ください。",
    ],
    relatedProductSlugs: ["cotton-rompers", "star-print-rompers", "soft-pajama-set"],
  },
  {
    slug: "coordinate-recommend",
    title: "男の子・女の子・ベビーのおすすめコーデ",
    description: "今の気分で選べる、年代別スタイリング提案",
    image: "/images/products/onepiece/01.jpg",
    body: [
      "「今日、何を着せるか迷わない」をコンセプトに、年代・性別別のおすすめコーディネートをご紹介します。単品でも着回しやすいアイテムばかりなので、気になったものから取り入れてみてください。",
      "詳しいコーディネート事例は、スタイリングページでも紹介しています。あわせてチェックしてみてください。",
    ],
    relatedProductSlugs: ["basic-crew-tshirt", "flower-onepiece", "soft-pajama-set"],
  },
];
