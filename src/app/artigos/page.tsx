import ArticlesClient from "@/components/ArticlesClient";
import { getAllArticles } from "@/lib/articles";

export default function ArticlesPage() {
  const articles = getAllArticles('pt');

  return <ArticlesClient articles={articles} />;
}
