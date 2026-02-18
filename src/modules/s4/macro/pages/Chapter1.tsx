import { PageHeader, ChapterNav } from '../../../../components';
import { AudioPlayer } from '../../../../components/audio/AudioPlayer';
import { TableOfContents } from '../../../../components/course/TableOfContents';
import { VideoPlayer } from '../../../../components/video/VideoPlayer';
import { AIChatWidget } from '../../../../features/ai-chat/components/AIChatWidget';
import { useChapterProgress } from '../../../../hooks/useChapterProgress';
import { Section1 } from './chapter1/Section1';
import { Section2 } from './chapter1/Section2';
import { Section3a } from './chapter1/Section3a';
import { Section3b } from './chapter1/Section3b';
import { Section4 } from './chapter1/Section4';
import { Conclusion } from './chapter1/Conclusion';

export function Chapter1() {
    useChapterProgress({
        moduleId: 's4:macro',
        chapterId: 'macro-s4-ch1',
        estimatedMinutes: 45,
    });

    return (
        <main
            className="w-full flex justify-center px-6"
            style={{
                background: 'var(--color-bg-paper)',
                minHeight: '100vh',
            }}
        >
            <div className="w-full max-w-4xl">
                <PageHeader
                    number="Chapitre 1"
                    title="De l'economie fermee a l'economie ouverte"
                    description="Balance des paiements et taux de change - Comprendre les fondations de la macroeconomie ouverte."
                />

                <div className="space-y-4 mb-8">
                    <VideoPlayer
                        title="Video de cours - Chapitre 1"
                        badge="Intro"
                        duration="A venir"
                    />
                    <AudioPlayer segmentId="s4-macro-chapitre-1" />
                </div>

                <TableOfContents />

                <div>
                    <Section1 />
                    <Section2 />
                    <Section3a />
                    <Section3b />
                    <Section4 />
                    <Conclusion />
                </div>

                <ChapterNav
                    next={{
                        path: '/s4/macro/chapitre-2',
                        label: 'Chapitre suivant ->',
                        title: 'Le modele Mundell-Fleming (IS-LM-BP)',
                    }}
                />
            </div>

            <AIChatWidget />
        </main>
    );
}
