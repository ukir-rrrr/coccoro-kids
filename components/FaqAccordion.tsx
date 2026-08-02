"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";

export type FaqItem = {
  question: string;
  answer: string;
};

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col divide-y divide-[#e5e7eb] border-y border-[#e5e7eb]">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-bold text-[#333333] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent1"
            >
              <span>Q. {item.question}</span>
              <ChevronDownIcon
                className={`shrink-0 text-lg transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <p className="min-h-0 text-sm leading-relaxed text-[#6b7280]">A. {item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
