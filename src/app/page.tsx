import Hero from "@/components/Hero";
import TrendingNow from "@/components/TrendingNow";
import CategoriesStories from "@/components/CategoriesStories";
import BeforeAfter from "@/components/BeforeAfter";
import FeaturedArticles from "@/components/FeaturedArticles";
import NewsletterCTA from "@/components/NewsletterCTA";
import WhyTrust from "@/components/WhyTrust";
import { OrganizationSchema, WebSiteSchema } from "@/components/StructuredData";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const articles = getAllArticles('pt');

  return (
    <>
      {/* Structured Data for SEO */}
      <OrganizationSchema
        name="Detailing Prime"
        url="https://detailingprime.com.br"
        logo="https://detailingprime.com.br/logo-principal.png"
        description="O que realmente funciona no detailing automotivo - Testes reais, técnicas práticas e produtos que entregam resultado"
        sameAs={[
          'https://facebook.com/detailingprime',
          'https://instagram.com/detailingprime',
        ]}
      />
      <WebSiteSchema />

      {/* 1. Hero - Discover Style (Single CTA) */}
      <Hero locale="pt" />

      {/* 2. O Que Está em Alta - Discover Trigger (Feed Style) */}
      <TrendingNow locale="pt" />

      {/* 3. Categorias como Histórias (não menu genérico) */}
      <CategoriesStories locale="pt" />

      {/* 4. Antes vs Depois - Visual Shock */}
      <BeforeAfter />

      {/* 5. Conteúdo em Destaque - CTR Puro */}
      <FeaturedArticles locale="pt" articles={articles} />

      {/* 6. Newsletter - Micro Conversão (Zero Fricção) */}
      <NewsletterCTA locale="pt" />

      {/* 7. Por Que Confiar - Evitar Rejeição */}
      <WhyTrust />
    </>
  );
}
