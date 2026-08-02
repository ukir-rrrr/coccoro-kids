import { notFound } from "next/navigation";
import { categories } from "@/lib/categories";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";
import { getReviews } from "@/lib/reviews";
import { stylingExamples } from "@/lib/styling";
import Breadcrumb from "@/components/Breadcrumb";
import ProductGallery from "@/components/ProductGallery";
import ProductOptions from "@/components/ProductOptions";
import ProductCard from "@/components/ProductCard";
import StylingSection from "@/components/StylingSection";
import SectionHeading from "@/components/SectionHeading";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = categories.find((item) => item.href === product.category);
  const isSale = typeof product.salePrice === "number";
  const reviews = getReviews(product.id);
  const relatedProducts = getRelatedProducts(product);
  const relatedStyling = stylingExamples
    .filter((example) => example.gender === product.gender)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Breadcrumb
        items={[
          { label: "TOP", href: "/" },
          ...(category ? [{ label: category.label, href: category.href }] : []),
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} alt={`${product.brand} ${product.name}`} />

        <div>
          <p className="text-sm text-[#6b7280]">{product.brand}</p>
          <h1 className="font-heading mt-1 text-2xl font-bold text-[#333333] sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm text-accent2">★ {product.rating.toFixed(1)}</span>
            <span className="text-xs text-[#9ca3af]">（{product.reviewCount}件のレビュー）</span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            {isSale ? (
              <>
                <span className="text-2xl font-bold text-accent1">
                  ¥{product.salePrice!.toLocaleString()}
                </span>
                <span className="text-sm text-[#9ca3af] line-through">
                  ¥{product.price.toLocaleString()}
                </span>
                <span className="rounded-lg bg-accent1 px-2 py-1 text-xs font-bold text-white">
                  SALE
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-[#333333]">
                ¥{product.price.toLocaleString()}
              </span>
            )}
            <span className="text-xs text-[#9ca3af]">(税込)</span>
          </div>

          <div className="mt-6 border-t border-[#e5e7eb] pt-6">
            <ProductOptions product={product} />
          </div>

          <div className="mt-8 border-t border-[#e5e7eb] pt-6">
            <h2 className="text-sm font-bold text-[#333333]">商品説明</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">{product.description}</p>

            <dl className="mt-4 flex flex-col gap-2 text-sm">
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-[#9ca3af]">素材</dt>
                <dd className="text-[#333333]">{product.material}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-[#9ca3af]">お手入れ</dt>
                <dd className="text-[#333333]">{product.care}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <section className="mt-16 border-t border-[#e5e7eb] pt-12">
        <SectionHeading title="レビュー・評価" align="left" />
        <div className="mt-6 flex flex-col gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-[#f3f4f6] pb-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-[#333333]">{review.author}</p>
                <p className="text-xs text-[#9ca3af]">{review.date.replaceAll("-", ".")}</p>
              </div>
              <p className="mt-1 text-sm text-accent2">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {relatedStyling.length > 0 && (
        <section className="mt-16 border-t border-[#e5e7eb] pt-12">
          <SectionHeading title="コーディネート事例" align="left" />
          <div className="mt-6">
            <StylingSection examples={relatedStyling} />
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="mt-16 border-t border-[#e5e7eb] pt-12">
          <SectionHeading title={`${product.brand}の他のアイテム`} align="left" />
          <div className="mt-6 flex gap-4 overflow-x-auto pb-2 sm:gap-6">
            {relatedProducts.map((related) => (
              <div key={related.id} className="w-40 shrink-0 sm:w-56">
                <ProductCard product={related} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
