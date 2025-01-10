import { useState } from "react";
import { getAllArticles } from "@/utils/articles";
import ArticleCard from "@/components/ArticleCard";
import Navigation from "@/components/Navigation";
import ArticleFilters from "@/components/ArticleFilters";

const Articles = () => {
  const allArticles = getAllArticles();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = allArticles.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">Movie Blog</h1>
            <p className="text-muted-foreground">
              Exploring the world of cinema through thoughtful analysis and reviews
            </p>
          </div>
          
          <ArticleFilters
            onSearchChange={setSearchQuery}
          />

          {filteredArticles.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Articles;