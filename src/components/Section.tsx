import type { ReactNode } from 'react';

type SectionType = 'intuition' | 'formule' | 'graphique' | 'warning' | 'key' | 'definition' | 'citation' | 'auteur' | 'exemple';

interface SectionProps {
  title: string;
  children: ReactNode;
  type?: SectionType;
}

export function Section({ title, children }: SectionProps) {
  return (
    <section className="mb-10 sm:mb-14">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-900 dark:text-slate-50 pb-3 border-b border-slate-200 dark:border-white/10">
        {title}
      </h2>
      <div className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
        {children}
      </div>
    </section>
  );
}
