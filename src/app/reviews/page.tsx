import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reviews de Produtos - Detailing Prime",
  description: "Reviews honestas e detalhadas de produtos de estética automotiva. Ceras, polimentos, microfibras e mais.",
  openGraph: {
    title: "Reviews de Produtos - Detailing Prime",
    description: "Reviews honestas de produtos de detailing",
    url: "https://detailingprime.com.br/reviews",
  },
};

export default function ReviewsPage() {
  return (
    <div className="bg-prime-black min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-text-primary">
            <span className="text-prime-yellow">Reviews</span> de Produtos
          </h1>
          <p className="text-xl text-text-secondary">
            Análises honestas e detalhadas dos melhores produtos de estética automotiva
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-prime-gray-medium p-12 rounded-lg text-center">
            <div className="w-20 h-20 bg-prime-yellow rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-prime-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-text-primary">
              Reviews em Breve
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              Estamos preparando reviews completas e profissionais dos melhores produtos do mercado.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-prime-black p-6 rounded-lg">
                <h3 className="font-bold text-prime-yellow mb-2">Ceras & Selantes</h3>
                <p className="text-text-secondary text-sm">Análises de durabilidade e brilho</p>
              </div>
              <div className="bg-prime-black p-6 rounded-lg">
                <h3 className="font-bold text-prime-yellow mb-2">Polimentos</h3>
                <p className="text-text-secondary text-sm">Testes de corte e acabamento</p>
              </div>
              <div className="bg-prime-black p-6 rounded-lg">
                <h3 className="font-bold text-prime-yellow mb-2">Acessórios</h3>
                <p className="text-text-secondary text-sm">Reviews de microfibras e ferramentas</p>
              </div>
            </div>
            <Link
              href="/artigos"
              className="inline-block bg-prime-yellow text-prime-black px-8 py-3 rounded-lg font-bold hover:bg-prime-yellow-light transition-colors"
            >
              Ver Artigos Disponíveis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
