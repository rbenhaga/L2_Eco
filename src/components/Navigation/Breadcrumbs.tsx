/**
 * Breadcrumbs - Contextual Navigation
 * 
 * Auto-generated breadcrumbs from current route.
 * Collapses on mobile for space efficiency.
 */

import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

interface BreadcrumbItem {
    label: string;
    path: string;
}

export function Breadcrumbs() {
    const location = useLocation();

    const breadcrumbs = useMemo(() => {
        const items: BreadcrumbItem[] = [
            { label: 'Accueil', path: '/' }
        ];

        const pathSegments = location.pathname.split('/').filter(Boolean);

        // Build breadcrumbs from path segments
        let currentPath = '';
        pathSegments.forEach((segment) => {
            currentPath += `/${segment}`;

            // Capitalize and format segment
            const label = segment
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            items.push({ label, path: currentPath });
        });

        return items;
    }, [location.pathname]);

    // Don't show if only home
    if (breadcrumbs.length <= 1) return null;

    return (
        <div className="h-10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border-b border-slate-200/30 dark:border-white/5">
            <div className="max-w-7xl mx-auto h-full px-4 flex items-center">
                <nav className="flex items-center gap-2 text-sm">
                    {breadcrumbs.map((item, index) => {
                        const isLast = index === breadcrumbs.length - 1;
                        const isFirst = index === 0;

                        return (
                            <div key={item.path} className="flex items-center gap-2">
                                {isFirst ? (
                                    <Link
                                        to={item.path}
                                        className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors no-underline"
                                    >
                                        <Home className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">{item.label}</span>
                                    </Link>
                                ) : (
                                    <>
                                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                                        {isLast ? (
                                            <span className="font-medium text-slate-900 dark:text-white">
                                                {item.label}
                                            </span>
                                        ) : (
                                            <Link
                                                to={item.path}
                                                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors no-underline hidden sm:inline"
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
