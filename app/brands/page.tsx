import Breadcrumb from "@/components/Breadcrumb";
import BrandSection from "@/components/BrandSection";

export default function BrandsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "ブランド一覧" }]} />
      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        ブランド一覧
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
        coccoro kidsが厳選した、信頼のキッズ・ベビーブランドをご紹介します。
      </p>
      <div className="mt-8">
        <BrandSection />
      </div>
    </div>
  );
}
