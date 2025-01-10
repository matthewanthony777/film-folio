import { ArticleMetadata } from "@/types/article";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface ArticleCardProps {
  article: ArticleMetadata;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <Link to={`/articles/${article.slug}`}>
        <CardHeader>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {new Date(article.date).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors">
              {article.title}
            </h3>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{article.description}</p>
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ArticleCard;