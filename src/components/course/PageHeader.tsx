interface PageHeaderProps {
  number: string;
  title: string;
  description: string;
}

export function PageHeader({ number, title, description }: PageHeaderProps) {
  return (
    <header className="pt-20 sm:pt-28 md:pt-32 pb-8 sm:pb-12 md:pb-16 text-center px-4">
      <p className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-widest mb-2 sm:mb-4">
        {number}
      </p>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-3 sm:mb-6">
        {title}
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    </header>
  );
}
