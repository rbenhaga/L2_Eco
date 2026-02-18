/**
 * QCMViewer Component
 * Wrapper for QCM player with module-specific configuration
 */

import { QCMPlayer } from '../../../features/qcm';
import type { QCMConfig } from '../../../features/qcm';
import type { QuizResult } from '../../../features/qcm/types';

// Import QCM data
import macroQCMData from '../../../modules/s3/macro/data/qcm.json';
import { chapters as microQCMChapters } from '../../../modules/s3/micro/data/chapters';
import { chapters as statsQCMChapters } from '../../../modules/s3/stats/data/chapters';
import { chapters as socioQCMChapters } from '../../../modules/s3/socio/data/chapters';

interface QCMViewerProps {
    moduleId: string;
    baseRoute: string;
    onBack: () => void;
    onQuizComplete?: (result: QuizResult) => void;
}

export function QCMViewer({ moduleId, baseRoute, onBack, onQuizComplete }: QCMViewerProps) {
    const config = getQCMConfig(moduleId);
    
    if (!config) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="mb-4" style={{ color: "var(--color-text-secondary)" }}>
                        QCM non disponible pour ce module
                    </p>
                    <button onClick={onBack} className="btn-primary">Retour</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <QCMPlayer
                config={config}
                subjectColor="var(--color-accent)"
                backLink={baseRoute}
                onQuizComplete={onQuizComplete}
            />
        </div>
    );
}

function getQCMConfig(moduleId: string): QCMConfig | null {
    switch (moduleId) {
        case 'macro':
            return macroQCMData as QCMConfig;
        case 'micro':
            return {
                subject: 'Microéconomie',
                subjectId: 'micro',
                description: `${microQCMChapters.reduce((acc, ch) => acc + ch.questions.length, 0)} questions`,
                chapters: microQCMChapters.map(ch => ({
                    id: ch.id,
                    title: ch.title,
                    subtitle: ch.subtitle,
                    color: ch.color,
                    questions: ch.questions.map(q => ({
                        id: `${ch.id}-${q.id}`,
                        question: q.question,
                        options: q.options,
                        correctIndex: q.correct,
                        explanation: q.explanation
                    }))
                }))
            } as QCMConfig;
        case 'stats':
            return {
                subject: 'Statistiques',
                subjectId: 'stats',
                description: `${statsQCMChapters.reduce((acc, ch) => acc + ch.questions.length, 0)} questions`,
                chapters: statsQCMChapters.map(ch => ({
                    id: ch.id,
                    title: ch.title,
                    subtitle: ch.subtitle,
                    color: ch.color,
                    questions: ch.questions.map(q => ({
                        id: `${ch.id}-${q.id}`,
                        question: q.question,
                        options: q.options,
                        correctIndex: q.correct,
                        explanation: q.explanation
                    }))
                }))
            } as QCMConfig;
        case 'socio':
            return {
                subject: 'Sociologie',
                subjectId: 'socio',
                description: `${socioQCMChapters.reduce((acc, ch) => acc + ch.questions.length, 0)} questions`,
                chapters: socioQCMChapters.map(ch => ({
                    id: ch.id,
                    title: ch.title,
                    subtitle: ch.subtitle,
                    color: ch.color,
                    questions: ch.questions.map(q => ({
                        id: `${ch.id}-${q.id}`,
                        question: q.question,
                        options: q.options,
                        correctIndex: q.correct,
                        explanation: q.explanation
                    }))
                }))
            } as QCMConfig;
        default:
            return null;
    }
}
