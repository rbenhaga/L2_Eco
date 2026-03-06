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
        className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4 leading-tight"
        style={{
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-serif)',
        }}
      >
        {title}
      </h1>

      <p
        className="text-base sm:text-lg max-w-3xl leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {description}
      </p>
    </header>
  );
}
