import { ArticleMetadata } from "@/types/article";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface ArticleCardProps {
  article: ArticleMetadata;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  // Helper function to determine if a file is a video
  const isVideoFile = (filename: string) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
    return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  // Helper function to determine if a file is an image
  const isImageFile = (filename: string) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];
    return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <Link to={`/articles/${article.slug}`}>
        <div className="w-full aspect-video rounded-t-lg overflow-hidden">
          {article.coverVideo && isVideoFile(article.coverVideo) ? (
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={article.coverVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (article.coverImage && isImageFile(article.coverImage)) ? (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No preview available</span>
            </div>
          )}
        </div>
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