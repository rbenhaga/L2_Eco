/**
 * Agora Premium - Types
 */

export type CourseKey = "macro" | "micro" | "stats" | "socio" | "maths";

export type Course = {
    key: CourseKey;
    title: string;
    subtitle: string;
    progress: number;
    nextUp: string;
    estMin: number;
    unreadUpdates: number;
    locked?: boolean;
};

export type UpdateItem = {
    id: string;
    courseKey: CourseKey;
    title: string;
    meta: string;
    type: "Chapitre" | "TD" | "Annale" | "QCM" | "Fiche" | "Corrigé";
    locked?: boolean;
};

export type Page = "dashboard" | "library" | "activity" | "course" | "reading";

export type ResourceType = "Cours" | "TD" | "QCM" | "Annales" | "Fiches";

export type ResourceItem = {
    id: string;
    type: ResourceType;
    title: string;
    meta: string;
    locked?: boolean;
};
