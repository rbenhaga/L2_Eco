import { Section } from '../../../../components';
import { ChapterLayout } from '../../../../components/course/ChapterLayout';
import { getChapterById } from '../data/chapters';

export function Chapter3() {
    const chapter = getChapterById('management-ch3');

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
            introVideoTitle="Vidéo du chapitre 3"
            audioSegmentId="s4-management-chapitre-3"
            prev={{
                path: '/s4/management/chapitre-2',
                label: 'Chapitre précédent',
                title: 'Chapitre 2',
            }}
            next={{
                path: '/s4/management/chapitre-4',
                label: 'Chapitre suivant',
                title: 'Chapitre 4',
            }}
            objectives={chapter.objectives}
            steps={chapter.steps}
            ficheSections={chapter.ficheSections}
            validation={chapter.validation}
        >
            <Section type="key" title="Contenu en préparation">
                <p>Le chapitre 3 suivra le même cadre d’étude pour éviter toute reconstruction par matière ou par semestre.</p>
            </Section>
        </ChapterLayout>
    );
}
