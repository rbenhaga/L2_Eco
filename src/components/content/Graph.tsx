interface GraphProps {
  src: string;
  alt: string;
  caption: string;
  figure: number;
}

export function Graph({ src, alt, caption, figure }: GraphProps) {
  return (
    <figure 
      className="my-8 rounded-xl overflow-hidden border"
      style={{ 
        borderColor: 'rgb(var(--border))',
        background: 'rgb(var(--surface-1))',
        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
      }}
    >
      {/* Image container */}
      <div className="p-3">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto"
          loading="lazy"
        />
      </div>
      
      {/* Caption */}
      <figcaption 
        className="px-4 py-3 flex items-center gap-3"
        style={{ 
          background: 'rgb(var(--surface-2))',
        }}
      >
        <span 
          className="px-2.5 py-1 rounded-full text-xs font-semibold shrink-0"
          style={{ 
            background: 'rgb(var(--accent) / 0.1)',
            color: 'rgb(var(--accent))'
          }}
        >
          Fig. {figure}
        </span>
        <span 
          className="text-sm"
          style={{ color: 'rgb(var(--text-secondary))' }}
        >
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
