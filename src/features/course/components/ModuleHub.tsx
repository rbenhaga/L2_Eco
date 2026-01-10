import { Link } from 'react-router-dom';
import { ArrowRight, type LucideIcon } from 'lucide-react';

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
    themeColor?: string;
}

export function ModuleHub({
    title,
    description,
    icon: Icon,
    stats,
    actions,
    sections,
    extras,
    finalCta
}: ModuleHubProps) {

    const getButtonClass = (variant: string) => {
        switch (variant) {
            case 'primary':
                return 'bg-accent text-accent-foreground shadow-sm hover:bg-accent/90';
            case 'secondary':
                return 'bg-card text-foreground border border-border hover:bg-muted/50';
            case 'outline':
                return 'bg-transparent text-foreground border border-border hover:bg-card';
            default:
                return 'bg-accent text-accent-foreground';
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Compact Header */}
            <header className="mb-8">
                <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-linear-to-br from-accent to-accent/80 text-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                        <Icon size={24} strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            {title}
                        </h1>
                        <p className="text-sm text-muted-foreground max-w-2xl">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Stats Inline */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <span className="text-lg font-semibold text-accent">{stat.value}</span>
                            <span className="text-sm text-muted-foreground">{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                    {actions.map((action, index) => (
                        <Link
                            key={index}
                            to={action.path}
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all no-underline active:scale-[0.98] ${getButtonClass(action.variant)}`}
                        >
                            {action.icon && <action.icon size={18} />}
                            {action.label}
                        </Link>
                    ))}
                </div>
            </header>

            {/* Sections */}
            {sections.map((section, idx) => (
                <section key={idx} className="mb-8">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-foreground mb-1">
                            {section.title}
                        </h2>
                        {section.description && (
                            <p className="text-sm text-muted-foreground">
                                {section.description}
                            </p>
                        )}
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {section.items.map((ch) => (
                            <Link
                                key={ch.path}
                                to={ch.path}
                                className="group p-5 rounded-xl border border-border bg-card hover:border-accent/20 hover:shadow-sm transition-all no-underline"
                            >
                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                    Chapitre {ch.number}
                                </p>
                                <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
                                    {ch.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {ch.desc}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            ))}

            {/* Extras */}
            <section className="mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                    {extras.title}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {extras.items.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="p-4 rounded-xl bg-card border border-border hover:border-accent/20 hover:shadow-sm transition-all no-underline group flex flex-col items-center text-center gap-2"
                        >
                            <div className="w-10 h-10 bg-linear-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                                <item.icon size={18} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-foreground mb-0.5">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    {item.desc}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            {finalCta && (
                <section className="text-center py-8">
                    <Link
                        to={finalCta.path}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-all no-underline shadow-sm"
                    >
                        {finalCta.icon && <finalCta.icon size={20} />}
                        {finalCta.label}
                        <ArrowRight size={20} />
                    </Link>
                </section>
            )}
        </div>
    );
}
