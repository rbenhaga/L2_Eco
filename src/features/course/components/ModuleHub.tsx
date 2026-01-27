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
    badgeColor?: string; // e.g. "bg-blue-500"
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
    themeColor?: string; // e.g. "emerald", "violet".
}

export function ModuleHub({
    title,
    description,
    icon: Icon,
    stats,
    actions,
    sections,
    extras,
    finalCta,
    themeColor = 'blue'
}: ModuleHubProps) {

    // Helper for dynamic colors (lighter for dark mode)
    const getThemeGradient = () => {
        switch (themeColor) {
            case 'emerald': return 'from-emerald-400 to-teal-500';
            case 'violet': return 'from-violet-400 to-purple-500';
            case 'green': return 'from-green-400 to-emerald-500';
            case 'amber': return 'from-amber-400 to-orange-500';
            default: return 'from-blue-400 to-indigo-500';
        }
    };

    const getHoverTextClass = () => {
        switch (themeColor) {
            case 'emerald': return 'group-hover:text-emerald-600';
            case 'violet': return 'group-hover:text-violet-600';
            case 'green': return 'group-hover:text-green-600';
            case 'amber': return 'group-hover:text-amber-600';
            default: return 'group-hover:text-blue-600';
        }
    };

    const getHoverBorderClass = () => {
        switch (themeColor) {
            case 'emerald': return 'hover:border-emerald-500/50';
            case 'violet': return 'hover:border-violet-500/50';
            case 'green': return 'hover:border-green-500/50';
            case 'amber': return 'hover:border-amber-500/50';
            default: return 'hover:border-blue-500/50';
        }
    };

    const getButtonClass = (variant: string) => {
        switch (variant) {
            case 'primary':
                // Gradient background based on theme
                const gradient = getThemeGradient();
                return `bg-linear-to-r ${gradient} text-white shadow-lg hover:shadow-${themeColor}-500/20 hover:scale-[1.02] border-none`;
            case 'secondary':
                return 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50';
            case 'outline':
                return 'bg-transparent text-slate-700 border border-slate-300 hover:bg-slate-100';
            default:
                return 'bg-slate-800 text-white';
        }
    };

    return (
        <div className="animate-in fade-in duration-700">
            <header className="pt-8 sm:pt-16 pb-12 sm:pb-20 text-center px-4 sm:px-6 relative">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br ${getThemeGradient()} text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-${themeColor}-500/20 ring-4 ring-white/10`}>
                    <Icon size={32} strokeWidth={2} />
                </div>

                <p className={`text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-4 text-${themeColor === 'default' ? 'indigo' : themeColor}-500 === 'default' ? 'indigo' : themeColor}-400`}>
                    Partiel 2024-2025
                </p>

                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
                    {title}
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12 font-medium">
                    {description}
                </p>

                <div className="inline-flex flex-wrap justify-center items-center gap-3 text-xs sm:text-sm text-slate-600 mb-8 sm:mb-12 bg-white/60 backdrop-blur-md px-6 py-3 rounded-full border border-slate-200 shadow-sm">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <span className="text-slate-900 font-semibold"><span className={`text-${themeColor === 'default' ? 'blue' : themeColor}-500 === 'default' ? 'blue' : themeColor}-400`}>{stat.value}</span> {stat.label}</span>
                            {index < stats.length - 1 && <span className="w-1 h-1 rounded-full bg-slate-300" />}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                    {actions.map((action, index) => (
                        <Link
                            key={index}
                            to={action.path}
                            className={`inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-full font-bold transition-all no-underline active:scale-[0.98] ${getButtonClass(action.variant)}`}
                        >
                            {action.icon && <action.icon size={18} />}
                            {action.label}
                            {action.variant === 'primary' && !action.icon && <ArrowRight size={18} />}
                        </Link>
                    ))}
                </div>
            </header>

            {sections.map((section, idx) => (
                <section key={idx} className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                    {(section.title || section.badge) && (
                        <div className={section.badge ? "flex items-center gap-4 mb-8" : "text-center mb-8"}>
                            {section.badge && (
                                <div className={`w-12 h-12 ${section.badgeColor || `bg-linear-to-br ${getThemeGradient()}`} text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg`}>
                                    {section.badge}
                                </div>
                            )}
                            <div className={section.badge ? "" : "text-center w-full"}>
                                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">{section.title}</h2>
                                {section.description && <p className="text-sm text-slate-500">{section.description}</p>}
                            </div>
                        </div>
                    )}

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {section.items.map((ch) => (
                            <Link
                                key={ch.path}
                                to={ch.path}
                                className={`
                                    group relative p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white/60 backdrop-blur-md 
                                    hover:bg-white/80 ${getHoverBorderClass()} transition-all duration-300 no-underline 
                                    active:scale-[0.98] hover:-translate-y-1 hover:shadow-xl
                                `}
                            >
                                <div className={`absolute top-0 right-0 w-24 h-24  ${getThemeGradient()} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 rounded-full`} />

                                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Chapitre {ch.number}</p>
                                <h3 className={`text-xl font-bold text-slate-900 mb-3 transition-colors ${getHoverTextClass()}`}>
                                    {ch.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-200 pt-3 mt-auto">
                                    {ch.desc}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            ))}

            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
                <div className="relative p-1 bg-linear-to-br from-slate-200 to-transparent rounded-[2.5rem]">
                    <div className="bg-white/50 backdrop-blur-xl rounded-[2.3rem] p-8 sm:p-12 border border-slate-200">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">{extras.title}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-center">
                            {extras.items.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="p-4 sm:p-5 rounded-2xl bg-white/40 border border-slate-200 hover:border-slate-300 hover:bg-white/60 transition-all no-underline group flex flex-col items-center text-center gap-3 active:scale-[0.98]"
                                >
                                    <div className={`w-12 h-12 bg-linear-to-br ${getThemeGradient()} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-1`}>
                                        <item.icon size={22} className="text-white" />
                                    </div>
                                    <div className="w-full">
                                        <h3 className="text-base font-bold text-slate-900 mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-500 text-xs leading-tight">{item.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {finalCta && (
                <section className="text-center py-10 sm:py-16 px-4">
                    <Link
                        to={finalCta.path}
                        className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all no-underline text-base hover:scale-[1.02] shadow-xl ${getButtonClass('primary')}`}
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
