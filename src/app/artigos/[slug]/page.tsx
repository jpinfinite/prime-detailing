import Image from "next/image";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

// Gera todas as rotas estáticas em build time
export async function generateStaticParams() {
  const articles = await getAllArticles();
  
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  // Exemplo de artigo - depois integrar com markdown
  const article = {
    title: "Como Polir Faróis em Casa - Guia Completo 2025",
    date: "15 Jan 2025",
    author: "Detailing Prime",
    category: "Guias",
    readTime: "8 min",
    image: "/arquivos para o site/Banner/detailing-1-car-washing--worker--man--car-.jpg",
    content: `
      <h2>Por Que os Faróis Ficam Amarelados?</h2>
      <p>Os faróis dos carros são feitos de policarbonato, um material plástico resistente mas que sofre com a exposição ao sol, chuva e poluição. Com o tempo, a camada protetora UV se desgasta, deixando os faróis opacos e amarelados.</p>
      
      <h2>Materiais Necessários</h2>
      <ul>
        <li>Lixa d'água (grãos 800, 1000, 2000)</li>
        <li>Pasta de polimento</li>
        <li>Boina de polimento</li>
        <li>Politriz ou furadeira</li>
        <li>Verniz UV para proteção</li>
      </ul>
      
      <h2>Passo a Passo</h2>
      <p>Siga este guia completo para restaurar seus faróis e deixá-los como novos. O processo é simples mas requer atenção aos detalhes.</p>
      
      <h3>1. Preparação</h3>
      <p>Lave bem o farol com água e sabão neutro. Seque completamente e proteja a pintura ao redor com fita crepe.</p>
      
      <h3>2. Lixamento</h3>
      <p>Comece com a lixa mais grossa (800) e vá progredindo até a mais fina (2000). Sempre mantenha o farol molhado durante o processo.</p>
      
      <h3>3. Polimento</h3>
      <p>Aplique a pasta de polimento com a boina e trabalhe em movimentos circulares até o farol ficar transparente.</p>
      
      <h3>4. Proteção</h3>
      <p>Finalize com verniz UV para proteger contra amarelamento futuro. Esta etapa é crucial para durabilidade.</p>
      
      <h2>Dicas Profissionais</h2>
      <p>Trabalhe sempre na sombra e mantenha o farol molhado. Não pressione demais a politriz e faça movimentos suaves. O resultado final deve ser um farol cristalino que melhora significativamente a iluminação.</p>
    `,
  };

  return (
    <div className="min-h-screen bg-prime-black">
      {/* Breadcrumb */}
      <div className="bg-prime-gray-dark border-b border-prime-gray-medium">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Link href="/" className="hover:text-prime-yellow">Home</Link>
            <span>→</span>
            <Link href="/artigos" className="hover:text-prime-yellow">Artigos</Link>
            <span>→</span>
            <span className="text-text-primary">{article.category}</span>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-prime-yellow text-prime-black text-sm font-semibold rounded">
              {article.category}
            </span>
            <span className="text-text-secondary text-sm">{article.readTime} de leitura</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {article.title}
          </h1>
          
          <div className="flex items-center text-text-secondary space-x-4">
            <span>{article.date}</span>
            <span>•</span>
            <span>Por {article.author}</span>
          </div>
        </div>

        {/* Imagem Destaque */}
        <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Compartilhar */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-prime-gray-medium">
          <span className="text-text-secondary">Compartilhar:</span>
          <button className="text-text-secondary hover:text-prime-yellow transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
          <button className="text-text-secondary hover:text-prime-yellow transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </button>
          <button className="text-text-secondary hover:text-prime-yellow transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </button>
        </div>

        {/* Conteúdo */}
        <div 
          className="prose prose-lg prose-invert max-w-none
            prose-headings:text-text-primary prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-prime-yellow
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-text-secondary prose-p:leading-relaxed prose-p:mb-6
            prose-ul:text-text-secondary prose-ul:my-6
            prose-li:mb-2
            prose-strong:text-text-primary"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* CTA Final */}
        <div className="mt-12 p-8 bg-prime-gray-medium rounded-lg border border-prime-gray-light text-center">
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Gostou deste artigo?
          </h3>
          <p className="text-text-secondary mb-6">
            Receba mais conteúdo como este direto no seu email
          </p>
          <button className="bg-prime-yellow hover:bg-prime-yellow-dark text-prime-black px-8 py-3 rounded-lg font-semibold transition-all">
            Assinar Newsletter
          </button>
        </div>

        {/* Artigos Relacionados */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-text-primary mb-8">
            Artigos Relacionados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Link
                key={i}
                href="/artigos/exemplo"
                className="bg-prime-gray-medium rounded-lg border border-prime-gray-light overflow-hidden hover:border-prime-yellow transition group"
              >
                <div className="relative h-32">
                  <Image
                    src="/arquivos para o site/Destaques/detailing-2-automobile--car-wallpapers--na.jpg"
                    alt="Artigo relacionado"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-text-primary group-hover:text-prime-yellow transition">
                    Artigo Relacionado {i}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
