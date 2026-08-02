import Link from "next/link";
import { categories } from "@/lib/categories";

export default function CategoryTextLinks() {
  return (
    <div className="flex flex-wrap justify-center text-sm text-[#6b7280]">
      {categories.map((category, i) => (
        <span key={category.href} className="flex items-center">
          <Link
            href={category.href}
            className="px-3 py-1 transition-colors duration-200 hover:text-accent1"
          >
            {category.label}
          </Link>
          {i < categories.length - 1 && <span className="text-[#e5e7eb]">|</span>}
        </span>
      ))}
    </div>
  );
}
