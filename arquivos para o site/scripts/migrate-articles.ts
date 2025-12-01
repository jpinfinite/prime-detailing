/**
 * Script de Migração de Artigos HTML para Next.js App Router
 * 
 * Converte artigos HTML estáticos da pasta public/articles/
 * para o formato moderno Next.js 13+ em app/artigos/
 */

import * as fs from 'fs';
import * as path from 'path';
import { JSDOM } from 'jsdom';

interface ArticleData {
  slug: string;
  titlePt: string;
  titleEn: string;
  descriptionPt: string;
  descriptionEn: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  keywords: string[];
  contentPt: string;
  contentEn: string;
}

// Função para extrair dados de um arquivo HTML
function extractArticleData(htmlPathPt: string, htmlPathEn: string): ArticleData | null {
  try {
    const htmlPt = fs.readFileSync(htmlPathPt, 'utf-8');
    const htmlEn = fs.readFileSync(htmlPathEn, 'utf-8');
    
    const domPt = new JSDOM(htmlPt);
    const domEn = new JSDOM(htmlEn);
    
    const docPt = domPt.window.document;
    const docEn = domEn.window.document;
    
    // Extrair metadados
    const slug = path.basename(htmlPathPt, '.html');
    const titlePt = docPt.querySelector('h1')?.textContent || '';
    const titleEn = docEn.querySelector('h1')?.textContent || '';
    const descriptionPt = docPt.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const descriptionEn = docEn.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const keywords = (docPt.querySelector('meta[name="keywords"]')?.getAttribute('content') || '').split(',').map(k => k.trim());
    const category = docPt.querySelector('.article-category')?.textContent || 'ARTIGOS';
    const date = docPt.querySelector('time')?.getAttribute('datetime') || '2025-11-28';
    const readTime = docPt.querySelector('.article-read-time')?.textContent || '10 min de leitura';
    const image = docPt.querySelector('.article-hero-image')?.getAttribute('src') || '';
    
    // Extrair conteúdo das seções
    const sectionsPt = Array.from(docPt.querySelectorAll('.article-section'));
    const sectionsEn = Array.from(docEn.querySelectorAll('.article-section'));
    
    const contentPt = sectionsPt.map(section => section.innerHTML).join('\n');
    const contentEn = sectionsEn.map(section => section.innerHTML).join('\n');
    
    return {
      slug,
      titlePt,
      titleEn,
      descriptionPt,
      descriptionEn,
      category,
      date,
      readTime,
      image,
      keywords,
      contentPt,
      contentEn
    };
  } catch (error) {
    console.error(`Erro ao processar ${htmlPathPt}:`, error);
    return null;
  }
}

// Função para gerar o arquivo page.tsx
function generatePageTsx(article: ArticleData): string {
  return `import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '${article.titlePt} | PRIME Auto News',
  description: '${article.descriptionPt}',
  keywords: [${article.keywords.map(k => `'${k}'`).join(', ')}],
  openGraph: {
    title: '${article.titlePt}',
    description: '${article.descriptionPt}',
    images: ['${article.image}'],
    type: 'article',
    publishedTime: '${article.date}',
  },
  twitter: {
    card: 'summary_large_image',
    title: '${article.titlePt}',
    description: '${article.descriptionPt}',
    images: ['${article.image}'],
  },
  alternates: {
    languages: {
      'pt-BR': '/pt/artigos/${article.slug}',
      'en-US': '/en/artigos/${article.slug}',
    },
  },
};

export default function ArticlePage() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-12">
        <div className="relative w-full h-[400px] mb-8 rounded-2xl overflow-hidden">
          <Image
            src="${article.image}"
            alt="${article.titlePt}"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
          <span className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full font-semibold">
            ${article.category}
          </span>
          <time dateTime="${article.date}">
            ${new Date(article.date).toLocaleDateString('pt-BR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </time>
          <span>${article.readTime}</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
          ${article.titlePt}
        </h1>
        
        <p className="text-xl text-gray-300 leading-relaxed">
          ${article.descriptionPt}
        </p>
      </header>

      {/* Content */}
      <div className="prose prose-invert prose-lg max-w-none">
        <div className="article-content" dangerouslySetInnerHTML={{ __html: \`${article.contentPt.replace(/`/g, '\\`')}\` }} />
      </div>

      {/* Tags */}
      <div className="mt-12 pt-8 border-t border-gray-800">
        <div className="flex flex-wrap gap-2">
          {${JSON.stringify(article.keywords)}.map((tag: string) => (
            <span
              key={tag}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 p-8 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-2xl border border-red-600/30">
        <h3 className="text-2xl font-bold mb-4 text-white">
          Gostou deste artigo?
        </h3>
        <p className="text-gray-300 mb-6">
          Continue acompanhando o PRIME Auto News para mais dicas, guias e novidades do mundo automotivo.
        </p>
        <div className="flex gap-4">
          <a
            href="/artigos"
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Ver Mais Artigos
          </a>
          <a
            href="/newsletter"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Assinar Newsletter
          </a>
        </div>
      </div>
    </article>
  );
}
`;
}

// Função principal de migração
async function migrateArticles() {
  const publicArticlesPt = path.join(process.cwd(), 'public', 'articles', 'pt');
  const publicArticlesEn = path.join(process.cwd(), 'public', 'articles', 'en');
  const appArticlesDir = path.join(process.cwd(), 'app', 'artigos');
  
  // Listar todos os arquivos HTML em português
  const htmlFiles = fs.readdirSync(publicArticlesPt).filter(f => f.endsWith('.html'));
  
  console.log(`🚀 Iniciando migração de ${htmlFiles.length} artigos...\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const htmlFile of htmlFiles) {
    const htmlPathPt = path.join(publicArticlesPt, htmlFile);
    const htmlPathEn = path.join(publicArticlesEn, htmlFile);
    
    // Verificar se existe versão em inglês
    if (!fs.existsSync(htmlPathEn)) {
      console.log(`⚠️  Pulando ${htmlFile} - versão em inglês não encontrada`);
      errorCount++;
      continue;
    }
    
    // Extrair dados
    const articleData = extractArticleData(htmlPathPt, htmlPathEn);
    
    if (!articleData) {
      console.log(`❌ Erro ao processar ${htmlFile}`);
      errorCount++;
      continue;
    }
    
    // Criar diretório do artigo
    const articleDir = path.join(appArticlesDir, articleData.slug);
    if (!fs.existsSync(articleDir)) {
      fs.mkdirSync(articleDir, { recursive: true });
    }
    
    // Gerar e salvar page.tsx
    const pageTsx = generatePageTsx(articleData);
    const pagePath = path.join(articleDir, 'page.tsx');
    fs.writeFileSync(pagePath, pageTsx, 'utf-8');
    
    console.log(`✅ Migrado: ${articleData.slug}`);
    successCount++;
  }
  
  console.log(`\n📊 Migração concluída!`);
  console.log(`✅ Sucesso: ${successCount} artigos`);
  console.log(`❌ Erros: ${errorCount} artigos`);
}

// Executar migração
migrateArticles().catch(console.error);
