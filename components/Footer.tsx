import Image from "next/image";
import Link from "next/link";

const shopLinks = [
  { label: "カテゴリ一覧", href: "/category" },
  { label: "ランキング", href: "/ranking" },
  { label: "新着アイテム", href: "/new-arrivals" },
  { label: "特集", href: "/features" },
  { label: "スタイリング事例", href: "/styling" },
  { label: "サイズガイド", href: "/size-guide" },
];

const supportLinks = [
  { label: "ご利用ガイド", href: "/guide" },
  { label: "よくあるご質問", href: "/faq" },
  { label: "お問い合わせ", href: "/contact" },
  { label: "プライバシーポリシー", href: "/privacy" },
  { label: "ご利用規約", href: "/terms" },
  { label: "特定商取引法に基づく表示", href: "/tokushoho" },
];

const memberLinks = [
  { label: "マイページ", href: "/mypage" },
  { label: "新規会員登録", href: "/register" },
  { label: "ログイン", href: "/login" },
  { label: "運営会社について", href: "/company" },
];

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent1 focus-visible:ring-offset-2 rounded-lg";

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#f9fafb] text-[#6b7280]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <Link href="/" className={`inline-flex ${focusRing}`}>
              <Image
                src="/images/logo-transparent.png"
                alt="MIMORA"
                width={200}
                height={50}
                unoptimized
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              小さな「好き」に、めいっぱい似合うを。
            </p>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold text-[#333333]">SHOPPING</h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`transition-colors duration-200 hover:text-accent1 ${focusRing}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold text-[#333333]">サポート</h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`transition-colors duration-200 hover:text-accent1 ${focusRing}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-heading mt-6 text-sm font-bold text-[#333333]">会員</h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {memberLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`transition-colors duration-200 hover:text-accent1 ${focusRing}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold text-[#333333]">
              メルマガ登録
            </h3>
            <p className="mt-4 text-sm leading-relaxed">
              新作情報やお得なクーポンをメールでお届けします。
            </p>
            <form className="mt-4 flex flex-col gap-2">
              <label htmlFor="footer-newsletter-email" className="sr-only">
                メールアドレス
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                required
                placeholder="メールアドレス"
                className={`rounded-lg border border-[#d1d5db] bg-white px-4 py-2.5 text-sm text-[#333333] placeholder:text-[#9ca3af] focus:border-accent1 focus:outline-none focus:ring-1 focus:ring-accent1 ${focusRing}`}
              />
              <button
                type="submit"
                className={`rounded-lg bg-accent1 px-6 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#ff5c70] ${focusRing}`}
              >
                登録する
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-[#e5e7eb] pt-6">
          <p className="text-center text-xs sm:text-left">
            &copy; 2026 MIMORA All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
