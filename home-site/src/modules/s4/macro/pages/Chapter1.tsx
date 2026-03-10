import { ChapterLayout } from '../../../../components/course/ChapterLayout';
import { Section1 } from './chapter1/Section1';
import { Section2 } from './chapter1/Section2';
import { Section3a } from './chapter1/Section3a';
import { Section3b } from './chapter1/Section3b';
import { Section4 } from './chapter1/Section4';
import { Conclusion } from './chapter1/Conclusion';
import { getChapterById } from '../data/chapters';

export function Chapter1() {
    const chapter = getChapterById('macro-s4-ch1');

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
            introVideoTitle="Vidéo du chapitre 1"
            audioSegmentId="s4-macro-chapitre-1"
            prev={undefined}
            next={{
                path: '/s4/macro/chapitre-2',
                label: 'Chapitre suivant',
                title: "L'équilibre macroéconomique en économie ouverte",
            }}
            objectives={chapter.objectives}
            steps={chapter.steps}
            resources={chapter.resources}
            ficheSections={chapter.ficheSections}
            validation={chapter.validation}
        >
            <div className="course-flow">
                <Section1 />
                <Section2 />
                <Section3a />
                <Section3b />
                <Section4 />
                <Conclusion />
            </div>
        </ChapterLayout>
    );
}
