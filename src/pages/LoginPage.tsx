import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, CheckCircle2, CreditCard, GraduationCap, Layers, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authFetch } from '../utils/authFetch';
import { createCheckoutSession } from '../services/api';

const APP_NAME = 'Oikonomia';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const ONBOARDING_STORAGE_KEY = 'agora_onboarding_completed';

const YEAR_OPTIONS = [
    { value: 'L1', title: 'L1', subtitle: 'Première annee' },
    { value: 'L2', title: 'L2', subtitle: 'Deuxième annee' },
    { value: 'L3', title: 'L3', subtitle: 'Troisième annee' },
] as const;

const SEMESTER_OPTIONS = [
    { value: 'S3', title: 'Semestre S3', subtitle: 'Fondations L2', detail: 'macro, micro, stats, socio' },
    { value: 'S4', title: 'Semestre S4', subtitle: 'Approfondissement L2', detail: 'macro, micro, stats, management' },
] as const;

type Step = 1 | 2 | 3;

interface OptionCardProps {
    title: string;
    subtitle: string;
    detail?: string;
    selected: boolean;
    onClick: () => void;
}

function OptionCard({ title, subtitle, detail, selected, onClick }: OptionCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="text-left p-4 rounded-2xl transition-all duration-200"
            style={{
                border: selected
                    ? '1px solid color-mix(in srgb, var(--color-accent) 65%, transparent)'
                    : '1px solid var(--color-border-default)',
                background: selected
                    ? 'linear-gradient(145deg, color-mix(in srgb, var(--color-accent) 14%, var(--color-bg-raised)), var(--color-bg-overlay))'
                    : 'linear-gradient(145deg, var(--color-bg-overlay), var(--color-bg-raised))',
                boxShadow: selected ? '0 8px 22px color-mix(in srgb, var(--color-accent) 18%, transparent)' : 'none',
            }}
        >
            <div>
                <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{title}</p>
                <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>{subtitle}</p>
            </div>
            {detail && <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>{detail}</p>}
        </button>
    );
}

