import { Math } from '../../../../components';

export interface MacroTDSheet {
  id: string;
  number: number;
  title: string;
  chapter: string;
  description: string;
  exercises: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
    solution: React.ReactNode;
  }>;
}

export const macroTDSheets: MacroTDSheet[] = [
  {
    id: 'ex1',
    number: 1,
    title: 'Offre de travail',
    chapter: 'Modèle classique',
    description: 'Salaire réel, contrainte budgétaire, TMS',
    exercises: [
      {
        id: 'ex1-main',
        title: 'Offre de travail (Modèle classique)',
        content: (
          <div className="space-y-3">
            <p><strong>Énoncé :</strong> M. Smith peut travailler avec un salaire nominal de 10€/h. Le coût de son panier de consommation est de 5€/h. Il dort 8h/jour.</p>
            <p><strong>Questions :</strong></p>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Calculer le salaire réel</li>
              <li>Tracer la contrainte budgétaire</li>
              <li>S'il travaille 7h/jour, quel est son TMS à l'optimum ?</li>
            </ol>
          </div>
        ),
        solution: (
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">1. Salaire réel :</p>
              <p><Math>{"\\frac{w}{P} = \\frac{10}{5} = 2"}</Math> unités de consommation par heure de travail</p>
            </div>
            <div>
              <p className="font-medium mb-2">2. Contrainte budgétaire :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Temps disponible (hors sommeil) : 24 - 8 = 16 heures</li>
                <li>Si Z = heures de loisir, L = 16 - Z = heures de travail</li>
                <li>Consommation max : <Math>{"C = 2 \\times (16 - Z) = 32 - 2Z"}</Math></li>
                <li>Pente de la contrainte = -2 (= salaire réel)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">3. TMS à l'optimum :</p>
              <p>À l'optimum, le TMS (Taux Marginal de Substitution) égale le salaire réel :</p>
              <p className="mt-2"><strong>TMS = 2</strong></p>
              <div className="mt-3 p-3 rounded-lg" style={{ background: 'rgb(var(--accent) / 0.05)', borderLeft: '3px solid rgb(var(--accent))' }}>
                <p className="text-sm">M. Smith est prêt à renoncer à <strong>2 unités de consommation</strong> pour obtenir <strong>1 heure de loisir supplémentaire</strong>. C'est exactement le "prix" du loisir (= salaire réel).</p>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'ex2',
    number: 2,
    title: 'Modèle IS/LM complet',
    chapter: 'Équilibre macroéconomique',
    description: 'Équations IS et LM · Équilibre macroéconomique',
    exercises: [
      {
        id: 'ex2-main',
        title: 'Modèle IS/LM complet',
        content: (
          <div className="space-y-3">
            <p><strong>Données :</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li><Math>{"C = 150 + 0,6(Y-T)"}</Math></li>
              <li><Math>{"I = 300 - 700i"}</Math></li>
              <li><Math>{"G = 250"}</Math>, <Math>{"T = 250"}</Math></li>
              <li><Math>{"\\frac{M^S}{P} = 1800"}</Math></li>
              <li><Math>{"\\frac{M^D}{P} = 1,5Y - 8000i"}</Math></li>
            </ul>
          </div>
        ),
        solution: (
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">Étape 1 : Équation IS</p>
              <p><Math>{"Y = 150 + 0,6(Y-250) + 300 - 700i + 250"}</Math></p>
              <p><Math>{"Y = 550 - 150 + 0,6Y - 700i"}</Math></p>
              <p><Math>{"0,4Y = 550 - 700i"}</Math></p>
              <div className="p-3 rounded-lg mt-2" style={{ background: 'rgb(var(--accent) / 0.1)' }}>
                <p className="font-semibold text-sm mb-1">Équation IS</p>
                <p className="text-lg"><Math>{"Y = 1375 - 1750i"}</Math></p>
              </div>
            </div>
            <div>
              <p className="font-medium mb-2">Étape 2 : Équation LM</p>
              <p><Math>{"1800 = 1,5Y - 8000i"}</Math></p>
              <p><Math>{"8000i = 1,5Y - 1800"}</Math></p>
              <div className="p-3 rounded-lg mt-2" style={{ background: 'rgb(var(--accent) / 0.1)' }}>
                <p className="font-semibold text-sm mb-1">Équation LM</p>
                <p className="text-lg"><Math>{"i = \\frac{3Y}{16000} - 0,225"}</Math></p>
              </div>
            </div>
            <div>
              <p className="font-medium mb-2">Étape 3 : Équilibre</p>
              <p>Substituer LM dans IS :</p>
              <p><Math>{"Y = 1375 - 1750 \\times \\left(\\frac{3Y}{16000} - 0,225\\right)"}</Math></p>
              <p className="mt-2"><Math>{"Y \\approx 1331,76"}</Math></p>
              <p><Math>{"i^* \\approx 2,47\\%"}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">Étape 4 : Vérification</p>
              <p><Math>{"C^* = 150 + 0,6(1331,76 - 250) = 799,06"}</Math></p>
              <p><Math>{"I^* = 300 - 700 \\times 0,0247 = 282,71"}</Math></p>
              <p><Math>{"C^* + I^* + G = 799,06 + 282,71 + 250 = 1331,77 \\approx Y^*"}</Math> ✓</p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'ex3',
    number: 3,
    title: 'Modèle WS/PS',
    chapter: 'Marché du travail',
    description: 'Salaire réel, chômage naturel, produit naturel',
    exercises: [
      {
        id: 'ex3-main',
        title: 'Modèle WS/PS',
        content: (
          <div className="space-y-3">
            <p><strong>Données :</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li><Math>{"P = 1,2W"}</Math> (marge de 20%)</li>
              <li><Math>{"\\frac{W}{P^e} = z(1-3u)"}</Math> avec <Math>{"z = 1"}</Math></li>
              <li>Population active <Math>{"L = 520"}</Math></li>
            </ul>
          </div>
        ),
        solution: (
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">1. Salaire réel PS :</p>
              <p><Math>{"\\frac{W}{P} = \\frac{1}{1+\\mu} = \\frac{1}{1,2} = 0,833"}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">2. Taux de chômage naturel :</p>
              <p><Math>{"1 - 3u_n = 0,833"}</Math></p>
              <p><Math>{"3u_n = 0,167"}</Math></p>
              <p><Math>{"u_n = 5,56\\%"}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">3. Produit naturel :</p>
              <p><Math>{"N_n = 520 \\times (1 - 0,0556) = 491,1"}</Math></p>
              <p><Math>{"Y_n = 491,1"}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">4. Effet d'une hausse de la marge à 25% :</p>
              <p><Math>{"\\frac{W}{P} = \\frac{1}{1,25} = 0,80"}</Math></p>
              <p><Math>{"1 - 3u'_n = 0,80"}</Math></p>
              <p><Math>{"u'_n = 6,67\\%"}</Math> → Le chômage augmente</p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'ex4',
    number: 4,
    title: 'Courbe de Phillips',
    chapter: 'Inflation et anticipations',
    description: 'Ratio de sacrifice, anticipations adaptatives',
    exercises: [
      {
        id: 'ex4-main',
        title: 'Courbe de Phillips',
        content: (
          <div className="space-y-3">
            <p><strong>Données :</strong> <Math>{"\\pi_t = \\pi^e_t + 0.4 - 4u_t"}</Math></p>
            <p><strong>Questions :</strong></p>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Calculer le ratio de sacrifice</li>
              <li>Calculer le taux de chômage naturel</li>
              <li>Anticipations nulles, <Math>{"u_t = 4\\%"}</Math> : calculer l'inflation</li>
              <li>Anticipations adaptatives, <Math>{"u_t = 4\\%"}</Math> : évolution sur 5 ans</li>
            </ol>
          </div>
        ),
        solution: (
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">1. Ratio de sacrifice :</p>
              <p><Math>{"\\text{Ratio} = \\frac{1}{\\alpha} = \\frac{1}{4} = 0.25"}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">2. Taux de chômage naturel :</p>
              <p><Math>{"u_n = \\frac{0.4}{4} = 10\\%"}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">3. Anticipations nulles :</p>
              <p><Math>{"\\pi_t = 0 + 0.4 - 4 \\times 0.04 = 24\\%"}</Math> (constant chaque année)</p>
            </div>
            <div>
              <p className="font-medium mb-2">4. Anticipations adaptatives :</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr style={{ background: 'rgb(var(--surface-2))' }}>
                      <th className="px-3 py-2 text-left font-semibold">Année t</th>
                      <th className="px-3 py-2 text-left font-semibold">uₜ (%)</th>
                      <th className="px-3 py-2 text-left font-semibold">πₜᵉ (%)</th>
                      <th className="px-3 py-2 text-left font-semibold">πₜ (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t" style={{ borderColor: 'rgb(var(--border-hairline))' }}>
                      <td className="px-3 py-2">0</td>
                      <td className="px-3 py-2">10</td>
                      <td className="px-3 py-2">0</td>
                      <td className="px-3 py-2">0</td>
                    </tr>
                    <tr className="border-t" style={{ borderColor: 'rgb(var(--border-hairline))' }}>
                      <td className="px-3 py-2">1</td>
                      <td className="px-3 py-2">4</td>
                      <td className="px-3 py-2">0</td>
                      <td className="px-3 py-2">24</td>
                    </tr>
                    <tr className="border-t" style={{ borderColor: 'rgb(var(--border-hairline))' }}>
                      <td className="px-3 py-2">2</td>
                      <td className="px-3 py-2">4</td>
                      <td className="px-3 py-2">24</td>
                      <td className="px-3 py-2">48</td>
                    </tr>
                    <tr className="border-t" style={{ borderColor: 'rgb(var(--border-hairline))' }}>
                      <td className="px-3 py-2">3</td>
                      <td className="px-3 py-2">4</td>
                      <td className="px-3 py-2">48</td>
                      <td className="px-3 py-2">72</td>
                    </tr>
                    <tr className="border-t" style={{ borderColor: 'rgb(var(--border-hairline))' }}>
                      <td className="px-3 py-2">4</td>
                      <td className="px-3 py-2">4</td>
                      <td className="px-3 py-2">72</td>
                      <td className="px-3 py-2">96</td>
                    </tr>
                    <tr className="border-t" style={{ borderColor: 'rgb(var(--border-hairline))' }}>
                      <td className="px-3 py-2">5</td>
                      <td className="px-3 py-2">4</td>
                      <td className="px-3 py-2">96</td>
                      <td className="px-3 py-2">120</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2">L'inflation augmente de <strong>24 points de % chaque année</strong> → Spirale inflationniste</p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'ex5',
    number: 5,
    title: 'Politique monétaire restrictive',
    chapter: 'AS/AD',
    description: 'Effets CT et ajustement MT',
    exercises: [
      {
        id: 'ex5-main',
        title: 'Politique monétaire restrictive (AS/AD)',
        content: (
          <div className="space-y-3">
            <p><strong>Situation :</strong> Économie à l'équilibre (<Math>{"Y = Y_n"}</Math>), la BC diminue M.</p>
            <p><strong>Questions :</strong></p>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Décrire les effets à court terme</li>
              <li>Expliquer le mécanisme d'ajustement vers le moyen terme</li>
              <li>Comparer l'équilibre final à l'équilibre initial</li>
            </ol>
          </div>
        ),
        solution: (
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">Effets à court terme :</p>
              <ol className="list-decimal pl-6 space-y-1">
                <li><Math>{"M \\downarrow \\Rightarrow \\frac{M}{P} \\downarrow"}</Math></li>
                <li>Marché monétaire : excès de demande → <Math>{"i \\uparrow"}</Math></li>
                <li><Math>{"i \\uparrow \\Rightarrow I \\downarrow \\Rightarrow Y \\downarrow"}</Math></li>
                <li><Math>{"Y \\downarrow \\Rightarrow u \\uparrow \\Rightarrow P \\downarrow"}</Math></li>
              </ol>
              <p className="mt-2"><strong>Graphiquement :</strong> AD → gauche, nouvel équilibre CT : <Math>{"Y_1 < Y_n"}</Math>, <Math>{"P_1 < P_0"}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">Ajustement vers le moyen terme :</p>
              <ol className="list-decimal pl-6 space-y-1">
                <li><Math>{"P_1 < P^e"}</Math> → Agents révisent : <Math>{"P^e \\downarrow"}</Math></li>
                <li>AS → bas</li>
                <li>Nouvel équilibre : <Math>{"Y_2 > Y_1"}</Math>, <Math>{"P_2 < P_1"}</Math></li>
                <li>Processus continue jusqu'à <Math>{"Y = Y_n"}</Math></li>
              </ol>
            </div>
            <div className="p-3 rounded-lg mt-3" style={{ background: 'rgb(var(--accent) / 0.05)', borderLeft: '3px solid rgb(var(--accent))' }}>
              <p className="font-semibold mb-2">Conclusion</p>
              <p><Math>{"Y_{MT} = Y_n"}</Math> (retour au produit naturel)</p>
              <p><Math>{"P_{MT} < P_0"}</Math> (niveau des prix plus bas)</p>
              <p className="mt-2">La politique monétaire est <strong>neutre sur Y à moyen terme</strong>.</p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'ex6',
    number: 6,
    title: 'Trappe à liquidité',
    chapter: 'Cas particulier',
    description: 'Inefficacité de la politique monétaire',
    exercises: [
      {
        id: 'ex6-main',
        title: 'Trappe à liquidité',
        content: (
          <div className="space-y-3">
            <p><strong>Situation :</strong> Suite à un choc négatif, <Math>{"Y < Y_n"}</Math> et <Math>{"i = 0"}</Math>.</p>
            <p><strong>Question :</strong> Quelles sont les différences avec le cas normal ?</p>
          </div>
        ),
        solution: (
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">Différences avec le cas normal :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>La politique monétaire est <strong>inefficace</strong> (taux déjà à 0)</li>
                <li>Le mécanisme d'ajustement par la baisse des prix ne fonctionne pas</li>
                <li><Math>{"P \\downarrow \\Rightarrow \\frac{M}{P} \\uparrow"}</Math> mais i ne peut pas baisser</li>
                <li>Pas de relance de l'investissement</li>
                <li>L'économie peut rester durablement sous <Math>{"Y_n"}</Math></li>
              </ul>
            </div>
            <div className="p-3 rounded-lg mt-3" style={{ background: 'rgb(239 68 68 / 0.1)', borderLeft: '3px solid rgb(239 68 68)' }}>
              <p className="font-semibold mb-2">Implication</p>
              <p>En trappe à liquidité, la politique budgétaire restrictive est <strong>contre-productive</strong>.</p>
              <p className="mt-2">Il faudrait au contraire une politique budgétaire <strong>expansionniste</strong>.</p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'ex7',
    number: 7,
    title: 'Politique de rigueur budgétaire',
    chapter: 'AS/AD',
    description: 'Effets CT/MT · Mécanisme d\'ajustement',
    exercises: [
      {
        id: 'ex7-main',
        title: 'Politique de rigueur budgétaire',
        content: (
          <div className="space-y-3">
            <p><strong>Situation initiale :</strong> <Math>{"Y = Y_n"}</Math>, anticipations adaptatives</p>
            <p><strong>Choc :</strong> Le gouvernement diminue les dépenses publiques G</p>
            <p><strong>Questions :</strong></p>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Décrire les effets à court terme</li>
              <li>Expliquer le mécanisme d'ajustement vers le moyen terme</li>
              <li>Que se passe-t-il en trappe à liquidité ?</li>
            </ol>
          </div>
        ),
        solution: (
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">Court terme (G ↓) :</p>
              <ol className="list-decimal pl-6 space-y-1">
                <li><Math>{"G \\downarrow"}</Math> → AD se déplace vers la <strong>gauche</strong></li>
                <li>Nouvel équilibre CT : <Math>{"Y_1 < Y_n"}</Math>, <Math>{"P_1 < P_0"}</Math></li>
                <li>Chômage augmente (<Math>{"u_1 > u_n"}</Math>)</li>
                <li>Inflation temporairement plus basse</li>
              </ol>
            </div>
            <div>
              <p className="font-medium mb-2">Moyen terme :</p>
              <ol className="list-decimal pl-6 space-y-1">
                <li><Math>{"P_1 < P^e"}</Math> → Agents révisent <Math>{"P^e"}</Math> à la baisse</li>
                <li>AS se déplace vers le <strong>bas</strong></li>
                <li>Y augmente progressivement vers <Math>{"Y_n"}</Math></li>
                <li>P continue de baisser</li>
              </ol>
              <p className="mt-2"><strong>Mécanisme de retour à <Math>{"Y_n"}</Math> :</strong></p>
              <p>Baisse des prix anticipés → Baisse des salaires nominaux → Baisse des coûts → Baisse des prix → Hausse de <Math>{"\\frac{M}{P}"}</Math> → Baisse de i → Hausse de I → Retour à <Math>{"Y_n"}</Math></p>
            </div>
            <div className="p-3 rounded-lg mt-3" style={{ background: 'rgb(239 68 68 / 0.1)', borderLeft: '3px solid rgb(239 68 68)' }}>
              <p className="font-semibold mb-2">En trappe à liquidité</p>
              <p>Si i = 0, le mécanisme d'ajustement ne fonctionne pas :</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li><Math>{"P \\downarrow \\Rightarrow \\frac{M}{P} \\uparrow"}</Math> mais i ne peut pas baisser</li>
                <li>Pas de relance de l'investissement</li>
                <li>La politique de rigueur budgétaire est <strong>contre-productive</strong></li>
              </ul>
            </div>
          </div>
        ),
      },
    ],
  },
];
