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
      {/* Botão Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center space-y-1.5 text-text-primary"
        aria-label="Menu"
      >
        <span
          className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-prime-black border-l border-prime-gray-medium z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header do Menu */}
          <div className="p-6 border-b border-prime-gray-medium">
            <h2 className="text-2xl font-bold text-text-primary">Menu</h2>
          </div>

          {/* Links de Navegação */}
          <nav className="flex-1 overflow-y-auto py-6">
            <ul className="space-y-2 px-4">
              {menuItems.map((item, index) => (
                <li
                  key={item.href}
                  style={{
                    animation: isOpen
                      ? `slideIn 0.3s ease-out ${index * 0.1}s both`
                      : "none",
                  }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-4 px-4 py-3 rounded-lg text-text-primary hover:bg-prime-gray-medium hover:text-prime-yellow transition-all group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className="text-lg font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer do Menu */}
          <div className="p-6 border-t border-prime-gray-medium">
            <div className="flex items-center justify-between mb-4">
              <span className="text-text-secondary text-sm">Idioma</span>
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 rounded transition-all ${
                    locale === "pt"
                      ? "bg-prime-yellow text-prime-black font-semibold"
                      : "text-text-secondary hover:text-prime-yellow"
                  }`}
                >
                  PT
                </button>
                <button
                  className={`px-3 py-1 rounded transition-all ${
                    locale === "en"
                      ? "bg-prime-yellow text-prime-black font-semibold"
                      : "text-text-secondary hover:text-prime-yellow"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 justify-center">
              <a
                href="#"
                className="text-text-secondary hover:text-prime-yellow transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-text-secondary hover:text-prime-yellow transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
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
