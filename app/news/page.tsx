import Breadcrumb from "@/components/Breadcrumb";
import NewsSection from "@/components/NewsSection";

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "お知らせ" }]} />
      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        お知らせ
      </h1>
      <div className="mt-8">
        <NewsSection />
      </div>
    </div>
  );
}
