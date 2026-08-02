export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
};

const sampleReviews: Omit<Review, "id">[] = [
  {
    author: "みかんママ",
    rating: 5,
    date: "2026-06-10",
    comment: "サイズ感もちょうどよく、生地もやわらかいので気に入っています。",
  },
  {
    author: "はると",
    rating: 4,
    date: "2026-06-05",
    comment: "デザインが可愛くて何度もリピートしています。発送も早かったです。",
  },
  {
    author: "ゆずきの母",
    rating: 5,
    date: "2026-05-28",
    comment: "洗濯してもへたれにくく、普段使いにおすすめです。",
  },
];

export function getReviews(productId: string): Review[] {
  return sampleReviews.map((review, i) => ({ id: `${productId}-r${i + 1}`, ...review }));
}
