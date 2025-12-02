import Image from "next/image";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import SearchBar from "@/components/SearchBar";

export default async function ArticlesPage() {
  const articles = await getAllArticles('pt');

  return (
    <div className="min-h-screen bg-prime-black">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 text-center">
            Todos os <span className="text-prime-yellow">Artigos</span>
          </h1>
          <p className="text-xl text-text-secondary text-center mb-8">
            Explore nosso conteúdo sobre estética automotiva
          </p>
          
          {/* Busca */}
          <div className="flex justify-center">
            <SearchBar />
          </div>
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
