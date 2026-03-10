import { Section } from '../../../../components';
import { ChapterLayout } from '../../../../components/course/ChapterLayout';
import { getChapterById } from '../data/chapters';

export function Chapter4() {
    const chapter = getChapterById('macro-s4-ch4');

    if (!chapter) return null;

    return (
        <ChapterLayout
            moduleId="macro"
            progressModuleId="s4:macro"
            modulePath="/s4/macro"
            chapterId={chapter.id}
            chapterNumber={`Chapitre ${chapter.number}`}
            title={chapter.title}
            description={chapter.description}
            estimatedTime={chapter.estimatedTime}
            introVideoTitle="Vidéo du chapitre 4"
            audioSegmentId="s4-macro-chapitre-4"
            prev={{
                path: '/s4/macro/chapitre-3',
                label: 'Chapitre précédent',
                title: 'Introduction au système financier et à la monnaie',
            }}
            next={{
                path: '/s4/macro',
                label: 'Retour au module',
                title: 'Macroéconomie S4',
            }}
            objectives={chapter.objectives}
            steps={chapter.steps}
            ficheSections={chapter.ficheSections}
            validation={chapter.validation}
        >
            <Section type="key" title="Contenu en préparation">
                <p>La structure du parcours est prête. Le contenu détaillé du chapitre sera branché ici sans changer le shell d’apprentissage.</p>
            </Section>
        </ChapterLayout>
    );
}
