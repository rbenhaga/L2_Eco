import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Check, CreditCard, GraduationCap, Layers, ShieldCheck } from 'lucide-react';
import { DEFAULT_ACADEMIC_YEAR, YEAR_OPTIONS, normalizeAcademicYear } from '../config/academicOptions';
import { DEFAULT_ENABLED_SEMESTER_LABEL, SEMESTER_ACCESS_OPTIONS, getDefaultLearningPath, normalizeEnabledSemester, normalizeEnabledSemesterLabel } from '../config/semesterAccess';
import { useAuth } from '../context/AuthContext';
import { authFetch } from '../utils/authFetch';
import { createCheckoutSession } from '../services/api';
import { updateMyOikoSubscription } from '../services/oikoNews';
import { trackEvent } from '../services/analytics';
import './LoginPage.css';
import './PricingPage.css';

const APP_NAME = 'Oikonomia';
const TYPE_SPEED_MS = 62;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const ONBOARDING_STORAGE_KEY = 'agora_onboarding_completed';
const ONBOARDING_DRAFT_STORAGE_KEY = 'agora_onboarding_draft';
const FORCE_ONBOARDING_EMAILS = new Set(
    String(import.meta.env.VITE_FORCE_ONBOARDING_EMAILS || '')
        .split(',')
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean)
);
const AUTH_FUN_LINES = [
    'Mode révision activé !',
    'Bonjour, futur(e) économiste.',
    'Des partiels à réviser ?',
    'Café ready ?',
    'Bon courage !',
    'Une question ? Demandez à Oiko.'
] as const;
const ONBOARDING_PASS_PRICE = 7.99;
const ONBOARDING_PASS_DURATION_DAYS = 30;

function getStoredLearningPath(path?: string | null) {
    if (typeof path !== 'string') return getDefaultLearningPath();
    if (/^\/s4\/[a-z0-9-]+(?:\/.*)?$/i.test(path)) return path;
    if (/^\/oiko-news(?:\/[a-z0-9-]+)?(?:\?.*)?$/i.test(path)) return path;
    return getDefaultLearningPath();
}

type Step = 1 | 2 | 3;

interface OnboardingDraft {
    step: Step;
    selectedYear: string;
    selectedSemester: string;
    subscribeToOikoNews: boolean;
}

interface OptionCardProps {
    title: string;
    subtitle: string;
    selected: boolean;
    disabled?: boolean;
    statusLabel?: string;
    onClick: () => void;
}

function OptionCard({ title, subtitle, selected, disabled = false, statusLabel, onClick }: OptionCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="text-left p-4 rounded-2xl transition-all duration-200 disabled:cursor-not-allowed"
            style={{
                border: selected
                    ? '1px solid var(--color-accent)'
                    : disabled
                        ? '1px solid var(--color-border-subtle)'
                        : '1px solid var(--color-border-default)',
                background: selected
                    ? 'var(--color-accent-subtle)'
                    : disabled
                        ? 'color-mix(in srgb, var(--color-bg-overlay) 78%, transparent)'
                        : 'var(--color-bg-raised)',
                boxShadow: 'none',
                opacity: disabled ? 0.72 : 1,
            }}
        >
            <div>
                <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold" style={{ color: disabled ? 'var(--color-text-muted)' : 'var(--color-text-primary)' }}>{title}</p>
                    {statusLabel ? (
                        <span
                            className="inline-flex shrink-0 items-center justify-center rounded-xl px-3 py-2 text-[11px] font-semibold text-center leading-tight"
                            style={{
                                background: disabled ? 'var(--color-bg-overlay)' : 'var(--color-success-subtle)',
                                color: disabled ? 'var(--color-text-secondary)' : 'var(--color-success)',
                                maxWidth: '104px',
                            }}
                        >
                            {statusLabel}
                        </span>
                    ) : null}
                </div>
                {subtitle ? (
                    <p className="text-sm mt-3" style={{ color: disabled ? 'var(--color-text-muted)' : 'var(--color-text-secondary)' }}>
                        {subtitle}
                    </p>
                ) : null}
            </div>
        </button>
    );
}

