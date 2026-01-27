import {
    chapter1Questions,
    chapter2Questions,
    chapter3Questions,
    chapter4Questions,
    chapter5Questions,
    chapter6Questions,
    chapter7Questions,
    chapter8Questions,
    chapter9Questions,
    chapter10Questions,
} from './questions';

export interface Question {
    id: number;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
}

export interface Chapter {
    id: string;
    title: string;
    subtitle: string;
    color: string;
    questions: Question[];
}

export const chapters: Chapter[] = [
    {
        id: 'ch1',
        title: 'Chapitre 1',
        subtitle: 'Précurseurs : Ibn Khaldoun, Lumières, Comte, Saint-Simon',
        color: 'blue',
        questions: chapter1Questions,
    },
    {
        id: 'ch2',
        title: 'Chapitre 2',
        subtitle: 'Contexte d\'émergence : Révolutions & question sociale',
        color: 'blue',
        questions: chapter2Questions,
    },
    {
        id: 'ch3',
        title: 'Chapitre 3',
        subtitle: 'Durkheim et Weber : Pères fondateurs',
        color: 'blue',
        questions: chapter3Questions,
    },
    {
        id: 'ch4',
        title: 'Chapitre 4',
        subtitle: 'École de Chicago : Sociologie urbaine',
        color: 'blue',
        questions: chapter4Questions,
    },
    {
        id: 'ch5',
        title: 'Chapitre 5',
        subtitle: 'Débat contemporain : Bourdieu vs Lahire',
        color: 'blue',
        questions: chapter5Questions,
    },
    {
        id: 'ch6',
        title: 'Chapitre 6',
        subtitle: 'La monnaie : Simmel, Zelizer, Marx',
        color: 'green',
        questions: chapter6Questions,
    },
    {
        id: 'ch7',
        title: 'Chapitre 7',
        subtitle: 'La consommation : Veblen, Halbwachs',
        color: 'green',
        questions: chapter7Questions,
    },
    {
        id: 'ch8',
        title: 'Chapitre 8',
        subtitle: 'Société de consommation : Baudrillard, Debord',
        color: 'green',
        questions: chapter8Questions,
    },
    {
        id: 'ch9',
        title: 'Chapitre 9',
        subtitle: 'Le marché : Polanyi, Zelizer, Titmuss',
        color: 'green',
        questions: chapter9Questions,
    },
    {
        id: 'ch10',
        title: 'Chapitre 10',
        subtitle: 'Le travail : Mayo, Friedmann, Rifkin',
        color: 'green',
        questions: chapter10Questions,
    },
];

export const totalQuestions = chapters.reduce(
    (acc, chapter) => acc + chapter.questions.length,
    0
);
