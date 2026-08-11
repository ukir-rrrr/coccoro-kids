import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";

const rows: { label: string; value: string }[] = [
  { label: "会社名", value: "[ここに会社名を記入]" },
  { label: "代表者", value: "[ここに代表者名を記入]" },
  { label: "所在地", value: "[ここに所在地を記入]" },
  { label: "電話", value: "[ここに電話番号を記入]" },
  { label: "メール", value: "[ここにメールアドレスを記入]" },
  { label: "営業時間", value: "平日 10:00〜17:00（土日祝休）" },
];

export default function CompanyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "運営会社" }]} />
      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        運営会社
      </h1>

      <div className="relative mt-6 aspect-3/2 overflow-hidden rounded-lg">
        <Image
          src="/images/common/about.jpg"
          alt="スタッフが商品を選んでいる様子"
          fill
          sizes="(min-width: 1024px) 768px, 100vw"
          className="object-cover"
        />
      </div>

      <p className="mt-6 text-sm leading-relaxed text-[#333333]">
        MIMORAは、厳選した子供服・ベビー用品ブランドを一つの店舗に集約し、コーディネート提案やランキングから選べる「今日、何を着せるか迷わない」買い物体験を提供するキッズ用品セレクトストアです。
      </p>

      <dl className="mt-8 flex flex-col divide-y divide-[#e5e7eb] border-y border-[#e5e7eb]">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[120px_1fr] sm:gap-4"
          >
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
