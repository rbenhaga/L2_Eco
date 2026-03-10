/**
 * Search Index - Index toutes les ressources du site
 * Permet une recherche rapide et pertinente
 */

export interface SearchResult {
  id: string;
  type: 'cours' | 'td' | 'qcm' | 'annales' | 'chapter';
  title: string;
  description?: string;
  module: string;
  semester: string;
  path: string;
  keywords?: string[];
}

export const searchIndex: SearchResult[] = [
  {
    id: 's4-macro-home',
    type: 'cours',
    title: 'Macroéconomie Avancée - Accueil',
    description: 'Vue d\'ensemble du module de macroéconomie S4',
    module: 'Macroéconomie',
    semester: 'S4',
    path: '/s4/macro',
    keywords: ['macro', 'croissance', 'cycles'],
  },
  {
    id: 's4-macro-ch1',
    type: 'chapter',
    title: 'Chapitre 1 - Croissance Économique',
    description: 'Théories de la croissance',
    module: 'Macroéconomie',
    semester: 'S4',
    path: '/s4/macro/chapitre-1',
    keywords: ['croissance', 'solow', 'productivité'],
  },
  {
    id: 's4-micro-home',
    type: 'cours',
    title: 'Microéconomie Avancée - Accueil',
    description: 'Vue d\'ensemble du module de microéconomie S4',
    module: 'Microéconomie',
    semester: 'S4',
    path: '/s4/micro',
    keywords: ['micro', 'théorie des jeux', 'information'],
  },
  {
    id: 's4-micro-ch1',
    type: 'chapter',
    title: 'Chapitre 1 - Théorie des Jeux',
    description: 'Jeux stratégiques et équilibre de Nash',
    module: 'Microéconomie',
    semester: 'S4',
    path: '/s4/micro/chapitre-1',
    keywords: ['jeux', 'nash', 'stratégie'],
  },
  {
    id: 's4-stats-home',
    type: 'cours',
    title: 'Statistiques Avancées - Accueil',
    description: 'Vue d\'ensemble du module de statistiques S4',
    module: 'Statistiques',
    semester: 'S4',
    path: '/s4/stats',
    keywords: ['stats', 'inférence', 'régression'],
  },
  {
    id: 's4-stats-ch8',
    type: 'chapter',
    title: 'Chapitre 8 - Régression Linéaire',
    description: 'Modèle de régression linéaire simple et multiple',
    module: 'Statistiques',
    semester: 'S4',
    path: '/s4/stats/chapitre-8',
    keywords: ['régression', 'linéaire', 'moindres carrés', 'corrélation'],
  },
  {
    id: 's4-management-home',
    type: 'cours',
    title: 'Management - Accueil',
    description: 'Vue d\'ensemble du module de management',
    module: 'Management',
    semester: 'S4',
    path: '/s4/management',
    keywords: ['management', 'organisation', 'stratégie'],
  },
  {
    id: 's4-management-ch1',
    type: 'chapter',
    title: 'Chapitre 1 - Introduction au Management',
    description: 'Fondements du management',
    module: 'Management',
    semester: 'S4',
    path: '/s4/management/chapitre-1',
    keywords: ['management', 'organisation', 'leadership'],
  },
];

export function searchResources(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  const queryWords = normalizedQuery.split(/\s+/);

  return searchIndex
    .map((item) => {
      let score = 0;

      const titleLower = item.title.toLowerCase();
      if (titleLower.includes(normalizedQuery)) {
        score += 100;
      }
      queryWords.forEach((word) => {
        if (titleLower.includes(word)) {
          score += 50;
        }
      });

      if (item.description) {
        const descLower = item.description.toLowerCase();
        if (descLower.includes(normalizedQuery)) {
          score += 50;
        }
        queryWords.forEach((word) => {
          if (descLower.includes(word)) {
            score += 25;
          }
        });
      }

      if (item.module.toLowerCase().includes(normalizedQuery)) {
        score += 75;
      }

      if (item.keywords) {
        item.keywords.forEach((keyword) => {
          if (keyword.includes(normalizedQuery)) {
            score += 60;
          }
          queryWords.forEach((word) => {
            if (keyword.includes(word)) {
              score += 30;
            }
          });
        });
      }

      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}