import Image from "next/image";
import Link from "next/link";

const translations = {
  pt: {
    badge: "🏆 Portal #1 de Detailing no Brasil",
    title: "Conteúdo de Estética Automotiva",
    subtitle: "Profissional, Atual e Direto ao Ponto",
    description: "Guias completos, reviews honestos e técnicas profissionais para quem ama cuidar do carro.",
    cta1: "Guias Essenciais",
    cta2: "Ver Reviews",
    stats: {
      articles: "17+ Artigos",
      words: "40k+ Palavras",
      updated: "Atualizado 2025"
    }
  },
  en: {
    badge: "🏆 #1 Detailing Portal in Brazil",
    title: "Automotive Detailing Content",
    subtitle: "Professional, Current and Straight to the Point",
    description: "Complete guides, honest reviews and professional techniques for car care enthusiasts.",
    cta1: "Essential Guides",
    cta2: "See Reviews",
    stats: {
      articles: "17+ Articles",
      words: "40k+ Words",
      updated: "Updated 2025"
    }
  },
};

export default function Hero({ locale }: { locale: string }) {
  const t = translations[locale as keyof typeof translations] || translations.pt;

  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background com Hero Banner Premium */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-banner-v2.jpg"
          alt="Detailing Prime - Estética Automotiva Profissional Premium"
          fill
          className="object-cover"
          priority
          quality={95}
        />
        {/* Overlay gradiente com identidade amarela */}
        <div className="absolute inset-0 bg-gradient-to-br from-prime-black/85 via-prime-black/75 to-transparent"></div>
        {/* Destaque amarelo sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-prime-yellow/10 via-transparent to-transparent"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-prime-yellow/10 border border-prime-yellow/30 rounded-full px-6 py-2 mb-8 backdrop-blur-sm">
            <span className="text-prime-yellow font-semibold text-sm md:text-base">
              {t.badge}
            </span>
          </div>

          {/* Título Principal com destaque amarelo */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight">
            <span className="text-white">{t.title}</span>
            <br />
            <span className="text-prime-yellow bg-clip-text">{t.subtitle}</span>
          </h1>

          {/* Linha decorativa */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent to-prime-yellow"></div>
            <div className="h-2 w-2 bg-prime-yellow rotate-45"></div>
            <div className="h-1 w-20 bg-gradient-to-l from-transparent to-prime-yellow"></div>
          </div>

          {/* Descrição */}
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.description}
          </p>

          {/* CTAs com design forte */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/artigos"
              className="group relative px-8 py-4 bg-prime-yellow hover:bg-prime-yellow-dark text-prime-black font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-prime-yellow/50"
            >
              <span className="relative z-10">{t.cta1}</span>
              <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link
              href="/artigos"
              className="group px-8 py-4 bg-transparent border-2 border-prime-yellow text-prime-yellow hover:bg-prime-yellow hover:text-prime-black font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              {t.cta2}
            </Link>
          </div>

          {/* Stats com design moderno */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {Object.values(t.stats).map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-prime-gray-medium/50 backdrop-blur-sm border border-prime-yellow/20 rounded-lg p-4 hover:border-prime-yellow/60 transition-all hover:transform hover:scale-105">
                  <div className="text-prime-yellow font-bold text-lg md:text-xl mb-1">
                    {stat.split(' ')[0]}
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm">
                    {stat.split(' ').slice(1).join(' ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Elemento decorativo inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-prime-black to-transparent"></div>
    </section>
  );
}
