import { Math as M } from '../../../../../../components';
import type { TDSheet } from '../types';

export const TD1_2425: TDSheet = {
  id: 'td1-2425',
  title: 'TD1 - Algèbre de Boole et Calcul de probabilités',
  chapter: 'CH1',
  year: '2024-2025',
  reminders: [
    { title: 'Formule de Poincaré', formula: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)' },
    { title: 'Probabilité conditionnelle', formula: 'P(A | B) = \\frac{P(A \\cap B)}{P(B)}' },
    { title: 'Formule de Bayes', formula: 'P(A_i | B) = \\frac{P(B | A_i) \\cdot P(A_i)}{\\sum_j P(B | A_j) \\cdot P(A_j)}' },
    { title: 'Indépendance', formula: 'A \\perp B \\Leftrightarrow P(A \\cap B) = P(A) \\cdot P(B)' },
  ],
  exercises: [
    {
      id: 'ex1',
      title: 'Exercice 1 - Construction d\'algèbre de Boole',
      difficulty: 1,
      tags: ['Algèbre de Boole'],
      content: (
        <div>
          <p>Soit Ω = {'{a, b, c, d}'}. Construire la plus petite algèbre de Boole contenant {'{c}'} et {'{d}'}.</p>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>Éléments de base:</strong> {'{c}'} et {'{d}'}</p>
          <p><strong>Construction:</strong></p>
          <ul className="list-disc ml-6">
            <li>{'{c}'} → complémentaire: {'{a,b,d}'}</li>
            <li>{'{d}'} → complémentaire: {'{a,b,c}'}</li>
            <li>{'{c}'} ∪ {'{d}'} = {'{c,d}'} → complémentaire: {'{a,b}'}</li>
            <li>{'{c}'} ∩ {'{d}'} = ∅ → complémentaire: Ω</li>
          </ul>
          <p className="text-[var(--color-success)] font-semibold">La plus petite algèbre de Boole:</p>
          <M>{"\\mathcal{F} = \\{\\emptyset, \\{c\\}, \\{d\\}, \\{c,d\\}, \\{a,b\\}, \\{a,b,c\\}, \\{a,b,d\\}, \\Omega\\}"}</M>
          <p>Vérification: 2³ = 8 éléments ✓</p>
        </div>
      ),
    },
    {
      id: 'ex2',
      title: 'Exercice 2 - Identification d\'algèbre de Boole (QCM)',
      difficulty: 2,
      tags: ['Algèbre de Boole'],
      hint: 'Vérifiez : contient ∅ et Ω ? Cardinal = 2ⁿ ? Stable par complémentaire ?',
      content: (
        <div>
          <p>Ω = {'{a, b, c, d, e}'}. Quelle famille F est une algèbre de Boole?</p>
          <p className="text-sm mt-2">a. F = {'{∅; (a); (b); (e); (a,b); (a,e); (c,d); (a,c,d); (a,b,e); (c,d,e); (a,b,c,d); (a,c,d,e); (b,c,d,e); Ω}'}</p>
          <p className="text-sm">b. F = {'{(a); (b,e); (c,d); (a,b,e); (a,c,d); (b,c,d,e); Ω}'}</p>
          <p className="text-sm">c. F = {'{∅; (a); (a,b); (a,e); (c,d); (a,b,e); (c,d,e); (a,c,d,e); Ω}'}</p>
          <p className="text-sm">d. F = {'{∅; (b); (e); (b,e); (c,d); (a,b,e); (a,c,d); (b,c,d); (a,c,d,e); (a,b,c,d); (b,c,d,e); Ω}'}</p>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>Analyse:</strong></p>
          <ul className="list-disc ml-6">
            <li><strong>a.</strong> 14 éléments ≠ 2ⁿ → ❌</li>
            <li><strong>b.</strong> Ne contient pas ∅ → ❌</li>
            <li><strong>c.</strong> (a) ∈ F mais (b,c,d,e) ∉ F → ❌</li>
            <li><strong>d.</strong> 12 éléments ≠ 2ⁿ → ❌</li>
          </ul>
          <p className="text-[var(--color-success)] font-semibold">Réponse: e. Autre - Aucune des familles proposées n'est une algèbre de Boole.</p>
        </div>
      ),
    },
    {
      id: 'ex3',
      title: 'Exercice 3 - Probabilités avec événements indépendants',
      difficulty: 1,
      tags: ['Indépendance', 'Probabilités conditionnelles'],
      content: (
        <div>
          <p>P(A) = 1/5 (ouvrier quitte), P(B) = 1/8 (cadre quitte). A et B indépendants.</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>P(A ∩ B) - A et B quittent</li>
            <li>P(A ∪ B) - L'un des deux quitte</li>
            <li>P(Ā ∩ B̄) - Ni A ni B ne quittent</li>
            <li>P(Ā ∩ B) - B seulement quitte</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>a) P(A ∩ B):</strong></p>
          <M>{"P(A \\cap B) = P(A) \\times P(B) = \\frac{1}{5} \\times \\frac{1}{8} = \\boxed{\\frac{1}{40} = 0.025}"}</M>
          
          <p><strong>b) P(A ∪ B):</strong></p>
          <M>{"P(A \\cup B) = \\frac{1}{5} + \\frac{1}{8} - \\frac{1}{40} = \\frac{8 + 5 - 1}{40} = \\boxed{\\frac{3}{10} = 0.3}"}</M>
          
          <p><strong>c) P(Ā ∩ B̄):</strong></p>
          <M>{"P(\\bar{A} \\cap \\bar{B}) = \\frac{4}{5} \\times \\frac{7}{8} = \\boxed{\\frac{7}{10} = 0.7}"}</M>
          
          <p><strong>d) P(Ā ∩ B):</strong></p>
          <M>{"P(\\bar{A} \\cap B) = \\frac{4}{5} \\times \\frac{1}{8} = \\boxed{\\frac{1}{10} = 0.1}"}</M>
        </div>
      ),
    },
    {
      id: 'ex4',
      title: 'Exercice 4 - Théorème de Bayes (Machines)',
      difficulty: 2,
      tags: ['Bayes', 'Probabilités conditionnelles'],
      hint: 'Calculez d\'abord P(D) avec les probabilités totales.',
      content: (
        <div>
          <p>Machine A: 40% des pièces, 3% défectueuses</p>
          <p>Machine B: 60% des pièces, 2% défectueuses</p>
          <p>Calculer P(A|D) - probabilité que la pièce vienne de A sachant qu'elle est défectueuse.</p>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>Données:</strong></p>
          <p>P(A) = 0.4, P(B) = 0.6, P(D|A) = 0.03, P(D|B) = 0.02</p>
          
          <p><strong>P(D) par probabilités totales:</strong></p>
          <M>{"P(D) = P(D|A) \\cdot P(A) + P(D|B) \\cdot P(B)"}</M>
          <M>{"= 0.03 \\times 0.4 + 0.02 \\times 0.6 = 0.012 + 0.012 = 0.024"}</M>
          
          <p><strong>P(A|D) par Bayes:</strong></p>
          <M>{"P(A|D) = \\frac{P(D|A) \\cdot P(A)}{P(D)} = \\frac{0.012}{0.024} = \\boxed{0.5 = 50\\%}"}</M>
        </div>
      ),
    },
    {
      id: 'ex5',
      title: 'Exercice 5 - Bayes (Investisseur)',
      difficulty: 2,
      tags: ['Bayes', 'Probabilités conditionnelles'],
      content: (
        <div>
          <p>P(mal informé) = 0.2, P(bien informé) = 0.8</p>
          <p>P(monte | bien informé) = 0.8, P(monte | mal informé) = 0.5</p>
          <p>Calculer P(mal informé | monte).</p>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>P(↑) par probabilités totales:</strong></p>
          <M>{"P(\\uparrow) = 0.8 \\times 0.8 + 0.5 \\times 0.2 = 0.64 + 0.10 = 0.74"}</M>
          
          <p><strong>P(M|↑) par Bayes:</strong></p>
          <M>{"P(M|\\uparrow) = \\frac{0.5 \\times 0.2}{0.74} = \\frac{0.10}{0.74} = \\boxed{0.1351 \\approx 13.51\\%}"}</M>
        </div>
      ),
    },
    {
      id: 'ex6',
      title: 'Exercice 6 - Assemblée (Cravate et yeux bleus)',
      difficulty: 1,
      tags: ['Probabilités conditionnelles'],
      content: (
        <div>
          <p>Assemblée de 250 personnes:</p>
          <ul className="list-disc ml-6">
            <li>120 hommes portent la cravate (C)</li>
            <li>85 hommes ont les yeux bleus (B)</li>
            <li>50 hommes ont les yeux bleus ET portent la cravate</li>
          </ul>
          <ol className="list-decimal ml-6 mt-2">
            <li>P(C)</li>
            <li>P(B ∩ C)</li>
            <li>P(B ∪ C)</li>
            <li>P(ni B ni C)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. P(C):</strong></p>
          <M>{"P(C) = \\frac{120}{250} = \\boxed{0.48 = 48\\%}"}</M>
          
          <p><strong>2. P(B ∩ C):</strong></p>
          <M>{"P(B \\cap C) = \\frac{50}{250} = \\boxed{0.20 = 20\\%}"}</M>
          
          <p><strong>3. P(B ∪ C):</strong></p>
          <M>{"P(B \\cup C) = \\frac{85 + 120 - 50}{250} = \\frac{155}{250} = \\boxed{0.62 = 62\\%}"}</M>
          
          <p><strong>4. P(ni B ni C):</strong></p>
          <M>{"P(\\overline{B \\cup C}) = 1 - 0.62 = \\boxed{0.38 = 38\\%}"}</M>
        </div>
      ),
    },
    {
      id: 'ex7',
      title: 'Exercice 7 (Partiel 2023) - Algèbre de Boole 16 éléments',
      difficulty: 2,
      tags: ['Algèbre de Boole'],
      content: (
        <div>
          <p>Ω = {'{a, b, c, d, e}'}, algèbre de Boole de 16 éléments.</p>
          <p>Calculer les 14 résultats d'opérations ensemblistes.</p>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <table className="border-collapse border border-[var(--color-border-strong)] text-xs">
            <thead><tr><th className="border border-[var(--color-border-strong)] p-1">Q</th><th className="border border-[var(--color-border-strong)] p-1">Calcul</th><th className="border border-[var(--color-border-strong)] p-1">Réponse</th></tr></thead>
            <tbody>
              <tr><td className="border border-[var(--color-border-strong)] p-1">1</td><td className="border border-[var(--color-border-strong)] p-1">[(b,c,d) ∪ (a,b)] ∩ (a,c,d)</td><td className="border border-[var(--color-border-strong)] p-1">(a,c,d)</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] p-1">2</td><td className="border border-[var(--color-border-strong)] p-1">(a,b,c) ∩ (b,c,d) ∩ (b,c,e)</td><td className="border border-[var(--color-border-strong)] p-1">(b,c)</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] p-1">3</td><td className="border border-[var(--color-border-strong)] p-1">[(∅) ∪ (ā)] ∩ [∅ ∪ (a,e)]</td><td className="border border-[var(--color-border-strong)] p-1">(e)</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] p-1">4</td><td className="border border-[var(--color-border-strong)] p-1">(a,d,e) ∪ ∅</td><td className="border border-[var(--color-border-strong)] p-1">(a,d,e)</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] p-1">5</td><td className="border border-[var(--color-border-strong)] p-1">R1 ∪ R2</td><td className="border border-[var(--color-border-strong)] p-1">(a,b,c,d)</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] p-1">6</td><td className="border border-[var(--color-border-strong)] p-1">[(a,d) ∪ (a,d,e)] ∩ (a,e)</td><td className="border border-[var(--color-border-strong)] p-1">(a,e)</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] p-1">7</td><td className="border border-[var(--color-border-strong)] p-1">[(d,e) ∩ (d,e)] ∪ ∅</td><td className="border border-[var(--color-border-strong)] p-1">(d,e)</td></tr>
            </tbody>
          </table>
          <p className="text-[var(--color-success)] font-semibold">Les 14 éléments + ∅ et Ω = 16 éléments</p>
        </div>
      ),
    },
    {
      id: 'ex8',
      title: 'Exercice 8 (Partiel 2023) - Bayes (Taille des élèves)',
      difficulty: 2,
      tags: ['Bayes', 'Probabilités conditionnelles'],
      content: (
        <div>
          <p>40% des garçons mesurent {'>'} 1.80m, 15% des filles mesurent {'>'} 1.80m</p>
          <p>60% des élèves sont des filles.</p>
          <p>Calculer P(fille | mesure {'>'} 1.80m).</p>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>Données:</strong></p>
          <p>P(G) = 0.4, P(F) = 0.6, P(T|G) = 0.4, P(T|F) = 0.15</p>
          
          <p><strong>P(T) par probabilités totales:</strong></p>
          <M>{"P(T) = 0.4 \\times 0.4 + 0.15 \\times 0.6 = 0.16 + 0.09 = 0.25"}</M>
          
          <p><strong>P(F|T) par Bayes:</strong></p>
          <M>{"P(F|T) = \\frac{0.15 \\times 0.6}{0.25} = \\frac{0.09}{0.25} = \\boxed{0.36 = 36\\%}"}</M>
        </div>
      ),
    },
  ],
};
