import Breadcrumb from "@/components/Breadcrumb";

const rows: { label: string; value: string }[] = [
  { label: "販売業者", value: "[ここに会社名を記入]" },
  { label: "運営統括責任者", value: "[ここに代表者名を記入]" },
  { label: "所在地", value: "[ここに所在地を記入]" },
  { label: "電話番号", value: "[ここに電話番号を記入]" },
  { label: "メールアドレス", value: "[ここにメールアドレスを記入]" },
  { label: "営業時間", value: "平日 10:00〜17:00（土日祝休）" },
  { label: "販売価格", value: "商品ページ毎に記載の価格（税込）となります。" },
  {
    label: "商品代金以外の必要料金",
    value: "送料：全国一律550円（税込）、8,800円（税込）以上のお買い上げで送料無料",
  },
  {
    label: "お支払い方法",
    value: "クレジットカード、銀行振込、Apple Pay、代金引換（KOMOJUによる決済）",
  },
  {
    label: "引き渡し時期",
    value: "ご注文確定後、通常3〜5営業日以内に発送（セール・キャンペーン時は前後する場合あり）",
  },
  {
    label: "返品・交換について",
    value:
      "商品到着後8日以内、未使用・タグ付きの場合に限り返品・交換を承ります（お客様都合による返品は送料お客様負担、商品不良の場合は当店負担）",
  },
];

export default function TokushohoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "特定商取引法に基づく表示" }]} />
      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        特定商取引法に基づく表示
      </h1>

      <dl className="mt-8 flex flex-col divide-y divide-[#e5e7eb] border-y border-[#e5e7eb]">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-4">
            <dt className="text-xs font-bold text-[#9ca3af] sm:text-sm sm:text-[#333333]">
              {row.label}
            </dt>
            <dd className="text-sm leading-relaxed text-[#333333]">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
