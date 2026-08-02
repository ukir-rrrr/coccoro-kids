import Breadcrumb from "@/components/Breadcrumb";
import CategoryGrid from "@/components/CategoryGrid";

export default function CategoryIndexPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "カテゴリ一覧" }]} />
      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        カテゴリ一覧
      </h1>
      <div className="mt-8">
        <CategoryGrid />
      </div>
    </div>
  );
}
