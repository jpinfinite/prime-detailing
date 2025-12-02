import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://detailingprime.com.br';
  
  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/artigos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/educacao`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacidade`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/termos`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Buscar todos os artigos dinamicamente
  const articlesDirectory = path.join(process.cwd(), 'content/articles/pt');
  let articlePages: MetadataRoute.Sitemap = [];

  try {
    const files = fs.readdirSync(articlesDirectory);
    
    articlePages = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const filePath = path.join(articlesDirectory, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        
        return {
          url: `${baseUrl}/artigos/${data.slug}`,
          lastModified: data.date ? new Date(data.date) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: data.featured ? 0.8 : 0.7,
        };
      });
  } catch (error) {
    console.error('Erro ao gerar sitemap dos artigos:', error);
  }

  return [...staticPages, ...articlePages];
}
