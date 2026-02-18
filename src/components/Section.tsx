import type { ReactNode } from 'react';
import { BookOpen, Calculator, BarChart3, AlertTriangle, Key, FileText, Quote, User, Lightbulb } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type SectionType = 'intuition' | 'formule' | 'graphique' | 'warning' | 'key' | 'definition' | 'citation' | 'auteur' | 'exemple';

interface SectionProps {
  title: string;
  children: ReactNode;
  type?: SectionType;
}

const sectionConfig: Record<SectionType, { icon: LucideIcon; label: string; cssKey: string }> = {
  intuition: { icon: Lightbulb, label: 'Intuition', cssKey: 'intuition' },
  formule: { icon: Calculator, label: 'Formule', cssKey: 'formula' },
  graphique: { icon: BarChart3, label: 'Graphique', cssKey: 'info' },
  warning: { icon: AlertTriangle, label: 'Attention', cssKey: 'warning' },
  key: { icon: Key, label: 'Concept clé', cssKey: 'key' },
  definition: { icon: FileText, label: 'Définition', cssKey: 'definition' },
  citation: { icon: Quote, label: 'Citation', cssKey: 'definition' },
  auteur: { icon: User, label: 'Auteur', cssKey: 'definition' },
  exemple: { icon: BookOpen, label: 'Exemple', cssKey: 'example' },
};

function detectSectionLevel(title: string): 1 | 2 | 3 {
  const trimmed = title.trim();
  if (/^\d+\.\d+\.\d+(?:\s|$)/.test(trimmed)) return 3;
  if (/^\d+\.\d+(?:\s|$)/.test(trimmed)) return 2;
  if (/^\d+(?:[.)])?\s/.test(trimmed)) return 1;
  if (/^[IVXLCDM]+\.\s/i.test(trimmed)) return 1;
  return 1;
}

export function Section({ title, children, type = 'intuition' }: SectionProps) {
  const config = sectionConfig[type];
  const Icon = config.icon;
  const k = config.cssKey;
  const level = detectSectionLevel(title);
  
  // Generate a unique ID from the title
  const sectionId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const HeadingTag = level === 1 ? 'h2' : level === 2 ? 'h3' : 'h4';

  const containerClass =
    level === 1
      ? 'mb-8'
      : level === 2
        ? 'mb-6 ml-3 sm:ml-5'
        : 'mb-5 ml-6 sm:ml-8';

  const titleClass =
    level === 1
      ? 'text-lg sm:text-xl'
      : level === 2
        ? 'text-base sm:text-lg'
        : 'text-sm sm:text-base';

  return (
    <section
      id={sectionId}
      data-section-title={title}
      data-section-level={level}
      className={`${containerClass} rounded-2xl overflow-hidden`}
      style={{
        background: 'var(--color-card)',
        boxShadow: 'var(--shadow-md)',
        border: level === 1 ? '1px solid var(--color-border-subtle)' : '1px solid var(--color-border-default)',
      }}
    >
      {/* Colored top accent bar */}
      <div
        className={level === 1 ? 'h-1' : 'h-[2px]'}
        style={{ background: `var(--callout-${k}-border)` }}
      />

      <div className={level === 1 ? 'p-5 sm:p-6' : 'p-4 sm:p-5'}>
        {/* Section badge */}
        <div className={level === 1 ? 'flex items-center gap-2 mb-3' : 'flex items-center gap-2 mb-2'}>
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{
              background: `var(--callout-${k}-bg)`,
            }}
          >
            <Icon
              className="w-3.5 h-3.5"
              style={{ color: `var(--callout-${k}-text)` }}
            />
            <span
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: `var(--callout-${k}-text)` }}
            >
              {config.label}
            </span>
          </div>
        </div>

        {/* Title */}
        <HeadingTag
          className={`${titleClass} font-semibold tracking-tight mb-3`}
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-serif)',
          }}
        >
          {title}
        </HeadingTag>

        {/* Content */}
        <div
          className={level === 1 ? 'leading-relaxed text-[15px]' : 'leading-relaxed text-[14px]'}
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
