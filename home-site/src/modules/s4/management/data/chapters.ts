import type { ModuleChapter } from '../../../../components/layout/ModuleHub';

const BASE_PATH = '/s4/management';
const VALIDATION = {
    minimumScore: 50,
} as const;

export const managementModuleMeta = {
    title: 'Management des organisations',
    description: 'Parcours S4 structuré pour accueillir cours, fiches, QCM, TD et annales au même endroit.',
};

export const chapters: ModuleChapter[] = [1, 2, 3, 4].map((number) => ({
    id: `management-ch${number}`,
    number: String(number).padStart(2, '0'),
    title: `Chapitre ${number}`,
    description: 'À venir',
    path: `${BASE_PATH}/chapitre-${number}`,
    hasAudio: false,
    hasIntroVideo: false,
    isCompleted: false,
    isTDCompleted: false,
    estimatedTime: '45 min',
    objectives: ['Chapitre en préparation.'],
    validation: VALIDATION,
    steps: [
        { id: 'cours', label: 'Cours', state: 'soon' },
        { id: 'fiche', label: 'Fiche', state: 'soon' },
        { id: 'qcm', label: 'QCM', state: 'soon' },
        { id: 'td', label: 'TD', state: 'soon' },
        { id: 'corrige', label: 'Corrigé', state: 'soon' },
        { id: 'annale', label: 'Annale', state: 'soon' },
    ],
}));

export function getChapterById(chapterId: string) {
    return chapters.find((chapter) => chapter.id === chapterId);
}
