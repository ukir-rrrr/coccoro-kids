import { notFound } from "next/navigation";
import Image from "next/image";
import { features, getFeatureProducts } from "@/lib/features";
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

  const featureProducts = getFeatureProducts(feature);

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-3xl">
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
        <p className="mt-2 text-sm text-[#6b7280]">{feature.description}</p>

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
      </div>

      <section className="mt-12 border-t border-[#e5e7eb] pt-10">
        <h2 className="font-heading text-lg font-bold text-[#333333]">
          この特集のピックアップ商品
          <span className="ml-2 text-sm font-normal text-[#6b7280]">
            {featureProducts.length}件
          </span>
        </h2>
        {featureProducts.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {featureProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-[#6b7280]">
            現在、この特集に該当する商品がありません。
          </p>
        )}
      </section>
    </article>
  );
}
