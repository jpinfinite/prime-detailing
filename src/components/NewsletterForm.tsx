'use client'

import { useState } from 'react';

interface NewsletterFormProps {
  ctaText?: string;
  placeholder?: string;
}

export default function NewsletterForm({ 
  ctaText = 'Assinar Grátis',
  placeholder = 'Seu melhor email'
}: NewsletterFormProps) {
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
        setMessage('Inscrição realizada com sucesso! Confira seu email.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Erro ao inscrever. Tente novamente.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Erro ao conectar. Tente novamente mais tarde.');
    }

    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        disabled={status === 'loading'}
        className="flex-1 px-4 py-3 bg-prime-gray-dark border border-prime-gray-light rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-prime-yellow transition-colors disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 bg-prime-yellow hover:bg-prime-yellow-light text-prime-black font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Enviando...' : ctaText}
      </button>
      
      {message && (
        <div className={`col-span-full text-center text-sm mt-2 ${
          status === 'success' ? 'text-green-400' : 'text-red-400'
        }`}>
          {message}
        </div>
      )}
    </form>
  );
}
