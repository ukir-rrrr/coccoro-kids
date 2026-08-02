"use client";

import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/components/FavoritesProvider";
import { getProductBySlug } from "@/lib/products";

export default function MyPageFavoritesPage() {
  const { items } = useFavorites();
  const favoriteProducts = items
    .map((item) => getProductBySlug(item.slug))
    .filter((product) => product !== undefined);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-sm font-bold text-[#333333]">お気に入り</h2>
      {favoriteProducts.length === 0 ? (
        <p className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-6 py-16 text-center text-sm text-[#6b7280]">
          お気に入り登録された商品はまだありません。商品ページのハートボタンから登録できます。
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
