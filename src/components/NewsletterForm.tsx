'use client'

import { useState } from 'react';

interface NewsletterFormProps {
  ctaText?: string;
  placeholder?: string;
}

export default function NewsletterForm({ 
  ctaText = 'Assinar',
  placeholder = 'seu@email.com'
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Inscrição realizada com sucesso! Verifique seu email.');
        setEmail('');
        
        // Reset após 5 segundos
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Erro ao realizar inscrição. Tente novamente.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Erro ao conectar com o servidor. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          disabled={status === 'loading'}
          className="flex-1 px-6 py-4 bg-prime-black border-2 border-prime-gray-light focus:border-prime-yellow rounded-lg text-white placeholder-gray-500 outline-none transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-8 py-4 bg-prime-yellow hover:bg-prime-yellow-dark text-prime-black font-bold rounded-lg transition-all transform hover:scale-105 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {status === 'loading' ? 'Enviando...' : ctaText}
        </button>
      </div>

      {message && (
        <div
          className={`mt-4 p-4 rounded-lg text-center ${
            status === 'success'
              ? 'bg-green-900/20 border border-green-500 text-green-400'
              : 'bg-red-900/20 border border-red-500 text-red-400'
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}
