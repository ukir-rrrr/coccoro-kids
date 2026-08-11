import HeroCarousel from "@/components/HeroCarousel";
import GenderNav from "@/components/GenderNav";
import CategoryGrid from "@/components/CategoryGrid";
import FeatureSection from "@/components/FeatureSection";
import RankingSection from "@/components/RankingSection";
import KeywordTags from "@/components/KeywordTags";
import BrandSection from "@/components/BrandSection";
import StylingSection from "@/components/StylingSection";
import CategoryTextLinks from "@/components/CategoryTextLinks";
import NewsSection from "@/components/NewsSection";
import MemberBanner from "@/components/MemberBanner";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import FadeIn from "@/components/FadeIn";
import { getNewArrivals, getRecommended } from "@/lib/products";

export default function Home() {
  const newArrivals = getNewArrivals();
  const recommended = getRecommended();

  return (
    <>
      <HeroCarousel />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <GenderNav />
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#f9fafb] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col gap-8">
            <SectionHeading title="カテゴリから探す" />
            <CategoryGrid />
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col gap-8">
            <SectionHeading
              title="FEATURE"
              subtitle="ブランド特集からギフト選びまで、MIMORAが提案する特集記事"
            />
            <FeatureSection />
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#f9fafb] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col gap-8">
            <SectionHeading title="RANKING" subtitle="今週よく売れているアイテムをチェック" />
            <RankingSection />
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col items-center gap-6">
            <p className="text-xs font-bold tracking-widest text-[#9ca3af]">
              注目キーワード
            </p>
            <KeywordTags />
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#f9fafb] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col gap-8">
            <SectionHeading title="NEW ARRIVALS" subtitle="今週入荷した新着アイテム" />
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col gap-8">
            <SectionHeading
              title="BRAND"
              subtitle="MIMORAが厳選した、信頼のキッズ・ベビーブランド"
            />
            <BrandSection />
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#f9fafb] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col gap-8">
            <SectionHeading title="RECOMMEND" subtitle="あなたにおすすめのアイテム" />
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {recommended.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col gap-8">
            <SectionHeading
              title="STYLING"
              subtitle="今日のコーディネートに迷ったら。スタイリング事例から探す"
            />
            <StylingSection />
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#f9fafb] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <CategoryTextLinks />
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col gap-8">
            <SectionHeading title="お知らせ" />
            <NewsSection />
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <MemberBanner />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
