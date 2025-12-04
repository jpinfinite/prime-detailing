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

    // Verificar se as variáveis de ambiente estão configuradas (com fallback)
    const repo = process.env.NEXT_PUBLIC_GISCUS_REPO || 'jpinfinite/prime-detailing';
    const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID || 'R_kgDOQgU-4g';
    const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'Announcements';
    const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || 'DIC_kwDOQgU-4s4CzUo5';

    if (!repo || !repoId || !categoryId) {
      console.warn('Giscus não configurado. Configure as variáveis de ambiente.');
      commentsRef.current.innerHTML = `
        <div class="text-center p-8 bg-prime-gray-medium rounded-lg border border-prime-gray-light">
          <p class="text-text-secondary mb-4">
            💬 Sistema de comentários em configuração
          </p>
          <p class="text-text-muted text-sm">
            Veja <a href="/CONFIGURAR-GISCUS.md" class="text-prime-yellow hover:underline">CONFIGURAR-GISCUS.md</a> para instruções
          </p>
        </div>
      `;
      return;
    }

    // Limpar comentários anteriores
    commentsRef.current.innerHTML = '';

    // Configurar Giscus
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'noborder_dark');
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
