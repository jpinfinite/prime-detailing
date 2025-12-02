"use client";

import { useState } from "react";
import VideoReview from "@/components/VideoReview";
import { videoReviews, getAllCategories } from "@/data/videoReviews";

export default function ReviewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const categories = ["Todos", ...getAllCategories()];

  const filteredVideos = selectedCategory === "Todos"
    ? videoReviews
    : videoReviews.filter(v => v.category === selectedCategory);

  return (
    <div className="min-h-screen bg-prime-black">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Reviews em <span className="text-prime-yellow">Vídeo</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Assista reviews honestos, tutoriais práticos e análises de produtos dos melhores canais de detailing do Brasil
          </p>
          
          {/* Linha decorativa */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-1 w-12 bg-prime-yellow"></div>
            <div className="h-2 w-2 bg-prime-yellow rotate-45"></div>
            <div className="h-1 w-12 bg-prime-yellow"></div>
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-prime-yellow text-prime-black shadow-lg shadow-prime-yellow/20"
                    : "bg-prime-gray-medium text-text-primary hover:bg-prime-gray-light hover:border-prime-yellow border border-transparent"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Contador */}
        <div className="mb-6 text-center">
          <p className="text-text-muted">
            {filteredVideos.length} {filteredVideos.length === 1 ? "vídeo" : "vídeos"} encontrado{filteredVideos.length === 1 ? "" : "s"}
          </p>
        </div>

        {/* Grid de Vídeos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
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

        {/* CTA */}
        <div className="mt-16 text-center bg-prime-gray-medium border border-prime-gray-light rounded-xl p-8">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Quer ver seu canal aqui?
          </h2>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Se você produz conteúdo de qualidade sobre detailing automotivo, entre em contato conosco para uma possível parceria.
          </p>
          <a
            href="/contato"
            className="inline-block bg-prime-yellow text-prime-black px-8 py-3 rounded-lg font-bold hover:bg-prime-yellow-light transition-colors"
          >
            Entrar em Contato
          </a>
        </div>
      </div>
    </div>
  );
}
