import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="パンくずリスト" className="text-xs text-[#6b7280]">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1">
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors duration-200 hover:text-accent1"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#333333]">{item.label}</span>
            )}
            {i < items.length - 1 && <span className="text-[#d1d5db]">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
