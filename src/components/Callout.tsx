import type { ReactNode } from 'react';
import { Key, Lightbulb, AlertTriangle, Settings, GraduationCap, BookMarked, Target, Zap, Quote } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type CalloutType = 'key' | 'example' | 'warning' | 'method' | 'insight' | 'tip' | 'quote' | 'remember' | 'exam' | 'important';

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: ReactNode;
}

const calloutConfig: Record<CalloutType, {
  icon: LucideIcon;
  defaultTitle: string;
  border: string;
  bg: string;
  iconBg: string;
  iconColor: string;
}> = {
  key: {
    icon: Key,
    defaultTitle: 'Concept clé',
    border: 'border-l-indigo-500',
    bg: 'bg-linear-to-r from-indigo-50/80 to-transparent dark:from-indigo-500/10 dark:to-transparent',
    iconBg: 'bg-indigo-100 dark:bg-indigo-500/20',
    iconColor: 'text-indigo-600 dark:text-indigo-300',
  },
  example: {
    icon: Lightbulb,
    defaultTitle: 'Exemple',
    border: 'border-l-amber-500',
    bg: 'bg-linear-to-r from-amber-50/80 to-transparent dark:from-amber-500/10 dark:to-transparent',
    iconBg: 'bg-amber-100 dark:bg-amber-500/20',
    iconColor: 'text-amber-600 dark:text-amber-300',
  },
  warning: {
    icon: AlertTriangle,
    defaultTitle: 'Attention',
    border: 'border-l-rose-500',
    bg: 'bg-linear-to-r from-rose-50/80 to-transparent dark:from-rose-500/10 dark:to-transparent',
    iconBg: 'bg-rose-100 dark:bg-rose-500/20',
    iconColor: 'text-rose-600 dark:text-rose-300',
  },
  method: {
    icon: Settings,
    defaultTitle: 'Méthode',
    border: 'border-l-emerald-500',
    bg: 'bg-linear-to-r from-emerald-50/80 to-transparent dark:from-emerald-500/10 dark:to-transparent',
    iconBg: 'bg-emerald-100 dark:bg-emerald-500/20',
    iconColor: 'text-emerald-600 dark:text-emerald-300',
  },
  insight: {
    icon: Lightbulb,
    defaultTitle: 'Intuition',
    border: 'border-l-sky-500',
    bg: 'bg-linear-to-r from-sky-50/80 to-transparent dark:from-sky-500/10 dark:to-transparent',
    iconBg: 'bg-sky-100 dark:bg-sky-500/20',
    iconColor: 'text-sky-600 dark:text-sky-300',
  },
  tip: {
    icon: GraduationCap,
    defaultTitle: 'Conseil',
    border: 'border-l-teal-500',
    bg: 'bg-linear-to-r from-teal-50/80 to-transparent dark:from-teal-500/10 dark:to-transparent',
    iconBg: 'bg-teal-100 dark:bg-teal-500/20',
    iconColor: 'text-teal-600 dark:text-teal-300',
  },
  quote: {
    icon: Quote,
    defaultTitle: 'Citation',
    border: 'border-l-violet-500',
    bg: 'bg-linear-to-r from-violet-50/80 to-transparent dark:from-violet-500/10 dark:to-transparent',
    iconBg: 'bg-violet-100 dark:bg-violet-500/20',
    iconColor: 'text-violet-600 dark:text-violet-300',
  },
  remember: {
    icon: BookMarked,
    defaultTitle: 'À retenir',
    border: 'border-l-amber-500',
    bg: 'bg-linear-to-r from-amber-50/80 to-transparent dark:from-amber-500/10 dark:to-transparent',
    iconBg: 'bg-amber-100 dark:bg-amber-500/20',
    iconColor: 'text-amber-600 dark:text-amber-300',
  },
  exam: {
    icon: Target,
    defaultTitle: "Pour l'examen",
    border: 'border-l-violet-500',
    bg: 'bg-linear-to-r from-violet-50/80 to-transparent dark:from-violet-500/10 dark:to-transparent',
    iconBg: 'bg-violet-100 dark:bg-violet-500/20',
    iconColor: 'text-violet-600 dark:text-violet-300',
  },
  important: {
    icon: Zap,
    defaultTitle: 'Important',
    border: 'border-l-orange-500',
    bg: 'bg-linear-to-r from-orange-50/80 to-transparent dark:from-orange-500/10 dark:to-transparent',
    iconBg: 'bg-orange-100 dark:bg-orange-500/20',
    iconColor: 'text-orange-600 dark:text-orange-300',
  },
};

export function Callout({ type, title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const IconComponent = config.icon;
  const displayTitle = title || config.defaultTitle;

  return (
    <div className={`flex gap-3 sm:gap-4 p-4 sm:p-5 my-4 sm:my-6 border-l-4 rounded-r-xl ${config.border} ${config.bg}`}>
      <div className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${config.iconBg} flex items-center justify-center shadow-sm`}>
        <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${config.iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base mb-1 sm:mb-2">{displayTitle}</p>
        <div className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
