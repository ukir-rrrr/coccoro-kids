import Breadcrumb from "@/components/Breadcrumb";
import FaqAccordion from "@/components/FaqAccordion";
import { faqItems } from "@/lib/faq";

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "よくあるご質問" }]} />
      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        よくあるご質問
      </h1>
      <div className="mt-8">
        <FaqAccordion items={faqItems} />
      </div>
    </div>
  );
}
