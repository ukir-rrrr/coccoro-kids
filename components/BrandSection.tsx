import Link from "next/link";
import { brands } from "@/lib/brands";

export default function BrandSection() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {brands.map((brand) => (
        <Link
          key={brand.slug}
          href={`/brands/${brand.slug}`}
          className="flex flex-col items-center gap-3 rounded-lg border border-[#e5e7eb] bg-white px-4 py-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white"
            style={{ backgroundColor: brand.accent }}
          >
            {brand.name.charAt(0)}
          </span>
          <span className="font-heading text-sm font-bold text-[#333333]">{brand.name}</span>
          <span className="text-xs leading-relaxed text-[#6b7280]">{brand.description}</span>
        </Link>
      ))}
    </div>
  );
}
