import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

const sections: { title: string; body: string }[] = [
  {
    title: "1. 会員登録",
    body: "会員登録（無料）を行うと、ご注文の管理やお気に入り登録、ポイントの獲得・利用が可能になります。会員登録をせずにお買い物いただくことも可能です。",
  },
  {
    title: "2. 商品の探し方",
    body: "カテゴリ・ブランド・性別やサイズからの絞り込み、ランキング、キーワード検索など、さまざまな方法で商品をお探しいただけます。",
  },
  {
    title: "3. ご注文の流れ",
    body: "商品ページでカラー・サイズを選択し、カートに追加してください。カート画面で内容をご確認のうえ、お支払い・ご購入手続きへお進みください。",
  },
  {
    title: "4. お支払い方法",
    body: "クレジットカード、銀行振込、Apple Pay に対応しています（KOMOJUによる決済）。",
  },
  {
    title: "5. 配送・送料について",
    body: "送料は全国一律550円（税込）、8,800円（税込）以上のお買い上げで送料無料です。ご注文確定後、通常3〜5営業日以内に発送いたします。",
  },
  {
    title: "6. 返品・交換について",
    body: "商品到着後8日以内、未使用・タグ付きの場合に限り返品・交換を承ります。詳しくは特定商取引法に基づく表示ページをご確認ください。",
  },
];

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "ご利用ガイド" }]} />
      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        ご利用ガイド
      </h1>

      <div className="mt-8 flex flex-col gap-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-sm font-bold text-[#333333]">{section.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">{section.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3 border-t border-[#e5e7eb] pt-8">
        <Link
          href="/size-guide"
          className="rounded-lg border border-[#d1d5db] px-6 py-3 text-sm font-bold text-[#333333] transition-colors duration-200 hover:border-accent1 hover:text-accent1"
        >
          サイズガイドを見る
        </Link>
        <Link
          href="/faq"
          className="rounded-lg border border-[#d1d5db] px-6 py-3 text-sm font-bold text-[#333333] transition-colors duration-200 hover:border-accent1 hover:text-accent1"
        >
          よくあるご質問を見る
        </Link>
        <Link
          href="/contact"
          className="rounded-lg bg-accent1 px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#ff5c70]"
        >
          お問い合わせ
        </Link>
      </div>
    </div>
  );
}
