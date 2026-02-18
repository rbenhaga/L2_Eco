/**
 * TableOfContents - Floating TOC with clear hierarchy.
 * Fixed on right side (xl+), with visual levels and active state.
 */

import { useEffect, useState, useRef, useCallback } from 'react';
import { AlignLeft } from 'lucide-react';

interface TOCItem {
    id: string;
    title: string;
    level: number; // 1 = main section, 2 = subsection, 3 = sub-subsection
}

function detectLevel(title: string): number {
    const trimmed = title.trim();
    if (/^\d+\.\d+\.\d+(?:\s|$)/.test(trimmed)) return 3;
    if (/^\d+\.\d+(?:\s|$)/.test(trimmed)) return 2;
    if (/^\d+(?:[.)])?\s/.test(trimmed)) return 1;
    if (/^[IVXLCDM]+\.\s/i.test(trimmed)) return 1;
    return 1;
}

export function TableOfContents() {
    const [items, setItems] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const [isHovered, setIsHovered] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            const sections = document.querySelectorAll('section[data-section-title]');
            const tocItems: TOCItem[] = [];

            sections.forEach(section => {
                const id = section.id;
                const title = section.getAttribute('data-section-title') || '';
                const rawLevel = section.getAttribute('data-section-level');
                const explicitLevel = rawLevel ? Number(rawLevel) : NaN;
                const level = Number.isFinite(explicitLevel)
                    ? Math.max(1, Math.min(3, explicitLevel))
                    : detectLevel(title);

                if (id && title) {
                    tocItems.push({ id, title, level });
                }
            });

            setItems(tocItems);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (items.length === 0) return;

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        const visibleSections = new Map<string, number>();

        observerRef.current = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        visibleSections.set(entry.target.id, entry.intersectionRatio);
                    } else {
                        visibleSections.delete(entry.target.id);
                    }
                });

                if (visibleSections.size > 0) {
                    let bestId = '';
                    let bestRatio = 0;
                    visibleSections.forEach((ratio, id) => {
                        if (ratio > bestRatio) {
                            bestRatio = ratio;
                            bestId = id;
                        }
                    });

                    if (bestId) setActiveId(bestId);
                }
            },
            {
                rootMargin: '-80px 0px -40% 0px',
                threshold: [0, 0.25, 0.5, 0.75, 1],
            }
        );

        items.forEach(item => {
            const el = document.getElementById(item.id);
            if (el) observerRef.current?.observe(el);
        });

        return () => {
            observerRef.current?.disconnect();
        };
    }, [items]);

    const handleClick = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    if (items.length === 0) return null;

    return (
        <aside
            className="hidden xl:block"
            style={{
                position: 'fixed',
                top: '104px',
                right: '20px',
                width: isHovered ? '280px' : '48px',
                zIndex: 50,
                transition: 'width 220ms ease',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                style={{
                    background: 'var(--color-bg-raised)',
                    borderRadius: '14px',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--color-border-default)',
                    maxHeight: '70vh',
                    overflow: 'hidden',
                }}
            >
                {!isHovered && (
                    <div
                        style={{
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        <AlignLeft style={{ width: '18px', height: '18px', color: 'var(--color-text-muted)' }} />
                    </div>
                )}

                {isHovered && (
                    <>
                        <div
                            style={{
                                padding: '16px 16px 12px',
                                borderBottom: '1px solid var(--color-border-default)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <AlignLeft style={{ width: '14px', height: '14px', color: 'var(--color-text-muted)' }} />
                                <span
                                    style={{
                                        fontSize: '11px',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em',
                                        color: 'var(--color-text-muted)',
                                    }}
                                >
                                    Sommaire
                                </span>
                            </div>
                            <span
                                style={{
                                    fontSize: '11px',
                                    padding: '2px 8px',
                                    borderRadius: '9999px',
                                    background: 'var(--color-bg-overlay)',
                                    color: 'var(--color-text-muted)',
                                    border: '1px solid var(--color-border-default)',
                                }}
                            >
                                {items.length}
                            </span>
                        </div>

                        <div
                            style={{
                                padding: '10px 10px 12px',
                                maxHeight: 'calc(70vh - 54px)',
                                overflowY: 'auto',
                            }}
                        >
                            <nav>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {items.map(item => {
                                        const isActive = activeId === item.id;
                                        const indent = item.level === 1 ? 8 : item.level === 2 ? 22 : 36;
                                        const fontSize = item.level === 1 ? '13px' : '12px';
                                        const lineHeight = item.level === 1 ? 1.45 : 1.4;
                                        const fontWeight = isActive ? 600 : item.level === 1 ? 600 : 500;

                                        return (
                                            <li key={item.id} style={{ marginBottom: '2px', position: 'relative' }}>
                                                <button
                                                    onClick={() => handleClick(item.id)}
                                                    style={{
                                                        width: '100%',
                                                        textAlign: 'left',
                                                        padding: `8px 10px 8px ${indent + 8}px`,
                                                        borderRadius: '8px',
                                                        fontSize,
                                                        lineHeight,
                                                        color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                                        fontWeight,
                                                        background: isActive ? 'var(--color-accent-subtle)' : 'transparent',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        transition: 'all 180ms ease',
                                                        position: 'relative',
                                                    }}
                                                    onMouseEnter={e => {
                                                        if (!isActive) {
                                                            e.currentTarget.style.background = 'var(--color-bg-overlay)';
                                                            e.currentTarget.style.color = 'var(--color-text-primary)';
                                                        }
                                                    }}
                                                    onMouseLeave={e => {
                                                        if (!isActive) {
                                                            e.currentTarget.style.background = 'transparent';
                                                            e.currentTarget.style.color = 'var(--color-text-secondary)';
                                                        }
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            position: 'absolute',
                                                            left: `${indent - 2}px`,
                                                            top: '50%',
                                                            transform: 'translateY(-50%)',
                                                            width: item.level === 1 ? '6px' : '4px',
                                                            height: item.level === 1 ? '6px' : '4px',
                                                            borderRadius: '9999px',
                                                            background: isActive
                                                                ? 'var(--color-accent)'
                                                                : item.level === 1
                                                                    ? 'var(--color-border-strong)'
                                                                    : 'var(--color-border-default)',
                                                        }}
                                                    />
                                                    <span>{item.title}</span>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                        </div>
                    </>
                )}
            </div>
        </aside>
    );
}
