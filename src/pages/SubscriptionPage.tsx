import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowLeft, Loader2, Sparkles, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BackgroundBlobs } from '../components/layout/BackgroundBlobs';
import { createCheckoutSession, createCustomerPortalSession } from '../services/api';

export function SubscriptionPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Check URL params for success/cancel
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('success') === 'true') {
            // Payment successful! Refresh to update subscription
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        }
    }, []);

    const handleUpgrade = async (_tier: 'premium') => {
        if (!user) {
            setError('Vous devez être connecté pour vous abonner');
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            // Create Stripe Checkout Session via backend and redirect
            const { url } = await createCheckoutSession(user.uid);

            if (url) {
                // Redirect to Stripe Checkout page
                window.location.href = url;
            } else {
                throw new Error('URL de paiement non reçue');
            }

        } catch (err) {
            console.error('Upgrade error:', err);
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
            setIsProcessing(false);
        }
    };

    const handleManageSubscription = async () => {
        if (!user) return;

        setIsProcessing(true);
        try {
            const { url } = await createCustomerPortalSession(user.uid);
            window.location.href = url;
        } catch (err) {
            console.error('Portal error:', err);
            setError('Impossible d\'accéder au portail client');
            setIsProcessing(false);
        }
    };

    const currentTier = user?.subscriptionTier || 'free';

    return (
        <div className="min-h-screen relative overflow-hidden" data-theme="light">
            <BackgroundBlobs />

            <div className="relative z-10 min-h-screen px-6 py-12">
                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Retour
                </button>

                {/* Error message */}
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <div className="max-w-[896px] mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 text-white mb-6"
                        >
                            <Sparkles size={32} />
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4"
                        >
                            Passez à Premium
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-slate-600 dark:text-slate-400"
                        >
                            Débloquez tous les cours et maximisez vos révisions
                        </motion.p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {/* Free Tier */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="relative p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md"
                        >
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                                    Gratuit
                                </h3>
                                <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                                    0€
                                    <span className="text-base font-normal text-slate-600 dark:text-slate-400">/mois</span>
                                </p>
                            </div>

                            <ul className="space-y-3 mb-6">
                                {[
                                    'Accès à 1-2 cours',
                                    '1 QCM d\'entraînement',
                                    'Contenu limité',
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <Check size={18} className="text-slate-400 shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {currentTier === 'free' && (
                                <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-center">
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                        Formule actuelle
                                    </span>
                                </div>
                            )}
                        </motion.div>

                        {/* Premium Tier */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="relative p-8 rounded-3xl border-2 border-indigo-500/50 bg-linear-to-br from-white via-indigo-50/30 to-violet-50/20 dark:from-slate-900 dark:via-indigo-950/30 dark:to-violet-950/20 backdrop-blur-md shadow-xl"
                        >
                            {/* Popular badge */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-linear-to-r from-indigo-500 to-violet-600 text-white text-xs font-semibold">
                                Le plus populaire
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                                        Premium
                                    </h3>
                                    <Zap size={20} className="text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                                    9€
                                    <span className="text-base font-normal text-slate-600 dark:text-slate-400">/mois</span>
                                </p>
                            </div>

                            <ul className="space-y-3 mb-6">
                                {[
                                    'Accès illimité à tous les cours',
                                    'QCM et exercices corrigés',
                                    'Simulations d\'examen',
                                    'Nouvelles fiches chaque semaine',
                                    'Support prioritaire',
                                    'Contenu protégé et sécurisé',
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <Check size={18} className="text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                                        <span className="font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => currentTier === 'premium' ? handleManageSubscription() : handleUpgrade('premium')}
                                disabled={isProcessing}
                                className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed ${currentTier === 'premium'
                                    ? 'bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600'
                                    : 'bg-linear-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700'
                                    }`}
                            >
                                {isProcessing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="animate-spin h-5 w-5" />
                                        Traitement...
                                    </span>
                                ) : currentTier === 'premium' ? (
                                    'Gérer mon abonnement'
                                ) : (
                                    'Passer à Premium'
                                )}
                            </button>

                            <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
                                Essai gratuit de 7 jours • Sans engagement
                            </p>
                        </motion.div>
                    </div>

                    {/* FAQ/Trust Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="p-6 rounded-2xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-white/10"
                    >
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">
                            Note : Paiement Stripe
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                            L'intégration Stripe sera configurée prochainement. Pour le moment, ceci est une démo fonctionnelle.
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Le système de paywall et de protection du contenu est pleinement opérationnel et prêt pour la production.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div >
    );
}
