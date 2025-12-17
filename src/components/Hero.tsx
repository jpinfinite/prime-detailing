'use client';

import Link from 'next/link';
import Image from 'next/image';

interface HeroProps {
  locale: string;
}

export default function Hero({ locale }: HeroProps) {
  return (
    <section className="relative h-[85vh] min-h-[650px] flex items-center justify-center overflow-hidden">
      {/* Background Image - Editorial Style */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-detailing-hands-polishing.jpg"
          alt="Profissional aplicando técnica de polimento"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Medium Overlay - Discover Style */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content - Minimal & Direct */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        {/* H1 - Discover Headline (curto, curioso, específico) */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          O Que Realmente Funciona no Detailing Automotivo
        </h1>

        {/* Subheadline - Promise Clear */}
        <p className="text-xl md:text-2xl text-white/90 mb-12 font-light max-w-2xl mx-auto">
          Testes reais, técnicas práticas e produtos que entregam resultado de verdade
        </p>

        {/* SINGLE CTA - Discover hates indecision */}
        <Link
          href="/artigos"
          className="inline-block px-10 py-5 bg-prime-yellow text-prime-black font-bold text-lg rounded-lg hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-2xl"
        >
          Ver Guias Que Funcionam
        </Link>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-white/80"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
