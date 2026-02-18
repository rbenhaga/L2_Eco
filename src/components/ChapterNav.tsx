import { Link } from 'react-router-dom';

interface ChapterNavProps {
  prev?: { path: string; label: string; title: string };
  next?: { path: string; label: string; title: string };
}

export function ChapterNav({ prev, next }: ChapterNavProps) {
  return (
    <nav
      className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-12 sm:mt-20 pt-6 sm:pt-10"
      style={{ borderTop: '1px solid rgb(var(--border))' }}
    >
      {prev ? (
        <Link
          to={prev.path}
          className="flex-1 p-4 sm:p-6 rounded-xl no-underline group active:scale-[0.98] transition-all"
          style={{
            background: 'rgb(var(--surface-1))',
            border: '1px solid rgb(var(--border))',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgb(var(--border-strong))';
            e.currentTarget.style.background = 'rgb(var(--surface-2))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgb(var(--border))';
            e.currentTarget.style.background = 'rgb(var(--surface-1))';
          }}
        >
          <p className="text-xs sm:text-sm mb-0.5 sm:mb-1" style={{ color: 'rgb(var(--text-muted))' }}>
            {prev.label}
          </p>
          <p
            className="font-semibold text-sm sm:text-base transition-colors"
            style={{ color: 'rgb(var(--text))' }}
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
            background: 'rgb(var(--surface-1))',
            border: '1px solid rgb(var(--border))',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgb(var(--border-strong))';
            e.currentTarget.style.background = 'rgb(var(--surface-2))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgb(var(--border))';
            e.currentTarget.style.background = 'rgb(var(--surface-1))';
          }}
        >
          <p className="text-xs sm:text-sm mb-0.5 sm:mb-1" style={{ color: 'rgb(var(--text-muted))' }}>
            {next.label}
          </p>
          <p
            className="font-semibold text-sm sm:text-base transition-colors"
            style={{ color: 'rgb(var(--text))' }}
          >
            {next.title}
          </p>
        </Link>
      ) : <div className="hidden sm:block flex-1" />}
    </nav>
  );
}
