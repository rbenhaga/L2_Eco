/**
 * ModuleHub Utilities
 * Helper functions for module hub operations
 *
 * Data is keyed by "moduleId" for S3 (default) and "s4:moduleId" for S4.
 * Use getSemesterKey(baseRoute, moduleId) to build the correct key.
 */

import type { ModuleId } from './types';

/**
 * Extract semester-specific lookup key from baseRoute.
 * e.g. baseRoute="/s4/stats" + moduleId="stats" → "s4:stats"
 *      baseRoute="/s3/stats" + moduleId="stats" → "stats"  (S3 = default)
 */
export function getSemesterKey(baseRoute: string, moduleId: ModuleId): string {
    const semester = baseRoute.split('/')[1]; // "s3" | "s4"
    if (semester === 's4') return `s4:${moduleId}`;
    return moduleId; // S3 is the default (backward-compatible)
}

export function getTDCount(moduleId: ModuleId, baseRoute?: string): number {
    const key = baseRoute ? getSemesterKey(baseRoute, moduleId) : moduleId;
    const list = TD_DATA[key];
    return list ? list.length : 0;
}

export function getQCMCount(moduleId: ModuleId, baseRoute?: string): number {
    const key = baseRoute ? getSemesterKey(baseRoute, moduleId) : moduleId;
    const list = QCM_DATA[key];
    return list ? list.length : 0;
}

export function getAnnalesData(moduleId: ModuleId, baseRoute?: string) {
    const key = baseRoute ? getSemesterKey(baseRoute, moduleId) : moduleId;
    return ANNALES_DATA[key] || ANNALES_DATA['default'] || [];
}

export function getAnnalesCount(moduleId: ModuleId, baseRoute?: string): number {
    return getAnnalesData(moduleId, baseRoute).length;
}

export const TD_DATA: Record<string, Array<{ id: string; title: string; description: string; count: string; route?: string }>> = {
    // ── S3 (default keys) ──
    macro: [
        { id: 'ex1', title: 'Exercice 1 : Offre de travail', description: 'Modèle classique · Salaire réel, contrainte budgétaire, TMS', count: '3 questions' },
        { id: 'ex2', title: 'Exercice 2 : Modèle IS/LM complet', description: 'Équations IS et LM · Équilibre macroéconomique', count: '4 étapes' },
        { id: 'ex3', title: 'Exercice 3 : Modèle WS/PS', description: 'Salaire réel, chômage naturel, produit naturel', count: '4 questions' },
        { id: 'ex4', title: 'Exercice 4 : Courbe de Phillips', description: 'Ratio de sacrifice, anticipations adaptatives', count: '4 questions' },
        { id: 'ex5', title: 'Exercice 5 : Politique monétaire restrictive', description: 'AS/AD · Effets CT et ajustement MT', count: 'Analyse complète' },
        { id: 'ex6', title: 'Exercice 6 : Trappe à liquidité', description: 'Inefficacité de la politique monétaire', count: 'Analyse' },
        { id: 'ex7', title: 'Exercice 7 : Politique de rigueur budgétaire', description: 'Effets CT/MT · Mécanisme d\'ajustement', count: 'Analyse complète' }
    ],
    micro: [
        { id: 'td1', title: 'TD1 : Théorie du Consommateur', description: 'Contrainte budgétaire, TMS, Cobb-Douglas', count: '2 exercices' },
        { id: 'td2', title: 'TD2 : Arbitrage Travail-Loisir', description: 'Offre de travail, effet substitution/revenu', count: '1 exercice' },
        { id: 'td3', title: 'TD3 : Choix Intertemporels', description: 'Épargne, emprunt, taux réel vs nominal', count: '1 exercice' },
        { id: 'td4', title: 'TD4 : Surplus et Bien-être', description: 'Surplus consommateur/producteur, perte sèche', count: '1 exercice' },
        { id: 'td5', title: 'TD5 : Théorie du Producteur', description: 'Minimisation des coûts, TMST', count: '1 exercice' },
        { id: 'td6', title: 'TD6 : Concurrence Parfaite', description: 'Offre de la firme, seuils de fermeture', count: '1 exercice' },
        { id: 'td7', title: 'TD7 : Monopole et Oligopole', description: 'Monopole, Cournot, Bertrand, Stackelberg', count: '2 exercices' }
    ],
    stats: [
        { id: 'td1', title: 'TD1 : Algèbre de Boole et Calcul de probabilités', description: 'CH1 · Construction d\'algèbres, probabilités conditionnelles, Bayes', count: '2 années' },
        { id: 'td2', title: 'TD2 : Variables aléatoires discrètes 1D', description: 'CH2 · Lois de probabilité, espérance, variance, covariance', count: '2 années' },
        { id: 'td3', title: 'TD3 : Variables aléatoires continues 1D', description: 'CH3 · Densités, fonction de répartition, loi Gamma', count: '2 années' },
        { id: 'td4', title: 'TD4 : Lois usuelles discrètes', description: 'CH4 · Binomiale, Poisson, Hypergéométrique, approximations', count: '2 années' },
        { id: 'td5', title: 'TD5 : Variables aléatoires discrètes 2D', description: 'CH5 · Lois conjointes, marginales, conditionnelles (discret)', count: '1 année' },
        { id: 'td6', title: 'TD6 : Variables aléatoires continues 2D', description: 'CH5 · Densités conjointes, marginales, méthode des 4 bornes', count: '1 année' }
    ],
    socio: [],

    // ── S4 keys ──
    's4:stats': [
        { id: 'td3', title: 'TD 3 : Estimation Ponctuelle — Correction', description: 'CH9 · EMV, biais, convergence, efficacité, exhaustivité · 5 exercices complets', count: '5 exercices', route: '/s4/stats/correction-td-3' },
    ],
    's4:macro': [],
    's4:micro': [],
    's4:management': [],
};

