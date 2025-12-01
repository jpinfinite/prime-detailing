import Hero from "@/components/Hero";
import FeaturedArticles from "@/components/FeaturedArticles";
import Categories from "@/components/Categories";

export default function Home() {
  return (
    <>
      <Hero locale="pt" />
      <Categories locale="pt" />
      <FeaturedArticles locale="pt" />
    </>
  );
}
