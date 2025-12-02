import Image from "next/image";
import Link from "next/link";

export default function ArticlesPage() {
  const articles = [
    {
      title: "Como Polir Faróis em Casa - Guia Completo 2025",
      excerpt: "Aprenda técnicas profissionais para restaurar faróis amarelados com produtos acessíveis",
      image: "/images/pexels/pexels-tima-miroshnichenko-6873076.jpg",
      slug: "como-polir-farois-2025",
      category: "Guias",
      date: "15 Jan 2025",
    },
    {
      title: "Mercado de Detailing: Crescimento em 2025",
      excerpt: "Análise completa do mercado brasileiro de estética automotiva e tendências",
      image: "/images/pexels/pexels-tima-miroshnichenko-6873205.jpg",
      slug: "mercado-detailing-crescimento-2025",
      category: "Notícias",
      date: "10 Jan 2025",
    },
    {
      title: "Guia Completo de Enceramento Automotivo",
      excerpt: "Tudo sobre ceras, aplicação e proteção da pintura do seu veículo",
      image: "/images/pexels/pexels-tima-miroshnichenko-6872648.jpg",
      slug: "guia-enceramento-automotivo",
      category: "Guias",
      date: "08 Jan 2025",
    },
    {
      title: "Limpeza Profunda do Interior do Carro",
      excerpt: "Técnicas profissionais para deixar o interior do seu carro impecável",
      image: "/arquivos para o site/Destaques/detailing-4-car-wash--clean--automobile--t.jpg",
      slug: "limpeza-profunda-interior",
      category: "Tutoriais",
      date: "05 Jan 2025",
    },
    {
      title: "Proteção de Pintura: Cera vs Selante",
      excerpt: "Entenda as diferenças e escolha a melhor opção para seu carro",
      image: "/arquivos para o site/Destaques/detailing-5-car--car-wallpapers--car-wash-.jpg",
      slug: "cera-vs-selante",
      category: "Reviews",
      date: "03 Jan 2025",
    },
    {
      title: "Kit Básico de Detailing para Iniciantes",
      excerpt: "Os produtos essenciais para começar no mundo do detailing automotivo",
      image: "/arquivos para o site/Destaques/detailing-6-door--door-handle--auto--air-i.jpg",
      slug: "kit-basico-iniciantes",
      category: "Guias",
      date: "01 Jan 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-prime-black">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Todos os Artigos
          </h1>
          <p className="text-xl text-text-secondary">
            Explore nosso conteúdo sobre estética automotiva
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="px-4 py-2 bg-prime-yellow text-prime-black rounded-lg font-semibold">
            Todos
          </button>
          <button className="px-4 py-2 bg-prime-gray-medium text-text-primary rounded-lg hover:bg-prime-gray-light transition">
            Guias
          </button>
          <button className="px-4 py-2 bg-prime-gray-medium text-text-primary rounded-lg hover:bg-prime-gray-light transition">
            Tutoriais
          </button>
          <button className="px-4 py-2 bg-prime-gray-medium text-text-primary rounded-lg hover:bg-prime-gray-light transition">
            Reviews
          </button>
          <button className="px-4 py-2 bg-prime-gray-medium text-text-primary rounded-lg hover:bg-prime-gray-light transition">
            Notícias
          </button>
        </div>
        
        {/* Grid de Artigos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article 
              key={article.slug} 
              className="bg-prime-gray-medium rounded-lg border border-prime-gray-light overflow-hidden hover:border-prime-yellow transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-prime-yellow font-semibold">
                    {article.category}
                  </span>
                  <span className="text-sm text-text-muted">{article.date}</span>
                </div>
                <h2 className="font-bold text-xl mb-2 text-text-primary group-hover:text-prime-yellow transition-colors">
                  {article.title}
                </h2>
                <p className="text-text-secondary mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <Link
                  href={`/artigos/${article.slug}`}
                  className="text-prime-yellow hover:text-prime-yellow-light font-semibold inline-flex items-center gap-2"
                >
                  Ler mais →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Paginação */}
        <div className="mt-12 flex justify-center gap-2">
          <button className="px-4 py-2 bg-prime-yellow text-prime-black rounded-lg font-semibold">
            1
          </button>
          <button className="px-4 py-2 bg-prime-gray-medium text-text-primary rounded-lg hover:bg-prime-gray-light transition">
            2
          </button>
          <button className="px-4 py-2 bg-prime-gray-medium text-text-primary rounded-lg hover:bg-prime-gray-light transition">
            3
          </button>
          <button className="px-4 py-2 bg-prime-gray-medium text-text-primary rounded-lg hover:bg-prime-gray-light transition">
            →
          </button>
        </div>
      </div>
    </div>
  );
}
