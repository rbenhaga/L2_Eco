import type { ReactNode } from 'react';
import { Sigma } from 'lucide-react';
import { FormulaBox } from '../Math';

interface CourseProofProps {
  result?: ReactNode;
  title?: string;
  children: ReactNode;
  className?: string;
}

interface CourseProofStepProps {
  title?: ReactNode;
  children: ReactNode;
}

interface CourseProofConclusionProps {
  children: ReactNode;
}

interface CourseProofEquationProps {
  children: string;
  label?: string;
}

export function CourseProof({
  result,
  title = 'Demonstration',
  children,
  className = '',
}: CourseProofProps) {
  return (
    <section className={`editorial-proof ${className}`.trim()}>
      <div className="editorial-proof__header">
        <span className="editorial-proof__badge">
          <Sigma className="h-3.5 w-3.5" />
          {title}
        </span>
        {result ? <div className="editorial-proof__result">{result}</div> : null}
      </div>
      <div className="editorial-proof__body">{children}</div>
    </section>
  );
}

export function CourseProofStep({ title, children }: CourseProofStepProps) {
  return (
    <div className="editorial-proof__step">
      {title ? <h4 className="editorial-proof__step-title">{title}</h4> : null}
      <div className="editorial-proof__step-body">{children}</div>
    </div>
  );
}

export function CourseProofEquation({ children, label }: CourseProofEquationProps) {
  return <FormulaBox label={label} variant="derivation">{children}</FormulaBox>;
}

export function CourseProofConclusion({ children }: CourseProofConclusionProps) {
  return <div className="editorial-proof__conclusion">{children}</div>;
}
