import type { Gender } from "@/lib/products";

export type StylingExample = {
  slug: string;
  title: string;
  gender: Gender;
  image: string;
  description: string;
  itemSlugs: string[];
};

export const stylingExamples: StylingExample[] = [
  {
    slug: "weekend-outing-girl",
    title: "週末のお出かけコーデ",
    gender: "girl",
    image: "/images/products/flower-onepiece/01.jpg",
    description:
      "花柄ワンピースを主役に、リボン付きスニーカーで甘さの中に元気さをプラス。休日のお出かけにぴったりの一着です。",
    itemSlugs: ["flower-onepiece", "ribbon-sneaker"],
  },
  {
    slug: "park-play-boy",
    title: "公園で元気に遊ぶコーデ",
    gender: "boy",
    image: "/images/products/basic-crew-tshirt/01.jpg",
    description:
      "動きやすいベーシックTシャツにキャンバススニーカーを合わせて、思いきり体を動かせるアクティブコーデに。",
    itemSlugs: ["basic-crew-tshirt", "canvas-sneaker"],
  },
  {
    slug: "first-outing-baby",
    title: "はじめてのお出かけベビーコーデ",
    gender: "baby",
    image: "/images/products/cotton-rompers/01.jpg",
    description:
      "肌にやさしいコットンロンパースに、お着替え用のパジャマもあわせて。はじめての外出も安心の組み合わせです。",
    itemSlugs: ["cotton-rompers", "soft-pajama-set"],
  },
  {
    slug: "rainy-day-boy",
    title: "雨の日も楽しく過ごすコーデ",
    gender: "boy",
    image: "/images/products/border-tshirt/01.jpg",
    description:
      "室内で過ごす時間が増える雨の日は、着心地の良いボーダーTシャツと通園リュックで気分よく過ごしましょう。",
    itemSlugs: ["border-tshirt", "school-backpack-navy"],
  },
];