export function LoginPage() {
    const { signInWithGoogle, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [isSigningIn, setIsSigningIn] = useState(false);
    const [isSavingOnboarding, setIsSavingOnboarding] = useState(false);
    const [checkoutLoadingPlan, setCheckoutLoadingPlan] = useState<'semester' | 'annual' | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [checkoutError, setCheckoutError] = useState<string | null>(null);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [checkingOnboarding, setCheckingOnboarding] = useState(false);
    const [step, setStep] = useState<Step>(1);
    const [selectedYear, setSelectedYear] = useState('L2');
    const [selectedSemester, setSelectedSemester] = useState('S4');

    const hasCheckedOnboarding = useRef(false);

    const fromState = (location.state as { from?: { pathname?: string } })?.from?.pathname;

    useEffect(() => {
        if (!user) {
            hasCheckedOnboarding.current = false;
            return;
        }

        if (!hasCheckedOnboarding.current) {
            hasCheckedOnboarding.current = true;
            resolveDefaultFromPath().then((path) => checkOnboardingStatus(path));
        }
    }, [user]);

    const resolveDefaultFromPath = async () => {
        if (!user) return '/s3/macro';
        if (fromState) return fromState;

        try {
            const local = localStorage.getItem(`last-nav-${user.uid}`);
            if (local) {
                const parsed = JSON.parse(local);
                if (typeof parsed?.path === 'string' && /^\/s[34]\/[a-z0-9-]+/i.test(parsed.path)) {
                    return parsed.path;
                }
            }
        } catch (_e) {
            // ignore
        }

        try {
            const response = await authFetch(`${API_URL}/api/user/${user.uid}/navigation`);
            if (response.ok) {
                const data = await response.json();
                if (typeof data?.lastPath === 'string' && /^\/s[34]\/[a-z0-9-]+/i.test(data.lastPath)) {
                    return data.lastPath;
                }
                const semester = String(data?.semester || '').toLowerCase() === 's4' ? 's4' : 's3';
                return `/${semester}/macro`;
            }
        } catch (_e) {
            // ignore
        }

        return '/s3/macro';
    };

    const checkOnboardingStatus = async (targetPath: string) => {
        if (!user) return;

        setCheckingOnboarding(true);

        const localOnboarding = localStorage.getItem(`${ONBOARDING_STORAGE_KEY}_${user.uid}`);
        if (localOnboarding === 'true') {
            navigate(targetPath, { replace: true });
            return;
        }

        try {
            const response = await authFetch(`${API_URL}/api/user/${user.uid}/onboarding`);
            if (response.ok) {
                const data = await response.json();
                if (typeof data?.year === 'string' && /^L[1-3]$/.test(data.year)) {
                    setSelectedYear(data.year);
                }
                const semester = String(data?.semester || '').toUpperCase();
                if (semester === 'S3' || semester === 'S4') {
                    setSelectedSemester(semester);
                }

                if (data.completed) {
                    localStorage.setItem(`${ONBOARDING_STORAGE_KEY}_${user.uid}`, 'true');
                    navigate(targetPath, { replace: true });
                } else {
                    setShowOnboarding(true);
                }
            } else {
                setShowOnboarding(true);
            }
        } catch (_e) {
            navigate(targetPath, { replace: true });
        } finally {
            setCheckingOnboarding(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsSigningIn(true);
        setError(null);

        try {
            await signInWithGoogle();
        } catch (err: unknown) {
            const code = (err as { code?: string })?.code;
            if (code === 'auth/popup-closed-by-user') {
                setError('Connexion annulée. Réessayez quand vous êtes prêt.');
            } else if (code === 'auth/popup-blocked') {
                setError('Popup bloquée. Autorisez les popups pour ce site.');
            } else if (code === 'auth/network-request-failed') {
                setError('Erreur réseau. Vérifiez votre connexion internet.');
            } else {
                setError('Erreur lors de la connexion. Veuillez réessayer.');
            }
            setIsSigningIn(false);
        }
    };

    const getTargetPath = () => `/${selectedSemester.toLowerCase() === 's4' ? 's4' : 's3'}/macro`;

    const persistOnboardingSelection = async () => {
        if (!user) return getTargetPath();

        const semester = selectedSemester.toLowerCase() === 's4' ? 's4' : 's3';
        const targetPath = getTargetPath();

        await Promise.all([
            authFetch(`${API_URL}/api/user/${user.uid}/onboarding`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: true, year: selectedYear, semester, lastPath: targetPath }),
            }).catch(() => {}),
            authFetch(`${API_URL}/api/user/${user.uid}/navigation`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ year: selectedYear, semester, lastPath: targetPath }),
            }).catch(() => {}),
        ]);

        localStorage.setItem(`${ONBOARDING_STORAGE_KEY}_${user.uid}`, 'true');
        localStorage.setItem(`last-nav-${user.uid}`, JSON.stringify({ semester, path: targetPath }));

        return targetPath;
    };

    const finishOnboarding = async () => {
        setIsSavingOnboarding(true);
        setCheckoutError(null);
        try {
            const targetPath = await persistOnboardingSelection();
            navigate(targetPath, { replace: true });
        } finally {
            setIsSavingOnboarding(false);
        }
    };

    const startCheckout = async (plan: 'semester' | 'annual') => {
        if (!user?.uid) return;

        setCheckoutError(null);
        setCheckoutLoadingPlan(plan);

        try {
            await persistOnboardingSelection();
            const { url } = await createCheckoutSession(user.uid, plan);
            if (!url) throw new Error('URL de paiement non recue');
            window.location.href = url;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Impossible de lancer le paiement';
            setCheckoutError(message);
            setCheckoutLoadingPlan(null);
        }
    };

    const anyActionLoading = isSavingOnboarding || Boolean(checkoutLoadingPlan);

    if (checkingOnboarding) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg-base)' }}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-2 border-t-transparent mx-auto mb-4" style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }} />
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Préparation de votre espace...</p>
                </div>
            </div>
        );
    }

    if (showOnboarding && user) {
        return (
            <div className="min-h-screen antialiased relative overflow-hidden" data-theme="light" style={{ background: '#f5f7fb' }}>
                <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                    <div className="absolute -top-40 -left-32 h-[420px] w-[420px] rounded-full blur-3xl opacity-70" style={{ background: 'color-mix(in srgb, var(--color-accent) 35%, #ffffff)' }} />
                    <div className="absolute -bottom-48 -right-36 h-[520px] w-[520px] rounded-full blur-3xl opacity-60" style={{ background: 'color-mix(in srgb, var(--color-info) 25%, #ffffff)' }} />
                </div>

                <div className="relative min-h-screen px-4 sm:px-6 lg:px-8 flex items-center justify-center" style={{ zIndex: 1 }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-6xl">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="hidden rounded-3xl p-6 sm:p-8 lg:p-10" style={{ background: 'linear-gradient(160deg, #0e1e36 0%, #132b4a 40%, #10243f 100%)', color: '#f7fbff', boxShadow: '0 30px 70px rgba(12, 24, 46, 0.35)' }}>
                                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-8" style={{ background: 'rgba(255,255,255,0.12)' }}>
                                    <Sparkles className="h-4 w-4" />
                                    <span className="text-xs font-semibold uppercase tracking-[0.14em]">Onboarding Premium</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl leading-tight font-semibold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>Un espace calibre pour ta revision.</h2>
                                <p className="text-sm sm:text-base mb-8" style={{ color: 'rgba(240,246,255,0.82)' }}>Selectionne ton contexte academique, puis choisis si tu veux activer Premium maintenant.</p>

                                <div className="space-y-3">
                                    {[1, 2, 3].map((dot) => (
                                        <div key={dot} className="flex items-center gap-2 px-3 py-2 rounded-full" style={{ border: '1px solid rgba(255,255,255,0.22)', background: step === dot ? 'rgba(255,255,255,0.16)' : step > dot ? 'rgba(67, 183, 137, 0.22)' : 'rgba(255,255,255,0.07)' }}>
                                            <span className="h-5 w-5 rounded-full grid place-items-center text-[11px] font-bold" style={{ background: step > dot ? 'var(--color-success)' : step === dot ? 'var(--color-accent)' : 'rgba(255,255,255,0.25)', color: 'white' }}>{dot}</span>
                                            <span className="text-xs font-semibold" style={{ color: 'rgba(240,246,255,0.88)' }}>{dot === 1 ? 'Année' : dot === 2 ? 'Semestre' : 'Abonnement'}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 rounded-2xl p-4" style={{ border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.08)' }}>
                                    <p className="text-xs uppercase tracking-[0.15em] mb-2" style={{ color: 'rgba(240,246,255,0.72)' }}>Configuration actuelle</p>
                                    <p className="text-sm font-semibold">{selectedYear} Â· {selectedSemester}</p>
                                </div>
                            </div>

                            <div className="rounded-3xl p-6 sm:p-8 max-w-2xl w-full mx-auto" style={{ border: '1px solid color-mix(in srgb, var(--color-border-default) 90%, transparent)', background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(10px)', boxShadow: '0 18px 46px rgba(15, 36, 66, 0.10)' }}>
                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center gap-3 mb-3">
                                        <GraduationCap className="h-8 w-8" style={{ color: 'var(--color-accent)' }} />
                                        <h2 className="text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>{APP_NAME}</h2>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        {[1, 2, 3].map((dot) => (
                                            <span
                                                key={dot}
                                                className="h-2.5 rounded-full transition-all"
                                                style={{
                                                    width: step === dot ? 26 : 10,
                                                    background: step > dot ? 'var(--color-success)' : step === dot ? 'var(--color-accent)' : 'var(--color-border-default)',
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                {step === 1 && (
                                    <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <CalendarDays className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                                            <p className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Étape 1</p>
                                        </div>
                                        <h3 className="text-2xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Choisis ton annee</h3>
                                        <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>On personnalise les contenus, annales et progression selon cette annee.</p>
                                        <div className="grid sm:grid-cols-3 gap-3 mb-8">
                                            {YEAR_OPTIONS.map((opt) => (
                                                <OptionCard key={opt.value} title={opt.title} subtitle={opt.subtitle} selected={selectedYear === opt.value} onClick={() => setSelectedYear(opt.value)} />
                                            ))}
                                        </div>
                                        <div className="flex justify-end">
                                            <button type="button" onClick={() => setStep(2)} className="h-11 px-6 rounded-xl font-semibold" style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}>Continuer</button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Layers className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                                            <p className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Étape 2</p>
                                        </div>
                                        <h3 className="text-2xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Choisis ton semestre</h3>
                                        <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>C’est ton point d entrée par defaut des la premiere session.</p>
                                        <div className="grid gap-3 mb-8">
                                            {SEMESTER_OPTIONS.map((opt) => (
                                                <OptionCard key={opt.value} title={opt.title} subtitle={opt.subtitle} detail={opt.detail} selected={selectedSemester === opt.value} onClick={() => setSelectedSemester(opt.value)} />
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between gap-3">
                                            <button type="button" onClick={() => setStep(1)} className="h-11 px-6 rounded-xl font-medium" style={{ border: '1px solid var(--color-border-default)', color: 'var(--color-text-secondary)' }}>Retour</button>
                                            <button type="button" onClick={() => setStep(3)} className="h-11 px-6 rounded-xl font-semibold" style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}>Voir les offres</button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <CreditCard className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                                            <p className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Étape 3</p>
                                        </div>
                                        <h3 className="text-2xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Passe Premium maintenant</h3>
                                        <p className="text-sm mb-5" style={{ color: 'var(--color-text-secondary)' }}>Espace initialisé sur {selectedYear} Â· {selectedSemester}. Active Premium ici, ou continue en gratuit.</p>

                                        {checkoutError && (
                                            <div className="mb-4 rounded-xl p-3 text-sm" style={{ background: 'color-mix(in srgb, var(--color-error) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--color-error) 35%, transparent)', color: 'var(--color-error)' }}>
                                                {checkoutError}
                                            </div>
                                        )}

                                        <div className="grid gap-3 mb-5">
                                            <button type="button" onClick={() => startCheckout('semester')} disabled={anyActionLoading} className="rounded-2xl p-4 text-left disabled:opacity-60" style={{ border: '1px solid var(--color-border-default)', background: 'linear-gradient(155deg, var(--color-bg-overlay), var(--color-bg-raised))' }}>
                                                <div className="flex items-center justify-between gap-3">
                                                    <div>
                                                        <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Plan Semestriel</p>
                                                        <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>15,99 EUR Â· 6 mois</p>
                                                    </div>
                                                    <span className="text-[11px] font-semibold" style={{ color: 'var(--color-accent)' }}>2,67 EUR/mois</span>
                                                </div>
                                                <p className="text-xs mt-3" style={{ color: 'var(--color-text-muted)' }}>{checkoutLoadingPlan === 'semester' ? 'Redirection en cours...' : 'Ideal si tu veux valider ce semestre rapidement.'}</p>
                                            </button>

                                            <button type="button" onClick={() => startCheckout('annual')} disabled={anyActionLoading} className="rounded-2xl p-4 text-left disabled:opacity-60" style={{ border: '1px solid color-mix(in srgb, var(--color-accent) 50%, transparent)', background: 'linear-gradient(145deg, color-mix(in srgb, var(--color-accent) 16%, #ffffff), color-mix(in srgb, var(--color-info) 9%, #ffffff))', boxShadow: '0 10px 28px color-mix(in srgb, var(--color-accent) 15%, transparent)' }}>
                                                <div className="flex items-center justify-between gap-3">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Plan Annuel</p>
                                                        <span className="text-[10px] px-2 py-1 rounded-full" style={{ background: 'var(--color-success-subtle)', color: 'var(--color-success)' }}>meilleur prix</span>
                                                    </div>
                                                    <span className="text-[11px] font-semibold" style={{ color: 'var(--color-accent)' }}>2,50 EUR/mois</span>
                                                </div>
                                                <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>29,99 EUR Â· 12 mois</p>
                                                <p className="text-xs mt-3" style={{ color: 'var(--color-text-muted)' }}>{checkoutLoadingPlan === 'annual' ? 'Redirection en cours...' : 'Le meilleur ratio prix / valeur pour toute l’année.'}</p>
                                            </button>
                                        </div>

                                        <div className="rounded-2xl p-4 mb-6" style={{ border: '1px solid color-mix(in srgb, var(--color-success) 35%, transparent)', background: 'color-mix(in srgb, var(--color-success) 9%, transparent)' }}>
                                            <div className="flex items-start gap-2">
                                                <CheckCircle2 className="h-5 w-5 mt-0.5" style={{ color: 'var(--color-success)' }} />
                                                <div>
                                                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Tu peux commencer gratuitement</p>
                                                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>Et activer Premium plus tard depuis la page Tarifs.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-3">
                                            <button type="button" onClick={() => setStep(2)} className="h-11 px-6 rounded-xl font-medium" style={{ border: '1px solid var(--color-border-default)', color: 'var(--color-text-secondary)' }}>Retour</button>
                                            <button type="button" onClick={finishOnboarding} disabled={anyActionLoading} className="h-11 px-6 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-60" style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}>
                                                {isSavingOnboarding ? 'Initialisation...' : <><Sparkles className="h-4 w-4" />Continuer en gratuit</>}
                                            </button>
                                        </div>

                                        <div className="mt-5 flex items-center justify-center gap-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                            <Sparkles className="h-4 w-4" />
                                            Paiement sécurisé via Stripe
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen antialiased relative" data-theme="light" style={{ background: 'var(--color-bg-base)', minHeight: '100dvh' }}>
            <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[520px] -translate-y-1/3 opacity-45" style={{ background: 'radial-gradient(ellipse, var(--color-accent-subtle), transparent 70%)' }} />
            </div>

            <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6" style={{ zIndex: 1, minHeight: '100dvh' }}>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <motion.div initial={{ scale: 0.97 }} animate={{ scale: 1 }} className="inline-flex items-center gap-3">
                            <GraduationCap className="h-12 w-12" style={{ color: 'var(--color-accent)' }} />
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--color-accent)' }}>{APP_NAME}</h1>
                        </motion.div>
                    </div>
                    <p className="text-sm text-center -mt-4 mb-4" style={{ color: 'var(--color-text-secondary)' }}>Connexion Google requise pour ouvrir les cours</p>

                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="p-6 sm:p-7 rounded-2xl" style={{ background: 'var(--color-bg-raised)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-border-default)' }}>
                        <h2 className="text-xl font-semibold mb-2 text-center" style={{ color: 'var(--color-text-primary)' }}>Connexion requise</h2>
                        <p className="text-sm text-center mb-6" style={{ color: 'var(--color-text-secondary)' }}>La connexion donne accès aux cours. Certains contenus restent réservés au Premium.</p>

                        {error && (
                            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-5 p-3 rounded-xl" style={{ background: 'color-mix(in srgb, var(--color-error) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--color-error) 30%, transparent)' }}>
                                <p className="text-sm font-medium" style={{ color: 'var(--color-error)' }}>{error}</p>
                            </motion.div>
                        )}

                        <button
                            onClick={handleGoogleSignIn}
                            disabled={isSigningIn}
                            className="w-full flex items-center justify-center gap-3 h-12 px-6 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ background: 'var(--color-surface)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border-default)' }}
                        >
                            {isSigningIn ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent" style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }} />
                                    <span>Connexion en cours...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="var(--color-info)" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="var(--color-success)" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="var(--color-warning)" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="var(--color-error)" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    <span>Continuer avec Google</span>
                                </>
                            )}
                        </button>

                        <p className="mt-4 text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>En vous connectant, vous acceptez les <a href="/terms" className="underline" style={{ color: 'var(--color-accent)' }}>conditions d’utilisation</a>.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center">
                        <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-sm font-medium transition-colors group" style={{ color: 'var(--color-text-secondary)' }}>
                            <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                            Retour à l’accueil
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}










