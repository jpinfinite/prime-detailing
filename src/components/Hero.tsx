import Image from "next/image";
import Link from "next/link";

const translations = {
  pt: {
    title: "Estética Automotiva Profissional",
    subtitle: "Notícias, educação e reviews sobre detailing",
    cta: "Explorar Artigos",
  },
  en: {
    title: "Professional Automotive Detailing",
    subtitle: "News, education and reviews about detailing",
    cta: "Explore Articles",
  },
};

export default function Hero({ locale }: { locale: string }) {
  const t = translations[locale as keyof typeof translations] || translations.pt;

  return (
    <section className="relative h-[600px] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/arquivos para o site/Banner/detailing-1-car-washing--worker--man--car-.jpg"
          alt="Car detailing"
          fill
          className="object-cover brightness-[0.3]"
          priority
        />
      </div>
      
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-text-primary">{t.title}</h1>
        <p className="text-xl md:text-2xl mb-8 text-text-secondary">{t.subtitle}</p>
        <Link
          href="/artigos"
          className="relative inline-block group"
        >
          <svg 
            className="w-64 h-16" 
            viewBox="0 0 256 64" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M0 20C0 20 30 5 64 10C98 15 128 5 160 10C192 15 222 5 256 15V44C256 44 226 59 192 54C158 49 128 59 96 54C64 49 34 59 0 49V20Z" 
              fill="#FFC107"
              className="group-hover:fill-[#FFB300] transition-colors"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-prime-black font-bold text-lg">
            {t.cta}
          </span>
        </Link>
      </div>
    </section>
  );
}
