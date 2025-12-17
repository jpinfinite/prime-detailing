import Image from "next/image";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import { ArticleSchema, BreadcrumbSchema } from "@/components/StructuredData";
import BackToTop from "@/components/BackToTop";
import SocialShare from "@/components/SocialShare";
import TableOfContents from "@/components/TableOfContents";
import RelatedArticles from "@/components/RelatedArticles";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleBadges from "@/components/ArticleBadges";
import Comments from "@/components/Comments";
import ArticleAnalytics from "@/components/ArticleAnalytics";
import NewsletterInline from "@/components/NewsletterInline";
import ArticleRating from "@/components/ArticleRating";

import ReadingProgress from "@/components/ReadingProgress";
import SidebarAd from "@/components/ads/SidebarAd";
import InArticleAd from "@/components/ads/InArticleAd";
import MultiplexAd from "@/components/ads/MultiplexAd";
import GoogleSubscribeWithGoogle from "@/components/GoogleSubscribeWithGoogle";

// Gera todas as rotas estáticas em build time
export async function generateStaticParams() {
  const articles = await getAllArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

function splitContentForAd(html: string) {
  if (!html) return { part1: '', part2: '', part3: '' };
  const pCloseTags = [...html.matchAll(/<\/p>/g)];

  // Se tiver menos de 4 parágrafos, não divide
  if (pCloseTags.length < 4) return { part1: html, part2: '', part3: '' };

  // Contar palavras aproximadamente
  const wordCount = html.split(/\s+/).length;

  // Artigos longos (6000+ palavras ou 15+ parágrafos) = 2 anúncios
  if (wordCount >= 6000 || pCloseTags.length >= 15) {
    const firstSplitIndex = Math.floor(pCloseTags.length / 3);
    const secondSplitIndex = Math.floor((pCloseTags.length * 2) / 3);

    const firstSplit = pCloseTags[firstSplitIndex].index! + 4;
    const secondSplit = pCloseTags[secondSplitIndex].index! + 4;

    return {
      part1: html.substring(0, firstSplit),
      part2: html.substring(firstSplit, secondSplit),
      part3: html.substring(secondSplit)
    };
  }

  // Artigos normais = 1 anúncio no meio
  const rawMiddleIndex = Math.floor(pCloseTags.length / 2);
  const splitIndex = pCloseTags[rawMiddleIndex].index! + 4;

  return {
    part1: html.substring(0, splitIndex),
    part2: html.substring(splitIndex),
    part3: ''
  };
}

import { getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { notFound } from "next/navigation";

// Gerar metadata dinâmica
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug, 'pt');

  if (!article) {
    return {
      title: 'Artigo não encontrado',
    };
  }

  const articleUrl = `https://detailingprime.com.br/artigos/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags?.join(', '),
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: articleUrl,
      siteName: 'Detailing Prime',
      images: [
        {
          url: `https://detailingprime.com.br${article.image}`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: 'pt_BR',
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.date,
      authors: ['Detailing Prime'],
      section: article.category,
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [`https://detailingprime.com.br${article.image}`],
      creator: '@detailingprime',
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug, 'pt');

  if (!article) {
    notFound();
  }

  // Buscar artigos relacionados
  const relatedArticles = getRelatedArticles(article.slug, article.category, 'pt', 3);

  const mockArticle = {
    title: article.title,
    date: article.date,
    author: "Detailing Prime",
    category: article.category,
    readTime: article.readTime || "10 min",
    image: article.image,
    content: article.content,
    oldContent: `
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

  const { part1, part2, part3 } = splitContentForAd(mockArticle.content);

  return (
    <div className="min-h-screen bg-prime-black">
      {/* Google Subscribe with Google */}
      <GoogleSubscribeWithGoogle />

      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* Structured Data */}
      <ArticleSchema
        title={article.title}
        description={article.description}
        image={`https://detailingprime.com.br${article.image}`}
        datePublished={article.date}
        dateModified={article.date}
        author="Detailing Prime"
        url={`https://detailingprime.com.br/artigos/${article.slug}`}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://detailingprime.com.br' },
          { name: 'Artigos', url: 'https://detailingprime.com.br/artigos' },
          { name: article.category, url: `https://detailingprime.com.br/artigos?categoria=${article.category}` },
          { name: article.title, url: `https://detailingprime.com.br/artigos/${article.slug}` },
        ]}
      />

      {/* Breadcrumb */}
      <div className="bg-prime-gray-dark border-b border-prime-gray-medium">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb
            items={[
              { label: 'Artigos', href: '/artigos' },
              { label: article.category, href: `/artigos?categoria=${article.category}` },
              { label: article.title }
            ]}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - Índice */}
          <aside className="hidden lg:block lg:col-span-3">
            <TableOfContents />
            <div className="mt-8">
              <SidebarAd />
            </div>
          </aside>

          {/* Conteúdo Principal */}
          <article className="lg:col-span-9 max-w-4xl">
            {/* Analytics Tracking */}
            <ArticleAnalytics slug={article.slug} title={article.title} category={article.category} />

            {/* Header */}
            <div className="mb-8">
              <ArticleBadges
                date={article.date}
                featured={article.featured}
                readTime={article.readTime}
              />

              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-prime-yellow text-prime-black text-sm font-semibold rounded">
                  {article.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4 leading-tight">
                {article.title}
              </h1>

              <div className="flex items-center text-text-secondary space-x-4">
                <span>{article.date}</span>
                <span>•</span>
                <span>Por Detailing Prime</span>
              </div>
            </div>

            {/* Imagem Destaque */}
            <div className="relative h-64 md:h-96 lg:h-[500px] mb-12 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={article.image}
                alt={`${article.title} - Guia completo de detailing automotivo`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover"
              />
            </div>

            {/* Compartilhar */}
            <div className="mb-8">
              <SocialShare title={article.title} url={`/artigos/${article.slug}`} />
            </div>

            {/* Conteúdo */}
            {/* Conteúdo */}
            <div className="article-content prose prose-lg prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: part1 }} />

              {/* Primeiro Anúncio In-Article */}
              <InArticleAd />

              {part2 && <div dangerouslySetInnerHTML={{ __html: part2 }} />}

              {/* Segundo Anúncio In-Article (apenas em artigos longos) */}
              {part3 && (
                <>
                  <InArticleAd />
                  <div dangerouslySetInnerHTML={{ __html: part3 }} />
                </>
              )}
            </div>

            {/* CTA Final - Newsletter */}
            <NewsletterInline />

            {/* Avaliação do Artigo */}
            <ArticleRating slug={article.slug} />

            {/* Anúncio Multiplex (Recomendados) */}
            <MultiplexAd />

            {/* Artigos Relacionados */}
            <RelatedArticles articles={relatedArticles} currentSlug={article.slug} />

            {/* Comentários */}
            <Comments slug={article.slug} title={article.title} />
          </article>
        </div>
      </div>

      {/* Botão Voltar ao Topo */}
      <BackToTop />
    </div>
  );
}
