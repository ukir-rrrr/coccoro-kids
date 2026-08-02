"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "会員情報", href: "/mypage" },
  { label: "注文履歴", href: "/mypage/orders" },
  { label: "お気に入り", href: "/mypage/favorites" },
];

export default function MyPageNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 text-sm">
      {links.map((link) => {
        const active =
          link.href === "/mypage" ? pathname === "/mypage" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-lg px-4 py-2.5 transition-colors duration-200 ${
              active
                ? "bg-[#fff5f6] font-bold text-accent1"
                : "text-[#333333] hover:bg-[#f9fafb]"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
