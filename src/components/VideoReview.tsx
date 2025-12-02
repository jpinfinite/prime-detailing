"use client";

interface VideoReviewProps {
  videoId: string;
  title: string;
  channel: string;
  category?: string;
  description?: string;
  className?: string;
}

export default function VideoReview({
  videoId,
  title,
  channel,
  category,
  description,
  className = "",
}: VideoReviewProps) {
  return (
    <div className={`bg-prime-gray-medium rounded-lg border border-prime-gray-light overflow-hidden hover:border-prime-yellow transition-all group ${className}`}>
      {/* Video Embed */}
      <div className="relative aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        {category && (
          <span className="inline-block text-xs text-prime-yellow font-semibold mb-2">
            {category}
          </span>
        )}
        <h3 className="font-bold text-lg text-text-primary mb-1 group-hover:text-prime-yellow transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-text-muted mb-2">
          📺 {channel}
        </p>
        {description && (
          <p className="text-sm text-text-secondary line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
