import Link from "next/link";

export default function MemberBanner() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg bg-linear-to-r from-accent2 to-[#ffdd85] px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
      <div>
        <p className="font-heading text-xl font-bold text-[#333333] sm:text-2xl">
          MIMORA 会員登録のご案内
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#333333]">
          ご購入ごとにポイント還元、お誕生日には特別クーポンをプレゼント。無料会員登録で今すぐお得に。
        </p>
      </div>
      <Link
        href="/register"
        className="shrink-0 rounded-lg bg-accent1 px-8 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#ff5c70]"
      >
        無料で会員登録する
      </Link>
    </div>
  );
}
