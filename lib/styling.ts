import type { Gender } from "@/lib/products";

export type StylingExample = {
  slug: string;
  title: string;
  gender: Gender;
  image: string;
  description: string;
  itemSlugs: string[];
};

/** サムネは同一商品の別カット or 別 SKU を使い、FEATURE や他コーデと被りにくくする */
export const stylingExamples: StylingExample[] = [
  {
    slug: "weekend-outing-girl",
    title: "週末のお出かけコーデ",
    gender: "girl",
    image: "/images/products/4580802474125/04.jpg",
    description:
      "ギンガムチェックのワンピースを主役に、チュール袖のトップスをレイヤード。お出かけにも映える甘めコーディネートです。",
    itemSlugs: ["4580802474125", "4580802566561"],
  },
  {
    slug: "park-play-boy",
    title: "公園で元気に遊ぶコーデ",
    gender: "boy",
    image: "/images/products/4580802526107/03.jpg",
    description:
      "動きやすいグラフィックTシャツに、テーパードデニムを合わせて。公園遊びや日常使いにちょうどいいアクティブスタイルです。",
    itemSlugs: ["4580802526039", "2011000496937"],
  },
  {
    slug: "first-outing-baby",
    title: "はじめてのお出かけベビーコーデ",
    gender: "baby",
    image: "/images/products/4580802456206/05.jpg",
    description:
      "花刺しゅうトップスとブルマのセットに、長袖ボディースーツを合わせたベビーのお出かけコーデ。着替えもしやすい組み合わせです。",
    itemSlugs: ["4580802456206", "4580802545993"],
  },
  {
    slug: "rainy-day-boy",
    title: "肌寒い日のアウトドアコーデ",
    gender: "boy",
    image: "/images/products/4580802554636/02.jpg",
    description:
      "中綿入りアウターとアウトドアハットで、風よけもばっちり。長袖Tシャツをインにすれば季節の変わり目にも活躍します。",
    itemSlugs: ["4580802554636", "4580802475825", "4580802526459"],
  },
];
