import { useEffect, useState } from "react";
import { Check, Sparkles, Server, BookOpen, Bot, Globe, Wrench, X, ChevronDown, Users } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { createCheckoutSession } from "../services/api";
import { useAuth } from "../context/AuthContext";

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
};

export default function PricingPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const prefersReducedMotion = useReducedMotion();
    const { user } = useAuth();
    const [isSemesterLoading, setIsSemesterLoading] = useState(false);
    const [isAnnualLoading, setIsAnnualLoading] = useState(false);
    const [checkoutError, setCheckoutError] = useState<string | null>(null);
    const success = searchParams.get('success') === 'true';
    const canceled = searchParams.get('canceled') === 'true';

    useEffect(() => {
        if (!success && !canceled) return;
        const next = new URLSearchParams(searchParams);
        next.delete('success');
        next.delete('canceled');
        next.delete('session_id');
        setSearchParams(next, { replace: true });
    }, [success, canceled, searchParams, setSearchParams]);

    const handleCheckout = async (plan: 'semester' | 'annual') => {
        if (!user?.uid) {
            navigate('/login');
            return;
        }

        setCheckoutError(null);
        if (plan === 'semester') setIsSemesterLoading(true);
        if (plan === 'annual') setIsAnnualLoading(true);

        try {
            const { url } = await createCheckoutSession(user.uid, plan);
            if (!url) throw new Error('URL de paiement non reçue');
            window.location.href = url;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Impossible de lancer le paiement';
            setCheckoutError(message);
            setIsSemesterLoading(false);
            setIsAnnualLoading(false);
        }
    };

    const motionProps = prefersReducedMotion ? {} : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-40px" },
    };

    return (
        <div className="min-h-screen antialiased relative" data-theme="light" style={{ background: 'var(--color-bg-base)' }}>
            {/* Simple gradient background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, var(--color-bg-base) 0%, var(--color-bg-overlay) 100%)" }} />
            </div>

            <div className="relative" style={{ zIndex: 1 }}>
                <Header />

                {/* Hero */}
                <section className="py-16 sm:py-20">
                    <motion.div
                        className="mx-auto max-w-4xl px-4 sm:px-6 text-center"
                        {...motionProps}
                        variants={fadeUp}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--color-accent)' }}>
                            Tarifs
                        </p>
                        <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-[-0.02em] mb-6"
                            style={{
                                color: 'var(--color-text-primary)',
                                fontFamily: 'var(--font-serif)'
                            }}>
                            Choisis ton plan
                        </h1>
                        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
                            Accès complet à tous les contenus de la Licence 2 Économie.
                        </p>
                    </motion.div>
                </section>

                {/* Pricing Cards - 3 columns */}
                <section className="pb-16 sm:pb-20">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        {(success || canceled || checkoutError) && (
                            <div
                                className="mb-6 rounded-xl px-4 py-3 text-sm"
                                style={{
                                    background: success
                                        ? 'var(--color-success-subtle)'
                                        : canceled
                                            ? 'var(--color-warning-subtle)'
                                            : 'var(--color-error-subtle)',
                                    color: success
                                        ? 'var(--color-success)'
                                        : canceled
                                            ? 'var(--color-warning)'
                                            : 'var(--color-error)',
                                    border: success
                                        ? '1px solid color-mix(in srgb, var(--color-success) 35%, transparent)'
                                        : canceled
                                            ? '1px solid color-mix(in srgb, var(--color-warning) 35%, transparent)'
                                            : '1px solid color-mix(in srgb, var(--color-error) 35%, transparent)',
                                }}
                            >
                                {success
                                    ? "Paiement confirmé. Ton abonnement Premium est activé."
                                    : canceled
                                        ? "Paiement annulé. Tu peux reprendre quand tu veux."
                                        : checkoutError}
                            </div>
                        )}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

                            {/* Free */}
                            <motion.div
                                className="rounded-2xl p-6 flex flex-col"
                                style={{
                                    background: 'var(--color-bg-raised)',
                                    border: '1px solid var(--color-border-default)',
                                    boxShadow: 'var(--shadow-sm)'
                                }}
                                {...motionProps}
                                variants={fadeUp}
                                transition={{ duration: 0.5, delay: 0 }}
                            >
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Gratuit</h3>
                                    <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>Pour découvrir</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>0€</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-6 flex-1">
                                    {[
                                        "Premier chapitre de chaque matière",
                                        "QCM de découverte",
                                        "Fiches limitées",
                                    ].map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <Check className="h-4 w-4 shrink-0 mt-0.5" style={{ color: 'var(--color-text-muted)' }} />
                                            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <motion.button
                                    onClick={() => navigate("/login")}
                                    className="w-full py-2.5 px-4 rounded-xl font-medium text-sm"
                                    style={{
                                        background: 'var(--color-bg-overlay)',
                                        color: 'var(--color-text-secondary)',
                                        border: '1px solid var(--color-border-default)',
                                    }}
                                    whileHover={{
                                        backgroundColor: 'var(--color-surface)',
                                        borderColor: 'var(--color-border-strong)',
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Commencer gratuitement
                                </motion.button>
                            </motion.div>

                            {/* Semester — Populaire */}
                            <motion.div
                                className="rounded-2xl p-6 flex flex-col relative"
                                style={{
                                    background: 'var(--color-bg-raised)',
                                    border: '1px solid var(--color-border-default)',
                                    boxShadow: 'var(--shadow-sm)'
                                }}
                                {...motionProps}
                                variants={fadeUp}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                {/* Populaire badge */}
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                                        style={{
                                            background: 'var(--color-text-primary)',
                                            color: 'var(--color-canvas)',
                                            boxShadow: 'var(--shadow-sm)'
                                        }}>
                                        <Users className="h-3 w-3" />
                                        Populaire
                                    </span>
                                </div>

                                <div className="mb-6 pt-2">
                                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Semestre</h3>
                                    <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>Paiement unique · 6 mois</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>15,99€</span>
                                    </div>
                                    <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
                                        Soit 2,67€/mois
                                    </p>
                                </div>

                                <ul className="space-y-3 mb-6 flex-1">
                                    {[
                                        "Tous les cours complets (8 matières)",
                                        "Toutes les fiches de synthèse",
                                        "QCM illimités (500+ questions)",
                                        "Annales d'examens corrigés",
                                        "Écoute audio des cours",
                                        "Assistant IA pour t'aider",
                                        "Vidéos intro de chaque chapitre",
                                    ].map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <Check className="h-4 w-4 shrink-0 mt-0.5" style={{ color: 'var(--color-accent)' }} />
                                            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <motion.button
                                    onClick={() => handleCheckout('semester')}
                                    disabled={isSemesterLoading || isAnnualLoading}
                                    className="w-full py-3 px-4 rounded-xl text-sm font-semibold"
                                    style={{
                                        background: 'var(--color-text-primary)',
                                        color: 'var(--color-canvas)',
                                        boxShadow: 'var(--shadow-md)',
                                        opacity: isSemesterLoading || isAnnualLoading ? 0.7 : 1,
                                    }}
                                    whileHover={{
                                        y: -1,
                                        boxShadow: 'var(--shadow-lg)',
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isSemesterLoading ? 'Redirection...' : 'Choisir semestriel'}
                                </motion.button>
                            </motion.div>

                            {/* Annual - BEST VALUE */}
                            <motion.div
                                className="rounded-2xl p-8 relative flex flex-col"
                                style={{
                                    background: 'var(--color-bg-raised)',
                                    border: '2px solid var(--color-accent)',
                                    boxShadow: '0 4px 20px color-mix(in srgb, var(--color-accent) 15%, transparent)'
                                }}
                                {...motionProps}
                                variants={fadeUp}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <motion.span
                                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold"
                                        style={{
                                            background: 'var(--color-accent)',
                                            color: 'var(--color-accent-foreground)',
                                            boxShadow: 'var(--shadow-md)'
                                        }}
                                        animate={prefersReducedMotion ? {} : {
                                            scale: [1, 1.04, 1],
                                        }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <Sparkles className="h-3.5 w-3.5" />
                                        Meilleur prix
                                    </motion.span>
                                </div>

                                <div className="mb-6 pt-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-2xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>Annuel</h3>
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{
                                            background: 'var(--color-success-subtle)',
                                            color: 'var(--color-success)'
                                        }}>-50%</span>
                                    </div>
                                    <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>Paiement unique · 12 mois</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>29,99€</span>
                                        <span className="text-lg line-through" style={{ color: 'var(--color-text-muted)' }}>63,96€</span>
                                    </div>
                                    <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
                                        Soit 2,50€/mois
                                    </p>
                                </div>

                                <ul className="space-y-3 mb-8 flex-1">
                                    {[
                                        "Tous les cours complets (8 matières)",
                                        "Toutes les fiches de synthèse",
                                        "QCM illimités (500+ questions)",
                                        "Annales d'examens corrigés",
                                        "Écoute audio des cours",
                                        "Assistant IA pour t'aider",
                                        "Vidéos intro de chaque chapitre",
                                        "Suivi de progression détaillé",
                                        "Support prioritaire",
                                    ].map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <Check className="h-5 w-5 shrink-0 mt-0.5" style={{ color: 'var(--color-accent)' }} />
                                            <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <motion.button
                                    onClick={() => handleCheckout('annual')}
                                    disabled={isSemesterLoading || isAnnualLoading}
                                    className="w-full py-3 px-4 rounded-xl text-sm font-semibold"
                                    style={{
                                        background: 'var(--color-accent)',
                                        color: 'var(--color-accent-foreground)',
                                        boxShadow: 'var(--shadow-md)',
                                        opacity: isSemesterLoading || isAnnualLoading ? 0.7 : 1,
                                    }}
                                    whileHover={{
                                        y: -1,
                                        boxShadow: 'var(--shadow-lg)',
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isAnnualLoading ? 'Redirection...' : 'Choisir annuel'}
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Comparison Table */}
                <section className="pb-16 sm:pb-20">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6">
                        <motion.h2
                            className="text-2xl font-semibold text-center mb-8"
                            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-serif)' }}
                            {...motionProps}
                            variants={fadeUp}
                        >
                            Comparer les plans
                        </motion.h2>
                        <motion.div
                            className="rounded-xl overflow-hidden"
                            style={{
                                border: '1px solid var(--color-border-default)',
                                boxShadow: 'var(--shadow-sm)'
                            }}
                            {...motionProps}
                            variants={fadeUp}
                        >
                            <table className="w-full" style={{ background: 'var(--color-bg-raised)' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                                        <th className="text-left text-sm font-semibold p-4" style={{ color: 'var(--color-text-primary)' }}>Fonctionnalité</th>
                                        <th className="text-center text-sm font-semibold p-4" style={{ color: 'var(--color-text-primary)' }}>Gratuit</th>
                                        <th className="text-center text-sm font-semibold p-4" style={{ color: 'var(--color-text-primary)' }}>Semestre</th>
                                        <th className="text-center text-sm font-semibold p-4" style={{ color: 'var(--color-accent)' }}>Annuel</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { feature: "Cours complets", free: "1er chapitre", semester: true, annual: true },
                                        { feature: "Fiches de synthèse", free: "Limitées", semester: true, annual: true },
                                        { feature: "QCM d'entraînement", free: "Découverte", semester: true, annual: true },
                                        { feature: "Annales corrigées", free: false, semester: true, annual: true },
                                        { feature: "Écoute audio", free: false, semester: true, annual: true },
                                        { feature: "Assistant IA", free: false, semester: true, annual: true },
                                        { feature: "Vidéos intro", free: false, semester: true, annual: true },
                                        { feature: "Suivi de progression", free: false, semester: false, annual: true },
                                        { feature: "Support prioritaire", free: false, semester: false, annual: true },
                                        { feature: "Durée d'accès", free: "Illimité", semester: "6 mois", annual: "12 mois" },
                                    ].map(({ feature, free, semester, annual }, index) => (
                                        <tr
                                            key={feature}
                                            style={{
                                                borderBottom: '1px solid var(--color-border-default)',
                                                background: index % 2 === 1 ? 'var(--color-bg-overlay)' : 'transparent'
                                            }}
                                        >
                                            <td className="text-sm p-4" style={{ color: 'var(--color-text-secondary)' }}>{feature}</td>
                                            <td className="text-center p-4">
                                                <ComparisonCell value={free} />
                                            </td>
                                            <td className="text-center p-4">
                                                <ComparisonCell value={semester} />
                                            </td>
                                            <td className="text-center p-4">
                                                <ComparisonCell value={annual} accent />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    </div>
                </section>

                {/* Transparency Section */}
                <section className="py-16 sm:py-20" style={{
                    background: 'var(--color-surface)',
                    borderTop: '1px solid var(--color-border-default)',
                    borderBottom: '1px solid var(--color-border-default)',
                }}>
                    <div className="mx-auto max-w-3xl px-4 sm:px-6">
                        <motion.h2
                            className="text-2xl font-semibold text-center mb-8"
                            style={{
                                color: 'var(--color-text-primary)',
                                fontFamily: 'var(--font-serif)'
                            }}
                            {...motionProps}
                            variants={fadeUp}
                        >
                            À quoi sert votre abonnement ?
                        </motion.h2>
                        <motion.div className="space-y-4" {...motionProps} variants={fadeUp}>
                            {[
                                { icon: Server, title: 'Hébergement & Infrastructure', desc: 'Serveurs pour stocker et servir tout le contenu (cours, QCM, vidéos, audios) de manière rapide et sécurisée.' },
                                { icon: BookOpen, title: 'Création & Maintenance du Contenu', desc: 'Rédaction, mise à jour et amélioration continue des cours, fiches, QCM et annales corrigés.' },
                                { icon: Bot, title: 'Intelligence Artificielle', desc: "Coût des API IA pour l'assistant chatbot, la génération d'audio, et les vidéos d'introduction." },
                                { icon: Globe, title: 'Noms de Domaine & SSL', desc: 'Frais annuels pour les noms de domaine et certificats SSL pour sécuriser vos données.' },
                                { icon: Wrench, title: 'Développement & Maintenance', desc: 'Amélioration continue de la plateforme, correction de bugs, et ajout de nouvelles fonctionnalités.' },
                            ].map(({ icon: Icon, title, desc }) => (
                                <div key={title} className="p-5 rounded-xl" style={{
                                    background: 'var(--color-bg-raised)',
                                    border: '1px solid var(--color-border-default)'
                                }}>
                                    <h3 className="font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                                        <Icon className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                                        {title}
                                    </h3>
                                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{desc}</p>
                                </div>
                            ))}
                        </motion.div>

                        <p className="text-center text-sm mt-8" style={{ color: 'var(--color-text-secondary)' }}>
                            100% de votre abonnement sert à maintenir et améliorer la plateforme. Aucun profit personnel, juste une plateforme pour les étudiants par les étudiants.
                        </p>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 sm:py-20">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6">
                        <motion.h2
                            className="text-2xl font-semibold text-center mb-8"
                            style={{
                                color: 'var(--color-text-primary)',
                                fontFamily: 'var(--font-serif)'
                            }}
                            {...motionProps}
                            variants={fadeUp}
                        >
                            Questions sur les tarifs
                        </motion.h2>
                        <motion.div className="space-y-3" {...motionProps} variants={fadeUp}>
                            <PricingFAQ
                                question="C'est un abonnement ou un paiement unique ?"
                                answer="C'est un paiement unique. Tu paies une seule fois et tu as accès pendant toute la durée choisie (6 ou 12 mois). Pas de renouvellement automatique, pas de mauvaise surprise."
                            />
                            <PricingFAQ
                                question="Puis-je changer de plan plus tard ?"
                                answer="Oui. Si tu as choisi le plan semestriel et que tu souhaites passer à l'annuel, tu pourras le faire depuis ton compte. La différence de prix sera déduite."
                            />
                            <PricingFAQ
                                question="Y a-t-il un essai gratuit ?"
                                answer="Le plan gratuit te donne accès au premier chapitre de chaque matière et à des QCM de découverte. C'est le meilleur moyen de tester la plateforme avant de t'engager."
                            />
                            <PricingFAQ
                                question="Que se passe-t-il à la fin de ma période d'accès ?"
                                answer="Tu perds l'accès aux contenus premium mais tu gardes le plan gratuit. Tes données de progression sont conservées indéfiniment."
                            />
                        </motion.div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
}

function ComparisonCell({ value, accent }: { value: boolean | string; accent?: boolean }) {
    if (typeof value === 'string') {
        return (
            <span className="text-xs font-medium" style={{ color: accent ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}>
                {value}
            </span>
        );
    }
    if (value) {
        return (
            <Check className="h-4 w-4 mx-auto" style={{ color: accent ? 'var(--color-accent)' : 'var(--color-success)' }} />
        );
    }
    return (
        <X className="h-4 w-4 mx-auto" style={{ color: 'var(--color-text-muted)' }} />
    );
}

function PricingFAQ({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="rounded-xl overflow-hidden"
            style={{
                background: 'var(--color-bg-raised)',
                border: '1px solid var(--color-border-default)',
            }}
        >
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left"
                style={{ color: 'var(--color-text-primary)' }}
            >
                <span className="text-sm font-semibold pr-4">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                >
                    <ChevronDown className="h-4 w-4" style={{ color: 'var(--color-text-muted)' }} />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
