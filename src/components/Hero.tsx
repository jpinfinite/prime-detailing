'use client';

import Link from 'next/link';

interface HeroProps {
  locale: string;
}

export default function Hero({ locale }: HeroProps) {
  return (
    <section className="relative h-[85vh] min-h-[650px] flex items-center justify-center overflow-hidden">
      {/* Background - Premium Gradient (Temporary until images are ready) */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />

        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.2) 0%, transparent 50%)'
        }} />

        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)'
        }} />
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
