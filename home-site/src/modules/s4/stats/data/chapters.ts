export interface Chapter {
    id: string;
    title: string;
    subtitle: string;
    path?: string;
}

export const chapters: Chapter[] = [
    { id: 'ch6', title: 'Ch 6', subtitle: 'Tables Statistiques : Lois Continues', path: '/s4/stats/chapitre-6' },
    { id: 'ch7', title: 'Ch 7', subtitle: 'Convergence en loi', path: '/s4/stats/chapitre-7' },
    { id: 'ch8', title: 'Ch 8', subtitle: 'Distributions d\'echantillonnage', path: '/s4/stats/chapitre-8' },
    { id: 'ch9', title: 'Ch 9', subtitle: 'Estimation Poncutelle', path: '/s4/stats/chapitre-9' },
    { id: 'ch10', title: 'Ch 10', subtitle: 'Tests du Xhi^2 d\'homogeneite, d\'independance et d\'adequation', path: '/s4/stats/chapitre-10' },
    { id: 'ch11', title: 'Ch 11', subtitle: 'Estimation par intervalle, tests de signification et de comparaison', path: '/s4/stats/chapitre-11' },
];
