import { useParams } from "react-router-dom";
import { getArticleBySlug } from "@/utils/articles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ArticleDetail = () => {
  const { slug } = useParams();
  const article = getArticleBySlug(slug || "");

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Article not found</h1>
        <Link to="/articles">
          <Button className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <Link to="/articles">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Articles
        </Button>
      </Link>
      
      <div className="space-y-6">
        {article.coverVideo && (
          <div className="w-full aspect-video rounded-lg overflow-hidden">
            <video 
              src={article.coverVideo} 
              controls
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <time className="text-sm text-muted-foreground">
              {new Date(article.date).toLocaleDateString()}
            </time>
          </div>
          <h1 className="text-4xl font-bold">{article.title}</h1>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">By</span>
            <span className="font-medium">{article.author}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="prose prose-lg max-w-none">
          {article.content}
        </div>
      </div>
    </article>
  );
};

export default ArticleDetail;