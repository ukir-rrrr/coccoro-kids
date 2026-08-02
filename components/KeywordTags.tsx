import Link from "next/link";
import { trendingKeywords } from "@/lib/keywords";

export default function KeywordTags() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {trendingKeywords.map((keyword) => (
        <Link
          key={keyword.href}
          href={keyword.href}
          className="rounded-full border border-[#d1d5db] bg-white px-4 py-1.5 text-xs font-medium text-[#333333] transition-colors duration-200 hover:border-accent1 hover:text-accent1"
        >
          #{keyword.label}
        </Link>
      ))}
    </div>
  );
}
