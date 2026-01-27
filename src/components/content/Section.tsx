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

export function Section({ title, children, type = 'intuition' }: SectionProps) {
  const config = sectionConfig[type];
  const Icon = config.icon;

  return (
    <section 
      className="mb-8 p-6 sm:p-8 rounded-2xl border"
      style={{ 
        background: 'rgb(var(--surface-1))',
        borderColor: 'rgb(var(--border))',
        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06), 0 8px 24px rgba(15, 23, 42, 0.08)'
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
        <h2 
          className="text-xl sm:text-2xl font-semibold"
          style={{ color: 'rgb(var(--text))' }}
        >
          {title}
        </h2>
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
