'use client'

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/articles";
import SearchBar from "@/components/SearchBar";

interface ArticlesClientProps {
  articles: Article[];
}

export default function ArticlesClient({ articles }: ArticlesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredArticles, setFilteredArticles] = useState(articles);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredArticles(articles.filter(a => a.category === selectedCategory));
    } else {
      setFilteredArticles(articles);
    }
  }, [selectedCategory, articles]);

  const categories = [
    { name: 'Tutoriais', icon: '📚' },
    { name: 'Reviews', icon: '⭐' },
    { name: 'Produtos', icon: '🧴' },
    { name: 'Técnicas', icon: '🛠️' },
    { name: 'Mercado', icon: '📈' },
    { name: 'Manutenção', icon: '🔩' },
  ];

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
          <button 
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              !selectedCategory 
                ? 'bg-prime-yellow text-prime-black' 
                : 'bg-prime-gray-medium text-text-primary hover:bg-prime-gray-light'
            }`}
          >
            Todos
          </button>
          {categories.map(cat => (
            <button 
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedCategory === cat.name 
                  ? 'bg-prime-yellow text-prime-black' 
                  : 'bg-prime-gray-medium text-text-primary hover:bg-prime-gray-light'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
        
        {/* Grid de Artigos */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-text-secondary mb-4">
              Nenhum artigo encontrado nesta categoria ainda.
            </p>
            <button 
              onClick={() => setSelectedCategory(null)}
              className="text-prime-yellow hover:text-prime-yellow-light font-semibold"
            >
              ← Ver todos os artigos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
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
      </div>
    </div>
  );
}
