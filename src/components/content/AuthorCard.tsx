import { User } from 'lucide-react';

interface AuthorCardProps {
    name: string;
    dates?: string;
    work?: string;
    children: React.ReactNode;
    color?: string;
    image?: string;
    hideAvatar?: boolean;
}

export function AuthorCard({ name, dates, work, children, image, hideAvatar }: AuthorCardProps) {
    // Note: color prop accepted but not used - we use CSS variables for consistency
    return (
        <div className="my-6 p-5 rounded-xl border" style={{ background: 'rgb(var(--surface-1))', borderColor: 'rgb(var(--border))', boxShadow: 'var(--shadow-1)' }}>
            {/* Header */}
            <div className="flex items-start gap-3 mb-4 pb-4 border-b" style={{ borderColor: 'rgb(var(--border-hairline))' }}>
                {!hideAvatar && (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 overflow-hidden" style={{ background: 'rgb(var(--accent) / 0.1)' }}>
                        {image ? (
                            <img src={image} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                            <User className="h-5 w-5" style={{ color: 'rgb(var(--accent))' }} />
                        )}
                    </div>
                )}
                <div>
                    <h4 className="font-semibold text-base" style={{ color: 'rgb(var(--text))' }}>{name}</h4>
                    {(dates || work) && (
                        <p className="text-sm" style={{ color: 'rgb(var(--text-muted))' }}>
                            {dates && <span>{dates}</span>}
                            {dates && work && <span> · </span>}
                            {work && <span className="italic">{work}</span>}
                        </p>
                    )}
                </div>
            </div>
            
            {/* Content */}
            <div className="text-sm leading-relaxed" style={{ color: 'rgb(var(--text-secondary))' }}>
                {children}
            </div>
        </div>
    );
}
