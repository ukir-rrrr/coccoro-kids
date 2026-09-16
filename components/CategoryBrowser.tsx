"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

const priceBands = [
  { label: "すべての価格", min: 0, max: Infinity },
  { label: "〜2,000円", min: 0, max: 2000 },
  { label: "2,000円〜4,000円", min: 2000, max: 4000 },
  { label: "4,000円〜", min: 4000, max: Infinity },
];

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function CategoryBrowser({ products }: { products: Product[] }) {
  const sizes = useMemo(
    () => Array.from(new Set(products.flatMap((product) => product.sizes.map((s) => s.label)))),
    [products],
  );

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceBandIndex, setPriceBandIndex] = useState(0);

  const priceBand = priceBands[priceBandIndex];
  const filtered = products.filter((product) => {
    const price = product.salePrice ?? product.price;
    const matchesSize =
      selectedSizes.length === 0 ||
      product.sizes.some((size) => size.inStock && selectedSizes.includes(size.label));
    const matchesPrice = price >= priceBand.min && price <= priceBand.max;
    return matchesSize && matchesPrice;
  });

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="flex flex-col gap-8">
        {sizes.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-[#333333]">サイズで絞り込む</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSizes(toggle(selectedSizes, size))}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent1 ${
                    selectedSizes.includes(size)
                      ? "border-accent1 bg-accent1 text-white"
                      : "border-[#d1d5db] text-[#333333] hover:border-accent1"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-sm font-bold text-[#333333]">価格帯で絞り込む</h2>
          <div className="mt-3 flex flex-col gap-2">
            {priceBands.map((band, i) => (
              <label key={band.label} className="flex items-center gap-2 text-sm text-[#333333]">
                <input
                  type="radio"
                  name="price-band"
                  checked={priceBandIndex === i}
                  onChange={() => setPriceBandIndex(i)}
                  className="h-4 w-4 border-[#d1d5db] text-accent1 focus:ring-accent1"
                />
                {band.label}
              </label>
            ))}
          </div>
        </div>
      </aside>

      <div>
        <p className="mb-4 text-xs text-[#6b7280]">{filtered.length}件表示</p>
        {filtered.length === 0 ? (
          <p className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-6 py-16 text-center text-sm text-[#6b7280]">
            条件に一致する商品が見つかりませんでした。
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
