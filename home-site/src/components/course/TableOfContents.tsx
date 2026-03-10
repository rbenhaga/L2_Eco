/**
 * TableOfContents - Floating TOC with clear hierarchy.
 * Desktop: fixed rail on the right.
 * Mobile: bottom sheet opened from a dedicated safe-area button.
 */

import { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { AlignLeft, X } from 'lucide-react';

interface TOCItem {
    id: string;
    title: string;
    level: number; // 1 = main section, 2 = subsection, 3 = sub-subsection
}

function slugify(value: string): string {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
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
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            const scope = document.querySelector('article')
                ?? document.querySelector('.course-paper')
                ?? document.querySelector('main');
            const sections = scope?.querySelectorAll('section[data-section-title]') ?? [];
            const tocItems: TOCItem[] = [];
            const seenIds = new Set<string>();

            sections.forEach((section, sectionIndex) => {
                const id = section.id;
                const title = section.getAttribute('data-section-title') || '';
                const rawLevel = section.getAttribute('data-section-level');
                const explicitLevel = rawLevel ? Number(rawLevel) : NaN;
                const sectionLevel = Number.isFinite(explicitLevel)
                    ? Math.max(1, Math.min(3, explicitLevel))
                    : detectLevel(title);

                if (id && title && !seenIds.has(id)) {
                    tocItems.push({ id, title, level: sectionLevel });
                    seenIds.add(id);
                }

                const subHeadings = section.querySelectorAll('h3, h4');

                subHeadings.forEach((heading, headingIndex) => {
                    const text = heading.textContent?.trim() || '';
                    if (!text) return;

                    const headingEl = heading as HTMLElement;
                    if (!headingEl.id) {
                        const generatedId = `${id || `section-${sectionIndex + 1}`}-${slugify(text) || `part-${headingIndex + 1}`}`;
                        headingEl.id = generatedId;
                    }

                    if (seenIds.has(headingEl.id) || text === title) return;

                    const headingLevel = heading.tagName === 'H3'
                        ? Math.min(sectionLevel + 1, 2)
                        : 3;

                    tocItems.push({
                        id: headingEl.id,
                        title: text,
                        level: headingLevel,
                    });
                    seenIds.add(headingEl.id);
                });
            });

            const nestedSections = scope?.querySelectorAll('section[id]:not([data-section-title])') ?? [];
            nestedSections.forEach((section, nestedIndex) => {
                const sectionEl = section as HTMLElement;
                const firstHeading = sectionEl.querySelector('h3, h4');
                const text = firstHeading?.textContent?.trim() || '';

                if (!sectionEl.id || !text || seenIds.has(sectionEl.id)) {
                    return;
                }

                const level = firstHeading?.tagName === 'H3' ? 2 : 3;
                tocItems.push({
                    id: sectionEl.id || `nested-section-${nestedIndex + 1}`,
                    title: text,
                    level,
                });
                seenIds.add(sectionEl.id);
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
        setIsMobileOpen(false);
    }, []);

    if (items.length === 0) return null;

    const renderItems = () => (
        <nav>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {items.map(item => {
                    const isActive = activeId === item.id;
                    const isPrimary = item.level === 1;
                    const isSecondary = item.level === 2;
                    const indent = isPrimary ? 12 : isSecondary ? 28 : 42;
                    const fontSize = isPrimary ? '13px' : isSecondary ? '12px' : '11px';
                    const lineHeight = isPrimary ? 1.45 : 1.4;
                    const fontWeight = isActive ? 600 : isPrimary ? 600 : isSecondary ? 500 : 450;
                    const dotSize = isPrimary ? '6px' : item.level === 3 ? '3.5px' : '4px';
                    const itemSpacing = isPrimary ? '7px' : '2px';
                    const borderLeftColor = isPrimary
                        ? 'transparent'
                        : isActive
                            ? 'color-mix(in srgb, var(--color-accent) 18%, transparent)'
                            : 'color-mix(in srgb, var(--color-border-subtle) 78%, transparent)';
                    const textColor = isActive
                        ? 'var(--color-accent)'
                        : isPrimary
                            ? 'var(--color-text-primary)'
                            : item.level === 3
                                ? 'var(--color-text-muted)'
                                : 'var(--color-text-secondary)';

                    return (
                        <li
                            key={item.id}
                            style={{
                                marginBottom: itemSpacing,
                                position: 'relative',
                            }}
                        >
                            <button
                                onClick={() => handleClick(item.id)}
                                style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: `7px 10px 7px ${indent + 8}px`,
                                    borderRadius: '8px',
                                    fontSize,
                                    lineHeight,
                                    color: textColor,
                                    fontWeight,
                                    background: isActive ? 'var(--color-accent-subtle)' : 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 180ms ease',
                                    position: 'relative',
                                    borderLeft: isPrimary ? 'none' : `1px solid ${borderLeftColor}`,
                                    opacity: isPrimary ? 1 : item.level === 3 ? 0.9 : 0.96,
                                }}
                                onMouseEnter={e => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = 'var(--color-bg-overlay)';
                                        e.currentTarget.style.color = isPrimary ? 'var(--color-text-primary)' : 'var(--color-text-secondary)';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = textColor;
                                    }
                                }}
                            >
                                <span
                                    style={{
                                        position: 'absolute',
                                        left: `${indent - 2}px`,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: dotSize,
                                        height: dotSize,
                                        borderRadius: '9999px',
                                        background: isActive
                                            ? 'var(--color-accent)'
                                            : isPrimary
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
    );

    const tocUI = (
        <>
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
                        boxShadow: 'var(--shadow-md)',
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
                                    padding: '12px 10px 14px',
                                    maxHeight: 'calc(70vh - 54px)',
                                    overflowY: 'auto',
                                }}
                            >
                                {renderItems()}
                            </div>
                        </>
                    )}
                </div>
            </aside>

            <button
                type="button"
                onClick={() => setIsMobileOpen(true)}
                className="xl:hidden fixed left-4 z-[70] inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold"
                style={{
                    bottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)',
                    background: 'var(--color-bg-raised)',
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--color-border-default)',
                    boxShadow: 'var(--shadow-lg)',
                }}
                aria-label="Ouvrir le sommaire"
            >
                <AlignLeft className="h-4 w-4" />
                Sommaire
            </button>

            {isMobileOpen && (
                <>
                    <div
                        className="xl:hidden fixed inset-0 z-[78]"
                        style={{ background: 'color-mix(in srgb, var(--color-text-primary) 18%, transparent)' }}
                        onClick={() => setIsMobileOpen(false)}
                    />
                    <div
                        className="xl:hidden fixed inset-x-0 z-[79] rounded-t-[28px]"
                        style={{
                            bottom: 0,
                            background: 'var(--color-bg-raised)',
                            borderTop: '1px solid var(--color-border-default)',
                            boxShadow: 'var(--shadow-xl)',
                            maxHeight: 'min(72vh, 640px)',
                            paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)',
                        }}
                    >
                        <div
                            className="flex items-center justify-between px-5 pb-3 pt-4"
                            style={{ borderBottom: '1px solid var(--color-border-default)' }}
                        >
                            <div className="flex items-center gap-2">
                                <AlignLeft className="h-4 w-4" style={{ color: 'var(--color-text-muted)' }} />
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
                            <button
                                type="button"
                                onClick={() => setIsMobileOpen(false)}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full"
                                style={{ color: 'var(--color-text-secondary)', background: 'var(--color-bg-overlay)' }}
                                aria-label="Fermer le sommaire"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div
                            className="overflow-y-auto px-3 pb-2 pt-3"
                            style={{ maxHeight: 'calc(min(72vh, 640px) - 72px)' }}
                        >
                            {renderItems()}
                        </div>
                    </div>
                </>
            )}
        </>
    );

    if (typeof document === 'undefined') {
        return null;
    }

    return createPortal(tocUI, document.body);
}
