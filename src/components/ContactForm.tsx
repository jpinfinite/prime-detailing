'use client'

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Mensagem enviada com sucesso! Responderemos em breve.');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Reset após 5 segundos
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Erro ao enviar mensagem. Tente novamente.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Erro ao conectar com o servidor. Tente novamente.');
    }
  };

  return (
    <div className="bg-prime-gray-medium p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-text-primary">Envie sua Mensagem</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-text-primary mb-2">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="w-full px-4 py-3 bg-prime-black border border-prime-gray-light rounded-lg text-text-primary focus:outline-none focus:border-prime-yellow transition-colors disabled:opacity-50"
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-text-primary mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="w-full px-4 py-3 bg-prime-black border border-prime-gray-light rounded-lg text-text-primary focus:outline-none focus:border-prime-yellow transition-colors disabled:opacity-50"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-text-primary mb-2">Assunto</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="w-full px-4 py-3 bg-prime-black border border-prime-gray-light rounded-lg text-text-primary focus:outline-none focus:border-prime-yellow transition-colors disabled:opacity-50"
            placeholder="Sobre o que você quer falar?"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-text-primary mb-2">Mensagem</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            rows={6}
            className="w-full px-4 py-3 bg-prime-black border border-prime-gray-light rounded-lg text-text-primary focus:outline-none focus:border-prime-yellow resize-none transition-colors disabled:opacity-50"
            placeholder="Sua mensagem..."
          />
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg ${
              status === 'success'
                ? 'bg-green-900/20 border border-green-500 text-green-400'
                : 'bg-red-900/20 border border-red-500 text-red-400'
            }`}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-prime-yellow text-prime-black px-8 py-4 rounded-lg font-bold hover:bg-prime-yellow-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
        </button>
      </form>
    </div>
  );
}
