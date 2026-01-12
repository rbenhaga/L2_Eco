/**
 * Agora Premium - Mock Data
 */

import type { Course, UpdateItem, ResourceItem, CourseKey } from "./types";

export const COURSES: Course[] = [
    {
        key: "macro",
        title: "Macroéconomie",
        subtitle: "Modèles IS-LM, WS-PS, AS-AD et politiques économiques",
        progress: 65,
        nextUp: "Chapitre 5 · Modèle AS‑AD",
        estMin: 12,
        unreadUpdates: 1,
    },
    {
        key: "stats",
        title: "Statistiques",
        subtitle: "Probabilités, variables aléatoires et lois usuelles",
        progress: 80,
        nextUp: "QCM · Variables aléatoires",
        estMin: 8,
        unreadUpdates: 2,
    },
    {
        key: "micro",
        title: "Microéconomie",
        subtitle: "Théorie du consommateur, du producteur et équilibre",
        progress: 45,
        nextUp: "Chapitre 3 · Équilibre du consommateur",
        estMin: 18,
        unreadUpdates: 0,
    },
    {
        key: "socio",
        title: "Sociologie",
        subtitle: "Concepts fondamentaux et théories sociologiques",
        progress: 30,
        nextUp: "Fiche · Weber, Durkheim",
        estMin: 10,
        unreadUpdates: 0,
    },
    {
        key: "maths",
        title: "Mathématiques",
        subtitle: "Analyse, algèbre linéaire et optimisation",
        progress: 0,
        nextUp: "Chapitre 1 · Fonctions",
        estMin: 0,
        unreadUpdates: 0,
        locked: true,
    },
];

export const UPDATES: UpdateItem[] = [
    {
        id: "u1",
        courseKey: "macro",
        title: "Chapitre 6 · Politique monétaire et inflation",
        meta: "Corrigé publié · Aujourd'hui",
        type: "Chapitre",
    },
    {
        id: "u2",
        courseKey: "stats",
        title: "TD 4 · Tests d'hypothèses + Corrigé",
        meta: "Nouveau · Aujourd'hui",
        type: "TD",
    },
    {
        id: "u3",
        courseKey: "stats",
        title: "Sujet Partiel 2024 + Corrigé",
        meta: "Corrigé publié · Aujourd'hui",
        type: "Annale",
    },
    {
        id: "u4",
        courseKey: "micro",
        title: "Fiche · Élasticités prix et revenu",
        meta: "Ajout · Hier",
        type: "Fiche",
        locked: true,
    },
    {
        id: "u5",
        courseKey: "socio",
        title: "QCM · Domination et légitimité",
        meta: "Ajout · Hier",
        type: "QCM",
        locked: true,
    },
];

export const COURSE_RESOURCES: Record<CourseKey, ResourceItem[]> = {
    macro: [
        { id: "m-c1", type: "Cours", title: "Chapitre 1 · Introduction", meta: "PDF · 18 pages" },
        { id: "m-c2", type: "Cours", title: "Chapitre 2 · IS‑LM", meta: "PDF · 24 pages" },
        { id: "m-c3", type: "Cours", title: "Chapitre 5 · AS‑AD", meta: "PDF · 22 pages" },
        { id: "m-td1", type: "TD", title: "TD 3 · IS‑LM (exos)", meta: "Exercices + corrigé" },
        { id: "m-td2", type: "TD", title: "TD 4 · AS‑AD (exos)", meta: "Exercices + corrigé" },
        { id: "m-q1", type: "QCM", title: "QCM · IS‑LM", meta: "20 questions" },
        { id: "m-a1", type: "Annales", title: "Partiel 2024", meta: "Sujet + corrigé" },
    ],
    micro: [
        { id: "mi-c1", type: "Cours", title: "Chapitre 1 · Préférences", meta: "PDF" },
        { id: "mi-c2", type: "Cours", title: "Chapitre 3 · Équilibre du consommateur", meta: "PDF" },
        { id: "mi-td1", type: "TD", title: "TD 2 · Utilité & choix", meta: "Exercices + corrigé" },
        { id: "mi-q1", type: "QCM", title: "QCM · Élasticités", meta: "15 questions", locked: true },
        { id: "mi-f1", type: "Fiches", title: "Fiche · Élasticités", meta: "Synthèse", locked: true },
    ],
    stats: [
        { id: "s-c1", type: "Cours", title: "Chapitre · Variables aléatoires", meta: "PDF" },
        { id: "s-td4", type: "TD", title: "TD 4 · Tests d'hypothèses", meta: "Exercices + corrigé" },
        { id: "s-q1", type: "QCM", title: "QCM · Lois usuelles", meta: "30 questions" },
        { id: "s-a1", type: "Annales", title: "Sujet Partiel 2024", meta: "Sujet + corrigé" },
    ],
    socio: [
        { id: "so-c1", type: "Cours", title: "Chapitre · Sociologie classique", meta: "PDF" },
        { id: "so-q1", type: "QCM", title: "QCM · Concepts fondamentaux", meta: "20 questions" },
    ],
    maths: [
        { id: "ma-c1", type: "Cours", title: "Chapitre 1 · Fonctions", meta: "PDF", locked: true },
        { id: "ma-td1", type: "TD", title: "TD 1 · Dérivées", meta: "Exercices", locked: true },
    ],
};
