import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, FileText, LogOut, User as UserIcon, GraduationCap, Sparkles, Menu, X, BookOpen } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { ThemeToggle } from "../ThemeToggle";

const SITE_NAME = "Οἰκονομία";

const dropdownAnimation = {
    initial: { opacity: 0, y: -8, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -8, scale: 0.96 },
    transition: { duration: 0.15, ease: [0.33, 1, 0.68, 1] as const }
};

/**
 * Header — Design Contract v3 compliant
 * - CSS custom properties only (no hardcoded colors)
 * - Glass effect with semi-transparent background
 * - Mobile hamburger menu
 * - Accessible focus states
 */
export function Header() {
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { user, loading, signOut } = useAuth();

    // Detect if we're in the app shell (not on public pages)
    const isInApp = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/pricing';

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setIsNotifOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        }
        if (isNotifOpen || isUserMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isNotifOpen, isUserMenuOpen]);

    // Close on Escape
    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsNotifOpen(false);
                setIsUserMenuOpen(false);
                setIsMobileMenuOpen(false);
            }
        }
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    const handleLogout = async () => {
        await signOut();
        setIsUserMenuOpen(false);
        navigate('/');
    };

    const notifications = [
        { id: 1, subject: "Microéconomie", chapter: "Ch. 3 — Équilibre du consommateur", time: "Il y a 2h", subjectKey: 'micro' as const },
        { id: 2, subject: "Macroéconomie", chapter: "Ch. 5 — Le modèle IS-LM", time: "Il y a 5h", subjectKey: 'macro' as const },
        { id: 3, subject: "Statistiques", chapter: "Ch. 2 — Lois de probabilité", time: "Hier", subjectKey: 'stats' as const },
    ];

    const subjectColors: Record<'macro' | 'micro' | 'stats' | 'socio', string> = {
        macro: 'var(--color-macro)',
        micro: 'var(--color-micro)',
        stats: 'var(--color-stats)',
        socio: 'var(--color-socio)',
    };

    return (
        <header
            className="sticky top-0 z-40 border-b glass-premium"
            style={{
                borderColor: 'var(--glass-border)',
            }}
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="flex h-14 items-center justify-between">
                    {/* Logo & Navigation */}
                    <div className="flex items-center gap-4 sm:gap-8">
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2 transition-opacity duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg"
                            style={{ color: 'var(--color-accent)' }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = "0.8"}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                        >
                            <GraduationCap className="h-7 w-7" />
                            <span className="text-base font-semibold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                                {SITE_NAME}
                            </span>
                        </button>

                        <nav className="hidden sm:flex items-center gap-1">
                            {[
                                { label: 'Programme', href: '/#programme' },
                                { label: 'Tarifs', href: '/pricing' },
                            ].map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium px-3 py-1.5 rounded-lg transition-colors duration-150"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = 'var(--color-text-primary)';
                                        e.currentTarget.style.background = 'var(--color-bg-overlay)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                                        e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5">
                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* My Courses Button - only when logged in */}
                        {user && (
                            <button
                                type="button"
                                onClick={() => navigate('/macro')}
                                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150"
                                style={{ 
                                    color: 'var(--color-text-secondary)',
                                    border: '1px solid var(--color-border-default)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--color-bg-overlay)';
                                    e.currentTarget.style.color = 'var(--color-text-primary)';
                                    e.currentTarget.style.borderColor = 'var(--color-border-strong)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                                    e.currentTarget.style.borderColor = 'var(--color-border-default)';
                                }}
                            >
                                <BookOpen className="h-4 w-4" />
                                Mes cours
                            </button>
                        )}

                        {/* Notification Bell — only in app */}
                        {isInApp && (
                            <div className="relative" ref={notifRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsNotifOpen(!isNotifOpen)}
                                    className="relative p-2 rounded-lg transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-overlay)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    aria-label="Notifications"
                                    aria-expanded={isNotifOpen}
                                    aria-haspopup="true"
                                >
                                    <Bell className="h-5 w-5" />
                                    {notifications.length > 0 && (
                                        <span
                                            className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full"
                                            style={{ background: 'var(--color-accent)' }}
                                        />
                                    )}
                                </button>

                                {/* Notifications Dropdown */}
                                <AnimatePresence>
                                    {isNotifOpen && (
                                        <motion.div
                                            {...dropdownAnimation}
                                            className="fixed sm:absolute top-14 sm:top-full inset-x-4 sm:inset-x-auto sm:right-0 mt-2 w-auto sm:w-80 max-w-sm rounded-xl overflow-hidden"
                                            style={{
                                                background: 'var(--color-bg-raised)',
                                                boxShadow: 'var(--shadow-lg)',
                                                border: '1px solid var(--color-border-default)'
                                            }}
                                            role="menu"
                                        >
                                            <div className="p-3 border-b" style={{ borderColor: 'var(--color-border-default)' }}>
                                                <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                                    Nouveautés
                                                </h3>
                                            </div>
                                            <div className="max-h-80 overflow-y-auto">
                                                {notifications.map((notif) => (
                                                    <a
                                                        key={notif.id}
                                                        href="#"
                                                        className="block p-3 transition-colors duration-150 border-b last:border-0"
                                                        style={{ borderColor: 'var(--color-border-default)' }}
                                                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-overlay)'}
                                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                                        onClick={() => setIsNotifOpen(false)}
                                                        role="menuitem"
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <div
                                                                className="h-8 w-8 shrink-0 rounded-lg flex items-center justify-center"
                                                                style={{
                                                                    backgroundColor: `color-mix(in srgb, ${subjectColors[notif.subjectKey]} 10%, transparent)`,
                                                                    color: subjectColors[notif.subjectKey]
                                                                }}
                                                            >
                                                                <FileText className="h-4 w-4" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs font-medium" style={{ color: subjectColors[notif.subjectKey] }}>
                                                                    {notif.subject}
                                                                </p>
                                                                <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--color-text-primary)' }}>
                                                                    {notif.chapter}
                                                                </p>
                                                                <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                                                                    {notif.time}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* User Menu or Login */}
                        {loading ? (
                            // Loading skeleton - avoid flash
                            <div 
                                className="h-8 w-8 rounded-full animate-pulse"
                                style={{ background: 'var(--color-bg-overlay)' }}
                            />
                        ) : user ? (
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 p-1.5 rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-overlay)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    aria-label="Menu utilisateur"
                                    aria-expanded={isUserMenuOpen}
                                    aria-haspopup="true"
                                >
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName || 'User'}
                                            referrerPolicy="no-referrer"
                                            className="h-8 w-8 rounded-full border-2"
                                            style={{ borderColor: 'color-mix(in srgb, var(--color-accent) 20%, transparent)' }}
                                        />
                                    ) : (
                                        <div
                                            className="h-8 w-8 rounded-full flex items-center justify-center border-2"
                                            style={{
                                                background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
                                                borderColor: 'color-mix(in srgb, var(--color-accent) 20%, transparent)'
                                            }}
                                        >
                                            <UserIcon className="h-4 w-4" style={{ color: 'var(--color-accent)' }} />
                                        </div>
                                    )}
                                </button>

                                {/* User Dropdown */}
                                <AnimatePresence>
                                    {isUserMenuOpen && (
                                        <motion.div
                                            {...dropdownAnimation}
                                            className="absolute top-full right-0 mt-2 w-56 rounded-xl overflow-hidden"
                                            style={{
                                                background: 'var(--color-bg-raised)',
                                                boxShadow: 'var(--shadow-lg)',
                                                border: '1px solid var(--color-border-default)'
                                            }}
                                            role="menu"
                                        >
                                            <button
                                                onClick={() => {
                                                    setIsUserMenuOpen(false);
                                                    navigate(user.subscriptionTier === 'premium' ? '/subscription' : '/pricing');
                                                }}
                                                className="w-full p-3 border-b transition-colors duration-150 text-left group"
                                                style={{ borderColor: 'var(--color-border-default)' }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-overlay)'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                                role="menuitem"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>
                                                            {user.displayName}
                                                        </p>
                                                        <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
                                                            {user.email}
                                                        </p>
                                                    </div>
                                                    <span
                                                        className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                                                        style={{
                                                            background: 'var(--color-bg-overlay)',
                                                            color: 'var(--color-text-secondary)'
                                                        }}
                                                    >
                                                        FREE
                                                    </span>
                                                </div>
                                            </button>
                                            <div className="p-2 space-y-1">
                                                {user.subscriptionTier !== 'premium' && (
                                                    <a
                                                        href="/pricing"
                                                        className="w-full py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center justify-center gap-2"
                                                        style={{
                                                            background: 'linear-gradient(to right, var(--color-accent), var(--color-micro))',
                                                            color: 'var(--color-accent-foreground)'
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
                                                        onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}
                                                        role="menuitem"
                                                    >
                                                        <Sparkles className="h-3.5 w-3.5" />
                                                        Passer à Premium
                                                    </a>
                                                )}
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-150"
                                                    style={{ color: 'var(--color-text-secondary)' }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background = 'var(--color-bg-overlay)';
                                                        e.currentTarget.style.color = 'var(--color-text-primary)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = 'transparent';
                                                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                                                    }}
                                                    role="menuitem"
                                                >
                                                    <LogOut className="h-4 w-4" />
                                                    Déconnexion
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="text-sm font-medium px-4 py-2 rounded-lg active:scale-[0.98] transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                style={{
                                    background: 'var(--color-accent)',
                                    color: 'var(--color-accent-foreground)',
                                    boxShadow: 'var(--shadow-sm)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-accent-hover)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-accent)'}
                            >
                                Connexion
                            </button>
                        )}

                        {/* Mobile hamburger — only on public pages */}
                        {!isInApp && (
                            <button
                                type="button"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="sm:hidden p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                                style={{ color: 'var(--color-text-secondary)' }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-overlay)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                                aria-expanded={isMobileMenuOpen}
                            >
                                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        className="sm:hidden overflow-hidden border-t"
                        style={{
                            borderColor: 'var(--color-border-default)',
                            background: 'var(--color-bg-raised)',
                        }}
                    >
                        <nav className="px-4 py-3 space-y-1">
                            {[
                                { label: 'Programme', href: '/#programme' },
                                { label: 'Tarifs', href: '/pricing' },
                            ].map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="block text-sm font-medium px-3 py-2.5 rounded-lg transition-colors"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--color-bg-overlay)';
                                        e.currentTarget.style.color = 'var(--color-text-primary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = 'var(--color-text-secondary)';
                                    }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
