import type { ReactNode } from 'react';

interface TableProps {
  headers: string[];
  children: ReactNode;
}

const GRID_COLOR = 'rgb(var(--text) / 0.22)';
const OUTER_COLOR = 'rgb(var(--text) / 0.3)';

export function Table({ headers, children }: TableProps) {
  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{
        borderColor: OUTER_COLOR,
        background: 'rgb(var(--surface-1))',
        boxShadow: '0 1px 3px color-mix(in srgb, var(--color-text-primary) 4%, transparent)',
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ background: 'rgb(var(--surface-2))' }}>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left text-base font-semibold"
                  style={{
                    color: 'rgb(var(--text))',
                    borderBottom: `1px solid ${GRID_COLOR}`,
                    borderRight: i < headers.length - 1 ? `1px solid ${GRID_COLOR}` : undefined,
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

interface TableRowProps {
  children: ReactNode;
}

export function TableRow({ children }: TableRowProps) {
  return (
    <tr
      className="transition-colors duration-150"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLTableRowElement).style.background = 'rgb(var(--surface-2) / 0.55)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLTableRowElement).style.background = '';
      }}
    >
      {children}
    </tr>
  );
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
  header?: boolean;
}

export function TableCell({ children, className = '', header = false }: TableCellProps) {
  return (
    <td
      className={`px-4 py-3 text-base ${className}`}
      style={{
        color: header ? 'rgb(var(--text))' : 'rgb(var(--text-secondary))',
        fontWeight: header ? 600 : 400,
        borderBottom: `1px solid ${GRID_COLOR}`,
        borderRight: `1px solid ${GRID_COLOR}`,
      }}
    >
      {children}
    </td>
  );
}
