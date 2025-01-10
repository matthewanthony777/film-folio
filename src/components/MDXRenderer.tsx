import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import * as runtime from 'react/jsx-runtime';
import { compile } from '@mdx-js/mdx';
import { cn } from "@/lib/utils";
import { useState, useEffect } from 'react';

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
  img: ({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img 
      src={src} 
      alt={alt} 
      className={cn("w-full rounded-lg my-4", className)} 
      {...props} 
    />
  ),
};

interface MDXRendererProps {
  content: string;
}

const MDXRenderer: React.FC<MDXRendererProps> = ({ content }) => {
  const [mdxModule, setMdxModule] = useState<any>(null);

  useEffect(() => {
    const compileMDX = async () => {
      try {
        const compiled = await compile(content, {
          outputFormat: 'function-body',
          development: false
        });
        
        const code = String(compiled);
        const func = new Function('React', 'jsx', '_components', '_props', code);
        const module = func(runtime, runtime.jsx, components, {});
        setMdxModule(module);
      } catch (error) {
        console.error('Error compiling MDX:', error);
      }
    };

    compileMDX();
  }, [content]);

  if (!mdxModule) {
    return <div>Loading...</div>;
  }

  const MDXContent = mdxModule.default;

  return (
    <MDXProvider components={components}>
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <MDXContent />
      </div>
    </MDXProvider>
  );
};

export default MDXRenderer;