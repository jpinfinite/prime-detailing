import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export interface Article {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
  locale: string;
  featured?: boolean;
  tags?: string[];
  readTime?: string;
}

export async function getArticleBySlug(slug: string, locale: string = 'pt'): Promise<Article | null> {
  try {
    const fullPath = path.join(articlesDirectory, locale, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Converter markdown para HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    // Calcular tempo de leitura (aproximadamente 200 palavras por minuto)
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    // Gerar excerpt se não existir
    const excerpt = data.description || content.substring(0, 160).trim() + '...';

    return {
      slug,
      title: data.title,
      description: data.description || excerpt,
      excerpt,
      content: contentHtml,
      date: data.date,
      category: data.category || 'Geral',
      image: data.image || '/images/pexels/pexels-tima-miroshnichenko-6873076.jpg',
      locale,
      featured: data.featured || false,
      tags: data.tags || [],
      readTime: `${readTime} min`,
    };
  } catch (error) {
    console.error(`Error loading article ${slug}:`, error);
    return null;
  }
}

export function getAllArticles(locale: string = 'pt'): Article[] {
  try {
    const localeDir = path.join(articlesDirectory, locale);
    
    // Verificar se o diretório existe
    if (!fs.existsSync(localeDir)) {
      console.warn(`Directory not found: ${localeDir}`);
      return [];
    }

    const fileNames = fs.readdirSync(localeDir);

    const articles = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(localeDir, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Gerar excerpt
        const excerpt = data.description || content.substring(0, 160).trim() + '...';

        // Calcular tempo de leitura
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200);

        return {
          slug,
          title: data.title,
          description: data.description || excerpt,
          excerpt,
          content: '', // Não carregar conteúdo completo na listagem
          date: data.date,
          category: data.category || 'Geral',
          image: data.image || '/images/pexels/pexels-tima-miroshnichenko-6873076.jpg',
          locale,
          featured: data.featured || false,
          tags: data.tags || [],
          readTime: `${readTime} min`,
        };
      })
      .filter((article) => article !== null) as Article[];

    return articles.sort((a, b) => (a.date > b.date ? -1 : 1));
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
}

export function getFeaturedArticles(locale: string = 'pt', limit: number = 3): Article[] {
  const allArticles = getAllArticles(locale);
  return allArticles.filter(article => article.featured).slice(0, limit);
}

export function getArticlesByCategory(category: string, locale: string = 'pt'): Article[] {
  const allArticles = getAllArticles(locale);
  return allArticles.filter(article => article.category === category);
}
