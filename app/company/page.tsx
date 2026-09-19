import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

type CompanyRow = {
  label: string;
  value: ReactNode;
};

const rows: CompanyRow[] = [
  { label: "会社名", value: "合同会社ミライノ" },
  { label: "代表者", value: "坂本　千鶴" },
  { label: "所在地", value: "〒354-0033　埼玉県富士見市羽沢三丁目13番49号" },
  // { label: "電話", value: "[ここに電話番号を記入]" },
  {
    label: "メール",
    value: (
      <Link href="mailto:sakamoto@qianheb023com.com" className="text-accent1 underline">
        sakamoto@qianheb023com.com
      </Link>
    ),
  },
  { label: "資本金", value: "900万円" },
  {
    label: "事業内容",
    value:
      "インターネット通販による子供服・ベビー用品・キッズ関連商品の企画販売、および当該ECサイト「MIMORA」の運営",
  },
  { label: "営業時間", value: "平日 10:00〜17:00（土日祝休）" },
];

export default function CompanyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "運営会社" }]} />
      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        運営会社
      </h1>

      <div className="relative mt-6 aspect-3/2 overflow-hidden rounded-lg bg-[#f3f4f6]">
        <Image
          src="/images/common/company-about.jpg"
          alt="MIMORAの商品選定・店舗運営のイメージ"
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
