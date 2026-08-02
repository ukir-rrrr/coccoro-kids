"use client";

import Image from "next/image";
import Link from "next/link";
import { CartIcon, HeartIcon } from "@/components/icons";
import { useCart } from "@/components/CartProvider";
import { useFavorites } from "@/components/FavoritesProvider";
import type { Product } from "@/lib/products";

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent1 focus-visible:ring-offset-2";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { id, slug, brand, name, price, salePrice, images, colors, sizes, isNew } = product;
  const isSale = typeof salePrice === "number";
  const favorited = isFavorite(id);

  const handleAddToCart = () => {
    addItem({
      productId: id,
      slug,
      brand,
      name,
      image: images[0],
      price,
      salePrice,
      color: colors[0],
      size: sizes.find((size) => size.inStock)?.label ?? sizes[0].label,
    });
  };

  const handleToggleFavorite = () => {
    toggleFavorite({ productId: id, slug, brand, name, image: images[0], price, salePrice });
  };

  return (
    <div className="group relative">
      <Link href={`/products/${slug}`} className={`block ${focusRing} rounded-lg`}>
        <div className="relative aspect-square overflow-hidden rounded-lg bg-[#f3f4f6]">
          <Image
            src={images[0]}
            alt={`${brand} ${name}`}
            fill
            sizes="(min-width: 1024px) 23vw, (min-width: 640px) 30vw, 46vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {isSale && (
              <span className="rounded-lg bg-accent1 px-2 py-1 text-xs font-bold text-white">
                SALE
              </span>
            )}
            {isNew && (
              <span className="rounded-lg bg-accent2 px-2 py-1 text-xs font-bold text-white">
                NEW
              </span>
            )}
          </div>
        </div>
      </Link>

      <button
        type="button"
        aria-label={favorited ? "お気に入りから削除" : "お気に入りに追加"}
        onClick={handleToggleFavorite}
        className={`absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-base shadow-sm transition-colors duration-200 ${focusRing} ${
          favorited ? "text-accent1" : "text-[#333333] hover:text-accent1"
        }`}
      >
        <HeartIcon fill={favorited ? "currentColor" : "none"} />
      </button>

      <div className="mt-3 flex items-start justify-between gap-2">
        <Link href={`/products/${slug}`} className={`min-w-0 ${focusRing} rounded-lg`}>
          <p className="truncate text-xs text-[#6b7280]">{brand}</p>
          <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-[#333333]">{name}</p>
          <p className="mt-1 flex items-baseline gap-2">
            {isSale ? (
              <>
                <span className="text-lg font-bold text-accent1">
                  ¥{salePrice.toLocaleString()}
                </span>
                <span className="text-xs text-[#9ca3af] line-through">
                  ¥{price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-[#333333]">
                ¥{price.toLocaleString()}
              </span>
            )}
          </p>
        </Link>
        <button
          type="button"
          aria-label="カートに追加"
          onClick={handleAddToCart}
          className={`mt-1 shrink-0 rounded-lg bg-accent1 p-2 text-base text-white transition-colors duration-200 hover:bg-[#ff5c70] ${focusRing}`}
        >
          <CartIcon />
        </button>
      </div>
    </div>
  );
}
