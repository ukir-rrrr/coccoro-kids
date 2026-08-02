"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { categories, genderEntries } from "@/lib/categories";
import { useCart } from "@/components/CartProvider";
import { useFavorites } from "@/components/FavoritesProvider";
import {
  CartIcon,
  ChevronDownIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/icons";

const mainNavLinks = [
  { label: "ブランド一覧", href: "/brands" },
  { label: "ランキング", href: "/ranking" },
  { label: "新着", href: "/new-arrivals" },
  { label: "特集", href: "/features" },
  { label: "スタイリング", href: "/styling" },
];

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent1 focus-visible:ring-offset-2 rounded-lg";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalCount } = useCart();
  const { totalCount: favoritesCount } = useFavorites();

  const isActive = (href: string) => pathname.startsWith(href);
  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <div>
      {/* お知らせバナー: 送料無料条件・キャンペーン告知 */}
      <div className="h-8 flex items-center justify-center bg-accent1 px-4 text-center text-xs font-medium text-white">
        <p className="truncate">
          全国送料一律550円（税込）｜8,800円（税込）以上のご購入で送料無料！
        </p>
      </div>

      <header className="sticky top-0 z-50 h-16 border-b border-[#e5e7eb] bg-white shadow-sm">
        <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <button
              type="button"
              aria-label="メニューを開く"
              className={`-ml-2 p-2 text-2xl text-[#333333] md:hidden ${focusRing}`}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </button>

            <Link href="/" className={`hidden items-center md:flex ${focusRing}`}>
              <Image
                src="/images/logo.png"
                alt="coccoro kids"
                width={150}
                height={38}
                priority
                className="h-8 w-auto lg:h-9"
              />
            </Link>

            <nav className="hidden items-center gap-6 text-sm font-medium text-[#333333] md:flex">
              <div
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1 py-2 transition-colors duration-200 hover:text-accent1 ${focusRing}`}
                  aria-expanded={megaOpen}
                >
                  カテゴリで探す
                  <ChevronDownIcon
                    className={`text-base transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`absolute left-1/2 top-full w-[640px] max-w-[calc(100vw-2rem)] -translate-x-1/2 border border-[#e5e7eb] bg-white shadow-md transition-all duration-200 ${
                    megaOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-2 opacity-0"
                  }`}
                >
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 p-6">
                    {categories.map((category) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        className={`block rounded-lg px-2 py-1.5 text-sm text-[#333333] transition-colors duration-200 hover:bg-[#fff5f6] hover:text-accent1 ${focusRing}`}
                      >
                        {category.label}
                      </Link>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 border-t border-[#e5e7eb] px-6 py-4">
                    {genderEntries.map((entry) => (
                      <Link
                        key={entry.href}
                        href={entry.href}
                        className={`rounded-full bg-[#f3f4f6] px-4 py-1.5 text-xs font-bold text-[#333333] transition-colors duration-200 hover:bg-accent2 hover:text-white ${focusRing}`}
                      >
                        {entry.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`border-b py-2 transition-colors duration-200 hover:text-accent1 ${
                    isActive(link.href)
                      ? "border-accent1 text-accent1"
                      : "border-transparent"
                  } ${focusRing}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link
            href="/"
            className={`absolute left-1/2 -translate-x-1/2 md:hidden ${focusRing}`}
          >
            <Image
              src="/images/logo.png"
              alt="coccoro kids"
              width={130}
              height={32}
              priority
              className="h-7 w-auto"
            />
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              aria-label="検索"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((open) => !open)}
              className={`hidden p-2 text-xl text-[#333333] transition-colors duration-200 hover:text-accent1 md:inline-flex ${focusRing}`}
            >
              <SearchIcon />
            </button>
            <Link
              href="/mypage/favorites"
              aria-label="お気に入り"
              className={`relative p-2 text-xl text-[#333333] transition-colors duration-200 hover:text-accent1 ${focusRing}`}
            >
              <HeartIcon />
              {favoritesCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent1 px-1 text-[10px] font-bold text-white">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              aria-label="カート"
              className={`relative p-2 text-xl text-[#333333] transition-colors duration-200 hover:text-accent1 ${focusRing}`}
            >
              <CartIcon />
              {totalCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent1 px-1 text-[10px] font-bold text-white">
                  {totalCount}
                </span>
              )}
            </Link>
            <Link
              href="/login"
              aria-label="会員ログイン"
              className={`hidden p-2 text-xl text-[#333333] transition-colors duration-200 hover:text-accent1 md:inline-flex ${focusRing}`}
            >
              <UserIcon />
            </Link>
          </div>
        </div>

        <div
          className={`absolute inset-x-0 top-full border-t border-[#e5e7eb] bg-white shadow-md transition-all duration-200 ${
            searchOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
        >
          <form action="/search" method="GET" className="mx-auto flex max-w-2xl gap-2 p-4">
            <input
              type="text"
              name="q"
              placeholder="商品名・ブランド名で検索"
              className={`flex-1 rounded-lg border border-[#d1d5db] px-4 py-2.5 text-sm text-[#333333] focus:border-accent1 focus:outline-none focus:ring-1 focus:ring-accent1 ${focusRing}`}
            />
            <button
              type="submit"
              className={`rounded-lg bg-accent1 px-6 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#ff5c70] ${focusRing}`}
            >
              検索
            </button>
          </form>
        </div>
      </header>

      {/* モバイルメニュー: 右側スライドイン + 背景黒40% */}
      <div className={`fixed inset-0 z-60 md:hidden ${mobileOpen ? "" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col overflow-y-auto bg-white shadow-xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#e5e7eb] px-4">
            <span className="font-heading text-lg font-bold text-[#333333]">MENU</span>
            <button
              type="button"
              aria-label="メニューを閉じる"
              className={`p-2 text-2xl text-[#333333] ${focusRing}`}
              onClick={() => setMobileOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-6 p-4 text-sm text-[#333333]">
            <form action="/search" method="GET" className="flex gap-2">
              <input
                type="text"
                name="q"
                placeholder="商品名・ブランド名で検索"
                className={`flex-1 rounded-lg border border-[#d1d5db] px-4 py-2.5 text-sm text-[#333333] focus:border-accent1 focus:outline-none focus:ring-1 focus:ring-accent1 ${focusRing}`}
              />
              <button
                type="submit"
                aria-label="検索"
                className={`rounded-lg bg-accent1 px-4 py-2.5 text-lg text-white transition-colors duration-200 hover:bg-[#ff5c70] ${focusRing}`}
              >
                <SearchIcon />
              </button>
            </form>

            <div className="flex items-center gap-2">
              {genderEntries.map((entry) => (
                <Link
                  key={entry.href}
                  href={entry.href}
                  onClick={closeMobileMenu}
                  className={`flex-1 rounded-lg bg-[#f3f4f6] py-2 text-center text-xs font-bold transition-colors duration-200 hover:bg-accent2 hover:text-white ${focusRing}`}
                >
                  {entry.label}
                </Link>
              ))}
            </div>

            <div>
              <p className="mb-2 text-xs font-bold text-[#9ca3af]">カテゴリで探す</p>
              <div className="flex flex-col">
                {categories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    onClick={closeMobileMenu}
                    className={`border-b border-[#f3f4f6] py-2.5 transition-colors duration-200 hover:text-accent1 ${focusRing}`}
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`border-b border-[#f3f4f6] py-2.5 font-medium transition-colors duration-200 hover:text-accent1 ${focusRing}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              href="/login"
              onClick={closeMobileMenu}
              className={`rounded-lg bg-accent1 px-6 py-3 text-center text-sm font-bold text-white transition-colors duration-200 hover:bg-[#ff5c70] ${focusRing}`}
            >
              ログイン / 会員登録
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
