import Image from "next/image";
import Link from "next/link";
import { getAllArticles, getArticlesByCategory } from "@/lib/articles";
import SearchBar from "@/components/SearchBar";

// Força renderização dinâmica para suportar searchParams
export const dynamic = 'force-dynamic';

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { categoria?: string };
}) {
  const categoria = searchParams.categoria;
  const articles = categoria 
    ? getArticlesByCategory(categoria, 'pt')
    : getAllArticles('pt');

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
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Link 
            href="/artigos"
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              !categoria 
                ? 'bg-prime-yellow text-prime-black' 
                : 'bg-prime-gray-medium text-text-primary hover:bg-prime-gray-light'
            }`}
          >
            Todos
          </Link>
          <Link 
            href="/artigos?categoria=Tutoriais"
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              categoria === 'Tutoriais' 
                ? 'bg-prime-yellow text-prime-black' 
                : 'bg-prime-gray-medium text-text-primary hover:bg-prime-gray-light'
            }`}
          >
            📚 Tutoriais
          </Link>
          <Link 
            href="/artigos?categoria=Reviews"
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              categoria === 'Reviews' 
                ? 'bg-prime-yellow text-prime-black' 
                : 'bg-prime-gray-medium text-text-primary hover:bg-prime-gray-light'
            }`}
          >
            ⭐ Reviews
          </Link>
          <Link 
            href="/artigos?categoria=Produtos"
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              categoria === 'Produtos' 
                ? 'bg-prime-yellow text-prime-black' 
                : 'bg-prime-gray-medium text-text-primary hover:bg-prime-gray-light'
            }`}
          >
            🧴 Produtos
          </Link>
          <Link 
            href="/artigos?categoria=Técnicas"
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              categoria === 'Técnicas' 
                ? 'bg-prime-yellow text-prime-black' 
                : 'bg-prime-gray-medium text-text-primary hover:bg-prime-gray-light'
            }`}
          >
            🛠️ Técnicas
          </Link>
          <Link 
            href="/artigos?categoria=Mercado"
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              categoria === 'Mercado' 
                ? 'bg-prime-yellow text-prime-black' 
                : 'bg-prime-gray-medium text-text-primary hover:bg-prime-gray-light'
            }`}
          >
            📈 Mercado
          </Link>
          <Link 
            href="/artigos?categoria=Manutenção"
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              categoria === 'Manutenção' 
                ? 'bg-prime-yellow text-prime-black' 
                : 'bg-prime-gray-medium text-text-primary hover:bg-prime-gray-light'
            }`}
          >
            🔩 Manutenção
          </Link>
        </div>
        
        {/* Grid de Artigos */}
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-text-secondary mb-4">
              Nenhum artigo encontrado nesta categoria ainda.
            </p>
            <Link 
              href="/artigos"
              className="text-prime-yellow hover:text-prime-yellow-light font-semibold"
            >
              ← Ver todos os artigos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
            <article 
              key={article.slug} 
              className="bg-prime-gray-medium rounded-lg border border-prime-gray-light overflow-hidden hover:border-prime-yellow transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image}
                  alt={`${article.title} - ${article.category}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
        )}

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
