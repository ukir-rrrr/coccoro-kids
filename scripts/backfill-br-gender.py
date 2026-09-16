#!/usr/bin/env python3
"""Branshes 商品ページの genre タグから gender を manifest に書き込む。"""

from __future__ import annotations

import json
import subprocess
import sys
import time
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
sys.path.insert(0, str(SCRIPT_DIR))

import br_fetch  # noqa: E402

MANIFESTS_DIR = PROJECT_ROOT / "data" / "branshes" / "manifests"
MERGED = PROJECT_ROOT / "data" / "branshes" / "manifest.json"
INTERVAL_SEC = 0.8


def patch_product(product: dict) -> str | None:
    url = product.get("itemUrl")
    goods_id = str(product.get("id") or "")
    if not url or not goods_id:
        return None
    try:
        page = br_fetch.fetch_html(url, referer="https://www.branshes.com/shop/")
    except Exception as exc:  # noqa: BLE001
        print(f"  skip {goods_id}: {exc}")
        return None
    gender = br_fetch.parse_gender_from_html(page, goods_id)
    if gender:
        product["gender"] = gender
    return gender


def update_file(path: Path) -> tuple[int, int]:
    data = json.loads(path.read_text(encoding="utf-8"))
    products = data.get("products") or []
    ok = 0
    for i, product in enumerate(products):
        if i > 0:
            time.sleep(INTERVAL_SEC)
        g = patch_product(product)
        if g:
            ok += 1
            print(f"  {product['id']}: {g}")
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    return ok, len(products)


def main() -> None:
    paths = sorted(MANIFESTS_DIR.glob("*.json"))
    total_ok = 0
    total = 0
    for path in paths:
        print(f"\n{path.name}")
        ok, count = update_file(path)
        total_ok += ok
        total += count
    print(f"\n更新: {total_ok}/{total}")

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
