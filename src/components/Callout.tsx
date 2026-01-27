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
  accentColor: string;
}> = {
  key: {
    icon: Key,
    defaultTitle: 'Concept clé',
    accentColor: '99 102 241', // indigo
  },
  example: {
    icon: Lightbulb,
    defaultTitle: 'Exemple',
    accentColor: '245 158 11', // amber
  },
  warning: {
    icon: AlertTriangle,
    defaultTitle: 'Attention',
    accentColor: '239 68 68', // red
  },
  method: {
    icon: Settings,
    defaultTitle: 'Méthode',
    accentColor: '16 185 129', // emerald
  },
  insight: {
    icon: Lightbulb,
    defaultTitle: 'Intuition',
    accentColor: '14 165 233', // sky
  },
  tip: {
    icon: GraduationCap,
    defaultTitle: 'Conseil',
    accentColor: '20 184 166', // teal
  },
  quote: {
    icon: Quote,
    defaultTitle: 'Citation',
    accentColor: '139 92 246', // violet
  },
  remember: {
    icon: BookMarked,
    defaultTitle: 'À retenir',
    accentColor: '245 158 11', // amber
  },
  exam: {
    icon: Target,
    defaultTitle: "Pour l'examen",
    accentColor: '139 92 246', // violet
  },
  important: {
    icon: Zap,
    defaultTitle: 'Important',
    accentColor: '249 115 22', // orange
  },
};

export function Callout({ type, title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const IconComponent = config.icon;
  const displayTitle = title || config.defaultTitle;

  return (
    <div 
      className="my-6 p-5 rounded-2xl border-l-4"
      style={{
        background: `rgba(${config.accentColor}, 0.08)`,
        borderLeftColor: `rgb(${config.accentColor})`,
        boxShadow: `0 2px 8px rgba(${config.accentColor}, 0.12)`
      }}
    >
      <div className="flex gap-4">
        <div 
          className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ 
            background: `rgba(${config.accentColor}, 0.15)`,
          }}
        >
          <IconComponent 
            className="w-5 h-5" 
            style={{ color: `rgb(${config.accentColor})` }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p 
            className="font-semibold text-base mb-2"
            style={{ color: 'rgb(var(--text))' }}
          >
            {displayTitle}
          </p>
          <div 
            className="text-base leading-relaxed"
            style={{ color: 'rgb(var(--text-secondary))' }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
