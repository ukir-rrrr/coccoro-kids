#!/usr/bin/env python3
"""
Phase A (branshes.com): ブランシェスから商品画像を収集し manifest.json を出力する。

【出力】
  data/branshes/manifests/{slug}.json
  public/images/products/{goods_id}/01.jpg … 08.jpg

【設定】
  data/branshes/configs/{slug}.json

【実行例】
  python scripts/br_fetch.py --config data/branshes/configs/tops.json
  python scripts/br_fetch.py --max-products 13
"""

from __future__ import annotations

import argparse
import html
import json
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone
from pathlib import Path
from threading import Lock
from urllib.parse import urljoin, urlparse

import requests

try:
    from curl_cffi import requests as curl_requests

    USE_CURL_CFFI = True
except ImportError:
    curl_requests = None
    USE_CURL_CFFI = False

IMPERSONATE = "chrome120"

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
DEFAULT_CONFIG_PATH = PROJECT_ROOT / "data" / "branshes" / "configs" / "tops.json"

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)

JST = timezone(timedelta(hours=9))
print_lock = Lock()

PRODUCT_HREF_RE = re.compile(r'href="/shop/g/g(\d+)/"', re.I)
LISTING_BLOCK_RE = re.compile(
    r'href="/shop/g/g(\d+)/"[^>]*title="([^"]*)"[^>]*>.*?'
    r'<img[^>]+data-ref-goods="\1"[^>]+src="([^"]+)"',
    re.I | re.S,
)
THUMB_BASE_RE = re.compile(
    r"/img/goods/s?(\d{2}-\d{2}-\d{3}-\d{2})(?:_m)?\.jpg",
    re.I,
)
ETM_META_RE = re.compile(
    r'property="etm:goods_detail"\s+content="([^"]+)"',
    re.I,
)
DETAIL_IMG_RE = re.compile(
    r"/img/goods/(\d{2}-\d{2}-\d{3}-\d{2})(?:_(\d{2}))?\.jpg",
    re.I,
)
GENDER_FOR_GOODS_RE = re.compile(
    r'"genre":"(boy|girl|baby)"[^}]*"goods":"(\d+)"',
    re.I,
)
GENDER_GENRE_RE = re.compile(r'"genre":"(boy|girl|baby)"', re.I)


@dataclass
class Config:
    base_url: str = "https://www.branshes.com"
    category_urls: list[str] = field(default_factory=list)
    max_products: int = 13
    max_images_per_product: int = 8
    request_interval_sec: float = 1.5
    concurrency: int = 2
    default_category_slug: str = "tops"
    category_href: str = "/category/tops"
    manifest_path: Path = field(
        default_factory=lambda: PROJECT_ROOT / "data" / "branshes" / "manifest.json"
    )
    images_dir: Path = field(
        default_factory=lambda: PROJECT_ROOT / "public" / "images" / "products"
    )
    images_web_path: str = "/images/products"


def log(msg: str) -> None:
    with print_lock:
        print(msg, flush=True)


def resolve_project_path(raw_path: str | Path) -> Path:
    path = Path(raw_path)
    if path.is_absolute():
        return path
    return PROJECT_ROOT / path


def load_config(path: Path) -> Config:
    raw = {}
    if path.is_file():
        raw = json.loads(path.read_text(encoding="utf-8"))

    category_urls = raw.get("categoryUrls") or []
    if not category_urls and raw.get("categoryUrl"):
        category_urls = [raw["categoryUrl"]]

    manifest_path = resolve_project_path(
        raw.get("manifestPath", "data/branshes/manifest.json")
    )
    if manifest_path.suffix != ".json":
        manifest_path = manifest_path / "manifest.json"

    return Config(
        base_url=raw.get("baseUrl", "https://www.branshes.com").rstrip("/"),
        category_urls=category_urls,
        max_products=int(raw.get("maxProducts", 13)),
        max_images_per_product=int(raw.get("maxImagesPerProduct", 8)),
        request_interval_sec=float(raw.get("requestIntervalSec", 1.5)),
        concurrency=max(1, min(3, int(raw.get("concurrency", 2)))),
        default_category_slug=raw.get("defaultCategorySlug", "tops"),
        category_href=raw.get("categoryHref", "/category/tops"),
        manifest_path=manifest_path,
        images_dir=resolve_project_path(raw.get("imagesDir", "public/images/products")),
        images_web_path=raw.get("imagesWebPath", "/images/products").rstrip("/"),
    )


