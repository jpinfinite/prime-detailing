import { getAllArticles } from '@/lib/articles';

export async function GET() {
  const baseUrl = 'https://detailingprime.com.br';
  const articles = getAllArticles('pt');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Detailing Prime</title>
    <link>${baseUrl}</link>
    <description>Notícias, educação e reviews sobre estética automotiva</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${articles
      .slice(0, 20)
      .map(
        (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${baseUrl}/artigos/${article.slug}</link>
      <description><![CDATA[${article.description}]]></description>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}/artigos/${article.slug}</guid>
      <category>${article.category}</category>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
