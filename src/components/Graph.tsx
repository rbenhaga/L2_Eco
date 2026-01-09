interface GraphProps {
  src: string;
  alt: string;
  caption: string;
  figure: number;
}

export function Graph({ src, alt, caption, figure }: GraphProps) {
  return (
    <figure className="my-8 rounded-2xl overflow-hidden bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
      <div className="bg-white dark:bg-slate-800/50 p-4 flex items-center justify-center">
        <img
          src={src}
          alt={alt}
          className="max-w-full h-auto dark:invert dark:hue-rotate-180 dark:contrast-75"
          loading="lazy"
        />
      </div>
      <figcaption className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-transparent">
        <strong className="text-slate-900 dark:text-white">Figure {figure}</strong> — {caption}
      </figcaption>
    </figure>
  );
}
