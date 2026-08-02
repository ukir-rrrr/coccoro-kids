"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

const FREE_SHIPPING_THRESHOLD = 8800;
const SHIPPING_FEE = 550;

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalCount } = useCart();

  const shippingFee = totalPrice === 0 || totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const grandTotal = totalPrice + shippingFee;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
        <div className="relative h-48 w-48 overflow-hidden rounded-lg">
          <Image
            src="/images/common/empty-cart.jpg"
            alt="カートは空です"
            fill
            sizes="192px"
            className="object-cover"
          />
        </div>
        <p className="text-lg font-bold text-[#333333]">カートに商品がありません</p>
        <p className="text-sm text-[#6b7280]">
          お気に入りのアイテムを見つけて、カートに追加しましょう。
        </p>
        <Link
          href="/"
          className="rounded-lg bg-accent1 px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#ff5c70]"
        >
          お買い物を続ける
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 pb-28 sm:px-6 lg:px-8 lg:py-12 lg:pb-12">
      <h1 className="font-heading text-2xl font-bold text-[#333333] sm:text-3xl">カート</h1>
      <p className="mt-1 text-sm text-[#6b7280]">{totalCount}点の商品</p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <ul className="flex flex-col divide-y divide-[#e5e7eb] border-y border-[#e5e7eb]">
          {items.map((item) => {
            const unitPrice = item.salePrice ?? item.price;
            return (
              <li key={item.key} className="flex gap-4 py-6">
                <Link
                  href={`/products/${item.slug}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#f3f4f6]"
                >
                  <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="text-xs text-[#6b7280]">{item.brand}</p>
                    <Link
                      href={`/products/${item.slug}`}
                      className="mt-0.5 block text-sm text-[#333333] transition-colors duration-200 hover:text-accent1"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-xs text-[#9ca3af]">
                      カラー：{item.color} / サイズ：{item.size}
                    </p>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-y-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="数量を減らす"
                        onClick={() => updateQuantity(item.key, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#d1d5db] text-[#333333] transition-colors duration-200 hover:border-accent1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent1"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm text-[#333333]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="数量を増やす"
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#d1d5db] text-[#333333] transition-colors duration-200 hover:border-accent1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent1"
                      >
                        ＋
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.key)}
                      className="text-xs text-[#9ca3af] underline transition-colors duration-200 hover:text-accent1"
                    >
                      削除
                    </button>
                  </div>
                </div>
                <p className="shrink-0 text-sm font-bold text-[#333333]">
                  ¥{(unitPrice * item.quantity).toLocaleString()}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="hidden h-fit rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-6 lg:block">
          <div className="flex flex-col gap-2 text-sm text-[#333333]">
            <div className="flex justify-between">
              <span>小計</span>
              <span>¥{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>送料</span>
              <span>{shippingFee === 0 ? "無料" : `¥${shippingFee.toLocaleString()}`}</span>
            </div>
            {shippingFee > 0 && (
              <p className="text-xs text-[#9ca3af]">
                あと¥{(FREE_SHIPPING_THRESHOLD - totalPrice).toLocaleString()}のご購入で送料無料
              </p>
            )}
          </div>
          <div className="mt-4 flex justify-between border-t border-[#e5e7eb] pt-4 text-base font-bold text-[#333333]">
            <span>合計（税込）</span>
            <span>¥{grandTotal.toLocaleString()}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block rounded-lg bg-accent1 px-6 py-3 text-center text-sm font-bold text-white transition-colors duration-200 hover:bg-[#ff5c70]"
          >
            レジに進む
          </Link>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e5e7eb] bg-white px-4 py-3 shadow-[0_-2px_8px_rgba(0,0,0,0.05)] lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-[#6b7280]">合計（税込）</p>
            <p className="text-lg font-bold text-[#333333]">¥{grandTotal.toLocaleString()}</p>
          </div>
          <Link
            href="/checkout"
            className="rounded-lg bg-accent1 px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#ff5c70]"
          >
            レジに進む
          </Link>
        </div>
      </div>
    </div>
  );
}
