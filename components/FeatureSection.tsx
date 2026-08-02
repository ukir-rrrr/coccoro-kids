import Image from "next/image";
import Link from "next/link";
import { features } from "@/lib/features";

export default function FeatureSection() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => (
        <Link key={feature.slug} href={`/features/${feature.slug}`} className="group block">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <p className="mt-3 text-sm font-bold leading-snug text-[#333333] transition-colors duration-200 group-hover:text-accent1">
            {feature.title}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[#6b7280]">{feature.description}</p>
        </Link>
      ))}
    </div>
  );
}
