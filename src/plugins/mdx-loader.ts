import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article } from '../types/article';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

function getAllArticlesData(): Article[] {
  const fileNames = fs.readdirSync(articlesDirectory)
    .filter(fileName => fileName.endsWith('.mdx'));

  const articles = fileNames.map(fileName => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    // Ensure all required fields are present
    return {
      slug,
      content,
      title: data.title || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Anonymous',
      description: data.description || '',
      tags: Array.isArray(data.tags) ? data.tags : 
            data.category ? [data.category] : [],
      coverImage: data.coverImage || '',
      coverVideo: data.coverVideo || '',
    } as Article;
  });

  // Sort articles by date in descending order
  return articles.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function mdxDataPlugin(): Plugin {
  const virtualModuleId = 'virtual:mdx-data';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'vite-plugin-mdx-data',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        try {
          const articles = getAllArticlesData();
          return `export const articles = ${JSON.stringify(articles)}`;
        } catch (error) {
          console.error('Error loading MDX data:', error);
          return 'export const articles = []';
        }
      }
    },
    transform(code, id) {
      if (id.endsWith('.mdx')) {
        try {
          const { content } = matter(code);
          return content;
        } catch (error) {
          console.error('Error transforming MDX:', error);
          return code;
        }
      }
    }
  };
}