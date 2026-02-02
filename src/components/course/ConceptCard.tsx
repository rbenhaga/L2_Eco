import type { ReactNode } from 'react';

/**
 * Subject-based color system using CSS custom properties
 * Maps to the 4 main subjects: macro, micro, stats, socio
 */
type SubjectColor = 'macro' | 'micro' | 'stats' | 'socio';

/**
 * Legacy color names mapped to subjects for backwards compatibility
 */
type LegacyColor = 'blue' | 'emerald' | 'violet' | 'amber' | 'rose' | 'cyan' | 'slate' | 'indigo' | 'teal' | 'sky';

type CardColor = SubjectColor | LegacyColor;

/**
 * Map legacy colors to subject colors for consistent theming
 */
const colorToSubject: Record<LegacyColor, SubjectColor> = {
    blue: 'macro',
    sky: 'macro',
    indigo: 'macro',
    violet: 'micro',
    emerald: 'micro',
    teal: 'stats',
    cyan: 'stats',
    amber: 'socio',
    rose: 'socio',
    slate: 'macro', // default fallback
};

/**
 * Subject color configurations using CSS custom properties
 */
const subjectStyles: Record<SubjectColor, { border: string; bg: string; accent: string; gradient: string }> = {
    macro: {
        border: 'border-[color-mix(in_srgb,var(--color-macro)_20%,transparent)]',
        bg: 'bg-[color-mix(in_srgb,var(--color-macro)_5%,rgb(var(--surface-1)))]',
        accent: 'text-[var(--color-macro)]',
        gradient: 'from-[var(--color-macro)] to-[color-mix(in_srgb,var(--color-macro)_80%,#6366f1)]',
    },
    micro: {
        border: 'border-[color-mix(in_srgb,var(--color-micro)_20%,transparent)]',
        bg: 'bg-[color-mix(in_srgb,var(--color-micro)_5%,rgb(var(--surface-1)))]',
        accent: 'text-[var(--color-micro)]',
        gradient: 'from-[var(--color-micro)] to-[color-mix(in_srgb,var(--color-micro)_80%,#8b5cf6)]',
    },
    stats: {
        border: 'border-[color-mix(in_srgb,var(--color-stats)_20%,transparent)]',
        bg: 'bg-[color-mix(in_srgb,var(--color-stats)_5%,rgb(var(--surface-1)))]',
        accent: 'text-[var(--color-stats)]',
        gradient: 'from-[var(--color-stats)] to-[color-mix(in_srgb,var(--color-stats)_80%,#06b6d4)]',
    },
    socio: {
        border: 'border-[color-mix(in_srgb,var(--color-socio)_20%,transparent)]',
        bg: 'bg-[color-mix(in_srgb,var(--color-socio)_5%,rgb(var(--surface-1)))]',
        accent: 'text-[var(--color-socio)]',
        gradient: 'from-[var(--color-socio)] to-[color-mix(in_srgb,var(--color-socio)_80%,#f43f5e)]',
    },
};

function getSubjectFromColor(color: CardColor): SubjectColor {
    if (color in subjectStyles) return color as SubjectColor;
    return colorToSubject[color as LegacyColor] || 'macro';
}

interface ConceptCardProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
    icon?: ReactNode;
    color?: CardColor;
    /** Use subject directly for new code */
    subject?: SubjectColor;
}

/**
 * ConceptCard — Design Contract v3 compliant
 *
 * Uses CSS custom properties for colors
 * Supports subject-based theming (macro, micro, stats, socio)
 * Backwards compatible with legacy color names
 */
export function ConceptCard({
    title,
    subtitle,
    children,
    icon,
    color = 'macro',
    subject
}: ConceptCardProps) {
    const resolvedSubject = subject || getSubjectFromColor(color);
    const styles = subjectStyles[resolvedSubject];

    return (
        <div className={`
            p-[var(--space-4)] sm:p-[var(--space-5)]
            border rounded-[var(--radius-lg)]
            ${styles.border} ${styles.bg}
            backdrop-blur-sm
            transition-all duration-[var(--duration-normal)] ease-[var(--ease-default)]
            hover:shadow-[var(--shadow-1)]
        `}>
            <div className="flex items-center gap-[var(--space-2)] sm:gap-[var(--space-3)] mb-[var(--space-2)] sm:mb-[var(--space-3)]">
                {icon && <span className={styles.accent}>{icon}</span>}
                <div>
                    <h4 className="font-semibold text-[rgb(var(--text))] text-sm sm:text-base">
                        {title}
                    </h4>
                    {subtitle && (
                        <p className="text-xs text-[rgb(var(--text-muted))]">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
            <div className="text-[rgb(var(--text-secondary))] text-sm leading-relaxed">
                {children}
            </div>
        </div>
    );
}

interface AuthorCardProps {
    name: string;
    dates?: string;
    work?: string;
    children: ReactNode;
    color?: CardColor;
    subject?: SubjectColor;
    image?: string;
    hideAvatar?: boolean;
}

/**
 * AuthorCard — Design Contract v3 compliant
 *
 * Premium card for displaying economist/author information
 * Uses subject-based accent colors
 */
export function AuthorCard({
    name,
    dates,
    work,
    children,
    color = 'macro',
    subject,
    image,
    hideAvatar
}: AuthorCardProps) {
    const resolvedSubject = subject || getSubjectFromColor(color);
    const styles = subjectStyles[resolvedSubject];
    const showAvatar = image || !hideAvatar;

    return (
        <div className="
            p-[var(--space-4)] sm:p-[var(--space-6)]
            bg-[rgb(var(--surface-1))]
            border border-[rgb(var(--border))]
            rounded-[var(--radius-lg)]
            shadow-[var(--shadow-1)]
            mb-[var(--space-4)]
            transition-all duration-[var(--duration-normal)] ease-[var(--ease-default)]
            hover:shadow-[var(--shadow-2)]
        ">
            <div className="
                flex items-center gap-[var(--space-3)] sm:gap-[var(--space-4)]
                mb-[var(--space-3)] sm:mb-[var(--space-4)]
                pb-[var(--space-3)] sm:pb-[var(--space-4)]
                border-b border-[rgb(var(--border))]
            ">
                {showAvatar && (
                    image ? (
                        <img
                            src={image}
                            alt={name}
                            className="
                                w-12 h-12 sm:w-14 sm:h-14
                                rounded-[var(--radius-lg)]
                                object-cover
                                shadow-[var(--shadow-2)]
                                border-2 border-[rgb(var(--surface-1))]
                            "
                        />
                    ) : (
                        <div
                            className={`
                                w-12 h-12 sm:w-14 sm:h-14
                                rounded-[var(--radius-lg)]
                                bg-gradient-to-br ${styles.gradient}
                                flex items-center justify-center
                                text-white font-bold text-lg sm:text-xl
                                shadow-[var(--shadow-2)]
                            `}
                        >
                            {name.charAt(0)}
                        </div>
                    )
                )}
                <div>
                    <h4 className="font-semibold text-[rgb(var(--text))] text-base sm:text-lg">
                        {name}
                    </h4>
                    <p className="text-xs sm:text-sm text-[rgb(var(--text-muted))]">
                        {dates && <span>{dates}</span>}
                        {dates && work && <span> • </span>}
                        {work && <span className="italic">{work}</span>}
                    </p>
                </div>
            </div>
            <div className="text-[rgb(var(--text-secondary))] text-sm sm:text-base leading-relaxed">
                {children}
            </div>
        </div>
    );
}
