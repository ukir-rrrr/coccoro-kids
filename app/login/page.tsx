"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

const inputClass =
  "rounded-lg border border-[#d1d5db] px-4 py-2.5 text-sm text-[#333333] focus:border-accent1 focus:outline-none focus:ring-1 focus:ring-accent1";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/mypage");
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16 sm:px-6">
      <h1 className="font-heading text-center text-2xl font-bold text-[#333333]">ログイン</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-xs text-gray-500">
          メールアドレス
          <input type="email" required className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-500">
          パスワード
          <input type="password" required className={inputClass} />
        </label>
        <button
          type="submit"
          className="mt-2 rounded-lg bg-accent1 px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#ff5c70] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent1"
        >
          ログインする
        </button>
      </form>
      <p className="text-center text-sm text-[#6b7280]">
        初めてのご利用の方は
        <Link href="/register" className="ml-1 text-accent1 underline">
          新規会員登録
        </Link>
      </p>
    </div>
  );
}
