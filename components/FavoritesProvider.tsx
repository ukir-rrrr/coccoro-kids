"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type FavoriteItem = {
  productId: string;
  slug: string;
  brand: string;
  name: string;
  image: string;
  price: number;
  salePrice?: number;
};

type FavoritesContextValue = {
  items: FavoriteItem[];
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (item: FavoriteItem) => void;
  removeFavorite: (productId: string) => void;
  totalCount: number;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);
const STORAGE_KEY = "coccoro-kids-favorites";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<FavoriteItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // localStorageはサーバーに存在しないため、初期状態は空配列でSSRし、
    // マウント後にここで復元する（レンダー中に読むとハイドレーション不整合になる）。
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // 破損データは無視して空のリストから開始する
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const isFavorite = (productId: string) => items.some((item) => item.productId === productId);

  const toggleFavorite = (item: FavoriteItem) => {
    setItems((current) =>
      current.some((i) => i.productId === item.productId)
        ? current.filter((i) => i.productId !== item.productId)
        : [...current, item],
    );
  };

  const removeFavorite = (productId: string) => {
    setItems((current) => current.filter((i) => i.productId !== productId));
  };

  return (
    <FavoritesContext.Provider
      value={{ items, isFavorite, toggleFavorite, removeFavorite, totalCount: items.length }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
