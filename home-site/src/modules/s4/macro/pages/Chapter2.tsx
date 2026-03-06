import { PageHeader, ChapterNav } from '../../../../components';
import { AudioPlayer } from '../../../../components/audio/AudioPlayer';
import { TableOfContents } from '../../../../components/course/TableOfContents';
import { VideoPlayer } from '../../../../components/video/VideoPlayer';
import { AIChatWidget } from '../../../../features/ai-chat/components/AIChatWidget';
import { useChapterProgress } from '../../../../hooks/useChapterProgress';
import {
    Ch2Section1,
    Ch2Section2,
    Ch2Section3,
    Ch2Section4a,
    Ch2Section4b,
    Ch2Conclusion,
} from './chapter2/index';

export function Chapter2() {
    useChapterProgress({
        moduleId: 's4:macro',
        chapterId: 'macro-s4-ch2',
        estimatedMinutes: 50,
    });

    return (
        <main className="course-page course-page--scoped-zoom w-full flex justify-center px-6"
            style={{
                background: 'var(--color-bg-paper)',
                minHeight: '100vh',
            }}
        >
            <div className="course-zoom-scope w-full max-w-4xl">
                <div className="course-zoom-layer">
                <div className="course-paper">
                <PageHeader
                    number="Chapitre 2"
                    title="Le modele Mundell-Fleming (IS-LM-BP)"
                    description="Economie ouverte, mobilite des capitaux, regimes de change et efficacite des politiques economiques."
                />

                <div className="space-y-4 mb-8">
                    <VideoPlayer
                        title="Video de cours - Chapitre 2"
                        badge="Cours"
                        duration="A venir"
                    />
                    <AudioPlayer segmentId="s4-macro-chapitre-2" />
                </div>

                <div className="course-flow">
                    <Ch2Section1 />
                    <Ch2Section2 />
                    <Ch2Section3 />
                    <Ch2Section4a />
                    <Ch2Section4b />
                    <Ch2Conclusion />
                </div>

                <ChapterNav
                    prev={{
                        path: '/s4/macro/chapitre-1',
                        label: '<- Chapitre precedent',
                        title: "De l'economie fermee a l'economie ouverte",
                    }}
                    next={{
                        path: '/s4/macro/chapitre-3',
                        label: 'Chapitre suivant ->',
                        title: 'La politique de change en horizon intertemporel',
                    }}
                />
                </div>
                </div>
            </div>

            <TableOfContents />
            <AIChatWidget />
        </main>
    );
}

