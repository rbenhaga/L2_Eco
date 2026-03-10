import { Section } from '../../../../components';
import { ChapterLayout } from '../../../../components/course/ChapterLayout';
import { getChapterById } from '../data/chapters';

export function Chapter3() {
    const chapter = getChapterById('micro-s4-ch3');

    if (!chapter) return null;

    return (
        <ChapterLayout
            moduleId="micro"
            progressModuleId="s4:micro"
            modulePath="/s4/micro"
            chapterId={chapter.id}
            chapterNumber={`Chapitre ${chapter.number}`}
            title={chapter.title}
            description={chapter.description}
            estimatedTime={chapter.estimatedTime}
            introVideoTitle="Vidéo du chapitre 3"
            audioSegmentId="s4-micro-chapitre-3"
            prev={{
                path: '/s4/micro/chapitre-2',
                label: 'Chapitre précédent',
                title: 'Chapitre 2',
            }}
            next={{
                path: '/s4/micro/chapitre-4',
                label: 'Chapitre suivant',
                title: 'Chapitre 4',
            }}
            objectives={chapter.objectives}
            steps={chapter.steps}
            ficheSections={chapter.ficheSections}
            validation={chapter.validation}
        >
            <Section type="key" title="Contenu en préparation">
                <p>Le parcours est déjà aligné sur le reste du module. Le contenu détaillé viendra se brancher ici.</p>
            </Section>
        </ChapterLayout>
    );
}
