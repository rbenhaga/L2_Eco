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

// Index complet des ressources
export const searchIndex: SearchResult[] = [
  // S3 - Macroéconomie
  {
    id: 's3-macro-home',
    type: 'cours',
    title: 'Macroéconomie - Accueil',
    description: 'Vue d\'ensemble du module de macroéconomie',
    module: 'Macroéconomie',
    semester: 'S3',
    path: '/s3/macro',
    keywords: ['macro', 'économie', 'agrégats'],
  },
  {
    id: 's3-macro-ch1',
    type: 'chapter',
    title: 'Chapitre 1 - Introduction à la Macroéconomie',
    description: 'Les concepts fondamentaux de la macroéconomie',
    module: 'Macroéconomie',
    semester: 'S3',
    path: '/s3/macro/chapitre-1',
    keywords: ['pib', 'croissance', 'inflation', 'chômage'],
  },
  {
    id: 's3-macro-ch2',
    type: 'chapter',
    title: 'Chapitre 2 - La Comptabilité Nationale',
    description: 'Mesure de l\'activité économique',
    module: 'Macroéconomie',
    semester: 'S3',
    path: '/s3/macro/chapitre-2',
    keywords: ['comptabilité', 'agrégats', 'pib', 'pnb'],
  },
  {
    id: 's3-macro-ch3',
    type: 'chapter',
    title: 'Chapitre 3 - Le Modèle IS-LM',
    description: 'Équilibre sur les marchés des biens et de la monnaie',
    module: 'Macroéconomie',
    semester: 'S3',
    path: '/s3/macro/chapitre-3',
    keywords: ['is-lm', 'équilibre', 'taux d\'intérêt', 'investissement'],
  },
  {
    id: 's3-macro-ch4',
    type: 'chapter',
    title: 'Chapitre 4 - Politique Économique',
    description: 'Politiques monétaire et budgétaire',
    module: 'Macroéconomie',
    semester: 'S3',
    path: '/s3/macro/chapitre-4',
    keywords: ['politique', 'monétaire', 'budgétaire', 'relance'],
  },

  // S3 - Microéconomie
  {
    id: 's3-micro-home',
    type: 'cours',
    title: 'Microéconomie - Accueil',
    description: 'Vue d\'ensemble du module de microéconomie',
    module: 'Microéconomie',
    semester: 'S3',
    path: '/s3/micro',
    keywords: ['micro', 'consommateur', 'producteur', 'marché'],
  },
  {
    id: 's3-micro-ch0',
    type: 'chapter',
    title: 'Chapitre 0 - Rappels Mathématiques',
    description: 'Outils mathématiques pour la microéconomie',
    module: 'Microéconomie',
    semester: 'S3',
    path: '/s3/micro/chapitre-0',
    keywords: ['mathématiques', 'dérivées', 'optimisation'],
  },
  {
    id: 's3-micro-ch1',
    type: 'chapter',
    title: 'Chapitre 1 - Théorie du Consommateur',
    description: 'Préférences, utilité et demande',
    module: 'Microéconomie',
    semester: 'S3',
    path: '/s3/micro/chapitre-1',
    keywords: ['consommateur', 'utilité', 'préférences', 'demande'],
  },
  {
    id: 's3-micro-ch2',
    type: 'chapter',
    title: 'Chapitre 2 - Théorie du Producteur',
    description: 'Production, coûts et offre',
    module: 'Microéconomie',
    semester: 'S3',
    path: '/s3/micro/chapitre-2',
    keywords: ['producteur', 'production', 'coûts', 'offre'],
  },
  {
    id: 's3-micro-ch3',
    type: 'chapter',
    title: 'Chapitre 3 - Équilibre de Marché',
    description: 'Offre, demande et prix d\'équilibre',
    module: 'Microéconomie',
    semester: 'S3',
    path: '/s3/micro/chapitre-3',
    keywords: ['équilibre', 'marché', 'prix', 'quantité'],
  },
  {
    id: 's3-micro-ch4',
    type: 'chapter',
    title: 'Chapitre 4 - Concurrence Parfaite',
    description: 'Marché en concurrence parfaite',
    module: 'Microéconomie',
    semester: 'S3',
    path: '/s3/micro/chapitre-4',
    keywords: ['concurrence', 'parfaite', 'efficience'],
  },
  {
    id: 's3-micro-ch5',
    type: 'chapter',
    title: 'Chapitre 5 - Monopole',
    description: 'Pouvoir de marché et monopole',
    module: 'Microéconomie',
    semester: 'S3',
    path: '/s3/micro/chapitre-5',
    keywords: ['monopole', 'pouvoir de marché', 'discrimination'],
  },
  {
    id: 's3-micro-ch6',
    type: 'chapter',
    title: 'Chapitre 6 - Oligopole',
    description: 'Interactions stratégiques entre firmes',
    module: 'Microéconomie',
    semester: 'S3',
    path: '/s3/micro/chapitre-6',
    keywords: ['oligopole', 'cournot', 'bertrand', 'stackelberg'],
  },
  {
    id: 's3-micro-ch7',
    type: 'chapter',
    title: 'Chapitre 7 - Externalités et Biens Publics',
    description: 'Défaillances de marché',
    module: 'Microéconomie',
    semester: 'S3',
    path: '/s3/micro/chapitre-7',
    keywords: ['externalités', 'biens publics', 'défaillances'],
  },

  // S3 - Statistiques
  {
    id: 's3-stats-home',
    type: 'cours',
    title: 'Statistiques - Accueil',
    description: 'Vue d\'ensemble du module de statistiques',
    module: 'Statistiques',
    semester: 'S3',
    path: '/s3/stats',
    keywords: ['stats', 'probabilités', 'variables aléatoires'],
  },
  {
    id: 's3-stats-ch1',
    type: 'chapter',
    title: 'Chapitre 1 - Probabilités',
    description: 'Théorie des probabilités et événements',
    module: 'Statistiques',
    semester: 'S3',
    path: '/s3/stats/chapitre-1',
    keywords: ['probabilités', 'événements', 'loi'],
  },
  {
    id: 's3-stats-ch2',
    type: 'chapter',
    title: 'Chapitre 2 - Variables Aléatoires',
    description: 'Variables aléatoires discrètes et continues',
    module: 'Statistiques',
    semester: 'S3',
    path: '/s3/stats/chapitre-2',
    keywords: ['variables', 'aléatoires', 'espérance', 'variance'],
  },
  {
    id: 's3-stats-ch3',
    type: 'chapter',
    title: 'Chapitre 3 - Lois de Probabilité',
    description: 'Lois usuelles (Bernoulli, Binomiale, Normale)',
    module: 'Statistiques',
    semester: 'S3',
    path: '/s3/stats/chapitre-3',
    keywords: ['lois', 'bernoulli', 'binomiale', 'normale', 'poisson'],
  },
  {
    id: 's3-stats-ch4',
    type: 'chapter',
    title: 'Chapitre 4 - Statistique Descriptive',
    description: 'Analyse et synthèse de données',
    module: 'Statistiques',
    semester: 'S3',
    path: '/s3/stats/chapitre-4',
    keywords: ['descriptive', 'moyenne', 'médiane', 'écart-type'],
  },
  {
    id: 's3-stats-ch5',
    type: 'chapter',
    title: 'Chapitre 5 - Estimation',
    description: 'Estimation ponctuelle et par intervalle',
    module: 'Statistiques',
    semester: 'S3',
    path: '/s3/stats/chapitre-5',
    keywords: ['estimation', 'intervalle de confiance', 'estimateur'],
  },

  // S3 - Sociologie
  {
    id: 's3-socio-home',
    type: 'cours',
    title: 'Sociologie - Accueil',
    description: 'Vue d\'ensemble du module de sociologie',
    module: 'Sociologie',
    semester: 'S3',
    path: '/s3/socio',
    keywords: ['socio', 'société', 'classes sociales'],
  },
  {
    id: 's3-socio-ch1',
    type: 'chapter',
    title: 'Chapitre 1 - Introduction à la Sociologie',
    description: 'Fondements de la sociologie',
    module: 'Sociologie',
    semester: 'S3',
    path: '/s3/socio/chapitre1',
    keywords: ['sociologie', 'durkheim', 'weber', 'marx'],
  },
  {
    id: 's3-socio-ch2',
    type: 'chapter',
    title: 'Chapitre 2 - Stratification Sociale',
    description: 'Classes sociales et inégalités',
    module: 'Sociologie',
    semester: 'S3',
    path: '/s3/socio/chapitre2',
    keywords: ['classes', 'inégalités', 'stratification'],
  },
  {
    id: 's3-socio-ch3',
    type: 'chapter',
    title: 'Chapitre 3 - Socialisation',
    description: 'Processus de socialisation',
    module: 'Sociologie',
    semester: 'S3',
    path: '/s3/socio/chapitre3',
    keywords: ['socialisation', 'famille', 'école'],
  },

  // S4 - Macroéconomie
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

  // S4 - Microéconomie
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

  // S4 - Statistiques
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

  // S4 - Management
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

/**
 * Fonction de recherche fuzzy
 */
export function searchResources(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  const queryWords = normalizedQuery.split(/\s+/);

  return searchIndex
    .map((item) => {
      let score = 0;

      // Recherche dans le titre (poids fort)
      const titleLower = item.title.toLowerCase();
      if (titleLower.includes(normalizedQuery)) {
        score += 100;
      }
      queryWords.forEach((word) => {
        if (titleLower.includes(word)) {
          score += 50;
        }
      });

      // Recherche dans la description
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

      // Recherche dans le module
      if (item.module.toLowerCase().includes(normalizedQuery)) {
        score += 75;
      }

      // Recherche dans les keywords
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
    .slice(0, 10); // Top 10 résultats
}
