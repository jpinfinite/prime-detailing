import Link from "next/link";
import VideoReview from "./VideoReview";
import { getFeaturedVideos } from "@/data/videoReviews";

interface FeaturedVideosProps {
  locale?: string;
}

const translations = {
  pt: {
    title: "Reviews em Destaque",
    subtitle: "Assista análises honestas e tutoriais dos melhores canais",
    viewAll: "Ver Todos os Reviews",
  },
  en: {
    title: "Featured Reviews",
    subtitle: "Watch honest reviews and tutorials from the best channels",
    viewAll: "View All Reviews",
  },
};

export default function FeaturedVideos({ locale = "pt" }: FeaturedVideosProps) {
  const t = translations[locale as keyof typeof translations] || translations.pt;
  const featuredVideos = getFeaturedVideos(3);

  return (
    <section className="py-20 bg-prime-gray-dark relative overflow-hidden">
      {/* Elemento decorativo de fundo */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-prime-yellow/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-prime-yellow/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header da seção */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t.title}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
          {/* Linha decorativa */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-1 w-12 bg-prime-yellow"></div>
            <div className="h-2 w-2 bg-prime-yellow rotate-45"></div>
            <div className="h-1 w-12 bg-prime-yellow"></div>
          </div>
        </div>

        {/* Grid de vídeos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredVideos.map((video) => (
            <VideoReview
              key={video.id}
              videoId={video.videoId}
              title={video.title}
              channel={video.channel}
              category={video.category}
              description={video.description}
            />
          ))}
        </div>

        {/* CTA para ver todos */}
        <div className="text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 bg-prime-yellow text-prime-black px-8 py-4 rounded-lg font-bold hover:bg-prime-yellow-light transition-all hover:scale-105 shadow-lg shadow-prime-yellow/20"
          >
            <span>{t.viewAll}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
