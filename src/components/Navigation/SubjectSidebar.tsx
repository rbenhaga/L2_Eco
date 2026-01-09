import { BookOpen, CheckSquare, FileCheck, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface NavGroup {
    title: string;
    icon: LucideIcon;
    items: { to: string; label: string }[];
    defaultOpen?: boolean;
}

interface SubjectSidebarProps {
    subject: 'macro' | 'micro' | 'stats' | 'socio';
}

const subjectConfig = {
    macro: {
        name: 'Macroéconomie',
        gradient: 'from-blue-500 to-indigo-600',
        color: 'blue',
        groups: [
            {
                title: 'Cours',
                icon: BookOpen,
                defaultOpen: true,
                items: [
                    { to: '/macro/chapitre-1', label: 'Ch1: IS-LM' },
                    { to: '/macro/chapitre-2', label: 'Ch2: Marché du Travail' },
                    { to: '/macro/chapitre-3', label: 'Ch3: AS-AD' },
                    { to: '/macro/chapitre-4', label: 'Ch4: Phillips' }
                ]
            },
            {
                title: "S'entraîner",
                icon: CheckSquare,
                items: [
                    { to: '/macro/qcm', label: 'QCM' },
                    { to: '/macro/exercices', label: 'TD & Exercices' },
                    { to: '/macro/simulations', label: 'Simulations' }
                ]
            },
            {
                title: 'Révisions',
                icon: FileCheck,
                items: [
                    { to: '/macro/revision', label: 'Fiche de synthèse' },
                    { to: '/macro/revision-ch1', label: 'Fiche Ch1' },
                    { to: '/macro/revision-ch2', label: 'Fiche Ch2' },
                    { to: '/macro/revision-ch3', label: 'Fiche Ch3' },
                    { to: '/macro/revision-ch4', label: 'Fiche Ch4' }
                ]
            }
        ]
    },
    micro: {
        name: 'Microéconomie',
        gradient: 'from-emerald-500 to-teal-600',
        color: 'emerald',
        groups: [
            {
                title: 'Cours',
                icon: BookOpen,
                defaultOpen: true,
                items: [
                    { to: '/micro/chapitre-1', label: 'Ch1: Consommateur' },
                    { to: '/micro/chapitre-2', label: 'Ch2: Producteur' },
                    { to: '/micro/chapitre-3', label: 'Ch3: Équilibre' }
                ]
            },
            {
                title: "S'entraîner",
                icon: CheckSquare,
                items: [
                    { to: '/micro/qcm', label: 'QCM' },
                    { to: '/micro/exercices', label: 'TD & Exercices' }
                ]
            }
        ]
    },
    stats: {
        name: 'Statistiques',
        gradient: 'from-cyan-500 to-blue-500',
        color: 'cyan',
        groups: [
            {
                title: 'Cours',
                icon: BookOpen,
                defaultOpen: true,
                items: [
                    { to: '/stats/chapitre-1', label: 'Ch1: Probabilités' },
                    { to: '/stats/chapitre-2', label: 'Ch2: Variables aléatoires' }
                ]
            },
            {
                title: "S'entraîner",
                icon: CheckSquare,
                items: [
                    { to: '/stats/qcm', label: 'QCM' },
                    { to: '/stats/td', label: 'TD' }
                ]
            }
        ]
    },
    socio: {
        name: 'Sociologie',
        gradient: 'from-violet-500 to-purple-600',
        color: 'violet',
        groups: [
            {
                title: 'Cours',
                icon: BookOpen,
                defaultOpen: true,
                items: [
                    { to: '/socio/chapitre-1', label: 'Ch1: Introduction' }
                ]
            },
            {
                title: "S'entraîner",
                icon: CheckSquare,
                items: [
                    { to: '/socio/qcm', label: 'QCM' },
                    { to: '/socio/revision-intensive', label: 'Révision Intensive' }
                ]
            }
        ]
    }
};

function NavGroupComponent({ group, isExpanded, onToggle }: {
    group: NavGroup;
    isExpanded: boolean;
    onToggle: () => void;
}) {
    const location = useLocation();
    const Icon = group.icon;

    return (
        <div className="mb-2">
            <button
                onClick={onToggle}
                className="flex items-center gap-2 w-full px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors rounded-md hover:bg-slate-100/60 dark:hover:bg-white/4"
            >
                <ChevronRight
                    className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                />
                <Icon className="w-3.5 h-3.5" />
                <span className="flex-1 text-left">{group.title}</span>
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                    {group.items.length}
                </span>
            </button>

            {isExpanded && (
                <div className="mt-1 ml-1 space-y-0.5">
                    {group.items.map((item) => {
                        const isActive = location.pathname === item.to;

                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`
                  block px-2.5 py-1.5 text-[13px] rounded-md transition-all no-underline
                  ${isActive
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium shadow-sm'
                                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-white/4 hover:text-slate-900 dark:hover:text-white'
                                    }
                `}
                            >
                                <div className="flex items-center gap-2">
                                    <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-white dark:bg-slate-900' : 'bg-slate-400 dark:bg-slate-600'}`} />
                                    {item.label}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

/**
 * SubjectSidebar - Premium context-aware navigation
 * 
 * Shows when user is within a subject, providing
 * quick access to all chapters, QCM, TD, etc.
 * Enhanced with modern Notion/Apple design language.
 */
export function SubjectSidebar({ subject }: SubjectSidebarProps) {
    const config = subjectConfig[subject];
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
        config.groups.reduce((acc, group) => ({
            ...acc,
            [group.title]: group.defaultOpen ?? false
        }), {})
    );

    const toggleGroup = (title: string) => {
        setExpandedGroups(prev => ({
            ...prev,
            [title]: !prev[title]
        }));
    };

    return (
        <aside className="
      fixed left-60 top-0 h-screen w-56
      bg-slate-50/95 dark:bg-slate-800/95 backdrop-blur-xl
      border-r border-slate-200/60 dark:border-white/8
      overflow-y-auto z-30
      shadow-sm
    ">
            <div className="p-3">
                {/* Subject Header */}
                <div className="mb-4 pb-3 border-b border-slate-200/60 dark:border-white/8">
                    <div className={`h-1 w-full rounded-full bg-linear-to-r ${config.gradient} mb-3`} />
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-white px-2">
                        {config.name}
                    </h2>
                </div>

                {/* Navigation Groups */}
                {config.groups.map((group) => (
                    <NavGroupComponent
                        key={group.title}
                        group={group}
                        isExpanded={expandedGroups[group.title]}
                        onToggle={() => toggleGroup(group.title)}
                    />
                ))}
            </div>
        </aside>
    );
}
