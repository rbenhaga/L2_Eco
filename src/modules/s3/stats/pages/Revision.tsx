import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Math, Callout } from '../../../../components';

interface Fiche {
  id: string;
  title: string;
  subtitle: string;
}

const fiches: Fiche[] = [
  { id: 'ch1', title: 'CH1 — Probabilités', subtitle: 'Algèbre de Boole, Bayes, conditionnement' },
  { id: 'ch2', title: 'CH2 — VA Discrètes', subtitle: 'Espérance, variance, fonction génératrice' },
  { id: 'ch3', title: 'CH3 — VA Continues', subtitle: 'Densité, répartition, Gamma, Beta' },
  { id: 'ch4', title: 'CH4 — Lois Usuelles', subtitle: 'Binomiale, Poisson, Hypergéométrique' },
  { id: 'ch5', title: 'CH5 — VA 2D', subtitle: 'Marginales, conditionnelles, covariance' },
  { id: 'methodes', title: 'Méthodes & Pièges', subtitle: 'Résumé des méthodes et erreurs à éviter' },
];

export function Revision() {
  const [selectedFiche, setSelectedFiche] = useState<string | null>(null);

  // Vue de sélection
  if (!selectedFiche) {
    return (
      <div className="max-w-2xl mx-auto pt-24 px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-semibold text-slate-900 mb-3">Fiches de Révision</h1>
          <p className="text-slate-600">Formulaires complets et méthodes par chapitre</p>
        </div>
        <div className="space-y-3">
          {fiches.map((fiche, idx) => (
            <button
              key={fiche.id}
              onClick={() => setSelectedFiche(fiche.id)}
              className="w-full p-5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-100/50 transition-all text-left group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-500 font-medium w-6">{String(idx + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="font-medium text-slate-900 group-hover:text-slate-800">{fiche.title}</h2>
                  <p className="text-sm text-slate-500">{fiche.subtitle}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Rendu de la fiche sélectionnée
  return (
    <div className="max-w-6xl pt-24 px-6">
      <button onClick={() => setSelectedFiche(null)} className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-8 text-sm">
        <ArrowLeft size={14} /> Retour aux fiches
      </button>
      
      {selectedFiche === 'ch1' && <FicheCH1 />}
      {selectedFiche === 'ch2' && <FicheCH2 />}
      {selectedFiche === 'ch3' && <FicheCH3 />}
      {selectedFiche === 'ch4' && <FicheCH4 />}
      {selectedFiche === 'ch5' && <FicheCH5 />}
      {selectedFiche === 'methodes' && <FicheMethodes />}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════
// FICHE CH1 - PROBABILITÉS
// ═══════════════════════════════════════════════════════════════════════════
function FicheCH1() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900 mb-2">CH1 — Probabilités & Algèbre de Boole</h1>
      <p className="text-slate-600 mb-8">Fondements du calcul des probabilités</p>

      <h2 className="text-lg font-semibold mb-4">Formulaire</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100/50">
              <th className="border border-slate-200 p-3 text-left font-medium">Nom</th>
              <th className="border border-slate-200 p-3 text-left font-medium">Formule</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-slate-200 p-3">Probabilité conditionnelle</td><td className="border border-slate-200 p-3"><Math>{"P(B|A) = \\frac{P(A \\cap B)}{P(A)}"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Complémentaire</td><td className="border border-slate-200 p-3"><Math>{"P(\\bar{A}) = 1 - P(A)"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Probabilités totales</td><td className="border border-slate-200 p-3"><Math>{"P(A \\cup B) = P(A) + P(B) - P(A \\cap B)"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Indépendance</td><td className="border border-slate-200 p-3"><Math>{"P(A \\cap B) = P(A) \\cdot P(B)"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Probabilités composées</td><td className="border border-slate-200 p-3"><Math>{"P(A \\cap B) = P(A) \\cdot P(B|A)"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Additivité (disjoints)</td><td className="border border-slate-200 p-3"><Math>{"P(\\bigcup A_i) = \\sum P(A_i)"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Formule de Bayes</td><td className="border border-slate-200 p-3"><Math>{"P(A_k|B) = \\frac{P(A_k) \\cdot P(B|A_k)}{\\sum_i P(A_i) \\cdot P(B|A_i)}"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Identité de Morgan</td><td className="border border-slate-200 p-3"><Math>{"\\overline{A \\cup B} = \\bar{A} \\cap \\bar{B}"}</Math></td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-lg font-semibold mb-4">Définitions clés</h2>
      <ul className="list-disc pl-6 space-y-2 text-sm mb-8">
        <li><strong>Algèbre de Boole :</strong> Famille stable par complémentation et union finie</li>
        <li><strong>Corps de Borel (σ-algèbre) :</strong> Stable par union infinie dénombrable</li>
        <li><strong>Espace probabilisé :</strong> <Math>{"(\\Omega, \\mathcal{F}, P)"}</Math></li>
        <li><strong>Indépendants :</strong> <Math>{"P(A \\cap B) = P(A) \\cdot P(B)"}</Math></li>
        <li><strong>Incompatibles (disjoints) :</strong> <Math>{"A \\cap B = \\emptyset"}</Math></li>
      </ul>

      <Callout type="warning" title="Démonstrations exigibles">
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-medium">1. P est croissante : Si A ⊂ B alors P(A) ≤ P(B)</p>
            <p className="text-slate-700">B = A ∪ (B ∩ Ā) disjoints → P(B) = P(A) + P(B ∩ Ā) ≥ P(A)</p>
          </div>
          <div>
            <p className="font-medium">2. Probabilités totales</p>
            <p className="text-slate-700">A ∪ B = A ∪ (B ∩ Ā) → P(A ∪ B) = P(A) + P(B) - P(A ∩ B)</p>
          </div>
        </div>
      </Callout>

      <h2 className="text-lg font-semibold mt-8 mb-4">Pièges à éviter</h2>
      <ul className="list-disc pl-6 space-y-1 text-sm">
        <li><strong>Incompatible ≠ Indépendant</strong></li>
        <li>Algèbre de Boole : nombre pair d'éléments</li>
        <li>Bayes : les A_i doivent former une partition</li>
      </ul>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════
// FICHE CH2 - VA DISCRÈTES
// ═══════════════════════════════════════════════════════════════════════════
function FicheCH2() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900 mb-2">CH2 — Variables Aléatoires Discrètes</h1>
      <p className="text-slate-600 mb-8">Espérance, variance, moments, fonction génératrice</p>

      <h2 className="text-lg font-semibold mb-4">Formulaire</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100/50">
              <th className="border border-slate-200 p-3 text-left font-medium">Nom</th>
              <th className="border border-slate-200 p-3 text-left font-medium">Formule</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-slate-200 p-3">Espérance</td><td className="border border-slate-200 p-3"><Math>{"E(X) = \\sum_i x_i p_i"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Variance</td><td className="border border-slate-200 p-3"><Math>{"V(X) = E(X^2) - [E(X)]^2"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Écart-type</td><td className="border border-slate-200 p-3"><Math>{"\\sigma = \\sqrt{V(X)}"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Linéarité E</td><td className="border border-slate-200 p-3"><Math>{"E(aX + b) = aE(X) + b"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Variance transformation</td><td className="border border-slate-200 p-3"><Math>{"V(aX + b) = a^2 V(X)"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Produit (indép.)</td><td className="border border-slate-200 p-3"><Math>{"E(XY) = E(X) \\cdot E(Y)"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Moment non-centré k</td><td className="border border-slate-200 p-3"><Math>{"m_k = E(X^k)"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Relation moments</td><td className="border border-slate-200 p-3"><Math>{"\\mu_2 = m_2 - m_1^2"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Fonction de répartition</td><td className="border border-slate-200 p-3"><Math>{"F(x) = P(X \\leq x)"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Proba intervalle</td><td className="border border-slate-200 p-3"><Math>{"P(a < X \\leq b) = F(b) - F(a)"}</Math></td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-lg font-semibold mb-4">Fonction génératrice</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100/50">
              <th className="border border-slate-200 p-3 text-left font-medium">Propriété</th>
              <th className="border border-slate-200 p-3 text-left font-medium">Formule</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-slate-200 p-3">Définition</td><td className="border border-slate-200 p-3"><Math>{"g_X(u) = E(u^X)"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Valeur en 1</td><td className="border border-slate-200 p-3"><Math>{"g_X(1) = 1"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Dérivée en 1</td><td className="border border-slate-200 p-3"><Math>{"g'_X(1) = E(X)"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Dérivée seconde en 1</td><td className="border border-slate-200 p-3"><Math>{"g''_X(1) = E(X(X-1))"}</Math></td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-lg font-semibold mb-4">Pièges à éviter</h2>
      <ul className="list-disc pl-6 space-y-1 text-sm">
        <li><strong>E(X²) ≠ [E(X)]²</strong> — Erreur la plus fréquente</li>
        <li><strong>g'(1)</strong> donne E(X), pas g'(0)</li>
        <li>V(aX + b) = a²V(X) — la constante b disparaît</li>
        <li>E(XY) = E(X)·E(Y) seulement si indépendantes</li>
      </ul>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════
// FICHE CH3 - VA CONTINUES
// ═══════════════════════════════════════════════════════════════════════════
function FicheCH3() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900 mb-2">CH3 — Variables Aléatoires Continues</h1>
      <p className="text-slate-600 mb-8">Densité, répartition, Gamma, Beta</p>

      <h2 className="text-lg font-semibold mb-4">Formulaire — Densité et répartition</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100/50">
              <th className="border border-slate-200 p-3 text-left font-medium">Nom</th>
              <th className="border border-slate-200 p-3 text-left font-medium">Formule</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-slate-200 p-3">Normalisation</td><td className="border border-slate-200 p-3"><Math>{"\\int_{-\\infty}^{+\\infty} f(x) dx = 1"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Répartition</td><td className="border border-slate-200 p-3"><Math>{"F(x) = \\int_{-\\infty}^{x} f(t) dt"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Densité = dérivée</td><td className="border border-slate-200 p-3"><Math>{"f(x) = F'(x)"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Proba ponctuelle</td><td className="border border-slate-200 p-3"><Math>{"P(X = a) = 0"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Proba intervalle</td><td className="border border-slate-200 p-3"><Math>{"P(a < X < b) = F(b) - F(a)"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Espérance</td><td className="border border-slate-200 p-3"><Math>{"E(X) = \\int x \\cdot f(x) dx"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Médiane</td><td className="border border-slate-200 p-3"><Math>{"F(x_m) = 0.5"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Quartiles</td><td className="border border-slate-200 p-3"><Math>{"F(Q_1) = 0.25, \\quad F(Q_3) = 0.75"}</Math></td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-lg font-semibold mb-4">Fonction Gamma Γ(a)</h2>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100/50">
              <th className="border border-slate-200 p-3 text-left font-medium">Propriété</th>
              <th className="border border-slate-200 p-3 text-left font-medium">Formule</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-slate-200 p-3">Définition</td><td className="border border-slate-200 p-3"><Math>{"\\Gamma(a) = \\int_0^{\\infty} t^{a-1} e^{-t} dt"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Récurrence</td><td className="border border-slate-200 p-3"><Math>{"\\Gamma(a) = (a-1) \\cdot \\Gamma(a-1)"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Entier</td><td className="border border-slate-200 p-3"><Math>{"\\Gamma(n) = (n-1)!"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Valeur spéciale</td><td className="border border-slate-200 p-3"><Math>{"\\Gamma(1/2) = \\sqrt{\\pi}"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Intégrale type</td><td className="border border-slate-200 p-3"><Math>{"\\int_0^{\\infty} e^{-\\theta x} x^{p-1} dx = \\frac{\\Gamma(p)}{\\theta^p}"}</Math></td></tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-slate-700 mb-8">Valeurs : Γ(1)=1, Γ(2)=1, Γ(3)=2, Γ(4)=6, Γ(5)=24, Γ(1/2)=√π</p>

      <h2 className="text-lg font-semibold mb-4">Fonction Beta B(p,q)</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <tbody>
            <tr><td className="border border-slate-200 p-3">Définition</td><td className="border border-slate-200 p-3"><Math>{"B(p,q) = \\int_0^1 t^{p-1}(1-t)^{q-1} dt"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Relation Gamma</td><td className="border border-slate-200 p-3"><Math>{"B(p,q) = \\frac{\\Gamma(p) \\cdot \\Gamma(q)}{\\Gamma(p+q)}"}</Math></td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-lg font-semibold mb-4">Pièges à éviter</h2>
      <ul className="list-disc pl-6 space-y-1 text-sm">
        <li><strong>Γ(n) = (n-1)!</strong> pas n!</li>
        <li>P(X = a) = 0 pour une VA continue</li>
        <li>Beta : identifier p-1 et q-1 dans l'intégrale</li>
      </ul>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════
// FICHE CH4 - LOIS USUELLES
// ═══════════════════════════════════════════════════════════════════════════
function FicheCH4() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900 mb-2">CH4 — Lois Usuelles</h1>
      <p className="text-slate-600 mb-8">Binomiale, Poisson, Hypergéométrique, Bienaymé-Tchebychev</p>

      <h2 className="text-lg font-semibold mb-4">Loi Binomiale B(n, p)</h2>
      <p className="text-sm text-slate-700 mb-2">n épreuves de Bernoulli indépendantes, probabilité de succès p</p>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <tbody>
            <tr><td className="border border-slate-200 p-3 w-1/3">Probabilité</td><td className="border border-slate-200 p-3"><Math>{"P(X = k) = C_n^k p^k (1-p)^{n-k}"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Espérance</td><td className="border border-slate-200 p-3"><Math>{"E(X) = np"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Variance</td><td className="border border-slate-200 p-3"><Math>{"V(X) = np(1-p)"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Fct génératrice</td><td className="border border-slate-200 p-3"><Math>{"g_X(u) = (pu + q)^n"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Mode</td><td className="border border-slate-200 p-3"><Math>{"\\lfloor (n+1)p \\rfloor"}</Math></td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-lg font-semibold mb-4">Loi de Poisson P(λ)</h2>
      <p className="text-sm text-slate-700 mb-2">Événements rares, en moyenne λ occurrences par période</p>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <tbody>
            <tr><td className="border border-slate-200 p-3 w-1/3">Probabilité</td><td className="border border-slate-200 p-3"><Math>{"P(X = k) = e^{-\\lambda} \\frac{\\lambda^k}{k!}"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Espérance</td><td className="border border-slate-200 p-3"><Math>{"E(X) = \\lambda"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Variance</td><td className="border border-slate-200 p-3"><Math>{"V(X) = \\lambda"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Fct génératrice</td><td className="border border-slate-200 p-3"><Math>{"g_X(u) = e^{\\lambda(u-1)}"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Mode</td><td className="border border-slate-200 p-3"><Math>{"\\lfloor \\lambda \\rfloor"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Additivité</td><td className="border border-slate-200 p-3">Période × r → λ' = rλ</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-lg font-semibold mb-4">Loi Hypergéométrique H(N, n, K)</h2>
      <p className="text-sm text-slate-700 mb-2">Tirage sans remise. N = population, K = marqués, n = échantillon</p>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <tbody>
            <tr><td className="border border-slate-200 p-3 w-1/3">Probabilité</td><td className="border border-slate-200 p-3"><Math>{"P(X = k) = \\frac{C_K^k \\cdot C_{N-K}^{n-k}}{C_N^n}"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Espérance</td><td className="border border-slate-200 p-3"><Math>{"E(X) = n \\cdot \\frac{K}{N}"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Variance</td><td className="border border-slate-200 p-3"><Math>{"V(X) = n \\cdot \\frac{K}{N} \\cdot \\frac{N-K}{N} \\cdot \\frac{N-n}{N-1}"}</Math></td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-lg font-semibold mb-4">Inégalités</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <tbody>
            <tr><td className="border border-slate-200 p-3 w-1/3">Markov (X ≥ 0)</td><td className="border border-slate-200 p-3"><Math>{"P(X \\geq t) \\leq \\frac{E(X)}{t}"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Bienaymé (majorant)</td><td className="border border-slate-200 p-3"><Math>{"P(|X - \\mu| \\geq \\varepsilon) \\leq \\frac{\\sigma^2}{\\varepsilon^2}"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Bienaymé (minorant)</td><td className="border border-slate-200 p-3"><Math>{"P(|X - \\mu| < \\varepsilon) \\geq 1 - \\frac{\\sigma^2}{\\varepsilon^2}"}</Math></td></tr>
          </tbody>
        </table>
      </div>

      <Callout type="warning" title="Démonstrations exigibles">
        <ul className="list-disc pl-4 space-y-1 text-sm">
          <li>E[X] Binomiale par définition</li>
          <li>E[X] Poisson par définition (tombé 2023-2024)</li>
          <li>V[X] Poisson par définition (tombé 2024-2025)</li>
          <li>Mode Poisson / Binomiale</li>
        </ul>
      </Callout>

      <h2 className="text-lg font-semibold mt-8 mb-4">Pièges à éviter</h2>
      <ul className="list-disc pl-6 space-y-1 text-sm">
        <li><strong>Poisson :</strong> λ change si la période change</li>
        <li><strong>Bienaymé :</strong> l'intervalle doit être centré sur μ</li>
        <li>P(X {"<"} k) ≠ P(X ≤ k)</li>
      </ul>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════
// FICHE CH5 - VA 2D
// ═══════════════════════════════════════════════════════════════════════════
function FicheCH5() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900 mb-2">CH5 — Variables Aléatoires à 2 Dimensions</h1>
      <p className="text-slate-600 mb-8">Marginales, conditionnelles, covariance, corrélation</p>

      <Callout type="warning" title="Chapitre le plus difficile">
        Combine intégrales doubles, domaines complexes et toutes les notions précédentes. Dessine toujours le domaine D !
      </Callout>

      <h2 className="text-lg font-semibold mt-8 mb-4">Formulaire — Densité et marginales</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <tbody>
            <tr><td className="border border-slate-200 p-3 w-1/3">Normalisation</td><td className="border border-slate-200 p-3"><Math>{"\\iint_D f(x,y) \\, dx \\, dy = 1"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Marginale de X</td><td className="border border-slate-200 p-3"><Math>{"f_X(x) = \\int f(x,y) \\, dy"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Marginale de Y</td><td className="border border-slate-200 p-3"><Math>{"f_Y(y) = \\int f(x,y) \\, dx"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Loi conditionnelle</td><td className="border border-slate-200 p-3"><Math>{"f_{Y|X=x}(y) = \\frac{f(x,y)}{f_X(x)}"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Espérance conditionnelle</td><td className="border border-slate-200 p-3"><Math>{"E(Y|X=x) = \\int y \\cdot f_{Y|X=x}(y) \\, dy"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Indépendance</td><td className="border border-slate-200 p-3"><Math>{"f(x,y) = f_X(x) \\cdot f_Y(y)"}</Math></td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-lg font-semibold mb-4">Formulaire — Covariance et corrélation</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <tbody>
            <tr><td className="border border-slate-200 p-3 w-1/3">Covariance</td><td className="border border-slate-200 p-3"><Math>{"Cov(X,Y) = E(XY) - E(X)E(Y)"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Corrélation</td><td className="border border-slate-200 p-3"><Math>{"r = \\frac{Cov(X,Y)}{\\sigma_X \\cdot \\sigma_Y}"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Cov(aX, bY)</td><td className="border border-slate-200 p-3"><Math>{"ab \\cdot Cov(X,Y)"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">V(X + Y)</td><td className="border border-slate-200 p-3"><Math>{"V(X) + V(Y) + 2Cov(X,Y)"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">V(X - Y)</td><td className="border border-slate-200 p-3"><Math>{"V(X) + V(Y) - 2Cov(X,Y)"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">V(aX + bY)</td><td className="border border-slate-200 p-3"><Math>{"a^2V(X) + b^2V(Y) + 2ab \\cdot Cov(X,Y)"}</Math></td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-lg font-semibold mb-4">Changement de variable</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <tbody>
            <tr><td className="border border-slate-200 p-3 w-1/3">Nouvelle densité</td><td className="border border-slate-200 p-3"><Math>{"f_{U,V}(u,v) = f_{X,Y}(x(u,v), y(u,v)) \\cdot |J|"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Jacobien</td><td className="border border-slate-200 p-3"><Math>{"|J| = \\left| \\det \\begin{pmatrix} \\frac{\\partial x}{\\partial u} & \\frac{\\partial x}{\\partial v} \\\\ \\frac{\\partial y}{\\partial u} & \\frac{\\partial y}{\\partial v} \\end{pmatrix} \\right|"}</Math></td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-lg font-semibold mb-4">Exemple résolu</h2>
      <div className="p-4 bg-slate-100/50 rounded-lg text-sm mb-8">
        <p className="mb-2"><strong>Énoncé :</strong> <Math>{"f(x,y) = kxy^2"}</Math> sur D = {"{"}0 ≤ y ≤ x, x ≤ 3{"}"}</p>
        <p className="mb-1"><strong>1. Trouver k :</strong> <Math>{"\\int_0^3 \\int_0^x kxy^2 \\, dy \\, dx = 1 \\Rightarrow k = 5/81"}</Math></p>
        <p className="mb-1"><strong>2. Marginale :</strong> <Math>{"f_X(x) = \\int_0^x \\frac{5}{81}xy^2 \\, dy = \\frac{5x^4}{243}"}</Math></p>
        <p className="mb-1"><strong>3. Conditionnelle :</strong> <Math>{"f_{Y|X=x}(y) = \\frac{f(x,y)}{f_X(x)} = \\frac{3y^2}{x^3}"}</Math></p>
        <p><strong>4. E(Y|X=x) :</strong> <Math>{"\\int_0^x y \\cdot \\frac{3y^2}{x^3} \\, dy = \\frac{3x}{4}"}</Math></p>
      </div>

      <h2 className="text-lg font-semibold mb-4">Pièges à éviter</h2>
      <ul className="list-disc pl-6 space-y-1 text-sm">
        <li><strong>Bornes :</strong> Si y ≤ x, intégrer y de 0 à x (pas une constante)</li>
        <li><strong>Loi conditionnelle :</strong> Diviser par f_X(x)</li>
        <li><strong>V(X - Y) :</strong> Attention au signe devant 2Cov</li>
        <li><strong>Cov = 0</strong> n'implique pas l'indépendance</li>
        <li><strong>E(XY) ≠ E(X)·E(Y)</strong> sauf si indépendantes</li>
      </ul>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════
// FICHE MÉTHODES & PIÈGES
// ═══════════════════════════════════════════════════════════════════════════
function FicheMethodes() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900 mb-2">Méthodes & Pièges à éviter</h1>
      <p className="text-slate-600 mb-8">Résumé des techniques et erreurs fréquentes au partiel</p>

      <h2 className="text-lg font-semibold mb-4">Méthodes de résolution</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100/50">
              <th className="border border-slate-200 p-3 text-left font-medium">Situation</th>
              <th className="border border-slate-200 p-3 text-left font-medium">Méthode</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-slate-200 p-3">Trouver k (normalisation)</td><td className="border border-slate-200 p-3">Résoudre <Math>{"\\int f(x)dx = 1"}</Math> ou <Math>{"\\sum p_i = 1"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Calculer E(X)</td><td className="border border-slate-200 p-3">Discret : <Math>{"\\sum x_i p_i"}</Math> | Continu : <Math>{"\\int x f(x) dx"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Calculer V(X)</td><td className="border border-slate-200 p-3">Toujours utiliser <Math>{"V(X) = E(X^2) - [E(X)]^2"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Identifier une loi</td><td className="border border-slate-200 p-3">Comparer E et V : Poisson si E = V, Binomiale si V {"<"} E</td></tr>
            <tr><td className="border border-slate-200 p-3">Intégrale avec Gamma</td><td className="border border-slate-200 p-3">Mettre sous forme <Math>{"\\int_0^\\infty t^{a-1}e^{-t}dt"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Intégrale avec Beta</td><td className="border border-slate-200 p-3">Identifier p-1 et q-1 dans <Math>{"t^{p-1}(1-t)^{q-1}"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Marginale 2D</td><td className="border border-slate-200 p-3">Intégrer sur l'autre variable, attention aux bornes</td></tr>
            <tr><td className="border border-slate-200 p-3">Loi conditionnelle</td><td className="border border-slate-200 p-3"><Math>{"f_{Y|X}(y) = f(x,y) / f_X(x)"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">Vérifier indépendance</td><td className="border border-slate-200 p-3">Tester si <Math>{"f(x,y) = f_X(x) \\cdot f_Y(y)"}</Math></td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-lg font-semibold mb-4">Démonstrations exigibles au partiel</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100/50">
              <th className="border border-slate-200 p-3 text-left font-medium">Démonstration</th>
              <th className="border border-slate-200 p-3 text-left font-medium">Idée clé</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-slate-200 p-3">P croissante</td><td className="border border-slate-200 p-3">B = A ∪ (B ∩ Ā) disjoints</td></tr>
            <tr><td className="border border-slate-200 p-3">Probabilités totales</td><td className="border border-slate-200 p-3">A ∪ B = A ∪ (B ∩ Ā)</td></tr>
            <tr><td className="border border-slate-200 p-3">E[X] Binomiale</td><td className="border border-slate-200 p-3">Définition + simplification <Math>{"C_n^k = \\frac{n}{k}C_{n-1}^{k-1}"}</Math></td></tr>
            <tr><td className="border border-slate-200 p-3">E[X] Poisson</td><td className="border border-slate-200 p-3">Définition + factoriser λ + reconnaître série</td></tr>
            <tr><td className="border border-slate-200 p-3">V[X] Poisson</td><td className="border border-slate-200 p-3">Calculer E[X(X-1)] puis V = E[X²] - E[X]²</td></tr>
            <tr><td className="border border-slate-200 p-3">Mode Poisson</td><td className="border border-slate-200 p-3">Étudier le rapport P(k+1)/P(k)</td></tr>
            <tr><td className="border border-slate-200 p-3">Mode Binomiale</td><td className="border border-slate-200 p-3">Étudier le rapport P(k+1)/P(k)</td></tr>
            <tr><td className="border border-slate-200 p-3">Γ(a) = (a-1)Γ(a-1)</td><td className="border border-slate-200 p-3">IPP avec u = t^(a-1), dv = e^(-t)dt</td></tr>
          </tbody>
        </table>
      </div>

      <Callout type="warning" title="Erreurs les plus fréquentes">
        <ul className="list-disc pl-4 space-y-1 text-sm">
          <li><strong>E(X²) ≠ [E(X)]²</strong> — L'erreur n°1 au partiel</li>
          <li><strong>Γ(n) = (n-1)!</strong> pas n!</li>
          <li><strong>Incompatible ≠ Indépendant</strong></li>
          <li><strong>Cov = 0</strong> n'implique pas l'indépendance</li>
          <li><strong>V(X - Y) = V(X) + V(Y) - 2Cov</strong> attention au signe</li>
          <li><strong>Poisson :</strong> λ change si la période change</li>
          <li><strong>Bienaymé :</strong> l'intervalle doit être centré sur μ</li>
        </ul>
      </Callout>

      <h2 className="text-lg font-semibold mt-8 mb-4">Valeurs à connaître par cœur</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100/50">
              <th className="border border-slate-200 p-3 text-left font-medium">Fonction</th>
              <th className="border border-slate-200 p-3 text-left font-medium">Valeurs</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-slate-200 p-3">Gamma</td><td className="border border-slate-200 p-3">Γ(1)=1, Γ(2)=1, Γ(3)=2, Γ(4)=6, Γ(5)=24, Γ(1/2)=√π</td></tr>
            <tr><td className="border border-slate-200 p-3">Factorielles</td><td className="border border-slate-200 p-3">0!=1, 1!=1, 2!=2, 3!=6, 4!=24, 5!=120</td></tr>
            <tr><td className="border border-slate-200 p-3">Combinaisons</td><td className="border border-slate-200 p-3"><Math>{"C_n^0 = C_n^n = 1"}</Math>, <Math>{"C_n^1 = n"}</Math>, <Math>{"C_n^k = C_n^{n-k}"}</Math></td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-lg font-semibold mb-4">Checklist avant de rendre</h2>
      <ul className="list-disc pl-6 space-y-1 text-sm">
        <li>Vérifier que les probabilités somment à 1</li>
        <li>Vérifier que V(X) ≥ 0</li>
        <li>Vérifier que -1 ≤ r ≤ 1 pour la corrélation</li>
        <li>Vérifier les bornes d'intégration (dessiner le domaine)</li>
        <li>Vérifier les unités si applicable</li>
      </ul>
    </div>
  );
}
