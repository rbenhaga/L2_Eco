import type { ReactNode } from 'react';

// Difficulté de l'exercice (1 = facile, 2 = moyen, 3 = difficile)
export type Difficulty = 1 | 2 | 3;

// Tags de compétences possibles
export type SkillTag =
  | 'Algèbre de Boole'
  | 'Probabilités conditionnelles'
  | 'Bayes'
  | 'Indépendance'
  | 'Espérance'
  | 'Variance'
  | 'Covariance'
  | 'Fonction de répartition'
  | 'Densité'
  | 'Intégration'
  | 'Loi Binomiale'
  | 'Loi Poisson'
  | 'Loi Normale'
  | 'Loi Exponentielle'
  | 'Loi Gamma'
  | 'Loi Uniforme'
  | 'Approximations'
  | 'Loi marginale'
  | 'Loi conditionnelle'
  | 'VA 2D'
  | 'Méthode des 4 bornes'
  | 'Régression';

export interface Exercise {
  id: string;
  title: string;
  content: ReactNode;
  solution: ReactNode;
  difficulty?: Difficulty;
  tags?: SkillTag[];
  hint?: string; // Indice optionnel
}

// Rappels de cours pour un TD
export interface CourseReminder {
  title: string;
  formula: string; // LaTeX
}

export interface TDSheet {
  id: string;
  title: string;
  chapter: string;
  year: string;
  exercises: Exercise[];
  reminders?: CourseReminder[]; // Rappels de cours
}

export interface YearData {
  year: string;
  color: string;
  tds: TDSheet[];
}
