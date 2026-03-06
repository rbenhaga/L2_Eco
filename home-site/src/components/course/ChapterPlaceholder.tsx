import { Callout } from '../Callout';
import { PageHeader } from '../PageHeader';

interface ChapterPlaceholderProps {
  chapterNumber: number | string;
  moduleName?: string;
}

export function ChapterPlaceholder({ chapterNumber, moduleName }: ChapterPlaceholderProps) {
  const title = `Chapitre ${chapterNumber}`;
  const description = moduleName
    ? `Le contenu de ${moduleName} est en cours de finalisation.`
    : 'Le contenu de ce chapitre est en cours de finalisation.';

  return (
    <main className="course-page max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader number={`CH ${chapterNumber}`} title={title} description={description} />

      <Callout type="tip" title="Publication progressive">
        Ce chapitre sera publié prochainement avec les mêmes blocs pédagogiques centralisés que le reste du module.
      </Callout>
    </main>
  );
}
