"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  locale: string;
  translations: {
    home: string;
    articles: string;
    reviews: string;
    education: string;
    about: string;
  };
}

export default function MobileMenu({ locale, translations }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Fechar menu ao mudar de rota
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevenir scroll quando menu aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menuItems = [
    { href: "/", label: translations.home, icon: "🏠" },
    { href: "/artigos", label: translations.articles, icon: "📚" },
    { href: "/reviews", label: translations.reviews, icon: "⭐" },
    { href: "/educacao", label: translations.education, icon: "🎓" },
    { href: "/sobre", label: translations.about, icon: "ℹ️" },
  ];

  return (
    <>
      {/* Botão Hamburger Melhorado */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed right-4 top-4 z-[60] w-12 h-12 flex flex-col items-center justify-center rounded-lg hover:bg-prime-gray-medium transition-all active:scale-95"
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        <span
          className={`block w-6 h-0.5 bg-prime-yellow transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-prime-yellow transition-all duration-300 my-1.5 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-prime-yellow transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[45] transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        role="button"
        tabIndex={-1}
        onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
      />

      {/* Menu Drawer Melhorado */}
      <div
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-prime-black border-l border-prime-gray-light shadow-2xl z-[50] transform transition-transform duration-300 ease-in-out md:hidden overflow-hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header do Menu com Gradiente */}
          <div className="p-6 border-b border-prime-gray-medium bg-gradient-to-r from-prime-black to-prime-gray-dark">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-prime-yellow">Menu</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-prime-gray-medium transition-colors"
                aria-label="Fechar menu"
              >
                <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Links de Navegação Melhorados */}
          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <ul className="space-y-1">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <li
                    key={item.href}
                    style={{
                      animation: isOpen
                        ? `slideIn 0.3s ease-out ${index * 0.08}s both`
                        : "none",
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-4 px-5 py-4 rounded-xl transition-all group relative overflow-hidden ${
                        isActive
                          ? "bg-prime-yellow text-prime-black font-semibold shadow-lg"
                          : "text-text-primary hover:bg-prime-gray-medium hover:text-prime-yellow"
                      }`}
                    >
                      {/* Efeito de brilho ao hover */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      
                      <span className={`text-2xl group-hover:scale-110 transition-transform ${isActive ? "scale-110" : ""}`}>
                        {item.icon}
                      </span>
                      <span className="text-lg font-medium relative z-10">{item.label}</span>
                      
                      {/* Indicador de página ativa */}
                      {isActive && (
                        <span className="ml-auto">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer do Menu Melhorado */}
          <div className="p-6 border-t border-prime-gray-medium bg-gradient-to-t from-prime-gray-dark to-transparent">
            {/* Seletor de Idioma */}
            <div className="mb-6">
              <span className="text-text-secondary text-xs uppercase tracking-wider mb-3 block">Idioma</span>
              <div className="flex gap-2">
                <button
                  className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all ${
                    locale === "pt"
                      ? "bg-prime-yellow text-prime-black shadow-lg scale-105"
                      : "bg-prime-gray-medium text-text-secondary hover:bg-prime-gray-light hover:text-prime-yellow"
                  }`}
                >
                  🇧🇷 PT
                </button>
                <button
                  className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all ${
                    locale === "en"
                      ? "bg-prime-yellow text-prime-black shadow-lg scale-105"
                      : "bg-prime-gray-medium text-text-secondary hover:bg-prime-gray-light hover:text-prime-yellow"
                  }`}
                >
                  🇺🇸 EN
                </button>
              </div>
            </div>

            {/* Social Links Melhorados */}
            <div>
              <span className="text-text-secondary text-xs uppercase tracking-wider mb-3 block">Redes Sociais</span>
              <div className="flex gap-3 justify-center">
                <a
                  href="#"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-prime-gray-medium text-text-secondary hover:bg-prime-yellow hover:text-prime-black transition-all hover:scale-110 active:scale-95"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-prime-gray-medium text-text-secondary hover:bg-prime-yellow hover:text-prime-black transition-all hover:scale-110 active:scale-95"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-prime-gray-medium text-text-secondary hover:bg-prime-yellow hover:text-prime-black transition-all hover:scale-110 active:scale-95"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animação CSS */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
