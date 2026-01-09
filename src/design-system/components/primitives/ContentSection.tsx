import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface ContentSectionProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
    badge?: {
        text: string;
        variant?: 'default' | 'success' | 'warning' | 'info';
    };
    children: ReactNode;
    className?: string;
}

/**
 * ContentSection - Standardized section header with content
 * 
 * Used throughout the app for consistent section styling in cours, TD, QCM pages.
 * Provides icon + title + description pattern with optional badge.
 */
export function ContentSection({
    icon: Icon,
    title,
    description,
    badge,
    children,
    className = ''
}: ContentSectionProps) {

    const badgeVariantClasses = {
        default: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
        success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
        warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
        info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
    };

    return (
        <section className={`space-y-6 ${className}`}>
            {/* Section Header */}
            <div className="flex items-start gap-4">
                {Icon && (
                    <div className="shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {title}
                        </h2>
                        {badge && (
                            <span className={`
                px-2.5 py-1 text-xs font-semibold rounded-full
                ${badgeVariantClasses[badge.variant || 'default']}
              `}>
                                {badge.text}
                            </span>
                        )}
                    </div>

                    {description && (
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {/* Section Content */}
            <div>
                {children}
            </div>
        </section>
    );
}
