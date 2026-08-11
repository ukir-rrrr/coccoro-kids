import Breadcrumb from "@/components/Breadcrumb";

const sections: { title: string; body: string }[] = [
  {
    title: "第1条（適用）",
    body: "本規約は、MIMORA（以下「当店」といいます）が提供するすべてのサービスの利用に関し、当店とお客様との間の権利義務関係を定めるものです。",
  },
  {
    title: "第2条（会員登録）",
    body: "会員登録を希望される方は、本規約に同意のうえ、当店の定める方法によって登録を申請するものとします。当店は、登録の申請者に虚偽の申告等の事情があると判断した場合、登録を承認しないことがあります。",
  },
  {
    title: "第3条（禁止事項）",
    body: "お客様は、当店のサービスの利用にあたり、法令または公序良俗に違反する行為、当店または第三者の権利を侵害する行為、その他当店が不適切と判断する行為を行ってはならないものとします。",
  },
  {
    title: "第4条（注文・契約の成立）",
    body: "お客様が商品を注文し、当店が注文内容を確認したメールを送信した時点をもって、売買契約が成立するものとします。",
  },
  {
    title: "第5条（商品代金・送料）",
    body: "商品代金は各商品ページに記載の価格（税込）とします。送料は全国一律550円（税込）とし、8,800円（税込）以上のお買い上げで送料無料とします。",
  },
  {
    title: "第6条（返品・交換）",
    body: "返品・交換は商品到着後8日以内、未使用・タグ付きの場合に限り承ります。詳細は特定商取引法に基づく表示ページをご確認ください。",
  },
  {
    title: "第7条（免責事項）",
    body: "当店は、天災地変その他当店の責に帰さない事由によりお客様に生じた損害について、一切の責任を負わないものとします。",
  },
  {
    title: "第8条（規約の変更）",
    body: "当店は、必要と判断した場合には、お客様への事前の通知なく本規約を変更することができるものとします。",
  },
  {
    title: "第9条（準拠法）",
    body: "本規約の解釈にあたっては、日本法を準拠法とします。",
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "ご利用規約" }]} />
      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        ご利用規約
      </h1>

      <div className="mt-8 flex flex-col gap-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-sm font-bold text-[#333333]">{section.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
