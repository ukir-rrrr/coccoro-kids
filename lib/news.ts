export type NewsItem = {
  slug: string;
  date: string;
  title: string;
  image?: string;
  body: string;
};

// DESIGN.txt「追加ページ(G2-2) > お知らせ」の告知内容
export const newsItems: NewsItem[] = [
  {
    slug: "2026-06-05",
    date: "2026-06-05",
    title: "夏の新作アイテム販売スタートのお知らせ",
    image: "/images/common/hero_02.jpg",
    body: "MIMORAにて、夏の新作アイテムの販売がスタートしました。接触冷感素材のTシャツやレイングッズ、スイムウェアなど、これからの季節にぴったりのアイテムを多数ご用意しております。ぜひ新着ページよりご覧ください。",
  },
  {
    slug: "2026-06-02",
    date: "2026-06-02",
    title: "ショップオープン記念 期間限定セールのご案内",
    image: "/images/common/hero_01.jpg",
    body: "この度のMIMORAオープンを記念して、期間限定のセールを開催いたします。対象アイテムをお得な価格でご案内しておりますので、この機会にぜひお買い物をお楽しみください。セール期間・対象商品は特集ページにて随時更新いたします。",
  },
  {
    slug: "2026-06-01",
    date: "2026-06-01",
    title: "MIMORA ショップオープンのお知らせ",
    image: "/images/icon.png",
    body: "本日、キッズ用品セレクトストア「MIMORA」がオープンいたしました。厳選した子供服・ベビー用品ブランドを一つの店舗に集約し、コーディネート提案やランキングから選べる買い物体験をお届けします。皆さまのご利用を心よりお待ちしております。",
  },
];
