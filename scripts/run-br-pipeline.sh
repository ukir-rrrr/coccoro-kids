#!/usr/bin/env bash
# Branshes 商品画像一括取得パイプライン（coccoro-kids）
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

ONLY="${1:-}"

if ! python3 -c "import requests" 2>/dev/null; then
  python3 -m pip install -r requirements-br.txt || pip3 install -r requirements-br.txt
fi

CONFIGS=(
  tops outer bottoms onepiece baby shoes legwear bags hats underwear pajamas formal other-goods
)

run_one() {
  local slug="$1"
  local cfg="data/branshes/configs/${slug}.json"
  echo ""
  echo "========== Phase A-1: ${slug} =========="
  python3 scripts/br_fetch.py --config "$cfg"
}

if [[ -n "$ONLY" ]]; then
  run_one "$ONLY"
else
  for slug in "${CONFIGS[@]}"; do
    run_one "$slug"
  done
fi

echo ""
echo "========== Phase A-2: merge manifests =========="
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

echo ""
echo "========== Phase B: build products.ts =========="
node scripts/build-products.mjs --manifest data/branshes/manifest.json

echo ""
echo "========== Phase C: build check =========="
npm run build

echo ""
echo "完了: data/branshes/manifest.json / lib/products.ts / public/images/products/"
