import Breadcrumb from "@/components/Breadcrumb";
import FeatureSection from "@/components/FeatureSection";

export default function FeaturesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "特集" }]} />
      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        FEATURE
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
        ブランド特集からギフト選びまで、coccoro kidsが提案する特集記事です。
      </p>
      <div className="mt-8">
        <FeatureSection />
      </div>
    </div>
  );
}
