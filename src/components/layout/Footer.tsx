import { ArrowRight, Coffee, GraduationCap } from "lucide-react";

const SITE_NAME = "Οἰκονομία";

export function Footer() {
    return (
        <footer
            className="mt-12 sm:mt-20 border-t"
            style={{
                background: 'var(--color-surface-raised)',
                borderColor: 'var(--color-border-default)',
            }}
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                {/* Main footer content */}
                <div className="py-10 sm:py-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-4">
                        <div className="flex items-center gap-2 sm:gap-2.5 mb-4 sm:mb-5">
                            <GraduationCap className="h-7 w-7 sm:h-9 sm:w-9" style={{ color: 'var(--color-accent)' }} />
                            <span className="text-lg sm:text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>{SITE_NAME}</span>
                        </div>
                        <p className="text-sm sm:text-[15px] leading-relaxed max-w-[30ch]" style={{ color: 'var(--color-text-secondary)' }}>
                            Fiches de synthèse et QCM pour réussir ta licence d'économie à Richter.
                        </p>
                        <a
                            href="/#programme"
                            className="mt-4 sm:mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors"
                            style={{ color: 'var(--color-text-secondary)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                        >
                            Voir le programme
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>

                    {/* Programme */}
                    <div className="col-span-1 md:col-span-2">
                        <h4 className="text-xs sm:text-sm font-semibold mb-4 sm:mb-5" style={{ color: 'var(--color-text-primary)' }}>Programme</h4>
                        <ul className="space-y-2 sm:space-y-3">
                            <li><span className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>L1 · Bientôt</span></li>
                            <li>
                                <a href="/#programme" className="text-xs sm:text-sm transition-colors" style={{ color: 'var(--color-text-secondary)' }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                                >Licence 2</a>
                            </li>
                            <li><span className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>L3 · Bientôt</span></li>
                        </ul>
                    </div>

                    {/* Semestre 3 */}
                    <div className="col-span-1 md:col-span-3">
                        <h4 className="text-xs sm:text-sm font-semibold mb-4 sm:mb-5" style={{ color: 'var(--color-text-primary)' }}>Semestre 3</h4>
                        <ul className="space-y-2 sm:space-y-3">
                            {[
                                { name: 'Microéconomie', href: '/s3/micro' },
                                { name: 'Macroéconomie', href: '/s3/macro' },
                                { name: 'Statistiques', href: '/s3/stats' },
                                { name: 'Sociologie', href: '/s3/socio' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} className="text-xs sm:text-sm transition-colors" style={{ color: 'var(--color-text-secondary)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                                    >{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Semestre 4 */}
                    <div className="col-span-1 md:col-span-3">
                        <h4 className="text-xs sm:text-sm font-semibold mb-4 sm:mb-5" style={{ color: 'var(--color-text-primary)' }}>Semestre 4</h4>
                        <ul className="space-y-2 sm:space-y-3">
                            {[
                                { name: 'Microéconomie', href: '/s4/micro' },
                                { name: 'Macroéconomie', href: '/s4/macro' },
                                { name: 'Statistiques', href: '/s4/stats' },
                                { name: 'Management', href: '/s4/management' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} className="text-xs sm:text-sm transition-colors" style={{ color: 'var(--color-text-secondary)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                                    >{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="py-5 sm:py-6 border-t" style={{ borderColor: 'var(--color-border-default)' }}>
                    {/* Legal Links */}
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4">
                        {[
                            { name: 'Mentions légales', href: '/legal' },
                            { name: 'Confidentialité', href: '/privacy' },
                            { name: 'CGU', href: '/terms' },
                            { name: 'Contact', href: '/contact' },
                            { name: 'FAQ', href: '/faq' },
                        ].map((link, i) => (
                            <span key={link.href} className="flex items-center gap-3 sm:gap-4">
                                <a href={link.href} className="text-xs sm:text-sm transition-colors" style={{ color: 'var(--color-text-muted)' }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
                                >{link.name}</a>
                                {i < 4 && <span style={{ color: 'var(--color-border-strong)' }}>·</span>}
                            </span>
                        ))}
                    </div>

                    {/* Copyright */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                        <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
                            © 2026 {SITE_NAME}
                        </p>
                        <p className="text-xs sm:text-sm inline-flex items-center gap-1.5 sm:gap-2" style={{ color: 'var(--color-text-muted)' }}>
                            Fait avec <Coffee className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: 'var(--color-warning)' }} /> pour les étudiants de Richter
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
