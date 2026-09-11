# クラウドエージェント指示書：Branshes 商品画像取得（coccoro-kids）

**目的:** [ブランシェス公式 EC](https://www.branshes.com/shop/) のナビカテゴリ **13 件** から **各 13 商品 × 8 枚** の画像と商品メタデータを取得し、`coccoro-kids` の EC サイトを実画像で埋める。

**例カテゴリ:** [トップス `/shop/c/ctops/`](https://www.branshes.com/shop/c/ctops/)

---

## ゴール（Acceptance Criteria）

| 項目 | 目標 |
|------|------|
| カテゴリ数 | **13**（Branshes ナビと同一） |
| 商品数 | **各 13 件 = 合計 169 商品** |
| 画像数 | **各 8 枚 = 最大 1,352 枚**（ソース不足はログに記載） |
| 画像保存先 | `public/images/products/{JANコード}/01.jpg` … `08.jpg` |
| 商品データ | `lib/products.ts` の `products` 配列を自動生成で差し替え |
| ビルド | `npm run build` がエラーなく通る |
| 目視確認 | `/category/{slug}` と `/products/{id}` で画像 404 なし |

---

## 実行環境の注意

- **ローカル端末またはクラウドエージェントの Shell で直接実行**（Cursor Agent の Fetch ツールは使わない）
- リクエスト間隔 **1.5 秒以上**、`concurrency` **2 以下**
- 依存: `pip install -r requirements-br.txt`（`requests`, `curl_cffi`）
- 403 が出たら `requestIntervalSec` を `2.0` 以上に引き上げ

---

## 一括実行（推奨）

```bash
cd coccoro-kids
./scripts/run-br-pipeline.sh
```

1 カテゴリだけ試す（例: トップス）:

```bash
./scripts/run-br-pipeline.sh tops
```

---

## パイプライン概要

```
Phase A-1  カテゴリ別画像収集
  python scripts/br_fetch.py --config data/branshes/configs/{slug}.json
  → data/branshes/manifests/{slug}.json
  → public/images/products/{goods_id}/01.jpg …

Phase A-2  マニフェスト統合
  node scripts/merge-manifests.mjs --out data/branshes/manifest.json \
    data/branshes/manifests/*.json

Phase B    products.ts 生成
  node scripts/build-products.mjs --manifest data/branshes/manifest.json

Phase C    確認
  npm run build
  ブラウザでカテゴリ・商品詳細を目視
```

---

## 13 カテゴリ一覧（batch-plan 正）

`data/branshes/batch-plan.json` version 2 を参照。Branshes ナビ順。

| slug | Branshes ナビ | coccoro-kids カテゴリ | Branshes URL |
|------|--------------|----------------------|--------------|
| `tops` | トップス | `/category/tops` | https://www.branshes.com/shop/c/ctops/ |
| `outer` | アウター | `/category/outer` | https://www.branshes.com/shop/c/cjacket/ |
| `bottoms` | ボトムス | `/category/bottoms` | https://www.branshes.com/shop/c/cbottoms/ |
| `onepiece` | ワンピース | `/category/onepiece` | https://www.branshes.com/shop/c/conepiece/ |
| `baby` | ベビーウェア | `/category/baby` | https://www.branshes.com/shop/c/cbaby/ |
| `shoes` | シューズ・靴 | `/category/shoes` | https://www.branshes.com/shop/c/cshoes/ |
| `legwear` | レッグウェア | `/category/accessories` | https://www.branshes.com/shop/c/cleg-wear/ |
| `bags` | かばん・バッグ | `/category/bags` | https://www.branshes.com/shop/c/cbag/ |
| `hats` | 帽子 | `/category/accessories` | https://www.branshes.com/shop/c/ccap-hat/ |
| `underwear` | アンダーウェア | `/category/innerwear` | https://www.branshes.com/shop/c/cunderwea/ |
| `pajamas` | パジャマ・ルームウェア | `/category/innerwear` | https://www.branshes.com/shop/c/cpajamas/ |
| `formal` | フォーマル・セレモニー | `/category/goods` | https://www.branshes.com/shop/c/cformal/ |
| `other-goods` | その他グッズ | `/category/goods` | https://www.branshes.com/shop/c/cother8/ |

> レッグウェア・帽子は `/category/accessories`、アンダーウェア・パジャマは `/category/innerwear`、フォーマル・その他グッズは `/category/goods` にマッピング。

---

## Phase A-1：カテゴリ別実行コマンド

```bash
python scripts/br_fetch.py --config data/branshes/configs/tops.json
python scripts/br_fetch.py --config data/branshes/configs/outer.json
python scripts/br_fetch.py --config data/branshes/configs/bottoms.json
python scripts/br_fetch.py --config data/branshes/configs/onepiece.json
python scripts/br_fetch.py --config data/branshes/configs/baby.json
python scripts/br_fetch.py --config data/branshes/configs/shoes.json
python scripts/br_fetch.py --config data/branshes/configs/legwear.json
python scripts/br_fetch.py --config data/branshes/configs/bags.json
python scripts/br_fetch.py --config data/branshes/configs/hats.json
python scripts/br_fetch.py --config data/branshes/configs/underwear.json
python scripts/br_fetch.py --config data/branshes/configs/pajamas.json
python scripts/br_fetch.py --config data/branshes/configs/formal.json
python scripts/br_fetch.py --config data/branshes/configs/other-goods.json
```

### カテゴリ 1 件の完了条件

- [ ] 商品 **13 件**（`maxProducts` 通り）
- [ ] 各商品 **8 枚**（不足はログに記載し、取得できた枚数で続行）
- [ ] `data/branshes/manifests/{slug}.json` が生成されている
- [ ] 失敗 0 件、または失敗 ID を報告

### 完了報告フォーマット

```
Phase A-1 完了: tops
- 商品数: 13 / 13
- 画像合計: 104 枚
- 平均枚数/商品: 8.0 枚
- 失敗: 0 件
- manifest: data/branshes/manifests/tops.json
```

---

## Branshes の HTML 構造（スクレイパー参考）

### カテゴリ一覧

- URL 例: `https://www.branshes.com/shop/c/ctops/`
- ページネーション: `?p=2`
- 商品リンク: `/shop/g/g{JAN13桁}/`
- サムネ: `//www.branshes.com/img/goods/s12-62-140-75_m.jpg`

### 商品詳細

- URL: `/shop/g/g4580802492976/`
- メタ JSON: `<meta property="etm:goods_detail" content="{...}">`
  - `name`, `price`, `sale_fg`, `variation_name1`（サイズ）, `variation_name2`（カラー）
- ギャラリー画像:
  - `/img/goods/11-65-365-04.jpg`（メイン）
  - `/img/goods/11-65-365-04_01.jpg` … `_07.jpg`

---

## Phase A-2 / B / C

```bash
node scripts/merge-manifests.mjs --out data/branshes/manifest.json \
  data/branshes/manifests/tops.json \
  data/branshes/manifests/outer.json \
  data/branshes/manifests/bottoms.json \
  data/branshes/manifests/onepiece.json \
  data/branshes/manifests/baby.json \
  data/branshes/manifests/shoes.json \
  data/branshes/manifests/legwear.json \
  data/branshes/manifests/bags.json \
  data/branshes/manifests/hats.json \
  data/branshes/manifests/underwear.json \
  data/branshes/manifests/pajamas.json \
  data/branshes/manifests/formal.json \
  data/branshes/manifests/other-goods.json

node scripts/build-products.mjs --manifest data/branshes/manifest.json
npm run build
```

---

## トラブルシュート

| 症状 | 対処 |
|------|------|
| 403 / アクセス拒否 | 間隔を 2 秒以上に。`curl_cffi` インストール確認 |
| 商品 0 件 | カテゴリ URL を `batch-plan.json` で確認。`/shop/c/ctops/` 形式を使う |
| 画像 8 枚未満 | 詳細ページの `_01`〜`_07` probe ログを確認。不足分は報告 |
| `build-products` で images 空 | `public/images/products/` にファイルがあるか確認 |
| 同一商品名が複数 | カラー・サイズ違いは別 JAN として正常。13 件は別 SKU で OK |

---

## Git に含める / 含めない

| コミットする | コミットしない（任意） |
|-------------|----------------------|
| `scripts/br_fetch.py` 等 | `public/images/products/`（容量大） |
| `data/branshes/configs/` | `data/branshes/manifests/*.json` |
| `docs/CLOUD_AGENT_BRANSHES.md` | |
| `requirements-br.txt` | |

---

## クラウドエージェントへのプロンプト（コピペ用）

以下をそのまま Cloud Agent に貼り付けて実行してください。

---

### プロンプト開始

```
coccoro-kids リポジトリで、Branshes（branshes.com）から商品画像を一括取得してください。

【必読】
docs/CLOUD_AGENT_BRANSHES.md
data/branshes/batch-plan.json

【ゴール】
- 13 カテゴリ × 13 商品 × 8 画像 = 最大 169 商品 / 1,352 画像
- public/images/products/{JAN}/01.jpg … 08.jpg
- lib/products.ts を build-products.mjs で更新
- npm run build 成功

【実行手順】
1. pip install -r requirements-br.txt  （または python3 -m pip install -r requirements-br.txt）
2. ./scripts/run-br-pipeline.sh
3. npm run build
4. 各カテゴリページ・商品詳細で画像 404 がないか確認

【報告形式】
- カテゴリ別: 商品数 / 画像合計 / 失敗 ID
- 全体: 169 商品中何件成功、画像合計、build 結果

【注意】
- Fetch MCP は使わず Shell で python/node を実行
- requestIntervalSec 1.5 秒以上を守る
- 失敗商品はスキップして続行し、最後に一覧報告
```

### プロンプト終了

---

## ファイル一覧

```
scripts/
  br_fetch.py           … Phase A-1（Branshes）
  merge-manifests.mjs   … Phase A-2
  build-products.mjs    … Phase B
  run-br-pipeline.sh    … 一括実行
data/branshes/
  batch-plan.json       … 13 カテゴリ定義
  configs/{slug}.json   … カテゴリ別設定
  manifests/{slug}.json … 出力（実行後）
  manifest.json         … 統合 manifest（実行後）
requirements-br.txt
docs/CLOUD_AGENT_BRANSHES.md
```
