"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";

const inputClass =
  "rounded-lg border border-[#d1d5db] px-4 py-2.5 text-sm text-[#333333] focus:border-accent1 focus:outline-none focus:ring-1 focus:ring-accent1";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "お問い合わせ" }]} />
      <h1 className="font-heading mt-4 text-2xl font-bold text-[#333333] sm:text-3xl">
        お問い合わせ
      </h1>

      {submitted ? (
        <div className="mt-8 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-6 py-16 text-center">
          <p className="text-sm font-bold text-[#333333]">
            お問い合わせありがとうございました。
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
            内容を確認のうえ、担当者よりご連絡いたします。今しばらくお待ちください。
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-xs text-gray-500">
            お名前
            <input type="text" required className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-xs text-gray-500">
            メールアドレス
            <input type="email" required className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-xs text-gray-500">
            お問い合わせ種別
            <select required defaultValue="" className={inputClass}>
              <option value="" disabled>
                選択してください
              </option>
              <option value="order">ご注文について</option>
              <option value="product">商品について</option>
              <option value="shipping">配送・返品について</option>
              <option value="other">その他</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs text-gray-500">
            お問い合わせ内容
            <textarea required rows={6} className={`${inputClass} resize-none`} />
          </label>
          <button
            type="submit"
            className="mt-2 rounded-lg bg-accent1 px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#ff5c70] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent1"
          >
            送信する
          </button>
        </form>
      )}
    </div>
  );
}
