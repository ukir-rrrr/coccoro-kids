import { notFound } from "next/navigation";
import Image from "next/image";
import { features } from "@/lib/features";
import { getProductBySlug } from "@/lib/products";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return features.map((feature) => ({ slug: feature.slug }));
}

export default async function FeatureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = features.find((item) => item.slug === slug);

  if (!feature) {
    notFound();
  }

  const relatedProducts = feature.relatedProductSlugs
    .map((productSlug) => getProductBySlug(productSlug))
    .filter((product) => product !== undefined);

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
      <Breadcrumb
        items={[
          { label: "TOP", href: "/" },
          { label: "特集", href: "/features" },
          { label: feature.title },
        ]}
      />

      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        {feature.title}
      </h1>

      <div className="relative mt-6 aspect-16/9 overflow-hidden rounded-lg">
        <Image
          src={feature.image}
          alt={feature.title}
          fill
          sizes="(min-width: 1024px) 768px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {feature.body.map((paragraph, i) => (
          <p key={i} className="text-sm leading-relaxed text-[#333333]">
            {paragraph}
          </p>
        ))}
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-12 border-t border-[#e5e7eb] pt-8">
          <h2 className="font-heading text-lg font-bold text-[#333333]">
            この特集で紹介したアイテム
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
