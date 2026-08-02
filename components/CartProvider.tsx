"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  key: string;
  productId: string;
  slug: string;
  brand: string;
  name: string;
  image: string;
  price: number;
  salePrice?: number;
  color: string;
  size: string;
  quantity: number;
};

type NewCartItem = Omit<CartItem, "key" | "quantity">;

type CartContextValue = {
  items: CartItem[];
  addItem: (item: NewCartItem, quantity?: number) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "coccoro-kids-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    // localStorageはサーバーに存在しないため、初期状態は空配列でSSRし、
    // マウント後にここで復元する（レンダー中に読むとハイドレーション不整合になる）。
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // 破損データは無視して空のカートから開始する
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const addItem = (item: NewCartItem, quantity = 1) => {
    const key = `${item.productId}:${item.color}:${item.size}`;
    setItems((current) => {
      const existing = current.find((i) => i.key === key);
      if (existing) {
        return current.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...current, { ...item, key, quantity }];
    });
    setToast(`${item.name}をカートに追加しました`);
  };

  const removeItem = (key: string) => {
    setItems((current) => current.filter((i) => i.key !== key));
  };

  const updateQuantity = (key: string, quantity: number) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((i) => i.key !== key)
        : current.map((i) => (i.key === key ? { ...i, quantity } : i)),
    );
  };

  const clearCart = () => setItems([]);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + (i.salePrice ?? i.price) * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalCount, totalPrice }}
    >
      {children}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-4 z-70 flex justify-center px-4 transition-all duration-300 sm:inset-x-auto sm:right-4 sm:justify-end ${
          toast ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <div className="pointer-events-auto rounded-lg bg-[#333333] px-4 py-3 text-sm text-white shadow-lg">
          {toast}
        </div>
      </div>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
