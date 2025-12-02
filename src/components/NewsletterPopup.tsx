'use client'

import { useState, useEffect } from 'react';
import NewsletterForm from './NewsletterForm';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Verificar se já mostrou antes (localStorage)
    const hasShownBefore = localStorage.getItem('newsletter_popup_shown');
    if (hasShownBefore) {
      setHasShown(true);
      return;
    }

    // Exit intent - detectar quando mouse sai da página
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        localStorage.setItem('newsletter_popup_shown', 'true');
      }
    };

    // Scroll intent - após 50% da página
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 50 && !hasShown) {
        setTimeout(() => {
          if (!hasShown) {
            setIsOpen(true);
            setHasShown(true);
            localStorage.setItem('newsletter_popup_shown', 'true');
          }
        }, 2000); // Aguarda 2 segundos após 50% de scroll
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasShown]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Popup */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4 animate-slideUp">
        <div className="bg-prime-gray-dark border-2 border-prime-yellow rounded-2xl p-8 relative">
          {/* Botão Fechar */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
            aria-label="Fechar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Conteúdo */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🚗✨</div>
            
            <h2 className="text-3xl font-bold text-text-primary mb-3">
              Espera! Não Vá Ainda
            </h2>
            
            <p className="text-text-secondary text-lg mb-2">
              Receba <span className="text-prime-yellow font-semibold">guias exclusivos</span> de detailing toda semana
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 text-sm text-text-muted mb-6">
              <span>✅ Técnicas profissionais</span>
              <span>✅ Reviews honestos</span>
              <span>✅ 100% gratuito</span>
            </div>
          </div>

          {/* Formulário */}
          <NewsletterForm 
            ctaText="Quero Receber Grátis"
            placeholder="Seu melhor email"
          />

          <p className="text-center text-text-muted text-xs mt-4">
            Sem spam. Cancele quando quiser.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -40%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </>
  );
}
