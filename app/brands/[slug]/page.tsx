import { notFound } from "next/navigation";
import { brands } from "@/lib/brands";
import { getProductsByBrand } from "@/lib/products";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = brands.find((item) => item.slug === slug);

  if (!brand) {
    notFound();
  }

  const brandProducts = getProductsByBrand(brand.name);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Breadcrumb
        items={[
          { label: "TOP", href: "/" },
          { label: "ブランド一覧", href: "/brands" },
          { label: brand.name },
        ]}
      />

      <div className="mt-6 flex items-center gap-4">
        <span
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white"
          style={{ backgroundColor: brand.accent }}
        >
          {brand.name.charAt(0)}
        </span>
        <div>
          <h1 className="font-heading text-2xl font-bold text-[#333333] sm:text-3xl">
            {brand.name}
          </h1>
          <p className="mt-1 text-sm text-[#6b7280]">{brand.description}</p>
        </div>
      </div>

      <div className="mt-8">
        <p className="mb-4 text-xs text-[#6b7280]">{brandProducts.length}件の商品</p>
        {brandProducts.length === 0 ? (
          <p className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-6 py-16 text-center text-sm text-[#6b7280]">
            現在このブランドの取り扱い商品はありません。
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {brandProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
