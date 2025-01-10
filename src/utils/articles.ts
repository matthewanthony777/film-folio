import { Article, ArticleMetadata } from "@/types/article";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

const getAllArticles = (): Article[] => {
  // Get all .mdx files from the articles directory
  const fileNames = fs.readdirSync(articlesDirectory)
    .filter(fileName => fileName.endsWith('.mdx'));

  const articles = fileNames.map(fileName => {
    // Remove ".mdx" from file name to get slug
    const slug = fileName.replace(/\.mdx$/, '');

    // Read markdown file as string
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    // Combine the data with the slug
    return {
      slug,
      content,
      title: data.title,
      date: data.date,
      author: data.author,
      description: data.description,
      tags: data.category ? [data.category] : [],
      coverVideo: data.coverVideo,
    } as Article;
  });

  // Sort articles by date
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const getArticleBySlug = (slug: string): Article | undefined => {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      title: data.title,
      date: data.date,
      author: data.author,
      description: data.description,
      tags: data.category ? [data.category] : [],
      coverVideo: data.coverVideo,
    } as Article;
  } catch {
    return undefined;
  }
};

const getLatestArticles = (count: number = 5): Article[] => {
  return getAllArticles().slice(0, count);
};

export { getAllArticles, getArticleBySlug, getLatestArticles };