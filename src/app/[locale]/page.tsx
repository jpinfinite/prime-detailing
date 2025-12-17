import Hero from "@/components/Hero";
import FeaturedArticles from "@/components/FeaturedArticles";
import Categories from "@/components/Categories";
import { getAllArticles } from "@/lib/articles";

// Gera rotas estáticas para todos os locales suportados
export async function generateStaticParams() {
  return [
    { locale: 'pt' },
    { locale: 'en' },
    { locale: 'es' },
  ];
}

export default function LocalePage({ params }: { params: { locale: string } }) {
  const articles = getAllArticles(params.locale);

  return (
    <>
      <Hero locale={params.locale} />
      <Categories locale={params.locale} />
      <FeaturedArticles locale={params.locale} articles={articles} />
    </>
  );
}
