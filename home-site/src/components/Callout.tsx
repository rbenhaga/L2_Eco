import type { CSSProperties, ReactNode } from 'react';
import {
  Key,
  Lightbulb,
  AlertTriangle,
  Settings,
  GraduationCap,
  BookMarked,
  Target,
  Zap,
  Quote,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type CalloutType =
  | 'key'
  | 'example'
  | 'warning'
  | 'method'
  | 'insight'
  | 'tip'
  | 'quote'
  | 'remember'
  | 'exam'
  | 'important';

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: ReactNode;
}

const calloutConfig: Record<
  CalloutType,
  {
    icon: LucideIcon;
    label: string;
    cssKey: string;
  }
> = {
  key: { icon: Key, label: 'Definition', cssKey: 'key' },
  example: { icon: Lightbulb, label: 'Exemple', cssKey: 'example' },
  warning: { icon: AlertTriangle, label: 'Attention', cssKey: 'warning' },
  method: { icon: Settings, label: 'Methode', cssKey: 'method' },
  insight: { icon: Lightbulb, label: 'Demonstration', cssKey: 'intuition' },
  tip: { icon: GraduationCap, label: 'Conseil', cssKey: 'tip' },
  quote: { icon: Quote, label: 'Citation', cssKey: 'key' },
  remember: { icon: BookMarked, label: 'A retenir', cssKey: 'example' },
  exam: { icon: Target, label: "Pour l'examen", cssKey: 'formula' },
  important: { icon: Zap, label: 'Theoreme', cssKey: 'key' },
};

export function Callout({ type, title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const IconComponent = config.icon;
  const k = config.cssKey;

  return (
    <div
      className="editorial-callout"
      style={{ '--callout-accent': `var(--callout-${k}-text)` } as CSSProperties}
    >
      <div className="editorial-callout__header">
        <span className="editorial-callout__badge" style={{ color: `var(--callout-${k}-text)` }}>
          <IconComponent size={11} />
          {config.label}
        </span>
        <h4 className="editorial-callout__title" style={{ color: 'rgb(var(--text))' }}>
          {title ?? config.label}
        </h4>
      </div>

      <div className="editorial-callout__body" style={{ color: 'rgb(var(--text-secondary))' }}>
        {children}
      </div>
    </div>
  );
}
