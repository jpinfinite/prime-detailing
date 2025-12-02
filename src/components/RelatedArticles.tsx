import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/articles';

interface RelatedArticlesProps {
  articles: Article[];
  currentSlug: string;
}

export default function RelatedArticles({ articles, currentSlug }: RelatedArticlesProps) {
  // Filtrar artigo atual e pegar apenas 3
  const related = articles
    .filter(article => article.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-prime-gray-light">
      <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
        📚 Artigos Relacionados
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((article) => (
          <Link
            key={article.slug}
            href={`/artigos/${article.slug}`}
            className="group bg-prime-gray-medium rounded-lg border border-prime-gray-light overflow-hidden hover:border-prime-yellow transition-all"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <span className="text-xs text-prime-yellow font-semibold">
                {article.category}
              </span>
              <h3 className="text-lg font-semibold text-text-primary mt-2 line-clamp-2 group-hover:text-prime-yellow transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-text-muted mt-2">
                {article.readTime}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