export function LoginPage() {
    const { signInWithGoogle, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [isSigningIn, setIsSigningIn] = useState(false);
    const [isSavingOnboarding, setIsSavingOnboarding] = useState(false);
    const [checkoutLoadingPlan, setCheckoutLoadingPlan] = useState<'semester' | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [checkoutError, setCheckoutError] = useState<string | null>(null);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [checkingOnboarding, setCheckingOnboarding] = useState(false);
    const [step, setStep] = useState<Step>(1);
    const [selectedYear, setSelectedYear] = useState<string>(DEFAULT_ACADEMIC_YEAR);
    const [selectedSemester, setSelectedSemester] = useState<string>(DEFAULT_ENABLED_SEMESTER_LABEL);
    const [subscribeToOikoNews, setSubscribeToOikoNews] = useState(false);
    const [typedCount, setTypedCount] = useState(0);

    const hasCheckedOnboarding = useRef(false);
    const hasTrackedOnboardingStart = useRef(false);

    const navigationState = location.state as { from?: { pathname?: string; search?: string }; forceOnboarding?: boolean } | null;
    const fromState = navigationState?.from?.pathname
        ? `${navigationState.from.pathname}${navigationState.from.search || ''}`
        : null;
    const shouldForceOnboarding =
        Boolean(navigationState?.forceOnboarding) ||
        (Boolean(user?.email) && FORCE_ONBOARDING_EMAILS.has(String(user?.email).toLowerCase()));

    useEffect(() => {
        setTypedCount(0);
        const timer = window.setInterval(() => {
            setTypedCount((prev) => {
                if (prev >= APP_NAME.length) {
                    window.clearInterval(timer);
                    return prev;
                }
                return prev + 1;
            });
        }, TYPE_SPEED_MS);

        return () => window.clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!user) {
            hasCheckedOnboarding.current = false;
            hasTrackedOnboardingStart.current = false;
            return;
        }

        if (!hasCheckedOnboarding.current) {
            hasCheckedOnboarding.current = true;
            resolveDefaultFromPath().then((path) => checkOnboardingStatus(path));
        }
    }, [user]);

    useEffect(() => {
        if (!user || !showOnboarding) return;
        const draft: OnboardingDraft = {
            step,
            selectedYear,
            selectedSemester,
            subscribeToOikoNews,
        };
        localStorage.setItem(`${ONBOARDING_DRAFT_STORAGE_KEY}_${user.uid}`, JSON.stringify(draft));
    }, [user, showOnboarding, step, selectedYear, selectedSemester, subscribeToOikoNews]);

    useEffect(() => {
        if (!user || !showOnboarding || hasTrackedOnboardingStart.current) return;
        hasTrackedOnboardingStart.current = true;
        void trackEvent('onboarding_started', {
            source: shouldForceOnboarding ? 'forced' : 'standard',
        });
    }, [user, showOnboarding, shouldForceOnboarding]);

    useEffect(() => {
        if (!user || !showOnboarding) return;
        void trackEvent('onboarding_step_view', {
            step,
            year: selectedYear,
            semester: normalizeEnabledSemester(selectedSemester),
        });
    }, [user, showOnboarding, step, selectedYear, selectedSemester, subscribeToOikoNews]);
    const resolveDefaultFromPath = async () => {
        if (!user) return getDefaultLearningPath();
        if (fromState) return getStoredLearningPath(fromState);

        try {
            const local = localStorage.getItem(`last-nav-${user.uid}`);
            if (local) {
                const parsed = JSON.parse(local);
                if (typeof parsed?.path === 'string') {
                    return getStoredLearningPath(parsed.path);
                }
            }
        } catch (_e) {
            // ignore
        }

        try {
            const response = await authFetch(`${API_URL}/api/user/${user.uid}/navigation`);
            if (response.ok) {
                const data = await response.json();
                if (typeof data?.lastPath === 'string') {
                    return getStoredLearningPath(data.lastPath);
                }
                const semester = normalizeEnabledSemester(data?.semester);
                return `/${semester}/macro`;
            }
        } catch (_e) {
            // ignore
        }

        return getDefaultLearningPath();
    };

    const restoreOnboardingDraft = (fallbackYear = DEFAULT_ACADEMIC_YEAR, fallbackSemester = DEFAULT_ENABLED_SEMESTER_LABEL) => {
        const normalizedYear = normalizeAcademicYear(fallbackYear);
        const normalizedSemester = normalizeEnabledSemesterLabel(fallbackSemester);

        setStep(1);
        setSelectedYear(normalizedYear);
        setSelectedSemester(normalizedSemester);
        setSubscribeToOikoNews(false);

        if (!user) return;

        try {
            const raw = localStorage.getItem(`${ONBOARDING_DRAFT_STORAGE_KEY}_${user.uid}`);
            if (!raw) return;
            const draft = JSON.parse(raw) as Partial<OnboardingDraft>;
            const draftYear = normalizeAcademicYear(typeof draft.selectedYear === 'string' ? draft.selectedYear : normalizedYear);
            const draftSemester = normalizeEnabledSemesterLabel(typeof draft.selectedSemester === 'string' ? draft.selectedSemester : normalizedSemester);
            const draftStep = draft.step === 1 || draft.step === 2 || draft.step === 3 ? draft.step : 1;

            setSelectedYear(draftYear);
            setSelectedSemester(draftSemester);
            setSubscribeToOikoNews(Boolean(draft.subscribeToOikoNews));
            setStep(draftStep);
        } catch (_e) {
            // ignore invalid local draft
        }
    };

    const checkOnboardingStatus = async (targetPath: string) => {
        if (!user) return;

        setCheckingOnboarding(true);

        if (shouldForceOnboarding) {
            restoreOnboardingDraft();
            setShowOnboarding(true);
            setCheckingOnboarding(false);
            return;
        }

        const localOnboarding = localStorage.getItem(`${ONBOARDING_STORAGE_KEY}_${user.uid}`);
        if (localOnboarding === 'true') {
            navigate(targetPath, { replace: true });
            return;
        }

        try {
            const response = await authFetch(`${API_URL}/api/user/${user.uid}/onboarding`);
            if (response.ok) {
                const data = await response.json();
                if (typeof data?.year === 'string') {
                    setSelectedYear(normalizeAcademicYear(data.year));
                }
                const semester = normalizeEnabledSemesterLabel(data?.semester);
                setSelectedSemester(semester);

                if (data.completed) {
                    localStorage.setItem(`${ONBOARDING_STORAGE_KEY}_${user.uid}`, 'true');
                    localStorage.removeItem(`${ONBOARDING_DRAFT_STORAGE_KEY}_${user.uid}`);
                    navigate(targetPath, { replace: true });
                } else {
                    const serverYear = normalizeAcademicYear(typeof data?.year === 'string' ? data.year : DEFAULT_ACADEMIC_YEAR);
                    const serverSemester = normalizeEnabledSemesterLabel(semester);
                    restoreOnboardingDraft(serverYear, serverSemester);
                    setShowOnboarding(true);
                }
            } else {
                restoreOnboardingDraft();
                setShowOnboarding(true);
            }
        } catch (_e) {
            restoreOnboardingDraft();
            setShowOnboarding(true);
        } finally {
            setCheckingOnboarding(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsSigningIn(true);
        setError(null);
        void trackEvent('auth_google_click', { source: 'login_page' });

        try {
            await signInWithGoogle();
            void trackEvent('auth_google_success', { source: 'login_page' });
        } catch (err: unknown) {
            const code = (err as { code?: string })?.code;
            const normalizedCode = typeof code === 'string' ? code : 'unknown';
            void trackEvent('auth_google_error', {
                source: 'login_page',
                code: normalizedCode,
            });

            if (code === 'auth/popup-closed-by-user') {
                setError('Connexion annulée. Réessayez quand vous êtes prêt(e).');
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

    const getTargetPath = () => `/${normalizeEnabledSemester(selectedSemester)}/macro`;

    const persistOnboardingSelection = async () => {
        if (!user) return getTargetPath();

        const semester = normalizeEnabledSemester(selectedSemester);
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
            updateMyOikoSubscription(subscribeToOikoNews, 'onboarding').catch(() => null),
        ]);

        localStorage.setItem(`${ONBOARDING_STORAGE_KEY}_${user.uid}`, 'true');
        localStorage.removeItem(`${ONBOARDING_DRAFT_STORAGE_KEY}_${user.uid}`);
        localStorage.setItem(`last-nav-${user.uid}`, JSON.stringify({ semester, path: targetPath }));

        return targetPath;
    };

    const finishOnboarding = async () => {
        setIsSavingOnboarding(true);
        setCheckoutError(null);
        try {
            const targetPath = await persistOnboardingSelection();
            void trackEvent('onboarding_completed', {
                mode: 'discovery',
                year: selectedYear,
                semester: normalizeEnabledSemester(selectedSemester),
            });
            navigate(targetPath, { replace: true });
        } finally {
            setIsSavingOnboarding(false);
        }
    };

    const startCheckout = async () => {
        if (!user?.uid) return;

        setCheckoutError(null);
        setCheckoutLoadingPlan('semester');
        void trackEvent('checkout_started', {
            source: 'onboarding',
            plan: 'semester',
            price: ONBOARDING_PASS_PRICE,
        });

        try {
            await persistOnboardingSelection();
            const { url } = await createCheckoutSession(user.uid, 'semester');
            if (!url) throw new Error('URL de paiement non reçue');
            void trackEvent('checkout_redirect', {
                source: 'onboarding',
                plan: 'semester',
            });
            window.location.href = url;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Impossible de lancer le paiement';
            void trackEvent('checkout_failed', {
                source: 'onboarding',
                plan: 'semester',
            });
            setCheckoutError(message);
            setCheckoutLoadingPlan(null);
        }
    };

    const continueWithFreeAccess = async () => {
        void trackEvent('onboarding_continue_free', {
            year: selectedYear,
            semester: normalizeEnabledSemester(selectedSemester),
        });
        await finishOnboarding();
    };
    const anyActionLoading = isSavingOnboarding || Boolean(checkoutLoadingPlan);
    const typedName = APP_NAME.slice(0, typedCount);
    const [funLine] = useState(() => AUTH_FUN_LINES[Math.floor(Math.random() * AUTH_FUN_LINES.length)]);

    if (checkingOnboarding) {
        return (
            <div className="min-h-screen flex items-center justify-center surface-hero-atmosphere auth-min-shell">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-2 border-t-transparent mx-auto mb-4" style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }} />
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Préparation de votre espace...</p>
                </div>
            </div>
        );
    }

    if (showOnboarding && user) {
        return (
            <div className="min-h-screen antialiased relative overflow-hidden surface-hero-atmosphere auth-min-shell">
                <div className="relative min-h-screen px-4 sm:px-6 lg:px-8 flex items-center justify-center" style={{ zIndex: 1 }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-2xl">
                        <div className="rounded-2xl p-6 sm:p-8" style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-raised)', boxShadow: 'var(--shadow-md)' }}>
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center gap-3 mb-3">
                                    <GraduationCap className="h-8 w-8" style={{ color: 'var(--color-accent)' }} />
                                    <h2 className="auth-brand-title text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                        {typedName.split('').map((char, index) => (
                                            <span
                                                key={`${char}-${index}`}
                                                className={`auth-brand-letter ${index === typedCount - 1 && typedCount < APP_NAME.length ? 'is-fresh' : ''}`}
                                            >
                                                {char}
                                            </span>
                                        ))}
                                        <span className="auth-brand-cursor" aria-hidden="true" />
                                    </h2>
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
                                    <h3 className="text-2xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Quelle est votre année actuelle ?</h3>
                                    <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                                        Ces choix servent à personnaliser votre espace. Cela n'impacte pas votre accès aux contenus.</p>
                                    <div className="grid sm:grid-cols-3 gap-3 mb-8">
                                        {YEAR_OPTIONS.map((opt) => (
                                            <OptionCard
                                                key={opt.value}
                                                title={opt.title}
                                                subtitle={opt.subtitle}
                                                selected={selectedYear === opt.value}
                                                disabled={opt.disabled}
                                                statusLabel={opt.availabilityLabel}
                                                onClick={() => {
                                                    if (!opt.disabled) {
                                                        setSelectedYear(opt.value);
                                                    }
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex justify-end">
                                        <button type="button" onClick={() => { void trackEvent('onboarding_step_continue', { from_step: 1, to_step: 2 }); setStep(2); }} className="h-11 px-6 rounded-xl font-semibold" style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}>Continuer</button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Layers className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                                        <p className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Étape 2</p>
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Quel semestre souhaitez-vous voir en priorité ?</h3>
                                    <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                                        Ce choix organise votre tableau de bord. Vous pouvez le modifier à tout moment.</p>
                                    <div className="grid gap-3 mb-8">
                                        {SEMESTER_ACCESS_OPTIONS.map((opt) => (
                                            <OptionCard
                                                key={opt.value}
                                                title={opt.title}
                                                subtitle={opt.subtitle}
                                                selected={selectedSemester === opt.value}
                                                disabled={opt.disabled}
                                                statusLabel={opt.availabilityLabel}
                                                onClick={() => {
                                                    if (!opt.disabled) {
                                                        setSelectedSemester(opt.value);
                                                    }
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between gap-3">
                                        <button type="button" onClick={() => setStep(1)} className="h-11 px-6 rounded-xl font-medium" style={{ border: '1px solid var(--color-border-default)', color: 'var(--color-text-secondary)' }}>Retour</button>
                                        <button type="button" onClick={() => { void trackEvent('onboarding_step_continue', { from_step: 2, to_step: 3 }); setStep(3); }} className="h-11 px-6 rounded-xl font-semibold" style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}>Voir l'offre Premium</button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <CreditCard className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                                        <p className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Étape 3</p>
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Débloquez tout pour vos partiels</h3>
                                    <p className="text-sm mb-5" style={{ color: 'var(--color-text-secondary)' }}>
                                        Vous pouvez continuer gratuitement, ou débloquer pendant 30 jours tout le contenu utile pour réviser : cours, TD corrigés, fiches, QCM, annales, vidéos, audios et Oiko IA.</p>

                                    <label
                                        className="mb-4 flex items-start gap-3 rounded-2xl p-4"
                                        style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-overlay)' }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={subscribeToOikoNews}
                                            onChange={(event) => setSubscribeToOikoNews(event.target.checked)}
                                            className="mt-1 h-4 w-4"
                                        />
                                        <span>
                                            <span className="block font-semibold" style={{ color: 'var(--color-text-primary)' }}>Recevoir Oiko News chaque matin à 07:00</span>
                                            <span className="block text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                                                Point marchés, grandes news macro des dernières 24h, analyse pédagogique et brèves finales. Option non obligatoire, modifiable ensuite depuis la page Oiko News.
                                            </span>
                                        </span>
                                    </label>

                                    {checkoutError && (
                                        <div className="mb-4 rounded-xl p-3 text-sm" style={{ background: 'color-mix(in srgb, var(--color-error) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--color-error) 35%, transparent)', color: 'var(--color-error)' }}>
                                            {checkoutError}
                                        </div>
                                    )}

                                    <div className="rounded-2xl p-4 mb-4" style={{ border: '1px solid var(--color-border-default)', background: 'var(--color-bg-overlay)' }}>
                                        <div className="inline-flex items-center mb-3 text-[11px] font-semibold px-2 py-1 rounded-full" style={{ background: 'var(--color-bg-raised)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border-default)' }}>
                                            Offre actuelle
                                        </div>
                                        <p className="pricing-min-card-name">Pass Partiels S4</p>
                                        <p className="pricing-min-card-sub">{ONBOARDING_PASS_DURATION_DAYS} jours d'accès complet</p>
                                        <p className="pricing-min-price">{ONBOARDING_PASS_PRICE.toFixed(2).replace('.', ',')}€</p>
                                        <ul className="mt-3 space-y-1.5 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                                            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5" style={{ color: 'var(--color-accent)' }} /> Accès complet L1, L2 et L3</li>
                                            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5" style={{ color: 'var(--color-accent)' }} /> Cours, TD corrigés, QCM, fiches et annales</li>
                                            <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5" style={{ color: 'var(--color-accent)' }} /> Vidéos, audios et bot IA Oiko pour vos questions</li>
                                        </ul>
                                        <p className="text-xs mt-3" style={{ color: 'var(--color-text-muted)' }}>Parfait pour réviser efficacement avant les examens.</p>
                                        <button
                                            type="button"
                                            onClick={startCheckout}
                                            disabled={anyActionLoading}
                                            className="mt-4 h-11 w-full rounded-xl font-semibold disabled:opacity-60 inline-flex items-center justify-center gap-2"
                                            style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}
                                        >
                                            {checkoutLoadingPlan === 'semester' ? 'Redirection...' : 'Débloquer mon accès complet'}
                                            {checkoutLoadingPlan !== 'semester' && <ArrowRight className="h-4 w-4" />}
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between gap-3">
                                        <button type="button" onClick={() => { void trackEvent('onboarding_step_back', { from_step: 3, to_step: 2 }); setStep(2); }} className="h-11 px-6 rounded-xl font-medium" style={{ border: '1px solid var(--color-border-default)', color: 'var(--color-text-secondary)' }}>Retour</button>
                                        <button
                                            type="button"
                                            onClick={() => { void continueWithFreeAccess(); }}
                                            disabled={anyActionLoading}
                                            className="text-sm font-medium underline underline-offset-4 disabled:opacity-60"
                                            style={{ color: 'var(--color-text-secondary)' }}
                                        >
                                            {isSavingOnboarding ? 'Initialisation...' : "Continuer avec l'accès découverte"}
                                        </button>
                                    </div>

                                    <div className="mt-5 flex items-center justify-center gap-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                        <ShieldCheck className="h-4 w-4" />
                                        Paiement sécurisé via Stripe</div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen antialiased relative surface-hero-atmosphere auth-min-shell" style={{ minHeight: '100dvh' }}>
            <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6" style={{ zIndex: 1, minHeight: '100dvh' }}>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <motion.div initial={{ scale: 0.97 }} animate={{ scale: 1 }} className="inline-flex items-center gap-3">
                            <GraduationCap className="h-12 w-12" style={{ color: 'var(--color-accent)' }} />
                            <h1 className="auth-brand-title text-3xl sm:text-4xl font-bold tracking-tight">
                                {typedName.split('').map((char, index) => (
                                    <span
                                        key={`${char}-${index}`}
                                        className={`auth-brand-letter ${index === typedCount - 1 && typedCount < APP_NAME.length ? 'is-fresh' : ''}`}
                                    >
                                        {char}
                                    </span>
                                ))}
                                <span className="auth-brand-cursor" aria-hidden="true" />
                            </h1>
                        </motion.div>
                    </div>
                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="p-6 sm:p-7 rounded-2xl" style={{ background: 'var(--color-bg-raised)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-border-default)' }}>
                        <h2 className="text-xl font-semibold mb-6 text-center" style={{ color: 'var(--color-text-primary)' }}>{funLine}</h2>

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

                        <p className="mt-4 text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            En vous connectant, vous acceptez les <a href="/terms" className="underline" style={{ color: 'var(--color-accent)' }}>conditions d'utilisation</a>.
                        </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center">
                        <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-sm font-medium transition-colors group" style={{ color: 'var(--color-text-secondary)' }}>
                            <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                            Retour à l'accueil
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}















