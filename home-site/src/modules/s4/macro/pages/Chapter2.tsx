import { ChapterLayout } from '../../../../components/course/ChapterLayout';
import {
    Ch2Section1,
    Ch2Section2,
    Ch2Section3,
    Ch2Section4a,
    Ch2Section4b,
    Ch2Conclusion,
} from './chapter2/index';
import { getChapterById } from '../data/chapters';

export function Chapter2() {
    const chapter = getChapterById('macro-s4-ch2');

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
            introVideoTitle="Vidéo du chapitre 2"
            audioSegmentId="s4-macro-chapitre-2"
            prev={{
                path: '/s4/macro/chapitre-1',
                label: 'Chapitre précédent',
                title: "De l'économie fermée à l'économie ouverte",
            }}
            next={{
                path: '/s4/macro/chapitre-3',
                label: 'Chapitre suivant',
                title: 'Introduction au système financier et à la monnaie',
            }}
            objectives={chapter.objectives}
            steps={chapter.steps}
            resources={chapter.resources}
            ficheSections={chapter.ficheSections}
            validation={chapter.validation}
        >
            <div className="course-flow">
                <Ch2Section1 />
                <Ch2Section2 />
                <Ch2Section3 />
                <Ch2Section4a />
                <Ch2Section4b />
                <Ch2Conclusion />
            </div>
        </ChapterLayout>
    );
}
