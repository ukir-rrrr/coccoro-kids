"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

const slides: Slide[] = [
  {
    image: "/images/common/hero_01.jpg",
    alt: "親子でお出かけを楽しむ日常のワンシーン",
    eyebrow: "COCCORO KIDS",
    title: "小さな「好き」に、めいっぱい似合うを。",
    description: "厳選ブランドの子供服・ベビー用品を、coccoro kidsで。",
    ctaLabel: "新着アイテムを見る",
    ctaHref: "/new-arrivals",
  },
  {
    image: "/images/common/hero_02.jpg",
    alt: "夏の新作コレクション告知バナー",
    eyebrow: "SUMMER SALE",
    title: "ショップオープン記念セール開催中",
    description: "対象アイテムがお得になる期間限定キャンペーン実施中。",
    ctaLabel: "セール詳細を見る",
    ctaHref: "/features/seasonal-function",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-105 w-full overflow-hidden sm:h-120 lg:h-140">
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute inset-0 flex items-end sm:items-center">
            <div className="mx-auto w-full max-w-7xl px-6 pb-12 sm:px-8 sm:pb-0">
              <p className="text-xs font-bold tracking-widest text-white/90">
                {slide.eyebrow}
              </p>
              <h1 className="font-heading mt-2 max-w-md text-2xl font-bold leading-snug text-white sm:text-4xl">
                {slide.title}
              </h1>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/90">
                {slide.description}
              </p>
              <Link
                href={slide.ctaHref}
                className="mt-5 inline-block rounded-lg bg-accent1 px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#ff5c70]"
              >
                {slide.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.image}
            type="button"
            aria-label={`スライド${i + 1}へ`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-white" : "w-2 bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
