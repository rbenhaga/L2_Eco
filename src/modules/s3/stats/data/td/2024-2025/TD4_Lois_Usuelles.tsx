import { Math as M } from '../../../../../../components';
import type { TDSheet } from '../types';

export const TD4_2425: TDSheet = {
  id: 'td4-2425',
  title: 'TD4 - Les lois discrètes de probabilité',
  chapter: 'CH4',
  year: '2024-2025',
  reminders: [
    { title: 'Loi Binomiale B(n,p)', formula: 'E(X) = np, \\quad V(X) = npq' },
    { title: 'Loi Poisson P(λ)', formula: 'E(X) = V(X) = \\lambda' },
    { title: 'Approximation Poisson', formula: 'B(n,p) \\approx P(np) \\text{ si } n \\geq 30, p \\leq 0.1' },
    { title: 'Bienaymé-Tchebychev', formula: 'P(|X - \\mu| \\leq k\\sigma) \\geq 1 - \\frac{1}{k^2}' },
  ],
  exercises: [
    {
      id: 'ex1',
      title: 'Exercice 1 - Loi Binomiale (Tir à la cible)',
      difficulty: 2,
      tags: ['Loi Binomiale'],
      hint: 'P(X ≥ 1) = 1 - P(X = 0) = 1 - (1-p)ⁿ',
      content: (
        <div>
          <p>Probabilité d'atteindre la cible = p = 0.4</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>P(atteindre au moins 4 fois sur 10 tirs)</li>
            <li>Nombre de tirs n pour P(X ≥ 1) {'>'} 0.9</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. X ~ B(10, 0.4)</strong></p>
          <p>📊 Table Binomiale (n=10, p=0.4):</p>
          <table className="border-collapse border border-slate-300 text-xs">
            <thead><tr><th className="border border-slate-300 p-1">k</th><th className="border border-slate-300 p-1">0</th><th className="border border-slate-300 p-1">1</th><th className="border border-slate-300 p-1">2</th><th className="border border-slate-300 p-1">3</th></tr></thead>
            <tbody><tr><td className="border border-slate-300 p-1">P(X≤k)</td><td className="border border-slate-300 p-1">0.0060</td><td className="border border-slate-300 p-1">0.0464</td><td className="border border-slate-300 p-1">0.1673</td><td className="border border-slate-300 p-1">0.3823</td></tr></tbody>
          </table>
          <M>{"P(X \\geq 4) = 1 - P(X \\leq 3) = 1 - 0.3823 = \\boxed{0.6177}"}</M>
          
          <p><strong>2. Nombre de tirs:</strong></p>
          <M>{"P(X \\geq 1) = 1 - (0.6)^n > 0.9"}</M>
          <M>{"(0.6)^n < 0.1 \\Rightarrow n > \\frac{\\ln(0.1)}{\\ln(0.6)} = 4.51"}</M>
          <p className="text-emerald-700 font-semibold"><M>{"\\boxed{n \\geq 5 \\text{ tirs}}"}</M></p>
        </div>
      ),
    },
    {
      id: 'ex2',
      title: 'Exercice 2 - Copies blanches (Poisson)',
      difficulty: 2,
      tags: ['Loi Poisson', 'Approximations'],
      content: (
        <div>
          <p>2% des étudiants rendent copie blanche. N = 800 étudiants.</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Loi de X</li>
            <li>E(X) et σ(X)</li>
            <li>Vérifier si P(X ≤ 16) = 36.75%</li>
            <li>Mode et médiane</li>
            <li>Borne inférieure de P(11 ≤ X ≤ 21)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>Loi:</strong> n = 800 {'>'} 50, p = 0.02 {'<'} 0.1 → X ~ P(16)</p>
          
          <p><strong>📊 Table Poisson (λ=16):</strong></p>
          <table className="border-collapse border border-slate-300 text-xs">
            <thead><tr><th className="border border-slate-300 p-1">k</th><th className="border border-slate-300 p-1">12</th><th className="border border-slate-300 p-1">14</th><th className="border border-slate-300 p-1">16</th><th className="border border-slate-300 p-1">18</th></tr></thead>
            <tbody><tr><td className="border border-slate-300 p-1">P(X≤k)</td><td className="border border-slate-300 p-1">0.1931</td><td className="border border-slate-300 p-1">0.3675</td><td className="border border-slate-300 p-1">0.5660</td><td className="border border-slate-300 p-1">0.7423</td></tr></tbody>
          </table>
          
          <M>{"E(X) = \\boxed{16}, \\quad \\sigma(X) = \\boxed{4}"}</M>
          
          <p><strong>Vérification P(X ≤ 16):</strong></p>
          <M>{"P(X \\leq 16) = 0.5660 \\neq 0.3675"}</M>
          <p className="text-red-600">⚠️ 36.75% correspond à P(X ≤ 14), pas P(X ≤ 16)!</p>
          
          <p><strong>Mode et médiane:</strong></p>
          <p>Mode: λ = 16 entier → <M>{"\\boxed{x_{Mo} = 15 \\text{ et } 16}"}</M></p>
          <p>Médiane: P(X ≤ 16) = 0.566 {'>'} 0.5 → <M>{"\\boxed{Me = 16}"}</M></p>
          
          <p><strong>Bienaymé-Tchebychev [11, 21]:</strong></p>
          <M>{"k = 5/4 = 1.25 \\Rightarrow P \\geq 1 - \\frac{1}{1.5625} = \\boxed{0.36}"}</M>
          <p className="text-slate-700">Valeur exacte: 0.9108 - 0.0774 = 0.8334</p>
        </div>
      ),
    },
    {
      id: 'ex3',
      title: 'Exercice 3 - Loi Hypergéométrique (Ampoules)',
      difficulty: 2,
      tags: ['Loi Binomiale'],
      hint: 'Tirage sans remise → Hypergéométrique H(N, K, n).',
      content: (
        <div>
          <p>15 ampoules dont 5 défectueuses, tirage de 3 sans remise.</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Loi de X</li>
            <li>P(au moins une défectueuse), P(les 3 défectueuses), P(exactement une)</li>
            <li>E(X)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Loi:</strong> X ~ H(15, 5, 3)</p>
          <M>{"P(X = k) = \\frac{C_5^k \\cdot C_{10}^{3-k}}{C_{15}^3}, \\quad C_{15}^3 = 455"}</M>
          
          <table className="border-collapse border border-slate-300 text-sm">
            <thead><tr><th className="border border-slate-300 p-2">X</th><th className="border border-slate-300 p-2">0</th><th className="border border-slate-300 p-2">1</th><th className="border border-slate-300 p-2">2</th><th className="border border-slate-300 p-2">3</th></tr></thead>
            <tbody><tr><td className="border border-slate-300 p-2">P(X=k)</td><td className="border border-slate-300 p-2">0.2637</td><td className="border border-slate-300 p-2">0.4945</td><td className="border border-slate-300 p-2">0.2198</td><td className="border border-slate-300 p-2">0.0220</td></tr></tbody>
          </table>
          
          <p><strong>2. Probabilités:</strong></p>
          <M>{"P(X \\geq 1) = 1 - 0.2637 = \\boxed{0.7363}"}</M>
          <M>{"P(X = 3) = \\boxed{0.0220}"}</M>
          <M>{"P(X = 1) = \\boxed{0.4945}"}</M>
          
          <p><strong>3. E(X):</strong></p>
          <M>{"E(X) = n \\times \\frac{K}{N} = 3 \\times \\frac{5}{15} = \\boxed{1}"}</M>
        </div>
      ),
    },
    {
      id: 'ex4',
      title: 'Exercice 4 - Commandes (Poisson)',
      difficulty: 2,
      tags: ['Loi Poisson'],
      content: (
        <div>
          <p>λ = 5 commandes/mois, X = commandes sur un trimestre.</p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Loi de X</li>
            <li>P(X {'>'} 14)</li>
            <li>P(X ≥ 8)</li>
            <li>Borne inférieure de P(11 {'<'} X {'<'} 19)</li>
            <li>Mode, g(u), φ(t)</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Loi:</strong> X ~ P(15)</p>
          
          <p><strong>📊 Table Poisson (λ=15):</strong></p>
          <table className="border-collapse border border-slate-300 text-xs">
            <thead><tr><th className="border border-slate-300 p-1">k</th><th className="border border-slate-300 p-1">7</th><th className="border border-slate-300 p-1">14</th><th className="border border-slate-300 p-1">18</th></tr></thead>
            <tbody><tr><td className="border border-slate-300 p-1">P(X≤k)</td><td className="border border-slate-300 p-1">0.0180</td><td className="border border-slate-300 p-1">0.4657</td><td className="border border-slate-300 p-1">0.8195</td></tr></tbody>
          </table>
          
          <p><strong>2. P(X {'>'} 14):</strong></p>
          <M>{"P(X > 14) = 1 - 0.4657 = \\boxed{0.5343}"}</M>
          
          <p><strong>3. P(X ≥ 8):</strong></p>
          <M>{"P(X \\geq 8) = 1 - P(X \\leq 7) = 1 - 0.0180 = \\boxed{0.9820}"}</M>
          
          <p><strong>4. Bienaymé-Tchebychev ]11, 19[:</strong></p>
          <M>{"k = 4/\\sqrt{15} \\approx 1.033 \\Rightarrow P \\geq \\boxed{0.063}"}</M>
          <p className="text-slate-700">Valeur exacte: 0.8195 - 0.1848 = 0.6347</p>
          
          <p><strong>5. Mode et fonctions:</strong></p>
          <p>Mode: <M>{"\\boxed{x_{Mo} = 14 \\text{ et } 15}"}</M></p>
          <M>{"g_X(u) = e^{15(u-1)}, \\quad \\varphi_X(t) = e^{15(e^{it}-1)}"}</M>
        </div>
      ),
    },
    {
      id: 'ex5',
      title: 'Exercice 5 - Produits de luxe',
      difficulty: 2,
      tags: ['Loi Binomiale', 'Loi Poisson', 'Approximations'],
      content: (
        <div>
          <p>9% des produits sont de luxe.</p>
          <p><strong>Partie 1:</strong> n = 20 clients (Binomiale)</p>
          <p><strong>Partie 2:</strong> n = 100 clients (Poisson)</p>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>Partie 1: X ~ B(20, 0.09)</strong></p>
          <table className="border-collapse border border-slate-300 text-xs">
            <thead><tr><th className="border border-slate-300 p-1">k</th><th className="border border-slate-300 p-1">0</th><th className="border border-slate-300 p-1">1</th><th className="border border-slate-300 p-1">3</th><th className="border border-slate-300 p-1">6</th></tr></thead>
            <tbody><tr><td className="border border-slate-300 p-1">P(X≤k)</td><td className="border border-slate-300 p-1">0.1516</td><td className="border border-slate-300 p-1">0.4514</td><td className="border border-slate-300 p-1">0.9004</td><td className="border border-slate-300 p-1">0.9984</td></tr></tbody>
          </table>
          <M>{"P(X \\geq 1) = 1 - 0.1516 = \\boxed{0.8484}"}</M>
          <M>{"P(X < 4) = P(X \\leq 3) = \\boxed{0.9004}"}</M>
          <M>{"P(3 < X < 7) = \\boxed{0.0980}"}</M>
          
          <p><strong>Partie 2: X ~ P(9)</strong></p>
          <table className="border-collapse border border-slate-300 text-xs">
            <thead><tr><th className="border border-slate-300 p-1">k</th><th className="border border-slate-300 p-1">1</th><th className="border border-slate-300 p-1">8</th><th className="border border-slate-300 p-1">9</th><th className="border border-slate-300 p-1">11</th></tr></thead>
            <tbody><tr><td className="border border-slate-300 p-1">P(X≤k)</td><td className="border border-slate-300 p-1">0.0012</td><td className="border border-slate-300 p-1">0.4557</td><td className="border border-slate-300 p-1">0.5874</td><td className="border border-slate-300 p-1">0.8030</td></tr></tbody>
          </table>
          <M>{"P(X < 2) = \\boxed{0.0012}"}</M>
          <M>{"E(X) = \\boxed{9}, \\quad \\sigma(X) = \\boxed{3}"}</M>
          <p>Mode: <M>{"\\boxed{x_{Mo} = 8 \\text{ et } 9}"}</M></p>
          <M>{"g_X(u) = e^{9(u-1)}"}</M>
        </div>
      ),
    },
    {
      id: 'ex6',
      title: 'Exercice 6 (Partiel 2023) - Fonction génératrice',
      difficulty: 3,
      tags: ['Loi Poisson'],
      hint: 'g(u) = e^{λ(u-1)} est la fonction génératrice de la loi de Poisson.',
      content: (
        <div>
          <p>Fonction génératrice: <M>{"g_X(u) = e^{10(u-1)}"}</M></p>
          <ol className="list-decimal ml-6 mt-2">
            <li>Loi de X</li>
            <li>E(X), V(X), Mode, φ(t)</li>
            <li>P(X ≥ 5)</li>
            <li>Trouver K tel que P(K {'<'} X {'<'} 5) = 0.0288</li>
            <li>Trouver a et b si borne inférieure = 0.38</li>
          </ol>
        </div>
      ),
      solution: (
        <div className="space-y-3">
          <p><strong>1. Loi:</strong> <M>{"X \\sim \\mathcal{P}(10)"}</M></p>
          
          <p><strong>2. Caractéristiques:</strong></p>
          <M>{"E(X) = V(X) = \\boxed{10}"}</M>
          <p>Mode: <M>{"\\boxed{x_{Mo} = 9 \\text{ et } 10}"}</M></p>
          <M>{"\\varphi_X(t) = e^{10(e^{it}-1)}"}</M>
          
          <p><strong>📊 Table Poisson (λ=10):</strong></p>
          <table className="border-collapse border border-slate-300 text-xs">
            <thead><tr><th className="border border-slate-300 p-1">k</th><th className="border border-slate-300 p-1">1</th><th className="border border-slate-300 p-1">4</th><th className="border border-slate-300 p-1">14</th></tr></thead>
            <tbody><tr><td className="border border-slate-300 p-1">P(X≤k)</td><td className="border border-slate-300 p-1">0.0005</td><td className="border border-slate-300 p-1">0.0293</td><td className="border border-slate-300 p-1">0.9165</td></tr></tbody>
          </table>
          
          <p><strong>3. P(X ≥ 5):</strong></p>
          <M>{"P(X \\geq 5) = 1 - 0.0293 = \\boxed{0.9707}"}</M>
          
          <p><strong>4. Trouver K:</strong></p>
          <M>{"P(K < X < 5) = P(X \\leq 4) - P(X \\leq K) = 0.0288"}</M>
          <M>{"P(X \\leq K) = 0.0293 - 0.0288 = 0.0005"}</M>
          <p>Table: P(X ≤ 1) = 0.0005 → <M>{"\\boxed{K = 1}"}</M></p>
          
          <p><strong>5. Trouver a et b:</strong></p>
          <M>{"1 - \\frac{1}{k^2} = 0.38 \\Rightarrow k = 1.27"}</M>
          <M>{"k\\sigma = 1.27 \\times \\sqrt{10} \\approx 4"}</M>
          <p className="text-emerald-700 font-semibold"><M>{"\\boxed{a = 6, \\quad b = 14}"}</M></p>
        </div>
      ),
    },
  ],
};
