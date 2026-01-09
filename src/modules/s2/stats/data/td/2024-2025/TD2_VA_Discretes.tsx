import { Math as M } from '../../../../../../components';
import type { TDSheet } from '../types';

export const TD2_2425: TDSheet = {
  id: 'td2-2425',
  title: 'TD2 - Variables aléatoires discrètes à une dimension',
  chapter: 'CH2',
  year: '2024-2025',
  reminders: [
    { title: 'Espérance', formula: 'E(X) = \\sum_i x_i \\cdot P(X = x_i)' },
    { title: 'Variance', formula: 'V(X) = E(X^2) - [E(X)]^2' },
    { title: 'Covariance', formula: 'Cov(X,Y) = E(XY) - E(X)E(Y)' },
    { title: 'Corrélation', formula: 'r(X,Y) = \\frac{Cov(X,Y)}{\\sigma_X \\cdot \\sigma_Y}' },
  ],
  exercises: [
    {
      id: 'ex1',
      title: 'Exercice 1 - Partie I: Covariance et corrélation',
      difficulty: 2,
      tags: ['Covariance', 'Variance'],
      hint: 'Utilisez r(X,Y) = Cov(X,Y)/(σ_X × σ_Y) pour trouver σ_Y.',
      content: (
        <div>
          <p>E(X) = 1/2, E(Y) = 1/4, V(X) = 25/64, E(XY) = 1/4, r(X,Y) = 3/10</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Calculer V(Y)</li>
            <li>Calculer V(-X + Y)</li>
            <li>Calculer Cov(-2X + Y, Y)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. V(Y):</strong></p>
          <M>{"Cov(X,Y) = E(XY) - E(X)E(Y) = \\frac{1}{4} - \\frac{1}{8} = \\frac{1}{8}"}</M>
          <M>{"\\sigma_X = \\sqrt{\\frac{25}{64}} = \\frac{5}{8}"}</M>
          <M>{"r(X,Y) = \\frac{Cov(X,Y)}{\\sigma_X \\sigma_Y} \\Rightarrow \\frac{3}{10} = \\frac{1/8}{(5/8) \\sigma_Y}"}</M>
          <M>{"\\sigma_Y = \\frac{2}{3} \\Rightarrow \\boxed{V(Y) = \\frac{4}{9}}"}</M>
          
          <p><strong>2. V(-X + Y):</strong></p>
          <M>{"V(-X + Y) = V(X) + V(Y) - 2Cov(X,Y)"}</M>
          <M>{"= \\frac{25}{64} + \\frac{4}{9} - \\frac{1}{4} = \\boxed{\\frac{337}{576} \\approx 0.585}"}</M>
          
          <p><strong>3. Cov(-2X + Y, Y):</strong></p>
          <M>{"Cov(-2X + Y, Y) = -2Cov(X,Y) + V(Y) = -\\frac{1}{4} + \\frac{4}{9} = \\boxed{\\frac{7}{36}}"}</M>
        </div>
      ),
    },
    {
      id: 'ex2',
      title: 'Exercice 1 - Partie II: VA indépendantes',
      difficulty: 1,
      tags: ['Variance', 'Espérance'],
      content: (
        <div>
          <p>X et Y indépendantes: E(X) = 1/2, E(Y) = 1/4, σ(X) = 1/3, σ(Y) = 1/9</p>
          <p>M = -X + 2Y, N = -X - Y</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>V(M)</li>
            <li>V(N)</li>
            <li>E(2M - N)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. V(M):</strong></p>
          <M>{"V(M) = V(X) + 4V(Y) = \\frac{1}{9} + \\frac{4}{81} = \\boxed{\\frac{13}{81}}"}</M>
          
          <p><strong>2. V(N):</strong></p>
          <M>{"V(N) = V(X) + V(Y) = \\frac{1}{9} + \\frac{1}{81} = \\boxed{\\frac{10}{81}}"}</M>
          
          <p><strong>3. E(2M - N):</strong></p>
          <M>{"E(M) = -\\frac{1}{2} + \\frac{1}{2} = 0"}</M>
          <M>{"E(N) = -\\frac{1}{2} - \\frac{1}{4} = -\\frac{3}{4}"}</M>
          <M>{"E(2M - N) = 0 + \\frac{3}{4} = \\boxed{\\frac{3}{4}}"}</M>
        </div>
      ),
    },
    {
      id: 'ex3',
      title: 'Exercice 2 - Taux de croissance',
      difficulty: 1,
      tags: ['Espérance', 'Variance', 'Probabilités conditionnelles'],
      content: (
        <div>
          <p>Loi de X (taux de croissance):</p>
          <table className="border-collapse border border-slate-300 dark:border-white/15 text-sm">
            <thead><tr><th className="border border-slate-300 dark:border-white/15 p-2">xi</th><th className="border border-slate-300 dark:border-white/15 p-2">-2</th><th className="border border-slate-300 dark:border-white/15 p-2">-1</th><th className="border border-slate-300 dark:border-white/15 p-2">0</th><th className="border border-slate-300 dark:border-white/15 p-2">1</th><th className="border border-slate-300 dark:border-white/15 p-2">2</th><th className="border border-slate-300 dark:border-white/15 p-2">3</th></tr></thead>
            <tbody><tr><td className="border border-slate-300 dark:border-white/15 p-2">Pi</td><td className="border border-slate-300 dark:border-white/15 p-2">0.5a</td><td className="border border-slate-300 dark:border-white/15 p-2">a</td><td className="border border-slate-300 dark:border-white/15 p-2">4a</td><td className="border border-slate-300 dark:border-white/15 p-2">3a</td><td className="border border-slate-300 dark:border-white/15 p-2">a</td><td className="border border-slate-300 dark:border-white/15 p-2">0.5a</td></tr></tbody>
          </table>
          <ol className="list-decimal ml-6 mt-2">
            <li>Trouver a</li>
            <li>E(X), V(X)</li>
            <li>P(X ≥ 0), P(X ≥ 2 | X ≥ 0)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Trouver a:</strong></p>
          <M>{"10a = 1 \\Rightarrow \\boxed{a = 0.1}"}</M>
          
          <p><strong>2. E(X) et V(X):</strong></p>
          <M>{"E(X) = -0.1 - 0.1 + 0 + 0.3 + 0.2 + 0.15 = \\boxed{0.45\\%}"}</M>
          <M>{"E(X^2) = 0.2 + 0.1 + 0 + 0.3 + 0.4 + 0.45 = 1.45"}</M>
          <M>{"V(X) = 1.45 - 0.2025 = \\boxed{1.2475}"}</M>
          
          <p><strong>3. Probabilités:</strong></p>
          <M>{"P(X \\geq 0) = 0.4 + 0.3 + 0.1 + 0.05 = \\boxed{0.85}"}</M>
          <M>{"P(X \\geq 2 | X \\geq 0) = \\frac{0.15}{0.85} = \\boxed{0.176}"}</M>
        </div>
      ),
    },
    {
      id: 'ex4',
      title: 'Exercice 3 - Produit de deux numéros',
      difficulty: 2,
      tags: ['Espérance', 'Variance', 'Fonction de répartition'],
      hint: 'Listez tous les C₅² = 10 tirages possibles.',
      content: (
        <div>
          <p>On choisit 2 numéros distincts de {'{-2, -1, 0, 1, 2}'}, X = leur produit.</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Loi de probabilité de X</li>
            <li>Fonction de répartition F(x)</li>
            <li>Mode, E(X), V(X), σ(X)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Loi de X:</strong> (Total: C₅² = 10 tirages)</p>
          <table className="border-collapse border border-slate-300 dark:border-white/15 text-sm">
            <thead><tr><th className="border border-slate-300 dark:border-white/15 p-2">X</th><th className="border border-slate-300 dark:border-white/15 p-2">-4</th><th className="border border-slate-300 dark:border-white/15 p-2">-2</th><th className="border border-slate-300 dark:border-white/15 p-2">-1</th><th className="border border-slate-300 dark:border-white/15 p-2">0</th><th className="border border-slate-300 dark:border-white/15 p-2">2</th></tr></thead>
            <tbody><tr><td className="border border-slate-300 dark:border-white/15 p-2">P(X=x)</td><td className="border border-slate-300 dark:border-white/15 p-2">1/10</td><td className="border border-slate-300 dark:border-white/15 p-2">2/10</td><td className="border border-slate-300 dark:border-white/15 p-2">1/10</td><td className="border border-slate-300 dark:border-white/15 p-2">4/10</td><td className="border border-slate-300 dark:border-white/15 p-2">2/10</td></tr></tbody>
          </table>
          
          <p><strong>2. Fonction de répartition:</strong></p>
          <M>{"F(x) = \\begin{cases} 0 & x < -4 \\\\ 0.1 & -4 \\leq x < -2 \\\\ 0.3 & -2 \\leq x < -1 \\\\ 0.4 & -1 \\leq x < 0 \\\\ 0.8 & 0 \\leq x < 2 \\\\ 1 & x \\geq 2 \\end{cases}"}</M>
          
          <p><strong>3. Mode, E(X), V(X):</strong></p>
          <p>Mode: <M>{"\\boxed{x_{Mo} = 0}"}</M> (probabilité max = 0.4)</p>
          <M>{"E(X) = -0.4 - 0.4 - 0.1 + 0 + 0.4 = \\boxed{-0.5}"}</M>
          <M>{"E(X^2) = 1.6 + 0.8 + 0.1 + 0 + 0.8 = 3.3"}</M>
          <M>{"V(X) = 3.3 - 0.25 = \\boxed{3.05}, \\quad \\sigma(X) = \\boxed{1.747}"}</M>
        </div>
      ),
    },
    {
      id: 'ex5',
      title: 'Exercice 4 - Lancer de 3 pièces',
      difficulty: 1,
      tags: ['Loi Binomiale', 'Espérance', 'Variance'],
      content: (
        <div>
          <p>3 pièces équilibrées, X = nombre de piles.</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Loi de probabilité de X</li>
            <li>Fonction de répartition</li>
            <li>Mode, E(X), V(X), σ(X)</li>
            <li>Moments d'ordre 3</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Loi de X:</strong> X ~ B(3, 0.5)</p>
          <table className="border-collapse border border-slate-300 dark:border-white/15 text-sm">
            <thead><tr><th className="border border-slate-300 dark:border-white/15 p-2">X</th><th className="border border-slate-300 dark:border-white/15 p-2">0</th><th className="border border-slate-300 dark:border-white/15 p-2">1</th><th className="border border-slate-300 dark:border-white/15 p-2">2</th><th className="border border-slate-300 dark:border-white/15 p-2">3</th></tr></thead>
            <tbody><tr><td className="border border-slate-300 dark:border-white/15 p-2">P(X=x)</td><td className="border border-slate-300 dark:border-white/15 p-2">1/8</td><td className="border border-slate-300 dark:border-white/15 p-2">3/8</td><td className="border border-slate-300 dark:border-white/15 p-2">3/8</td><td className="border border-slate-300 dark:border-white/15 p-2">1/8</td></tr></tbody>
          </table>
          
          <p><strong>2. Fonction de répartition:</strong></p>
          <M>{"F(x) = \\begin{cases} 0 & x < 0 \\\\ 1/8 & 0 \\leq x < 1 \\\\ 4/8 & 1 \\leq x < 2 \\\\ 7/8 & 2 \\leq x < 3 \\\\ 1 & x \\geq 3 \\end{cases}"}</M>
          
          <p><strong>3. Mode, E(X), V(X):</strong></p>
          <p>Mode: <M>{"\\boxed{x_{Mo} = 1 \\text{ et } 2}"}</M> (bimodal)</p>
          <M>{"E(X) = np = \\boxed{1.5}, \\quad V(X) = npq = \\boxed{0.75}, \\quad \\sigma(X) = \\boxed{0.866}"}</M>
          
          <p><strong>4. Moments d'ordre 3:</strong></p>
          <M>{"m_3 = E(X^3) = 0 + \\frac{3}{8} + 3 + \\frac{27}{8} = \\boxed{6.75}"}</M>
          <M>{"\\mu_3 = E[(X - 1.5)^3] = \\boxed{0}"}</M>
          <p className="text-slate-700 dark:text-slate-300 italic">(Distribution symétrique)</p>
        </div>
      ),
    },
    {
      id: 'ex6',
      title: 'Exercice 5 (Partiel 2023) - Combinaisons linéaires',
      difficulty: 2,
      tags: ['Covariance', 'Variance', 'Espérance'],
      hint: 'Cov(aX+bY, cX+dY) = ac×V(X) + bd×V(Y) + (ad+bc)×Cov(X,Y)',
      content: (
        <div>
          <p>X et Y indépendantes: E(X) = 10, E(Y) = 24, V(X) = 74, V(Y) = 30</p>
          <p>A = 2X + Y, B = 3X - Y</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>E(B)</li>
            <li>V(A)</li>
            <li>Cov(A,B)</li>
            <li>Cov(A+B, X)</li>
            <li>r(X,Y)</li>
            <li>r(A,B)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. E(B):</strong></p>
          <M>{"E(B) = 3(10) - 24 = \\boxed{6}"}</M>
          
          <p><strong>2. V(A):</strong></p>
          <M>{"V(A) = 4V(X) + V(Y) = 4(74) + 30 = \\boxed{326}"}</M>
          
          <p><strong>3. Cov(A,B):</strong></p>
          <M>{"Cov(A,B) = 6V(X) - V(Y) = 6(74) - 30 = \\boxed{414}"}</M>
          
          <p><strong>4. Cov(A+B, X):</strong></p>
          <M>{"A + B = 5X \\Rightarrow Cov(5X, X) = 5V(X) = \\boxed{370}"}</M>
          
          <p><strong>5. r(X,Y):</strong></p>
          <M>{"r(X,Y) = \\boxed{0}"}</M> (indépendantes)
          
          <p><strong>6. r(A,B):</strong></p>
          <M>{"V(B) = 9(74) + 30 = 696"}</M>
          <M>{"r(A,B) = \\frac{414}{\\sqrt{326 \\times 696}} = \\boxed{0.869}"}</M>
        </div>
      ),
    },
  ],
};
