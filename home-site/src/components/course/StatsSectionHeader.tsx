interface StatsSectionHeaderProps {
  title: string;
}

export function StatsSectionHeader({ title }: StatsSectionHeaderProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">{title}</h2>
      <div className="h-[2px] w-12 rounded bg-[var(--color-stats)]" />
    </div>
  );
}
