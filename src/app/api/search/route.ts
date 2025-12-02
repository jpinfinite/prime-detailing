import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/articles';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';

    if (query.length < 2) {
      return NextResponse.json({ results: [] });
    }

    // Buscar todos os artigos
    const allArticles = getAllArticles('pt');

    // Filtrar artigos que contenham a query no título, descrição ou tags
    const results = allArticles.filter(article => {
      const titleMatch = article.title.toLowerCase().includes(query);
      const descriptionMatch = article.description.toLowerCase().includes(query);
      const categoryMatch = article.category.toLowerCase().includes(query);
      const tagsMatch = article.tags?.some(tag => tag.toLowerCase().includes(query));

      return titleMatch || descriptionMatch || categoryMatch || tagsMatch;
    });

    // Ordenar por relevância (título > descrição > categoria > tags)
    const sortedResults = results.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(query) ? 3 : 0;
      const aDesc = a.description.toLowerCase().includes(query) ? 2 : 0;
      const aCat = a.category.toLowerCase().includes(query) ? 1 : 0;
      const aScore = aTitle + aDesc + aCat;

      const bTitle = b.title.toLowerCase().includes(query) ? 3 : 0;
      const bDesc = b.description.toLowerCase().includes(query) ? 2 : 0;
      const bCat = b.category.toLowerCase().includes(query) ? 1 : 0;
      const bScore = bTitle + bDesc + bCat;

      return bScore - aScore;
    });

    // Limitar a 10 resultados
    const limitedResults = sortedResults.slice(0, 10);

    return NextResponse.json({ 
      results: limitedResults,
      total: results.length 
    });

  } catch (error) {
    console.error('Erro na API de busca:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
