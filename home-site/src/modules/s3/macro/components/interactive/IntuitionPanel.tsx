import { Math as MathDisplay } from '../../../../../components/Math';

interface IntuitionStep {
  text: string;
  formula?: string;
}

interface IntuitionSection {
  title: string;
  color: string;
  steps: IntuitionStep[];
}

interface IntuitionPanelProps {
  sections: IntuitionSection[];
}

export function IntuitionPanel({ sections }: IntuitionPanelProps) {
  return (
    <div className="mb-6 grid gap-4" style={{ gridTemplateColumns: `repeat(${sections.length}, 1fr)` }}>
      {sections.map((section) => (
        <div 
          key={section.title} 
          className="rounded-xl p-5"
          style={{
            background: 'var(--color-bg-overlay)',
            border: '1px solid var(--color-border-default)',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: '1px solid var(--color-border-default)' }}>
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: section.color }} 
            />
            <h4 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>
              {section.title}
            </h4>
          </div>
          
          {/* Steps */}
          <div className="space-y-3">
            {section.steps.map((step, i) => (
              <div key={i} className="flex gap-3">
                <span 
                  className="shrink-0 w-5 h-5 rounded-full text-xs font-medium flex items-center justify-center"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${section.color} 20%, transparent)`,
                    color: section.color,
                  }}
                >
                  {i + 1}
                </span>
                <div className="flex-1 text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
                  {step.text}
                  {step.formula && (
                    <div className="mt-1">
                      <MathDisplay>{step.formula}</MathDisplay>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
