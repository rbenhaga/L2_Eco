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
  cssKey: string;
}> = {
  key: { icon: Key, defaultTitle: 'Concept clé', cssKey: 'key' },
  example: { icon: Lightbulb, defaultTitle: 'Exemple', cssKey: 'example' },
  warning: { icon: AlertTriangle, defaultTitle: 'Attention', cssKey: 'warning' },
  method: { icon: Settings, defaultTitle: 'Méthode', cssKey: 'method' },
  insight: { icon: Lightbulb, defaultTitle: 'Intuition', cssKey: 'intuition' },
  tip: { icon: GraduationCap, defaultTitle: 'Conseil', cssKey: 'tip' },
  quote: { icon: Quote, defaultTitle: 'Citation', cssKey: 'definition' },
  remember: { icon: BookMarked, defaultTitle: 'À retenir', cssKey: 'example' },
  exam: { icon: Target, defaultTitle: "Pour l'examen", cssKey: 'formula' },
  important: { icon: Zap, defaultTitle: 'Important', cssKey: 'key' },
};

export function Callout({ type, title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const IconComponent = config.icon;
  const displayTitle = title || config.defaultTitle;
  const k = config.cssKey;

  return (
    <div
      className="my-4 p-4 rounded-xl border-l-4"
      style={{
        background: `var(--callout-${k}-bg)`,
        borderLeftColor: `var(--callout-${k}-border)`,
        borderTop: '1px solid var(--color-border-subtle)',
        borderRight: '1px solid var(--color-border-subtle)',
        borderBottom: '1px solid var(--color-border-subtle)',
      }}
    >
      <div className="flex gap-3">
        <div
          className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background: `var(--callout-${k}-icon-bg)`,
          }}
        >
          <IconComponent
            className="w-4 h-4"
            style={{ color: `var(--callout-${k}-text)` }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="font-semibold text-sm mb-1"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {displayTitle}
          </p>
          <div
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
