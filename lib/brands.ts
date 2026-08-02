export type Brand = {
  slug: string;
  name: string;
  description: string;
  accent: string;
};

export const brands: Brand[] = [
  {
    slug: "petit-marche",
    name: "Petit Marché",
    description: "オーガニックコットンのベーシックウェア",
    accent: "#ff7a8a",
  },
  {
    slug: "ronde-fleur",
    name: "Ronde Fleur",
    description: "花柄と甘いシルエットのガールズブランド",
    accent: "#ffc94d",
  },
  {
    slug: "little-step",
    name: "Little Step",
    description: "元気に歩き回る子供のためのシューズ＆バッグ",
    accent: "#7dd3c0",
  },
  {
    slug: "nuage-kids",
    name: "Nuage Kids",
    description: "肌にやさしいパジャマ・ベビーウェア",
    accent: "#9bb8f0",
  },
  {
    slug: "sora-kids",
    name: "Sora Kids",
    description: "アウトドア好き親子のための機能性アイテム",
    accent: "#ff9d6c",
  },
  {
    slug: "hana-atelier",
    name: "Hana Atelier",
    description: "特別な日のためのセレモニーウェア",
    accent: "#c9a6e8",
  },
];
