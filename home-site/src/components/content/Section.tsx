import type { ReactNode } from 'react';
import { BookOpen, Calculator, BarChart3, AlertTriangle, Key, FileText, Quote, User, Lightbulb } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type SectionType = 'intuition' | 'formule' | 'graphique' | 'warning' | 'key' | 'definition' | 'citation' | 'auteur' | 'exemple';

interface SectionProps {
  title: string;
  children: ReactNode;
  type?: SectionType;
}

const sectionConfig: Record<SectionType, { icon: LucideIcon; label: string }> = {
  intuition: { icon: Lightbulb, label: 'Intuition' },
  formule: { icon: Calculator, label: 'Formule' },
  graphique: { icon: BarChart3, label: 'Graphique' },
  warning: { icon: AlertTriangle, label: 'Attention' },
  key: { icon: Key, label: 'Concept clé' },
  definition: { icon: FileText, label: 'Définition' },
  citation: { icon: Quote, label: 'Citation' },
  auteur: { icon: User, label: 'Auteur' },
  exemple: { icon: BookOpen, label: 'Exemple' },
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
  const level = detectSectionLevel(title);

  // Generate a slug for the section id (used by TOC)
  const sectionId = title
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const HeadingTag = level === 1 ? 'h2' : level === 2 ? 'h3' : 'h4';

  return (
    <section
      id={sectionId}
      data-section-title={title}
      data-section-level={level}
      className={`${level === 1 ? 'mb-8' : level === 2 ? 'mb-6 ml-3 sm:ml-5' : 'mb-5 ml-6 sm:ml-8'} p-6 sm:p-8 rounded-2xl border`}
      style={{
        background: 'rgb(var(--surface-1))',
        borderColor: 'rgb(var(--border))',
        boxShadow: '0 1px 3px color-mix(in srgb, var(--color-text-primary) 6%, transparent), 0 8px 24px color-mix(in srgb, var(--color-text-primary) 8%, transparent)'
      }}
    >
      {/* Section header */}
      <div className="mb-6">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3"
          style={{
            background: 'rgb(var(--surface-2))',
            border: '1px solid rgb(var(--border))'
          }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: 'rgb(var(--text-muted))' }} />
          <span
            className="text-xs font-medium"
            style={{ color: 'rgb(var(--text-muted))' }}
          >
            {config.label}
          </span>
        </div>
        <HeadingTag
          className={level === 1 ? 'text-xl sm:text-2xl font-semibold' : level === 2 ? 'text-lg sm:text-xl font-semibold' : 'text-base sm:text-lg font-semibold'}
          style={{ color: 'rgb(var(--text))' }}
        >
          {title}
        </HeadingTag>
      </div>

      {/* Section content */}
      <div
        className="leading-relaxed text-base"
        style={{ color: 'rgb(var(--text-secondary))' }}
      >
        {children}
      </div>
    </section>
  );
}
