import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

/**
 * Renders raw markdown as formatted content. Reused everywhere the site
 * displays long-format text (project details, qualification details,
 * experience bullets, about intro…).
 */
const MarkdownContent: React.FC<MarkdownContentProps> = ({
  content,
  className,
}) => {
  if (!content?.trim()) return null;

  return (
    <div className={className ?? 'space-y-3'}>
      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <p className="text-zinc-400 leading-relaxed">{children}</p>
          ),
          h1: ({ children }) => (
            <h1 className="text-2xl font-black text-white tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-black text-white tracking-tight mt-6">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-bold text-white tracking-tight mt-5">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-bold text-zinc-100 mt-4">{children}</h4>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside pl-5 space-y-1.5">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside pl-5 space-y-1.5">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-zinc-400 leading-relaxed">{children}</li>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-500 hover:text-sky-400 underline underline-offset-4 decoration-sky-500/40 hover:decoration-sky-400 transition-colors"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-white">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-sky-500/50 pl-4 italic text-zinc-400">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const isBlock = className?.startsWith('language-');
            if (isBlock) {
              return <code className={className}>{children}</code>;
            }
            return (
              <code className="px-1.5 py-0.5 bg-zinc-800/80 border border-white/10 rounded text-[0.85em] text-sky-300">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="my-4 p-4 bg-zinc-900 border border-white/10 rounded-lg overflow-x-auto text-sm text-zinc-300">
              {children}
            </pre>
          ),
          hr: () => <hr className="my-6 border-white/10" />,
          img: ({ src, alt }) => (
            // Markdown-rendered images come straight from admin content; next/image
            // can't size arbitrary inline images without knowing the container.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt ?? ''}
              className="rounded-lg border border-white/10 my-4"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
