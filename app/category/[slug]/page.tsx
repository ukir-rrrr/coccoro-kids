import { notFound } from "next/navigation";
import { categories } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryBrowser from "@/components/CategoryBrowser";

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.href.replace("/category/", ""),
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const href = `/category/${slug}`;
  const category = categories.find((item) => item.href === href);

  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(href);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: category.label }]} />
      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        {category.label}
      </h1>
      <div className="mt-8">
        <CategoryBrowser products={categoryProducts} />
      </div>
    </div>
  );
}
