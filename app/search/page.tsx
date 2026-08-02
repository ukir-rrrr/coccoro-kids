import Breadcrumb from "@/components/Breadcrumb";
import CategoryBrowser from "@/components/CategoryBrowser";
import { searchProducts } from "@/lib/products";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q ?? "";
  const results = searchProducts(query);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "検索結果" }]} />
      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        検索結果
      </h1>
      {query ? (
        <p className="mt-2 text-sm text-[#6b7280]">
          「{query}」の検索結果：{results.length}件
        </p>
      ) : (
        <p className="mt-2 text-sm text-[#6b7280]">キーワードを入力して商品を検索してください。</p>
      )}

      {query && (
        <div className="mt-8">
          {results.length === 0 ? (
            <p className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-6 py-16 text-center text-sm text-[#6b7280]">
              「{query}」に一致する商品が見つかりませんでした。別のキーワードでお試しください。
            </p>
          ) : (
            <CategoryBrowser products={results} />
          )}
        </div>
      )}
    </div>
  );
}
