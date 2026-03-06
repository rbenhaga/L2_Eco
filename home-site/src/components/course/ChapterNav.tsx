import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ChapterNavProps {
  prev?: { path: string; label: string; title: string };
  next?: { path: string; label: string; title: string };
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

/**
 * ChapterNav — Design v4
 *
 * Navigation entre chapitres avec flèches directionnelles.
 * Scroll automatique en haut de page au changement de chapitre.
 * Hover accent couleur stats.
 */
export function ChapterNav({ prev, next }: ChapterNavProps) {
  return (
    <nav className="flex flex-col sm:flex-row justify-between gap-4 mt-16 pt-8">
      {prev ? (
        <Link
          to={prev.path}
          onClick={scrollToTop}
          className="group flex-1 flex items-center gap-4 p-5 rounded-xl no-underline transition-all duration-200 active:scale-[0.98]"
          style={{
            background: 'rgb(var(--surface-1))',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.boxShadow = '0 4px 16px color-mix(in srgb, var(--color-stats) 12%, transparent)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.boxShadow = '';
          }}
        >
          <div
            className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'var(--callout-key-icon-bg)' }}
          >
            <ArrowLeft size={17} style={{ color: 'var(--color-stats)' }} />
          </div>
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-wider mb-0.5"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {prev.label}
            </p>
            <p
              className="font-semibold text-base leading-snug"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block flex-1" />
      )}

      {next ? (
        <Link
          to={next.path}
          onClick={scrollToTop}
          className="group flex-1 flex items-center justify-end gap-4 p-5 rounded-xl no-underline transition-all duration-200 active:scale-[0.98]"
          style={{
            background: 'rgb(var(--surface-1))',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.boxShadow = '0 4px 16px color-mix(in srgb, var(--color-stats) 12%, transparent)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.boxShadow = '';
          }}
        >
          <div className="text-right">
            <p
              className="text-[11px] font-semibold uppercase tracking-wider mb-0.5"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {next.label}
            </p>
            <p
              className="font-semibold text-base leading-snug"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {next.title}
            </p>
          </div>
          <div
            className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'var(--callout-key-icon-bg)' }}
          >
            <ArrowRight size={17} style={{ color: 'var(--color-stats)' }} />
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block flex-1" />
      )}
    </nav>
  );
}
