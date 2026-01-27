import type { ReactNode } from 'react';

interface TableProps {
  headers: string[];
  children: ReactNode;
}

export function Table({ headers, children }: TableProps) {
  return (
    <div 
      className="my-6 rounded-xl border overflow-hidden"
      style={{ 
        borderColor: 'rgb(var(--border))',
        background: 'rgb(var(--surface-1))',
        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr 
              style={{ 
                background: 'rgb(var(--surface-2))',
              }}
            >
              {headers.map((header, i) => (
                <th 
                  key={i} 
                  className="px-4 py-3 text-left text-sm font-medium border-b"
                  style={{ 
                    color: 'rgb(var(--text))',
                    borderColor: 'rgb(var(--border))'
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface TableRowProps {
  children: ReactNode;
}

let rowCounter = 0;

export function TableRow({ children }: TableRowProps) {
  const isEven = rowCounter++ % 2 === 0;
  
  return (
    <tr 
      className="transition-colors"
      style={{ 
        background: isEven ? 'transparent' : 'rgb(var(--surface-2) / 0.3)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgb(var(--accent) / 0.04)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isEven ? 'transparent' : 'rgb(var(--surface-2) / 0.3)';
      }}
    >
      {children}
    </tr>
  );
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

export function TableCell({ children, className = '' }: TableCellProps) {
  // Check if this is the first cell in the row by checking if it's the first child
  const isFirstInRow = className === '' || !className;
  
  return (
    <td 
      className={`px-4 py-3.5 text-sm ${className}`}
      style={{ 
        color: 'rgb(var(--text-secondary))',
        fontWeight: isFirstInRow ? 600 : 400
      }}
    >
      {children}
    </td>
  );
}
