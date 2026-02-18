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
    { icon: Zap, text: 'QCM illimit\u00e9s' },
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
                        className="relative overflow-hidden rounded-3xl border border-white/20"
                        style={{
                            background: 'linear-gradient(to bottom right, var(--color-text-primary), color-mix(in srgb, var(--color-text-primary) 85%, var(--color-bg-base)), var(--color-text-primary))',
                            boxShadow: 'var(--shadow-xl)',
                        }}
                    >
                        {/* Decorative gradient orbs */}
                        <div
                            className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl"
                            style={{ background: 'color-mix(in srgb, var(--color-accent) 30%, transparent)' }}
                        />
                        <div
                            className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-3xl"
                            style={{ background: 'color-mix(in srgb, var(--callout-formula-text) 20%, transparent)' }}
                        />

                        <div className="relative px-8 py-10 sm:px-12 sm:py-14">
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                                className="flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                                style={{
                                    background: 'linear-gradient(to bottom right, var(--color-accent), var(--callout-formula-text))',
                                    color: 'var(--color-accent-foreground)',
                                    boxShadow: '0 8px 24px color-mix(in srgb, var(--color-accent) 25%, transparent)',
                                }}
                            >
                                <Sparkles size={28} />
                            </motion.div>

                            {/* Headline */}
                            <h2
                                className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight"
                                style={{ color: 'var(--color-accent-foreground)' }}
                            >
                                D\u00e9bloquer {contentTitle}
                            </h2>

                            <p className="text-lg mb-8 max-w-md" style={{ color: 'var(--color-text-muted)' }}>
                                Acc\u00e8de \u00e0 l'int\u00e9gralit\u00e9 du contenu et pr\u00e9pare tes examens sereinement.
                            </p>

                            {/* Benefit pills */}
                            <div className="flex flex-wrap gap-3 mb-10">
                                {benefits.map((benefit, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-white/10"
                                        style={{
                                            background: 'color-mix(in srgb, var(--color-bg-raised) 10%, transparent)',
                                            color: 'color-mix(in srgb, var(--color-bg-raised) 90%, transparent)',
                                        }}
                                    >
                                        <benefit.icon size={16} style={{ color: 'color-mix(in srgb, var(--color-accent) 70%, white)' }} />
                                        <span>{benefit.text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate('/pricing')}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
                                    style={{
                                        background: 'linear-gradient(to right, var(--color-accent), var(--callout-formula-text), var(--callout-formula-text))',
                                        color: 'var(--color-accent-foreground)',
                                        boxShadow: '0 8px 24px color-mix(in srgb, var(--color-accent) 30%, transparent)',
                                    }}
                                >
                                    <span>Passer \u00e0 Premium</span>
                                    <ArrowRight size={18} />
                                </motion.button>

                                <button
                                    onClick={() => navigate('/pricing')}
                                    className="text-sm transition-colors"
                                    style={{ color: 'var(--color-text-muted)' }}
                                >
                                    Voir les offres \u2192
                                </button>
                            </div>

                            {/* Trust badge */}
                            <p className="mt-6 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                Essai gratuit 7 jours \u2022 Annulation facile \u2022 Support r\u00e9actif
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
