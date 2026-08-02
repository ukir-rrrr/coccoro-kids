import Link from "next/link";

export default function MyPageTopPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-lg border border-[#e5e7eb] p-6">
        <h2 className="text-sm font-bold text-[#333333]">会員情報</h2>
        <dl className="mt-4 flex flex-col gap-3 text-sm">
          <div className="flex justify-between border-b border-[#f3f4f6] pb-3">
            <dt className="text-[#6b7280]">お名前</dt>
            <dd className="text-[#333333]">coccoro 花子</dd>
          </div>
          <div className="flex justify-between border-b border-[#f3f4f6] pb-3">
            <dt className="text-[#6b7280]">メールアドレス</dt>
            <dd className="text-[#333333]">hanako@example.com</dd>
          </div>
          <div className="flex justify-between border-b border-[#f3f4f6] pb-3">
            <dt className="text-[#6b7280]">会員ランク</dt>
            <dd className="text-[#333333]">レギュラー会員</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[#6b7280]">保有ポイント</dt>
            <dd className="font-bold text-accent1">320 pt</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg bg-linear-to-r from-accent2 to-[#ffdd85] p-6">
        <p className="font-heading text-lg font-bold text-[#333333]">
          お誕生日クーポンをプレゼント
        </p>
        <p className="mt-2 text-sm text-[#333333]">
          お誕生日月には500円分のクーポンをプレゼントしています。
        </p>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/mypage/orders"
          className="flex-1 rounded-lg border border-[#d1d5db] px-6 py-3 text-center text-sm font-bold text-[#333333] transition-colors duration-200 hover:border-accent1 hover:text-accent1"
        >
          注文履歴を見る
        </Link>
        <Link
          href="/mypage/favorites"
          className="flex-1 rounded-lg border border-[#d1d5db] px-6 py-3 text-center text-sm font-bold text-[#333333] transition-colors duration-200 hover:border-accent1 hover:text-accent1"
        >
          お気に入りを見る
        </Link>
      </div>
    </div>
  );
}
