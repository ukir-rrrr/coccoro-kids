"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { useCart } from "@/components/CartProvider";

const FREE_SHIPPING_THRESHOLD = 8800;
const SHIPPING_FEE = 550;

const paymentOptions = [
  { value: "credit-card", label: "クレジットカード" },
  { value: "bank-transfer", label: "銀行振込" },
  { value: "apple-pay", label: "Apple Pay" },
];

const inputClass =
  "rounded-lg border border-[#d1d5db] px-4 py-2.5 text-sm text-[#333333] focus:border-accent1 focus:outline-none focus:ring-1 focus:ring-accent1";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const { items, totalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState(paymentOptions[0].value);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [komojuConfigured, setKomojuConfigured] = useState(false);

  const shippingFee = totalPrice === 0 || totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const grandTotal = totalPrice + shippingFee;

  useEffect(() => {
    fetch("/api/komoju/status")
      .then((r) => r.json())
      .then((data: { configured?: boolean }) => {
        setKomojuConfigured(Boolean(data.configured));
      })
      .catch(() => {
        setKomojuConfigured(false);
      });
  }, []);

  useEffect(() => {
    const payment = searchParams.get("payment");
    if (payment === "cancelled") {
      setError("決済がキャンセルされたか、完了しませんでした。もう一度お試しください。");
    } else if (payment === "missing_session") {
      setError("決済セッションが見つかりませんでした。最初からやり直してください。");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();

    try {
      if (!komojuConfigured) {
        throw new Error(
          "決済が未設定です。.env.local に KOMOJU_SECRET_KEY（sk_test_...）を設定してください。",
        );
      }

      const res = await fetch("/api/komoju/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: grandTotal,
          email,
          paymentMethod,
          orderRef: `mimora-${Date.now()}`,
        }),
      });

      const data = (await res.json()) as { sessionUrl?: string; error?: string };
      if (!res.ok || !data.sessionUrl) {
        throw new Error(data.error ?? "決済ページの起動に失敗しました");
      }

      window.location.href = data.sessionUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
        <p className="text-lg font-bold text-[#333333]">カートに商品がありません</p>
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Breadcrumb
        items={[
          { label: "TOP", href: "/" },
          { label: "カート", href: "/cart" },
          { label: "お支払い・ご購入手続き" },
        ]}
      />
      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        お支払い・ご購入手続き
      </h1>

      {error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-8">
          <section>
            <h2 className="text-sm font-bold text-[#333333]">配送先情報</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1 text-xs text-gray-500">
                お名前
                <input type="text" name="name" required className={inputClass} />
              </label>
              <label className="flex flex-col gap-1 text-xs text-gray-500">
                電話番号
                <input type="tel" name="tel" required className={inputClass} />
              </label>
              <label className="flex flex-col gap-1 text-xs text-gray-500">
                郵便番号
                <input type="text" name="postal" required className={inputClass} />
              </label>
              <label className="flex flex-col gap-1 text-xs text-gray-500">
                メールアドレス
                <input type="email" name="email" required className={inputClass} />
              </label>
              <label className="flex flex-col gap-1 text-xs text-gray-500 sm:col-span-2">
                住所
                <input type="text" name="address" required className={inputClass} />
              </label>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold text-[#333333]">お支払い方法</h2>
            <div className="mt-4 flex flex-col gap-2">
              {paymentOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors duration-200 ${
                    paymentMethod === option.value
                      ? "border-accent1 bg-[#fff5f6]"
                      : "border-[#d1d5db]"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    value={option.value}
                    checked={paymentMethod === option.value}
                    onChange={() => setPaymentMethod(option.value)}
                    className="h-4 w-4 border-[#d1d5db] text-accent1 focus:ring-accent1"
                  />
                  <span className="text-[#333333]">{option.label}</span>
                </label>
              ))}
            </div>
            {!komojuConfigured && (
              <p className="mt-2 text-xs text-[#9ca3af]">
                決済未設定時は「支払いページへ」を押すとエラーになります。
              </p>
            )}
          </section>
        </div>

        <div className="h-fit rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-6">
          <h2 className="text-sm font-bold text-[#333333]">ご注文内容</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {items.map((item) => (
              <li key={item.key} className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#f3f4f6]">
                  <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs text-[#333333]">{item.name}</p>
                  <p className="text-xs text-[#9ca3af]">数量：{item.quantity}</p>
                </div>
                <p className="shrink-0 text-xs font-bold text-[#333333]">
                  ¥{((item.salePrice ?? item.price) * item.quantity).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-2 border-t border-[#e5e7eb] pt-4 text-sm text-[#333333]">
            <div className="flex justify-between">
              <span>小計</span>
              <span>¥{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>送料</span>
              <span>{shippingFee === 0 ? "無料" : `¥${shippingFee.toLocaleString()}`}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-[#e5e7eb] pt-4 text-base font-bold text-[#333333]">
            <span>合計（税込）</span>
            <span>¥{grandTotal.toLocaleString()}</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-lg bg-accent1 px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#ff5c70] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent1 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "支払いページへ移動中..." : "支払いページへ"}
          </button>
        </div>
      </form>
    </div>
  );
}
