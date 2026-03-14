import type { ReactNode } from 'react';
import { ArrowRight, Quote } from 'lucide-react';

interface CourseTextProps {
  title?: string;
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function CourseText({ title, lead, children, className = '' }: CourseTextProps) {
  return (
    <div className={`editorial-prose ${className}`.trim()}>
      {title ? <h3 className="editorial-prose__title text-[rgb(var(--text))]">{title}</h3> : null}
      {lead ? <p className="editorial-prose__lead text-[rgb(var(--text))]">{lead}</p> : null}
      {children}
    </div>
  );
}

interface CourseTextListProps {
  children: ReactNode;
  ordered?: boolean;
  className?: string;
}

export function CourseTextList({ children, ordered = false, className = '' }: CourseTextListProps) {
  const Tag = ordered ? 'ol' : 'ul';
  const baseClass = ordered ? 'list-decimal' : 'list-disc';
  return <Tag className={`${baseClass} list-outside pl-6 space-y-2.5 text-base leading-relaxed ${className}`.trim()}>{children}</Tag>;
}

interface CourseTextArrowListProps {
  children: ReactNode;
  className?: string;
}

export function CourseTextArrowList({ children, className = '' }: CourseTextArrowListProps) {
  return <div className={`space-y-2 ${className}`.trim()}>{children}</div>;
}

interface CourseTextArrowItemProps {
  children: ReactNode;
  className?: string;
}

export function CourseTextArrowItem({ children, className = '' }: CourseTextArrowItemProps) {
  return (
    <div className={`flex items-start gap-3 text-base leading-relaxed ${className}`.trim()}>
      <span
        className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border"
        style={{
          borderColor: 'var(--color-border-subtle)',
          background: 'color-mix(in srgb, var(--color-bg-overlay) 72%, transparent)',
        }}
      >
        <ArrowRight className="h-3.5 w-3.5 text-[rgb(var(--text-secondary))]" />
      </span>
      <div>{children}</div>
    </div>
  );
}

interface CourseTextQuoteProps {
  children: ReactNode;
  author?: ReactNode;
  className?: string;
}

export function CourseTextQuote({ children, author, className = '' }: CourseTextQuoteProps) {
  return (
    <blockquote
      className={`editorial-prose__quote ${className}`.trim()}
    >
      <div className="flex items-start gap-3">
        <Quote className="mt-0.5 h-4 w-4 shrink-0 text-[rgb(var(--text))]" />
        <div className="not-italic">{children}</div>
      </div>
      {author ? <footer className="text-base font-medium not-italic text-[rgb(var(--text))]">- {author}</footer> : null}
    </blockquote>
  );
}
