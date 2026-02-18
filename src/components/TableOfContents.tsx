import { useState, useEffect, useCallback } from 'react';
import { List, X } from 'lucide-react';

export interface TocItem {
    id: string;
    label: string;
    level: number; // 1 = section, 2 = subsection
}

interface TableOfContentsProps {
    items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    // Scroll-spy: track which section is visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                }
            },
            {
                rootMargin: '-80px 0px -70% 0px',
                threshold: 0,
            }
        );

        for (const item of items) {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        }

        return () => observer.disconnect();
    }, [items]);

    const handleClick = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveId(id);
            setIsOpen(false);
        }
    }, []);

    const tocContent = (
        <nav className="space-y-0.5">
            <p
                className="text-[11px] font-semibold uppercase tracking-widest mb-3 px-3"
                style={{ color: 'var(--color-text-muted)' }}
            >
                Table des matières
            </p>
            {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => handleClick(item.id)}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-[13px] leading-snug transition-all duration-150"
                        style={{
                            paddingLeft: item.level === 2 ? '24px' : '12px',
                            color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                            background: isActive ? 'var(--color-accent-subtle)' : 'transparent',
                            fontWeight: isActive ? 600 : item.level === 1 ? 500 : 400,
                            borderLeft: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
                        }}
                    >
                        {item.label}
                    </button>
                );
            })}
        </nav>
    );

    return (
        <>
            {/* Desktop: Sticky sidebar */}
            <aside
                className="hidden xl:block shrink-0"
                style={{ width: '260px' }}
            >
                <div
                    className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 pb-8"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'var(--color-border-default) transparent',
                    }}
                >
                    {tocContent}
                </div>
            </aside>

            {/* Mobile: Floating button + overlay */}
            <div className="xl:hidden">
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90"
                    style={{
                        background: 'var(--color-accent)',
                        color: 'var(--color-bg-raised)',
                    }}
                    aria-label="Table des matières"
                >
                    <List className="w-5 h-5" />
                </button>

                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />
                        {/* Panel */}
                        <div
                            className="fixed right-0 top-0 bottom-0 z-50 w-80 max-w-[85vw] p-6 overflow-y-auto shadow-2xl"
                            style={{ background: 'var(--color-bg-primary)' }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3
                                    className="font-semibold text-base"
                                    style={{ color: 'var(--color-text-primary)' }}
                                >
                                    Navigation
                                </h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{
                                        background: 'var(--color-bg-overlay)',
                                        color: 'var(--color-text-secondary)',
                                    }}
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            {tocContent}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
