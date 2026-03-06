interface ChronologyStep {
  period: string;
  title: string;
  description: string;
}

interface ChronologyArrowProps {
  steps: ChronologyStep[];
}

export function ChronologyArrow({ steps }: ChronologyArrowProps) {
  return (
    <div className="my-6">
      <div className="hidden md:flex items-stretch overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <div key={`${step.period}-${step.title}`} className="flex items-stretch shrink-0">
            <article
              className="w-[260px] rounded-xl border p-4"
              style={{
                borderColor: 'var(--color-border-default)',
                background: 'var(--color-card)',
              }}
            >
              <span
                className="inline-block px-2.5 py-1 rounded-full text-xs font-bold mb-2"
                style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}
              >
                {step.period}
              </span>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                {step.title}
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {step.description}
              </p>
            </article>

            {index < steps.length - 1 && (
              <div className="w-10 flex items-center justify-center">
                <div
                  className="w-8 h-0.5 relative"
                  style={{ background: 'var(--color-accent)' }}
                >
                  <span
                    className="absolute -right-1 -top-[3px] w-0 h-0"
                    style={{
                      borderTop: '4px solid transparent',
                      borderBottom: '4px solid transparent',
                      borderLeft: '7px solid var(--color-accent)',
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="md:hidden space-y-3">
        {steps.map((step, index) => (
          <div key={`${step.period}-${step.title}`} className="relative pl-6">
            {index < steps.length - 1 && (
              <span
                className="absolute left-[9px] top-6 bottom-[-10px] w-px"
                style={{ background: 'var(--color-border-default)' }}
              />
            )}
            <span
              className="absolute left-0 top-2.5 w-[18px] h-[18px] rounded-full border-2"
              style={{ borderColor: 'var(--color-accent)', background: 'var(--color-card)' }}
            />
            <article
              className="rounded-xl border p-3"
              style={{
                borderColor: 'var(--color-border-default)',
                background: 'var(--color-card)',
              }}
            >
              <span
                className="inline-block px-2.5 py-1 rounded-full text-xs font-bold mb-2"
                style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}
              >
                {step.period}
              </span>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                {step.title}
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {step.description}
              </p>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}

