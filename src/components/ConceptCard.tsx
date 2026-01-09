import type { ReactNode } from 'react';

type CardColor = 'blue' | 'emerald' | 'violet' | 'amber' | 'rose' | 'cyan' | 'slate' | 'indigo' | 'teal' | 'sky';

const colorStyles: Record<CardColor, { border: string; bg: string; accent: string }> = {
  indigo: { border: 'border-indigo-200/80', bg: 'bg-linear-to-br from-indigo-50/80 to-slate-50/50', accent: 'text-indigo-700' },
  violet: { border: 'border-violet-200/80', bg: 'bg-linear-to-br from-violet-50/80 to-fuchsia-50/30', accent: 'text-violet-700' },
  blue: { border: 'border-sky-200/80', bg: 'bg-linear-to-br from-sky-50/80 to-blue-50/30', accent: 'text-sky-700' },
  sky: { border: 'border-sky-200/80', bg: 'bg-linear-to-br from-sky-50/80 to-blue-50/30', accent: 'text-sky-700' },
  emerald: { border: 'border-emerald-200/80', bg: 'bg-linear-to-br from-emerald-50/80 to-teal-50/30', accent: 'text-emerald-700' },
  teal: { border: 'border-teal-200/80', bg: 'bg-linear-to-br from-teal-50/80 to-cyan-50/30', accent: 'text-teal-700' },
  amber: { border: 'border-amber-200/80', bg: 'bg-linear-to-br from-amber-50/80 to-orange-50/30', accent: 'text-amber-700' },
  rose: { border: 'border-rose-200/80', bg: 'bg-linear-to-br from-rose-50/80 to-pink-50/30', accent: 'text-rose-700' },
  cyan: { border: 'border-cyan-200/80', bg: 'bg-linear-to-br from-cyan-50/80 to-sky-50/30', accent: 'text-cyan-700' },
  slate: { border: 'border-slate-200/80', bg: 'bg-linear-to-br from-slate-50/80 to-gray-50/30', accent: 'text-slate-700' },
};

interface ConceptCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  icon?: ReactNode;
  color?: CardColor;
}

export function ConceptCard({ title, subtitle, children, icon, color = 'slate' }: ConceptCardProps) {
  const styles = colorStyles[color];
  
  return (
    <div className={`p-4 sm:p-5 border rounded-xl ${styles.border} ${styles.bg} backdrop-blur-sm`}>
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        {icon && <span className={styles.accent}>{icon}</span>}
        <div>
          <h4 className={`font-semibold text-gray-900 text-sm sm:text-base`}>{title}</h4>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
      <div className="text-gray-600 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}

interface AuthorCardProps {
  name: string;
  dates?: string;
  work?: string;
  children: ReactNode;
  color?: CardColor;
  image?: string;
  hideAvatar?: boolean;
}

const authorGradients: Record<CardColor, string> = {
  indigo: 'bg-linear-to-br from-indigo-500 to-violet-600',
  violet: 'bg-linear-to-br from-violet-500 to-purple-600',
  blue: 'bg-linear-to-br from-sky-500 to-blue-600',
  sky: 'bg-linear-to-br from-sky-500 to-blue-600',
  emerald: 'bg-linear-to-br from-emerald-500 to-teal-600',
  teal: 'bg-linear-to-br from-teal-500 to-cyan-600',
  amber: 'bg-linear-to-br from-amber-500 to-orange-600',
  rose: 'bg-linear-to-br from-rose-500 to-pink-600',
  cyan: 'bg-linear-to-br from-cyan-500 to-sky-600',
  slate: 'bg-linear-to-br from-slate-600 to-gray-700',
};

export function AuthorCard({ name, dates, work, children, color = 'slate', image, hideAvatar }: AuthorCardProps) {
  const gradient = authorGradients[color];
  const showAvatar = image || !hideAvatar;
  
  return (
    <div className="p-4 sm:p-6 bg-white border border-gray-100 rounded-xl shadow-sm mb-4">
      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-100">
        {showAvatar && (
          image ? (
            <img 
              src={image} 
              alt={name}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shadow-lg border-2 border-white"
            />
          ) : (
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${gradient} flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg`}>
              {name.charAt(0)}
            </div>
          )
        )}
        <div>
          <h4 className="font-semibold text-gray-900 text-base sm:text-lg">{name}</h4>
          <p className="text-xs sm:text-sm text-gray-500">
            {dates && <span>{dates}</span>}
            {dates && work && <span> • </span>}
            {work && <span className="italic">{work}</span>}
          </p>
        </div>
      </div>
      <div className="text-gray-700 text-sm sm:text-base leading-relaxed">
        {children}
      </div>
    </div>
  );
}
