export type OrderStatus = "処理中" | "発送済み" | "配達完了";

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  itemSlugs: string[];
  total: number;
};

// マイページ用のダミー注文履歴（会員機能は表示のみ、実際の認証・注文連携は未実装）
export const orders: Order[] = [
  {
    id: "CK20260610-01",
    date: "2026-06-10",
    status: "配達完了",
    itemSlugs: ["basic-crew-tshirt", "canvas-sneaker"],
    total: 6160,
  },
  {
    id: "CK20260615-02",
    date: "2026-06-15",
    status: "発送済み",
    itemSlugs: ["flower-onepiece"],
    total: 3300,
  },
  {
    id: "CK20260620-03",
    date: "2026-06-20",
    status: "処理中",
    itemSlugs: ["cotton-rompers", "soft-pajama-set"],
    total: 6270,
  },
];
