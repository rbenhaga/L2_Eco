import { Section } from '../../../../components';
import { ChapterLayout } from '../../../../components/course/ChapterLayout';
import { getChapterById } from '../data/chapters';

export function Chapter1() {
    const chapter = getChapterById('management-ch1');

    if (!chapter) return null;

    return (
        <ChapterLayout
            moduleId="management"
            progressModuleId="s4:management"
            modulePath="/s4/management"
            chapterId={chapter.id}
            chapterNumber={`Chapitre ${chapter.number}`}
            title={chapter.title}
            description={chapter.description}
            estimatedTime={chapter.estimatedTime}
            introVideoTitle="Vidéo du chapitre 1"
            audioSegmentId="s4-management-chapitre-1"
            next={{
                path: '/s4/management/chapitre-2',
                label: 'Chapitre suivant',
                title: 'Chapitre 2',
            }}
            objectives={chapter.objectives}
            steps={chapter.steps}
            ficheSections={chapter.ficheSections}
            validation={chapter.validation}
        >
            <Section type="key" title="Contenu en préparation">
                <p>Le module management est maintenant prêt à accueillir le même parcours unifié que les autres matières du S4.</p>
            </Section>
        </ChapterLayout>
    );
}
