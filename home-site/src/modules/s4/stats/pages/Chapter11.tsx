import { Section } from '../../../../components';
import { ChapterLayout } from '../../../../components/course/ChapterLayout';
import { getChapterById } from '../data/chapters';

export function Chapter11() {
    const chapter = getChapterById('stats-ch11');

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
            introVideoTitle="Vidéo du chapitre 11"
            audioSegmentId="s4-stats-chapitre-11"
            prev={{
                path: '/s4/stats/chapitre-10',
                label: 'Chapitre précédent',
                title: "Tests du khi-deux d'homogénéité, d'indépendance et d'adéquation",
            }}
            next={{
                path: '/s4/stats',
                label: 'Retour au module',
                title: 'Statistiques S4',
            }}
            objectives={chapter.objectives}
            steps={chapter.steps}
            ficheSections={chapter.ficheSections}
            validation={chapter.validation}
        >
            <Section type="key" title="Contenu en préparation">
                <p>Le chapitre final sera intégré ici avec le même lecteur, la même fiche et la même validation.</p>
            </Section>
        </ChapterLayout>
    );
}
