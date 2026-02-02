import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Zap, BookOpen, ArrowRight, Mail, Bell, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect, useRef } from 'react';

const APP_NAME = "Οἰκονομία";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const ONBOARDING_STORAGE_KEY = 'agora_onboarding_completed';

export function LoginPage() {
    const { signInWithGoogle, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [checkingOnboarding, setCheckingOnboarding] = useState(false);
    const [preferences, setPreferences] = useState({
        newContent: true,
        spacedRepetition: true,
    });
    const hasCheckedOnboarding = useRef(false);

    const from = (location.state as { from?: Location })?.from?.pathname || '/macro';

    useEffect(() => {
        if (user && !hasCheckedOnboarding.current) {
            hasCheckedOnboarding.current = true;
            checkOnboardingStatus();
        }
    }, [user]);

    const checkOnboardingStatus = async () => {
        if (!user) return;

        setCheckingOnboarding(true);

        const localOnboarding = localStorage.getItem(`${ONBOARDING_STORAGE_KEY}_${user.uid}`);
        if (localOnboarding === 'true') {
            navigate(from, { replace: true });
            return;
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);

            const response = await fetch(`${API_URL}/api/user/${user.uid}/onboarding`, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (response.ok) {
                const data = await response.json();
                if (data.completed) {
                    localStorage.setItem(`${ONBOARDING_STORAGE_KEY}_${user.uid}`, 'true');
                    navigate(from, { replace: true });
                } else {
                    setShowOnboarding(true);
                }
            } else {
                setShowOnboarding(true);
            }
        } catch (err) {
            console.error('Failed to check onboarding:', err);
            navigate(from, { replace: true });
        } finally {
            setCheckingOnboarding(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError(null);

        try {
            await signInWithGoogle();
        } catch (err: unknown) {
            console.error('Login error:', err);
            const errorCode = (err as { code?: string })?.code;
            if (errorCode === 'auth/popup-closed-by-user') {
                setError('Connexion annulée. Réessayez quand vous êtes prêt.');
            } else if (errorCode === 'auth/popup-blocked') {
                setError('Popup bloquée. Autorisez les popups pour ce site.');
            } else if (errorCode === 'auth/network-request-failed') {
                setError('Erreur réseau. Vérifiez votre connexion internet.');
            } else {
                setError('Erreur lors de la connexion. Veuillez réessayer.');
            }
            setIsLoading(false);
        }
    };

    const handleCompleteOnboarding = async () => {
        if (!user) return;

        setIsLoading(true);
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);

            await Promise.all([
                fetch(`${API_URL}/api/user/${user.uid}/preferences`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(preferences),
                    signal: controller.signal
                }).catch(() => { }),

                fetch(`${API_URL}/api/user/${user.uid}/onboarding`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ completed: true }),
                    signal: controller.signal
                }).catch(() => { })
            ]);

            clearTimeout(timeoutId);
        } catch (err) {
            console.error('Failed to save preferences:', err);
        } finally {
            localStorage.setItem(`${ONBOARDING_STORAGE_KEY}_${user.uid}`, 'true');
            navigate(from, { replace: true });
        }
    };

    // Loading state
    if (checkingOnboarding) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg-base)' }}>
                <div className="text-center">
                    <div
                        className="animate-spin rounded-full h-10 w-10 border-2 border-t-transparent mx-auto mb-4"
                        style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }}
                    />
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Préparation de votre espace...</p>
                </div>
            </div>
        );
    }

    // Onboarding flow
    if (showOnboarding && user) {
        return (
            <div className="min-h-screen antialiased relative" data-theme="light" style={{ background: 'var(--color-bg-base)' }}>
                <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] -translate-y-1/3 opacity-50"
                        style={{ background: 'radial-gradient(ellipse, var(--color-accent-subtle), transparent 70%)' }}
                    />
                </div>

                <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6" style={{ zIndex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-lg"
                    >
                        <div
                            className="p-8 sm:p-10 rounded-2xl"
                            style={{
                                background: 'var(--color-bg-raised)',
                                boxShadow: 'var(--shadow-lg)',
                                border: '1px solid var(--color-border-default)'
                            }}
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                                    Bienvenue sur {APP_NAME} !
                                </h2>
                                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    Personnalisez vos notifications pour une expérience optimale
                                </p>
                            </div>

                            <div className="space-y-3 mb-8">
                                <label
                                    className="flex items-start gap-4 p-4 rounded-xl transition-all cursor-pointer"
                                    style={{
                                        border: '1px solid var(--color-border-default)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--color-accent)';
                                        e.currentTarget.style.background = 'var(--color-bg-overlay)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--color-border-default)';
                                        e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={preferences.newContent}
                                        onChange={(e) => setPreferences({ ...preferences, newContent: e.target.checked })}
                                        className="mt-0.5 h-5 w-5 rounded cursor-pointer accent-[var(--color-accent)]"
                                        style={{ accentColor: 'var(--color-accent)' }}
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Mail className="h-4 w-4" style={{ color: 'var(--color-text-secondary)' }} />
                                            <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Nouveaux contenus</span>
                                        </div>
                                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                            Recevez un email lorsque de nouveaux cours, fiches ou QCM sont ajoutés
                                        </p>
                                    </div>
                                </label>

                                <label
                                    className="flex items-start gap-4 p-4 rounded-xl transition-all cursor-pointer"
                                    style={{
                                        border: '1px solid var(--color-border-default)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--color-accent)';
                                        e.currentTarget.style.background = 'var(--color-bg-overlay)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--color-border-default)';
                                        e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={preferences.spacedRepetition}
                                        onChange={(e) => setPreferences({ ...preferences, spacedRepetition: e.target.checked })}
                                        className="mt-0.5 h-5 w-5 rounded cursor-pointer"
                                        style={{ accentColor: 'var(--color-accent)' }}
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Bell className="h-4 w-4" style={{ color: 'var(--color-text-secondary)' }} />
                                            <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Rappels de révision</span>
                                        </div>
                                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                            Notifications intelligentes basées sur la répétition espacée pour maximiser la mémorisation
                                        </p>
                                    </div>
                                </label>
                            </div>

                            <button
                                onClick={handleCompleteOnboarding}
                                disabled={isLoading}
                                className="w-full h-12 sm:h-14 rounded-xl font-semibold text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                style={{ background: 'var(--color-accent)' }}
                                onMouseEnter={(e) => !isLoading && (e.currentTarget.style.filter = 'brightness(1.1)')}
                                onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                        <span>Chargement...</span>
                                    </>
                                ) : (
                                    'Commencer à réviser'
                                )}
                            </button>

                            <p className="mt-4 text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                Vous pourrez modifier ces préférences à tout moment dans les paramètres
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    // Main login view
    return (
        <div className="min-h-screen antialiased relative" data-theme="light" style={{ background: 'var(--color-bg-base)' }}>
            <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] -translate-y-1/3 opacity-50"
                    style={{ background: 'radial-gradient(ellipse, var(--color-accent-subtle), transparent 70%)' }}
                />
            </div>

            <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6" style={{ zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    {/* Logo + Brand */}
                    <div className="text-center mb-10 sm:mb-12">
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="inline-flex flex-col items-center"
                        >
                            <GraduationCap className="h-14 w-14 sm:h-16 sm:w-16 mb-4" style={{ color: 'var(--color-accent)' }} />
                            <h1
                                className="text-3xl sm:text-4xl font-bold tracking-tight mb-2"
                                style={{
                                    background: 'linear-gradient(to right, var(--color-accent), var(--color-micro))',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}
                            >
                                {APP_NAME}
                            </h1>
                            <p className="text-sm sm:text-base" style={{ color: 'var(--color-text-secondary)' }}>
                                Plateforme de révision · L2 Économie
                            </p>
                        </motion.div>
                    </div>

                    {/* Login Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="p-8 sm:p-10 rounded-2xl"
                        style={{
                            background: 'var(--color-bg-raised)',
                            boxShadow: 'var(--shadow-lg)',
                            border: '1px solid var(--color-border-default)'
                        }}
                    >
                        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-center" style={{ color: 'var(--color-text-primary)' }}>
                            Connexion requise
                        </h2>
                        <p className="text-sm text-center mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                            Accédez à tous vos cours et ressources
                        </p>

                        {/* Features list */}
                        <div className="space-y-3 mb-8">
                            {[
                                { icon: BookOpen, title: "Accès complet", desc: "Cours, fiches, QCM et annales pour toutes les matières", color: 'var(--color-accent)' },
                                { icon: Zap, title: "Progression sauvegardée", desc: "Synchronisée en temps réel sur tous vos appareils", color: 'var(--color-micro)' },
                                { icon: Shield, title: "100% sécurisé", desc: "Authentification Google · Aucun mot de passe requis", color: 'var(--color-stats)' },
                            ].map(({ icon: Icon, title, desc, color }) => (
                                <div
                                    key={title}
                                    className="flex items-start gap-3 p-3 rounded-lg transition-colors"
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-overlay)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    <div
                                        className="shrink-0 h-10 w-10 rounded-xl flex items-center justify-center mt-0.5"
                                        style={{ background: `color-mix(in srgb, ${color} 10%, transparent)` }}
                                    >
                                        <Icon className="h-5 w-5" style={{ color }} />
                                    </div>
                                    <div className="flex-1 pt-1.5">
                                        <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--color-text-primary)' }}>{title}</p>
                                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Error message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 rounded-xl"
                                style={{
                                    background: 'color-mix(in srgb, var(--color-error) 10%, transparent)',
                                    border: '1px solid color-mix(in srgb, var(--color-error) 30%, transparent)'
                                }}
                            >
                                <p className="text-sm font-medium" style={{ color: 'var(--color-error)' }}>{error}</p>
                            </motion.div>
                        )}

                        {/* Google Sign In Button */}
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-3 h-12 sm:h-14 px-6 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                background: 'var(--color-bg-raised)',
                                color: 'var(--color-text-primary)',
                                border: '2px solid var(--color-border-default)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-accent)';
                                e.currentTarget.style.background = 'var(--color-bg-overlay)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--color-border-default)';
                                e.currentTarget.style.background = 'var(--color-bg-raised)';
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <div
                                        className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent"
                                        style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }}
                                    />
                                    <span>Connexion en cours...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    <span>Continuer avec Google</span>
                                </>
                            )}
                        </button>

                        <p className="mt-6 text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            En vous connectant, vous acceptez nos{' '}
                            <button className="underline transition-colors" style={{ color: 'var(--color-accent)' }}>
                                conditions d'utilisation
                            </button>
                        </p>
                    </motion.div>

                    {/* Back to home link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 text-center"
                    >
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center gap-2 text-sm font-medium transition-colors group"
                            style={{ color: 'var(--color-text-secondary)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                        >
                            <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                            Retour à l'accueil
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
