import { Article, ArticleMetadata } from "@/types/article";

// Simulated articles data - in a real app, this would come from MDX files
const articles: Article[] = [
  {
    title: "The Evolution of Cinema",
    date: "2024-03-20",
    author: "Jane Smith",
    description: "A deep dive into how cinema has evolved over the past century",
    slug: "evolution-of-cinema",
    tags: ["history", "cinema", "technology"],
    imageUrl: "/placeholder.svg",
    content: "Cinema has come a long way since its inception..."
  },
  {
    title: "Top 10 Films of 2023",
    date: "2024-03-15",
    author: "John Doe",
    description: "Our curated selection of the best films from last year",
    slug: "top-films-2023",
    tags: ["reviews", "best-of", "2023"],
    imageUrl: "/placeholder.svg",
    content: "2023 was an exceptional year for cinema..."
  }
];

export const getAllArticles = (): Article[] => {
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find(article => article.slug === slug);
};

export const getLatestArticles = (count: number = 5): Article[] => {
  return getAllArticles().slice(0, count);
};