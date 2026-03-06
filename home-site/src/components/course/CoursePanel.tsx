import type { ReactNode } from 'react';

interface CoursePanelProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function CoursePanel({ title, children, className = '' }: CoursePanelProps) {
  return (
    <div
      className={`rounded-lg p-3 ${className}`.trim()}
      style={{
        background: 'var(--color-bg-overlay)',
      }}
    >
      {title && (
        <p className="font-semibold text-sm mb-1" style={{ color: 'var(--color-text-primary)' }}>
          {title}
        </p>
      )}
      {children}
    </div>
  );
}
