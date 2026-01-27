/**
 * Markdown Message Renderer
 * 
 * Renders AI responses with Markdown and LaTeX support.
 * Uses react-markdown + KaTeX for clean, study-grade formatting.
 */

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface MarkdownMessageProps {
    content: string;
}

export function MarkdownMessage({ content }: MarkdownMessageProps) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[[rehypeKatex, { strict: false, throwOnError: false }]]}
            components={{
                // Headings (rare dans chat, mais supporté)
                h1: ({ children }) => (
                    <h1 className="text-base font-semibold text-slate-900 mt-4 mb-2 first:mt-0">
                        {children}
                    </h1>
                ),
                h2: ({ children }) => (
                    <h2 className="text-sm font-semibold text-slate-900 mt-3 mb-1.5 first:mt-0">
                        {children}
                    </h2>
                ),
                h3: ({ children }) => (
                    <h3 className="text-sm font-medium text-slate-800 mt-2 mb-1 first:mt-0">
                        {children}
                    </h3>
                ),
                
                // Paragraphs
                p: ({ children }) => (
                    <p className="mb-2 last:mb-0 leading-relaxed">
                        {children}
                    </p>
                ),
                
                // Strong/Bold
                strong: ({ children }) => (
                    <strong className="font-semibold text-slate-900">
                        {children}
                    </strong>
                ),
                
                // Emphasis/Italic
                em: ({ children }) => (
                    <em className="italic text-slate-800">
                        {children}
                    </em>
                ),
                
                // Lists
                ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-2 space-y-1">
                        {children}
                    </ul>
                ),
                ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-2 space-y-1">
                        {children}
                    </ol>
                ),
                li: ({ children }) => (
                    <li className="leading-relaxed">
                        {children}
                    </li>
                ),
                
                // Code
                code: ({ children, ...props }: any) => {
                    const inline = !props.className;
                    if (inline) {
                        return (
                            <code className="px-1.5 py-0.5 bg-slate-100 text-slate-800 rounded text-[0.9em] font-mono">
                                {children}
                            </code>
                        );
                    }
                    return (
                        <code className="block px-3 py-2 bg-slate-100 text-slate-800 rounded-lg text-sm font-mono overflow-x-auto mb-2">
                            {children}
                        </code>
                    );
                },
                
                // Blockquote
                blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-indigo-200 pl-3 py-1 my-2 text-slate-600 italic">
                        {children}
                    </blockquote>
                ),
                
                // Links
                a: ({ href, children }) => (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-700 underline decoration-indigo-200 hover:decoration-indigo-400 transition-colors"
                    >
                        {children}
                    </a>
                ),
            }}
        >
            {content}
        </ReactMarkdown>
    );
}

export default MarkdownMessage;
