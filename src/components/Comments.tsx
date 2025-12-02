'use client'

import { useEffect, useRef } from 'react';

interface CommentsProps {
  slug: string;
  title: string;
}

export default function Comments({ slug, title }: CommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!commentsRef.current) return;

    // Limpar comentários anteriores
    commentsRef.current.innerHTML = '';

    // Configurar Giscus
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'jpinfinite/prime-detailing'); // Altere para seu repo
    script.setAttribute('data-repo-id', 'SEU_REPO_ID'); // Configure no GitHub
    script.setAttribute('data-category', 'Comments');
    script.setAttribute('data-category-id', 'SEU_CATEGORY_ID'); // Configure no GitHub
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'dark');
    script.setAttribute('data-lang', 'pt');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    commentsRef.current.appendChild(script);
  }, [slug]);

  return (
    <section className="mt-16 pt-8 border-t border-prime-gray-light">
      <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
        💬 Comentários
      </h2>
      <div className="bg-prime-gray-medium rounded-lg p-6">
        <div ref={commentsRef} />
      </div>
    </section>
  );
}
