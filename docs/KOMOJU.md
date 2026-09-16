# KOMOJU テストモード連携（MIMORA）

チェックアウトでは **KOMOJU Hosted Page** を使います。クレジットカード・銀行振込・Apple Pay 選択時に KOMOJU の決済画面へ遷移します。

## 1. KOMOJU 側の準備

1. [KOMOJU マーチャント](https://komoju.com/merchant) にログイン
2. **設定 → API キー** で **テスト用 Secret Key**（`sk_test_...`）をコピー
3. **設定 → 決済方法** でテストに使う手段（クレジットカード等）を有効化

テストモードは **Secret Key が `sk_test_` で始まるとき** 自動的に有効です。

## 2. ローカル環境変数

プロジェクトルートに `.env.local` を作成:

```env
# テスト用 Secret Key（KOMOJU 管理画面からコピー。本番は live キーに差し替え）
KOMOJU_SECRET_KEY=

# return_url 生成用（ローカル）
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

`npm run dev` を **再起動** してからチェックアウトへ。

Vercel 等にデプロイする場合は、同じ変数をホスティングの Environment Variables に設定し、`NEXT_PUBLIC_APP_URL` を本番 URL（例: `https://your-domain.com`）に合わせてください。

## 3. 動作確認の流れ

1. 商品をカートに入れる
2. `/checkout` で配送先を入力
3. クレジットカード等を選び **「支払いページへ」**
4. KOMOJU の画面でテストカード等で支払い  
   → [テスト用カード一覧](https://doc.komoju.com/docs/test-cards)  
   → 3DS で止まる場合は [3DS テストカード](https://doc.komoju.com/docs/testing-3d-secure-3ds)（例: Visa `4000000000000010`）
5. 戻り先 `/checkout/return` でセッション確認後、`/checkout/complete` へ

## 4. 実装の入口（開発者向け）

| パス | 役割 |
|------|------|
| `lib/komoju.ts` | Session 作成・取得 |
| `app/api/komoju/session/route.ts` | 決済セッション作成 API |
| `app/checkout/return/page.tsx` | KOMOJU からの return_url |
| `app/api/komoju/status/route.ts` | 設定有無・テストモード表示用 |

## 5. 本番前の注意

- 注文データは DB に保存していません。本番では Webhook（`payment.captured` 等）と注文永続化が必要です。
- 本番切替時は `sk_live_...` と本番 URL の `NEXT_PUBLIC_APP_URL` に変更してください。
