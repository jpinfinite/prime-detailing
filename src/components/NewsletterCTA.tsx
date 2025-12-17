'use client';

import { useState } from 'react';

interface NewsletterCTAProps {
  locale: string;
}

export default function NewsletterCTA({ locale }: NewsletterCTAProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="newsletter" className="py-16 bg-gradient-to-br from-prime-yellow to-yellow-500">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline - Curto e Direto (Discover Style) */}
          <h2 className="text-3xl md:text-4xl font-bold text-prime-black mb-4">
            Receba dicas que não aparecem no feed
          </h2>

          {/* Form - Zero Friction */}
          {status === 'success' ? (
            <div className="bg-white rounded-lg p-6 text-green-600">
              <svg className="w-12 h-12 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="font-semibold">Pronto! Verifique seu e-mail</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                required
                className="flex-1 px-6 py-4 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-prime-black"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-4 bg-prime-black text-white font-bold rounded-lg hover:bg-gray-900 transition-all disabled:opacity-50"
              >
                {status === 'loading' ? 'Enviando...' : 'Quero Receber'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="text-red-600 mt-4">Erro. Tente novamente.</p>
          )}
        </div>
      </div>
    </section>
  );
}
