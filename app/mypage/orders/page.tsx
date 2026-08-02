import Image from "next/image";
import Link from "next/link";
import { orders, type OrderStatus } from "@/lib/orders";
import { getProductBySlug } from "@/lib/products";

const statusColor: Record<OrderStatus, string> = {
  処理中: "bg-[#f3f4f6] text-[#6b7280]",
  発送済み: "bg-accent2 text-white",
  配達完了: "bg-accent1 text-white",
};

export default function MyPageOrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-sm font-bold text-[#333333]">注文履歴</h2>

      {orders.map((order) => {
        const items = order.itemSlugs
          .map((slug) => getProductBySlug(slug))
          .filter((product) => product !== undefined);

        return (
          <div key={order.id} className="rounded-lg border border-[#e5e7eb] p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-[#9ca3af]">
                {order.date.replaceAll("-", ".")}　注文番号：{order.id}
              </p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${statusColor[order.status]}`}
              >
                {order.status}
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/products/${item.slug}`}
                  className="flex items-center gap-3"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#f3f4f6]">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-[#333333]">{item.name}</p>
                    <p className="text-xs text-[#9ca3af]">{item.brand}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-4 flex justify-between border-t border-[#e5e7eb] pt-3 text-sm font-bold text-[#333333]">
              <span>合計（税込）</span>
              <span>¥{order.total.toLocaleString()}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
