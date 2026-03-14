import type { ReactNode } from 'react';

interface CourseTableProps {
  children: ReactNode;
  className?: string;
}

type Align = 'left' | 'center' | 'right';
type Tone = 'default' | 'muted' | 'key' | 'warning';
type Weight = 'normal' | 'medium' | 'semibold' | 'bold';

interface CourseTableRowProps {
  children: ReactNode;
  tone?: 'default' | 'muted';
}

interface CourseTableCellProps {
  children: ReactNode;
  header?: boolean;
  align?: Align;
  tone?: Tone;
  weight?: Weight;
}

const GRID_COLOR = 'rgb(var(--text) / 0.22)';
const OUTER_COLOR = 'rgb(var(--text) / 0.3)';

function alignClass(align: Align) {
  if (align === 'center') return 'text-center';
  if (align === 'right') return 'text-right';
  return 'text-left';
}

function weightClass(weight: Weight) {
  if (weight === 'bold') return 'font-bold';
  if (weight === 'semibold') return 'font-semibold';
  if (weight === 'medium') return 'font-medium';
  return 'font-normal';
}

function toneColor(tone: Tone) {
  if (tone === 'muted') return 'var(--color-text-secondary)';
  if (tone === 'key') return 'var(--callout-key-text)';
  if (tone === 'warning') return 'var(--callout-warning-text)';
  return 'var(--color-text-primary)';
}

export function CourseTable({ children, className = '' }: CourseTableProps) {
  return (
    <div
      className={`editorial-table ${className}`.trim()}
      style={{ borderColor: OUTER_COLOR }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-base border-collapse">{children}</table>
      </div>
    </div>
  );
}

export function CourseTableHead({ children }: { children: ReactNode }) {
  return <thead>{children}</thead>;
}

export function CourseTableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function CourseTableRow({ children, tone = 'default' }: CourseTableRowProps) {
  return (
    <tr
      className="editorial-table__row"
      style={{
        ...(tone === 'muted' ? { background: 'var(--color-bg-overlay)' } : {}),
      }}
    >
      {children}
    </tr>
  );
}

export function CourseTableCell({
  children,
  header = false,
  align = 'left',
  tone = 'default',
  weight = 'normal',
}: CourseTableCellProps) {
  const baseClass = `px-4 ${header ? 'py-3' : 'py-2.5'} ${alignClass(align)} ${weightClass(weight)}`;

  if (header) {
    return (
      <th
        className={`editorial-table__head ${baseClass}`.trim()}
        style={{
          color: toneColor(tone),
          borderBottom: `1px solid ${GRID_COLOR}`,
        }}
      >
        {children}
      </th>
    );
  }

  return (
    <td
      className={`editorial-table__cell ${baseClass}`.trim()}
      style={{
        color: toneColor(tone),
        borderBottom: `1px solid ${GRID_COLOR}`,
      }}
    >
      {children}
    </td>
  );
}
