/**
 * ModuleHeroSection - Masterclass Editorial Design
 *
 * 2-column grid: Text content + Decorative themed visual
 * Premium typography, module-themed accents, geometric patterns
 * All colors via CSS variables / design tokens only
 */

import { Play, Bookmark, BookOpen, Clock, ListChecks } from 'lucide-react';
import { motion } from 'framer-motion';
import { getModuleTheme } from '../../../design-system/tokens';
import type { ModuleId } from '../types';

interface ModuleHeroSectionProps {
    title: string;
    description: string;
    chaptersCount: number;
    totalDuration: string;
    todoCount: number;
    moduleId: ModuleId;
    hasIntroVideo?: boolean;
    startButtonLabel?: string;
    startDetailText?: string;
    completedCoursesCount?: number;
    onStartClick?: () => void;
    onStartHover?: () => void;
    onStartFocus?: () => void;
    onVideoClick?: () => void;
}

/** Decorative SVG geometric pattern themed to the module */
function GeometricPattern({ moduleId }: { moduleId: ModuleId }) {
    const theme = getModuleTheme(moduleId);

    return (
        <svg
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            aria-hidden="true"
        >
            {/* Grid dots */}
            {Array.from({ length: 8 }).map((_, row) =>
                Array.from({ length: 10 }).map((_, col) => (
                    <circle
                        key={`dot-${row}-${col}`}
                        cx={40 + col * 36}
                        cy={30 + row * 36}
                        r={1.5}
                        fill={theme.color}
                        opacity={0.15}
                    />
                ))
            )}

            {/* Large accent circle */}
            <circle
                cx={300}
                cy={100}
                r={70}
                fill={theme.light}
                opacity={0.5}
            />

            {/* Medium circle */}
            <circle
                cx={120}
                cy={200}
                r={45}
                stroke={theme.color}
                strokeWidth={1.5}
                opacity={0.25}
                fill="none"
            />

            {/* Small filled circle */}
            <circle
                cx={80}
                cy={80}
                r={20}
                fill={theme.color}
                opacity={0.08}
            />

            {/* Diagonal lines */}
            <line
                x1={160}
                y1={40}
                x2={280}
                y2={160}
                stroke={theme.color}
                strokeWidth={1}
                opacity={0.12}
            />
            <line
                x1={180}
                y1={40}
                x2={300}
                y2={160}
                stroke={theme.color}
                strokeWidth={1}
                opacity={0.08}
            />

            {/* Accent ring */}
            <circle
                cx={340}
                cy={230}
                r={35}
                stroke={theme.color}
                strokeWidth={2}
                opacity={0.2}
                fill="none"
                strokeDasharray="6 4"
            />

            {/* Small accent dot cluster */}
            <circle cx={200} cy={140} r={4} fill={theme.color} opacity={0.3} />
            <circle cx={215} cy={130} r={3} fill={theme.color} opacity={0.2} />
            <circle cx={190} cy={155} r={2.5} fill={theme.color} opacity={0.25} />
        </svg>
    );
}

/** Stat pill shown on the visual panel */
function StatPill({
    icon: Icon,
    value,
    label,
}: {
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    value: string | number;
    label: string;
}) {
    return (
        <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{
                background: 'var(--color-bg-raised)',
                boxShadow: 'var(--shadow-sm)',
            }}
        >
            <Icon
                className="w-4 h-4 shrink-0"
                style={{ color: 'var(--color-text-muted)' }}
            />
            <span
                className="text-sm font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
            >
                {value}
            </span>
            <span
                className="text-xs"
                style={{ color: 'var(--color-text-muted)' }}
            >
                {label}
            </span>
        </div>
    );
}

