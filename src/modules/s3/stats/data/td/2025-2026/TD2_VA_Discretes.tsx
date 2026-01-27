import { Math as M } from '../../../../../../components';
import type { TDSheet } from '../types';

export const TD2_2526: TDSheet = {
  id: 'td2-2526',
  title: 'TD2 - Variables aléatoires discrètes à une dimension',
  chapter: 'CH2',
  year: '2025-2026',
  reminders: [
    { title: 'Espérance', formula: 'E(X) = \\sum_i x_i \\cdot P(X = x_i)' },
    { title: 'Variance', formula: 'V(X) = E(X^2) - [E(X)]^2 = E[(X - \\mu)^2]' },
    { title: 'Covariance', formula: 'Cov(X,Y) = E(XY) - E(X)E(Y)' },
    { title: 'Corrélation', formula: 'r(X,Y) = \\frac{Cov(X,Y)}{\\sigma_X \\cdot \\sigma_Y}' },
    { title: 'Propriétés linéaires', formula: 'V(aX + bY) = a^2V(X) + b^2V(Y) + 2ab\\,Cov(X,Y)' },
  ],
  exercises: [
    {
      id: 'ex1',
      title: 'Exercice 1 - Combinaisons linéaires de VA indépendantes',
      difficulty: 2,
      tags: ['Espérance', 'Variance', 'Covariance'],
      hint: 'Utilisez les propriétés de linéarité de l\'espérance et la formule de variance d\'une somme.',
      content: (
        <div>
          <p>X et Y indépendantes avec E(X) = 20, V(X) = 35, E(Y) = 45, V(Y) = 60.</p>
          <p>A = X + 3Y, B = 2X + Y</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Calculer E(A), E(B), E(2B)</li>
            <li>Calculer V(A), V(B)</li>
            <li>Calculer Cov(A,B)</li>
            <li>Calculer r(A,B)</li>
            <li>Calculer Cov(B,Y)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>Comme X et Y indépendantes:</strong> Cov(X,Y) = 0</p>
          
          <p><strong>1. Espérances:</strong></p>
          <M>{"E(A) = E(X) + 3E(Y) = 20 + 3(45) = \\boxed{155}"}</M>
          <M>{"E(B) = 2E(X) + E(Y) = 2(20) + 45 = \\boxed{85}"}</M>
          <M>{"E(2B) = 2E(B) = \\boxed{170}"}</M>
          
          <p><strong>2. Variances:</strong></p>
          <M>{"V(A) = V(X) + 9V(Y) = 35 + 9(60) = \\boxed{575}"}</M>
          <M>{"V(B) = 4V(X) + V(Y) = 4(35) + 60 = \\boxed{200}"}</M>
          
          <p><strong>3. Cov(A,B):</strong></p>
          <M>{"Cov(A,B) = Cov(X + 3Y, 2X + Y) = 2V(X) + 3V(Y) = 2(35) + 3(60) = \\boxed{250}"}</M>
          
          <p><strong>4. r(A,B):</strong></p>
          <M>{"r(A,B) = \\frac{250}{\\sqrt{575} \\cdot \\sqrt{200}} = \\frac{250}{339.12} = \\boxed{0.737}"}</M>
          
          <p><strong>5. Cov(B,Y):</strong></p>
          <M>{"Cov(B,Y) = Cov(2X + Y, Y) = V(Y) = \\boxed{60}"}</M>
        </div>
      ),
    },
    {
      id: 'ex2',
      title: 'Exercice 2 - Loi de probabilité',
      difficulty: 1,
      tags: ['Fonction de répartition'],
      content: (
        <div>
          <p>Loi de X:</p>
          <table className="border-collapse border border-slate-300 text-sm">
            <thead><tr><th className="border border-slate-300 p-2">xi</th><th className="border border-slate-300 p-2">-4</th><th className="border border-slate-300 p-2">2</th><th className="border border-slate-300 p-2">3</th><th className="border border-slate-300 p-2">4</th><th className="border border-slate-300 p-2">6</th><th className="border border-slate-300 p-2">7</th><th className="border border-slate-300 p-2">10</th></tr></thead>
            <tbody><tr><td className="border border-slate-300 p-2">pi</td><td className="border border-slate-300 p-2">0.1</td><td className="border border-slate-300 p-2">0.2</td><td className="border border-slate-300 p-2">0.2</td><td className="border border-slate-300 p-2">0.1</td><td className="border border-slate-300 p-2">0.05</td><td className="border border-slate-300 p-2">0.2</td><td className="border border-slate-300 p-2">k</td></tr></tbody>
          </table>
          <ol className="list-decimal ml-6 mt-2">
            <li>Déterminer k</li>
            <li>P(X {'>'} 3)</li>
            <li>P(X ≥ 9)</li>
            <li>P(3 ≤ X {'<'} 7)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Déterminer k:</strong></p>
          <M>{"\\sum p_i = 1 \\Rightarrow 0.85 + k = 1 \\Rightarrow \\boxed{k = 0.15}"}</M>
          
          <p><strong>2. P(X {'>'} 3):</strong></p>
          <M>{"P(X > 3) = 0.1 + 0.05 + 0.2 + 0.15 = \\boxed{0.5}"}</M>
          
          <p><strong>3. P(X ≥ 9):</strong></p>
          <M>{"P(X \\geq 9) = P(X = 10) = \\boxed{0.15}"}</M>
          
          <p><strong>4. P(3 ≤ X {'<'} 7):</strong></p>
          <M>{"P(3 \\leq X < 7) = 0.2 + 0.1 + 0.05 = \\boxed{0.35}"}</M>
        </div>
      ),
    },
    {
      id: 'ex3',
      title: 'Exercice 3 - Comparaison de deux jeux',
      difficulty: 1,
      tags: ['Espérance', 'Variance'],
      hint: 'L\'écart-type mesure le risque : plus il est élevé, plus le jeu est risqué.',
      content: (
        <div>
          <p><strong>Jeu 1:</strong> Gain X avec P(10€) = 0.5, P(20€) = 0.1, P(-15€) = 0.4</p>
          <p><strong>Jeu 2:</strong> Gain Y avec P(2€) = 0.5, P(0€) = 0.5</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Calculer E(X) et interpréter</li>
            <li>Calculer E(Y)</li>
            <li>Calculer les écarts-types et interpréter</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. E(X):</strong></p>
          <M>{"E(X) = 10(0.5) + 20(0.1) + (-15)(0.4) = 5 + 2 - 6 = \\boxed{1€}"}</M>
          <p className="text-slate-700 italic">En moyenne, on gagne 1€ par partie.</p>
          
          <p><strong>2. E(Y):</strong></p>
          <M>{"E(Y) = 2(0.5) + 0(0.5) = \\boxed{1€}"}</M>
          
          <p><strong>3. Écarts-types:</strong></p>
          <p>Pour X:</p>
          <M>{"E(X^2) = 100(0.5) + 400(0.1) + 225(0.4) = 180"}</M>
          <M>{"V(X) = 180 - 1 = 179 \\Rightarrow \\sigma_X = \\boxed{13.38€}"}</M>
          
          <p>Pour Y:</p>
          <M>{"V(Y) = 4(0.5) - 1 = 1 \\Rightarrow \\sigma_Y = \\boxed{1€}"}</M>
          
          <p className="text-emerald-700 font-semibold">Les deux jeux ont la même espérance (1€), mais le jeu 1 est beaucoup plus risqué (σ = 13.38€) que le jeu 2 (σ = 1€).</p>
        </div>
      ),
    },
    {
      id: 'ex4',
      title: 'Exercice 4 (Octobre 2024) - Différence de deux dés',
      difficulty: 2,
      tags: ['Espérance', 'Variance'],
      hint: 'Listez tous les 36 cas possibles et comptez combien donnent chaque valeur de |différence|.',
      content: (
        <div>
          <p>On lance 2 dés. X = |différence des faces|</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Loi de probabilité de X</li>
            <li>E(X) et V(X)</li>
            <li>Mode et Médiane</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Loi de X:</strong></p>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-3">
            <p className="font-semibold text-blue-800">Méthode rapide pour compter les effectifs :</p>
            <p className="text-sm text-blue-700 mt-1">X = |dé1 - dé2| peut prendre les valeurs 0, 1, 2, 3, 4, 5</p>
            <p className="text-sm text-blue-700">Pour chaque valeur k, on compte les couples (i,j) tels que |i-j| = k :</p>
            <ul className="text-sm text-blue-700 ml-4 mt-1">
              <li><strong>X = 0 :</strong> diagonale (1,1), (2,2), ..., (6,6) → <strong>6 cas</strong></li>
              <li><strong>X = 1 :</strong> |i-j|=1 → couples adjacents (1,2), (2,1), (2,3), (3,2)... → <strong>2×5 = 10 cas</strong></li>
              <li><strong>X = 2 :</strong> |i-j|=2 → (1,3), (3,1), (2,4), (4,2)... → <strong>2×4 = 8 cas</strong></li>
              <li><strong>X = 3 :</strong> |i-j|=3 → <strong>2×3 = 6 cas</strong></li>
              <li><strong>X = 4 :</strong> |i-j|=4 → <strong>2×2 = 4 cas</strong></li>
              <li><strong>X = 5 :</strong> |i-j|=5 → (1,6), (6,1) → <strong>2×1 = 2 cas</strong></li>
            </ul>
            <p className="text-sm text-blue-700 mt-2"><strong>Formule générale :</strong> Pour k ≥ 1, effectif = 2×(6-k). Pour k = 0, effectif = 6.</p>
            <p className="text-sm text-blue-700">Vérification : 6 + 10 + 8 + 6 + 4 + 2 = 36 ✓</p>
          </div>
          
          <table className="border-collapse border border-slate-300 text-sm">
            <thead><tr><th className="border border-slate-300 p-2">X</th><th className="border border-slate-300 p-2">0</th><th className="border border-slate-300 p-2">1</th><th className="border border-slate-300 p-2">2</th><th className="border border-slate-300 p-2">3</th><th className="border border-slate-300 p-2">4</th><th className="border border-slate-300 p-2">5</th></tr></thead>
            <tbody>
              <tr><td className="border border-slate-300 p-2">Effectif</td><td className="border border-slate-300 p-2">6</td><td className="border border-slate-300 p-2">10</td><td className="border border-slate-300 p-2">8</td><td className="border border-slate-300 p-2">6</td><td className="border border-slate-300 p-2">4</td><td className="border border-slate-300 p-2">2</td></tr>
              <tr><td className="border border-slate-300 p-2">P(X=x)</td><td className="border border-slate-300 p-2">1/6</td><td className="border border-slate-300 p-2">5/18</td><td className="border border-slate-300 p-2">2/9</td><td className="border border-slate-300 p-2">1/6</td><td className="border border-slate-300 p-2">1/9</td><td className="border border-slate-300 p-2">1/18</td></tr>
            </tbody>
          </table>
          
          <p><strong>2. E(X) et V(X):</strong></p>
          <M>{"E(X) = \\frac{0 + 10 + 16 + 18 + 16 + 10}{36} = \\frac{70}{36} = \\boxed{\\frac{35}{18} \\approx 1.944}"}</M>
          <M>{"E(X^2) = \\frac{210}{36} = \\frac{35}{6}"}</M>
          <M>{"V(X) = \\frac{35}{6} - \\left(\\frac{35}{18}\\right)^2 = \\frac{665}{324} = \\boxed{2.052}"}</M>
          
          <p><strong>3. Mode et Médiane:</strong></p>
          <p className="text-emerald-700">Mode: <M>{"\\boxed{x_{Mo} = 1}"}</M> (probabilité max = 10/36)</p>
          <p>F(0) = 0.167, F(1) = 0.444, F(2) = 0.667 {'>'} 0.5</p>
          <p className="text-emerald-700">Médiane: <M>{"\\boxed{Me = 2}"}</M></p>
        </div>
      ),
    },
    {
      id: 'ex5',
      title: 'Exercice 5 - Magnétoscopes vendus',
      difficulty: 2,
      tags: ['Espérance', 'Variance', 'Probabilités conditionnelles'],
      content: (
        <div>
          <p>Loi de X (magnétoscopes vendus par jour):</p>
          <table className="border-collapse border border-slate-300 text-sm">
            <thead><tr><th className="border border-slate-300 p-2">xi</th><th className="border border-slate-300 p-2">0</th><th className="border border-slate-300 p-2">1</th><th className="border border-slate-300 p-2">2</th><th className="border border-slate-300 p-2">3</th><th className="border border-slate-300 p-2">4</th></tr></thead>
            <tbody><tr><td className="border border-slate-300 p-2">pi</td><td className="border border-slate-300 p-2">0.1</td><td className="border border-slate-300 p-2">0.2</td><td className="border border-slate-300 p-2">0.3</td><td className="border border-slate-300 p-2">0.25</td><td className="border border-slate-300 p-2">0.15</td></tr></tbody>
          </table>
          <ol className="list-decimal ml-6 mt-2">
            <li>P(X {'>'} 1)</li>
            <li>P(1 ≤ X {'<'} 4)</li>
            <li>P(X {'>'} 2 | X ≥ 1)</li>
            <li>E(X) et σ(X)</li>
            <li>Moments d'ordre 3</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. P(X {'>'} 1):</strong></p>
          <M>{"P(X > 1) = 0.3 + 0.25 + 0.15 = \\boxed{0.7}"}</M>
          
          <p><strong>2. P(1 ≤ X {'<'} 4):</strong></p>
          <M>{"P(1 \\leq X < 4) = 0.2 + 0.3 + 0.25 = \\boxed{0.75}"}</M>
          
          <p><strong>3. P(X {'>'} 2 | X ≥ 1):</strong></p>
          <M>{"P(X > 2 | X \\geq 1) = \\frac{P(X > 2)}{P(X \\geq 1)} = \\frac{0.4}{0.9} = \\boxed{0.444}"}</M>
          
          <p><strong>4. E(X) et σ(X):</strong></p>
          <M>{"E(X) = 0 + 0.2 + 0.6 + 0.75 + 0.6 = \\boxed{2.15}"}</M>
          <M>{"E(X^2) = 0.2 + 1.2 + 2.25 + 2.4 = 6.05"}</M>
          <M>{"V(X) = 6.05 - 4.6225 = 1.4275 \\Rightarrow \\sigma(X) = \\boxed{1.195}"}</M>
          
          <p><strong>5. Moments d'ordre 3:</strong></p>
          <M>{"m_3 = E(X^3) = 0.2 + 2.4 + 6.75 + 9.6 = \\boxed{18.95}"}</M>
          <M>{"\\mu_3 = m_3 - 3m_2\\mu + 2\\mu^3 = 18.95 - 39.02 + 19.90 = \\boxed{-0.17}"}</M>
          <M>{"\\mu_{[3]} = E[X(X-1)(X-2)] = 1.5 + 3.6 = \\boxed{5.1}"}</M>
        </div>
      ),
    },
    {
      id: 'ex6',
      title: 'Exercice supplémentaire (Octobre 2024)',
      difficulty: 3,
      tags: ['Espérance', 'Variance', 'Covariance'],
      hint: 'Décomposez W en fonction de X et Y, puis utilisez la bilinéarité de la covariance.',
      content: (
        <div>
          <p>E(X) = 2, E(Y) = 3, E(Z) = -2, V(X) = 4, V(Y) = 5, V(Z) = 8</p>
          <p>Cov(X,Y) = 0, Cov(X,Z) = -1, Cov(Y,Z) = 0</p>
          <p>W = 2X - Y</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>E(W + 4Z)</li>
            <li>V(W + 4Z)</li>
            <li>Cov(W, 2Y)</li>
            <li>r(W, Y)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-3">
            <p className="font-semibold text-blue-800">Rappels des formules clés :</p>
            <ul className="text-sm text-blue-700 mt-1 space-y-1">
              <li><strong>Linéarité de E :</strong> E(aX + bY) = aE(X) + bE(Y) (toujours vraie)</li>
              <li><strong>Variance d'une somme :</strong> V(aX + bY) = a²V(X) + b²V(Y) + 2ab·Cov(X,Y)</li>
              <li><strong>Bilinéarité de Cov :</strong> Cov(aX + bY, Z) = a·Cov(X,Z) + b·Cov(Y,Z)</li>
              <li><strong>Cov(X,X) = V(X)</strong></li>
            </ul>
          </div>

          <p><strong>1. E(W + 4Z):</strong></p>
          <p className="text-sm text-slate-700">L'espérance est toujours linéaire (indépendance ou non) :</p>
          <M>{"E(W) = E(2X - Y) = 2E(X) - E(Y) = 2(2) - 3 = 1"}</M>
          <M>{"E(W + 4Z) = E(W) + 4E(Z) = 1 + 4(-2) = \\boxed{-7}"}</M>
          
          <p><strong>2. V(W + 4Z):</strong></p>
          <p className="text-sm text-slate-700">Formule générale : V(A + B) = V(A) + V(B) + 2Cov(A,B)</p>
          
          <p className="text-sm mt-2"><em>Étape 1 : Calculer V(W)</em></p>
          <p className="text-sm text-slate-700">V(aX + bY) = a²V(X) + b²V(Y) + 2ab·Cov(X,Y)</p>
          <M>{"V(W) = V(2X - Y) = 4V(X) + V(Y) + 2(2)(-1)Cov(X,Y)"}</M>
          <M>{"V(W) = 4(4) + 5 + (-4)(0) = 16 + 5 = 21"}</M>
          
          <p className="text-sm mt-2"><em>Étape 2 : Calculer Cov(W, Z) par bilinéarité</em></p>
          <M>{"Cov(W, Z) = Cov(2X - Y, Z) = 2Cov(X,Z) - Cov(Y,Z)"}</M>
          <M>{"Cov(W, Z) = 2(-1) - 0 = -2"}</M>
          
          <p className="text-sm mt-2"><em>Étape 3 : Appliquer V(W + 4Z)</em></p>
          <M>{"V(W + 4Z) = V(W) + 16V(Z) + 2(4)Cov(W,Z)"}</M>
          <M>{"V(W + 4Z) = 21 + 16(8) + 8(-2) = 21 + 128 - 16 = \\boxed{133}"}</M>
          
          <p><strong>3. Cov(W, 2Y):</strong></p>
          <p className="text-sm text-slate-700">Bilinéarité : Cov(aU, bV) = ab·Cov(U,V)</p>
          <M>{"Cov(W, 2Y) = 2 \\cdot Cov(W, Y) = 2 \\cdot Cov(2X - Y, Y)"}</M>
          <p className="text-sm text-slate-700">On développe Cov(2X - Y, Y) :</p>
          <M>{"Cov(2X - Y, Y) = 2Cov(X,Y) - Cov(Y,Y) = 2(0) - V(Y) = -5"}</M>
          <M>{"Cov(W, 2Y) = 2(-5) = \\boxed{-10}"}</M>
          
          <p><strong>4. r(W, Y):</strong></p>
          <p className="text-sm text-slate-700">Coefficient de corrélation : r(A,B) = Cov(A,B) / (σ_A · σ_B)</p>
          <M>{"Cov(W, Y) = 2Cov(X,Y) - V(Y) = 0 - 5 = -5"}</M>
          <M>{"\\sigma_W = \\sqrt{V(W)} = \\sqrt{21}, \\quad \\sigma_Y = \\sqrt{5}"}</M>
          <M>{"r(W, Y) = \\frac{-5}{\\sqrt{21} \\cdot \\sqrt{5}} = \\frac{-5}{\\sqrt{105}} = \\boxed{-0.488}"}</M>
          <p className="text-sm text-slate-700 mt-1">r &lt; 0 : W et Y sont négativement corrélés (logique car W = 2X - Y contient -Y)</p>
        </div>
      ),
    },
  ],
};
