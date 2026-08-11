import type { Metadata } from "next";
import { M_PLUS_Rounded_1c, Noto_Sans_JP } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const mPlusRounded1c = M_PLUS_Rounded_1c({
  variable: "--font-m-plus-rounded",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MIMORA（ミモラ）",
  description:
    "小さな「好き」に、めいっぱい似合うを。厳選ブランドの子供服・ベビー用品を、コーディネート提案とランキングから選べるキッズ用品セレクトストア MIMORA。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${mPlusRounded1c.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-[#333333]">
        <FavoritesProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
