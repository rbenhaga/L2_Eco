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
  borderVar: string;
  bgVar: string;
  iconColorVar: string;
}> = {
  key: {
    icon: Key,
    defaultTitle: 'Concept clé',
    borderVar: 'var(--callout-key-border)',
    bgVar: 'var(--callout-key-bg)',
    iconColorVar: 'var(--callout-key-text)',
  },
  example: {
    icon: Lightbulb,
    defaultTitle: 'Exemple',
    borderVar: 'var(--callout-example-border)',
    bgVar: 'var(--callout-example-bg)',
    iconColorVar: 'var(--callout-example-text)',
  },
  warning: {
    icon: AlertTriangle,
    defaultTitle: 'Attention',
    borderVar: 'var(--callout-warning-border)',
    bgVar: 'var(--callout-warning-bg)',
    iconColorVar: 'var(--callout-warning-text)',
  },
  method: {
    icon: Settings,
    defaultTitle: 'Méthode',
    borderVar: 'var(--callout-method-border)',
    bgVar: 'var(--callout-method-bg)',
    iconColorVar: 'var(--callout-method-text)',
  },
  insight: {
    icon: Lightbulb,
    defaultTitle: 'Intuition',
    borderVar: 'var(--callout-intuition-border)',
    bgVar: 'var(--callout-intuition-bg)',
    iconColorVar: 'var(--callout-intuition-text)',
  },
  tip: {
    icon: GraduationCap,
    defaultTitle: 'Conseil',
    borderVar: 'var(--callout-tip-border)',
    bgVar: 'var(--callout-tip-bg)',
    iconColorVar: 'var(--callout-tip-text)',
  },
  quote: {
    icon: Quote,
    defaultTitle: 'Citation',
    borderVar: 'var(--callout-formula-border)',
    bgVar: 'var(--callout-formula-bg)',
    iconColorVar: 'var(--callout-formula-text)',
  },
  remember: {
    icon: BookMarked,
    defaultTitle: 'À retenir',
    borderVar: 'var(--callout-example-border)',
    bgVar: 'var(--callout-example-bg)',
    iconColorVar: 'var(--callout-example-text)',
  },
  exam: {
    icon: Target,
    defaultTitle: "Pour l'examen",
    borderVar: 'var(--callout-formula-border)',
    bgVar: 'var(--callout-formula-bg)',
    iconColorVar: 'var(--callout-formula-text)',
  },
  important: {
    icon: Zap,
    defaultTitle: 'Important',
    borderVar: 'var(--callout-warning-border)',
    bgVar: 'var(--callout-warning-bg)',
    iconColorVar: 'var(--callout-warning-text)',
  },
};

export function Callout({ type, title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const IconComponent = config.icon;
  const displayTitle = title || config.defaultTitle;

  return (
    <div
      className="flex gap-2.5 p-3 my-2.5 border-l-[3px] rounded-r-lg"
      style={{
        borderLeftColor: config.borderVar,
        background: `linear-gradient(to right, ${config.bgVar}, transparent)`,
      }}
    >
      <div
        className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center mt-0.5"
        style={{ color: config.iconColorVar }}
      >
        <IconComponent className="w-3.5 h-3.5" />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="font-semibold text-xs sm:text-sm mb-0.5"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {displayTitle}
        </p>
        <div
          className="text-[13px] sm:text-sm leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
