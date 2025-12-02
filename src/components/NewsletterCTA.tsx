import NewsletterForm from './NewsletterForm';

const translations = {
  pt: {
    badge: "📧 Fique por Dentro",
    title: "Receba Conteúdo Premium",
    subtitle: "Guias exclusivos, reviews e técnicas profissionais direto no seu email",
    placeholder: "seu@email.com",
    cta: "Quero Receber",
    privacy: "Sem spam. Cancele quando quiser.",
    benefits: [
      "✅ Guias exclusivos semanais",
      "✅ Reviews antes de todos",
      "✅ Técnicas profissionais",
      "✅ 100% gratuito"
    ]
  },
  en: {
    badge: "📧 Stay Updated",
    title: "Receive Premium Content",
    subtitle: "Exclusive guides, reviews and professional techniques straight to your inbox",
    placeholder: "your@email.com",
    cta: "Subscribe Now",
    privacy: "No spam. Unsubscribe anytime.",
    benefits: [
      "✅ Weekly exclusive guides",
      "✅ Reviews before everyone",
      "✅ Professional techniques",
      "✅ 100% free"
    ]
  },
};

export default function NewsletterCTA({ locale }: { locale: string }) {
  const t = translations[locale as keyof typeof translations] || translations.pt;

  return (
    <section className="py-20 bg-prime-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-prime-yellow/10 via-transparent to-prime-yellow/5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-prime-gray-dark to-prime-gray-medium border-2 border-prime-yellow/30 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-prime-yellow/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-prime-yellow/10 border border-prime-yellow/30 rounded-full px-6 py-2 mb-6">
                  <span className="text-prime-yellow font-semibold">{t.badge}</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{t.title}</h2>
                <p className="text-gray-400 text-lg">{t.subtitle}</p>
              </div>

              <NewsletterForm ctaText={t.cta} placeholder={t.placeholder} />

              <p className="text-center text-gray-500 text-sm mb-6">{t.privacy}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {t.benefits.map((benefit, index) => (
                  <div key={index} className="text-gray-300 text-sm text-center md:text-left">
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
