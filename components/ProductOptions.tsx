"use client";

import { useState } from "react";
import Link from "next/link";
import { CartIcon, HeartIcon } from "@/components/icons";
import { useCart } from "@/components/CartProvider";
import { useFavorites } from "@/components/FavoritesProvider";
import type { Product } from "@/lib/products";

export default function ProductOptions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes.find((s) => s.inStock)?.label);
  const favorited = isFavorite(product.id);

  const handleToggleFavorite = () => {
    toggleFavorite({
      productId: product.id,
      slug: product.slug,
      brand: product.brand,
      name: product.name,
      image: product.images[0],
      price: product.price,
      salePrice: product.salePrice,
    });
  };

  const handleAddToCart = () => {
    if (!size) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      brand: product.brand,
      name: product.name,
      image: product.images[0],
      price: product.price,
      salePrice: product.salePrice,
      color,
      size,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-xs font-bold text-[#333333]">カラー：{color}</p>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent1 ${
                color === c
                  ? "border-accent1 bg-accent1 text-white"
                  : "border-[#d1d5db] text-[#333333] hover:border-accent1"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-bold text-[#333333]">サイズ{size ? `：${size}` : ""}</p>
          <Link
            href="/size-guide"
            className="text-xs text-[#6b7280] underline transition-colors duration-200 hover:text-accent1"
          >
            サイズガイドを見る
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s.label}
              type="button"
              disabled={!s.inStock}
              onClick={() => setSize(s.label)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent1 ${
                !s.inStock
                  ? "cursor-not-allowed border-[#e5e7eb] text-[#9ca3af] line-through"
                  : size === s.label
                    ? "border-accent1 bg-accent1 text-white"
                    : "border-[#d1d5db] text-[#333333] hover:border-accent1"
              }`}
            >
              {s.label}
              {!s.inStock && <span className="ml-1 text-[10px]">(在庫切れ)</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={favorited ? "お気に入りから削除" : "お気に入りに追加"}
          onClick={handleToggleFavorite}
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border text-xl transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent1 ${
            favorited
              ? "border-accent1 text-accent1"
              : "border-[#d1d5db] text-[#333333] hover:border-accent1 hover:text-accent1"
          }`}
        >
          <HeartIcon fill={favorited ? "currentColor" : "none"} />
        </button>
        <button
          type="button"
          disabled={!size}
          onClick={handleAddToCart}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-accent1 px-6 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#ff5c70] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent1 disabled:cursor-not-allowed disabled:bg-[#d1d5db]"
        >
          <CartIcon />
          カートに入れる
        </button>
      </div>
    </div>
  );
}
