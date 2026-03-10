import { Section } from '../../../../components';
import { ChapterLayout } from '../../../../components/course/ChapterLayout';
import { getChapterById } from '../data/chapters';

export function Chapter2() {
    const chapter = getChapterById('micro-s4-ch2');

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
            introVideoTitle="Vidéo du chapitre 2"
            audioSegmentId="s4-micro-chapitre-2"
            prev={{
                path: '/s4/micro/chapitre-1',
                label: 'Chapitre précédent',
                title: 'Théorie du consommateur: compléments',
            }}
            next={{
                path: '/s4/micro/chapitre-3',
                label: 'Chapitre suivant',
                title: 'Chapitre 3',
            }}
            objectives={chapter.objectives}
            steps={chapter.steps}
            ficheSections={chapter.ficheSections}
            validation={chapter.validation}
        >
            <Section type="key" title="Contenu en préparation">
                <p>Le chapitre 2 suivra le même flux: cours long, fiche, validation par QCM puis application.</p>
            </Section>
        </ChapterLayout>
    );
}
