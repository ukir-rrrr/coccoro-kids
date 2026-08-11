import Breadcrumb from "@/components/Breadcrumb";

const sections: { title: string; body: string }[] = [
  {
    title: "1. 個人情報の取得について",
    body: "当店は、ご注文・お問い合わせ・会員登録の際に、お名前・ご住所・電話番号・メールアドレスなどの個人情報を、適正な方法によって取得します。",
  },
  {
    title: "2. 個人情報の利用目的",
    body: "取得した個人情報は、商品の発送、お支払い手続き、お問い合わせへの対応、新着情報やキャンペーンのご案内、サービス向上のための分析のために利用します。",
  },
  {
    title: "3. 個人情報の第三者提供",
    body: "当店は、法令に基づく場合を除き、あらかじめご本人の同意を得ることなく、個人情報を第三者に提供することはありません。ただし、商品配送や決済処理のために、配送業者・決済代行会社（KOMOJU等）へ必要な範囲で情報を提供する場合があります。",
  },
  {
    title: "4. Cookie等の利用について",
    body: "当店は、サイトの利便性向上やアクセス解析のためにCookieを利用する場合があります。ブラウザの設定によりCookieの利用を制限することが可能です。",
  },
  {
    title: "5. 個人情報の開示・訂正・削除",
    body: "ご本人からの個人情報の開示・訂正・削除等のご請求には、法令に従い適切に対応いたします。お問い合わせ窓口までご連絡ください。",
  },
  {
    title: "6. お問い合わせ窓口",
    body: "個人情報の取扱いに関するお問い合わせは、お問い合わせページよりご連絡ください。",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "プライバシーポリシー" }]} />
      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        プライバシーポリシー
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
        MIMORA（以下「当店」といいます）は、お客様の個人情報を適切に取り扱うため、以下のとおりプライバシーポリシーを定めます。
      </p>

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
