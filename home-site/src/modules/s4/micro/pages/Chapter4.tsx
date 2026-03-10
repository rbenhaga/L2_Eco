import { Section } from '../../../../components';
import { ChapterLayout } from '../../../../components/course/ChapterLayout';
import { getChapterById } from '../data/chapters';

export function Chapter4() {
    const chapter = getChapterById('micro-s4-ch4');

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
            introVideoTitle="Vidéo du chapitre 4"
            audioSegmentId="s4-micro-chapitre-4"
            prev={{
                path: '/s4/micro/chapitre-3',
                label: 'Chapitre précédent',
                title: 'Chapitre 3',
            }}
            next={{
                path: '/s4/micro',
                label: 'Retour au module',
                title: 'Microéconomie S4',
            }}
            objectives={chapter.objectives}
            steps={chapter.steps}
            ficheSections={chapter.ficheSections}
            validation={chapter.validation}
        >
            <Section type="key" title="Contenu en préparation">
                <p>Ce dernier chapitre reprendra exactement la même structure d’étude et de validation que le reste du semestre.</p>
            </Section>
        </ChapterLayout>
    );
}
