import Image from "next/image";
import Link from "next/link";

const translations = {
  pt: {
    title: "Artigos em Destaque",
    readMore: "Ler mais",
  },
  en: {
    title: "Featured Articles",
    readMore: "Read more",
  },
};

export default function FeaturedArticles({ locale }: { locale: string }) {
  const t = translations[locale as keyof typeof translations] || translations.pt;

  const articles = [
    {
      title: "Como Polir Faróis em Casa - Guia Completo 2025",
      excerpt: "Aprenda técnicas profissionais para restaurar faróis amarelados",
      image: "/arquivos para o site/Destaques/detailing-1-car-washing--worker--man--car-.jpg",
      slug: "como-polir-farois-2025",
    },
    {
      title: "Mercado de Detailing: Crescimento em 2025",
      excerpt: "Análise completa do mercado brasileiro de estética automotiva",
      image: "/arquivos para o site/Destaques/detailing-2-automobile--car-wallpapers--na.jpg",
      slug: "mercado-detailing-crescimento-2025",
    },
    {
      title: "Guia Completo de Enceramento Automotivo",
      excerpt: "Tudo sobre ceras, aplicação e proteção da pintura",
      image: "/arquivos para o site/Destaques/detailing-3-automobile--to-wash--clean--to.jpg",
      slug: "guia-enceramento-automotivo",
    },
  ];

  return (
    <section className="py-16 bg-prime-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-text-primary">{t.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.slug} className="bg-prime-gray-medium rounded-lg border border-prime-gray-light overflow-hidden hover:border-prime-yellow transition-all group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-text-primary group-hover:text-prime-yellow transition-colors">{article.title}</h3>
                <p className="text-text-secondary mb-4">{article.excerpt}</p>
                <Link
                  href={`/artigos/${article.slug}`}
                  className="text-prime-yellow hover:text-prime-yellow-light font-semibold inline-flex items-center gap-2"
                >
                  {t.readMore} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
