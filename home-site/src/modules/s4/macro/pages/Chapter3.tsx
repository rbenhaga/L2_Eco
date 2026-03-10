import { Section } from '../../../../components';
import { ChapterLayout } from '../../../../components/course/ChapterLayout';
import { getChapterById } from '../data/chapters';

export function Chapter3() {
    const chapter = getChapterById('macro-s4-ch3');

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
            introVideoTitle="Vidéo du chapitre 3"
            audioSegmentId="s4-macro-chapitre-3"
            prev={{
                path: '/s4/macro/chapitre-2',
                label: 'Chapitre précédent',
                title: "L'équilibre macroéconomique en économie ouverte",
            }}
            next={{
                path: '/s4/macro/chapitre-4',
                label: 'Chapitre suivant',
                title: "Le temps et les taux d'intérêt",
            }}
            objectives={chapter.objectives}
            steps={chapter.steps}
            ficheSections={chapter.ficheSections}
            validation={chapter.validation}
        >
            <Section type="key" title="Contenu en préparation">
                <p>Le chapitre sera intégré dans le même parcours dès que le contenu long, la fiche et le QCM seront finalisés.</p>
            </Section>
        </ChapterLayout>
    );
}
