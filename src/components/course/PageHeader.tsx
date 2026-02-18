interface PageHeaderProps {
  number: string;
  title: string;
  description: string;
}

export function PageHeader({ number, title, description }: PageHeaderProps) {
  return (
    <header className="pt-4 pb-4 mb-2">
      <p
        className="text-[11px] font-semibold uppercase tracking-widest mb-1.5"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {number}
      </p>
      <h1
        className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-2"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {title}
      </h1>
      <p
        className="text-sm sm:text-base max-w-2xl leading-relaxed"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {description}
      </p>
    </header>
  );
}
