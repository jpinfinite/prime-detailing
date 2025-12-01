import Image from "next/image";
import Link from "next/link";

const translations = {
  pt: {
    title: "Todos os Artigos",
    readMore: "Ler mais",
  },
  en: {
    title: "All Articles",
    readMore: "Read more",
  },
};

export default function ArticlesPage({ params }: { params: { locale: string } }) {
  const t = translations[params.locale as keyof typeof translations] || translations.pt;

  const articles = [
    {
      title: "Como Polir Faróis em Casa - Guia Completo 2025",
      excerpt: "Aprenda técnicas profissionais para restaurar faróis amarelados",
      image: "/arquivos para o site/Destaques/detailing-1-car-washing--worker--man--car-.jpg",
      slug: "como-polir-farois-2025",
      category: "Guias",
      date: "2025-01-15",
    },
    {
      title: "Mercado de Detailing: Crescimento em 2025",
      excerpt: "Análise completa do mercado brasileiro de estética automotiva",
      image: "/arquivos para o site/Destaques/detailing-2-automobile--car-wallpapers--na.jpg",
      slug: "mercado-detailing-crescimento-2025",
      category: "Notícias",
      date: "2025-01-10",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{t.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <article key={article.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <div className="relative h-48">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-primary-600 font-semibold">{article.category}</span>
                <span className="text-sm text-gray-500">{article.date}</span>
              </div>
              <h2 className="font-bold text-xl mb-2">{article.title}</h2>
              <p className="text-gray-600 mb-4">{article.excerpt}</p>
              <Link
                href={`/${params.locale}/artigos/${article.slug}`}
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                {t.readMore} →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
