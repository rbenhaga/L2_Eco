import { QCMPlayer } from '../../../features/qcm';
import type { QCMConfig } from '../../../features/qcm';
import type { QuizResult } from '../../../features/qcm/types';

import macroQCMData from '../../../modules/s3/macro/data/qcm.json';
import { chapters as microQCMChapters } from '../../../modules/s3/micro/data/chapters';
import { chapters as statsQCMChapters } from '../../../modules/s3/stats/data/chapters';
import { chapters as socioQCMChapters } from '../../../modules/s3/socio/data/chapters';
import { getS4QCMConfig } from '../../../modules/s4/qcm';

interface QCMViewerProps {
    moduleId: string;
    baseRoute: string;
    qcmId?: string;
    onBack: () => void;
    onQuizComplete?: (result: QuizResult) => void;
}

export function QCMViewer({ moduleId, baseRoute, qcmId, onBack, onQuizComplete }: QCMViewerProps) {
    const config = getQCMConfig(moduleId, baseRoute, qcmId);

    if (!config) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
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
                backLink={baseRoute}
                onQuizComplete={onQuizComplete}
            />
        </div>
    );
}

function getQCMConfig(moduleId: string, baseRoute: string, qcmId?: string): QCMConfig | null {
    if (baseRoute.startsWith('/s4/')) {
        const config = getS4QCMConfig(moduleId as 'macro' | 'micro' | 'stats' | 'management');
        if (!config) return null;

        if (!qcmId) return config;

        const chapter = config.chapters.find((item) => item.id === qcmId);
        if (!chapter) return config;

        return {
            ...config,
            description: `${chapter.questions.length} questions · validation à ${config.validationScore ?? 50}%`,
            chapters: [chapter],
        };
    }

    switch (moduleId) {
        case 'macro':
            return macroQCMData as QCMConfig;
        case 'micro':
            return {
                subject: 'Microéconomie',
                subjectId: 'micro',
                description: `${microQCMChapters.reduce((acc, ch) => acc + ch.questions.length, 0)} questions`,
                chapters: microQCMChapters.map((ch) => ({
                    id: ch.id,
                    title: ch.title,
                    subtitle: ch.subtitle,
                    color: ch.color,
                    questions: ch.questions.map((q) => ({
                        id: `${ch.id}-${q.id}`,
                        question: q.question,
                        options: q.options,
                        correctIndex: q.correct,
                        explanation: q.explanation,
                    })),
                })),
            } as QCMConfig;
        case 'stats':
            return {
                subject: 'Statistiques',
                subjectId: 'stats',
                description: `${statsQCMChapters.reduce((acc, ch) => acc + ch.questions.length, 0)} questions`,
                chapters: statsQCMChapters.map((ch) => ({
                    id: ch.id,
                    title: ch.title,
                    subtitle: ch.subtitle,
                    color: ch.color,
                    questions: ch.questions.map((q) => ({
                        id: `${ch.id}-${q.id}`,
                        question: q.question,
                        options: q.options,
                        correctIndex: q.correct,
                        explanation: q.explanation,
                    })),
                })),
            } as QCMConfig;
        case 'socio':
            return {
                subject: 'Sociologie',
                subjectId: 'socio',
                description: `${socioQCMChapters.reduce((acc, ch) => acc + ch.questions.length, 0)} questions`,
                chapters: socioQCMChapters.map((ch) => ({
                    id: ch.id,
                    title: ch.title,
                    subtitle: ch.subtitle,
                    color: ch.color,
                    questions: ch.questions.map((q) => ({
                        id: `${ch.id}-${q.id}`,
                        question: q.question,
                        options: q.options,
                        correctIndex: q.correct,
                        explanation: q.explanation,
                    })),
                })),
            } as QCMConfig;
        default:
            return null;
    }
}
