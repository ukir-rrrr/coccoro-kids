export type Keyword = {
  label: string;
  href: string;
};

/** 検索語は lib/products の商品名に含まれる文字列（/search?q=） */
export const trendingKeywords: Keyword[] = [
  { label: "チュール", href: "/search?q=チュール" },
  { label: "ワンピース", href: "/search?q=ワンピ" },
  { label: "Tシャツ", href: "/search?q=Tシャツ" },
  { label: "チェック", href: "/search?q=チェック" },
  { label: "デニム", href: "/search?q=デニム" },
  { label: "ルームウェア", href: "/search?q=ルームウェア" },
  { label: "リュック", href: "/search?q=リュック" },
  { label: "サンダル", href: "/search?q=サンダル" },
];
