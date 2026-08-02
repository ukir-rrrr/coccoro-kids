/**
 * generate-placeholders.mjs
 *
 * DESIGN.txt の「33. 画像配置リスト」に基づき、
 * 本番と同じファイルパス・ファイル名・アスペクト比のダミー画像を一括生成します。
 *
 * 使い方:
 *   1. Next.js プロジェクトのルートで実行してください
 *   2. 依存パッケージをインストール: npm install --save-dev sharp
 *   3. スクリプトを配置: scripts/generate-placeholders.mjs としてこのファイルを保存
 *   4. 実行: node scripts/generate-placeholders.mjs
 *
 * 後で本番画像に差し替える際は、同じファイル名・パスに実画像を上書きするだけでOKです。
 * （アスペクト比を本番画像でも合わせることで、レイアウト崩れを防げます）
 */

import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";

// 出力先のベースディレクトリ（Next.js の public フォルダ）
const OUTPUT_BASE = path.resolve(process.cwd(), "public");

// カラーパレット（DESIGN.txt のアクセントカラーをローテーションして使用）
const PALETTE = ["#ff7a8a", "#ffc94d", "#ffe3e8", "#fff6dc", "#f3f4f6"];

/**
 * 画像定義リスト
 * DESIGN.txt「33. 画像配置リスト」+ ロゴ類を網羅
 * width/height は DESIGN.txt「4. プロダクトカード」(4:3→変更後は1:1)、
 * 「13. 画像・メディア」の指定に準拠
 */
const IMAGES = [
  // ロゴ類
  { file: "images/logo.png", w: 240, h: 60, label: "logo.png" },
  { file: "images/icon.png", w: 64, h: 64, label: "icon.png" },

  // 共通UI画像（ヒーロー系は16:9、about/empty-cartは4:3）
  { file: "images/common/hero_01.jpg", w: 1600, h: 900, label: "hero_01\n1600x900" },
  { file: "images/common/hero_02.jpg", w: 1600, h: 900, label: "hero_02\n1600x900\n(text_overlay)" },
  { file: "images/common/about.jpg", w: 1200, h: 800, label: "about\n1200x800" },
  { file: "images/common/empty-cart.jpg", w: 800, h: 800, label: "empty-cart\n800x800" },

  // 商品画像（カード=1:1、詳細=1:1）DESIGN.txt「4. プロダクトカード」準拠
  { file: "images/products/tshirt/01.jpg", w: 1000, h: 1000, label: "tshirt/01\n1000x1000" },
  { file: "images/products/tshirt/main.jpg", w: 1000, h: 1000, label: "tshirt/main\n1000x1000" },
  { file: "images/products/onepiece/01.jpg", w: 1000, h: 1000, label: "onepiece/01\n1000x1000" },
  { file: "images/products/onepiece/main.jpg", w: 1000, h: 1000, label: "onepiece/main\n1000x1000" },
  { file: "images/products/pajama/01.jpg", w: 1000, h: 1000, label: "pajama/01\n1000x1000" },
  { file: "images/products/rompers/01.jpg", w: 1000, h: 1000, label: "rompers/01\n1000x1000" },
  { file: "images/products/sneaker/01.jpg", w: 1000, h: 1000, label: "sneaker/01\n1000x1000" },
  { file: "images/products/backpack/01.jpg", w: 1000, h: 1000, label: "backpack/01\n1000x1000" },
];

function buildSvg(width, height, bgColor, label) {
  const lines = label.split("\n");
  const fontSize = Math.max(14, Math.round(Math.min(width, height) / 14));
  const lineHeight = fontSize * 1.3;
  const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;

  const textNodes = lines
    .map((line, i) => {
      const y = startY + i * lineHeight;
      return `<text x="50%" y="${y}" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="${fontSize}" fill="#333333">${escapeXml(
        line
      )}</text>`;
    })
    .join("\n");

  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${bgColor}" />
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="none" stroke="#d1d5db" stroke-width="2" />
  <text x="50%" y="${height - 16}" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#9ca3af">${width}×${height} placeholder</text>
  ${textNodes}
</svg>`;
}

function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function generateOne(image, index) {
  const outPath = path.join(OUTPUT_BASE, image.file);
  await mkdir(path.dirname(outPath), { recursive: true });

  const bgColor = PALETTE[index % PALETTE.length];
  const svg = buildSvg(image.w, image.h, bgColor, image.label);
  const buffer = Buffer.from(svg);

  const pipeline = sharp(buffer);
  if (outPath.endsWith(".png")) {
    await pipeline.png().toFile(outPath);
  } else {
    await pipeline.jpeg({ quality: 85 }).toFile(outPath);
  }
  console.log(`generated: ${path.relative(process.cwd(), outPath)} (${image.w}x${image.h})`);
}

async function main() {
  console.log(`出力先: ${OUTPUT_BASE}`);
  for (let i = 0; i < IMAGES.length; i++) {
    await generateOne(IMAGES[i], i);
  }
  console.log(`\n完了: ${IMAGES.length}件のプレースホルダー画像を生成しました。`);
  console.log("本番画像が用意でき次第、同じファイル名・パスに上書きしてください。");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
