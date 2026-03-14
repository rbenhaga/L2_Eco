import type { ReactNode } from 'react';

interface TableProps {
  headers: string[];
  children: ReactNode;
}

const GRID_COLOR = 'rgb(var(--text) / 0.22)';
const OUTER_COLOR = 'rgb(var(--text) / 0.3)';

export function Table({ headers, children }: TableProps) {
  return (
    <div className="editorial-table" style={{ borderColor: OUTER_COLOR }}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="editorial-table__head"
                  style={{
                    color: 'rgb(var(--text))',
                    borderBottom: `1px solid ${GRID_COLOR}`,
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
  return <tr className="editorial-table__row">{children}</tr>;
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
  header?: boolean;
}

export function TableCell({ children, className = '', header = false }: TableCellProps) {
  return (
    <td
      className={`editorial-table__cell ${className}`.trim()}
      style={{
        color: header ? 'rgb(var(--text))' : 'rgb(var(--text-secondary))',
        fontWeight: header ? 600 : 400,
        borderBottom: `1px solid ${GRID_COLOR}`,
      }}
    >
      {children}
    </td>
  );
}
