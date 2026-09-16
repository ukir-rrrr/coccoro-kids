// @ts-check
/**
 * Branshes manifest の price（公式表示価格）をそのまま店舗に反映する。
 * SALE 表示は行わない（price のみ）。
 */

/** @type {Record<string, [number, number]>} */
const CATEGORY_BANDS = {
  tops: [1280, 2680],
  outer: [2980, 4980],
  bottoms: [1480, 2980],
  onepiece: [1780, 3980],
  baby: [1580, 3280],
  shoes: [1980, 3980],
  legwear: [480, 1280],
  bags: [1980, 3980],
  hats: [980, 2280],
  underwear: [780, 1480],
  pajamas: [1980, 3680],
  formal: [3480, 5980],
  "other-goods": [580, 2480],
};

/** @param {string} id */
function hashId(id) {
  let h = 0;
  for (const ch of String(id)) {
    h = (Math.imul(31, h) + ch.charCodeAt(0)) >>> 0;
  }
  return h;
}

/** @param {object} product */
function inferDemoPrice(product) {
  const slug = String(product.categorySlug ?? "tops");
  const [min, max] = CATEGORY_BANDS[slug] ?? [1280, 2680];
  const name = String(product.name ?? "");
  const h = hashId(product.id ?? name);
  let amount = min + ((h % 1000) / 1000) * (max - min);
  return Math.round(amount);
}

/**
 * @param {object} product
 * @returns {{ price: number }}
 */
export function resolveStorePrice(product) {
  const scraped = Number(product.price) || 0;
  const price = scraped > 0 ? scraped : inferDemoPrice(product);
  return { price };
}
