"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setZoomed(true)}
        aria-label="画像を拡大表示"
        className="relative block aspect-square w-full overflow-hidden rounded-lg bg-[#f3f4f6] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent1"
      >
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
      </button>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((image, i) => (
            <button
              key={`${image}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`サムネイル${i + 1}を表示`}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors duration-200 ${
                i === active ? "border-accent1" : "border-transparent"
              }`}
            >
              <Image src={image} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {zoomed && (
        <div
          className="fixed inset-0 z-70 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setZoomed(false)}
        >
          <div className="relative h-full max-h-[80vh] w-full max-w-2xl">
            <Image src={images[active]} alt={alt} fill sizes="100vw" className="object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
