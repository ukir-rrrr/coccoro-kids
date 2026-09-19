/**
 * 印刷用QRコード（SVG）を生成する。
 *
 *   npm i -D qrcode            # 初回のみ
 *   node scripts/make-qr.mjs "https://qianheb023com.com/" docs/samples/qr-mimora.svg
 *
 * 印刷物に載せる前提のため、以下を固定している。
 *  - ベクター（SVG）出力。ラスタと違い倍率を上げても輪郭が潰れない
 *  - 誤り訂正レベル Q（25%）。折り目・かすれ・汚れに強い
 *  - クワイエットゾーン 4モジュール（規格の最小値）を viewBox に含める
 *  - モジュールは #000000。CMYK変換でスミ1色になり、版ズレでエッジがぼけない
 *  - URLは英大文字化して符号化する。URLのスキームとホストは大文字小文字を
 *    区別しないため遷移先は変わらず、英数字モードで詰められるのでモジュール数を
 *    増やさずに誤り訂正を M(15%) から Q(25%) へ上げられる
 *    （小文字のままだとバイトモードになり、Qではモジュール数が一段増える）
 *    ※パスに大小を区別する文字列を含むURLでは、この大文字化は使えない
 */
import fs from "node:fs";
import path from "node:path";

const [url, out] = process.argv.slice(2);

if (!url || !out) {
  console.error('使い方: node scripts/make-qr.mjs "<URL>" <出力先.svg>');
  process.exit(1);
}

let QRCode;
try {
  QRCode = (await import("qrcode")).default;
} catch {
  console.error("qrcode パッケージが見つかりません。`npm i -D qrcode` を実行してください。");
  process.exit(1);
}

const MARGIN = 4;
const text = url.toUpperCase();
const qr = QRCode.create(text, { errorCorrectionLevel: "Q" });
const size = qr.modules.size;
const total = size + MARGIN * 2;

const d = [];
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    if (qr.modules.get(x, y)) d.push(`M${x + MARGIN} ${y + MARGIN}h1v1h-1z`);
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" shape-rendering="crispEdges" role="img" aria-label="${url}">
<title>${url}</title>
<path fill="#000000" d="${d.join("")}"/>
</svg>
`;

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);

console.log(
  `${out}\n  符号化文字列: ${text}\n  バージョン ${qr.version} / ${size}×${size} モジュール` +
    ` + クワイエットゾーン ${MARGIN} = ${total}\n  22mm角に配置した場合の1モジュール: ${(22 / total).toFixed(3)}mm`,
);
