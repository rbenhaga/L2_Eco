import { Math as M } from '../../../../../../components';
import type { TDSheet } from '../types';

export const TD5_2526: TDSheet = {
  id: 'td5-2526',
  title: 'TD5 - Variables aléatoires discrètes à deux dimensions',
  chapter: 'CH5',
  year: '2025-2026',
  reminders: [
    { title: 'Loi marginale de X', formula: 'P(X=x_i) = \\sum_j P(X=x_i, Y=y_j)' },
    { title: 'Loi conditionnelle', formula: 'P(Y=y|X=x) = \\frac{P(X=x, Y=y)}{P(X=x)}' },
    { title: 'Covariance', formula: 'Cov(X,Y) = E(XY) - E(X)E(Y)' },
    { title: 'Indépendance', formula: 'X \\perp Y \\Leftrightarrow P(X=x,Y=y) = P(X=x) \\cdot P(Y=y)' },
    { title: 'Variance d\'une somme', formula: 'V(X+Y) = V(X) + V(Y) + 2Cov(X,Y)' },
  ],
  exercises: [
    {
      id: 'ex1',
      title: 'Exercice 1 - Loi conjointe simple',
      difficulty: 2,
      tags: ['VA 2D', 'Loi marginale', 'Loi conditionnelle', 'Covariance'],
      hint: 'Pour E(XY), sommez xy × P(X=x,Y=y) sur toutes les cases non nulles.',
      content: (
        <div>
          <p>Loi conjointe de (X, Y):</p>
          <table className="border-collapse border border-slate-300 dark:border-white/15 text-sm">
            <thead><tr><th className="border border-slate-300 dark:border-white/15 p-2">X \ Y</th><th className="border border-slate-300 dark:border-white/15 p-2">0</th><th className="border border-slate-300 dark:border-white/15 p-2">1</th><th className="border border-slate-300 dark:border-white/15 p-2">2</th></tr></thead>
            <tbody>
              <tr><td className="border border-slate-300 dark:border-white/15 p-2">0</td><td className="border border-slate-300 dark:border-white/15 p-2">1/3</td><td className="border border-slate-300 dark:border-white/15 p-2">0</td><td className="border border-slate-300 dark:border-white/15 p-2">0</td></tr>
              <tr><td className="border border-slate-300 dark:border-white/15 p-2">1</td><td className="border border-slate-300 dark:border-white/15 p-2">0</td><td className="border border-slate-300 dark:border-white/15 p-2">1/3</td><td className="border border-slate-300 dark:border-white/15 p-2">1/3</td></tr>
            </tbody>
          </table>
          <ol className="list-decimal ml-6 mt-2">
            <li>Lois marginales</li>
            <li>E(X), E(Y), V(X), V(Y), Cov(X,Y), r(X,Y)</li>
            <li>Loi de Y|X et courbe de régression</li>
            <li>Lois de Z = 2X + 4Y et T = 5X - Y</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-4">
          <div className="p-4 bg-amber-100/50 rounded-lg border border-amber-200 mb-4">
            <p className="font-semibold text-amber-800 mb-2">📋 Méthode du professeur</p>
            <ol className="list-decimal ml-4 text-sm text-amber-900 space-y-1">
              <li><strong>Marginales</strong> : Sommer les lignes (pour X) et les colonnes (pour Y)</li>
              <li><strong>E(XY)</strong> : Sommer xy × P(X=x, Y=y) sur toutes les cases non nulles</li>
              <li><strong>Cov(X,Y)</strong> = E(XY) - E(X)E(Y)</li>
            </ol>
          </div>

          <p><strong>1. Lois marginales:</strong></p>
          <p>Somme des lignes → P(X=0) = 1/3, P(X=1) = 2/3</p>
          <p>Somme des colonnes → P(Y=0) = 1/3, P(Y=1) = 1/3, P(Y=2) = 1/3</p>
          
          <p><strong>2. Moments:</strong></p>
          <M>{"E(X) = 0 \\times \\frac{1}{3} + 1 \\times \\frac{2}{3} = \\boxed{\\frac{2}{3}}"}</M>
          <M>{"E(Y) = 0 \\times \\frac{1}{3} + 1 \\times \\frac{1}{3} + 2 \\times \\frac{1}{3} = \\boxed{1}"}</M>
          <M>{"V(X) = \\frac{2}{3} - \\frac{4}{9} = \\boxed{\\frac{2}{9}}"}</M>
          <M>{"V(Y) = \\frac{5}{3} - 1 = \\boxed{\\frac{2}{3}}"}</M>
          
          <p><strong>Calcul de E(XY) :</strong> (cases non nulles uniquement)</p>
          <M>{"E(XY) = 0 + 1 \\times 1 \\times \\frac{1}{3} + 1 \\times 2 \\times \\frac{1}{3} = \\frac{1}{3} + \\frac{2}{3} = 1"}</M>
          <M>{"Cov(X,Y) = E(XY) - E(X)E(Y) = 1 - \\frac{2}{3} = \\boxed{\\frac{1}{3}}"}</M>
          <M>{"r(X,Y) = \\frac{1/3}{\\sqrt{2/9} \\times \\sqrt{2/3}} = \\boxed{\\frac{\\sqrt{3}}{2} \\approx 0.866}"}</M>
          
          <p><strong>3. Loi conditionnelle Y|X:</strong></p>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-sm">
            <p className="font-semibold text-blue-800">Formule : P(Y=y|X=x) = P(X=x,Y=y) / P(X=x)</p>
          </div>
          <p className="mt-2">Y|X=0: P(Y=0|X=0) = (1/3)/(1/3) = 1 → E(Y|X=0) = 0</p>
          <p>Y|X=1: P(Y=1|X=1) = 1/2, P(Y=2|X=1) = 1/2 → E(Y|X=1) = 1.5</p>
          <p className="text-emerald-700 font-semibold">Courbe de régression: <M>{"E(Y|X=x) = 1.5x"}</M></p>
          
          <p><strong>4. Lois de Z et T:</strong></p>
          <p>On liste les valeurs possibles en parcourant les cases non nulles:</p>
          <table className="border-collapse border border-slate-300 dark:border-white/15 text-sm">
            <thead><tr><th className="border border-slate-300 dark:border-white/15 p-2">Z = 2X+4Y</th><th className="border border-slate-300 dark:border-white/15 p-2">0</th><th className="border border-slate-300 dark:border-white/15 p-2">6</th><th className="border border-slate-300 dark:border-white/15 p-2">10</th></tr></thead>
            <tbody><tr><td className="border border-slate-300 dark:border-white/15 p-2">P(Z=z)</td><td className="border border-slate-300 dark:border-white/15 p-2">1/3</td><td className="border border-slate-300 dark:border-white/15 p-2">1/3</td><td className="border border-slate-300 dark:border-white/15 p-2">1/3</td></tr></tbody>
          </table>
          <M>{"E(Z) = 2E(X) + 4E(Y) = \\frac{4}{3} + 4 = \\boxed{\\frac{16}{3}}"}</M>
        </div>
      ),
    },
    {
      id: 'ex2',
      title: 'Exercice 2 - VA indépendantes',
      difficulty: 1,
      tags: ['VA 2D', 'Indépendance'],
      hint: 'Si X et Y indépendantes : Cov(X,Y) = 0 et E(Y|X) = E(Y).',
      content: (
        <div>
          <p>X et Y indépendantes:</p>
          <table className="border-collapse border border-slate-300 dark:border-white/15 text-sm">
            <thead><tr><th className="border border-slate-300 dark:border-white/15 p-2">xi</th><th className="border border-slate-300 dark:border-white/15 p-2">20</th><th className="border border-slate-300 dark:border-white/15 p-2">60</th><th className="border border-slate-300 dark:border-white/15 p-2">70</th><th className="border border-slate-300 dark:border-white/15 p-2">90</th><th className="border border-slate-300 dark:border-white/15 p-2">100</th></tr></thead>
            <tbody><tr><td className="border border-slate-300 dark:border-white/15 p-2">pi</td><td className="border border-slate-300 dark:border-white/15 p-2">0.1</td><td className="border border-slate-300 dark:border-white/15 p-2">0.1</td><td className="border border-slate-300 dark:border-white/15 p-2">0.3</td><td className="border border-slate-300 dark:border-white/15 p-2">0.2</td><td className="border border-slate-300 dark:border-white/15 p-2">0.3</td></tr></tbody>
          </table>
          <table className="border-collapse border border-slate-300 dark:border-white/15 text-sm mt-2">
            <thead><tr><th className="border border-slate-300 dark:border-white/15 p-2">yj</th><th className="border border-slate-300 dark:border-white/15 p-2">10</th><th className="border border-slate-300 dark:border-white/15 p-2">15</th><th className="border border-slate-300 dark:border-white/15 p-2">20</th><th className="border border-slate-300 dark:border-white/15 p-2">60</th></tr></thead>
            <tbody><tr><td className="border border-slate-300 dark:border-white/15 p-2">pj</td><td className="border border-slate-300 dark:border-white/15 p-2">0.1</td><td className="border border-slate-300 dark:border-white/15 p-2">0.1</td><td className="border border-slate-300 dark:border-white/15 p-2">0.5</td><td className="border border-slate-300 dark:border-white/15 p-2">0.3</td></tr></tbody>
          </table>
          <ol className="list-decimal ml-6 mt-2">
            <li>Loi du couple (X,Y)</li>
            <li>E(X), σ(X), E(Y), V(Y)</li>
            <li>E(Y|X=60), r(X,Y), courbe de régression</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-4">
          <div className="p-4 bg-amber-100/50 rounded-lg border border-amber-200 mb-4">
            <p className="font-semibold text-amber-800 mb-2">📋 Propriété clé : Indépendance</p>
            <p className="text-sm text-amber-900">Si X et Y indépendantes : P(X=x, Y=y) = P(X=x) × P(Y=y)</p>
            <p className="text-sm text-amber-900 mt-1">Conséquences : Cov(X,Y) = 0, r(X,Y) = 0, E(Y|X) = E(Y)</p>
          </div>

          <p><strong>1. Loi conjointe:</strong> P(X=x, Y=y) = P(X=x) × P(Y=y)</p>
          
          <p><strong>2. Moments:</strong></p>
          <M>{"E(X) = 20(0.1) + 60(0.1) + 70(0.3) + 90(0.2) + 100(0.3) = \\boxed{77}"}</M>
          <M>{"V(X) = 6490 - 77^2 = 561 \\Rightarrow \\sigma_X = \\boxed{23.69}"}</M>
          <M>{"E(Y) = 10(0.1) + 15(0.1) + 20(0.5) + 60(0.3) = \\boxed{30.5}"}</M>
          <M>{"V(Y) = 1312.5 - 930.25 = \\boxed{382.25}"}</M>
          
          <p><strong>3. Conséquences de l'indépendance:</strong></p>
          <p className="text-emerald-700">• E(Y|X=60) = E(Y) = <strong>30.5</strong> (l'info sur X ne change rien)</p>
          <p className="text-emerald-700">• r(X,Y) = <strong>0</strong> (pas de corrélation)</p>
          <p className="text-emerald-700">• Courbe de régression: E(X|Y) = 77 (droite horizontale)</p>
        </div>
      ),
    },
    {
      id: 'ex3',
      title: 'Exercice 3 - Compagnie aérienne',
      difficulty: 2,
      tags: ['VA 2D', 'Covariance'],
      hint: 'Utilisez V(X+Y) = V(X) + V(Y) + 2Cov(X,Y) pour trouver Cov(X,Y).',
      content: (
        <div>
          <p>X = retards vers pays A, Y = retards vers pays B</p>
          <table className="border-collapse border border-slate-300 dark:border-white/15 text-sm">
            <thead><tr><th className="border border-slate-300 dark:border-white/15 p-2">X\Y</th><th className="border border-slate-300 dark:border-white/15 p-2">0</th><th className="border border-slate-300 dark:border-white/15 p-2">1</th><th className="border border-slate-300 dark:border-white/15 p-2">2</th><th className="border border-slate-300 dark:border-white/15 p-2">3</th></tr></thead>
            <tbody>
              <tr><td className="border border-slate-300 dark:border-white/15 p-2">0</td><td className="border border-slate-300 dark:border-white/15 p-2">0.1</td><td className="border border-slate-300 dark:border-white/15 p-2">0.05</td><td className="border border-slate-300 dark:border-white/15 p-2">0.05</td><td className="border border-slate-300 dark:border-white/15 p-2">0</td></tr>
              <tr><td className="border border-slate-300 dark:border-white/15 p-2">1</td><td className="border border-slate-300 dark:border-white/15 p-2">0</td><td className="border border-slate-300 dark:border-white/15 p-2">p</td><td className="border border-slate-300 dark:border-white/15 p-2">0.15</td><td className="border border-slate-300 dark:border-white/15 p-2">0.1</td></tr>
              <tr><td className="border border-slate-300 dark:border-white/15 p-2">2</td><td className="border border-slate-300 dark:border-white/15 p-2">0.05</td><td className="border border-slate-300 dark:border-white/15 p-2">0.25</td><td className="border border-slate-300 dark:border-white/15 p-2">0.05</td><td className="border border-slate-300 dark:border-white/15 p-2">0.1</td></tr>
            </tbody>
          </table>
          <ol className="list-decimal ml-6 mt-2">
            <li>Trouver p</li>
            <li>Lois marginales, E et V</li>
            <li>Loi de Z = X + Y</li>
            <li>Cov(X,Y) et r(X,Y)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-4">
          <div className="p-4 bg-amber-100/50 rounded-lg border border-amber-200 mb-4">
            <p className="font-semibold text-amber-800 mb-2">📋 Méthode pour trouver p</p>
            <p className="text-sm text-amber-900">La somme de toutes les probabilités = 1</p>
          </div>

          <p><strong>1. Trouver p:</strong></p>
          <M>{"\\sum P = 0.1 + 0.05 + 0.05 + 0 + 0 + p + 0.15 + 0.1 + 0.05 + 0.25 + 0.05 + 0.1 = 1"}</M>
          <M>{"0.9 + p = 1 \\Rightarrow \\boxed{p = 0.1}"}</M>
          
          <p><strong>2. Lois marginales:</strong></p>
          <p>P(X=0)=0.2, P(X=1)=0.35, P(X=2)=0.45</p>
          <p>P(Y=0)=0.15, P(Y=1)=0.4, P(Y=2)=0.25, P(Y=3)=0.2</p>
          <M>{"E(X) = \\boxed{1.25}, \\quad V(X) = \\boxed{0.5875}"}</M>
          <M>{"E(Y) = \\boxed{1.5}, \\quad V(Y) = \\boxed{0.95}"}</M>
          
          <p><strong>3. Loi de Z = X + Y:</strong></p>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-sm mb-2">
            <p className="font-semibold text-blue-800">Méthode : Lister toutes les combinaisons (x,y) donnant la même somme z</p>
          </div>
          <table className="border-collapse border border-slate-300 dark:border-white/15 text-sm">
            <thead><tr><th className="border border-slate-300 dark:border-white/15 p-2">Z</th><th className="border border-slate-300 dark:border-white/15 p-2">0</th><th className="border border-slate-300 dark:border-white/15 p-2">1</th><th className="border border-slate-300 dark:border-white/15 p-2">2</th><th className="border border-slate-300 dark:border-white/15 p-2">3</th><th className="border border-slate-300 dark:border-white/15 p-2">4</th><th className="border border-slate-300 dark:border-white/15 p-2">5</th></tr></thead>
            <tbody><tr><td className="border border-slate-300 dark:border-white/15 p-2">P(Z=z)</td><td className="border border-slate-300 dark:border-white/15 p-2">0.1</td><td className="border border-slate-300 dark:border-white/15 p-2">0.05</td><td className="border border-slate-300 dark:border-white/15 p-2">0.15</td><td className="border border-slate-300 dark:border-white/15 p-2">0.4</td><td className="border border-slate-300 dark:border-white/15 p-2">0.15</td><td className="border border-slate-300 dark:border-white/15 p-2">0.1</td></tr></tbody>
          </table>
          
          <p><strong>4. Covariance et corrélation:</strong></p>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-sm mb-2">
            <p className="font-semibold text-blue-800">Astuce : Utiliser V(X+Y) = V(X) + V(Y) + 2Cov(X,Y)</p>
          </div>
          <M>{"V(Z) = 1.5875, \\quad V(X) + V(Y) = 1.5375"}</M>
          <M>{"Cov(X,Y) = \\frac{1.5875 - 1.5375}{2} = \\boxed{0.025}"}</M>
          <M>{"r(X,Y) = \\frac{0.025}{\\sqrt{0.5875 \\times 0.95}} = \\boxed{0.033}"}</M>
          <p className="text-slate-700 dark:text-slate-300 italic">Corrélation très faible → X et Y presque indépendantes.</p>
        </div>
      ),
    },
    {
      id: 'ex4',
      title: 'Exercice 4 (Novembre 2024) - Tirage de boules',
      difficulty: 3,
      tags: ['VA 2D', 'Loi conditionnelle', 'Régression'],
      hint: 'Attention au dénombrement : si x=y, un seul tirage ; si x<y, deux tirages possibles.',
      content: (
        <div>
          <p>4 boules numérotées (0,1,2,3), tirage avec remise de 2 boules.</p>
          <p>X = plus petit des 2 chiffres, Y = plus grand des 2 chiffres</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Loi du couple (X,Y)</li>
            <li>Lois marginales et variances</li>
            <li>Courbe de régression de X|Y</li>
            <li>r(X,Y)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-4">
          <div className="p-4 bg-amber-100/50 rounded-lg border border-amber-200 mb-4">
            <p className="font-semibold text-amber-800 mb-2">📋 Méthode de dénombrement</p>
            <ol className="list-decimal ml-4 text-sm text-amber-900 space-y-1">
              <li>Total de cas : 4 × 4 = 16 (tirage avec remise)</li>
              <li>Pour chaque case (x,y) avec x ≤ y, compter les tirages correspondants</li>
              <li>Attention : si x = y, un seul tirage ; si x {'<'} y, deux tirages (x,y) et (y,x)</li>
            </ol>
          </div>

          <p><strong>1. Loi conjointe:</strong></p>
          <table className="border-collapse border border-slate-300 dark:border-white/15 text-xs">
            <thead><tr><th className="border border-slate-300 dark:border-white/15 p-1">X\Y</th><th className="border border-slate-300 dark:border-white/15 p-1">0</th><th className="border border-slate-300 dark:border-white/15 p-1">1</th><th className="border border-slate-300 dark:border-white/15 p-1">2</th><th className="border border-slate-300 dark:border-white/15 p-1">3</th><th className="border border-slate-300 dark:border-white/15 p-1">P(X)</th></tr></thead>
            <tbody>
              <tr><td className="border border-slate-300 dark:border-white/15 p-1">0</td><td className="border border-slate-300 dark:border-white/15 p-1">1/16</td><td className="border border-slate-300 dark:border-white/15 p-1">2/16</td><td className="border border-slate-300 dark:border-white/15 p-1">2/16</td><td className="border border-slate-300 dark:border-white/15 p-1">2/16</td><td className="border border-slate-300 dark:border-white/15 p-1 font-semibold">7/16</td></tr>
              <tr><td className="border border-slate-300 dark:border-white/15 p-1">1</td><td className="border border-slate-300 dark:border-white/15 p-1">0</td><td className="border border-slate-300 dark:border-white/15 p-1">1/16</td><td className="border border-slate-300 dark:border-white/15 p-1">2/16</td><td className="border border-slate-300 dark:border-white/15 p-1">2/16</td><td className="border border-slate-300 dark:border-white/15 p-1 font-semibold">5/16</td></tr>
              <tr><td className="border border-slate-300 dark:border-white/15 p-1">2</td><td className="border border-slate-300 dark:border-white/15 p-1">0</td><td className="border border-slate-300 dark:border-white/15 p-1">0</td><td className="border border-slate-300 dark:border-white/15 p-1">1/16</td><td className="border border-slate-300 dark:border-white/15 p-1">2/16</td><td className="border border-slate-300 dark:border-white/15 p-1 font-semibold">3/16</td></tr>
              <tr><td className="border border-slate-300 dark:border-white/15 p-1">3</td><td className="border border-slate-300 dark:border-white/15 p-1">0</td><td className="border border-slate-300 dark:border-white/15 p-1">0</td><td className="border border-slate-300 dark:border-white/15 p-1">0</td><td className="border border-slate-300 dark:border-white/15 p-1">1/16</td><td className="border border-slate-300 dark:border-white/15 p-1 font-semibold">1/16</td></tr>
              <tr><td className="border border-slate-300 dark:border-white/15 p-1 font-semibold">P(Y)</td><td className="border border-slate-300 dark:border-white/15 p-1">1/16</td><td className="border border-slate-300 dark:border-white/15 p-1">3/16</td><td className="border border-slate-300 dark:border-white/15 p-1">5/16</td><td className="border border-slate-300 dark:border-white/15 p-1">7/16</td><td className="border border-slate-300 dark:border-white/15 p-1">1</td></tr>
            </tbody>
          </table>
          
          <p><strong>2. Moments:</strong></p>
          <M>{"E(X) = \\frac{14}{16} = \\boxed{0.875}, \\quad E(Y) = \\frac{34}{16} = \\boxed{2.125}"}</M>
          <M>{"V(X) = V(Y) = \\frac{220}{256} = \\boxed{0.859}"}</M>
          <p className="text-sm text-slate-700 dark:text-slate-300">(Symétrie : min et max ont même variance)</p>
          
          <p><strong>3. Courbe de régression X|Y:</strong></p>
          <M>{"E(X|Y=0) = 0, \\quad E(X|Y=1) = \\frac{1}{3}, \\quad E(X|Y=2) = \\frac{4}{5}, \\quad E(X|Y=3) = \\frac{9}{7}"}</M>
          
          <p><strong>4. Corrélation:</strong></p>
          <M>{"E(XY) = \\frac{36}{16} = 2.25"}</M>
          <M>{"Cov(X,Y) = 2.25 - 0.875 \\times 2.125 = 0.391"}</M>
          <M>{"r(X,Y) = \\frac{0.391}{0.859} = \\boxed{0.455}"}</M>
        </div>
      ),
    },
  ],
};
