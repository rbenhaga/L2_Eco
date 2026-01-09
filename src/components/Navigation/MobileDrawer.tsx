import { X, Home, BookOpen, BarChart3, Users, TrendingUp, CheckSquare, FileCheck, PieChart, LogOut, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

// --- Config (Duplicated from AppSidebar for self-containment in this phase) ---
const navItems = [
    { to: '/', icon: Home, label: 'Accueil' },
    { to: '/macro', icon: TrendingUp, label: 'Macroéconomie', subject: 'macro' },
    { to: '/micro', icon: PieChart, label: 'Microéconomie', subject: 'micro' },
    { to: '/stats', icon: BarChart3, label: 'Statistiques', subject: 'stats' },
    { to: '/socio', icon: Users, label: 'Sociologie', subject: 'socio' }
];

const subjectConfig = {
    macro: {
        name: 'Macroéconomie',
        color: 'text-blue-600',
        groups: [
            {
                title: 'Cours',
                icon: BookOpen,
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
        color: 'text-emerald-600',
        groups: [
            {
                title: 'Cours',
                icon: BookOpen,
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
        color: 'text-cyan-600',
        groups: [
            {
                title: 'Cours',
                icon: BookOpen,
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
        color: 'text-violet-600',
        groups: [
            {
                title: 'Cours',
                icon: BookOpen,
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

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
    const location = useLocation();
    const { user, signOut } = useAuth();

    // Determine current subject
    const currentSubjectKey = (['macro', 'micro', 'stats', 'socio'] as const).find(k => location.pathname.startsWith(`/${k}`));
    const activeConfig = currentSubjectKey ? subjectConfig[currentSubjectKey] : null;

    // Close on Esc key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 z-50 animate-in fade-in duration-200 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-background z-50 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
                {/* Header */}
                <div className="h-14 flex items-center justify-between px-4 border-b border-border shrink-0">
                    <div className="flex items-center gap-2">
                        <Home className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">RevP2</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">

                    {/* Main Nav */}
                    <div>
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Menu
                        </h3>
                        <nav className="space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={onClose}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors no-underline",
                                        location.pathname === item.to
                                            ? "bg-primary/10 text-primary font-medium"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Subject Nav */}
                    {activeConfig && (
                        <div>
                            <h3 className={cn("text-xs font-semibold uppercase tracking-wider mb-2", activeConfig.color)}>
                                {activeConfig.name}
                            </h3>
                            <div className="space-y-4">
                                {activeConfig.groups.map(group => (
                                    <div key={group.title}>
                                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2 px-3">
                                            <group.icon className="w-3.5 h-3.5" />
                                            <span>{group.title}</span>
                                        </div>
                                        <div className="space-y-0.5 border-l-2 border-muted ml-3 pl-3">
                                            {group.items.map(item => (
                                                <Link
                                                    key={item.to}
                                                    to={item.to}
                                                    onClick={onClose}
                                                    className={cn(
                                                        "block py-1.5 text-sm transition-colors no-underline",
                                                        location.pathname === item.to
                                                            ? "text-foreground font-medium"
                                                            : "text-muted-foreground hover:text-foreground"
                                                    )}
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer User Section */}
                <div className="p-4 border-t border-border bg-muted/30 space-y-3 shrink-0">
                    {user ? (
                        <>
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                                    {user.photoURL ? <img src={user.photoURL} alt="" className="w-full h-full rounded-full" /> : <User className="w-5 h-5" />}
                                </div>
                                <div className="min-w-0">
                                    <p className="font-medium text-sm truncate">{user.displayName}</p>
                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => { signOut(); onClose(); }}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-background border border-border text-sm font-medium hover:bg-muted transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Se déconnecter
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            onClick={onClose}
                            className="flex w-full items-center justify-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity no-underline"
                        >
                            se connecter
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}
