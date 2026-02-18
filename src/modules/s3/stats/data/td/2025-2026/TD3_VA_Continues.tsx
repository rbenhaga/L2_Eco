import { Math as M } from '../../../../../../components';
import type { TDSheet } from '../types';

export const TD3_2526: TDSheet = {
  id: 'td3-2526',
  title: 'TD3 - Variables aléatoires continues à une dimension',
  chapter: 'CH3',
  year: '2025-2026',
  reminders: [
    { title: 'Condition de densité', formula: '\\int_{-\\infty}^{+\\infty} f(x)\\,dx = 1' },
    { title: 'Fonction de répartition', formula: 'F(x) = P(X \\leq x) = \\int_{-\\infty}^{x} f(t)\\,dt' },
    { title: 'Espérance (continue)', formula: 'E(X) = \\int_{-\\infty}^{+\\infty} x \\cdot f(x)\\,dx' },
    { title: 'Variance (continue)', formula: 'V(X) = E(X^2) - [E(X)]^2' },
    { title: 'Loi Gamma Γ(α,β)', formula: 'E(X) = \\frac{\\alpha}{\\beta}, \\quad V(X) = \\frac{\\alpha}{\\beta^2}' },
    { title: 'Médiane', formula: 'F(Me) = 0.5' },
  ],
  exercises: [
    {
      id: 'ex1',
      title: 'Exercice 1 - Densité 1/x',
      difficulty: 2,
      tags: ['Densité', 'Fonction de répartition', 'Intégration'],
      hint: 'Pour intégrer 1/x, pensez au logarithme népérien. Attention aux valeurs absolues !',
      content: (
        <div>
          <p>Densité: <M>{"f(x) = \\frac{a}{x}"}</M> si <M>{"-e^{0.5} \\leq x \\leq -1"}</M>, 0 sinon</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Déterminer a</li>
            <li>Fonction de répartition F(x)</li>
            <li>E(X)</li>
            <li>P(-1.5 ≤ X ≤ -1)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Déterminer a:</strong></p>
          <M>{"\\int_{-e^{0.5}}^{-1} \\frac{a}{x} dx = a[\\ln|x|]_{-e^{0.5}}^{-1} = a(0 - 0.5) = 1"}</M>
          <p className="text-[var(--color-success)] font-semibold"><M>{"\\boxed{a = -2}"}</M></p>
          
          <p><strong>2. Fonction de répartition:</strong></p>
          <M>{"F(x) = \\begin{cases} 0 & x < -e^{0.5} \\\\ 1 - 2\\ln|x| & -e^{0.5} \\leq x \\leq -1 \\\\ 1 & x > -1 \\end{cases}"}</M>
          
          <p><strong>3. E(X):</strong></p>
          <M>{"E(X) = \\int_{-e^{0.5}}^{-1} x \\cdot \\frac{-2}{x} dx = -2[x]_{-e^{0.5}}^{-1} = -2(-1 + e^{0.5})"}</M>
          <p className="text-[var(--color-success)] font-semibold"><M>{"E(X) = \\boxed{2 - 2\\sqrt{e} \\approx -1.297}"}</M></p>
          
          <p><strong>4. P(-1.5 ≤ X ≤ -1):</strong></p>
          <M>{"P(-1.5 \\leq X \\leq -1) = F(-1) - F(-1.5) = 1 - (1 - 2\\ln 1.5) = \\boxed{0.811}"}</M>
        </div>
      ),
    },
    {
      id: 'ex2',
      title: 'Exercice 2 - Densité racine carrée',
      difficulty: 1,
      tags: ['Densité', 'Fonction de répartition', 'Intégration'],
      content: (
        <div>
          <p>Densité: <M>{"f(x) = b\\sqrt{x}"}</M> si 0 ≤ x ≤ 1, 0 sinon</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Déterminer b</li>
            <li>Fonction de répartition F(x)</li>
            <li>P(1/2 ≤ X ≤ 2/3)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Déterminer b:</strong></p>
          <M>{"\\int_0^1 b\\sqrt{x} dx = b \\cdot \\frac{2}{3}[x^{3/2}]_0^1 = \\frac{2b}{3} = 1"}</M>
          <p className="text-[var(--color-success)] font-semibold"><M>{"\\boxed{b = \\frac{3}{2}}"}</M></p>
          
          <p><strong>2. Fonction de répartition:</strong></p>
          <M>{"F(x) = \\begin{cases} 0 & x < 0 \\\\ x^{3/2} & 0 \\leq x \\leq 1 \\\\ 1 & x > 1 \\end{cases}"}</M>
          
          <p><strong>3. P(1/2 ≤ X ≤ 2/3):</strong></p>
          <M>{"P\\left(\\frac{1}{2} \\leq X \\leq \\frac{2}{3}\\right) = \\left(\\frac{2}{3}\\right)^{3/2} - \\left(\\frac{1}{2}\\right)^{3/2} = \\boxed{0.191}"}</M>
        </div>
      ),
    },
    {
      id: 'ex3',
      title: 'Exercice 3 - Densité puissance négative',
      difficulty: 3,
      tags: ['Densité', 'Espérance', 'Variance', 'Intégration'],
      hint: 'Pour les moments d\'ordre k, l\'intégrale converge seulement si l\'exposant reste négatif.',
      content: (
        <div>
          <p>Densité: <M>{"f(x) = \\frac{c+1}{x^7}"}</M> si x ≥ 1, 0 sinon</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Déterminer c</li>
            <li>Fonction de répartition F(x)</li>
            <li>E(X) et V(X)</li>
            <li>Médiane</li>
            <li>Moment non centré d'ordre 3</li>
            <li>Condition d'existence du moment d'ordre k</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Déterminer c:</strong></p>
          <M>{"\\int_1^{+\\infty} \\frac{c+1}{x^7} dx = (c+1) \\cdot \\frac{1}{6} = 1 \\Rightarrow \\boxed{c = 5}"}</M>
          
          <p><strong>2. Fonction de répartition:</strong></p>
          <M>{"F(x) = \\begin{cases} 0 & x < 1 \\\\ 1 - x^{-6} & x \\geq 1 \\end{cases}"}</M>
          
          <p><strong>3. E(X) et V(X):</strong></p>
          <M>{"E(X) = 6 \\int_1^{+\\infty} x^{-6} dx = \\frac{6}{5} = \\boxed{1.2}"}</M>
          <M>{"E(X^2) = \\frac{6}{4} = 1.5 \\Rightarrow V(X) = 1.5 - 1.44 = \\boxed{0.06}"}</M>
          
          <p><strong>4. Médiane:</strong></p>
          <M>{"F(Me) = 0.5 \\Rightarrow Me^{-6} = 0.5 \\Rightarrow \\boxed{Me = \\sqrt[6]{2} \\approx 1.122}"}</M>
          
          <p><strong>5. Moment d'ordre 3:</strong></p>
          <M>{"m_3 = E(X^3) = \\frac{6}{3} = \\boxed{2}"}</M>
          
          <p><strong>6. Condition d'existence:</strong></p>
          <M>{"m_k \\text{ existe si } k - 6 < 0 \\Rightarrow \\boxed{k < 6}"}</M>
        </div>
      ),
    },
    {
      id: 'ex4',
      title: 'Exercice 4 - Loi Gamma',
      difficulty: 2,
      tags: ['Loi Gamma', 'Variance'],
      hint: 'Identifiez les paramètres α et β en comparant avec la forme standard de la loi Gamma.',
      content: (
        <div>
          <p>Densité: <M>{"f(x) = \\frac{243}{8} e^{-3xp} x^{3p^2}"}</M> pour x {'>'} 0, p {'>'} 0</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Déterminer p</li>
            <li>V(X)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Déterminer p:</strong></p>
          <p>On reconnaît une forme Gamma <M>{"\\Gamma(\\alpha, \\beta)"}</M>:</p>
          <M>{"f(x) = \\frac{\\beta^\\alpha}{\\Gamma(\\alpha)} x^{\\alpha-1} e^{-\\beta x}"}</M>
          <p>Identification: β = 3p, α = 3p² + 1</p>
          <p className="text-[var(--color-success)] font-semibold"><M>{"\\boxed{p = 1}"}</M></p>
          
          <p><strong>2. V(X):</strong></p>
          <p>Pour Γ(4, 3):</p>
          <M>{"V(X) = \\frac{\\alpha}{\\beta^2} = \\frac{4}{9} = \\boxed{\\frac{4}{9}}"}</M>
        </div>
      ),
    },
    {
      id: 'ex5',
      title: 'Exercice 5 - Densité mixte',
      difficulty: 3,
      tags: ['Densité', 'Espérance', 'Loi Gamma', 'Intégration'],
      content: (
        <div>
          <p><strong>Partie 1:</strong> <M>{"f(x) = k\\left(\\frac{1}{x} + x^{-2}\\right)"}</M> si 1 ≤ x {'<'} 5</p>
          <p><strong>Partie 2:</strong> <M>{"f(x) = \\frac{1}{\\Gamma(p)} (x+m)^{p-1} e^{-(x+m)}"}</M> pour x {'>'} -m</p>
          <p>Calculer k et E(X) pour chaque partie.</p>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>Partie 1 - Déterminer k:</strong></p>
          <M>{"\\int_1^5 k\\left(\\frac{1}{x} + \\frac{1}{x^2}\\right) dx = k[\\ln x - \\frac{1}{x}]_1^5 = k(\\ln 5 + 0.8) = 1"}</M>
          <p className="text-[var(--color-success)] font-semibold"><M>{"k = \\frac{1}{\\ln 5 + 0.8} \\approx \\boxed{0.415}"}</M></p>
          
          <p><strong>Partie 2 - E(X):</strong></p>
          <p>Posons u = x + m, donc x = u - m:</p>
          <M>{"E(X) = \\frac{1}{\\Gamma(p)} \\left[\\Gamma(p+1) - m\\Gamma(p)\\right] = \\boxed{p - m}"}</M>
        </div>
      ),
    },
    {
      id: 'ex6',
      title: 'Exercice 6 - Densité exponentielle',
      difficulty: 2,
      tags: ['Densité', 'Variance', 'Intégration'],
      hint: 'Utilisez l\'intégration par parties pour calculer E(X) et E(X²).',
      content: (
        <div>
          <p>Densité: <M>{"f(x) = ke^x"}</M> si 0 {'<'} x {'<'} ln 2, 0 sinon</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Déterminer k</li>
            <li>V(X)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Déterminer k:</strong></p>
          <M>{"\\int_0^{\\ln 2} ke^x dx = k[e^x]_0^{\\ln 2} = k(2 - 1) = 1"}</M>
          <p className="text-[var(--color-success)] font-semibold"><M>{"\\boxed{k = 1}"}</M></p>
          
          <p><strong>2. V(X):</strong></p>
          <p>Par parties:</p>
          <M>{"E(X) = [xe^x]_0^{\\ln 2} - [e^x]_0^{\\ln 2} = 2\\ln 2 - 1"}</M>
          <M>{"E(X^2) = 2(\\ln 2)^2 - 4\\ln 2 + 2"}</M>
          <M>{"V(X) = E(X^2) - [E(X)]^2 = 1 - 2(\\ln 2)^2 = \\boxed{0.039}"}</M>
        </div>
      ),
    },
    {
      id: 'ex7',
      title: 'Exercice 7 - Reconnaissance de loi Gamma',
      difficulty: 1,
      tags: ['Loi Gamma', 'Espérance'],
      content: (
        <div>
          <p>Densité: <M>{"f(x) = \\frac{k \\theta^p x^{p-1} e^{-\\theta x}}{\\Gamma(p)}"}</M> pour x ≥ 0</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Déterminer k</li>
            <li>E(X)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Déterminer k:</strong></p>
          <p>On reconnaît une loi Gamma Γ(p, θ). La densité standard est:</p>
          <M>{"f(x) = \\frac{\\theta^p}{\\Gamma(p)} x^{p-1} e^{-\\theta x}"}</M>
          <p className="text-[var(--color-success)] font-semibold"><M>{"\\boxed{k = 1}"}</M></p>
          
          <p><strong>2. E(X):</strong></p>
          <p>Pour une loi Γ(p, θ):</p>
          <p className="text-[var(--color-success)] font-semibold"><M>{"E(X) = \\boxed{\\frac{p}{\\theta}}"}</M></p>
        </div>
      ),
    },
  ],
};
