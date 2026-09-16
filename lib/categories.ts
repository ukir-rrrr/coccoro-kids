import { products } from "@/lib/products";

export type Category = {
  label: string;
  href: string;
};

// DESIGN.txt「商品カテゴリ構成」の大カテゴリ一覧
export const categories: Category[] = [
  { label: "トップス", href: "/category/tops" },
  { label: "ボトムス", href: "/category/bottoms" },
  { label: "アウター・羽織り", href: "/category/outer" },
  { label: "ワンピース", href: "/category/onepiece" },
  { label: "オールインワン・セットアップ", href: "/category/setup" },
  { label: "シューズ", href: "/category/shoes" },
  { label: "バッグ・リュック", href: "/category/bags" },
  { label: "インナー・パジャマ・肌着", href: "/category/innerwear" },
  { label: "ベビー服（50〜70cm）", href: "/category/baby" },
  { label: "レイングッズ", href: "/category/rain" },
  { label: "甚平・浴衣", href: "/category/jinbei" },
  { label: "スイムウェア", href: "/category/swim" },
  { label: "帽子・ファッション小物", href: "/category/accessories" },
  { label: "雑貨・インテリア", href: "/category/goods" },
  { label: "ギフト（出産祝い・誕生日ギフトセット）", href: "/category/gift" },
];

const categoryHrefsWithProducts = () => {
  const hrefs = new Set<string>();
  for (const product of products) {
    hrefs.add(product.category);
  }
  return hrefs;
};

/** 1件以上商品があるカテゴリのみ（categories の定義順を維持） */
export function getCategoriesWithProducts(): Category[] {
  const hrefs = categoryHrefsWithProducts();
  return categories.filter((category) => hrefs.has(category.href));
}

export type GenderEntry = {
  label: string;
  href: string;
};

// TOPページ「性別・年代から探す導線」用
export const genderEntries: GenderEntry[] = [
  { label: "BOY", href: "/gender/boy" },
  { label: "GIRL", href: "/gender/girl" },
  { label: "BABY", href: "/gender/baby" },
];
