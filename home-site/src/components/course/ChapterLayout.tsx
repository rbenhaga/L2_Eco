import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, CheckCircle2, ChevronLeft, ChevronRight, Clock3 } from 'lucide-react';
import { AudioPlayer } from '../audio/AudioPlayer';
import { VideoPlayer } from '../video/VideoPlayer';
import { AIChatWidget } from '../../features/ai-chat/components/AIChatWidget';
import { QCMPlayer } from '../../features/qcm';
import type { QuizResult } from '../../features/qcm/types';
import { useChapterProgress } from '../../hooks/useChapterProgress';
import { getS4QCMConfig } from '../../modules/s4/qcm';
import { progressService } from '../../services/progressService';
import type {
    LearningFicheSection,
    LearningResourceCard,
    LearningStep,
    LearningValidationConfig,
} from '../../types/learning';
import { TableOfContents } from './TableOfContents';

const MODULE_LABELS = {
    macro: 'Macroéconomie',
    micro: 'Microéconomie',
    stats: 'Statistiques',
    socio: 'Sociologie',
    management: 'Management',
} as const;

interface ChapterNavLink {
    path: string;
    label: string;
    title: string;
}

interface ChapterLayoutProps {
    moduleId: 'macro' | 'micro' | 'stats' | 'socio' | 'management';
    chapterNumber: string;
    title: string;
    description: string;
    estimatedTime?: string;
    introVideoUrl?: string;
    introVideoTitle?: string;
    audioUrl?: string;
    audioSegmentId?: string;
    prev?: ChapterNavLink;
    next?: ChapterNavLink;
    chapterId?: string;
    progressModuleId?: string;
    modulePath?: string;
    objectives?: string[];
    steps?: LearningStep[];
    resources?: LearningResourceCard[];
    ficheSections?: LearningFicheSection[];
    validation?: LearningValidationConfig;
    children: React.ReactNode;
}

