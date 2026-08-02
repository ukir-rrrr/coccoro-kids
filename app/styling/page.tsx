import Breadcrumb from "@/components/Breadcrumb";
import StylingSection from "@/components/StylingSection";

export default function StylingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "スタイリング" }]} />
      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        STYLING
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
        今日のコーディネートに迷ったら。スタイリング事例から探してみてください。
      </p>
      <div className="mt-8">
        <StylingSection />
      </div>
    </div>
  );
}
