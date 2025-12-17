'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/lib/articles';

interface FeaturedArticlesProps {
  locale: string;
  articles: Article[];
}

export default function FeaturedArticles({ locale, articles }: FeaturedArticlesProps) {
  // Get top 4 featured articles
  const featured = articles
    .filter(a => a.featured)
    .slice(0, 4);

  // Discover-style headlines (curtos, números, curiosidade, promessa)
  const discoverTitles = [
    '3 técnicas que aumentam o brilho sem gastar mais',
    'O produto barato que superou marcas caras',
    'Como economizar R$ 2 mil em polimento profissional',
    'Esse detalhe dobra a durabilidade da cera',
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title - CTR Focus */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Leituras Que Estão Gerando Resultado
          </h2>
          <p className="text-gray-600 text-lg">
            Conteúdo testado e aprovado por profissionais
          </p>
        </div>

        {/* Grid - 2x2 on desktop, stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((article, index) => (
            <Link
              key={article.slug}
              href={`/artigos/${article.slug}`}
              className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-prime-yellow hover:shadow-xl transition-all"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-prime-yellow text-prime-black text-sm font-bold rounded">
                  {article.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title - Discover Pattern */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-prime-yellow transition-colors line-clamp-2">
                  {discoverTitles[index] || article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{article.readTime}</span>
                  <span className="flex items-center gap-1 text-prime-yellow font-semibold">
                    Ler
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