def create_session() -> requests.Session:
    session = requests.Session()
    session.headers.update(
        {
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "ja,en-US;q=0.9,en;q=0.8",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
        }
    )
    return session


FALLBACK_SESSION = create_session()


def http_get(url: str, *, referer: str | None = None, timeout: float = 30, **kwargs):
    headers = dict(kwargs.pop("headers", {}))
    if referer:
        headers.setdefault("Referer", referer)
    if USE_CURL_CFFI:
        return curl_requests.get(
            url,
            headers=headers,
            timeout=timeout,
            impersonate=IMPERSONATE,
            **kwargs,
        )
    return FALLBACK_SESSION.get(url, headers=headers, timeout=timeout, **kwargs)


def http_head(url: str, *, referer: str | None = None, timeout: float = 15, **kwargs):
    headers = dict(kwargs.pop("headers", {}))
    headers.setdefault("User-Agent", USER_AGENT)
    if referer:
        headers.setdefault("Referer", referer)
    if USE_CURL_CFFI:
        return curl_requests.head(
            url,
            headers=headers,
            timeout=timeout,
            impersonate=IMPERSONATE,
            **kwargs,
        )
    return FALLBACK_SESSION.head(url, headers=headers, timeout=timeout, **kwargs)


def fetch_html(url: str, referer: str | None = None) -> str:
    res = http_get(url, referer=referer, timeout=30)
    res.raise_for_status()
    return html.unescape(res.text)


def category_page_url(base_category: str, page: int) -> str:
    if page <= 1:
        return base_category
    sep = "&" if "?" in base_category else "?"
    return f"{base_category}{sep}p={page}"


def product_url(base: str, goods_id: str) -> str:
    return f"{base.rstrip('/')}/shop/g/g{goods_id}/"


def thumb_to_image_base(thumb_src: str) -> str | None:
    match = THUMB_BASE_RE.search(thumb_src)
    return match.group(1) if match else None


def extract_listing_products(page_html: str, base_url: str) -> list[dict]:
    products: list[dict] = []
    seen: set[str] = set()

    for match in LISTING_BLOCK_RE.finditer(page_html):
        goods_id, name, thumb_src = match.group(1), match.group(2), match.group(3)
        if goods_id in seen:
            continue
        image_base = thumb_to_image_base(thumb_src)
        if not image_base:
            continue
        seen.add(goods_id)
        products.append(
            {
                "id": goods_id,
                "goodsId": goods_id,
                "name": clean_product_name(name),
                "itemUrl": product_url(base_url, goods_id),
                "imageBase": image_base,
                "thumbSrc": thumb_src,
            }
        )

    if products:
        return products

    for goods_id in PRODUCT_HREF_RE.findall(page_html):
        if goods_id in seen:
            continue
        seen.add(goods_id)
        products.append(
            {
                "id": goods_id,
                "goodsId": goods_id,
                "name": goods_id,
                "itemUrl": product_url(base_url, goods_id),
                "imageBase": "",
                "thumbSrc": "",
            }
        )

    return products


def collect_product_urls(cfg: Config) -> list[dict]:
    products: list[dict] = []
    seen: set[str] = set()

    for category_url in cfg.category_urls:
        for page in range(1, 21):
            if len(products) >= cfg.max_products:
                break
            page_url = category_page_url(category_url, page)
            try:
                page_html = fetch_html(page_url, referer=cfg.base_url + "/shop/")
            except requests.RequestException as exc:
                log(f"  カテゴリ取得失敗 ({page_url}): {exc}")
                break

            page_products = extract_listing_products(page_html, cfg.base_url)
            if not page_products:
                break

            added = 0
            for stub in page_products:
                goods_id = stub["goodsId"]
                if goods_id in seen:
                    continue
                seen.add(goods_id)
                stub["rank"] = len(products) + 1
                products.append(stub)
                added += 1
                if len(products) >= cfg.max_products:
                    break

            log(f"  カテゴリ {page_url} → +{added}件（累計 {len(products)}件）")
            if added == 0:
                break
            time.sleep(cfg.request_interval_sec)

    return products[: cfg.max_products]


