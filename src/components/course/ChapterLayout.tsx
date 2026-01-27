import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, PlayCircle, X, Clock, BookOpen } from 'lucide-react';
import { AudioPlayer } from '../audio/AudioPlayer';
import { AIChatWidget } from '../../features/ai-chat/components/AIChatWidget';

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

    return (
        <div className="max-w-4xl mx-auto px-6 pb-16">
            {/* Chapter Header */}
            <header className="pt-6 mb-8">
                {/* Breadcrumb - aligned left */}
                {prev && (
                    <Link 
                        to={prev.path} 
                        className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors no-underline group"
                        style={{ color: 'rgb(var(--text-muted))' }}
                    >
                        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                        <span className="group-hover:underline">{prev.title}</span>
                    </Link>
                )}

                {/* Title block - centered */}
                <div className="mb-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgb(var(--accent) / 0.1)', color: 'rgb(var(--accent))' }}>
                            {chapterNumber}
                        </span>
                        {estimatedTime && (
                            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'rgb(var(--text-muted))' }}>
                                <Clock className="h-3.5 w-3.5" />
                                {estimatedTime}
                            </span>
                        )}
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4" style={{ color: 'rgb(var(--text))' }}>
                        {title}
                    </h1>
                    <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-left" style={{ color: 'rgb(var(--text-secondary))' }}>
                        {description}
                    </p>
                </div>
            </header>

            {/* Video intro - after title/description */}
            <div className="mb-8">
                <div 
                    className="relative w-full aspect-video rounded-2xl overflow-hidden border"
                    style={{ 
                        background: 'linear-gradient(135deg, rgb(var(--accent) / 0.04), rgb(var(--accent) / 0.01))',
                        borderColor: 'rgb(var(--border))',
                        boxShadow: '0 4px 20px rgba(var(--accent-rgb), 0.1)'
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
                                style={{ background: 'rgba(0,0,0,0.75)', color: 'white' }}
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
                                    background: 'radial-gradient(circle at center, rgb(var(--accent) / 0.15), transparent 70%)'
                                }}
                            />
                            
                            {/* Play button */}
                            <div 
                                className="relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110" 
                                style={{ 
                                    background: 'rgb(var(--accent))', 
                                    boxShadow: '0 8px 32px rgba(var(--accent-rgb), 0.4), 0 0 0 0 rgba(var(--accent-rgb), 0.3)'
                                }}
                            >
                                <PlayCircle className="h-12 w-12 text-white" />
                            </div>
                            
                            {/* Text */}
                            <div className="relative text-center">
                                <p className="text-base font-semibold mb-1.5" style={{ color: 'rgb(var(--text))' }}>
                                    Introduction au chapitre
                                </p>
                                <div 
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                                    style={{ 
                                        background: 'rgb(var(--surface-1))',
                                        color: 'rgb(var(--text-muted))'
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
            <article className="prose-custom">
                {children}
            </article>

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
