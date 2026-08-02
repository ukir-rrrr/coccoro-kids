import { notFound } from "next/navigation";
import { getProductsByGender, type Gender } from "@/lib/products";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryBrowser from "@/components/CategoryBrowser";

const genderLabel: Record<Gender, string> = {
  boy: "BOY",
  girl: "GIRL",
  baby: "BABY",
};

export function generateStaticParams() {
  return (Object.keys(genderLabel) as Gender[]).map((slug) => ({ slug }));
}

function isGender(value: string): value is Gender {
  return value === "boy" || value === "girl" || value === "baby";
}

export default async function GenderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isGender(slug)) {
    notFound();
  }

  const genderProducts = getProductsByGender(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: genderLabel[slug] }]} />
      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        {genderLabel[slug]}
      </h1>
      <div className="mt-8">
        <CategoryBrowser products={genderProducts} />
      </div>
    </div>
  );
}