def clean_product_name(name: str) -> str:
    cleaned = name.strip()
    cleaned = re.sub(r"★[^★]*★", "", cleaned)
    cleaned = re.sub(r"【[^】]*】", " ", cleaned)
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    return cleaned or name.strip()


def parse_etm_detail(page_html: str) -> dict:
    marker = 'property="etm:goods_detail"'
    idx = page_html.find(marker)
    if idx >= 0:
        content_key = 'content="'
        start = page_html.find(content_key, idx)
        if start >= 0:
            start += len(content_key)
            if start < len(page_html) and page_html[start] == "{":
                depth = 0
                for pos in range(start, min(start + 8000, len(page_html))):
                    char = page_html[pos]
                    if char == "{":
                        depth += 1
                    elif char == "}":
                        depth -= 1
                        if depth == 0:
                            try:
                                return json.loads(page_html[start : pos + 1])
                            except json.JSONDecodeError:
                                break

    match = ETM_META_RE.search(page_html)
    if not match:
        return {}
    try:
        return json.loads(html.unescape(match.group(1)))
    except json.JSONDecodeError:
        return {}


def parse_gender_from_html(page_html: str, goods_id: str) -> str | None:
    for match in GENDER_FOR_GOODS_RE.finditer(page_html):
        gender, gid = match.group(1).lower(), match.group(2)
        if gid == goods_id:
            return gender
    match = GENDER_GENRE_RE.search(page_html)
    return match.group(1).lower() if match else None


def parse_yen(value: object) -> int:
    text = str(value or "").strip().replace(",", "")
    if not text or not text.isdigit():
        return 0
    return int(text)


def infer_image_base_from_detail(page_html: str, fallback: str) -> str:
    if fallback:
        return fallback
    detail = parse_etm_detail(page_html)
    bases: set[str] = set()
    for match in DETAIL_IMG_RE.finditer(page_html):
        bases.add(match.group(1))
    if not bases:
        return ""
    item_code = str(detail.get("item_code", "")).replace("-", "")
    for base in sorted(bases):
        compact = base.replace("-", "")
        if item_code and compact.startswith(item_code[:6]):
            return base
    return sorted(bases)[0]


def build_image_urls(base: str, max_images: int) -> list[str]:
    if not base:
        return []
    root = f"https://www.branshes.com/img/goods/{base}.jpg"
    ordered = [root]
    for index in range(1, max_images):
        ordered.append(f"https://www.branshes.com/img/goods/{base}_{index:02d}.jpg")
    return ordered


def probe_image_urls(candidates: list[str], max_images: int) -> list[str]:
    found: list[str] = []
    referer = "https://www.branshes.com/shop/"
    for url in candidates:
        if len(found) >= max_images:
            break
        try:
            res = http_head(url, referer=referer, timeout=15, allow_redirects=True)
            if res.status_code == 200:
                found.append(url)
        except requests.RequestException:
            continue
        time.sleep(0.1)
    return found


def extract_ordered_image_urls(
    page_html: str, image_base: str, max_images: int
) -> list[str]:
    base = infer_image_base_from_detail(page_html, image_base)
    candidates = build_image_urls(base, max_images)
    found = probe_image_urls(candidates, max_images)
    if found:
        return found

    detail_bases: dict[str, None] = {}
    for match in DETAIL_IMG_RE.finditer(page_html):
        if match.group(2) is None:
            detail_bases[match.group(1)] = None
    for candidate_base in detail_bases:
        found = probe_image_urls(build_image_urls(candidate_base, max_images), max_images)
        if found:
            return found
    return []


