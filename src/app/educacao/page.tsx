import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Educação em Detailing - Detailing Prime",
  description: "Aprenda técnicas profissionais de estética automotiva. Guias completos, tutoriais e cursos de detailing.",
  openGraph: {
    title: "Educação em Detailing - Detailing Prime",
    description: "Aprenda técnicas profissionais de detailing",
    url: "https://detailingprime.com.br/educacao",
  },
};

export default function EducationPage() {
  return (
    <div className="bg-prime-black min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-text-primary">
            <span className="text-prime-yellow">Educação</span> em Detailing
          </h1>
          <p className="text-xl text-text-secondary">
            Aprenda técnicas profissionais de estética automotiva do básico ao avançado
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-prime-gray-medium p-12 rounded-lg text-center">
            <div className="w-20 h-20 bg-prime-yellow rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-prime-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-text-primary">
              Conteúdo Educacional em Desenvolvimento
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              Estamos criando guias completos, tutoriais em vídeo e cursos profissionais de detailing.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-prime-black p-6 rounded-lg text-left">
                <h3 className="font-bold text-prime-yellow mb-3 text-lg">Nível Iniciante</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-prime-yellow mt-1">•</span>
                    <span>Fundamentos do detailing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-prime-yellow mt-1">•</span>
                    <span>Kit básico essencial</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-prime-yellow mt-1">•</span>
                    <span>Técnicas de lavagem segura</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-prime-yellow mt-1">•</span>
                    <span>Aplicação de ceras</span>
                  </li>
                </ul>
              </div>

              <div className="bg-prime-black p-6 rounded-lg text-left">
                <h3 className="font-bold text-prime-yellow mb-3 text-lg">Nível Avançado</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-prime-yellow mt-1">•</span>
                    <span>Polimento profissional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-prime-yellow mt-1">•</span>
                    <span>Correção de pintura</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-prime-yellow mt-1">•</span>
                    <span>Aplicação de PPF</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-prime-yellow mt-1">•</span>
                    <span>Ceramic coating</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-text-secondary mb-6">
              Enquanto isso, confira nossos artigos educacionais:
            </p>
            <Link
              href="/artigos"
              className="inline-block bg-prime-yellow text-prime-black px-8 py-3 rounded-lg font-bold hover:bg-prime-yellow-light transition-colors"
            >
              Ver Guias e Tutoriais
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
