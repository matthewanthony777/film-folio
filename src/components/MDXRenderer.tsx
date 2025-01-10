import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { cn } from "@/lib/utils";

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn("text-4xl font-bold mt-8 mb-4", className)} {...props} />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn("text-3xl font-semibold mt-6 mb-3", className)} {...props} />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn("text-2xl font-semibold mt-4 mb-2", className)} {...props} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("my-4 leading-7", className)} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("list-disc list-inside my-4 space-y-2", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("ml-4", className)} {...props} />
  ),
};

interface MDXRendererProps {
  content: string;
}

const MDXRenderer: React.FC<MDXRendererProps> = ({ content }) => {
  return (
    <MDXProvider components={components}>
      <div className="prose prose-lg max-w-none dark:prose-invert">
        {content}
      </div>
    </MDXProvider>
  );
};

export default MDXRenderer;