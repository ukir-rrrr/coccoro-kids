import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import { getNewArrivals } from "@/lib/products";

export default function NewArrivalsPage() {
  const newArrivals = getNewArrivals(24);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "新着アイテム" }]} />
      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        NEW ARRIVALS
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
        今週入荷した新着アイテムをご紹介します。
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
