import Image from "next/image";

// Gera rotas estáticas para todos os locales
export async function generateStaticParams() {
  return [
    { locale: 'pt' },
    { locale: 'en' },
    { locale: 'es' },
  ];
}

const translations = {
  pt: {
    title: "Sobre o Detailing Prime",
    subtitle: "Seu portal completo de estética automotiva",
    mission: "Nossa Missão",
    missionText: "Democratizar o conhecimento sobre estética automotiva, oferecendo conteúdo de qualidade, reviews honestos e tutoriais práticos para entusiastas e profissionais.",
    values: "Nossos Valores",
    value1: "Qualidade",
    value1Text: "Conteúdo técnico e bem pesquisado",
    value2: "Transparência",
    value2Text: "Reviews honestos e imparciais",
    value3: "Educação",
    value3Text: "Ensinar técnicas profissionais de forma acessível",
  },
  en: {
    title: "About Detailing Prime",
    subtitle: "Your complete automotive detailing portal",
    mission: "Our Mission",
    missionText: "Democratize knowledge about automotive detailing, offering quality content, honest reviews and practical tutorials for enthusiasts and professionals.",
    values: "Our Values",
    value1: "Quality",
    value1Text: "Technical and well-researched content",
    value2: "Transparency",
    value2Text: "Honest and unbiased reviews",
    value3: "Education",
    value3Text: "Teaching professional techniques in an accessible way",
  },
};

export default function AboutPage({ params }: { params: { locale: string } }) {
  const t = translations[params.locale as keyof typeof translations] || translations.pt;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
        <p className="text-xl text-gray-600 mb-12">{t.subtitle}</p>

        <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
          <Image
            src="/arquivos para o site/Banner/detailing-26-car--auto--sports-car--luxury-.jpg"
            alt="Detailing Prime"
            fill
            className="object-cover"
          />
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">{t.mission}</h2>
          <p className="text-lg text-gray-700">{t.missionText}</p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8">{t.values}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{t.value1}</h3>
              <p className="text-gray-700">{t.value1Text}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{t.value2}</h3>
              <p className="text-gray-700">{t.value2Text}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{t.value3}</h3>
              <p className="text-gray-700">{t.value3Text}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
