'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface SearchArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  readTime: string;
  image: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchArticle[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allArticles, setAllArticles] = useState<SearchArticle[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Carregar índice de busca uma vez
  useEffect(() => {
    fetch('/search-index.json')
      .then(res => res.json())
      .then(data => setAllArticles(data))
      .catch(error => console.error('Erro ao carregar índice de busca:', error));
  }, []);

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Buscar artigos (client-side)
  useEffect(() => {
    const searchArticles = () => {
      if (query.length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      
      try {
        const queryLower = query.toLowerCase();
        
        // Filtrar artigos
        const filtered = allArticles.filter(article => {
          const titleMatch = article.title.toLowerCase().includes(queryLower);
          const descriptionMatch = article.description.toLowerCase().includes(queryLower);
          const categoryMatch = article.category.toLowerCase().includes(queryLower);
          const tagsMatch = article.tags?.some(tag => tag.toLowerCase().includes(queryLower));

          return titleMatch || descriptionMatch || categoryMatch || tagsMatch;
        });

        // Ordenar por relevância
        const sorted = filtered.sort((a, b) => {
          const aTitle = a.title.toLowerCase().includes(queryLower) ? 3 : 0;
          const aDesc = a.description.toLowerCase().includes(queryLower) ? 2 : 0;
          const aCat = a.category.toLowerCase().includes(queryLower) ? 1 : 0;
          const aScore = aTitle + aDesc + aCat;

          const bTitle = b.title.toLowerCase().includes(queryLower) ? 3 : 0;
          const bDesc = b.description.toLowerCase().includes(queryLower) ? 2 : 0;
          const bCat = b.category.toLowerCase().includes(queryLower) ? 1 : 0;
          const bScore = bTitle + bDesc + bCat;

          return bScore - aScore;
        });

        const results = sorted.slice(0, 10);
        setResults(results);
        setIsOpen(true);

        // Track search
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'search', {
            search_term: query,
            results_count: results.length
          });
        }
      } catch (error) {
        console.error('Erro na busca:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(searchArticles, 300);
    return () => clearTimeout(debounce);
  }, [query, allArticles]);

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar artigos..."
          className="w-full px-6 py-3 pl-12 bg-prime-gray-dark border border-prime-gray-light rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-prime-yellow transition-colors"
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {isLoading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-prime-yellow border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Resultados */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-prime-gray-dark border border-prime-gray-light rounded-lg shadow-2xl max-h-96 overflow-y-auto z-50">
          {results.map((article) => (
            <Link
              key={article.slug}
              href={`/artigos/${article.slug}`}
              onClick={() => {
                setIsOpen(false);
                setQuery('');
              }}
              className="block p-4 hover:bg-prime-gray-medium transition-colors border-b border-prime-gray-light last:border-b-0"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h3 className="text-text-primary font-semibold mb-1 line-clamp-1">
                    {article.title}
                  </h3>
                  <p className="text-text-secondary text-sm line-clamp-2 mb-2">
                    {article.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="px-2 py-1 bg-prime-yellow/10 text-prime-yellow rounded">
                      {article.category}
                    </span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Sem resultados */}
      {isOpen && query.length >= 2 && results.length === 0 && !isLoading && (
        <div className="absolute top-full mt-2 w-full bg-prime-gray-dark border border-prime-gray-light rounded-lg shadow-2xl p-6 text-center z-50">
          <p className="text-text-secondary">Nenhum artigo encontrado para "{query}"</p>
        </div>
      )}
    </div>
  );
}