export function ModuleHeroSection({
    title,
    description,
    chaptersCount,
    totalDuration,
    todoCount,
    moduleId,
    hasIntroVideo = true,
    startButtonLabel = 'Rejoindre le cours',
    startDetailText,
    completedCoursesCount = 0,
    onStartClick,
    onStartHover,
    onStartFocus,
    onVideoClick,
}: ModuleHeroSectionProps) {
    const theme = getModuleTheme(moduleId);

    return (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            {/* Left Column: Text Content (5/12) */}
            <div className="lg:col-span-5">
                {/* Badge - dynamic from title */}
                <div
                    className="inline-block px-3 py-1 rounded mb-6"
                    style={{
                        background: theme.subtle,
                        color: theme.color,
                    }}
                >
                    <span className="text-xs font-bold uppercase" style={{ letterSpacing: '0.2em' }}>
                        {title}
                    </span>
                </div>

                {/* Title - Huge Serif */}
                <h1
                    className="mb-6 tracking-tight"
                    style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(42px, 6vw, 60px)',
                        lineHeight: 1.1,
                        color: 'var(--color-text-primary)',
                    }}
                >
                    {title}
                </h1>

                {/* Description */}
                <p
                    className="text-lg font-light mb-10 max-w-md"
                    style={{
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.7,
                    }}
                >
                    {description}
                </p>

                {/* CTAs */}
                <div className="flex items-center gap-4">
                    <motion.button
                        onClick={onStartClick}
                        onMouseEnter={onStartHover}
                        onFocus={onStartFocus}
                        className="px-8 py-4 rounded-xl font-semibold"
                        style={{
                            background: 'var(--color-text-primary)',
                            color: 'var(--color-canvas)',
                        }}
                        whileHover={{
                            y: -4,
                            boxShadow: 'var(--shadow-xl)',
                        }}
                        transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
                    >
                        {startButtonLabel}
                    </motion.button>

                    <motion.button
                        className="p-4 rounded-xl border"
                        style={{
                            borderColor: 'var(--color-border-default)',
                            background: 'transparent',
                        }}
                        whileHover={{
                            background: 'var(--color-bg-raised)',
                        }}
                        transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
                    >
                        <Bookmark className="w-5 h-5" style={{ color: 'var(--color-text-primary)' }} />
                    </motion.button>
                </div>
                {startDetailText && (
                    <p
                        className="mt-3 text-sm"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        {startDetailText}
                    </p>
                )}
                <p className="mt-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {completedCoursesCount} cours termine(s) sur {chaptersCount}
                </p>

            </div>

            {/* Right Column: Decorative themed visual (7/12) */}
            <div className="lg:col-span-7 relative">
                <motion.div
                    className="relative rounded-2xl overflow-hidden border"
                    style={{
                        aspectRatio: '16/10',
                        background: theme.gradient,
                        borderColor: 'var(--color-border-soft)',
                        boxShadow: 'var(--shadow-lg)',
                    }}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                >
                    {/* Geometric SVG pattern */}
                    <div className="absolute inset-0">
                        <GeometricPattern moduleId={moduleId} />
                    </div>

                    {/* Play button overlay for intro video */}
                    {hasIntroVideo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.button
                                onClick={onVideoClick}
                                className="w-16 h-16 rounded-full flex items-center justify-center"
                                style={{
                                    background: 'var(--color-bg-raised)',
                                    color: theme.color,
                                    boxShadow: 'var(--shadow-xl)',
                                }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                            >
                                <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
                            </motion.button>
                        </div>
                    )}

                    {/* Bottom stats overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                        <StatPill
                            icon={BookOpen}
                            value={chaptersCount}
                            label={chaptersCount > 1 ? 'chapitres' : 'chapitre'}
                        />
                        <StatPill
                            icon={Clock}
                            value={totalDuration}
                            label="min"
                        />
                        {todoCount > 0 && (
                            <StatPill
                                icon={ListChecks}
                                value={todoCount}
                                label={todoCount > 1 ? 'restants' : 'restant'}
                            />
                        )}
                    </div>
                </motion.div>

                {/* Decorative circles - themed with module colors */}
                <div
                    className="absolute -top-4 -right-4 w-24 h-24 rounded-full -z-10"
                    style={{ background: theme.subtle }}
                />
                <div
                    className="absolute -bottom-6 -left-6 w-48 h-48 rounded-full -z-10"
                    style={{ background: theme.light }}
                />
            </div>
        </section>
    );
}
