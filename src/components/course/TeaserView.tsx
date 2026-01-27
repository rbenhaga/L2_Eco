/**
 * TeaserView Component
 * 
 * Shows a preview of premium content with a fade-out gradient and
 * a sticky premium upsell banner. Apple Keynote-inspired design.
 * Content is visible but not interactable - user must upgrade to continue.
 */

import { motion } from 'framer-motion';
import { Sparkles, Zap, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TeaserViewProps {
    children: React.ReactNode;
    contentTitle?: string;
}

const benefits = [
    { icon: BookOpen, text: 'Tous les cours' },
    { icon: Zap, text: 'QCM illimités' },
    { icon: GraduationCap, text: 'Simulations d\'examen' },
];

export function TeaserView({ children, contentTitle = 'ce contenu' }: TeaserViewProps) {
    const navigate = useNavigate();

    return (
        <div className="relative">
            {/* Content preview - visible but not interactive */}
            <div className="relative max-h-[50vh] overflow-hidden pointer-events-none select-none">
                {children}

                {/* Gradient fade overlay */}
                <div
                    className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
                    style={{
                        background: 'linear-gradient(to bottom, transparent 0%, var(--color-background) 100%)'
                    }}
                />
            </div>

            {/* Premium Upsell Banner - Apple Keynote style */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-20 -mt-8"
            >
                <div className="max-w-2xl mx-auto px-6">
                    <div
                        className="relative overflow-hidden rounded-3xl border border-white/20 
                                   bg-linear-to-br from-slate-900 via-slate-800 to-slate-900
                                  
                                   shadow-2xl"
                    >
                        {/* Decorative gradient orbs */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl" />

                        <div className="relative px-8 py-10 sm:px-12 sm:py-14">
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                                className="flex items-center justify-center w-16 h-16 rounded-2xl 
                                           bg-linear-to-br from-indigo-500 to-violet-600 
                                           text-white mb-6 shadow-lg shadow-indigo-500/25"
                            >
                                <Sparkles size={28} />
                            </motion.div>

                            {/* Headline */}
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                                Débloquer {contentTitle}
                            </h2>

                            <p className="text-slate-400 text-lg mb-8 max-w-md">
                                Accède à l'intégralité du contenu et prépare tes examens sereinement.
                            </p>

                            {/* Benefit pills */}
                            <div className="flex flex-wrap gap-3 mb-10">
                                {benefits.map((benefit, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full 
                                                   bg-white/10 text-white/90 text-sm font-medium
                                                   border border-white/10"
                                    >
                                        <benefit.icon size={16} className="text-indigo-400" />
                                        <span>{benefit.text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate('/subscription')}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                                               px-8 py-4 rounded-xl font-semibold text-white
                                               bg-linear-to-r from-indigo-500 via-violet-500 to-purple-500
                                               hover:from-indigo-600 hover:via-violet-600 hover:to-purple-600
                                               shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40
                                               transition-all duration-200"
                                >
                                    <span>Passer à Premium</span>
                                    <ArrowRight size={18} />
                                </motion.button>

                                <button
                                    onClick={() => navigate('/subscription')}
                                    className="text-sm text-slate-400 hover:text-white transition-colors"
                                >
                                    Voir les offres →
                                </button>
                            </div>

                            {/* Trust badge */}
                            <p className="mt-6 text-xs text-slate-500">
                                Essai gratuit 7 jours • Annulation facile • Support réactif
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
