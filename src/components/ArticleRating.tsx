'use client'

import { useState, useEffect } from 'react';

interface ArticleRatingProps {
  slug: string;
}

export default function ArticleRating({ slug }: ArticleRatingProps) {
  const [rating, setRating] = useState<'helpful' | 'not-helpful' | null>(null);
  const [stats, setStats] = useState({ helpful: 0, notHelpful: 0 });
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // Verificar se já votou (localStorage)
    const voted = localStorage.getItem(`article_rating_${slug}`);
    if (voted) {
      setRating(voted as 'helpful' | 'not-helpful');
      setHasVoted(true);
    }

    // Carregar estatísticas
    loadStats();
  }, [slug]);

  const loadStats = () => {
    // Em produção, isso viria de uma API
    // Por enquanto, usar localStorage
    const stored = localStorage.getItem(`article_stats_${slug}`);
    if (stored) {
      setStats(JSON.parse(stored));
    }
  };

  const handleVote = (vote: 'helpful' | 'not-helpful') => {
    if (hasVoted) return;

    // Salvar voto
    setRating(vote);
    setHasVoted(true);
    localStorage.setItem(`article_rating_${slug}`, vote);

    // Atualizar estatísticas
    const newStats = {
      helpful: stats.helpful + (vote === 'helpful' ? 1 : 0),
      notHelpful: stats.notHelpful + (vote === 'not-helpful' ? 1 : 0),
    };
    setStats(newStats);
    localStorage.setItem(`article_stats_${slug}`, JSON.stringify(newStats));

    // Track no Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'article_rating', {
        article_slug: slug,
        rating: vote,
        helpful_count: newStats.helpful,
        not_helpful_count: newStats.notHelpful
      });
    }
  };

  const totalVotes = stats.helpful + stats.notHelpful;
  const helpfulPercentage = totalVotes > 0 ? Math.round((stats.helpful / totalVotes) * 100) : 0;

  return (
    <div className="mt-12 p-6 bg-prime-gray-medium rounded-lg border border-prime-gray-light">
      <div className="text-center">
        <h3 className="text-xl font-bold text-text-primary mb-4">
          Este artigo foi útil?
        </h3>

        {!hasVoted ? (
          <div className="flex gap-4 justify-center mb-4">
            <button
              onClick={() => handleVote('helpful')}
              className="flex items-center gap-2 px-6 py-3 bg-green-600/20 hover:bg-green-600/30 border border-green-600/40 text-green-400 rounded-lg transition-all transform hover:scale-105"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span className="font-semibold">Sim, foi útil</span>
            </button>

            <button
              onClick={() => handleVote('not-helpful')}
              className="flex items-center gap-2 px-6 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-600/40 text-red-400 rounded-lg transition-all transform hover:scale-105"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
              </svg>
              <span className="font-semibold">Não muito</span>
            </button>
          </div>
        ) : (
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-prime-yellow/10 border border-prime-yellow/30 rounded-lg">
              <span className="text-2xl">
                {rating === 'helpful' ? '👍' : '👎'}
              </span>
              <span className="text-text-primary font-semibold">
                Obrigado pelo feedback!
              </span>
            </div>
          </div>
        )}

        {/* Estatísticas */}
        {totalVotes > 0 && (
          <div className="text-text-muted text-sm">
            <p className="mb-2">
              {helpfulPercentage}% dos leitores acharam este artigo útil
            </p>
            <div className="flex items-center gap-2 justify-center text-xs">
              <span className="text-green-400">👍 {stats.helpful}</span>
              <span>•</span>
              <span className="text-red-400">👎 {stats.notHelpful}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
