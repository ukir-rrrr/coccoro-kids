import Breadcrumb from "@/components/Breadcrumb";
import MyPageNav from "@/components/MyPageNav";

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "マイページ" }]} />
      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        マイページ
      </h1>
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
        <MyPageNav />
        <div>{children}</div>
      </div>
    </div>
  );
}
