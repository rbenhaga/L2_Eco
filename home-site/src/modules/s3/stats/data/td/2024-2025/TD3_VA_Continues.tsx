import { Math as M } from '../../../../../../components';
import type { TDSheet } from '../types';

export const TD3_2425: TDSheet = {
  id: 'td3-2425',
  title: 'TD3 - Variables aléatoires continues à une dimension',
  chapter: 'CH3',
  year: '2024-2025',
  reminders: [
    { title: 'Condition de densité', formula: '\\int_{-\\infty}^{+\\infty} f(x)\\,dx = 1' },
    { title: 'Fonction de répartition', formula: 'F(x) = \\int_{-\\infty}^{x} f(t)\\,dt' },
    { title: 'Espérance', formula: 'E(X) = \\int x \\cdot f(x)\\,dx' },
    { title: 'Loi Gamma', formula: 'E(X) = \\frac{\\alpha}{\\beta}, \\quad V(X) = \\frac{\\alpha}{\\beta^2}' },
  ],
  exercises: [
    {
      id: 'ex1',
      title: 'Exercice 1 - Densité 1/(2√x)',
      difficulty: 2,
      tags: ['Densité', 'Fonction de répartition', 'Intégration'],
      content: (
        <div>
          <p>Densité: <M>{"f(x) = \\frac{1}{2\\sqrt{x}}"}</M> si 0 {'<'} x {'<'} 1, 0 sinon</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Vérifier que f est une densité</li>
            <li>Fonction de répartition F(x)</li>
            <li>E(X) et V(X)</li>
            <li>Médiane</li>
            <li>Moments d'ordre 3</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Vérification:</strong></p>
          <M>{"\\int_0^1 \\frac{1}{2\\sqrt{x}} dx = \\frac{1}{2} \\times 2[\\sqrt{x}]_0^1 = \\boxed{1} \\checkmark"}</M>
          
          <p><strong>2. Fonction de répartition:</strong></p>
          <M>{"F(x) = \\begin{cases} 0 & x \\leq 0 \\\\ \\sqrt{x} & 0 < x < 1 \\\\ 1 & x \\geq 1 \\end{cases}"}</M>
          
          <p><strong>3. E(X) et V(X):</strong></p>
          <M>{"E(X) = \\frac{1}{2} \\int_0^1 \\sqrt{x} dx = \\frac{1}{2} \\times \\frac{2}{3} = \\boxed{\\frac{1}{3}}"}</M>
          <M>{"E(X^2) = \\frac{1}{2} \\times \\frac{2}{5} = \\frac{1}{5}"}</M>
          <M>{"V(X) = \\frac{1}{5} - \\frac{1}{9} = \\boxed{\\frac{4}{45}}"}</M>
          
          <p><strong>4. Médiane:</strong></p>
          <M>{"F(Me) = 0.5 \\Rightarrow \\sqrt{Me} = 0.5 \\Rightarrow \\boxed{Me = 0.25}"}</M>
          
          <p><strong>5. Moments d'ordre 3:</strong></p>
          <M>{"m_3 = E(X^3) = \\frac{1}{2} \\times \\frac{2}{7} = \\boxed{\\frac{1}{7}}"}</M>
          <M>{"\\mu_3 = m_3 - 3m_2 E(X) + 2[E(X)]^3 = \\boxed{\\frac{16}{945}}"}</M>
        </div>
      ),
    },
    {
      id: 'ex2',
      title: 'Exercice 2 - Densité x√x',
      difficulty: 1,
      tags: ['Densité', 'Espérance', 'Intégration'],
      content: (
        <div>
          <p>Densité: <M>{"f(x) = \\frac{5}{2}x\\sqrt{x}"}</M> pour 0 ≤ x ≤ 1</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>E(X)</li>
            <li>P(-1 {'<'} X {'<'} 1/3)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. E(X):</strong></p>
          <M>{"E(X) = \\frac{5}{2} \\int_0^1 x^{5/2} dx = \\frac{5}{2} \\times \\frac{2}{7} = \\boxed{\\frac{5}{7}}"}</M>
          
          <p><strong>2. P(-1 {'<'} X {'<'} 1/3):</strong></p>
          <p>Comme X ∈ [0,1], on calcule P(0 ≤ X {'<'} 1/3):</p>
          <M>{"P\\left(0 \\leq X < \\frac{1}{3}\\right) = \\left[\\frac{1}{3}\\right]^{5/2} = \\frac{1}{9\\sqrt{3}} = \\boxed{\\frac{\\sqrt{3}}{27} \\approx 0.064}"}</M>
        </div>
      ),
    },
    {
      id: 'ex3',
      title: 'Exercice 3 - Densité k/(1-x)²',
      difficulty: 2,
      tags: ['Densité', 'Fonction de répartition', 'Intégration'],
      hint: 'Posez u = 1-x pour simplifier l\'intégrale.',
      content: (
        <div>
          <p>Densité: <M>{"f(x) = \\frac{k}{(1-x)^2}"}</M> si 2 ≤ x {'<'} 4, 0 sinon</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Déterminer k</li>
            <li>Fonction de répartition</li>
            <li>E(X)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Déterminer k:</strong></p>
          <M>{"\\int_2^4 \\frac{k}{(1-x)^2} dx = k\\left(1 - \\frac{1}{3}\\right) = \\frac{2k}{3} = 1"}</M>
          <p className="text-[var(--color-success)] font-semibold"><M>{"\\boxed{k = \\frac{3}{2}}"}</M></p>
          
          <p><strong>2. Fonction de répartition:</strong></p>
          <M>{"F(x) = \\begin{cases} 0 & x < 2 \\\\ \\frac{3(2-x)}{2(x-1)} & 2 \\leq x < 4 \\\\ 1 & x \\geq 4 \\end{cases}"}</M>
          
          <p><strong>3. E(X):</strong></p>
          <M>{"E(X) = \\frac{3}{2} \\int_2^4 \\frac{x}{(1-x)^2} dx = 1 + \\frac{3\\ln 3}{2} = \\boxed{2.648}"}</M>
        </div>
      ),
    },
    {
      id: 'ex4',
      title: 'Exercice 4 - Loi Gamma',
      difficulty: 1,
      tags: ['Loi Gamma', 'Espérance'],
      content: (
        <div>
          <p>Densité: <M>{"f(x) = \\frac{k \\cdot 2^p}{\\Gamma(p)} e^{-2x} x^{p-1}"}</M> pour x ≥ 0, p {'>'} 0</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Déterminer k</li>
            <li>E(X)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Déterminer k:</strong></p>
          <p>On reconnaît une loi Gamma Γ(p, 2).</p>
          <p className="text-[var(--color-success)] font-semibold"><M>{"\\boxed{k = 1}"}</M></p>
          
          <p><strong>2. E(X):</strong></p>
          <M>{"E(X) = \\frac{p}{\\theta} = \\boxed{\\frac{p}{2}}"}</M>
        </div>
      ),
    },
    {
      id: 'ex5',
      title: 'Exercice 5 - Loi Gamma Γ(4, θ)',
      difficulty: 1,
      tags: ['Loi Gamma', 'Espérance', 'Variance'],
      content: (
        <div>
          <p>Densité: <M>{"f(x) = \\frac{\\theta^4}{\\Gamma(4)} x^3 e^{-\\theta x}"}</M> pour x {'>'} 0</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Vérifier que f est une densité</li>
            <li>E(X)</li>
            <li>V(X)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Vérification:</strong></p>
          <M>{"\\int_0^{+\\infty} \\frac{\\theta^4}{\\Gamma(4)} x^3 e^{-\\theta x} dx = \\frac{\\theta^4}{\\Gamma(4)} \\times \\frac{\\Gamma(4)}{\\theta^4} = \\boxed{1} \\checkmark"}</M>
          
          <p><strong>2. E(X):</strong></p>
          <M>{"E(X) = \\frac{p}{\\theta} = \\boxed{\\frac{4}{\\theta}}"}</M>
          
          <p><strong>3. V(X):</strong></p>
          <M>{"V(X) = \\frac{p}{\\theta^2} = \\boxed{\\frac{4}{\\theta^2}}"}</M>
        </div>
      ),
    },
    {
      id: 'ex6',
      title: 'Exercice 6 (Partiel 2023) - Densité Gamma modifiée',
      difficulty: 2,
      tags: ['Loi Gamma', 'Espérance'],
      content: (
        <div>
          <p>Densité: <M>{"f(x) = \\frac{-c \\theta^3 x^2 e^{-2\\theta x}}{\\Gamma(3)}"}</M> pour x {'>'} 0</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Calculer c</li>
            <li>E(X)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Calculer c:</strong></p>
          <M>{"\\int_0^{+\\infty} x^2 e^{-2\\theta x} dx = \\frac{\\Gamma(3)}{(2\\theta)^3} = \\frac{2}{8\\theta^3}"}</M>
          <M>{"\\frac{-c \\theta^3}{\\Gamma(3)} \\times \\frac{2}{8\\theta^3} = 1 \\Rightarrow -c = 8"}</M>
          <p className="text-[var(--color-success)] font-semibold"><M>{"\\boxed{c = -8}"}</M></p>
          
          <p><strong>2. E(X):</strong></p>
          <p>C'est une loi Γ(3, 2θ):</p>
          <M>{"E(X) = \\frac{3}{2\\theta} = \\boxed{\\frac{3}{2\\theta}}"}</M>
        </div>
      ),
    },
    {
      id: 'ex7',
      title: 'Exercice 7 (Partiel 2023) - Densité c/x²',
      difficulty: 2,
      tags: ['Densité', 'Intégration'],
      hint: 'Attention aux intégrales impropres ! Vérifiez la convergence en 0.',
      content: (
        <div>
          <p>Densité: <M>{"f(x) = \\frac{c}{x^2}"}</M> si -1 ≤ x ≤ 1, x ≠ 0</p>
          <p>Calculer c.</p>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>Calcul:</strong></p>
          <M>{"\\int_{-1}^{1} \\frac{c}{x^2} dx = c\\left[-\\frac{1}{x}\\right]_{-1}^{1}"}</M>
          <p className="text-[var(--color-error)] font-semibold">⚠️ Cette intégrale diverge en x = 0!</p>
          <M>{"\\int_{-1}^{0^-} \\frac{1}{x^2} dx = +\\infty"}</M>
          <p className="text-[var(--color-success)] font-semibold">Conclusion: f ne peut pas être une densité de probabilité (intégrale divergente).</p>
        </div>
      ),
    },
    {
      id: 'ex8',
      title: 'Exercice 8 (Partiel 2023) - Densité mixte',
      difficulty: 3,
      tags: ['Densité', 'Fonction de répartition', 'Intégration'],
      hint: 'Densité par morceaux → F(x) par morceaux aussi.',
      content: (
        <div>
          <p>Densité:</p>
          <M>{"f(x) = \\begin{cases} Kx & 0 \\leq x < 1 \\\\ \\frac{1}{x} & 1 \\leq x < 2 \\\\ 0 & \\text{ailleurs} \\end{cases}"}</M>
          <ol className="list-decimal ml-6 mt-2">
            <li>Déterminer K</li>
            <li>Fonction de répartition</li>
            <li>P(0.5 ≤ X ≤ 1.5)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Déterminer K:</strong></p>
          <M>{"\\int_0^1 Kx dx + \\int_1^2 \\frac{1}{x} dx = \\frac{K}{2} + \\ln 2 = 1"}</M>
          <M>{"K = 2(1 - \\ln 2) = \\boxed{2 - 2\\ln 2 \\approx 0.614}"}</M>
          
          <p><strong>2. Fonction de répartition:</strong></p>
          <M>{"F(x) = \\begin{cases} 0 & x < 0 \\\\ (1 - \\ln 2)x^2 & 0 \\leq x < 1 \\\\ 1 - \\ln 2 + \\ln x & 1 \\leq x < 2 \\\\ 1 & x \\geq 2 \\end{cases}"}</M>
          
          <p><strong>3. P(0.5 ≤ X ≤ 1.5):</strong></p>
          <M>{"P(0.5 \\leq X \\leq 1.5) = F(1.5) - F(0.5)"}</M>
          <M>{"= [1 - \\ln 2 + \\ln 1.5] - [(1 - \\ln 2)(0.25)]"}</M>
          <M>{"= 0.75(1 - \\ln 2) + \\ln 1.5 = \\boxed{0.635}"}</M>
        </div>
      ),
    },
  ],
};
