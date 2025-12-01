import Hero from "@/components/Hero";
import FeaturedArticles from "@/components/FeaturedArticles";
import Categories from "@/components/Categories";

export default function LocalePage({ params }: { params: { locale: string } }) {
  return (
    <>
      <Hero locale={params.locale} />
      <Categories locale={params.locale} />
      <FeaturedArticles locale={params.locale} />
    </>
  );
}