function ResourceDeck({ resources }: { resources: LearningResourceCard[] }) {
    if (resources.length === 0) return null;

    return (
        <section
            id="suite"
            data-section-title="Ressources liées"
            className="mt-12 border-t pt-8"
            style={{ borderColor: 'var(--color-border-subtle)' }}
        >
            <div className="flex items-end justify-between gap-4">
                <div>
                    <p
                        className="text-[11px] font-bold uppercase tracking-[0.18em]"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        Ressources liées
                    </p>
                    <h2 style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
                        Suite du chapitre
                    </h2>
                </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
                {resources.map((resource) => {
                    const state = resource.state ?? 'available';
                    const isLocked = state === 'locked' || state === 'soon';
                    const label = resource.ctaLabel ?? (state === 'soon' ? 'Bientôt' : isLocked ? 'Verrouillé' : 'Ouvrir');
                    const card = (
                        <div
                            className="rounded-[20px] border p-4"
                            style={{
                                borderColor: 'var(--color-border-default)',
                                background: 'var(--color-bg-raised)',
                                opacity: isLocked ? 0.74 : 1,
                            }}
                        >
                            <p
                                className="text-[11px] font-bold uppercase tracking-[0.16em]"
                                style={{ color: 'var(--color-text-muted)' }}
                            >
                                {resource.label}
                            </p>
                            <h3 className="mt-2 text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                {resource.title}
                            </h3>
                            <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                                {resource.description}
                            </p>
                            <div className="mt-4 flex items-center justify-between gap-3">
                                <span
                                    className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
                                    style={{
                                        background: 'var(--color-bg-overlay)',
                                        color: 'var(--color-text-secondary)',
                                    }}
                                >
                                    {resource.meta ?? 'Ressource'}
                                </span>
                                <span
                                    className="inline-flex items-center gap-2 text-sm font-semibold"
                                    style={{ color: isLocked ? 'var(--color-text-muted)' : 'var(--color-accent)' }}
                                >
                                    {label}
                                    {!isLocked && <ArrowRight className="h-4 w-4" />}
                                </span>
                            </div>
                        </div>
                    );

                    if (!resource.href || isLocked) {
                        return <div key={resource.id}>{card}</div>;
                    }

                    return (
                        <Link key={resource.id} to={resource.href} className="no-underline">
                            {card}
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

function FicheView({ sections }: { sections: LearningFicheSection[] }) {
    return (
        <article className="prose-custom w-full max-w-none" style={{ fontSize: '17px', lineHeight: 1.74, color: 'var(--color-text-primary)' }}>
            <section id="fiche-intro" data-section-title="Fiche de synthèse" className="mb-10">
                <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                    Fiche de synthèse
                </h2>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                    Version condensée du chapitre pour fixer les articulations essentielles avant le QCM ou un TD.
                </p>
            </section>

            <div className="space-y-8">
                {sections.map((section) => (
                    <section
                        key={section.id}
                        id={`fiche-${section.id}`}
                        data-section-title={section.title}
                        className="rounded-[20px] border p-5"
                        style={{
                            borderColor: 'var(--color-border-default)',
                            background: 'var(--color-bg-raised)',
                        }}
                    >
                        <h3 style={{ color: 'var(--color-text-primary)' }}>{section.title}</h3>
                        {section.summary && (
                            <p className="mt-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                {section.summary}
                            </p>
                        )}
                        <ul className="mt-4 space-y-2 pl-5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            {section.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                            ))}
                        </ul>
                        {section.formulas && section.formulas.length > 0 && (
                            <div className="mt-4 grid gap-2">
                                {section.formulas.map((formula) => (
                                    <div
                                        key={formula}
                                        className="rounded-2xl border px-4 py-3 text-sm"
                                        style={{
                                            borderColor: 'var(--color-border-subtle)',
                                            background: 'var(--color-bg-overlay)',
                                            color: 'var(--color-text-primary)',
                                        }}
                                    >
                                        {formula}
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                ))}
            </div>
        </article>
    );
}

function ViewSwitch({
    active,
    onChange,
}: {
    active: 'course' | 'fiche';
    onChange: (next: 'course' | 'fiche') => void;
}) {
    return (
        <div className="course-view-switch inline-flex items-center gap-2">
            <button
                type="button"
                onClick={() => onChange('course')}
                aria-pressed={active === 'course'}
                className="inline-flex min-h-10 items-center border-b-2 px-1 py-2 text-sm font-semibold transition-colors"
                style={
                    active === 'course'
                        ? { borderColor: 'var(--color-accent)', color: 'var(--color-text-primary)' }
                        : { borderColor: 'transparent', color: 'var(--color-text-secondary)' }
                }
            >
                Cours
            </button>
            <button
                type="button"
                onClick={() => onChange('fiche')}
                aria-pressed={active === 'fiche'}
                className="inline-flex min-h-10 items-center border-b-2 px-1 py-2 text-sm font-semibold transition-colors"
                style={
                    active === 'fiche'
                        ? { borderColor: 'var(--color-accent)', color: 'var(--color-text-primary)' }
                        : { borderColor: 'transparent', color: 'var(--color-text-secondary)' }
                }
            >
                Fiche
            </button>
        </div>
    );
}

export function ChapterLayout({
    moduleId,
    chapterNumber,
    title,
    description,
    estimatedTime,
    introVideoUrl,
    introVideoTitle,
    audioUrl,
    audioSegmentId,
    prev,
    next,
    chapterId,
    progressModuleId,
    modulePath,
    steps = [],
    resources = [],
    ficheSections = [],
    validation,
    children,
}: ChapterLayoutProps) {
    const [view, setView] = useState<'course' | 'fiche'>('course');
    const [isQcmOpen, setIsQcmOpen] = useState(false);
    const [qcmMode, setQcmMode] = useState<'pedagogical' | 'exam'>('pedagogical');
    const trackingEnabled = Boolean(chapterId);
    const trackingModuleId = progressModuleId || moduleId;
    const validationScore = validation?.minimumScore ?? 70;
    const minimumReadPercent = 0;
    const segmentId = audioSegmentId || `${moduleId}-${chapterNumber.replace(/\s+/g, '-').toLowerCase()}`;
    const progress = useChapterProgress({
        moduleId: trackingModuleId,
        chapterId: chapterId || `${moduleId}-${chapterNumber}`,
        enabled: trackingEnabled,
        minimumReadPercentage: minimumReadPercent,
        minimumQCMScore: validationScore,
    });
    const qcmStep = steps.find((step) => step.id === 'qcm');
    const canOpenFiche = ficheSections.length > 0;
    const canStartQcm = true;
    const moduleLabel = MODULE_LABELS[moduleId];
    const moduleHomePath = modulePath ?? `/s4/${moduleId}`;
    const isS4InlineQcmContext = Boolean(
        chapterId
        && moduleHomePath.startsWith('/s4/')
        && moduleId !== 'socio'
    );
    const qcmConfig = isS4InlineQcmContext
        ? getS4QCMConfig(moduleId as 'macro' | 'micro' | 'stats' | 'management')
        : null;
    const qcmChapter = chapterId && qcmConfig
        ? qcmConfig.chapters.find((item) => item.id === chapterId)
        : null;
    const inlineQcmConfig = qcmConfig && qcmChapter
        ? {
            ...qcmConfig,
            description: `${qcmChapter.questions.length} questions · validation à ${validationScore}%`,
            chapters: [qcmChapter],
        }
        : null;
    const qcmQuestionCount = qcmChapter?.questions.length ?? 0;
    const showInlineNextAction = Boolean(next && trackingEnabled && inlineQcmConfig && progress.isCompleted);
    const launchQcmLabel = progress.qcmBestScore > 0 && progress.qcmBestScore < validationScore
        ? 'Refaire le QCM'
        : 'Lancer le QCM';
    const visibleResources = resources.filter((resource) => {
        const resourceText = `${resource.label} ${resource.title} ${resource.href ?? ''}`.toLowerCase();

        if (qcmStep?.href && resource.href === qcmStep.href) {
            return false;
        }

        if (resourceText.includes('tab=qcm') || resourceText.includes('qcm')) {
            return false;
        }

        return !resourceText.includes('validation');
    });

    useEffect(() => {
        setIsQcmOpen(false);
        setQcmMode('pedagogical');
    }, [chapterId]);

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
    }, [children, ficheSections, title, view]);

    const openOiko = (prompt?: string) => {
        if (typeof window === 'undefined') return;
        window.dispatchEvent(new CustomEvent('oiko:open', { detail: { prompt } }));
    };

    const handleInlineQuizComplete = (result: QuizResult) => {
        if (!trackingEnabled || !chapterId) return;

        progressService.recordQCMScore(trackingModuleId, chapterId, result.score);
        progressService.recordResourceAccess(trackingModuleId, `${chapterId}:qcm`, 'qcm', {
            completed: result.score >= validationScore,
        });
    };

    return (
        <main className="course-page course-page--paper-focus">
            <div className="course-reader-frame">
                <div className="course-reader-body">
                    <div className="course-paper">
                        <header className="mb-8 border-b pb-6" style={{ borderColor: 'var(--color-border-subtle)' }}>
                            <div className="relative flex flex-wrap items-center gap-2 sm:min-h-10">
                                <Link
                                    to={moduleHomePath}
                                    className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors no-underline"
                                    style={{
                                        color: 'var(--color-text-secondary)',
                                        background: 'var(--color-bg-overlay)',
                                    }}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Retour à {moduleLabel}
                                </Link>

                                <div className="flex flex-wrap items-center gap-2 sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
                                    <span
                                        className="inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em]"
                                        style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}
                                    >
                                        {chapterNumber}
                                    </span>
                                    {estimatedTime && (
                                    <span
                                        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium"
                                        style={{ background: 'var(--color-bg-overlay)', color: 'var(--color-text-secondary)' }}
                                    >
                                        <Clock3 className="h-3.5 w-3.5" />
                                        {estimatedTime}
                                    </span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-5 w-full">

                                <h1
                                    className="mt-5"
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: 'clamp(2.35rem, 5vw, 4.15rem)',
                                        lineHeight: 0.98,
                                        letterSpacing: '-0.045em',
                                        color: 'var(--color-text-primary)',
                                    }}
                                >
                                    {title}
                                </h1>

                                <p
                                    className="mt-5 w-full text-base sm:text-lg"
                                    style={{
                                        color: 'var(--color-text-secondary)',
                                        lineHeight: 1.72,
                                        fontSize: '1.03rem',
                                    }}
                                >
                                    {description}
                                </p>

                                <div className="mt-6 flex flex-wrap items-center gap-3">
                                    <VideoPlayer
                                        compact
                                        title={introVideoTitle || 'Vidéo du chapitre'}
                                        duration={estimatedTime || 'Intro'}
                                        videoUrl={introVideoUrl}
                                    />
                                    <AudioPlayer
                                        audioUrl={audioUrl}
                                        segmentId={segmentId}
                                        compact
                                    />
                                </div>

                                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                    {canOpenFiche && (
                                        <ViewSwitch active={view} onChange={setView} />
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => openOiko(`Explique-moi simplement le chapitre "${title}".`)}
                                        className="inline-flex min-h-9 items-center gap-2 rounded-full px-1 py-1 text-sm font-semibold transition-colors"
                                        style={{ color: 'var(--color-text-secondary)' }}
                                    >
                                        <Bot className="h-4 w-4" style={{ color: 'var(--color-accent)' }} />
                                        Demander à Oiko AI
                                    </button>
                                </div>
                            </div>
                        </header>

                        {view === 'fiche' && canOpenFiche ? (
                            <FicheView sections={ficheSections} />
                        ) : (
                            <article
                                className="prose-custom w-full max-w-none"
                                style={{
                                    fontSize: '17px',
                                    lineHeight: 1.74,
                                    color: 'var(--color-text-primary)',
                                }}
                            >
                                {children}
                            </article>
                        )}

                        <section
                            id="validation"
                            data-section-title="Validation du chapitre"
                            className="mt-14"
                        >
                            <div
                                className="mx-auto max-w-2xl rounded-[22px] border px-6 py-7 text-center sm:px-8 sm:py-8"
                                style={{
                                    background: 'var(--color-bg-raised)',
                                    borderColor: 'var(--color-border-default)',
                                }}
                            >
                            <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                {progress.isCompleted ? 'Cours validé' : 'QCM de fin de chapitre'}
                            </h2>
                            <p
                                className="mx-auto mt-2 max-w-xl text-sm"
                                style={{ color: 'var(--color-text-secondary)', lineHeight: 1.65 }}
                            >
                                {progress.isCompleted
                                    ? 'Le chapitre est validé. Tu peux maintenant passer à la suite.'
                                    : `Lance le QCM final pour valider le cours.${qcmQuestionCount > 0 ? ` ${qcmQuestionCount} questions.` : ''}`}
                            </p>

                            {inlineQcmConfig ? (
                                <>
                                    {!progress.isCompleted && !isQcmOpen && (
                                        <>
                                            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
                                                <button
                                                    type="button"
                                                    onClick={() => setQcmMode('pedagogical')}
                                                    className="transition-colors"
                                                    style={{
                                                        color: qcmMode === 'pedagogical' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                                        textDecoration: qcmMode === 'pedagogical' ? 'underline' : 'none',
                                                        textUnderlineOffset: '0.22em',
                                                    }}
                                                >
                                                    Pédagogique
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setQcmMode('exam')}
                                                    className="transition-colors"
                                                    style={{
                                                        color: qcmMode === 'exam' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                                        textDecoration: qcmMode === 'exam' ? 'underline' : 'none',
                                                        textUnderlineOffset: '0.22em',
                                                    }}
                                                >
                                                    Examen
                                                </button>
                                            </div>

                                            <div className="mt-5 flex flex-col items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsQcmOpen(true)}
                                                    disabled={!canStartQcm}
                                                    className="inline-flex min-h-[2.8rem] items-center gap-2 rounded-[10px] px-5 text-sm font-semibold transition-colors"
                                                    style={{
                                                        background: canStartQcm ? 'var(--color-accent)' : 'var(--color-bg-overlay)',
                                                        color: canStartQcm ? 'var(--color-accent-foreground)' : 'var(--color-text-muted)',
                                                    }}
                                                >
                                                    {launchQcmLabel}
                                                    <ArrowRight className="h-4 w-4" />
                                                </button>

                                                <span
                                                    className="max-w-md text-sm"
                                                    style={{
                                                        color: progress.qcmBestScore >= validationScore
                                                            ? 'var(--color-success)'
                                                            : 'var(--color-text-secondary)',
                                                    }}
                                                >
                                                    {progress.qcmBestScore > 0
                                                            ? `Meilleur score actuel : ${progress.qcmBestScore}%.`
                                                            : 'Le chapitre sera validé après réussite du QCM.'}
                                                </span>
                                            </div>
                                        </>
                                    )}

                                    {isQcmOpen && (
                                        <div className="mt-7 border-t pt-6 text-left" style={{ borderColor: 'var(--color-border-default)' }}>
                                            <QCMPlayer
                                                config={inlineQcmConfig as NonNullable<typeof inlineQcmConfig>}
                                                embedded
                                                initialChapterId={chapterId}
                                                initialDeliveryMode={qcmMode}
                                                onQuizComplete={handleInlineQuizComplete}
                                            />
                                        </div>
                                    )}
                                </>
                            ) : qcmStep?.href ? (
                                <div className="mt-5 flex justify-center">
                                        <Link
                                            to={qcmStep?.href ?? '#'}
                                            className="inline-flex min-h-[2.8rem] items-center gap-2 rounded-[10px] px-5 text-sm font-semibold no-underline"
                                            style={{
                                                background: canStartQcm ? 'var(--color-accent)' : 'var(--color-bg-overlay)',
                                                color: canStartQcm ? 'var(--color-accent-foreground)' : 'var(--color-text-muted)',
                                            pointerEvents: canStartQcm ? 'auto' : 'none',
                                        }}
                                    >
                                        Démarrer le QCM
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            ) : (
                                <p className="mt-5 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                    QCM bientôt disponible.
                                </p>
                            )}

                            {showInlineNextAction && next && (
                                <div className="mt-6 flex justify-center">
                                        <Link
                                            to={next?.path ?? '#'}
                                            className="inline-flex min-h-[2.8rem] items-center gap-2 rounded-[10px] px-5 text-sm font-semibold no-underline"
                                            style={{
                                                background: 'var(--color-accent)',
                                                color: 'var(--color-accent-foreground)',
                                            }}
                                    >
                                        Passer au chapitre suivant
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            )}
                            </div>
                        </section>

                        {false && (
                        <section
                            id="validation"
                            data-section-title="Validation du chapitre"
                            className="mt-10 rounded-[24px] border px-4 py-4 sm:px-5 sm:py-5"
                            style={{
                                borderColor: progress.isCompleted
                                    ? 'color-mix(in srgb, var(--color-success) 30%, transparent)'
                                    : 'var(--color-border-default)',
                                background: progress.isCompleted
                                    ? 'color-mix(in srgb, var(--color-success-subtle) 65%, var(--color-bg-raised))'
                                    : 'color-mix(in srgb, var(--color-bg-overlay) 58%, var(--color-bg-raised))',
                            }}
                        >
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div className="min-w-0 flex-1">
                                    <p
                                        className="text-[10px] font-bold uppercase tracking-[0.18em]"
                                        style={{ color: progress.isCompleted ? 'var(--color-success)' : 'var(--color-text-muted)' }}
                                    >
                                        Validation du chapitre
                                    </p>
                                    <h2 className="mt-1 text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                        {progress.isCompleted ? 'Cours validé' : 'QCM de fin de chapitre'}
                                    </h2>
                                    <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                                        {progress.isCompleted
                                            ? 'Lecture complète et score requis atteints. Le chapitre est validé.'
                                            : `${validationScore}% minimum requis pour valider le cours et débloquer la suite.`}
                                    </p>
                                </div>

                                <span
                                    className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
                                    style={{
                                        background: progress.isCompleted ? 'var(--color-success-subtle)' : 'var(--color-bg-raised)',
                                        color: progress.isCompleted ? 'var(--color-success)' : 'var(--color-text-secondary)',
                                        border: `1px solid ${progress.isCompleted ? 'color-mix(in srgb, var(--color-success) 24%, transparent)' : 'var(--color-border-default)'}`,
                                    }}
                                >
                                    {progress.isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
                                    {progress.isCompleted ? 'Cours validé' : `${qcmQuestionCount || 'QCM'} questions`}
                                </span>
                            </div>

                            <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                                <div
                                    className="rounded-[18px] px-3.5 py-3"
                                    style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border-subtle)' }}
                                >
                                    <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: 'var(--color-text-muted)' }}>
                                        Lecture
                                    </p>
                                    <p className="mt-1 text-sm font-semibold" style={{ color: progress.isReadComplete ? 'var(--color-success)' : 'var(--color-text-primary)' }}>
                                        {progress.isReadComplete ? 'Terminée' : `${progress.scrollProgress}% lus`}
                                    </p>
                                </div>

                                <div
                                    className="rounded-[18px] px-3.5 py-3"
                                    style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border-subtle)' }}
                                >
                                    <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: 'var(--color-text-muted)' }}>
                                        Seuil
                                    </p>
                                    <p className="mt-1 text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                        {validationScore}% minimum
                                    </p>
                                </div>

                                <div
                                    className="rounded-[18px] px-3.5 py-3"
                                    style={{ background: 'var(--color-bg-raised)', border: '1px solid var(--color-border-subtle)' }}
                                >
                                    <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: 'var(--color-text-muted)' }}>
                                        Meilleur score
                                    </p>
                                    <p className="mt-1 text-sm font-semibold" style={{ color: progress.qcmBestScore >= validationScore ? 'var(--color-success)' : 'var(--color-text-primary)' }}>
                                        {progress.qcmBestScore > 0 ? `${progress.qcmBestScore}%` : 'Pas encore tenté'}
                                    </p>
                                </div>
                            </div>

                            {inlineQcmConfig ? (
                                <>
                                    {!progress.isCompleted && !isQcmOpen && (
                                        <>
                                            <div className="mt-4 flex flex-wrap items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setQcmMode('pedagogical')}
                                                    className="inline-flex min-h-9 items-center rounded-full px-3 text-sm font-semibold transition-colors"
                                                    style={qcmMode === 'pedagogical'
                                                        ? {
                                                            background: 'var(--color-accent-subtle)',
                                                            color: 'var(--color-accent)',
                                                            border: '1px solid color-mix(in srgb, var(--color-accent) 24%, transparent)',
                                                        }
                                                        : {
                                                            background: 'var(--color-bg-raised)',
                                                            color: 'var(--color-text-secondary)',
                                                            border: '1px solid var(--color-border-default)',
                                                        }}
                                                >
                                                    Mode pédagogique
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setQcmMode('exam')}
                                                    className="inline-flex min-h-9 items-center rounded-full px-3 text-sm font-semibold transition-colors"
                                                    style={qcmMode === 'exam'
                                                        ? {
                                                            background: 'var(--color-success-subtle)',
                                                            color: 'var(--color-success)',
                                                            border: '1px solid color-mix(in srgb, var(--color-success) 24%, transparent)',
                                                        }
                                                        : {
                                                            background: 'var(--color-bg-raised)',
                                                            color: 'var(--color-text-secondary)',
                                                            border: '1px solid var(--color-border-default)',
                                                        }}
                                                >
                                                    Mode examen
                                                </button>
                                            </div>

                                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsQcmOpen(true)}
                                                    disabled={!canStartQcm}
                                                    className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors"
                                                    style={{
                                                        background: canStartQcm ? 'var(--color-accent)' : 'var(--color-bg-raised)',
                                                        color: canStartQcm ? 'var(--color-accent-foreground)' : 'var(--color-text-muted)',
                                                        border: `1px solid ${canStartQcm ? 'color-mix(in srgb, var(--color-accent) 30%, transparent)' : 'var(--color-border-default)'}`,
                                                        opacity: canStartQcm ? 1 : 0.7,
                                                    }}
                                                >
                                                    {launchQcmLabel}
                                                    <ArrowRight className="h-4 w-4" />
                                                </button>

                                                <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                                                    {!canStartQcm
                                                        ? `Termine d'abord la lecture (${minimumReadPercent}% minimum) pour débloquer le QCM.`
                                                        : progress.qcmBestScore > 0 && progress.qcmBestScore < validationScore
                                                            ? `Dernier score : ${progress.qcmBestScore}%. Il faut refaire le QCM pour valider le cours.`
                                                            : qcmMode === 'exam'
                                                                ? 'Mode examen : résultat final à la fin du QCM.'
                                                                : 'Mode pédagogique : correction immédiate après chaque question.'}
                                                </p>
                                            </div>
                                        </>
                                    )}

                                    {isQcmOpen && (
                                        <div
                                            className="mt-5 border-t pt-5"
                                            style={{ borderColor: 'color-mix(in srgb, var(--color-border-default) 82%, transparent)' }}
                                        >
                                            <QCMPlayer
                                                config={inlineQcmConfig as NonNullable<typeof inlineQcmConfig>}
                                                embedded
                                                initialChapterId={chapterId}
                                                initialDeliveryMode={qcmMode}
                                                onQuizComplete={handleInlineQuizComplete}
                                            />
                                        </div>
                                    )}
                                </>
                            ) : qcmStep?.href ? (
                                <div className="mt-4 flex flex-wrap items-center gap-3">
                                    <Link
                                        to={qcmStep?.href ?? '#'}
                                        className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold no-underline"
                                        style={{
                                            background: canStartQcm ? 'var(--color-accent)' : 'var(--color-bg-raised)',
                                            color: canStartQcm ? 'var(--color-accent-foreground)' : 'var(--color-text-muted)',
                                            pointerEvents: canStartQcm ? 'auto' : 'none',
                                            border: `1px solid ${canStartQcm ? 'color-mix(in srgb, var(--color-accent) 30%, transparent)' : 'var(--color-border-default)'}`,
                                        }}
                                    >
                                        Démarrer le QCM
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                        {validationScore}% minimum pour valider le chapitre.
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        disabled
                                        className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold"
                                        style={{
                                            background: 'var(--color-bg-raised)',
                                            color: 'var(--color-text-muted)',
                                            border: '1px solid var(--color-border-default)',
                                        }}
                                    >
                                        QCM bientôt disponible
                                    </button>
                                </div>
                            )}

                            {showInlineNextAction && next && (
                                <div
                                    className="mt-5 flex justify-end border-t pt-4"
                                    style={{ borderColor: 'color-mix(in srgb, var(--color-success) 18%, transparent)' }}
                                >
                                    <Link
                                        to={next?.path ?? '#'}
                                        className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold no-underline"
                                        style={{
                                            background: 'var(--color-success)',
                                            color: 'var(--color-accent-foreground)',
                                            boxShadow: 'var(--shadow-sm)',
                                        }}
                                    >
                                        Passer au chapitre suivant
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            )}
                        </section>
                        )}

                        {false && (
                        <section
                            id="validation"
                            data-section-title="Validation du chapitre"
                            className="mt-10 border-t pt-6"
                            style={{ borderColor: 'var(--color-border-subtle)' }}
                        >
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-[1.1rem] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                        QCM de validation
                                    </h2>
                                    <p className="mt-1 text-sm sm:text-[0.95rem]" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                                        {validationScore}% minimum pour valider le chapitre.
                                    </p>
                                </div>

                                {qcmStep?.href ? (
                                    <Link
                                        to={qcmStep?.href ?? '#'}
                                        className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold no-underline"
                                        style={{
                                            background: canStartQcm ? 'var(--color-accent)' : 'var(--color-bg-overlay)',
                                            color: canStartQcm ? 'var(--color-accent-foreground)' : 'var(--color-text-muted)',
                                            pointerEvents: canStartQcm ? 'auto' : 'none',
                                        }}
                                    >
                                        Démarrer le QCM
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                ) : (
                                    <button
                                        type="button"
                                        disabled
                                        className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold"
                                        style={{
                                            background: 'var(--color-bg-overlay)',
                                            color: 'var(--color-text-muted)',
                                        }}
                                    >
                                        QCM bientôt disponible
                                    </button>
                                )}
                            </div>
                        </section>
                        )}

                        <ResourceDeck resources={visibleResources} />

                        <nav
                            className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t pt-6"
                            style={{ borderColor: 'var(--color-border-subtle)' }}
                        >
                            {prev ? (
                                <Link
                                    to={prev.path}
                                    className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold no-underline transition-colors"
                                    style={{
                                        color: 'var(--color-text-secondary)',
                                        background: 'var(--color-bg-overlay)',
                                    }}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    {prev.title}
                                </Link>
                            ) : <div />}

                            {!inlineQcmConfig && next && (
                                <Link
                                    to={next.path}
                                    className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold no-underline transition-colors"
                                    style={{
                                        color: 'var(--color-text-secondary)',
                                        background: 'var(--color-bg-overlay)',
                                    }}
                                >
                                    {next.title}
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            )}
                        </nav>
                    </div>
                </div>
            </div>

            <TableOfContents />
            <AIChatWidget />
        </main>
    );
}
