import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllArticles } from "@/lib/articles";

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

export default function ArticlePage({ 
  params 
}: { 
  params: { slug: string; locale: string } 
}) {
  // Exemplo - depois integrar com sistema de markdown
  const article = {
    title: "Como Polir Faróis em Casa - Guia Completo 2025",
    date: "2025-01-15",
    author: "Detailing Prime",
    image: "/arquivos para o site/Banner/detailing-1-car-washing--worker--man--car-.jpg",
    content: `
      <h2>Por Que os Faróis Ficam Amarelados?</h2>
      <p>Os faróis dos carros são feitos de policarbonato, um material plástico resistente mas que sofre com a exposição ao sol, chuva e poluição.</p>
      
      <h2>Materiais Necessários</h2>
      <ul>
        <li>Lixa d'água (grãos 800, 1000, 2000)</li>
        <li>Pasta de polimento</li>
        <li>Boina de polimento</li>
        <li>Politriz ou furadeira</li>
        <li>Verniz UV para proteção</li>
      </ul>
      
      <h2>Passo a Passo</h2>
      <p>Siga este guia completo para restaurar seus faróis...</p>
    `,
  };

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center text-gray-600 space-x-4">
          <span>{article.date}</span>
          <span>•</span>
          <span>Por {article.author}</span>
        </div>
      </div>

      <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>

      <div 
        className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-gray-700 prose-ul:list-disc prose-ul:ml-6"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
}
