import { Link } from 'react-router-dom';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { preloadRouteForPath } from '../../../utils/routePreload';

export interface StatItem {
    label: string;
    value: string;
}

export interface ActionButton {
    label: string;
    path: string;
    variant: 'primary' | 'secondary' | 'outline';
    icon?: LucideIcon;
}

export interface ChapterItem {
    title: string;
    desc: string;
    path: string;
    number: string;
}

export interface ContentSection {
    title: string;
    description?: string;
    items: ChapterItem[];
    badge?: string;
    badgeColor?: string;
}

export interface ExtraItem {
    title: string;
    desc: string;
    path: string;
    icon: LucideIcon;
}

export interface ModuleHubProps {
    title: string;
    description: string;
    icon: LucideIcon;
    stats: StatItem[];
    actions: ActionButton[];
    sections: ContentSection[];
    extras: {
        title: string;
        items: ExtraItem[];
    };
    finalCta?: {
        label: string;
        path: string;
        icon: LucideIcon;
    };
    themeColor?: 'macro' | 'micro' | 'stats' | 'socio' | 'management';
}

/**
 * ModuleHub -- Redesigned with CSS Variables for Dual-Theme Support
 * Uses token system for proper light/dark mode
 */
export function ModuleHub({
    title,
    description,
    icon: Icon,
    stats,
    actions,
    sections,
    extras,
    finalCta,
    themeColor = 'macro'
}: ModuleHubProps) {

    // Get theme-specific CSS variables
    const themeVars = {
        color: `var(--color-${themeColor})`,
        light: `var(--color-${themeColor}-light)`,
        gradient: `var(--color-${themeColor}-gradient)`,
        glow: `var(--color-${themeColor}-glow)`,
        shadow: `var(--shadow-${themeColor})`,
    };

    return (
        <div
            className="animate-in fade-in duration-700 min-h-screen"
            style={{ background: 'var(--color-canvas)' }}
        >
            {/* ===== HERO SECTION - Enhanced ===== */}
            <header className="relative pt-16 sm:pt-24 pb-20 sm:pb-28 text-center px-4 sm:px-6 overflow-hidden">
                {/* Dramatic gradient orb behind icon */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-40 blur-3xl pointer-events-none"
                    style={{
                        background: `radial-gradient(circle, ${themeVars.color} 0%, transparent 70%)`,
                        animation: 'glowPulse 8s ease-in-out infinite',
                    }}
                />

                {/* Icon Badge - Enhanced */}
                <div
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center mx-auto mb-10 transition-all duration-300 group hover:scale-105 hover:-translate-y-0.5"
                    style={{
                        background: themeVars.gradient,
                        boxShadow: themeVars.shadow,
                    }}
                >
                    <Icon
                        size={40}
                        strokeWidth={2}
                        className="transition-transform duration-300 group-hover:scale-110"
                        style={{ color: 'var(--color-accent-foreground)' }}
                    />
                </div>

                {/* Overline */}
                <p
                    className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-4"
                    style={{ color: themeVars.color }}
                >
                    Partiel 2024-2025
                </p>

                {/* Title - Uses Outfit Display Font */}
                <h1
                    className="text-display sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
                    style={{ color: 'var(--color-text-primary)' }}
                >
                    {title}
                </h1>

                {/* Description */}
                <p
                    className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
                    style={{ color: 'var(--color-text-secondary)' }}
                >
                    {description}
                </p>

                {/* Stats Pill - Enhanced */}
                <div
                    className="inline-flex flex-wrap justify-center items-center gap-4 text-sm px-7 py-4 rounded-full mb-12 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                        background: 'var(--color-card)',
                        border: '1px solid var(--color-border-default)',
                        boxShadow: 'var(--shadow-lg)',
                    }}
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="flex items-center gap-2.5">
                            <span
                                style={{ color: themeVars.color }}
                                className="font-bold text-base tabular-nums"
                            >
                                {stat.value}
                            </span>
                            <span style={{ color: 'var(--color-text-secondary)' }}>{stat.label}</span>
                            {index < stats.length - 1 && (
                                <span
                                    className="w-1.5 h-1.5 rounded-full ml-2"
                                    style={{ background: themeVars.color, opacity: 0.3 }}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Action Buttons - Enhanced */}
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                    {actions.map((action, index) => (
                        <Link
                            key={index}
                            to={action.path}
                            onMouseEnter={() => preloadRouteForPath(action.path)}
                            onFocus={() => preloadRouteForPath(action.path)}
                            className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full font-bold transition-all duration-300 no-underline relative overflow-hidden group hover:-translate-y-0.5"
                            style={action.variant === 'primary' ? {
                                background: themeVars.gradient,
                                color: 'var(--color-primary)',
                                boxShadow: themeVars.shadow,
                            } : action.variant === 'secondary' ? {
                                background: 'var(--color-card)',
                                color: 'var(--color-text-primary)',
                                border: '1px solid var(--color-border-default)',
                            } : {
                                background: 'transparent',
                                color: 'var(--color-text-secondary)',
                                border: '1px solid var(--color-border-default)',
                            }}
                        >
                            {action.icon && <action.icon size={20} />}
                            <span>{action.label}</span>
                            {action.variant === 'primary' && !action.icon && <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />}
                        </Link>
                    ))}
                </div>
            </header>

            {/* ===== CONTENT SECTIONS ===== */}
            {sections.map((section, idx) => (
                <section
                    key={idx}
                    className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16"
                >
                    {/* Section Header */}
                    {(section.title || section.badge) && (
                        <div className={section.badge ? "flex items-center gap-4 mb-10" : "text-center mb-10"}>
                            {section.badge && (
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg"
                                    style={{
                                        background: themeVars.gradient,
                                        boxShadow: themeVars.shadow,
                                        color: 'var(--color-accent-foreground)',
                                    }}
                                >
                                    {section.badge}
                                </div>
                            )}
                            <div className={section.badge ? "" : "w-full"}>
                                <h2
                                    className="text-h2 font-bold mb-1"
                                    style={{ color: 'var(--color-text-primary)' }}
                                >
                                    {section.title}
                                </h2>
                                {section.description && (
                                    <p style={{ color: 'var(--color-text-muted)' }}>{section.description}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Chapter Cards Grid - Enhanced */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {section.items.map((ch, chIdx) => (
                            <Link
                                key={ch.path}
                                to={ch.path}
                                onMouseEnter={() => preloadRouteForPath(ch.path)}
                                onFocus={() => preloadRouteForPath(ch.path)}
                                className="stagger-item group relative p-7 sm:p-9 rounded-3xl transition-all duration-300 no-underline overflow-hidden hover:-translate-y-1.5"
                                style={{
                                    background: 'var(--color-card)',
                                    border: '1px solid var(--color-border-default)',
                                    boxShadow: 'var(--shadow-md)',
                                    animationDelay: `${chIdx * 60}ms`,
                                }}
                            >
                                {/* Enhanced hover glow effect */}
                                <div
                                    className="absolute -top-12 -right-12 w-48 h-48 opacity-0 group-hover:opacity-30 blur-3xl transition-all duration-700 rounded-full pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle, ${themeVars.color} 0%, transparent 70%)`,
                                    }}
                                />

                                {/* Chapter number badge */}
                                <div className="flex items-center justify-between mb-4">
                                    <p
                                        className="text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200"
                                        style={{ color: 'var(--color-text-muted)' }}
                                    >
                                        Chapitre {ch.number}
                                    </p>
                                    <div
                                        className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150"
                                        style={{ background: themeVars.color, opacity: 0.4 }}
                                    />
                                </div>

                                <h3
                                    className="text-h4 font-bold mb-4 transition-all duration-200"
                                    style={{ color: 'var(--color-text-primary)' }}
                                >
                                    {ch.title}
                                </h3>

                                <p
                                    className="text-sm leading-relaxed pt-4 mt-auto border-t transition-colors duration-200"
                                    style={{
                                        color: 'var(--color-text-secondary)',
                                        borderColor: 'var(--color-border-subtle)',
                                    }}
                                >
                                    {ch.desc}
                                </p>

                                {/* Subtle arrow indicator on hover */}
                                <div
                                    className="absolute bottom-7 right-7 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                                    style={{ color: themeVars.color }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            ))}

            {/* ===== EXTRAS SECTION - Enhanced ===== */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
                <div
                    className="rounded-[2.5rem] p-10 sm:p-14"
                    style={{
                        background: 'var(--color-panel)',
                        border: '1px solid var(--color-border-default)',
                        boxShadow: 'var(--shadow-xl)',
                    }}
                >
                    <h2
                        className="text-h2 font-bold mb-12 text-center"
                        style={{ color: 'var(--color-text-primary)' }}
                    >
                        {extras.title}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {extras.items.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onMouseEnter={() => preloadRouteForPath(item.path)}
                                onFocus={() => preloadRouteForPath(item.path)}
                                className="group p-6 rounded-2xl flex flex-col items-center text-center gap-5 transition-all duration-300 no-underline relative overflow-hidden hover:-translate-y-0.5"
                                style={{
                                    background: 'var(--color-card)',
                                    border: '1px solid var(--color-border-default)',
                                }}
                            >
                                {/* Subtle glow on hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: themeVars.gradient }}
                                />

                                <div
                                    className="w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                                    style={{
                                        background: themeVars.gradient,
                                        boxShadow: themeVars.shadow,
                                    }}
                                >
                                    <item.icon size={26} style={{ color: 'var(--color-accent-foreground)' }} />
                                </div>
                                <div>
                                    <h3
                                        className="text-base font-bold mb-2"
                                        style={{ color: 'var(--color-text-primary)' }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        className="text-xs leading-relaxed"
                                        style={{ color: 'var(--color-text-muted)' }}
                                    >
                                        {item.desc}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FINAL CTA ===== */}
            {finalCta && (
                <section className="text-center py-12 sm:py-20 px-4">
                    <Link
                        to={finalCta.path}
                        onMouseEnter={() => preloadRouteForPath(finalCta.path)}
                        onFocus={() => preloadRouteForPath(finalCta.path)}
                        className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg transition-all duration-200 no-underline hover:-translate-y-0.5"
                        style={{
                            background: themeVars.gradient,
                            boxShadow: themeVars.shadow,
                            color: 'var(--color-primary)',
                        }}
                    >
                        {finalCta.icon && <finalCta.icon size={22} />}
                        {finalCta.label}
                        <ArrowRight size={22} />
                    </Link>
                </section>
            )}
        </div>
    );
}