export const QCM_DATA: Record<string, Array<{ id: string; title: string; subtitle: string; count: number }>> = {
    // ── S3 (default keys) ──
    macro: [
        { id: 'islm', title: 'IS-LM', subtitle: 'Équilibre macroéconomique de court terme', count: 15 },
        { id: 'wsps', title: 'WS-PS', subtitle: 'Marché du travail et chômage naturel', count: 17 },
        { id: 'asad', title: 'AS-AD', subtitle: 'Équilibre macroéconomique et dynamique', count: 12 },
        { id: 'phillips', title: 'Phillips & Politique', subtitle: 'Inflation, anticipations et BCE', count: 20 },
        { id: 'bonus', title: 'Bonus', subtitle: 'Notions complémentaires du cours', count: 5 },
        { id: 'annales', title: 'Annales', subtitle: 'Questions type examen et calculs', count: 10 }
    ],
    micro: [
        { id: 'ch0', title: 'Chapitre 0', subtitle: 'Théorie du consommateur', count: 16 },
        { id: 'ch1', title: 'Chapitre 1', subtitle: 'Offre de travail', count: 15 },
        { id: 'ch2', title: 'Chapitre 2', subtitle: 'Choix intertemporels', count: 12 },
        { id: 'ch3', title: 'Chapitre 3', subtitle: 'Équilibre de marché', count: 18 },
        { id: 'ch5', title: 'Chapitre 5', subtitle: 'Théorie du producteur', count: 16 },
        { id: 'ch6', title: 'Chapitre 6', subtitle: 'Concurrence parfaite', count: 14 },
        { id: 'ch7', title: 'Chapitre 7', subtitle: 'Monopole et oligopole', count: 20 }
    ],
    stats: [
        { id: 'ch1', title: 'Chapitre 1', subtitle: 'Algèbre de Boole et probabilités', count: 15 },
        { id: 'ch2', title: 'Chapitre 2', subtitle: 'Variables aléatoires discrètes', count: 22 },
        { id: 'ch3', title: 'Chapitre 3', subtitle: 'Variables aléatoires continues', count: 20 },
        { id: 'ch4', title: 'Chapitre 4', subtitle: 'Couples de variables aléatoires', count: 18 },
        { id: 'annales', title: 'Annales', subtitle: 'Questions d\'examens', count: 15 }
    ],
    socio: [
        { id: 'ch1', title: 'Chapitre 1', subtitle: 'Durkheim et le fait social', count: 12 },
        { id: 'ch2', title: 'Chapitre 2', subtitle: 'Weber et l\'action sociale', count: 14 },
        { id: 'ch3', title: 'Chapitre 3', subtitle: 'Marx et les classes sociales', count: 16 },
        { id: 'ch4', title: 'Chapitre 4', subtitle: 'Bourdieu et la reproduction', count: 18 }
    ],

    // ── S4 keys ──
    's4:stats': [],
    's4:macro': [],
    's4:micro': [],
    's4:management': [],
};

export const ANNALES_DATA: Record<string, Array<{ title: string; description: string; path: string; isNew?: boolean; hasCorrection?: boolean; session?: string }>> = {
    // ── S3 Annales (per-module, real routes only) ──
    stats: [
        { title: "Partiel 2024-2025", description: "Sujet complet avec corrigé détaillé", path: '/s3/stats/annales', isNew: true, hasCorrection: true, session: 'Partiel' },
        { title: "Correction détaillée", description: "Corrigé pas à pas du partiel", path: '/s3/stats/correction', hasCorrection: true, session: 'Correction' },
    ],
    micro: [
        { title: "Partiel 2024-2025", description: "Sujet d'examen avec éléments de correction", path: '/s3/micro/annales', isNew: true, hasCorrection: false, session: 'Partiel' },
    ],
    macro: [],
    socio: [],

    // Fallback for modules without specific data
    default: [],

    // ── S4 keys ──
    's4:stats': [],
    's4:macro': [],
    's4:micro': [],
    's4:management': [],
};
