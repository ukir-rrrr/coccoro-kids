import Link from "next/link";
import { getCategoriesWithProducts } from "@/lib/categories";
import { categoryIcons } from "@/components/category-icons";

export default function CategoryGrid() {
  const categories = getCategoriesWithProducts();

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5">
      {categories.map((category) => {
        const Icon = categoryIcons[category.href];
        return (
          <Link
            key={category.href}
            href={category.href}
            className="flex flex-col items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 py-5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-accent1 hover:shadow-md"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff5f6] text-2xl text-accent1">
              {Icon && <Icon />}
            </span>
            <span className="text-xs font-medium leading-snug text-[#333333]">
              {category.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
