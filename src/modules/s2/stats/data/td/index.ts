// Types
export type { Exercise, TDSheet, YearData, Difficulty, SkillTag, CourseReminder } from './types';

// 2025-2026
export { TD1_2526 } from './2025-2026/TD1_Algebre_Boole';
export { TD2_2526 } from './2025-2026/TD2_VA_Discretes';
export { TD3_2526 } from './2025-2026/TD3_VA_Continues';
export { TD4_2526 } from './2025-2026/TD4_Lois_Usuelles';
export { TD5_2526 } from './2025-2026/TD5_VA_Discretes_2D';
export { TD6_2526 } from './2025-2026/TD6_VA_Continues_2D';

// 2024-2025
export { TD1_2425 } from './2024-2025/TD1_Algebre_Boole';
export { TD2_2425 } from './2024-2025/TD2_VA_Discretes';
export { TD3_2425 } from './2024-2025/TD3_VA_Continues';
export { TD4_2425 } from './2024-2025/TD4_Lois_Usuelles';

// All TDs grouped by year
import { TD1_2526 } from './2025-2026/TD1_Algebre_Boole';
import { TD2_2526 } from './2025-2026/TD2_VA_Discretes';
import { TD3_2526 } from './2025-2026/TD3_VA_Continues';
import { TD4_2526 } from './2025-2026/TD4_Lois_Usuelles';
import { TD5_2526 } from './2025-2026/TD5_VA_Discretes_2D';
import { TD6_2526 } from './2025-2026/TD6_VA_Continues_2D';

import { TD1_2425 } from './2024-2025/TD1_Algebre_Boole';
import { TD2_2425 } from './2024-2025/TD2_VA_Discretes';
import { TD3_2425 } from './2024-2025/TD3_VA_Continues';
import { TD4_2425 } from './2024-2025/TD4_Lois_Usuelles';

import type { YearData, TDSheet } from './types';

export const allYears: YearData[] = [
  {
    year: '2025-2026',
    color: 'blue',
    tds: [TD1_2526, TD2_2526, TD3_2526, TD4_2526, TD5_2526, TD6_2526],
  },
  {
    year: '2024-2025',
    color: 'emerald',
    tds: [TD1_2425, TD2_2425, TD3_2425, TD4_2425],
  },
];

// Structure par thème (TD) avec les années disponibles
export interface TDTheme {
  id: string;
  number: number;
  title: string;
  chapter: string;
  description: string;
  years: { year: string; td: TDSheet }[];
}

export const tdThemes: TDTheme[] = [
  {
    id: 'td1',
    number: 1,
    title: 'Algèbre de Boole et Calcul de probabilités',
    chapter: 'CH1',
    description: 'Construction d\'algèbres, probabilités conditionnelles, Bayes',
    years: [
      { year: '2025-2026', td: TD1_2526 },
      { year: '2024-2025', td: TD1_2425 },
    ],
  },
  {
    id: 'td2',
    number: 2,
    title: 'Variables aléatoires discrètes 1D',
    chapter: 'CH2',
    description: 'Lois de probabilité, espérance, variance, covariance',
    years: [
      { year: '2025-2026', td: TD2_2526 },
      { year: '2024-2025', td: TD2_2425 },
    ],
  },
  {
    id: 'td3',
    number: 3,
    title: 'Variables aléatoires continues 1D',
    chapter: 'CH3',
    description: 'Densités, fonction de répartition, loi Gamma',
    years: [
      { year: '2025-2026', td: TD3_2526 },
      { year: '2024-2025', td: TD3_2425 },
    ],
  },
  {
    id: 'td4',
    number: 4,
    title: 'Lois usuelles discrètes',
    chapter: 'CH4',
    description: 'Binomiale, Poisson, Hypergéométrique, approximations',
    years: [
      { year: '2025-2026', td: TD4_2526 },
      { year: '2024-2025', td: TD4_2425 },
    ],
  },
  {
    id: 'td5',
    number: 5,
    title: 'Variables aléatoires discrètes 2D',
    chapter: 'CH5',
    description: 'Lois conjointes, marginales, conditionnelles (discret)',
    years: [
      { year: '2025-2026', td: TD5_2526 },
    ],
  },
  {
    id: 'td6',
    number: 6,
    title: 'Variables aléatoires continues 2D',
    chapter: 'CH5',
    description: 'Densités conjointes, marginales, méthode des 4 bornes',
    years: [
      { year: '2025-2026', td: TD6_2526 },
    ],
  },
];
