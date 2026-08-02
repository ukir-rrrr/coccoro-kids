"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { getRanking, type Gender } from "@/lib/products";

const tabs: { label: string; value: Gender }[] = [
  { label: "BOY", value: "boy" },
  { label: "GIRL", value: "girl" },
  { label: "BABY", value: "baby" },
];

export default function RankingSection({ limit = 4 }: { limit?: number }) {
  const [active, setActive] = useState<Gender>("boy");
  const rankingProducts = getRanking(active, limit);

  return (
    <div>
      <div className="flex justify-center gap-8 border-b border-[#e5e7eb]">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActive(tab.value)}
            className={`border-b-2 px-2 pb-3 text-sm font-bold tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent1 ${
              active === tab.value
                ? "border-accent1 text-accent1"
                : "border-transparent text-[#9ca3af] hover:text-[#333333]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {rankingProducts.map((product, i) => (
          <div key={product.id} className="relative">
            <span className="absolute -left-1 -top-1 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#333333] text-xs font-bold text-white">
              {i + 1}
            </span>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
