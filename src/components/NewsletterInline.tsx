'use client'

import { useState } from 'react';

export default function NewsletterInline() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('🎉 Inscrição realizada! Confira seu email.');
        setEmail('');
        
        // Track conversion
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'newsletter_signup', {
            method: 'inline_article',
            location: 'article_bottom'
          });
        }
      } else {
        setStatus('error');
        setMessage(data.error || 'Erro ao inscrever. Tente novamente.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Erro ao conectar. Tente novamente mais tarde.');
    }

    setTimeout(() => {
      if (status !== 'success') {
        setStatus('idle');
        setMessage('');
      }
    }, 5000);
  };

  if (status === 'success') {
    return (
      <div className="mt-12 p-8 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-lg border-2 border-green-500/30 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-text-primary mb-3">
          Inscrição Confirmada!
        </h3>
        <p className="text-text-secondary text-lg">
          Verifique seu email para confirmar. Bem-vindo à comunidade!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 p-8 bg-gradient-to-br from-prime-yellow/10 to-prime-yellow/5 rounded-lg border-2 border-prime-yellow/30">
      <div className="max-w-2xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-prime-yellow/20 border border-prime-yellow/40 rounded-full px-4 py-2 mb-4">
          <span className="text-2xl">📧</span>
          <span className="text-prime-yellow font-semibold text-sm">Newsletter Exclusiva</span>
        </div>
        
        {/* Título */}
        <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
          Gostou deste artigo?
        </h3>
        
        {/* Descrição */}
        <p className="text-text-secondary text-lg mb-6">
          Receba guias exclusivos, reviews e técnicas profissionais toda semana no seu email
        </p>
        
        {/* Formulário */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            disabled={status === 'loading'}
            className="flex-1 px-4 py-3 bg-prime-gray-dark border border-prime-gray-light rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-prime-yellow transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-prime-yellow hover:bg-prime-yellow-light text-prime-black font-bold rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {status === 'loading' ? 'Enviando...' : 'Quero Receber'}
          </button>
        </form>
        
        {/* Mensagem de erro */}
        {message && status === 'error' && (
          <p className="text-red-400 text-sm mb-4">{message}</p>
        )}
        
        {/* Benefícios */}
        <p className="text-text-muted text-sm">
          ✅ 100% gratuito • ✅ Cancele quando quiser • ✅ Sem spam
        </p>
      </div>
    </div>
  );
}
