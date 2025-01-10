import { Article, ArticleMetadata } from "@/types/article";

// Articles data from MDX files
const articles: Article[] = [
  {
    title: "Folk Horror",
    date: "2024-03-14",
    author: "Matthew Barr",
    description: "Examining Eggers Cinematography",
    slug: "robert-eggers-movie",
    tags: ["Robert Eggers", "Folk Horror", "Cinematography"],
    content: `# Robert Eggers' Mastery of Historical Horror

Robert Eggers has distinguished himself through meticulous historical accuracy and atmospheric folk horror. His films demonstrate an unwavering commitment to period authenticity while exploring humanity's darkest fears.

## Key Films and Their Elements

### The Witch (2015)
- 1630s New England setting
- Religious hysteria and folklore
- Period-accurate dialogue and customs

### The Lighthouse (2019)
- Maritime mythology
- Psychological deterioration
- 19th-century nautical vernacular`,
    coverVideo: "/chris-nolan-edit.mp4"
  },
  {
    title: "All Things Christopher",
    date: "2024-03-14",
    author: "Matthew Barr",
    description: "Examining Nolans love of time",
    slug: "inception-movie-review",
    tags: ["Christopher Nolan", "Film Analysis", "Time"],
    content: `# Christopher Nolan's Mastery of Temporal Narratives

Christopher Nolan has established himself as a master of temporal manipulation in cinema, weaving complex narratives that challenge our perception of time. His filmography demonstrates a consistent fascination with time as both a narrative device and a philosophical concept.

## Key Films and Their Temporal Elements

### Memento (2000)
- Reverse chronological storytelling
- Short-term memory loss as a narrative device
- Time as an unreliable construct`,
    coverVideo: "/chris-nolan-edit.mp4"
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