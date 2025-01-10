import { getAllArticles } from "@/utils/articles";
import ArticleCard from "@/components/ArticleCard";

const Articles = () => {
  const articles = getAllArticles();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Movie Blog</h1>
          <p className="text-muted-foreground">
            Exploring the world of cinema through thoughtful analysis and reviews
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;