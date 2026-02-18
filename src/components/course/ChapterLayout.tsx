import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, PlayCircle, X, Clock, BookOpen } from 'lucide-react';
import { AudioPlayer } from '../audio/AudioPlayer';
import { AIChatWidget } from '../../features/ai-chat/components/AIChatWidget';
import { TableOfContents } from './TableOfContents';

interface ChapterNavLink {
    path: string;
    label: string;
    title: string;
}

interface ChapterLayoutProps {
    moduleId: 'macro' | 'micro' | 'stats' | 'socio';
    chapterNumber: string;
    title: string;
    description: string;
    estimatedTime?: string;
    introVideoUrl?: string;
    audioUrl?: string;
    audioSegmentId?: string;
    prev?: ChapterNavLink;
    next?: ChapterNavLink;
    children: React.ReactNode;
}

export function ChapterLayout({
    moduleId,
    chapterNumber,
    title,
    description,
    estimatedTime,
    introVideoUrl,
    audioUrl,
    audioSegmentId,
    prev,
    next,
    children
}: ChapterLayoutProps) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const segmentId = audioSegmentId || `${moduleId}-${chapterNumber.replace(/\s+/g, '-').toLowerCase()}`;

    useEffect(() => {
        const imgs = document.querySelectorAll('article img');
        const cleanups: Array<() => void> = [];
        const heavyImageThresholdBytes = 100 * 1024;

        const isHeavyImage = (image: HTMLImageElement) => {
            if (typeof window === 'undefined' || typeof performance === 'undefined') return false;
            const source = image.currentSrc || image.src;
            if (!source) return false;

            const entries = performance.getEntriesByName(source)
                .filter((entry) => entry.entryType === 'resource') as PerformanceResourceTiming[];
            const lastEntry = entries[entries.length - 1];
            if (!lastEntry) return false;

            const bytes =
                lastEntry.encodedBodySize
                || lastEntry.decodedBodySize
                || (lastEntry.transferSize > 0 ? lastEntry.transferSize : 0);

            return bytes > heavyImageThresholdBytes;
        };

        imgs.forEach((img) => {
            const image = img as HTMLImageElement;
            image.classList.add('chapter-content-image');
            image.classList.remove('is-loaded');
            image.classList.remove('is-heavy');
            if (!image.getAttribute('loading')) image.setAttribute('loading', 'lazy');
            if (!image.getAttribute('decoding')) image.setAttribute('decoding', 'async');
            if (!image.getAttribute('fetchpriority')) image.setAttribute('fetchpriority', 'low');

            const markLoaded = () => {
                if (isHeavyImage(image)) {
                    image.classList.add('is-heavy');
                } else {
                    image.classList.remove('is-heavy');
                }

                requestAnimationFrame(() => {
                    image.classList.add('is-loaded');
                });
            };

            if (image.complete && image.naturalWidth > 0) {
                markLoaded();
                return;
            }

            image.addEventListener('load', markLoaded, { once: true });
            image.addEventListener('error', markLoaded, { once: true });
            cleanups.push(() => {
                image.removeEventListener('load', markLoaded);
                image.removeEventListener('error', markLoaded);
            });
        });

        return () => {
            cleanups.forEach((cleanup) => cleanup());
        };
    }, [title, children]);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 pt-8">
            {/* Chapter Header */}
            <header className="mb-12">
                {/* Breadcrumb */}
                {prev && (
                    <Link
                        to={prev.path}
                        className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors no-underline group"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                        <span className="group-hover:underline">{prev.title}</span>
                    </Link>
                )}

                {/* Title block - left-aligned editorial */}
                <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-6">
                        <span
                            className="px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider"
                            style={{
                                background: 'var(--color-accent-subtle)',
                                color: 'var(--color-accent)'
                            }}
                        >
                            {chapterNumber}
                        </span>
                        {estimatedTime && (
                            <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                                <Clock className="h-3.5 w-3.5" />
                                {estimatedTime}
                            </span>
                        )}
                    </div>
                    <h1
                        className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight"
                        style={{
                            color: 'var(--color-text-primary)',
                            fontFamily: 'var(--font-serif)',
                            lineHeight: 1.1
                        }}
                    >
                        {title}
                    </h1>
                    <p
                        className="text-lg sm:text-xl leading-relaxed"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        {description}
                    </p>
                </div>
            </header>

            {/* Video intro - after title/description */}
            <div className="mb-8">
                <div
                    className="relative w-full aspect-video rounded-2xl overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, var(--color-accent-subtle), var(--color-bg-overlay))',
                        border: '1px solid var(--color-border-default)',
                        boxShadow: 'var(--shadow-md)',
                    }}
                >
                    {isVideoPlaying && introVideoUrl ? (
                        <>
                            <iframe
                                src={introVideoUrl}
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                            <button
                                onClick={() => setIsVideoPlaying(false)}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
                                style={{ background: 'color-mix(in srgb, var(--color-text-primary) 75%, transparent)', color: 'var(--color-bg-raised)' }}
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsVideoPlaying(true)}
                            className="absolute inset-0 flex flex-col items-center justify-center gap-4 group cursor-pointer"
                        >
                            {/* Glow effect */}
                            <div
                                className="absolute inset-0 opacity-40"
                                style={{
                                    background: 'radial-gradient(circle at center, var(--color-accent-subtle), transparent 70%)',
                                }}
                            />

                            {/* Play button */}
                            <div
                                className="relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                style={{
                                    background: 'var(--color-accent)',
                                    boxShadow: '0 8px 32px color-mix(in srgb, var(--color-accent) 30%, transparent)',
                                }}
                            >
                                <PlayCircle className="h-12 w-12 text-[var(--color-bg-raised)]" />
                            </div>

                            {/* Text */}
                            <div className="relative text-center">
                                <p className="text-base font-semibold mb-1.5" style={{ color: 'var(--color-text-primary)' }}>
                                    Introduction au chapitre
                                </p>
                                <div
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                                    style={{
                                        background: 'var(--color-bg-overlay)',
                                        color: 'var(--color-text-muted)',
                                        border: '1px solid var(--color-border-default)',
                                    }}
                                >
                                    <BookOpen className="h-3.5 w-3.5" />
                                    NotebookLM · 3 min
                                </div>
                            </div>
                        </button>
                    )}
                </div>
            </div>

            {/* Audio player */}
            <div className="mb-10">
                <AudioPlayer
                    audioUrl={audioUrl}
                    segmentId={segmentId}
                />
            </div>

            {/* Chapter content */}
            <article
                className="prose-custom max-w-3xl"
                style={{
                    fontSize: '17px',
                    lineHeight: 1.7,
                    color: 'var(--color-text-primary)'
                }}
            >
                {children}
            </article>

            {/* Floating Table of Contents (right side, xl+ only) */}
            <TableOfContents />

            {/* Chapter navigation */}
            <nav className="mt-12 pt-8 border-t flex items-center justify-between" style={{ borderColor: 'rgb(var(--border))' }}>
                {prev ? (
                    <Link
                        to={prev.path}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl border transition-all hover:shadow-md no-underline group"
                        style={{ background: 'rgb(var(--surface-1))', borderColor: 'rgb(var(--border))' }}
                    >
                        <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" style={{ color: 'rgb(var(--text-muted))' }} />
                        <div>
                            <div className="text-xs" style={{ color: 'rgb(var(--text-muted))' }}>{prev.label}</div>
                            <div className="text-sm font-medium" style={{ color: 'rgb(var(--text))' }}>{prev.title}</div>
                        </div>
                    </Link>
                ) : <div />}

                {next && (
                    <Link
                        to={next.path}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl border transition-all hover:shadow-md no-underline group"
                        style={{ background: 'rgb(var(--surface-1))', borderColor: 'rgb(var(--border))' }}
                    >
                        <div className="text-right">
                            <div className="text-xs" style={{ color: 'rgb(var(--text-muted))' }}>{next.label}</div>
                            <div className="text-sm font-medium" style={{ color: 'rgb(var(--text))' }}>{next.title}</div>
                        </div>
                        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" style={{ color: 'rgb(var(--text-muted))' }} />
                    </Link>
                )}
            </nav>

            {/* AI Chat Widget */}
            <AIChatWidget />
        </div>
    );
}
