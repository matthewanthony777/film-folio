export interface ArticleMetadata {
  title: string;
  date: string;
  author: string;
  description: string;
  slug: string;
  tags: string[];
  coverImage?: string;
  coverVideo?: string;
}

export interface Article extends ArticleMetadata {
  content: string;
}

// Example of supported media syntax in content:
// Images: ![Alt text](/image.jpg)
// Videos: <video src="/video.mp4" controls></video>