def guess_extension(url: str, content_type: str | None) -> str:
    path = urlparse(url).path.lower()
    for ext in (".jpg", ".jpeg", ".png", ".webp", ".gif"):
        if path.endswith(ext):
            return ext
    if content_type:
        if "jpeg" in content_type:
            return ".jpg"
        if "png" in content_type:
            return ".png"
        if "webp" in content_type:
            return ".webp"
    return ".jpg"


def download_image(url: str, save_path: Path, referer: str) -> Path:
    if save_path.exists() and save_path.stat().st_size > 0:
        return save_path

    res = http_get(url, referer=referer, timeout=30)
    res.raise_for_status()
    ext = guess_extension(url, res.headers.get("Content-Type"))
    if save_path.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp", ".gif"}:
        save_path = save_path.with_suffix(ext)
    save_path.parent.mkdir(parents=True, exist_ok=True)
    save_path.write_bytes(res.content)
    return save_path


def enrich_product(cfg: Config, product: dict) -> dict:
    try:
        detail_html = fetch_html(product["itemUrl"], referer=cfg.base_url + "/shop/")
    except requests.RequestException as exc:
        raise ValueError(f"詳細ページ取得失敗: {exc}") from exc

    detail = parse_etm_detail(detail_html)
    name = clean_product_name(detail.get("name") or product.get("name") or product["goodsId"])
    price = parse_yen(detail.get("price"))
    regular = parse_yen(detail.get("regular"))
    is_sale = str(detail.get("sale_fg", "")).lower() == "true"
    image_base = infer_image_base_from_detail(detail_html, product.get("imageBase", ""))
    image_urls = extract_ordered_image_urls(
        detail_html, image_base, cfg.max_images_per_product
    )

    product["name"] = name
    product["price"] = price
    product["regularPrice"] = regular
    product["isSale"] = is_sale
    product["imageBase"] = image_base
    product["imageUrls"] = image_urls
    product["brand"] = detail.get("brand_name") or "branshes"
    product["color"] = detail.get("variation_name2") or ""
    product["size"] = detail.get("variation_name1") or ""
    product["itemCode"] = f"br:{product['goodsId']}"
    product["categoryHref"] = cfg.category_href
    product["gender"] = parse_gender_from_html(detail_html, product["goodsId"])
    return product


def process_product(cfg: Config, product: dict) -> dict:
    product_id = product["goodsId"]
    source_urls = product.get("imageUrls") or []
    if not source_urls:
        raise ValueError("画像 URL が見つかりません")

    image_dir = cfg.images_dir / product_id
    saved_paths: list[str] = []
    saved_sources: list[str] = []

    for index, url in enumerate(source_urls, start=1):
        target = image_dir / f"{index:02d}"
        try:
            saved = download_image(url, target, product["itemUrl"])
            web_path = f"{cfg.images_web_path}/{product_id}/{saved.name}"
            saved_paths.append(web_path)
            saved_sources.append(url)
            log(f"    [{product_id}] 保存: {saved.name}")
        except requests.RequestException as exc:
            log(f"    [{product_id}] 画像{index}失敗: {exc}")

    if not saved_paths:
        raise ValueError("画像の保存にすべて失敗しました")

    return {
        "id": product_id,
        "slug": product_id,
        "name": product.get("name") or product_id,
        "price": parse_yen(product.get("price")),
        "regularPrice": parse_yen(product.get("regularPrice")),
        "isSale": bool(product.get("isSale")),
        "brand": product.get("brand") or "branshes",
        "categorySlug": cfg.default_category_slug,
        "categoryHref": product.get("categoryHref") or cfg.category_href,
        "itemUrl": product.get("itemUrl", ""),
        "itemCode": product.get("itemCode", product_id),
        "rank": product.get("rank"),
        "color": product.get("color") or "",
        "size": product.get("size") or "",
        "gender": product.get("gender") or "",
        "images": saved_paths,
        "sourceUrls": saved_sources,
    }


