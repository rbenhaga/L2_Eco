import { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle, Calculator, FileText } from 'lucide-react';
import { Math as MathDisplay } from '../../../../components';

function M({ children }: { children: string }) {
  return <MathDisplay>{children}</MathDisplay>;
}

interface ExerciseProps {
  title: string;
  points: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Exercise({ title, points, children, defaultOpen = false }: ExerciseProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-200 rounded-xl mb-4 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-slate-100/50 hover:bg-slate-100/80 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          {open ? <ChevronDown className="w-5 h-5 text-slate-600" /> : <ChevronRight className="w-5 h-5 text-slate-600" />}
          <span className="font-semibold text-slate-900">{title}</span>
        </div>
        <span className="text-sm text-slate-600 bg-white px-2 py-1 rounded">{points} pts</span>
      </button>
      {open && <div className="p-5 bg-white">{children}</div>}
    </div>
  );
}

function Question({ num, question, children }: { num: string; question: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-start gap-3 mb-3">
        <span className="shrink-0 w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
          {num}
        </span>
        <div className="text-slate-900 font-medium pt-0.5">{question}</div>
      </div>
      <div className="ml-10 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div className="text-slate-800 space-y-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

function Formula({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center overflow-x-auto">
      {children}
    </div>
  );
}

export function CorrectionAnnales() {
  const [activeYear, setActiveYear] = useState<'2024' | '2023'>('2024');

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-sm text-slate-600 mb-3">
          <FileText className="w-4 h-4" />
          <span>Correction détaillée</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Annales Corrigées</h1>
        <p className="text-slate-700 max-w-2xl mx-auto">
          Corrections complètes et rigoureuses des examens 2023-2024 et 2024-2025 avec toutes les étapes de calcul.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 p-1 bg-slate-100/80 rounded-lg w-fit mx-auto">
        <button
          onClick={() => setActiveYear('2024')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeYear === '2024' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          2024-2025
        </button>
        <button
          onClick={() => setActiveYear('2023')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeYear === '2023' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          2023-2024
        </button>
      </div>

      {/* Contenu 2024-2025 */}
      {activeYear === '2024' && (
        <div>
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl mb-6">
            <h2 className="text-2xl font-bold mb-2">Examen 2024-2025</h2>
            <p className="text-blue-100">Session 1 · Durée 2h · 20 points</p>
          </div>

          <Exercise title="Exercice I - QCM Théorique" points={3} defaultOpen={true}>
            <Question num="1" question="Une variable aléatoire est :">
              <p><strong>Réponse : b) une application</strong></p>
              <p className="text-sm mt-2">
                Une VA est une <strong>application</strong> qui à chaque élément e de l'univers Ω fait correspondre un réel :
              </p>
              <Formula><M>{"X: e \\in \\Omega \\to X(e) \\in \\mathbb{R}"}</M></Formula>
              <p className="text-sm text-slate-700">⚠️ Ce n'est pas une "valeur numérique" (c'est l'image qui est numérique)</p>
            </Question>

            <Question num="2" question={<>Soit <M>{"f(x) = \\frac{3}{x^4}"}</M> pour x &gt; 1. Densité linéaire moyenne sur [2,4] :</>}>
              <p><strong>Réponse : c) 0,05</strong></p>
              <p className="text-sm mt-2">Formule de la densité linéaire moyenne :</p>
              <Formula><M>{"\\Delta_{[a,b]} = \\frac{F(b) - F(a)}{b - a} = \\frac{P(a < X < b)}{b - a}"}</M></Formula>
              <p className="text-sm">Calcul de P(2 &lt; X &lt; 4) :</p>
              <Formula><M>{"P(2 < X < 4) = \\int_2^4 \\frac{3}{x^4} dx = \\left[-\\frac{1}{x^3}\\right]_2^4 = -\\frac{1}{64} + \\frac{1}{8} = \\frac{7}{64}"}</M></Formula>
              <Formula><M>{"\\Delta_{[2,4]} = \\frac{7/64}{2} = \\frac{7}{128} \\approx 0.0547 \\approx 0.05"}</M></Formula>
            </Question>

            <Question num="3" question={<>Calculer <M>{"\\int_0^1 x^2(1-x)^3 dx"}</M> :</>}>
              <p><strong>Réponse : d) autre (≈ 0.017)</strong></p>
              <p className="text-sm mt-2">Utilisation de la fonction Beta :</p>
              <Formula><M>{"B(p,q) = \\int_0^1 t^{p-1}(1-t)^{q-1} dt = \\frac{\\Gamma(p)\\Gamma(q)}{\\Gamma(p+q)}"}</M></Formula>
              <p className="text-sm">Ici : p-1 = 2 ⟹ p = 3 et q-1 = 3 ⟹ q = 4</p>
              <Formula><M>{"B(3,4) = \\frac{\\Gamma(3)\\Gamma(4)}{\\Gamma(7)} = \\frac{2! \\times 3!}{6!} = \\frac{12}{720} = \\frac{1}{60} \\approx 0.017"}</M></Formula>
            </Question>

            <Question num="4" question="La somme de 2 lois de Bernoulli est une loi Binomiale :">
              <p><strong>Réponse : non</strong></p>
              <p className="text-sm mt-2">
                ⚠️ <strong>Piège !</strong> L'énoncé ne précise pas que les VA sont :
              </p>
              <ul className="text-sm list-disc ml-4 mt-1">
                <li>De même paramètre p</li>
                <li>Indépendantes</li>
              </ul>
              <p className="text-sm mt-2">Sans ces conditions, la réponse est <strong>NON</strong>.</p>
            </Question>

            <Question num="5" question="Si on connaît les densités de X et Y, peut-on déterminer celle de X+Y ?">
              <p><strong>Réponse : non</strong></p>
              <p className="text-sm mt-2">
                Pour déterminer la loi de X+Y, il faut connaître la <strong>loi conjointe</strong> f(x,y), pas seulement les marginales.
              </p>
              <p className="text-sm mt-2">Exception : si X et Y sont <strong>indépendantes</strong>, on peut utiliser le produit de convolution.</p>
            </Question>

            <Question num="6" question="Si deux VA ont la même espérance, ont-elles la même variance ?">
              <p><strong>Réponse : non</strong></p>
              <p className="text-sm mt-2">Contre-exemple :</p>
              <ul className="text-sm list-disc ml-4">
                <li>X ~ Uniforme[0,2] : E[X] = 1, V[X] = 1/3</li>
                <li>Y = 1 (constante) : E[Y] = 1, V[Y] = 0</li>
              </ul>
            </Question>
          </Exercise>

          <Exercise title="Exercice II - Algèbre de Boole" points={2}>
            <div className="p-3 bg-slate-100/50 rounded-lg mb-4 text-sm">
              <strong>Énoncé :</strong> Ω = {'{a, b, c, d, e}'}. Construire la plus petite algèbre de Boole contenant (a), (c,d), (a,b,c) et (c).
            </div>
            <Question num="1" question="Cardinal de F :">
              <p><strong>Réponse : 32 éléments</strong></p>
              <p className="text-sm mt-2">En construisant pas à pas :</p>
              <ol className="text-sm list-decimal ml-4 space-y-1">
                <li>(c) est inclus dans (c,d) et (a,b,c)</li>
                <li>Complémentaires : <M>{"\\overline{(a)} = (b,c,d,e)"}</M>, <M>{"\\overline{(c,d)} = (a,b,e)"}</M>, etc.</li>
                <li>Intersections : <M>{"(c,d) \\cap \\overline{(c)} = (d)"}</M> → on isole (d)</li>
                <li>On peut isoler chaque élément → F = 𝒫(Ω) = 2⁵ = <strong>32</strong></li>
              </ol>
            </Question>
          </Exercise>

          <Exercise title="Exercice III - Probabilités Conditionnelles (Urbanisme)" points={2}>
            <div className="p-3 bg-slate-100/50 rounded-lg mb-4 text-sm overflow-x-auto">
              <table className="w-full text-center">
                <thead>
                  <tr className="border-b">
                    <th className="p-2">Arr.</th>
                    <th className="p-2">1</th>
                    <th className="p-2">2</th>
                    <th className="p-2">3</th>
                    <th className="p-2">4</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-2">Population</td><td>15%</td><td>32%</td><td>23%</td><td>30%</td></tr>
                  <tr><td className="p-2">Favorables</td><td>12%</td><td>31%</td><td>72%</td><td>55%</td></tr>
                </tbody>
              </table>
            </div>
            <Question num="1" question={<>P(Arrondissement 3 | Favorable) = ?</>}>
              <p><strong>Réponse : 0,37</strong></p>
              <p className="text-sm mt-2">Formule de Bayes :</p>
              <Formula><M>{"P(A_3|F) = \\frac{P(F|A_3) \\times P(A_3)}{P(F)}"}</M></Formula>
              <p className="text-sm">Calcul de P(F) (probabilité totale) :</p>
              <Formula><M>{"P(F) = \\sum_{i=1}^{4} P(F|A_i) \\times P(A_i) = 0.12 \\times 0.15 + 0.31 \\times 0.32 + 0.72 \\times 0.23 + 0.55 \\times 0.30"}</M></Formula>
              <Formula><M>{"= 0.018 + 0.0992 + 0.1656 + 0.165 = 0.4478"}</M></Formula>
              <Formula><M>{"P(A_3|F) = \\frac{0.72 \\times 0.23}{0.4478} = \\frac{0.1656}{0.4478} \\approx 0.37"}</M></Formula>
            </Question>
          </Exercise>

          <Exercise title="Exercice IV - VA Discrète 2D (Billetterie)" points={6}>
            <div className="p-3 bg-slate-100/50 rounded-lg mb-4 text-sm">
              <strong>Contexte :</strong> 4 caisses, 2 clients consécutifs. X = nb clients caisse 1, Y = nb clients caisse 2.
            </div>

            <Question num="1" question="Loi de X et son mode :">
              <p><strong>Mode = 0</strong></p>
              <p className="text-sm mt-2">X suit une loi <strong>Binomiale B(2, 1/4)</strong> :</p>
              <ul className="text-sm list-disc ml-4">
                <li>P(X=0) = (3/4)² = 9/16 = 0.5625 ← <strong>Maximum</strong></li>
                <li>P(X=1) = 2×(1/4)×(3/4) = 6/16 = 0.375</li>
                <li>P(X=2) = (1/4)² = 1/16 = 0.0625</li>
              </ul>
            </Question>

            <Question num="2" question="E[X] = ?">
              <p><strong>Réponse : 0,5</strong></p>
              <Formula><M>{"E[X] = np = 2 \\times \\frac{1}{4} = 0.5"}</M></Formula>
            </Question>

            <Question num="3" question="V[X] = ?">
              <p><strong>Réponse : 0,375</strong></p>
              <Formula><M>{"V[X] = np(1-p) = 2 \\times \\frac{1}{4} \\times \\frac{3}{4} = \\frac{6}{16} = 0.375"}</M></Formula>
            </Question>

            <Question num="6" question="V[Y] = ?">
              <p><strong>Réponse : 0,375</strong></p>
              <p className="text-sm">Par symétrie, Y ~ B(2, 1/4) comme X.</p>
            </Question>

            <Question num="7" question="F(1,2) = P(X ≤ 1, Y ≤ 2) = ?">
              <p><strong>Réponse : 0,9375</strong></p>
              <p className="text-sm mt-2">Comme Y ≤ 2 est toujours vrai :</p>
              <Formula><M>{"F(1,2) = P(X \\le 1) = P(X=0) + P(X=1) = \\frac{9}{16} + \\frac{6}{16} = \\frac{15}{16} = 0.9375"}</M></Formula>
            </Question>

            <Question num="8" question="E[X | Y=1] = ?">
              <p><strong>Réponse : 0,333</strong></p>
              <p className="text-sm mt-2">Probabilités conditionnelles :</p>
              <ul className="text-sm list-disc ml-4">
                <li><M>{"P(X=0|Y=1) = \\frac{4/16}{6/16} = \\frac{2}{3}"}</M></li>
                <li><M>{"P(X=1|Y=1) = \\frac{2/16}{6/16} = \\frac{1}{3}"}</M></li>
              </ul>
              <Formula><M>{"E[X|Y=1] = 0 \\times \\frac{2}{3} + 1 \\times \\frac{1}{3} = \\frac{1}{3} \\approx 0.333"}</M></Formula>
            </Question>

            <Question num="9" question="Coefficient de corrélation ρ(X,Y) = ?">
              <p><strong>Réponse : -0,333</strong></p>
              <p className="text-sm mt-2">Calcul de E[XY] :</p>
              <Formula><M>{"E[XY] = 1 \\times 1 \\times \\frac{2}{16} = \\frac{1}{8}"}</M></Formula>
              <p className="text-sm">Calcul de Cov(X,Y) :</p>
              <Formula><M>{"Cov(X,Y) = E[XY] - E[X]E[Y] = \\frac{1}{8} - \\frac{1}{2} \\times \\frac{1}{2} = -\\frac{1}{8}"}</M></Formula>
              <Formula><M>{"\\rho_{XY} = \\frac{-1/8}{\\sqrt{3/8} \\times \\sqrt{3/8}} = \\frac{-1/8}{3/8} = -\\frac{1}{3} \\approx -0.333"}</M></Formula>
              <p className="text-sm text-slate-700">⚠️ Corrélation négative : si X↑ alors Y↓ (logique !)</p>
            </Question>

            <Question num="10" question="Borne sup de P(Y ≥ 1) par Markov :">
              <p><strong>Réponse : 0,5</strong></p>
              <p className="text-sm mt-2">Inégalité de Markov (pour Y ≥ 0) :</p>
              <Formula><M>{"P(Y \\ge t) \\le \\frac{E[Y]}{t}"}</M></Formula>
              <Formula><M>{"P(Y \\ge 1) \\le \\frac{E[Y]}{1} = 0.5"}</M></Formula>
            </Question>
          </Exercise>

          <Exercise title="Exercice V - VA Continue 2D" points={6}>
            <div className="p-3 bg-slate-100/50 rounded-lg mb-4 text-sm">
              <strong>Énoncé :</strong> <M>{"f(x,y) = k(x+y)"}</M> sur D : y &lt; x &lt; y+1, 0 &lt; y &lt; 1
            </div>

            <Question num="1" question="Déterminer k :">
              <p><strong>Réponse : k = 2/3</strong></p>
              <p className="text-sm mt-2">Condition de normalisation :</p>
              <Formula><M>{"\\int_0^1 \\int_y^{y+1} k(x+y) \\, dx \\, dy = 1"}</M></Formula>
              <p className="text-sm">Intégrale intérieure :</p>
              <Formula><M>{"\\int_y^{y+1} (x+y) dx = \\left[\\frac{x^2}{2} + xy\\right]_y^{y+1} = 2y + \\frac{1}{2}"}</M></Formula>
              <p className="text-sm">Intégrale extérieure :</p>
              <Formula><M>{"k \\int_0^1 \\left(2y + \\frac{1}{2}\\right) dy = k \\times \\frac{3}{2} = 1 \\Rightarrow k = \\frac{2}{3}"}</M></Formula>
            </Question>

            <Question num="5" question={<>Densité conditionnelle <M>{"f_{X|Y=1/2}(x)"}</M> :</>}>
              <p><strong>Réponse : (2x+1)/3</strong></p>
              <Formula><M>{"f_{X|Y}(x|y) = \\frac{f(x,y)}{f_Y(y)}"}</M></Formula>
              <p className="text-sm">Pour y = 1/2, x varie de 1/2 à 3/2 :</p>
              <Formula><M>{"f_{X|Y=1/2}(x) = \\frac{2x + 1}{3}"}</M></Formula>
            </Question>

            <Question num="6" question="E[X | Y = 1/2] = ?">
              <p><strong>Réponse : ≈ 1,067</strong></p>
              <Formula><M>{"E[X|Y=1/2] = \\int_{1/2}^{3/2} x \\cdot \\frac{2x+1}{3} dx = \\frac{19}{18} \\approx 1.056"}</M></Formula>
            </Question>
          </Exercise>

          <Exercise title="Exercice VI - Démonstrations" points={3}>
            <Question num="1" question="Identifier la loi si μ[k] = 3^k :">
              <p><strong>X suit une loi de Poisson P(3)</strong></p>
              <p className="text-sm mt-2">Reconstruction de G_X(u) :</p>
              <Formula><M>{"G_X(u) = \\sum_{k=0}^{\\infty} \\frac{(u-1)^k}{k!} \\mu_{[k]} = \\sum_{k=0}^{\\infty} \\frac{(3(u-1))^k}{k!} = e^{3(u-1)}"}</M></Formula>
              <p className="text-sm">C'est la fonction génératrice de Poisson(λ) avec λ = 3.</p>
            </Question>

            <Question num="2" question="Variance via fonction caractéristique :">
              <p><strong>Formule :</strong></p>
              <Formula><M>{"V(X) = -\\varphi''_X(0) - [\\varphi'_X(0)]^2"}</M></Formula>
              <p className="text-sm mt-2">Car :</p>
              <ul className="text-sm list-disc ml-4">
                <li><M>{"\\varphi'_X(0) = i E[X] = i m_1"}</M></li>
                <li><M>{"\\varphi''_X(0) = -E[X^2] = -m_2"}</M></li>
                <li><M>{"V(X) = m_2 - m_1^2 = -\\varphi''_X(0) - (\\varphi'_X(0)/i)^2"}</M></li>
              </ul>
            </Question>
          </Exercise>
        </div>
      )}


      {/* Contenu 2023-2024 */}
      {activeYear === '2023' && (
        <div>
          <div className="bg-linear-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-xl mb-6">
            <h2 className="text-2xl font-bold mb-2">Examen 2023-2024</h2>
            <p className="text-emerald-100">Session 1 · Durée 2h · 20 points</p>
          </div>

          <Exercise title="Exercice I - Algèbre de Boole" points={2} defaultOpen={true}>
            <div className="p-3 bg-slate-100/50 rounded-lg mb-4 text-sm">
              <strong>Énoncé :</strong> Ω = {'{a, b, c, d, e, f}'}. Construire la plus petite algèbre de Boole contenant (a), (a,c), (b,d,e) et (f).
            </div>
            <Question num="1" question="Cardinal de F :">
              <p><strong>Réponse : 16 éléments</strong></p>
              <p className="text-sm mt-2">Construction pas à pas :</p>
              <ol className="text-sm list-decimal ml-4 space-y-1">
                <li>Éléments de départ : (a), (a,c), (b,d,e), (f)</li>
                <li>Complémentaires :
                  <ul className="list-disc ml-4">
                    <li><M>{"\\overline{(a)} = (b,c,d,e,f)"}</M></li>
                    <li><M>{"\\overline{(a,c)} = (b,d,e,f)"}</M></li>
                    <li><M>{"\\overline{(b,d,e)} = (a,c,f)"}</M></li>
                    <li><M>{"\\overline{(f)} = (a,b,c,d,e)"}</M></li>
                  </ul>
                </li>
                <li>Unions : (a)∪(f) = (a,f), (a)∪(b,d,e) = (a,b,d,e), etc.</li>
                <li>Complémentaires des nouveaux : <M>{"\\overline{(a,f)} = (b,c,d,e)"}</M>, etc.</li>
              </ol>
              <p className="text-sm mt-2">Résultat : F contient <strong>16 éléments</strong> (nombre pair ✓)</p>
            </Question>
          </Exercise>

          <Exercise title="Exercice II - VA Continue" points={3}>
            <div className="p-3 bg-slate-100/50 rounded-lg mb-4 text-sm">
              <strong>Énoncé :</strong> <M>{"f(x) = k e^{-(x-2)^2/2}"}</M> pour x &gt; 2, 0 ailleurs.
            </div>

            <Question num="1" question="Déterminer k :">
              <p><strong>Réponse : k = √(2/π)</strong></p>
              <p className="text-sm mt-2">Condition de normalisation :</p>
              <Formula><M>{"\\int_2^{+\\infty} k e^{-(x-2)^2/2} dx = 1"}</M></Formula>
              <p className="text-sm">Changement de variable u = x - 2 :</p>
              <Formula><M>{"k \\int_0^{+\\infty} e^{-u^2/2} du = 1"}</M></Formula>
              <p className="text-sm">Intégrale de Gauss : <M>{"\\int_0^{+\\infty} e^{-u^2/2} du = \\sqrt{\\frac{\\pi}{2}}"}</M></p>
              <Formula><M>{"k = \\sqrt{\\frac{2}{\\pi}} \\approx 0.798"}</M></Formula>
            </Question>

            <Question num="2" question="E[X] = ?">
              <p><strong>Réponse : ≈ 2.8</strong></p>
              <p className="text-sm mt-2">Avec u = x - 2 (donc x = u + 2) :</p>
              <Formula><M>{"E[X] = k \\int_0^{+\\infty} (u+2) e^{-u^2/2} du"}</M></Formula>
              <p className="text-sm">On utilise :</p>
              <ul className="text-sm list-disc ml-4">
                <li><M>{"\\int_0^{+\\infty} u e^{-u^2/2} du = 1"}</M></li>
                <li><M>{"\\int_0^{+\\infty} e^{-u^2/2} du = \\sqrt{\\pi/2}"}</M></li>
              </ul>
              <Formula><M>{"E[X] = k + 2 \\approx 2.8"}</M></Formula>
            </Question>
          </Exercise>

          <Exercise title="Exercice III - Covariance et Variance" points={3}>
            <div className="p-3 bg-slate-100/50 rounded-lg mb-4 text-sm">
              <strong>Données :</strong> E[X]=1, V[X]=2, E[Y]=2, V[Y]=3, E[Z]=1, V[Z]=5, Cov(X,Z)=1, Cov(X,Y)=1, Cov(Y,Z)=0
            </div>

            <Question num="1" question="E[2X + 3Y - 4Z] = ?">
              <p><strong>Réponse : 4</strong></p>
              <p className="text-sm mt-2">Linéarité de l'espérance :</p>
              <Formula><M>{"E[2X + 3Y - 4Z] = 2E[X] + 3E[Y] - 4E[Z]"}</M></Formula>
              <Formula><M>{"= 2(1) + 3(2) - 4(1) = 2 + 6 - 4 = 4"}</M></Formula>
            </Question>

            <Question num="2" question="V[2X + 3Y - 4Z] = ?">
              <p><strong>Réponse : 111</strong></p>
              <p className="text-sm mt-2">Formule générale :</p>
              <Formula><M>{"V[aX + bY + cZ] = a^2V[X] + b^2V[Y] + c^2V[Z] + 2ab\\text{Cov}(X,Y) + 2ac\\text{Cov}(X,Z) + 2bc\\text{Cov}(Y,Z)"}</M></Formula>
              <p className="text-sm">Application :</p>
              <Formula><M>{"V = 4(2) + 9(3) + 16(5) + 2(2)(3)(1) + 2(2)(-4)(1) + 2(3)(-4)(0)"}</M></Formula>
              <Formula><M>{"= 8 + 27 + 80 + 12 - 16 + 0 = 111"}</M></Formula>
            </Question>

            <Question num="3" question="Cov(4X + 5Y, Y) = ?">
              <p><strong>Réponse : 19</strong></p>
              <p className="text-sm mt-2">Propriété de la covariance :</p>
              <Formula><M>{"Cov(aX + bY, Y) = a \\cdot Cov(X,Y) + b \\cdot V[Y]"}</M></Formula>
              <Formula><M>{"Cov(4X + 5Y, Y) = 4 \\times 1 + 5 \\times 3 = 4 + 15 = 19"}</M></Formula>
            </Question>
          </Exercise>

          <Exercise title="Exercice IV - Loterie et Espérance" points={5}>
            <div className="p-3 bg-slate-100/50 rounded-lg mb-4 text-sm">
              <strong>Contexte :</strong> Roue à 8 secteurs : 2 bleus (gagne), 4 blancs (perd), 2 rouges (rejoue une fois).
            </div>

            <Question num="1" question="P(gagner) = ?">
              <p><strong>Réponse : 0.3125</strong></p>
              <p className="text-sm mt-2">Arbre de probabilité :</p>
              <div className="text-sm bg-white p-3 rounded border font-mono">
                Premier tirage:<br/>
                ├── Bleu (2/8 = 1/4) → GAGNE<br/>
                ├── Blanc (4/8 = 1/2) → PERD<br/>
                └── Rouge (2/8 = 1/4) → Deuxième tirage:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;├── Bleu (1/4) → GAGNE<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;└── Autre (3/4) → PERD
              </div>
              <Formula><M>{"P(\\text{Gagner}) = \\frac{1}{4} + \\frac{1}{4} \\times \\frac{1}{4} = \\frac{1}{4} + \\frac{1}{16} = \\frac{5}{16} = 0.3125"}</M></Formula>
            </Question>
          </Exercise>

          <Exercise title="Exercice V - VA 2D Continue" points={5}>
            <div className="p-3 bg-slate-100/50 rounded-lg mb-4 text-sm">
              <strong>Énoncé :</strong> <M>{"f(x,y) = kx \\cdot e^{-y}"}</M> sur D : y ≤ x, x ≥ 0, y ≥ x-5, y ≥ 0
            </div>

            <Question num="1" question="Déterminer k :">
              <p><strong>Réponse : k = 2/35</strong></p>
              <p className="text-sm mt-2">Analyse du domaine D :</p>
              <ul className="text-sm list-disc ml-4">
                <li>Pour 0 ≤ x ≤ 5 : y varie de 0 à x</li>
                <li>Pour x &gt; 5 : y varie de x-5 à x</li>
              </ul>
              <Formula><M>{"\\int_0^5 \\int_0^x kx e^{-y} dy dx + \\int_5^{+\\infty} \\int_{x-5}^x kx e^{-y} dy dx = 1"}</M></Formula>
              <p className="text-sm">Après calculs : <strong>k = 2/35</strong></p>
            </Question>

            <Question num="2" question={<>Densité marginale <M>{"f_X(x)"}</M> :</>}>
              <p><strong>Réponse :</strong></p>
              <p className="text-sm mt-2">Pour 0 ≤ x ≤ 5 :</p>
              <Formula><M>{"f_X(x) = \\int_0^x kx e^{-y} dy = kx(1 - e^{-x})"}</M></Formula>
              <p className="text-sm">Pour x &gt; 5 :</p>
              <Formula><M>{"f_X(x) = \\int_{x-5}^x kx e^{-y} dy = kx e^{-x}(e^5 - 1)"}</M></Formula>
            </Question>

            <Question num="3" question="Densité conditionnelle f(Y|X=6) :">
              <p><strong>Réponse : ≈ 0.37</strong></p>
              <Formula><M>{"f_{Y|X}(y|x) = \\frac{f(x,y)}{f_X(x)}"}</M></Formula>
            </Question>

            <Question num="4" question="E[Y | X=6] = ?">
              <p><strong>Réponse : ≈ 1.968</strong></p>
              <Formula><M>{"E[Y|X=6] = \\int_1^6 y \\cdot f_{Y|X=6}(y) dy"}</M></Formula>
            </Question>
          </Exercise>

          <Exercise title="Exercice VI - Démonstrations" points={3}>
            <Question num="1" question="E[X] pour Poisson via fonction caractéristique :">
              <p><strong>Démonstration :</strong></p>
              <p className="text-sm mt-2">Fonction caractéristique de Poisson(λ) :</p>
              <Formula><M>{"\\varphi_X(t) = e^{\\lambda(e^{it}-1)}"}</M></Formula>
              <p className="text-sm">Dérivée :</p>
              <Formula><M>{"\\varphi'_X(t) = \\lambda i e^{it} \\cdot e^{\\lambda(e^{it}-1)}"}</M></Formula>
              <p className="text-sm">En t = 0 :</p>
              <Formula><M>{"\\varphi'_X(0) = \\lambda i \\cdot 1 \\cdot 1 = \\lambda i"}</M></Formula>
              <Formula><M>{"E[X] = \\frac{\\varphi'_X(0)}{i} = \\frac{\\lambda i}{i} = \\lambda"}</M></Formula>
            </Question>

            <Question num="2" question="Mode de la loi Binomiale :">
              <p><strong>Formule :</strong> Mode = ⌊(n+1)p⌋</p>
              <p className="text-sm mt-2">Méthode : On cherche k tel que P(X=k) ≥ P(X=k-1) et P(X=k) ≥ P(X=k+1)</p>
              <p className="text-sm mt-2">Rapport :</p>
              <Formula><M>{"\\frac{P(X=k)}{P(X=k-1)} = \\frac{n-k+1}{k} \\cdot \\frac{p}{q} \\ge 1"}</M></Formula>
              <p className="text-sm">Ce qui donne : k ≤ (n+1)p</p>
              <p className="text-sm mt-2"><strong>Conclusion :</strong></p>
              <ul className="text-sm list-disc ml-4">
                <li>Si (n+1)p est entier : deux modes, k = (n+1)p et k = (n+1)p - 1</li>
                <li>Sinon : mode unique k = ⌊(n+1)p⌋</li>
              </ul>
            </Question>
          </Exercise>
        </div>
      )}

      {/* Récapitulatif des formules */}
      <div className="mt-12 p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl border border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="w-6 h-6 text-slate-800" />
          <h2 className="text-xl font-bold text-slate-900">Formules Essentielles</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-white rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Espérance & Variance</h3>
            <ul className="space-y-1 text-slate-700">
              <li>• E[aX + bY] = aE[X] + bE[Y]</li>
              <li>• V[aX + bY] = a²V[X] + b²V[Y] + 2ab·Cov(X,Y)</li>
              <li>• Cov(X,Y) = E[XY] - E[X]E[Y]</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Lois Usuelles</h3>
            <ul className="space-y-1 text-slate-700">
              <li>• Binomiale B(n,p) : E = np, V = np(1-p)</li>
              <li>• Poisson P(λ) : E = V = λ</li>
              <li>• Mode Binomiale : ⌊(n+1)p⌋</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Inégalités</h3>
            <ul className="space-y-1 text-slate-700">
              <li>• Markov : P(X ≥ t) ≤ E[X]/t</li>
              <li>• Bienaymé : P(|X-E[X]| ≥ ε) ≤ V[X]/ε²</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">VA 2D</h3>
            <ul className="space-y-1 text-slate-700">
              <li>• Marginale : f_X(x) = ∫f(x,y)dy</li>
              <li>• Conditionnelle : f(Y|X) = f(x,y)/f_X(x)</li>
              <li>• ρ = Cov(X,Y)/(σ_X·σ_Y)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-slate-600">
        <p>Bonne chance pour ton examen ! 🍀</p>
      </div>
    </main>
  );
}

export default CorrectionAnnales;
