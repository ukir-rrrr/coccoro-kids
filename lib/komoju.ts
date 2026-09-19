const KOMOJU_API_BASE = "https://komoju.com/api/v1";

export type KomojuSession = {
  id: string;
  status: string;
  amount: number;
  currency: string;
  session_url?: string;
  payment?: {
    id: string;
    status: string;
  };
};

function authorizationHeader(secretKey: string) {
  const token = Buffer.from(`${secretKey}:`).toString("base64");
  return `Basic ${token}`;
}

export function getKomojuSecretKey(): string | undefined {
  const key = process.env.KOMOJU_SECRET_KEY?.trim();
  return key || undefined;
}

export function isKomojuConfigured(): boolean {
  return Boolean(getKomojuSecretKey());
}

export function isKomojuTestMode(): boolean {
  const key = getKomojuSecretKey() ?? "";
  return key.startsWith("sk_test_");
}

/** 決済 return_url 用の公開ベース URL（末尾スラッシュなし）。サーバー専用。 */
export function getAppBaseUrl(): string {
  const raw =
    process.env.APP_URL?.trim() ||
    process.env.URL?.trim() ||
    process.env.DEPLOY_PRIME_URL?.trim() ||
    process.env.VERCEL_URL?.trim();

  if (raw) {
    const normalized = raw.replace(/\/$/, "");
    return normalized.startsWith("http") ? normalized : `https://${normalized}`;
  }
  return "http://localhost:3000";
}

export async function createKomojuSession(input: {
  amount: number;
  returnUrl: string;
  email?: string;
  paymentTypes?: string[];
  metadata?: Record<string, string>;
}): Promise<KomojuSession> {
  const secretKey = getKomojuSecretKey();
  if (!secretKey) {
    throw new Error("KOMOJU_SECRET_KEY が設定されていません");
  }

  const body: Record<string, unknown> = {
    amount: input.amount,
    currency: "JPY",
    mode: "payment",
    return_url: input.returnUrl,
  };
  if (input.email) body.email = input.email;
  if (input.paymentTypes?.length) body.payment_types = input.paymentTypes;
  if (input.metadata && Object.keys(input.metadata).length > 0) {
    body.metadata = input.metadata;
  }

  const res = await fetch(`${KOMOJU_API_BASE}/sessions`, {
    method: "POST",
    headers: {
      Authorization: authorizationHeader(secretKey),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = (await res.json()) as KomojuSession & { error?: { message?: string } };
  if (!res.ok) {
    const msg = data.error?.message ?? `KOMOJU session create failed (${res.status})`;
    throw new Error(msg);
  }
  if (!data.session_url) {
    throw new Error("KOMOJU から session_url が返りませんでした");
  }
  return data;
}

export async function fetchKomojuSession(sessionId: string): Promise<KomojuSession> {
  const secretKey = getKomojuSecretKey();
  if (!secretKey) {
    throw new Error("KOMOJU_SECRET_KEY が設定されていません");
  }

  const res = await fetch(`${KOMOJU_API_BASE}/sessions/${encodeURIComponent(sessionId)}`, {
    method: "GET",
    headers: {
      Authorization: authorizationHeader(secretKey),
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const data = (await res.json()) as KomojuSession & { error?: { message?: string } };
  if (!res.ok) {
    const msg = data.error?.message ?? `KOMOJU session fetch failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

export function isKomojuPaymentSuccessful(session: KomojuSession): boolean {
  if (session.status !== "completed") return false;
  const paymentStatus = session.payment?.status;
  return paymentStatus === "captured" || paymentStatus === "authorized" || paymentStatus === "pending";
}
