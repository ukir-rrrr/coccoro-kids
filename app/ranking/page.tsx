import Breadcrumb from "@/components/Breadcrumb";
import RankingSection from "@/components/RankingSection";

export default function RankingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "ランキング" }]} />
      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        ランキング
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
        BOY・GIRL・BABYそれぞれの売れ筋アイテムをご紹介します。
      </p>
      <div className="mt-8">
        <RankingSection limit={12} />
      </div>
    </div>
  );
}
