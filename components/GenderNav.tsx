import Link from "next/link";
import { genderEntries } from "@/lib/categories";

const genderStyles: Record<string, string> = {
  "/gender/boy": "from-[#9bb8f0]/25 to-[#9bb8f0]/5",
  "/gender/girl": "from-accent1/25 to-accent1/5",
  "/gender/baby": "from-accent2/25 to-accent2/5",
};

export default function GenderNav() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-6">
      {genderEntries.map((entry) => (
        <Link
          key={entry.href}
          href={entry.href}
          className={`flex flex-col items-center justify-center gap-2 rounded-lg bg-linear-to-b px-4 py-8 text-center transition-transform duration-200 hover:-translate-y-1 sm:py-12 ${genderStyles[entry.href]}`}
        >
          <span className="font-heading text-xl font-bold tracking-wide text-[#333333] sm:text-2xl">
            {entry.label}
          </span>
          <span className="text-xs text-[#6b7280]">で探す</span>
        </Link>
      ))}
    </div>
  );
}
