import Breadcrumb from "@/components/Breadcrumb";

const sizeTable: { size: string; age: string; height: string }[] = [
  { size: "50〜60cm", age: "新生児〜3ヶ月ごろ", height: "50〜60cm" },
  { size: "70cm", age: "3〜12ヶ月ごろ", height: "65〜72cm" },
  { size: "80cm", age: "12〜18ヶ月ごろ", height: "73〜80cm" },
  { size: "90cm", age: "1〜2歳ごろ", height: "81〜90cm" },
  { size: "100cm", age: "3〜4歳ごろ", height: "91〜100cm" },
  { size: "110cm", age: "5〜6歳ごろ", height: "101〜110cm" },
  { size: "120cm", age: "7〜8歳ごろ", height: "111〜120cm" },
  { size: "130cm", age: "9〜10歳ごろ", height: "121〜130cm" },
  { size: "140cm", age: "11〜12歳ごろ", height: "131〜140cm" },
  { size: "150〜160cm", age: "13歳以上（Jr）", height: "141〜160cm" },
];

export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "サイズガイド" }]} />
      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        サイズガイド
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
        年齢・身長からおおよそのサイズ目安を早見表でご案内します。ブランドによって多少サイズ感が異なる場合がありますので、各商品ページの詳細もあわせてご確認ください。
      </p>

      <div className="mt-8 overflow-x-auto rounded-lg border border-[#e5e7eb]">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#e5e7eb] bg-[#f9fafb] text-xs text-[#6b7280]">
              <th className="px-4 py-3 font-bold">サイズ表記</th>
              <th className="px-4 py-3 font-bold">目安年齢</th>
              <th className="px-4 py-3 font-bold">身長目安</th>
            </tr>
          </thead>
          <tbody>
            {sizeTable.map((row) => (
              <tr key={row.size} className="border-b border-[#f3f4f6] last:border-b-0">
                <td className="px-4 py-3 font-bold text-[#333333]">{row.size}</td>
                <td className="px-4 py-3 text-[#333333]">{row.age}</td>
                <td className="px-4 py-3 text-[#333333]">{row.height}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
