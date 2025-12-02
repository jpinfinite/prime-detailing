'use client'

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-prime-black flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="w-24 h-24 bg-prime-yellow rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-prime-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">
            Algo deu <span className="text-prime-yellow">errado</span>
          </h1>
          <p className="text-xl text-text-secondary mb-8">
            Desculpe, encontramos um problema ao carregar esta página.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-prime-yellow text-prime-black px-8 py-3 rounded-lg font-bold hover:bg-prime-yellow-light transition-colors"
          >
            Tentar Novamente
          </button>
          <Link
            href="/"
            className="bg-prime-gray-medium text-text-primary px-8 py-3 rounded-lg font-bold hover:bg-prime-gray-light transition-colors"
          >
            Voltar ao Início
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-prime-gray-medium rounded-lg text-left">
            <p className="text-sm text-text-secondary font-mono">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