def write_manifest(cfg: Config, products: list[dict]) -> Path:
    manifest = {
        "generatedAt": datetime.now(JST).isoformat(),
        "source": {
            "site": "branshes.com",
            "baseUrl": cfg.base_url,
            "categoryUrls": cfg.category_urls,
            "categorySlug": cfg.default_category_slug,
            "categoryHref": cfg.category_href,
        },
        "products": products,
    }
    cfg.manifest_path.parent.mkdir(parents=True, exist_ok=True)
    cfg.manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    return cfg.manifest_path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="branshes.com 商品画像収集 + manifest 生成"
    )
    parser.add_argument("--config", type=Path, default=DEFAULT_CONFIG_PATH, help="設定 JSON")
    parser.add_argument("--max-products", type=int, help="取得商品数上書き")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    config_path = args.config
    if not config_path.is_absolute():
        config_path = PROJECT_ROOT / config_path

    cfg = load_config(config_path)
    if args.max_products:
        cfg.max_products = args.max_products

    if not cfg.category_urls:
        print("エラー: categoryUrls が設定されていません")
        sys.exit(1)

    cfg.images_dir.mkdir(parents=True, exist_ok=True)

    log("=== branshes.com 画像収集 (coccoro-kids) ===")
    log(f"categorySlug   : {cfg.default_category_slug}")
    log(f"categoryHref   : {cfg.category_href}")
    log(f"maxProducts    : {cfg.max_products}")
    log(f"maxImages/prod : {cfg.max_images_per_product}")
    log(f"concurrency    : {cfg.concurrency}")
    log(f"manifest       : {cfg.manifest_path}")
    log(f"imagesDir      : {cfg.images_dir}")
    if USE_CURL_CFFI:
        log("http client     : curl_cffi (Chrome TLS impersonation)")
    else:
        log("http client     : requests (install curl_cffi if blocked)")

    product_stubs = collect_product_urls(cfg)
    if not product_stubs:
        log("商品が見つかりませんでした。")
        sys.exit(1)

    log(f"\n商品メタデータ取得 ({len(product_stubs)} 件)...")
    products: list[dict] = []
    for index, stub in enumerate(product_stubs, start=1):
        if index > 1:
            time.sleep(cfg.request_interval_sec)
        try:
            enriched = enrich_product(cfg, stub)
            products.append(enriched)
            log(
                f"  [{stub['id']}] {enriched.get('name', '')[:50]} "
                f"({len(enriched.get('imageUrls', []))}枚)"
            )
        except Exception as exc:  # noqa: BLE001
            log(f"  [{stub['id']}] メタデータ取得失敗: {exc}")

    if not products:
        log("処理可能な商品がありませんでした。")
        sys.exit(1)

    log(f"\n画像ダウンロード開始 ({len(products)} 件)...")
    manifest_products: list[dict] = []
    failures: list[str] = []

    with ThreadPoolExecutor(max_workers=cfg.concurrency) as executor:
        futures = {
            executor.submit(process_product, cfg, product): product for product in products
        }
        for future in as_completed(futures):
            product = futures[future]
            try:
                result = future.result()
                manifest_products.append(result)
                log(
                    f"[完了] {result['id']} "
                    f"({len(result['images'])}枚) {result['name'][:50]}"
                )
            except Exception as exc:  # noqa: BLE001
                failures.append(product.get("id", "unknown"))
                log(f"[失敗] {product.get('id')}: {exc}")

    manifest_products.sort(
        key=lambda p: (p.get("rank") is None, p.get("rank") or 9999, p["id"])
    )
    manifest_path = write_manifest(cfg, manifest_products)

    total_images = sum(len(p["images"]) for p in manifest_products)
    avg_images = total_images / len(manifest_products) if manifest_products else 0

    log("\n=== Phase A 完了 (branshes) ===")
    log(f"商品数     : {len(manifest_products)} / {cfg.max_products}")
    log(f"画像合計   : {total_images} 枚")
    log(f"平均枚数   : {avg_images:.1f} 枚/商品")
    log(f"失敗       : {len(failures)} 件")
    if failures:
        log(f"失敗ID     : {', '.join(failures[:10])}")
    log(f"manifest   : {manifest_path}")
    log(f"images     : {cfg.images_dir}")


if __name__ == "__main__":
    main()
