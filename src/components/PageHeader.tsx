interface PageHeaderProps {
  number: string;
  title: string;
  description: string;
}

export function PageHeader({ number, title, description }: PageHeaderProps) {
  return (
    <header className="pt-10 sm:pt-14 pb-8 sm:pb-10 text-center">
      {/* Chapter number pill */}
      <div className="flex justify-center mb-4">
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
          style={{
            background: 'var(--color-accent-subtle)',
            color: 'var(--color-accent)',
            border: '1px solid var(--color-border-accent)',
          }}
        >
          {number}
        </span>
      </div>

      {/* Title in serif */}
      <h1
        className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-3"
        style={{
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-serif)',
        }}
      >
        {title}
      </h1>

      {/* Description */}
      <p
        className="text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {description}
      </p>

      {/* Separator line */}
      <div
        className="mt-8 mx-auto"
        style={{
          width: '60px',
          height: '3px',
          borderRadius: '2px',
          background: 'var(--color-accent)',
        }}
      />
    </header>
  );
}
