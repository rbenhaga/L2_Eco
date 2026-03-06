import type { ReactNode } from 'react';
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
  key: { icon: Key, label: 'Définition', cssKey: 'key' },
  example: { icon: Lightbulb, label: 'Exemple', cssKey: 'example' },
  warning: { icon: AlertTriangle, label: 'Attention', cssKey: 'warning' },
  method: { icon: Settings, label: 'Méthode', cssKey: 'method' },
  insight: { icon: Lightbulb, label: 'Démonstration', cssKey: 'intuition' },
  tip: { icon: GraduationCap, label: 'Conseil', cssKey: 'tip' },
  quote: { icon: Quote, label: 'Citation', cssKey: 'key' },
  remember: { icon: BookMarked, label: 'À retenir', cssKey: 'example' },
  exam: { icon: Target, label: "Pour l'examen", cssKey: 'formula' },
  important: { icon: Zap, label: 'Théorème', cssKey: 'key' },
};

export function Callout({ type, title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const IconComponent = config.icon;
  const k = config.cssKey;

  return (
    <div
      className="rounded-xl border border-l-4 p-5 space-y-4"
      style={{
        background: 'rgb(var(--surface-1))',
        borderColor: 'rgb(var(--border))',
        borderLeftColor: `var(--callout-${k}-text)`,
        boxShadow: '0 1px 3px color-mix(in srgb, var(--color-text-primary) 4%, transparent)',
      }}
    >
      <div className="space-y-3">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold shrink-0"
          style={{
            background: `var(--callout-${k}-icon-bg)`,
            color: `var(--callout-${k}-text)`,
          }}
        >
          <IconComponent size={11} />
          {config.label}
        </span>
        <h4 className="font-semibold text-base" style={{ color: 'rgb(var(--text))' }}>
          {title ?? config.label}
        </h4>
      </div>

      <div className="text-base leading-relaxed" style={{ color: 'rgb(var(--text-secondary))' }}>
        {children}
      </div>
    </div>
  );
}
