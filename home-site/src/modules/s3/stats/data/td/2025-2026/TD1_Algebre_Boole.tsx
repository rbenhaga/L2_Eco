import { Math as M } from '../../../../../../components';
import type { TDSheet } from '../types';

export const TD1_2526: TDSheet = {
  id: 'td1-2526',
  title: 'TD1 - Algèbre de Boole et Calcul de probabilités',
  chapter: 'CH1',
  year: '2025-2026',
  reminders: [
    { title: 'Formule de Poincaré (2 événements)', formula: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)' },
    { title: 'Probabilité conditionnelle', formula: 'P(A | B) = \\frac{P(A \\cap B)}{P(B)}' },
    { title: 'Formule de Bayes', formula: 'P(A_i | B) = \\frac{P(B | A_i) \\cdot P(A_i)}{\\sum_j P(B | A_j) \\cdot P(A_j)}' },
    { title: 'Indépendance', formula: 'A \\perp B \\Leftrightarrow P(A \\cap B) = P(A) \\cdot P(B)' },
    { title: 'Cardinal algèbre de Boole', formula: 'n \\text{ atomes} \\Rightarrow 2^n \\text{ éléments}' },
  ],
  exercises: [
    {
      id: 'ex1',
      title: 'Exercice 1 (Octobre 2024) - Construction d\'algèbre de Boole',
      difficulty: 2,
      tags: ['Algèbre de Boole'],
      hint: 'Commencez par trouver les atomes en calculant toutes les intersections possibles entre les ensembles de base.',
      content: (
        <div>
          <p>Soit Ω un ensemble de cinq éléments a, b, c, d et e.</p>
          <p>Construire la plus petite algèbre de Boole F contenant les parties (a), (c,d), (d,b,e).</p>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <div className="bg-[var(--color-info-subtle)] border-l-4 border-[var(--color-info)] p-3 mb-4">
            <p className="font-semibold text-[var(--color-info)]">📋 Méthode générale pour construire la plus petite algèbre de Boole</p>
            <ol className="list-decimal ml-6 mt-2 text-sm text-[var(--color-text-primary)]">
              <li><strong>Trouver les atomes</strong> : créer un tableau avec chaque élément de Ω et cocher dans quels ensembles de base il apparaît</li>
              <li><strong>Regrouper</strong> : les éléments avec exactement les mêmes coches forment un atome</li>
              <li><strong>Construire l'algèbre</strong> : faire toutes les unions possibles d'atomes (2ⁿ éléments avec n atomes)</li>
            </ol>
          </div>

          <p><strong>Étape 1: Trouver les atomes avec un tableau</strong></p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">
            On liste chaque élément de Ω = {'{a, b, c, d, e}'} et on coche dans quels ensembles de base il apparaît :
          </p>
          
          <table className="border-collapse border border-[var(--color-border-strong)] text-sm mb-3">
            <thead>
              <tr className="bg-[var(--color-bg-overlay)]/80">
                <th className="border border-[var(--color-border-strong)] px-3 py-1">Élément</th>
                <th className="border border-[var(--color-border-strong)] px-3 py-1">{'{a}'}</th>
                <th className="border border-[var(--color-border-strong)] px-3 py-1">{'{c,d}'}</th>
                <th className="border border-[var(--color-border-strong)] px-3 py-1">{'{b,d,e}'}</th>
                <th className="border border-[var(--color-border-strong)] px-3 py-1">→ Atome</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-[var(--color-border-strong)] px-3 py-1 font-semibold">a</td><td className="border border-[var(--color-border-strong)] px-3 py-1 text-center">✓</td><td className="border border-[var(--color-border-strong)] px-3 py-1 text-center">-</td><td className="border border-[var(--color-border-strong)] px-3 py-1 text-center">-</td><td className="border border-[var(--color-border-strong)] px-3 py-1 bg-[var(--color-warning-subtle)]">{'{a}'}</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] px-3 py-1 font-semibold">b</td><td className="border border-[var(--color-border-strong)] px-3 py-1 text-center">-</td><td className="border border-[var(--color-border-strong)] px-3 py-1 text-center">-</td><td className="border border-[var(--color-border-strong)] px-3 py-1 text-center">✓</td><td className="border border-[var(--color-border-strong)] px-3 py-1 bg-[var(--color-success-subtle)]" rowSpan={2}>{'{b,e}'}</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] px-3 py-1 font-semibold">e</td><td className="border border-[var(--color-border-strong)] px-3 py-1 text-center">-</td><td className="border border-[var(--color-border-strong)] px-3 py-1 text-center">-</td><td className="border border-[var(--color-border-strong)] px-3 py-1 text-center">✓</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] px-3 py-1 font-semibold">c</td><td className="border border-[var(--color-border-strong)] px-3 py-1 text-center">-</td><td className="border border-[var(--color-border-strong)] px-3 py-1 text-center">✓</td><td className="border border-[var(--color-border-strong)] px-3 py-1 text-center">-</td><td className="border border-[var(--color-border-strong)] px-3 py-1 bg-[var(--color-warning-subtle)]">{'{c}'}</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] px-3 py-1 font-semibold">d</td><td className="border border-[var(--color-border-strong)] px-3 py-1 text-center">-</td><td className="border border-[var(--color-border-strong)] px-3 py-1 text-center">✓</td><td className="border border-[var(--color-border-strong)] px-3 py-1 text-center">✓</td><td className="border border-[var(--color-border-strong)] px-3 py-1 bg-[var(--color-micro-subtle)]">{'{d}'}</td></tr>
            </tbody>
          </table>
          
          <p className="text-sm text-[var(--color-text-secondary)]">
            <strong>Lecture du tableau :</strong> b et e ont exactement les mêmes coches (seulement dans {'{b,d,e}'}) → ils forment ensemble l'atome {'{b,e}'}. 
            Les autres éléments ont des coches différentes → chacun forme son propre atome.
          </p>
          
          <p className="mt-2"><strong>Atomes trouvés :</strong> {'{a}'}, {'{b,e}'}, {'{c}'}, {'{d}'} → <strong>4 atomes</strong></p>
          
          <p className="mt-4"><strong>Étape 2: Construire l'algèbre</strong></p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">
            L'algèbre = toutes les unions possibles d'atomes. Avec 4 atomes → 2⁴ = 16 éléments.
          </p>
          
          <table className="border-collapse border border-[var(--color-border-strong)] text-sm mb-3">
            <thead>
              <tr className="bg-[var(--color-bg-overlay)]/80">
                <th className="border border-[var(--color-border-strong)] px-3 py-1">Nb d'atomes</th>
                <th className="border border-[var(--color-border-strong)] px-3 py-1">Combinaisons</th>
                <th className="border border-[var(--color-border-strong)] px-3 py-1">Éléments de F</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-[var(--color-border-strong)] px-3 py-1">0</td><td className="border border-[var(--color-border-strong)] px-3 py-1">C(4,0) = 1</td><td className="border border-[var(--color-border-strong)] px-3 py-1">∅</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] px-3 py-1">1</td><td className="border border-[var(--color-border-strong)] px-3 py-1">C(4,1) = 4</td><td className="border border-[var(--color-border-strong)] px-3 py-1">{'{a}'}, {'{c}'}, {'{d}'}, {'{b,e}'}</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] px-3 py-1">2</td><td className="border border-[var(--color-border-strong)] px-3 py-1">C(4,2) = 6</td><td className="border border-[var(--color-border-strong)] px-3 py-1">{'{a,c}'}, {'{a,d}'}, {'{a,b,e}'}, {'{c,d}'}, {'{c,b,e}'}, {'{d,b,e}'}</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] px-3 py-1">3</td><td className="border border-[var(--color-border-strong)] px-3 py-1">C(4,3) = 4</td><td className="border border-[var(--color-border-strong)] px-3 py-1">{'{a,c,d}'}, {'{a,c,b,e}'}, {'{a,d,b,e}'}, {'{c,d,b,e}'}</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] px-3 py-1">4</td><td className="border border-[var(--color-border-strong)] px-3 py-1">C(4,4) = 1</td><td className="border border-[var(--color-border-strong)] px-3 py-1">Ω = {'{a,b,c,d,e}'}</td></tr>
            </tbody>
          </table>
          
          <p className="text-sm text-[var(--color-text-secondary)]">Total : 1 + 4 + 6 + 4 + 1 = 16 ✓</p>
          
          <p className="mt-2"><strong>Réponse finale :</strong></p>
          <div className="bg-[var(--color-bg-overlay)]/50 p-3 rounded border overflow-x-auto">
            <p className="text-sm font-mono whitespace-nowrap">
              <strong>F = {'{'}</strong> ∅, {'{a}'}, {'{c}'}, {'{d}'}, {'{b,e}'}, {'{a,c}'}, {'{a,d}'}, {'{a,b,e}'}, {'{c,d}'}, {'{c,b,e}'}, {'{d,b,e}'}, {'{a,c,d}'}, {'{a,c,b,e}'}, {'{a,d,b,e}'}, {'{c,d,b,e}'}, Ω <strong>{'}'}</strong>
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'ex2',
      title: 'Exercice 2 - Plus petite algèbre de Boole (QCM)',
      difficulty: 1,
      tags: ['Algèbre de Boole'],
      content: (
        <div>
          <p>Soit Ω = {'{i, j, k, l}'}. Quelle est la plus petite algèbre de Boole contenant (i), (j,l) et (i,j,k)?</p>
          <p className="mt-2">a. {'{∅; (i); (j); (k); (l); (i,k); (j,l); (i,l); (j,k); (i,j,l); (i,k,l); (i,j,k); (j,k,l); Ω}'}</p>
          <p>b. {'{∅; (i); (j); (k); (l); (i,j); (i,k); (i,l); (j,k); (k,l); (j,l); (i,j,k); (i,k,l); (i,j,l); (j,k,l); Ω}'}</p>
          <p>c. {'{∅; (i); (j); (k); (i,k); (i,l); (j,k); (i,j,l); (i,j,k); (j,k,l); Ω}'}</p>
          <p>d. autre</p>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>Intersections:</strong></p>
          <ul className="list-disc ml-6">
            <li>{'{i}'} ∩ {'{j,l}'} = ∅</li>
            <li>{'{i}'} ∩ {'{i,j,k}'} = {'{i}'}</li>
            <li>{'{j,l}'} ∩ {'{i,j,k}'} = {'{j}'}</li>
          </ul>
          <p><strong>Atomes:</strong> {'{i}'}, {'{j}'}, {'{k}'}, {'{l}'} → 4 atomes → 2⁴ = 16 éléments</p>
          <p className="text-[var(--color-success)] font-semibold">✓ Réponse: b.</p>
        </div>
      ),
    },
    {
      id: 'ex3',
      title: 'Exercice 3 - Vrai ou Faux sur algèbre de Boole',
      difficulty: 2,
      tags: ['Algèbre de Boole'],
      hint: 'Construisez d\'abord l\'algèbre complète, puis vérifiez chaque affirmation une par une.',
      content: (
        <div>
          <p>Soit Ω = {'{A, B, C, D, E}'}. Répondre Vrai ou Faux pour la plus petite algèbre de Boole contenant (B), (A,D), (B,C,D,E).</p>
          <ol className="list-decimal ml-6 mt-2 space-y-1">
            <li>(F) est une partie de la plus petite algèbre de Boole.</li>
            <li>(D) ∪ (E) est une partie de la plus petite algèbre de Boole.</li>
            <li>(∅̄) ∩ (A,B) n'est pas une partie de la plus petite algèbre de Boole.</li>
            <li>(Ω̄ ∩ ∅) ∪ (B,C) ∩ (D,E) ne fait pas partie de la plus petite algèbre de Boole.</li>
            <li>L'élément (C) se trouve dans 50% des éléments.</li>
            <li>L'élément (B) se trouve dans 75% des éléments.</li>
            <li>L'intersection entre tous les éléments de base n'est pas une partie.</li>
            <li>25% des parties sont formées de deux éléments.</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>Construction de l'algèbre:</strong></p>
          <p className="text-sm">Ensembles de base : {'{B}'}, {'{A,D}'}, {'{B,C,D,E}'}</p>
          <p className="text-sm mb-2">Atomes (méthode du tableau) : {'{A}'}, {'{B}'}, {'{C,E}'}, {'{D}'} → 4 atomes → 2⁴ = 16 éléments</p>
          
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">
            <strong>F = </strong>{'{'}∅, {'{A}'}, {'{B}'}, {'{D}'}, {'{C,E}'}, {'{A,B}'}, {'{A,D}'}, {'{A,C,E}'}, {'{B,D}'}, {'{B,C,E}'}, {'{D,C,E}'}, {'{A,B,D}'}, {'{A,B,C,E}'}, {'{A,D,C,E}'}, {'{B,D,C,E}'}, Ω{'}'}
          </p>
          
          <table className="border-collapse border border-[var(--color-border-strong)] text-sm mt-2">
            <thead>
              <tr><th className="border border-[var(--color-border-strong)] p-2">#</th><th className="border border-[var(--color-border-strong)] p-2">Réponse</th><th className="border border-[var(--color-border-strong)] p-2">Justification</th></tr>
            </thead>
            <tbody>
              <tr><td className="border border-[var(--color-border-strong)] p-2">1</td><td className="border border-[var(--color-border-strong)] p-2 text-[var(--color-error)]">FAUX</td><td className="border border-[var(--color-border-strong)] p-2">{'{F}'} n'existe pas car F ∉ Ω = {'{A,B,C,D,E}'}</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] p-2">2</td><td className="border border-[var(--color-border-strong)] p-2 text-[var(--color-error)]">FAUX</td><td className="border border-[var(--color-border-strong)] p-2">{'{D}'} ∪ {'{E}'} = {'{D,E}'} ∉ F car E et C forment un atome inséparable</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] p-2">3</td><td className="border border-[var(--color-border-strong)] p-2 text-[var(--color-error)]">FAUX</td><td className="border border-[var(--color-border-strong)] p-2">∅̄ ∩ {'{A,B}'} = Ω ∩ {'{A,B}'} = {'{A,B}'} ∈ F, donc l'affirmation est fausse</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] p-2">4</td><td className="border border-[var(--color-border-strong)] p-2 text-[var(--color-error)]">FAUX</td><td className="border border-[var(--color-border-strong)] p-2">(Ω̄ ∩ ∅) ∪ ({'{B,C}'} ∩ {'{D,E}'}) = ∅ ∪ ∅ = ∅ ∈ F</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] p-2">5</td><td className="border border-[var(--color-border-strong)] p-2 text-[var(--color-success)]">VRAI</td><td className="border border-[var(--color-border-strong)] p-2">C apparaît dans 8/16 = 50% des éléments de F</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] p-2">6</td><td className="border border-[var(--color-border-strong)] p-2 text-[var(--color-error)]">FAUX</td><td className="border border-[var(--color-border-strong)] p-2">B apparaît dans 8/16 = 50% (pas 75%)</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] p-2">7</td><td className="border border-[var(--color-border-strong)] p-2 text-[var(--color-error)]">FAUX</td><td className="border border-[var(--color-border-strong)] p-2">{'{B}'} ∩ {'{A,D}'} ∩ {'{B,C,D,E}'} = ∅ ∈ F</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] p-2">8</td><td className="border border-[var(--color-border-strong)] p-2 text-[var(--color-success)]">VRAI</td><td className="border border-[var(--color-border-strong)] p-2">Parties à 2 éléments de Ω : {'{A,B}'}, {'{A,D}'}, {'{B,D}'}, {'{C,E}'} = 4/16 = 25%</td></tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: 'ex4',
      title: 'Exercice 4 - Machine avec 3 éléments',
      difficulty: 3,
      tags: ['Probabilités conditionnelles', 'Indépendance'],
      hint: 'Traduisez d\'abord les événements en notation ensembliste, puis utilisez l\'indépendance pour calculer les probabilités.',
      content: (
        <div>
          <p>Une machine M est constituée de trois éléments M1, M2 et M3.</p>
          <ul className="list-disc ml-6 mt-2">
            <li>M fonctionne à plein régime si M1, M2 et M3 fonctionnent.</li>
            <li>M fonctionne à rendement réduit si M2 ou M3 (un seul) est en panne.</li>
            <li>M est en panne si M1 est en panne ou M2 et M3 sont en panne.</li>
          </ul>
          <p className="mt-2">P(M1) = 0.8, P(M2) = 0.9, P(M3) = 0.7. Pannes indépendantes.</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>P(M fonctionne)?</li>
            <li>P(rendement réduit | M fonctionne)?</li>
            <li>P(M1 en panne | M en panne)?</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. P(M fonctionne):</strong></p>
          <p>M en panne = M̄1 ∪ (M̄2 ∩ M̄3)</p>
          <M>{"P(\\text{M en panne}) = P(\\bar{M1}) + P(\\bar{M2} \\cap \\bar{M3}) - P(\\bar{M1} \\cap \\bar{M2} \\cap \\bar{M3})"}</M>
          <M>{"= 0.2 + (0.1 \\times 0.3) - (0.2 \\times 0.1 \\times 0.3) = 0.2 + 0.03 - 0.006 = 0.224"}</M>
          <p className="text-[var(--color-success)] font-semibold"><M>{"P(\\text{M fonctionne}) = 1 - 0.224 = \\boxed{0.776}"}</M></p>
          
          <p><strong>2. P(rendement réduit | M fonctionne):</strong></p>
          <M>{"P(\\text{réduit}) = P(M1) \\times [P(M2) \\times P(\\bar{M3}) + P(\\bar{M2}) \\times P(M3)]"}</M>
          <M>{"= 0.8 \\times [0.9 \\times 0.3 + 0.1 \\times 0.7] = 0.8 \\times 0.34 = 0.272"}</M>
          <p className="text-[var(--color-success)] font-semibold"><M>{"P(\\text{réduit} | \\text{fonctionne}) = \\frac{0.272}{0.776} = \\boxed{0.351}"}</M></p>
          
          <p><strong>3. P(M1 en panne | M en panne):</strong></p>
          <M>{"P(\\bar{M1} | \\text{M en panne}) = \\frac{P(\\bar{M1})}{P(\\text{M en panne})} = \\frac{0.2}{0.224} = \\boxed{0.893}"}</M>
        </div>
      ),
    },
    {
      id: 'ex5',
      title: 'Exercice 5 - Loisirs à Montpellier',
      difficulty: 1,
      tags: ['Probabilités conditionnelles'],
      content: (
        <div>
          <p>Étude sur 190 personnes:</p>
          <ul className="list-disc ml-6">
            <li>60 participent à l'estivale (E)</li>
            <li>45 préfèrent la plage (P)</li>
            <li>25 participent aux deux (E ∩ P)</li>
          </ul>
          <ol className="list-decimal ml-6 mt-2">
            <li>P(E ∪ P)?</li>
            <li>P(uniquement E)?</li>
            <li>P(E | P)?</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. P(E ∪ P):</strong></p>
          <M>{"P(E \\cup P) = P(E) + P(P) - P(E \\cap P) = \\frac{60}{190} + \\frac{45}{190} - \\frac{25}{190} = \\frac{80}{190} = \\boxed{0.421}"}</M>
          
          <p><strong>2. P(uniquement E):</strong></p>
          <M>{"P(E \\cap \\bar{P}) = P(E) - P(E \\cap P) = \\frac{60 - 25}{190} = \\frac{35}{190} = \\boxed{0.184}"}</M>
          
          <p><strong>3. P(E | P):</strong></p>
          <M>{"P(E | P) = \\frac{P(E \\cap P)}{P(P)} = \\frac{25/190}{45/190} = \\frac{25}{45} = \\boxed{\\frac{5}{9} \\approx 0.556}"}</M>
        </div>
      ),
    },
    {
      id: 'ex6',
      title: 'Exercice 6 - Clés USB défectueuses (Bayes)',
      difficulty: 2,
      tags: ['Bayes', 'Probabilités conditionnelles'],
      hint: 'Construisez un tableau de contingence pour visualiser les données, puis appliquez Bayes.',
      content: (
        <div>
          <p>1000 boîtes avec clés USB:</p>
          <ul className="list-disc ml-6">
            <li>50 boîtes abîmées (A)</li>
            <li>30 boîtes abîmées contiennent une clé défectueuse</li>
            <li>931 boîtes non abîmées ne contiennent pas de clé défectueuse</li>
          </ul>
          <p className="mt-2">Calculer P(A | D) - probabilité que la boîte soit abîmée sachant que la clé est défectueuse.</p>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>Tableau de contingence:</strong></p>
          <table className="border-collapse border border-[var(--color-border-strong)] text-sm">
            <thead>
              <tr><th className="border border-[var(--color-border-strong)] p-2"></th><th className="border border-[var(--color-border-strong)] p-2">Défectueuse (D)</th><th className="border border-[var(--color-border-strong)] p-2">Non défectueuse</th><th className="border border-[var(--color-border-strong)] p-2">Total</th></tr>
            </thead>
            <tbody>
              <tr><td className="border border-[var(--color-border-strong)] p-2">Abîmée (A)</td><td className="border border-[var(--color-border-strong)] p-2">30</td><td className="border border-[var(--color-border-strong)] p-2">20</td><td className="border border-[var(--color-border-strong)] p-2">50</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] p-2">Non abîmée</td><td className="border border-[var(--color-border-strong)] p-2">19</td><td className="border border-[var(--color-border-strong)] p-2">931</td><td className="border border-[var(--color-border-strong)] p-2">950</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] p-2 font-semibold">Total</td><td className="border border-[var(--color-border-strong)] p-2 font-semibold">49</td><td className="border border-[var(--color-border-strong)] p-2 font-semibold">951</td><td className="border border-[var(--color-border-strong)] p-2 font-semibold">1000</td></tr>
            </tbody>
          </table>
          <p><strong>Par Bayes:</strong></p>
          <M>{"P(A | D) = \\frac{P(D | A) \\cdot P(A)}{P(D)} = \\frac{30/1000}{49/1000} = \\frac{30}{49} = \\boxed{0.612}"}</M>
        </div>
      ),
    },
    {
      id: 'ex7',
      title: 'Exercice 7 - ALL STAR GAME',
      difficulty: 1,
      tags: ['Probabilités conditionnelles'],
      content: (
        <div>
          <p>Mike participe à deux jeux. P(A) = 0.3, P(B) = 0.4, P(A∩B) = 0.15.</p>
          <ol className="list-decimal ml-6">
            <li>P(au moins un jeu gagné)</li>
            <li>P(exactement un jeu gagné)</li>
            <li>P(perd au second | gagne au premier)</li>
            <li>P(B \ (A∩B))</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. P(A ∪ B):</strong></p>
          <M>{"P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = 0.3 + 0.4 - 0.15 = \\boxed{0.55}"}</M>
          
          <p><strong>2. P(exactement un):</strong></p>
          <M>{"P(\\text{un seul}) = P(A \\cup B) - P(A \\cap B) = 0.55 - 0.15 = \\boxed{0.40}"}</M>
          
          <p><strong>3. P(B̄ | A):</strong></p>
          <M>{"P(\\bar{B} | A) = \\frac{P(A) - P(A \\cap B)}{P(A)} = \\frac{0.3 - 0.15}{0.3} = \\boxed{0.5}"}</M>
          
          <p><strong>4. P(B \ (A∩B)):</strong></p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">B \ (A∩B) = éléments de B qui ne sont pas dans A∩B = B ∩ Ā (car A∩B est exactement la partie de B qui est dans A)</p>
          <M>{"P(B \\setminus (A \\cap B)) = P(B) - P(A \\cap B) = 0.4 - 0.15 = \\boxed{0.25}"}</M>
        </div>
      ),
    },
  ],
};
