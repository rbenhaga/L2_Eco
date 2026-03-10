import { Section } from '../../../../components';
import { ChapterLayout } from '../../../../components/course/ChapterLayout';
import { getChapterById } from '../data/chapters';

export function Chapter2() {
    const chapter = getChapterById('management-ch2');

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
            introVideoTitle="Vidéo du chapitre 2"
            audioSegmentId="s4-management-chapitre-2"
            prev={{
                path: '/s4/management/chapitre-1',
                label: 'Chapitre précédent',
                title: 'Chapitre 1',
            }}
            next={{
                path: '/s4/management/chapitre-3',
                label: 'Chapitre suivant',
                title: 'Chapitre 3',
            }}
            objectives={chapter.objectives}
            steps={chapter.steps}
            ficheSections={chapter.ficheSections}
            validation={chapter.validation}
        >
            <Section type="key" title="Contenu en préparation">
                <p>Le shell de lecture, la fiche et la validation sont déjà normalisés pour ce chapitre.</p>
            </Section>
        </ChapterLayout>
    );
}
