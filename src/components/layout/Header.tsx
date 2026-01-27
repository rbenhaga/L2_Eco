import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, FileText, LogOut, User as UserIcon, GraduationCap } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const SITE_NAME = "Οἰκονομία";

export function Header() {
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { user, signOut } = useAuth();

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

    const handleLogout = async () => {
        await signOut();
        setIsUserMenuOpen(false);
        navigate('/');
    };

    const notifications = [
        { id: 1, subject: "Microéconomie", chapter: "Ch. 3 — Équilibre du consumer", time: "Il y a 2h" },
        { id: 2, subject: "Macroéconomie", chapter: "Ch. 5 — Le modèle IS-LM", time: "Il y a 5h" },
        { id: 3, subject: "Statistiques", chapter: "Ch. 2 — Lois de probabilité", time: "Hier" },
    ];

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl backdrop-saturate-150 border-b border-slate-200 bg-white/85">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="flex h-14 sm:h-16 items-center justify-between">
                    <div className="flex items-center gap-4 sm:gap-8">
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                        >
                            <GraduationCap className="h-7 w-7 sm:h-8 sm:w-8 text-accent" />
                            <span className="text-base sm:text-lg font-semibold tracking-tight text-slate-900">{SITE_NAME}</span>
                        </button>
                        <nav className="hidden sm:flex items-center gap-6">
                            <a href="/#programme" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                                Programme
                            </a>
                            <a href="/pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                                Tarifs
                            </a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Notification bell with dropdown */}
                        <div className="relative" ref={notifRef}>
                            <button
                                type="button"
                                onClick={() => setIsNotifOpen(!isNotifOpen)}
                                className="relative p-2 rounded-lg transition-colors hover:bg-slate-100"
                                aria-label="Notifications"
                            >
                                <Bell className="h-5 w-5 text-slate-600" />
                                {/* Badge */}
                                <span className="absolute top-1 right-1 h-4 w-4 flex items-center justify-center text-[10px] font-semibold text-white rounded-full bg-accent">
                                    {notifications.length}
                                </span>
                            </button>

                            {/* Dropdown */}
                            <AnimatePresence>
                                {isNotifOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.15 }}
                                        className="fixed sm:absolute top-16 sm:top-full inset-x-4 sm:inset-x-auto sm:right-0 mt-2 w-auto sm:w-80 max-w-sm rounded-xl bg-white shadow-lg border border-slate-200 overflow-hidden"
                                    >
                                        <div className="p-3 border-b border-slate-200">
                                            <h3 className="text-sm font-semibold text-slate-900">Nouveautés</h3>
                                        </div>
                                        <div className="max-h-80 overflow-y-auto">
                                            {notifications.map((notif) => (
                                                <a
                                                    key={notif.id}
                                                    href="#"
                                                    className="block p-3 hover:bg-slate-50 transition-colors border-b border-slate-200 last:border-0"
                                                    onClick={() => setIsNotifOpen(false)}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="h-8 w-8 shrink-0 rounded-lg flex items-center justify-center bg-accent-soft text-accent">
                                                            <FileText className="h-4 w-4" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs font-medium text-accent">{notif.subject}</p>
                                                            <p className="text-sm font-medium mt-0.5 text-slate-900">{notif.chapter}</p>
                                                            <p className="text-xs mt-1 text-slate-500">{notif.time}</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                        <div className="p-2 border-t border-slate-200">
                                            <a
                                                href="#"
                                                className="block text-center text-sm font-medium py-2 rounded-lg hover:bg-slate-50 transition-colors text-blue-600"
                                            >
                                                Voir tout
                                            </a>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* User menu or Login button */}
                        {user ? (
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 p-1.5 rounded-lg transition-all hover:bg-slate-100 hover:ring-2 hover:ring-blue-600/20"
                                    aria-label="Menu utilisateur"
                                >
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName || 'User'}
                                            referrerPolicy="no-referrer"
                                            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border-2 border-blue-600/20"
                                        />
                                    ) : (
                                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-600/20">
                                            <UserIcon className="h-4 w-4 text-blue-600" />
                                        </div>
                                    )}
                                </button>

                                {/* User Dropdown */}
                                <AnimatePresence>
                                    {isUserMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute top-full right-0 mt-2 w-56 rounded-xl bg-white shadow-lg border border-slate-200 overflow-hidden"
                                        >
                                            <button
                                                onClick={() => {
                                                    setIsUserMenuOpen(false);
                                                    navigate('/subscription');
                                                }}
                                                className="w-full p-3 border-b border-slate-200 hover:bg-slate-50 transition-colors text-left group"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-semibold truncate text-slate-900 group-hover:text-blue-600 transition-colors">{user.displayName}</p>
                                                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                                    </div>
                                                    <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                        FREE
                                                    </span>
                                                </div>
                                            </button>
                                            <div className="p-2 space-y-1">
                                                {user.subscriptionTier !== 'premium' && (
                                                    <a
                                                        href="/pricing"
                                                        className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all block text-center"
                                                    >
                                                        Passer à Premium
                                                    </a>
                                                )}
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors"
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
                                className="text-sm font-medium px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                            >
                                Connexion
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
