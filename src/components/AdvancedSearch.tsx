'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface SearchArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  readTime: string;
  image: string;
  date: string;
}

export default function AdvancedSearch() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [results, setResults] = useState<SearchArticle[]>([]);
  const [allArticles, setAllArticles] = useState<SearchArticle[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const categories = ['Tutoriais', 'Reviews', 'Produtos', 'Técnicas', 'Mercado', 'Manutenção'];

  useEffect(() => {
    // Carregar artigos e tags
    fetch('/search-index.json')
      .then(res => res.json())
      .then(data => {
        setAllArticles(data);
        
        // Extrair todas as tags únicas
        const tags = new Set<string>();
        data.forEach((article: SearchArticle) => {
          article.tags?.forEach(tag => tags.add(tag));
        });
        setAllTags(Array.from(tags).sort());
      });
  }, []);

  useEffect(() => {
    searchArticles();
  }, [query, selectedCategory, selectedTags, allArticles]);

  const searchArticles = () => {
    if (query.length < 2 && !selectedCategory && selectedTags.length === 0) {
      setResults([]);
      return;
    }

    const queryLower = query.toLowerCase();
    
    const filtered = allArticles.filter(article => {
      // Filtro de texto
      const textMatch = !query || 
        article.title.toLowerCase().includes(queryLower) ||
        article.description.toLowerCase().includes(queryLower);

      // Filtro de categoria
      const categoryMatch = !selectedCategory || article.category === selectedCategory;

      // Filtro de tags
      const tagsMatch = selectedTags.length === 0 || 
        selectedTags.some(tag => article.tags?.includes(tag));

      return textMatch && categoryMatch && tagsMatch;
    });

    // Ordenar por relevância
    const sorted = filtered.sort((a, b) => {
      const aScore = (
        (a.title.toLowerCase().includes(queryLower) ? 3 : 0) +
        (a.description.toLowerCase().includes(queryLower) ? 2 : 0) +
        (selectedTags.some(tag => a.tags?.includes(tag)) ? 1 : 0)
      );
      const bScore = (
        (b.title.toLowerCase().includes(queryLower) ? 3 : 0) +
        (b.description.toLowerCase().includes(queryLower) ? 2 : 0) +
        (selectedTags.some(tag => b.tags?.includes(tag)) ? 1 : 0)
      );
      return bScore - aScore;
    });

    setResults(sorted.slice(0, 20));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory('');
    setSelectedTags([]);
    setResults([]);
  };

  return (
    <div className="w-full">
      {/* Botão para abrir busca avançada */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-prime-yellow hover:text-prime-yellow-light transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <span className="text-sm font-semibold">Busca Avançada</span>
      </button>

      {/* Painel de busca avançada */}
      {isOpen && (
        <div className="mt-4 p-6 bg-prime-gray-medium rounded-lg border border-prime-gray-light">
          {/* Campo de busca */}
          <div className="mb-4">
            <label className="block text-text-primary font-semibold mb-2">
              Buscar por palavra-chave
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Digite sua busca..."
              className="w-full px-4 py-2 bg-prime-gray-dark border border-prime-gray-light rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-prime-yellow"
            />
          </div>

          {/* Filtro de categoria */}
          <div className="mb-4">
            <label className="block text-text-primary font-semibold mb-2">
              Categoria
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                  !selectedCategory
                    ? 'bg-prime-yellow text-prime-black'
                    : 'bg-prime-gray-dark text-text-secondary hover:bg-prime-gray-light'
                }`}
              >
                Todas
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                    selectedCategory === cat
                      ? 'bg-prime-yellow text-prime-black'
                      : 'bg-prime-gray-dark text-text-secondary hover:bg-prime-gray-light'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro de tags */}
          <div className="mb-4">
            <label className="block text-text-primary font-semibold mb-2">
              Tags ({selectedTags.length} selecionadas)
            </label>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {allTags.slice(0, 20).map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    selectedTags.includes(tag)
                      ? 'bg-prime-yellow text-prime-black'
                      : 'bg-prime-gray-dark text-text-secondary hover:bg-prime-gray-light'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex gap-2">
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-prime-gray-dark text-text-secondary rounded-lg hover:bg-prime-gray-light transition"
            >
              Limpar Filtros
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-prime-yellow text-prime-black rounded-lg hover:bg-prime-yellow-light transition font-semibold"
            >
              Fechar
            </button>
          </div>

          {/* Resultados */}
          {results.length > 0 && (
            <div className="mt-6">
              <h3 className="text-text-primary font-bold mb-4">
                {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
              </h3>
              <div className="space-y-4">
                {results.map(article => (
                  <Link
                    key={article.slug}
                    href={`/artigos/${article.slug}`}
                    className="block p-4 bg-prime-gray-dark rounded-lg hover:bg-prime-gray-light transition border border-prime-gray-light hover:border-prime-yellow"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-prime-yellow/10 text-prime-yellow text-xs rounded">
                        {article.category}
                      </span>
                      <span className="text-text-muted text-xs">{article.readTime}</span>
                      <span className="text-text-muted text-xs">{article.date}</span>
                    </div>
                    <h4 className="text-text-primary font-semibold mb-1 hover:text-prime-yellow transition">
                      {article.title}
                    </h4>
                    <p className="text-text-secondary text-sm line-clamp-2">
                      {article.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
