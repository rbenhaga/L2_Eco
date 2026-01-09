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
          className="bg-slate-100/50 dark:bg-white/5 rounded-xl p-5 border border-gray-100"
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-white/10">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: section.color }} 
            />
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
              {section.title}
            </h4>
          </div>
          
          {/* Steps */}
          <div className="space-y-3">
            {section.steps.map((step, i) => (
              <div key={i} className="flex gap-3">
                <span 
                  className="shrink-0 w-5 h-5 rounded-full text-xs font-medium flex items-center justify-center"
                  style={{ backgroundColor: `${section.color}20`, color: section.color }}
                >
                  {i + 1}
                </span>
                <div className="flex-1 text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
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
