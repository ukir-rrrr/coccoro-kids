import Image from "next/image";
import Link from "next/link";
import { stylingExamples, type StylingExample } from "@/lib/styling";
import type { Gender } from "@/lib/products";

const genderLabel: Record<Gender, string> = {
  boy: "BOY",
  girl: "GIRL",
  baby: "BABY",
};

export default function StylingSection({
  examples = stylingExamples,
}: {
  examples?: StylingExample[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {examples.map((example) => (
        <Link key={example.slug} href={`/styling/${example.slug}`} className="group block">
          <div className="relative aspect-3/4 overflow-hidden rounded-lg">
            <Image
              src={example.image}
              alt={example.title}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute left-2 top-2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#333333]">
              {genderLabel[example.gender]}
            </span>
          </div>
          <p className="mt-3 text-sm text-[#333333] transition-colors duration-200 group-hover:text-accent1">
            {example.title}
          </p>
        </Link>
      ))}
    </div>
  );
}
