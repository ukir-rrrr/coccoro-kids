import Link from "next/link";
import { redirect } from "next/navigation";
import { fetchKomojuSession, isKomojuPaymentSuccessful } from "@/lib/komoju";

type PageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function CheckoutReturnPage({ searchParams }: PageProps) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    redirect("/checkout?payment=missing_session");
  }

  let session;
  try {
    session = await fetchKomojuSession(sessionId);
  } catch {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-20 text-center">
        <p className="text-lg font-bold text-[#333333]">決済結果の確認に失敗しました</p>
        <p className="text-sm text-[#6b7280]">
          しばらくしてから再度お試しください。引き落とし状況は KOMOJU 管理画面でもご確認いただけます。
        </p>
        <Link href="/checkout" className="text-sm text-accent1 underline">
          チェックアウトに戻る
        </Link>
      </div>
    );
  }

  if (isKomojuPaymentSuccessful(session)) {
    redirect(`/checkout/complete?from=komoju&session_id=${encodeURIComponent(sessionId)}`);
  }

  redirect("/checkout?payment=cancelled");
}
