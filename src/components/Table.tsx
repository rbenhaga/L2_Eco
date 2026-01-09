import type { ReactNode } from 'react';

interface TableProps {
  headers: string[];
  children: ReactNode;
}

export function Table({ headers, children }: TableProps) {
  return (
    <div className="overflow-x-auto my-6 rounded-xl border border-slate-200 dark:border-white/10">
      <table className="w-full text-left">
        <thead className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
          {children}
        </tbody>
      </table>
    </div>
  );
}

interface TableRowProps {
  children: ReactNode;
}

export function TableRow({ children }: TableRowProps) {
  return <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">{children}</tr>;
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

export function TableCell({ children, className = '' }: TableCellProps) {
  return <td className={`px-6 py-4 text-slate-700 dark:text-slate-300 ${className}`}>{children}</td>;
}
