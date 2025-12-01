import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-prime-black flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Número 404 */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-prime-yellow mb-4">404</h1>
          <div className="w-32 h-1 bg-prime-yellow mx-auto mb-8"></div>
        </div>

        {/* Mensagem */}
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Página Não Encontrada
        </h2>
        <p className="text-xl text-text-secondary mb-8">
          Ops! Parece que esta página foi para o detailing e ainda não voltou.
        </p>

        {/* Ilustração */}
        <div className="relative w-64 h-64 mx-auto mb-8 opacity-50">
          <Image
            src="/arquivos para o site/Destaques/detailing-1-car-washing--worker--man--car-.jpg"
            alt="Car detailing"
            fill
            className="object-cover rounded-lg grayscale"
          />
        </div>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-prime-yellow hover:bg-prime-yellow-dark text-prime-black px-8 py-3 rounded-lg font-semibold transition-all inline-block"
          >
            ← Voltar para Home
          </Link>
          <Link
            href="/artigos"
            className="bg-prime-gray-medium hover:bg-prime-gray-light text-text-primary px-8 py-3 rounded-lg font-semibold transition-all inline-block border border-prime-gray-light"
          >
            Ver Artigos
          </Link>
        </div>

        {/* Links úteis */}
        <div className="mt-12 pt-8 border-t border-prime-gray-medium">
          <p className="text-text-secondary mb-4">Páginas populares:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/sobre" className="text-prime-yellow hover:text-prime-yellow-light">
              Sobre
            </Link>
            <Link href="/reviews" className="text-prime-yellow hover:text-prime-yellow-light">
              Reviews
            </Link>
            <Link href="/educacao" className="text-prime-yellow hover:text-prime-yellow-light">
              Educação
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
