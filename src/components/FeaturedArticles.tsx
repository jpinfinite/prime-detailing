import Image from "next/image";
import Link from "next/link";

const translations = {
  pt: {
    badge: "🔥 Mais Lidos",
    title: "Artigos em Destaque",
    subtitle: "Conteúdo premium selecionado pela nossa equipe",
    readMore: "Ler Artigo Completo",
    readTime: "min de leitura",
    viewAll: "Ver Todos os Artigos",
  },
  en: {
    badge: "🔥 Most Read",
    title: "Featured Articles",
    subtitle: "Premium content selected by our team",
    readMore: "Read Full Article",
    readTime: "min read",
    viewAll: "View All Articles",
  },
};

export default function FeaturedArticles({ locale }: { locale: string }) {
  const t = translations[locale as keyof typeof translations] || translations.pt;

  const articles = [
    {
      title: "Kit Básico de Detailing para Iniciantes",
      excerpt: "Monte seu kit completo de R$ 300 a R$ 2.500. Guia com produtos essenciais, tabelas comparativas e onde comprar.",
      image: "/images/pexels/car-detailing-6873185.jpg",
      slug: "kit-basico-detailing-iniciantes",
      category: "Guias",
      readTime: "12",
      featured: true,
    },
    {
      title: "Mercado de Detailing: Crescimento 5.9% ao Ano",
      excerpt: "Análise completa do mercado brasileiro. Oportunidades, investimento necessário e como lucrar com detailing.",
      image: "/images/pexels/car-detailing-6873074.jpg",
      slug: "mercado-detailing-crescimento-2025",
      category: "Notícias",
      readTime: "15",
      featured: true,
    },
    {
      title: "Polimento Manual vs Máquina: Guia Completo",
      excerpt: "Compare custos, resultados e segurança. Tabelas comparativas, recomendações por perfil e guia de compra.",
      image: "/images/pexels/car-polishing-6872150.jpg",
      slug: "polimento-manual-vs-maquina",
      category: "Guias",
      readTime: "16",
      featured: false,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-prime-gray-dark to-prime-black relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-prime-yellow/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-prime-yellow/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header da seção */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-prime-yellow/10 border border-prime-yellow/30 rounded-full px-6 py-2 mb-6">
            <span className="text-prime-yellow font-semibold">
              {t.badge}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t.title}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Grid de artigos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => (
            <article 
              key={article.slug} 
              className={`group relative ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
            >
              <Link href={`/artigos/${article.slug}`} className="block">
                {/* Card com efeito hover forte */}
                <div className="relative bg-prime-gray-medium rounded-2xl border-2 border-prime-gray-light hover:border-prime-yellow overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-prime-yellow/20 h-full">
                  {/* Imagem */}
                  <div className={`relative overflow-hidden ${index === 0 ? 'h-80' : 'h-56'}`}>
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-prime-black/80 via-prime-black/20 to-transparent"></div>
                    
                    {/* Badge de categoria */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-prime-yellow text-prime-black px-4 py-1.5 rounded-full text-sm font-bold">
                        {article.category}
                      </span>
                    </div>

                    {/* Badge Featured */}
                    {article.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          ⭐ Destaque
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Conteúdo */}
                  <div className="p-6">
                    {/* Título */}
                    <h3 className={`font-black text-white mb-3 group-hover:text-prime-yellow transition-colors ${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                      {article.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className={`text-gray-400 mb-4 leading-relaxed ${index === 0 ? 'text-base' : 'text-sm'}`}>
                      {article.excerpt}
                    </p>

                    {/* Footer do card */}
                    <div className="flex items-center justify-between">
                      {/* Tempo de leitura */}
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{article.readTime} {t.readTime}</span>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-prime-yellow font-semibold group-hover:gap-4 transition-all">
                        <span className="text-sm">{t.readMore}</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Brilho decorativo no hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-prime-yellow/0 to-prime-yellow/0 group-hover:from-prime-yellow/5 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* CTA para ver todos */}
        <div className="text-center">
          <Link
            href="/artigos"
            className="inline-flex items-center gap-3 bg-transparent border-2 border-prime-yellow text-prime-yellow hover:bg-prime-yellow hover:text-prime-black px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 group"
          >
            <span>{t.viewAll}</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
