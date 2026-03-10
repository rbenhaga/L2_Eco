import { Section } from '../../../../components';
import { ChapterLayout } from '../../../../components/course/ChapterLayout';
import { getChapterById } from '../data/chapters';

export function Chapter4() {
    const chapter = getChapterById('management-ch4');

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
            introVideoTitle="Vidéo du chapitre 4"
            audioSegmentId="s4-management-chapitre-4"
            prev={{
                path: '/s4/management/chapitre-3',
                label: 'Chapitre précédent',
                title: 'Chapitre 3',
            }}
            next={{
                path: '/s4/management',
                label: 'Retour au module',
                title: 'Management S4',
            }}
            objectives={chapter.objectives}
            steps={chapter.steps}
            ficheSections={chapter.ficheSections}
            validation={chapter.validation}
        >
            <Section type="key" title="Contenu en préparation">
                <p>Le dernier chapitre du module management est déjà aligné sur le nouveau parcours produit.</p>
            </Section>
        </ChapterLayout>
    );
}
