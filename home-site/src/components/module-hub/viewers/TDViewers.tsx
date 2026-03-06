/**
 * TDViewers - Module-specific TD content viewers
 * Contains Stats, Micro, and Macro TD viewers with their specific logic
 * 
 * TODO: This file temporarily imports from the old ModuleHub
 * In a future refactor, move these components here directly
 */

import { useState } from 'react';
import { BookOpen, Clock, FileText, CheckCircle2, ChevronUp, ChevronDown } from 'lucide-react';
import { Math as MathComponent } from '../../index';

// Import TD data types
import { tdThemes as statsTDThemes } from '../../../modules/s3/stats/data/td';
import type { TDTheme } from '../../../modules/s3/stats/data/td';
import { microTDSheets } from '../../../modules/s3/micro/data/td';
import type { MicroTDSheet } from '../../../modules/s3/micro/data/td';
import { macroTDSheets } from '../../../modules/s3/macro/data/td';
import type { MacroTDSheet } from '../../../modules/s3/macro/data/td';

// Stats TD Viewer
function StatsTDViewer({ theme }: { theme: TDTheme }) {
    const [selectedYear, setSelectedYear] = useState(theme.years[0].year);
    const selectedTD = theme.years.find(y => y.year === selectedYear)?.td;

    return (
        <div>
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold" style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}>
                        {theme.number}
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-sm font-medium" style={{ background: 'var(--color-bg-overlay)', color: 'var(--color-text-secondary)' }}>
                        {theme.chapter}
                    </span>
                </div>
                <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                    TD{theme.number} — {theme.title}
                </h1>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {theme.description}
                </p>
            </div>

            {theme.years.length > 1 && (
                <div className="flex gap-2 mb-8">
                    {theme.years.map((y) => (
                        <button
                            key={y.year}
                            onClick={() => setSelectedYear(y.year)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all"
                            style={{
                                background: selectedYear === y.year ? 'var(--color-accent)' : 'var(--color-bg-raised)',
                                color: selectedYear === y.year ? 'var(--color-accent-foreground)' : 'var(--color-text-secondary)',
                                border: '1px solid',
                                borderColor: selectedYear === y.year ? 'transparent' : 'var(--color-border-default)',
                                boxShadow: selectedYear === y.year ? 'var(--shadow-md)' : 'none'
                            }}
                            onMouseEnter={(e) => {
                                if (selectedYear !== y.year) {
                                    e.currentTarget.style.background = 'var(--color-bg-overlay)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selectedYear !== y.year) {
                                    e.currentTarget.style.background = 'var(--color-bg-raised)';
                                }
                            }}
                        >
                            <Clock className="h-4 w-4" />
                            {y.year}
                            <span className="text-xs px-1.5 py-0.5 rounded" style={{
                                background: selectedYear === y.year ? 'color-mix(in srgb, var(--color-bg-raised) 20%, transparent)' : 'var(--color-bg-overlay)'
                            }}>
                                {y.td.exercises.length}
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {selectedTD && selectedTD.exercises.map((ex, index) => (
                <TDExerciseCard key={ex.id} exercise={ex} index={index + 1} />
            ))}
        </div>
    );
}

// Micro TD Viewer
function MicroTDViewer({ td }: { td: MicroTDSheet }) {
    return (
        <div>
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold" style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}>
                        {td.number}
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-sm font-medium" style={{ background: 'var(--color-bg-overlay)', color: 'var(--color-text-secondary)' }}>
                        {td.chapter}
                    </span>
                </div>
                <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                    TD{td.number} — {td.title}
                </h1>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {td.description}
                </p>
            </div>

            {td.reminders && td.reminders.length > 0 && (
                <div className="mb-8 border rounded-xl overflow-hidden" style={{ borderColor: 'var(--color-border-default)' }}>
                    <div className="px-5 py-4" style={{ background: 'var(--color-bg-raised)' }}>
                        <div className="flex items-center gap-3 mb-4">
                            <BookOpen className="h-5 w-5" style={{ color: 'var(--color-text-muted)' }} />
                            <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Rappels de cours</span>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {td.reminders.map((reminder, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{reminder.title}</div>
                                    <div className="text-sm" style={{ color: 'var(--color-text-primary)' }}><MathComponent>{reminder.formula}</MathComponent></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {td.exercises.map((ex, index) => (
                <TDExerciseCard key={ex.id} exercise={ex} index={index + 1} />
            ))}
        </div>
    );
}

// Macro TD Viewer
function MacroTDViewer({ td }: { td: MacroTDSheet }) {
    return (
        <div>
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold" style={{ background: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}>
                        {td.number}
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-sm font-medium" style={{ background: 'var(--color-bg-overlay)', color: 'var(--color-text-secondary)' }}>
                        {td.chapter}
                    </span>
                </div>
                <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                    Exercice {td.number} — {td.title}
                </h1>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {td.description}
                </p>
            </div>

            {td.exercises.map((ex, index) => (
                <TDExerciseCard key={ex.id} exercise={ex} index={index + 1} />
            ))}
        </div>
    );
}

// TD Exercise Card
function TDExerciseCard({ exercise, index }: { exercise: any; index: number }) {
    const [showSolution, setShowSolution] = useState(false);

    return (
        <div className="mb-6 rounded-xl border overflow-hidden" style={{ background: 'var(--color-bg-raised)', borderColor: 'var(--color-border-default)', boxShadow: 'var(--shadow-sm)' }}>
            <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                        <span className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}>
                            <FileText className="h-4 w-4" />
                        </span>
                        <h4 className="font-semibold text-lg leading-tight" style={{ color: 'var(--color-text-primary)' }}>
                            Exercice {index} : {exercise.title}
                        </h4>
                    </div>
                </div>
                <div className="leading-relaxed pl-11" style={{ color: 'var(--color-text-secondary)' }}>
                    {exercise.content}
                </div>
            </div>
            
            <button
                onClick={() => setShowSolution(!showSolution)}
                className="w-full px-6 py-4 flex items-center justify-center gap-2 transition-colors border-t"
                style={{ 
                    color: 'var(--color-accent)',
                    borderColor: 'var(--color-border-soft)',
                    background: showSolution ? 'var(--color-accent-subtle)' : 'transparent'
                }}
            >
                <CheckCircle2 className="h-4 w-4" />
                <span className="font-medium">{showSolution ? 'Masquer la correction' : 'Voir la correction'}</span>
                {showSolution ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            {showSolution && (
                <div className="p-6 border-t" style={{ background: 'var(--color-accent-subtle)', borderColor: 'var(--color-accent)' }}>
                    <div className="flex items-center gap-2 mb-4">
                        <CheckCircle2 className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                        <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>Correction détaillée</span>
                    </div>
                    <div className="leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
                        {exercise.solution}
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper functions
function getStatsTDContent(tdId: string) {
    const theme = statsTDThemes.find(t => t.id === tdId);
    if (!theme) return null;
    return <StatsTDViewer theme={theme} />;
}

function getMicroTDContent(tdId: string) {
    const td = microTDSheets.find(t => t.id === tdId);
    if (!td) return null;
    return <MicroTDViewer td={td} />;
}

function getMacroTDContent(tdId: string) {
    const td = macroTDSheets.find(t => t.id === tdId);
    if (!td) return null;
    return <MacroTDViewer td={td} />;
}

// Export unified interface
export const TDViewers = {
    getTDContent(moduleId: string, tdId: string) {
        switch (moduleId) {
            case 'stats':
                return getStatsTDContent(tdId);
            case 'micro':
                return getMicroTDContent(tdId);
            case 'macro':
                return getMacroTDContent(tdId);
            case 'socio':
            default:
                return null;
        }
    }
};
