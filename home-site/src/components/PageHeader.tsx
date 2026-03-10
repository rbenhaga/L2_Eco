interface PageHeaderProps {
  number: string;
  title: string;
  description: string;
}

export function PageHeader({ number, title, description }: PageHeaderProps) {
  return (
    <header className="pt-8 sm:pt-10 pb-8 sm:pb-10 border-b mb-8 sm:mb-10">
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <span
          className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest"
          style={{
            background: 'var(--color-accent-subtle)',
            color: 'var(--color-accent)',
            border: '1px solid var(--color-border-accent)',
          }}
        >
          {number}
        </span>
      </div>

      <h1
        className="mb-4 font-semibold tracking-tight leading-tight"
        style={{
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.35rem, 5vw, 3.95rem)',
          lineHeight: 0.98,
          letterSpacing: '-0.04em',
        }}
      >
        {title}
      </h1>

      <p
        className="max-w-3xl leading-relaxed"
        style={{
          color: 'var(--color-text-secondary)',
          fontSize: '1rem',
        }}
      >
        {description}
      </p>
    </header>
  );
}
