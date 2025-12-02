interface ArticleBadgesProps {
  date: string;
  featured?: boolean;
  readTime?: string;
}

export default function ArticleBadges({ date, featured, readTime }: ArticleBadgesProps) {
  const isNew = () => {
    const articleDate = new Date(date);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - articleDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {isNew() && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
          🆕 Novo
        </span>
      )}
      {featured && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-prime-yellow/20 text-prime-yellow text-xs font-semibold rounded-full">
          ⭐ Destaque
        </span>
      )}
      {readTime && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-prime-gray-light text-text-muted text-xs font-medium rounded-full">
          ⏱️ {readTime}
        </span>
      )}
    </div>
  );
}
