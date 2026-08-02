import { notFound } from "next/navigation";
import Image from "next/image";
import { newsItems } from "@/lib/news";
import Breadcrumb from "@/components/Breadcrumb";

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = newsItems.find((news) => news.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
      <Breadcrumb
        items={[
          { label: "TOP", href: "/" },
          { label: "お知らせ", href: "/news" },
          { label: item.title },
        ]}
      />

      <p className="mt-4 text-xs text-[#9ca3af]">{item.date.replaceAll("-", ".")}</p>
      <h1 className="font-heading mt-1 text-2xl font-bold text-[#333333] sm:text-3xl">
        {item.title}
      </h1>

      {item.image && (
        <div className="relative mt-6 aspect-16/9 overflow-hidden rounded-lg">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <p className="mt-8 text-sm leading-relaxed text-[#333333]">{item.body}</p>
    </article>
  );
}
