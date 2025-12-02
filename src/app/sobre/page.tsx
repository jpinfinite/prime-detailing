import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre o Detailing Prime - Estética Automotiva Profissional",
  description: "Conheça o Detailing Prime, seu portal completo de conteúdo sobre estética automotiva. Guias, reviews e técnicas profissionais.",
  openGraph: {
    title: "Sobre o Detailing Prime",
    description: "Seu portal completo de estética automotiva",
    url: "https://detailingprime.com.br/sobre",
    siteName: "Detailing Prime",
    images: [{ url: "https://detailingprime.com.br/logo-principal.png" }],
    locale: "pt_BR",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-prime-black min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-prime-gray-dark to-prime-black py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-text-primary">
              Sobre o <span className="text-prime-yellow">Detailing Prime</span>
            </h1>
            <p className="text-xl text-text-secondary">
              Seu portal completo de estética automotiva profissional
            </p>
          </div>
        </div>
      </section>

      {/* Missão */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-text-primary">Nossa Missão</h2>
                <p className="text-text-secondary mb-4">
                  O Detailing Prime nasceu com o objetivo de democratizar o conhecimento sobre estética automotiva no Brasil.
                </p>
                <p className="text-text-secondary mb-4">
                  Acreditamos que todo apaixonado por carros merece acesso a conteúdo de qualidade, técnicas profissionais e reviews honestas de produtos.
                </p>
                <p className="text-text-secondary">
                  Nossa missão é transformar o Detailing Prime no maior portal brasileiro de conteúdo automotivo focado em estética, cuidados e técnicas profissionais.
                </p>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="/images/pexels/car-detailing-6873074.jpg"
                  alt="Detailing profissional"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Valores */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-text-primary text-center">Nossos Valores</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-prime-gray-medium p-6 rounded-lg">
                  <div className="w-12 h-12 bg-prime-yellow rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-prime-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-text-primary">Qualidade</h3>
                  <p className="text-text-secondary">
                    Conteúdo profissional, bem pesquisado e sempre atualizado com as melhores práticas do mercado.
                  </p>
                </div>

                <div className="bg-prime-gray-medium p-6 rounded-lg">
                  <div className="w-12 h-12 bg-prime-yellow rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-prime-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-text-primary">Educação</h3>
                  <p className="text-text-secondary">
                    Ensinar técnicas profissionais de forma acessível para iniciantes e entusiastas.
                  </p>
                </div>

                <div className="bg-prime-gray-medium p-6 rounded-lg">
                  <div className="w-12 h-12 bg-prime-yellow rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-prime-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-text-primary">Transparência</h3>
                  <p className="text-text-secondary">
                    Reviews honestas e imparciais de produtos e técnicas do mercado de detailing.
                  </p>
                </div>
              </div>
            </div>

            {/* O que oferecemos */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-text-primary text-center">O Que Oferecemos</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-prime-yellow rounded-full flex items-center justify-center">
                    <span className="text-prime-black font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">Guias Completos</h3>
                    <p className="text-text-secondary">Tutoriais passo a passo sobre técnicas de detailing</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-prime-yellow rounded-full flex items-center justify-center">
                    <span className="text-prime-black font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">Reviews de Produtos</h3>
                    <p className="text-text-secondary">Análises detalhadas de ceras, polimentos e acessórios</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-prime-yellow rounded-full flex items-center justify-center">
                    <span className="text-prime-black font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">Comparativos</h3>
                    <p className="text-text-secondary">Comparações diretas entre produtos e técnicas</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-prime-yellow rounded-full flex items-center justify-center">
                    <span className="text-prime-black font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">Notícias do Setor</h3>
                    <p className="text-text-secondary">Novidades e tendências do mercado automotivo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-prime-yellow to-prime-yellow-dark p-8 rounded-lg text-center">
              <h2 className="text-3xl font-bold mb-4 text-prime-black">
                Faça Parte da Nossa Comunidade
              </h2>
              <p className="text-prime-black mb-6">
                Receba conteúdo exclusivo, dicas profissionais e novidades direto no seu email
              </p>
              <Link
                href="/#newsletter"
                className="inline-block bg-prime-black text-prime-yellow px-8 py-3 rounded-lg font-bold hover:bg-prime-black-light transition-colors"
              >
                Assinar Newsletter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
