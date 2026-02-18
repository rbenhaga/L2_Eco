import { Math as M } from '../../../../../../components';
import type { TDSheet } from '../types';

export const TD4_2526: TDSheet = {
  id: 'td4-2526',
  title: 'TD4 - Les lois discrètes de probabilité',
  chapter: 'CH4',
  year: '2025-2026',
  reminders: [
    { title: 'Loi Binomiale B(n,p)', formula: 'E(X) = np, \\quad V(X) = npq' },
    { title: 'Loi Poisson P(λ)', formula: 'E(X) = V(X) = \\lambda' },
    { title: 'Loi Hypergéométrique H(N,K,n)', formula: 'E(X) = n\\frac{K}{N}, \\quad V(X) = n\\frac{K}{N}\\frac{N-K}{N}\\frac{N-n}{N-1}' },
    { title: 'Approximation Poisson', formula: 'B(n,p) \\approx P(np) \\text{ si } n \\geq 30, p \\leq 0.1' },
    { title: 'Bienaymé-Tchebychev', formula: 'P(|X - \\mu| \\leq k\\sigma) \\geq 1 - \\frac{1}{k^2}' },
    { title: 'Mode Binomiale', formula: '(n+1)p - 1 \\leq x_{Mo} \\leq (n+1)p' },
  ],
  exercises: [
    {
      id: 'ex1',
      title: 'Exercice 1 - Loi de Poisson (Marketing)',
      difficulty: 2,
      tags: ['Loi Poisson', 'Approximations'],
      hint: 'Utilisez la table de Poisson. Pour Bienaymé-Tchebychev, calculez k = écart/σ.',
      content: (
        <div>
          <p>3 clients/semaine en moyenne achètent un téléphone. X = clients sur 5 semaines.</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Variable X et loi</li>
            <li>P(X = 15)</li>
            <li>P(12 {'<'} X {'<'} 16)</li>
            <li>Trouver z tel que P(X ≥ z) = 12.48%</li>
            <li>Vérifier si P(X {'>'} 14) = 73.24%</li>
            <li>Borne inférieure de P(9 ≤ X ≤ 21) par Bienaymé-Tchebychev</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Loi:</strong> <M>{"X \\sim \\mathcal{P}(\\lambda = 15)"}</M></p>
          
          <p><strong>📊 Table Poisson (λ=15):</strong></p>
          <table className="border-collapse border border-[var(--color-border-strong)] text-xs">
            <thead><tr><th className="border border-[var(--color-border-strong)] p-1">k</th><th className="border border-[var(--color-border-strong)] p-1">9</th><th className="border border-[var(--color-border-strong)] p-1">13</th><th className="border border-[var(--color-border-strong)] p-1">14</th><th className="border border-[var(--color-border-strong)] p-1">15</th><th className="border border-[var(--color-border-strong)] p-1">19</th><th className="border border-[var(--color-border-strong)] p-1">21</th></tr></thead>
            <tbody>
              <tr><td className="border border-[var(--color-border-strong)] p-1">P(X=k)</td><td className="border border-[var(--color-border-strong)] p-1">0.0324</td><td className="border border-[var(--color-border-strong)] p-1">0.0956</td><td className="border border-[var(--color-border-strong)] p-1">0.1024</td><td className="border border-[var(--color-border-strong)] p-1">0.1024</td><td className="border border-[var(--color-border-strong)] p-1">0.0557</td><td className="border border-[var(--color-border-strong)] p-1">0.0299</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] p-1">P(X≤k)</td><td className="border border-[var(--color-border-strong)] p-1">0.0699</td><td className="border border-[var(--color-border-strong)] p-1">0.3632</td><td className="border border-[var(--color-border-strong)] p-1">0.4657</td><td className="border border-[var(--color-border-strong)] p-1">0.5681</td><td className="border border-[var(--color-border-strong)] p-1">0.8752</td><td className="border border-[var(--color-border-strong)] p-1">0.9469</td></tr>
            </tbody>
          </table>
          
          <p><strong>2. P(X = 15):</strong></p>
          <p className="text-[var(--color-success)] font-semibold"><M>{"P(X = 15) = \\boxed{0.1024}"}</M></p>
          
          <p><strong>3. P(12 {'<'} X {'<'} 16):</strong></p>
          <M>{"P(12 < X < 16) = P(X=13) + P(X=14) + P(X=15) = 0.0956 + 0.1024 + 0.1024 = \\boxed{0.3004}"}</M>
          
          <p><strong>4. Trouver z:</strong></p>
          <M>{"P(X \\geq z) = 0.1248 \\Rightarrow P(X \\leq z-1) = 0.8752"}</M>
          <p>📊 Table: P(X ≤ 19) = 0.8752 → <span className="text-[var(--color-success)] font-semibold"><M>{"\\boxed{z = 20}"}</M></span></p>
          
          <p><strong>5. Vérification P(X {'>'} 14):</strong></p>
          <M>{"P(X > 14) = 1 - P(X \\leq 14) = 1 - 0.4657 = 0.5343"}</M>
          <p className="text-[var(--color-error)] font-semibold">⚠️ Le résultat de 73.24% est INCORRECT. Vraie valeur: 53.43%</p>
          
          <p><strong>6. Bienaymé-Tchebychev:</strong></p>
          <M>{"\\mu = 15, \\sigma = \\sqrt{15}, k = 6/\\sqrt{15} \\approx 1.55"}</M>
          <M>{"P(9 \\leq X \\leq 21) \\geq 1 - \\frac{1}{1.55^2} = \\boxed{0.583}"}</M>
          <p className="text-[var(--color-text-secondary)]">Valeur exacte: 0.9469 - 0.0374 = 0.9095</p>
        </div>
      ),
    },
    {
      id: 'ex2',
      title: 'Exercice 2 - Loi Hypergéométrique',
      difficulty: 2,
      tags: ['Loi Binomiale'],
      hint: 'Tirage sans remise → Hypergéométrique. Utilisez les combinaisons.',
      content: (
        <div>
          <p>20 boules dont 7 noires. Tirage de 5 sans remise.</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Loi de X</li>
            <li>E(X), V(X), P(X=4)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Loi:</strong> <M>{"X \\sim \\mathcal{H}(20, 7, 5)"}</M></p>
          <M>{"P(X = k) = \\frac{C_7^k \\cdot C_{13}^{5-k}}{C_{20}^5}, \\quad C_{20}^5 = 15504"}</M>
          
          <table className="border-collapse border border-[var(--color-border-strong)] text-sm">
            <thead><tr><th className="border border-[var(--color-border-strong)] p-2">X</th><th className="border border-[var(--color-border-strong)] p-2">0</th><th className="border border-[var(--color-border-strong)] p-2">1</th><th className="border border-[var(--color-border-strong)] p-2">2</th><th className="border border-[var(--color-border-strong)] p-2">3</th><th className="border border-[var(--color-border-strong)] p-2">4</th><th className="border border-[var(--color-border-strong)] p-2">5</th></tr></thead>
            <tbody><tr><td className="border border-[var(--color-border-strong)] p-2">P(X=k)</td><td className="border border-[var(--color-border-strong)] p-2">0.0830</td><td className="border border-[var(--color-border-strong)] p-2">0.3228</td><td className="border border-[var(--color-border-strong)] p-2">0.3874</td><td className="border border-[var(--color-border-strong)] p-2">0.1761</td><td className="border border-[var(--color-border-strong)] p-2">0.0293</td><td className="border border-[var(--color-border-strong)] p-2">0.0014</td></tr></tbody>
          </table>
          
          <p><strong>2. E(X), V(X), P(X=4):</strong></p>
          <M>{"E(X) = n \\cdot \\frac{K}{N} = 5 \\times \\frac{7}{20} = \\boxed{1.75}"}</M>
          <M>{"V(X) = 5 \\times \\frac{7}{20} \\times \\frac{13}{20} \\times \\frac{15}{19} = \\boxed{0.898}"}</M>
          <M>{"P(X = 4) = \\boxed{0.0293}"}</M>
        </div>
      ),
    },
    {
      id: 'ex3',
      title: 'Exercice 3 - Loi Binomiale (Archer)',
      difficulty: 2,
      tags: ['Loi Binomiale'],
      hint: 'P(X ≥ 1) = 1 - P(X = 0). Résolvez l\'inéquation avec le logarithme.',
      content: (
        <div>
          <p>Archer avec p = 0.7 de toucher la cible.</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Loi de X</li>
            <li>Nombre de tirs pour P(X ≥ 1) ≥ 0.99</li>
            <li>Nombre de tirs pour P(X ≥ 2) ≥ 0.99</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Loi:</strong> <M>{"X \\sim \\mathcal{B}(n, 0.7)"}</M></p>
          
          <p><strong>2. Pour P(X ≥ 1) ≥ 0.99:</strong></p>
          <M>{"P(X \\geq 1) = 1 - (0.3)^n \\geq 0.99"}</M>
          <M>{"(0.3)^n \\leq 0.01 \\Rightarrow n \\geq \\frac{\\ln(0.01)}{\\ln(0.3)} = 3.82"}</M>
          <p className="text-[var(--color-success)] font-semibold"><M>{"\\boxed{n \\geq 4 \\text{ tirs}}"}</M></p>
          
          <p><strong>3. Pour P(X ≥ 2) ≥ 0.99:</strong></p>
          <M>{"P(X \\leq 1) = (0.3)^n + n(0.7)(0.3)^{n-1} \\leq 0.01"}</M>
          <table className="border-collapse border border-[var(--color-border-strong)] text-sm">
            <thead><tr><th className="border border-[var(--color-border-strong)] p-2">n</th><th className="border border-[var(--color-border-strong)] p-2">P(X≤1)</th></tr></thead>
            <tbody>
              <tr><td className="border border-[var(--color-border-strong)] p-2">5</td><td className="border border-[var(--color-border-strong)] p-2">0.0308</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] p-2">6</td><td className="border border-[var(--color-border-strong)] p-2">0.0109</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] p-2 font-semibold">7</td><td className="border border-[var(--color-border-strong)] p-2 text-[var(--color-success)] font-semibold">0.0038</td></tr>
            </tbody>
          </table>
          <p className="text-[var(--color-success)] font-semibold"><M>{"\\boxed{n \\geq 7 \\text{ tirs}}"}</M></p>
        </div>
      ),
    },
    {
      id: 'ex4',
      title: 'Exercice 4 - Anonymat des étudiants',
      difficulty: 3,
      tags: ['Loi Binomiale', 'Loi Poisson', 'Approximations'],
      hint: 'n=250 et p=0.02 → np=5, utilisez l\'approximation Poisson.',
      content: (
        <div>
          <p>2% acceptent de ne pas rester anonymes.</p>
          <p><strong>Partie 1:</strong> n = 20 étudiants</p>
          <p><strong>Partie 2:</strong> n = 250 étudiants (approximation Poisson)</p>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>Partie 1: n = 20, X ~ B(20, 0.02)</strong></p>
          <table className="border-collapse border border-[var(--color-border-strong)] text-xs">
            <thead><tr><th className="border border-[var(--color-border-strong)] p-1">k</th><th className="border border-[var(--color-border-strong)] p-1">0</th><th className="border border-[var(--color-border-strong)] p-1">1</th><th className="border border-[var(--color-border-strong)] p-1">2</th><th className="border border-[var(--color-border-strong)] p-1">3</th></tr></thead>
            <tbody>
              <tr><td className="border border-[var(--color-border-strong)] p-1">P(X≤k)</td><td className="border border-[var(--color-border-strong)] p-1">0.6676</td><td className="border border-[var(--color-border-strong)] p-1">0.9401</td><td className="border border-[var(--color-border-strong)] p-1">0.9929</td><td className="border border-[var(--color-border-strong)] p-1">0.9994</td></tr>
            </tbody>
          </table>
          <M>{"P(X \\leq 2) = \\boxed{0.9929}"}</M>
          <M>{"P(X \\leq 3) = P(\\text{au moins 17 anonymes}) = \\boxed{0.9994}"}</M>
          <p>Mode: <M>{"np - q < 0 \\Rightarrow \\boxed{x_{Mo} = 0}"}</M></p>
          <M>{"g_X(u) = (0.02u + 0.98)^{20}"}</M>
          
          <p><strong>Partie 2: n = 250, X ~ P(5)</strong></p>
          <table className="border-collapse border border-[var(--color-border-strong)] text-xs">
            <thead><tr><th className="border border-[var(--color-border-strong)] p-1">k</th><th className="border border-[var(--color-border-strong)] p-1">0</th><th className="border border-[var(--color-border-strong)] p-1">3</th><th className="border border-[var(--color-border-strong)] p-1">8</th><th className="border border-[var(--color-border-strong)] p-1">10</th></tr></thead>
            <tbody>
              <tr><td className="border border-[var(--color-border-strong)] p-1">P(X=k)</td><td className="border border-[var(--color-border-strong)] p-1">0.0067</td><td className="border border-[var(--color-border-strong)] p-1">0.1404</td><td className="border border-[var(--color-border-strong)] p-1">0.0653</td><td className="border border-[var(--color-border-strong)] p-1">0.0181</td></tr>
              <tr><td className="border border-[var(--color-border-strong)] p-1">P(X≤k)</td><td className="border border-[var(--color-border-strong)] p-1">0.0067</td><td className="border border-[var(--color-border-strong)] p-1">0.2650</td><td className="border border-[var(--color-border-strong)] p-1">0.9319</td><td className="border border-[var(--color-border-strong)] p-1">0.9863</td></tr>
            </tbody>
          </table>
          <M>{"P(X = 0) = \\boxed{0.0067}, \\quad P(X = 3) = \\boxed{0.1404}"}</M>
          <M>{"P(X \\leq 10) = \\boxed{0.9863}"}</M>
          <p>Bienaymé-Tchebychev [2,8]: k = 3/√5 ≈ 1.34 → <M>{"P \\geq \\boxed{0.444}"}</M></p>
        </div>
      ),
    },
    {
      id: 'ex5',
      title: 'Exercice 5 (Novembre 2024) - Commandes par annonce',
      difficulty: 2,
      tags: ['Loi Binomiale', 'Espérance', 'Variance'],
      content: (
        <div>
          <p>Loi de X (commandes par annonce):</p>
          <table className="border-collapse border border-[var(--color-border-strong)] text-sm">
            <thead><tr><th className="border border-[var(--color-border-strong)] p-2">Xi</th><th className="border border-[var(--color-border-strong)] p-2">0</th><th className="border border-[var(--color-border-strong)] p-2">1</th><th className="border border-[var(--color-border-strong)] p-2">2</th><th className="border border-[var(--color-border-strong)] p-2">3</th></tr></thead>
            <tbody><tr><td className="border border-[var(--color-border-strong)] p-2">pi</td><td className="border border-[var(--color-border-strong)] p-2">0.2</td><td className="border border-[var(--color-border-strong)] p-2">0.55</td><td className="border border-[var(--color-border-strong)] p-2">0.15</td><td className="border border-[var(--color-border-strong)] p-2">0.1</td></tr></tbody>
          </table>
          <ol className="list-decimal ml-6 mt-2">
            <li>V(X)</li>
            <li>Y = commandes sur 30 annonces: E(Y), V(Y)</li>
            <li>Z = annonces sans commande sur 20: loi, E(Z), V(Z), Mode</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. V(X):</strong></p>
          <M>{"E(X) = 0 + 0.55 + 0.30 + 0.30 = 1.15"}</M>
          <M>{"E(X^2) = 0 + 0.55 + 0.60 + 0.90 = 2.05"}</M>
          <M>{"V(X) = 2.05 - 1.3225 = \\boxed{0.7275}"}</M>
          
          <p><strong>2. Y sur 30 annonces:</strong></p>
          <M>{"E(Y) = 30 \\times 1.15 = \\boxed{34.5}"}</M>
          <M>{"V(Y) = 30 \\times 0.7275 = \\boxed{21.825}"}</M>
          
          <p><strong>3. Z ~ B(20, 0.2):</strong></p>
          <table className="border-collapse border border-[var(--color-border-strong)] text-xs">
            <thead><tr><th className="border border-[var(--color-border-strong)] p-1">k</th><th className="border border-[var(--color-border-strong)] p-1">3</th><th className="border border-[var(--color-border-strong)] p-1">4</th><th className="border border-[var(--color-border-strong)] p-1">5</th></tr></thead>
            <tbody><tr><td className="border border-[var(--color-border-strong)] p-1">P(Z=k)</td><td className="border border-[var(--color-border-strong)] p-1">0.2054</td><td className="border border-[var(--color-border-strong)] p-1">0.2182</td><td className="border border-[var(--color-border-strong)] p-1">0.1746</td></tr></tbody>
          </table>
          <M>{"E(Z) = np = \\boxed{4}, \\quad V(Z) = npq = \\boxed{3.2}"}</M>
          <p>Mode: 3.2 ≤ x<sub>Mo</sub> ≤ 4.2 → <M>{"\\boxed{x_{Mo} = 4}"}</M></p>
          <M>{"g_Z(u) = (0.2u + 0.8)^{20}"}</M>
          <M>{"P(3 \\leq Z \\leq 5) = 0.2054 + 0.2182 + 0.1746 = \\boxed{0.5982}"}</M>
        </div>
      ),
    },
  ],
};
