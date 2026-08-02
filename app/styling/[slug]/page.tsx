import { notFound } from "next/navigation";
import Image from "next/image";
import { stylingExamples } from "@/lib/styling";
import { getProductBySlug } from "@/lib/products";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import type { Gender } from "@/lib/products";

const genderLabel: Record<Gender, string> = {
  boy: "BOY",
  girl: "GIRL",
  baby: "BABY",
};

export function generateStaticParams() {
  return stylingExamples.map((example) => ({ slug: example.slug }));
}

export default async function StylingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const example = stylingExamples.find((item) => item.slug === slug);

  if (!example) {
    notFound();
  }

  const items = example.itemSlugs
    .map((itemSlug) => getProductBySlug(itemSlug))
    .filter((product) => product !== undefined);

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
      <Breadcrumb
        items={[
          { label: "TOP", href: "/" },
          { label: "スタイリング", href: "/styling" },
          { label: example.title },
        ]}
      />

      <div className="mt-4 flex items-center gap-3">
        <span className="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-bold text-[#333333]">
          {genderLabel[example.gender]}
        </span>
      </div>
      <h1 className="font-heading mt-2 text-2xl font-bold text-[#333333] sm:text-3xl">
        {example.title}
      </h1>

      <div className="relative mt-6 aspect-3/4 max-h-[600px] overflow-hidden rounded-lg">
        <Image
          src={example.image}
          alt={example.title}
          fill
          sizes="(min-width: 1024px) 768px, 100vw"
          className="object-cover"
        />
      </div>

      <p className="mt-6 text-sm leading-relaxed text-[#333333]">{example.description}</p>

      {items.length > 0 && (
        <section className="mt-12 border-t border-[#e5e7eb] pt-8">
          <h2 className="font-heading text-lg font-bold text-[#333333]">着用アイテム</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
