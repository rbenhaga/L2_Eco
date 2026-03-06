import { Link } from 'react-router-dom';

interface ChapterNavProps {
  prev?: { path: string; label: string; title: string };
  next?: { path: string; label: string; title: string };
}

export function ChapterNav({ prev, next }: ChapterNavProps) {
  return (
    <nav className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-12 sm:mt-20 pt-6 sm:pt-10">
      {prev ? (
        <Link
          to={prev.path}
          className="flex-1 p-4 sm:p-6 rounded-xl no-underline group active:scale-[0.98] transition-all"
          style={{
            background: 'var(--color-bg-overlay)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-bg-raised)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--color-bg-overlay)';
          }}
        >
          <p className="text-xs sm:text-sm mb-0.5 sm:mb-1" style={{ color: 'var(--color-text-muted)' }}>
            {prev.label}
          </p>
          <p
            className="font-semibold text-sm sm:text-base transition-colors"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {prev.title}
          </p>
        </Link>
      ) : <div className="hidden sm:block flex-1" />}

      {next ? (
        <Link
          to={next.path}
          className="flex-1 p-4 sm:p-6 rounded-xl no-underline sm:text-right group active:scale-[0.98] transition-all"
          style={{
            background: 'var(--color-bg-overlay)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-bg-raised)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--color-bg-overlay)';
          }}
        >
          <p className="text-xs sm:text-sm mb-0.5 sm:mb-1" style={{ color: 'var(--color-text-muted)' }}>
            {next.label}
          </p>
          <p
            className="font-semibold text-sm sm:text-base transition-colors"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {next.title}
          </p>
        </Link>
      ) : <div className="hidden sm:block flex-1" />}
    </nav>
  );
}
