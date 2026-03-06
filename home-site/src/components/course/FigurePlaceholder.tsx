import { BarChart3 } from 'lucide-react';

interface FigurePlaceholderProps {
  title: string;
  prompt: string;
  className?: string;
}

export function FigurePlaceholder({ title, prompt, className = '' }: FigurePlaceholderProps) {
  return (
    <div
      className={`my-6 rounded-xl border-2 border-dashed p-8 text-center ${className}`.trim()}
      style={{ borderColor: 'var(--color-border-accent)', background: 'var(--color-accent-subtle)' }}
    >
      <p className="text-sm font-semibold mb-2 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
        <BarChart3 className="h-4 w-4" />
        {title}
      </p>
      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
        Prompt : {prompt}
      </p>
    </div>
  );
}
