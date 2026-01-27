import { Link } from 'react-router-dom';

interface ChapterNavProps {
  prev?: { path: string; label: string; title: string };
  next?: { path: string; label: string; title: string };
}

export function ChapterNav({ prev, next }: ChapterNavProps) {
  return (
    <nav className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-12 sm:mt-20 pt-6 sm:pt-10 border-t border-slate-200">
      {prev ? (
        <Link
          to={prev.path}
          className="flex-1 p-4 sm:p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-100 transition-all no-underline group active:scale-[0.98]"
        >
          <p className="text-xs sm:text-sm text-slate-600 mb-0.5 sm:mb-1">{prev.label}</p>
          <p className="font-semibold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors">
            {prev.title}
          </p>
        </Link>
      ) : <div className="hidden sm:block flex-1" />}

      {next ? (
        <Link
          to={next.path}
          className="flex-1 p-4 sm:p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-100 transition-all no-underline sm:text-right group active:scale-[0.98]"
        >
          <p className="text-xs sm:text-sm text-slate-600 mb-0.5 sm:mb-1">{next.label}</p>
          <p className="font-semibold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors">
            {next.title}
          </p>
        </Link>
      ) : <div className="hidden sm:block flex-1" />}
    </nav>
  );
}
