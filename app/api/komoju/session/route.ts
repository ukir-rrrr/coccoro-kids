import { NextResponse } from "next/server";
import { createKomojuSession, getAppBaseUrl, isKomojuTestMode } from "@/lib/komoju";
import {
  checkoutPaymentToKomojuTypes,
  isSupportedCheckoutPayment,
} from "@/lib/komoju-payment-types";

type SessionRequestBody = {
  amount?: number;
  email?: string;
  paymentMethod?: string;
  orderRef?: string;
};

export async function POST(request: Request) {
  let body: SessionRequestBody;
  try {
    body = (await request.json()) as SessionRequestBody;
  } catch {
    return NextResponse.json({ error: "リクエスト形式が不正です" }, { status: 400 });
  }

  const amount = Math.round(Number(body.amount));
  if (!Number.isFinite(amount) || amount < 1) {
    return NextResponse.json({ error: "決済金額が不正です" }, { status: 400 });
  }

  const paymentMethod = body.paymentMethod ?? "credit-card";
  if (!isSupportedCheckoutPayment(paymentMethod)) {
    return NextResponse.json({ error: "この支払い方法には対応していません" }, { status: 400 });
  }

  const paymentTypes = checkoutPaymentToKomojuTypes[paymentMethod];
  const returnUrl = `${getAppBaseUrl()}/checkout/return`;
  const orderRef = body.orderRef?.slice(0, 64) ?? `mimora-${Date.now()}`;

  try {
    const session = await createKomojuSession({
      amount,
      returnUrl,
      email: body.email?.trim() || undefined,
      paymentTypes,
      metadata: {
        order_ref: orderRef,
        payment_method: paymentMethod,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      sessionUrl: session.session_url,
      testMode: isKomojuTestMode(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "KOMOJU セッションの作成に失敗しました";
    const status = message.includes("KOMOJU_SECRET_KEY") ? 503 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
