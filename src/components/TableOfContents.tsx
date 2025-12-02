'use client'

import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('article h2, article h3'));
    const headingData: Heading[] = elements.map((elem) => ({
      id: elem.id || elem.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
      text: elem.textContent || '',
      level: parseInt(elem.tagName.substring(1))
    }));

    // Adicionar IDs aos elementos que não têm
    elements.forEach((elem, index) => {
      if (!elem.id) {
        elem.id = headingData[index].id;
      }
    });

    setHeadings(headingData);

    // Observar scroll para destacar seção ativa
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 p-6 bg-prime-gray-medium rounded-lg border border-prime-gray-light max-h-[calc(100vh-120px)] overflow-y-auto">
      <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
        📑 Índice
      </h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? 'ml-4' : ''}
          >
            <a
              href={`#${heading.id}`}
              className={`block text-sm py-1 px-2 rounded transition-colors ${
                activeId === heading.id
                  ? 'text-prime-yellow font-semibold bg-prime-yellow/10'
                  : 'text-text-secondary hover:text-prime-yellow'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
