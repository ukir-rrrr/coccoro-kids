import Image from "next/image";
import Link from "next/link";
import { newsItems } from "@/lib/news";

function formatDate(date: string) {
  return date.replaceAll("-", ".");
}

export default function NewsSection() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col divide-y divide-[#e5e7eb] rounded-lg border border-[#e5e7eb] bg-white">
      {newsItems.map((item) => (
        <Link
          key={item.slug}
          href={`/news/${item.slug}`}
          className="flex items-center gap-4 px-4 py-4 transition-colors duration-200 hover:bg-[#fff5f6] sm:px-6"
        >
          {item.image ? (
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
              <Image src={item.image} alt={item.title} fill sizes="56px" className="object-cover" />
            </div>
          ) : (
            <div className="h-14 w-14 shrink-0 rounded-lg bg-[#f3f4f6]" />
          )}
          <div className="min-w-0">
            <p className="text-xs text-[#9ca3af]">{formatDate(item.date)}</p>
            <p className="mt-1 truncate text-sm text-[#333333]">{item.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
