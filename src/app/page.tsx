import Hero from "@/components/Hero";
import FeaturedArticles from "@/components/FeaturedArticles";
import Categories from "@/components/Categories";
import NewsletterCTA from "@/components/NewsletterCTA";
import { OrganizationSchema, WebSiteSchema } from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <OrganizationSchema
        name="Detailing Prime"
        url="https://detailingprime.com.br"
        logo="https://detailingprime.com.br/logo-principal.png"
        description="Portal completo de estética automotiva com guias, reviews e técnicas profissionais de detailing"
        sameAs={[
          'https://facebook.com/detailingprime',
          'https://instagram.com/detailingprime',
        ]}
      />
      <WebSiteSchema />
      
      <Hero locale="pt" />
      <Categories locale="pt" />
      <FeaturedArticles locale="pt" />
      <NewsletterCTA locale="pt" />
    </>
  );
}
