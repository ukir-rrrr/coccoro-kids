import Link from "next/link";

export default function CheckoutCompletePage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent1 text-3xl text-white">
        ✓
      </span>
      <h1 className="font-heading text-2xl font-bold text-[#333333] sm:text-3xl">
        ご注文ありがとうございました
      </h1>
      <p className="text-sm leading-relaxed text-[#6b7280]">
        ご注文を承りました。確認メールをお送りしておりますので、内容をご確認ください。商品は通常ご注文確定後3〜5営業日以内に発送いたします。
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-lg bg-accent1 px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#ff5c70]"
        >
          トップページへ戻る
        </Link>
        <Link
          href="/mypage/orders"
          className="rounded-lg border border-[#d1d5db] px-6 py-3 text-sm font-bold text-[#333333] transition-colors duration-200 hover:bg-[#fff5f6]"
        >
          注文履歴を見る
        </Link>
      </div>
    </div>
  );
}
