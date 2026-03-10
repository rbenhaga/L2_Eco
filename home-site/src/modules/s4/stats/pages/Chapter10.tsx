import { Section } from '../../../../components';
import { ChapterLayout } from '../../../../components/course/ChapterLayout';
import { getChapterById } from '../data/chapters';

export function Chapter10() {
    const chapter = getChapterById('stats-ch10');

    if (!chapter) return null;

    return (
        <ChapterLayout
            moduleId="stats"
            progressModuleId="s4:stats"
            modulePath="/s4/stats"
            chapterId={chapter.id}
            chapterNumber={`Chapitre ${chapter.number}`}
            title={chapter.title}
            description={chapter.description}
            estimatedTime={chapter.estimatedTime}
            introVideoTitle="Vidéo du chapitre 10"
            audioSegmentId="s4-stats-chapitre-10"
            prev={{
                path: '/s4/stats/chapitre-9',
                label: 'Chapitre précédent',
                title: 'Estimation ponctuelle',
            }}
            next={{
                path: '/s4/stats/chapitre-11',
                label: 'Chapitre suivant',
                title: 'Estimation par intervalle, tests de signification et de comparaison',
            }}
            objectives={chapter.objectives}
            steps={chapter.steps}
            ficheSections={chapter.ficheSections}
            validation={chapter.validation}
        >
            <Section type="key" title="Contenu en préparation">
                <p>Le contenu long du chapitre arrive. La validation QCM et la logique de parcours sont déjà câblées.</p>
            </Section>
        </ChapterLayout>
    );
}
