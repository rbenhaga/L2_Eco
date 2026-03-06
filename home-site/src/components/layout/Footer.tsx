import { Coffee } from "lucide-react";

type FooterProps = {
    className?: string;
};

const SITE_NAME = "Oikonomia";

export function Footer({ className }: FooterProps) {
    const footerClassName = className ?? "mt-12 sm:mt-20 border-t";

    return (
        <footer
            className={footerClassName}
            style={{
                background: 'var(--color-surface-raised)',
                borderColor: 'var(--color-border-default)',
            }}
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="py-5 sm:py-6 border-t" style={{ borderColor: 'var(--color-border-default)' }}>
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4">
                        {[
                            { name: 'Mentions légales', href: '/legal' },
                            { name: 'Confidentialité', href: '/privacy' },
                            { name: 'CGU', href: '/terms' },
                            { name: 'Contact', href: '/contact' },
                            { name: 'FAQ', href: '/faq' },
                        ].map((link, i) => (
                            <span key={link.href} className="flex items-center gap-3 sm:gap-4">
                                <a
                                    href={link.href}
                                    className="text-xs sm:text-sm transition-colors"
                                    style={{ color: 'var(--color-text-muted)' }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
                                >
                                    {link.name}
                                </a>
                                {i < 4 && <span style={{ color: 'var(--color-border-strong)' }}>·</span>}
                            </span>
                        ))}
                    </div>

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
