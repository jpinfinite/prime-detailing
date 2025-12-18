import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";

// Gera todas as combinações de locale + slug
export async function generateStaticParams() {
  const articles = await getAllArticles();
  const locales = ['pt', 'en', 'es'];

  const params = [];
  for (const locale of locales) {
    for (const article of articles) {
      params.push({
        locale,
        slug: article.slug,
      });
    }
  }

  return params;
}

export default async function ArticlePage({
  params
}: {
  params: { slug: string; locale: string }
}) {
  const { slug, locale } = params;
  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-prime-black">{article.title}</h1>
        <div className="flex items-center text-gray-600 space-x-4 text-sm">
          <span>{article.date}</span>
          <span>•</span>
          <span className="bg-prime-yellow/20 px-2 py-1 rounded text-prime-black font-medium">{article.category}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>
      </div>

      <div className="relative h-96 mb-8 rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
        />
      </div>

      <div
        className="prose prose-lg max-w-none 
        prose-headings:font-bold prose-headings:text-prime-black
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-6 
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
        prose-p:text-gray-700 prose-p:leading-relaxed
        prose-ul:list-disc prose-ul:ml-6 prose-li:text-gray-700 prose-li:marker:text-prime-yellow
        prose-strong:text-prime-black prose-strong:font-bold
        prose-a:text-prime-blue prose-a:no-underline hover:prose-a:underline
        prose-blockquote:border-l-prime-yellow prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r
        "
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Optional: Add Social Share or Subscribe components here */}
    </article>
  );
}
