#!/usr/bin/env python3
"""manifest の itemUrl から Branshes の価格を再取得し、各 manifests/*.json を更新する。"""

from __future__ import annotations

import json
import sys
import time
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
sys.path.insert(0, str(SCRIPT_DIR))

import br_fetch  # noqa: E402

MANIFESTS_DIR = PROJECT_ROOT / "data" / "branshes" / "manifests"
MERGED = PROJECT_ROOT / "data" / "branshes" / "manifest.json"
INTERVAL_SEC = 1.0


def patch_product(product: dict) -> bool:
    url = product.get("itemUrl")
    if not url:
        return False
    try:
        page = br_fetch.fetch_html(url, referer="https://www.branshes.com/shop/")
    except Exception as exc:  # noqa: BLE001
        print(f"  skip {product.get('id')}: {exc}")
        return False

    detail = br_fetch.parse_etm_detail(page)
    price = br_fetch.parse_yen(detail.get("price"))
    regular = br_fetch.parse_yen(detail.get("regular"))
    is_sale = str(detail.get("sale_fg", "")).lower() == "true"
    if price <= 0:
        return False

    product["price"] = price
    product["regularPrice"] = regular
    product["isSale"] = is_sale
    return True


def update_manifest_file(path: Path) -> tuple[int, int]:
    data = json.loads(path.read_text(encoding="utf-8"))
    products = data.get("products") or []
    ok = 0
    for i, product in enumerate(products):
        if i > 0:
            time.sleep(INTERVAL_SEC)
        if patch_product(product):
            ok += 1
            print(f"  {product['id']}: ¥{product['price']}")
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    return ok, len(products)


def main() -> None:
    paths = sorted(MANIFESTS_DIR.glob("*.json"))
    if not paths:
        print("manifests が見つかりません")
        sys.exit(1)

    total_ok = 0
    total = 0
    for path in paths:
        print(f"\n{path.name}")
        ok, count = update_manifest_file(path)
        total_ok += ok
        total += count

    print(f"\n更新: {total_ok}/{total} 商品")

    if MERGED.exists():
        import subprocess

        subprocess.run(
            [
                "node",
                str(SCRIPT_DIR / "merge-manifests.mjs"),
                "--out",
                str(MERGED),
                *[str(p) for p in paths],
            ],
            check=True,
            cwd=PROJECT_ROOT,
        )
        subprocess.run(
            [
                "node",
                str(SCRIPT_DIR / "build-products.mjs"),
                "--manifest",
                str(MERGED),
            ],
            check=True,
            cwd=PROJECT_ROOT,
        )


if __name__ == "__main__":
    main()
