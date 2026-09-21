#!/usr/bin/env python3
"""
Amorosa mamma (Shopify) コレクションから商品画像 + manifest を取得。

例:
  python scripts/amorosa_fetch.py
  python scripts/amorosa_fetch.py --collection-url 'https://amorosa-mamma.yousei.co.jp/collections/all/スタイ'
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import quote, unquote, urljoin, urlparse

import requests

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
DEFAULT_COLLECTION = (
    "https://amorosa-mamma.yousei.co.jp/collections/all/%E3%82%B9%E3%82%BF%E3%82%A4"
)
BASE_URL = "https://amorosa-mamma.yousei.co.jp"
IMAGES_DIR = PROJECT_ROOT / "public" / "images" / "products"
MANIFEST_PATH = PROJECT_ROOT / "data" / "amorosa" / "manifest.json"
MAX_IMAGES = 8
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)
JST = timezone(timedelta(hours=9))

PRODUCT_HREF_RE = re.compile(r'href="(/products/[^"?#]+)"')


def log(msg: str) -> None:
    print(msg, flush=True)


def session() -> requests.Session:
    s = requests.Session()
    s.headers.update({"User-Agent": USER_AGENT, "Accept-Language": "ja,en;q=0.9"})
    return s


def fetch_collection_handles(s: requests.Session, collection_url: str) -> list[str]:
    res = s.get(collection_url, timeout=60)
    res.raise_for_status()
    handles: list[str] = []
    for match in PRODUCT_HREF_RE.finditer(res.text):
        path = match.group(1)
        if path.endswith("\\"):
            continue
        handle = unquote(path.removeprefix("/products/").strip("/"))
        if handle and handle not in handles:
            handles.append(handle)
    return handles


def fetch_product(s: requests.Session, handle: str) -> dict:
    url = f"{BASE_URL}/products/{handle}.json"
    res = s.get(url, timeout=60)
    res.raise_for_status()
    return res.json()["product"]


def guess_ext(url: str, content_type: str | None) -> str:
    path = urlparse(url).path.lower()
    for ext in (".jpg", ".jpeg", ".png", ".webp", ".gif"):
        if path.endswith(ext):
            return ext if ext != ".jpeg" else ".jpg"
    if content_type:
        if "png" in content_type:
            return ".png"
        if "webp" in content_type:
            return ".webp"
        if "gif" in content_type:
            return ".gif"
    return ".jpg"


def product_page_url(handle: str) -> str:
    return f"{BASE_URL}/products/{quote(handle, safe='')}"


def download_image(s: requests.Session, url: str, dest: Path, referer: str) -> Path:
    if dest.exists() and dest.stat().st_size > 0:
        return dest
    # Referer に日本語 handle があると requests が latin-1 エラーになるため URL エンコード
    safe_referer = quote(referer, safe=":/?&=#%")
    res = s.get(url, timeout=60, headers={"Referer": safe_referer})
    res.raise_for_status()
    ext = guess_ext(url, res.headers.get("Content-Type"))
    if dest.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp", ".gif"}:
        dest = dest.with_suffix(ext)
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(res.content)
    return dest


def slug_for_product(product: dict) -> str:
    handle = str(product.get("handle") or product.get("id"))
    # ファイルパス用（英数字・日本語はそのまま可）
    return handle.replace("/", "-")


def process_product(s: requests.Session, product: dict, rank: int) -> dict:
    slug = slug_for_product(product)
    product_id = f"am-{product['id']}"
    item_url = product_page_url(str(product["handle"]))
    images = product.get("images") or []
    if not images:
        raise ValueError("画像がありません")

    image_dir = IMAGES_DIR / slug
    saved_web: list[str] = []
    saved_src: list[str] = []

    for i, img in enumerate(images[:MAX_IMAGES], start=1):
        src = img.get("src")
        if not src:
            continue
        # 高解像度（Shopify CDN はそのまま URL で十分なことが多い）
        target = image_dir / f"{i:02d}"
        try:
            saved = download_image(s, src, target, referer=item_url)
            web = f"/images/products/{slug}/{saved.name}"
            saved_web.append(web)
            saved_src.append(src)
            log(f"  [{slug}] {saved.name}")
        except requests.RequestException as exc:
            log(f"  [{slug}] 画像{i}失敗: {exc}")

    if not saved_web:
        raise ValueError("画像の保存にすべて失敗しました")

    variant = (product.get("variants") or [{}])[0]
    price = int(float(variant.get("price") or 0))

    return {
        "id": product_id,
        "slug": slug,
        "name": product.get("title") or slug,
        "price": price,
        "brand": "amorosa-mamma",
        "categorySlug": "accessories",
        "categoryHref": "/category/accessories",
        "gender": "baby",
        "itemUrl": item_url,
        "itemCode": variant.get("sku") or product_id,
        "rank": rank,
        "color": "",
        "size": variant.get("title") if variant.get("title") != "Default Title" else "FREE",
        "images": saved_web,
        "sourceUrls": saved_src,
        "tags": product.get("tags") or [],
        "productType": product.get("product_type") or "",
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Amorosa mamma 商品画像収集")
    parser.add_argument("--collection-url", default=DEFAULT_COLLECTION)
    parser.add_argument("--max-products", type=int, default=0, help="0=一覧の全件")
    parser.add_argument(
        "--merge",
        action="store_true",
        help="既存 manifest.json の商品を残し、新規 slug のみ追加",
    )
    args = parser.parse_args()

    s = session()
    log(f"=== Amorosa mamma 収集 ===")
    log(f"collection: {args.collection_url}")

    handles = fetch_collection_handles(s, args.collection_url)
    if args.max_products > 0:
        handles = handles[: args.max_products]
    log(f"handles: {len(handles)}")

    if not handles:
        print("商品が見つかりませんでした")
        sys.exit(1)

    results: list[dict] = []
    for rank, handle in enumerate(handles, start=1):
        log(f"[{rank}/{len(handles)}] {handle}")
        try:
            product = fetch_product(s, handle)
            entry = process_product(s, product, rank)
            results.append(entry)
        except (requests.RequestException, ValueError, KeyError) as exc:
            log(f"  スキップ: {exc}")
        time.sleep(0.3)

    products = results
    if args.merge and MANIFEST_PATH.exists():
        try:
            prev = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
            seen = {p["slug"] for p in prev.get("products", [])}
            products = list(prev.get("products", []))
            added = 0
            for entry in results:
                if entry["slug"] in seen:
                    continue
                products.append(entry)
                seen.add(entry["slug"])
                added += 1
            log(f"merge: kept {len(products) - added} existing, added {added} new")
        except (json.JSONDecodeError, KeyError) as exc:
            log(f"merge skipped ({exc}), using fetch results only")

    manifest = {
        "generatedAt": datetime.now(JST).isoformat(),
        "source": {
            "site": "amorosa-mamma.yousei.co.jp",
            "collectionUrl": args.collection_url,
            "categoryHref": "/category/accessories",
        },
        "products": products,
    }
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    log(f"done: {len(results)} products -> {MANIFEST_PATH}")


if __name__ == "__main__":
    main()
