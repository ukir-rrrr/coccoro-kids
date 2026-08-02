import type { Config } from "tailwindcss";

// DESIGN.txt「1. デザインサマリー」のアクセントカラーをテーマに登録
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent1: "#ff7a8a", // コーラルピンク／セール・CTA・お気に入り等の主要アクション
        accent2: "#ffc94d", // マスタードイエロー／NEW・バッジ・サブアクション
      },
    },
  },
};

export default config;
