import { useState } from 'react';
import { ArrowLeft, Star, AlertTriangle, CheckCircle, BookOpen } from 'lucide-react';
import { Math as M, Callout } from '../../../../components';

interface Demo {
  id: string;
  title: string;
  category: 'exigible' | 'annale' | 'potentiel';
  year?: string;
  difficulty: 1 | 2 | 3;
}

const demos: Demo[] = [
  { id: 'croissante', title: 'P est croissante', category: 'exigible', difficulty: 1 },
  { id: 'proba-totales', title: 'Probabilités totales', category: 'exigible', difficulty: 1 },
  { id: 'e-binomiale-def', title: 'E[X] Binomiale (définition)', category: 'exigible', difficulty: 2 },
  { id: 'e-poisson-def', title: 'E[X] Poisson (définition)', category: 'exigible', difficulty: 2 },
  { id: 'v-poisson-def', title: 'V[X] Poisson (définition)', category: 'exigible', difficulty: 2 },
  { id: 'approx-poisson', title: 'Approximation B(n,p) → P(λ)', category: 'exigible', difficulty: 3 },
  { id: 'gamma-recurrence', title: 'Récurrence Γ(a)', category: 'exigible', difficulty: 2 },
  { id: 'e-binomiale-phi', title: 'E[X] Binomiale (φ)', category: 'annale', year: '2022-2023', difficulty: 3 },
  { id: 'mode-poisson', title: 'Mode Poisson', category: 'annale', year: '2022-2023', difficulty: 2 },
  { id: 'e-poisson-phi', title: 'E[X] Poisson (φ)', category: 'annale', year: '2023-2024', difficulty: 3 },
  { id: 'mode-binomiale', title: 'Mode Binomiale', category: 'annale', year: '2023-2024', difficulty: 2 },
  { id: 'loi-moments-fact', title: 'Loi à partir des μ[k]', category: 'annale', year: '2024-2025', difficulty: 3 },
  { id: 'v-poisson-phi', title: 'V[X] Poisson (φ)', category: 'annale', year: '2024-2025', difficulty: 3 },
  { id: 'v-binomiale-phi', title: 'V[X] Binomiale (φ)', category: 'potentiel', difficulty: 3 },
  { id: 'bienayme', title: 'Inégalité Bienaymé-Tchebychev', category: 'potentiel', difficulty: 2 },
  { id: 'variance-somme', title: 'V[X+Y] = V[X] + V[Y] + 2Cov', category: 'potentiel', difficulty: 1 },
  { id: 'centree-reduite', title: 'Variable centrée réduite', category: 'potentiel', difficulty: 1 },
];

export function Demonstrations() {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'exigible' | 'annale' | 'potentiel'>('all');

  const filteredDemos = filter === 'all' ? demos : demos.filter(d => d.category === filter);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'exigible': return <CheckCircle size={16} className="text-emerald-500" />;
      case 'annale': return <Star size={16} className="text-amber-500" />;
      case 'potentiel': return <AlertTriangle size={16} className="text-orange-500" />;
      default: return null;
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'exigible': return 'Exigible';
      case 'annale': return 'Tombée en annale';
      case 'potentiel': return 'Potentielle';
      default: return '';
    }
  };

  if (!selectedDemo) {
    return (
      <div className="max-w-6xl pt-20 sm:pt-24 px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl font-semibold text-slate-900 dark:text-white mb-3">Démonstrations</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">Exigibles, tombées en annales, et potentielles</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', 'exigible', 'annale', 'potentiel'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                filter === f ? 'bg-gray-900 text-white' : 'bg-slate-100/80 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:bg-white/10'
              }`}
            >
              {f === 'all' ? 'Toutes' : getCategoryLabel(f)}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mb-6 text-xs text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1"><CheckCircle size={14} className="text-emerald-500" /> Exigible</span>
          <span className="flex items-center gap-1"><Star size={14} className="text-amber-500" /> Tombée en annale</span>
          <span className="flex items-center gap-1"><AlertTriangle size={14} className="text-orange-500" /> Potentielle</span>
        </div>

        <div className="space-y-2">
          {filteredDemos.map((demo, idx) => (
            <button
              key={demo.id}
              onClick={() => setSelectedDemo(demo.id)}
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:border-white/15 hover:bg-slate-100/50 dark:bg-white/5 transition-all text-left group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500 dark:text-slate-500 font-medium w-6">{String(idx + 1).padStart(2, '0')}</span>
                {getCategoryIcon(demo.category)}
                <div>
                  <h2 className="font-medium text-slate-900 dark:text-white group-hover:text-slate-800 dark:text-slate-200">{demo.title}</h2>
                  {demo.year && <p className="text-xs text-amber-600">Partiel {demo.year}</p>}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i <= demo.difficulty ? 'bg-gray-400' : 'bg-slate-200 dark:bg-white/10'}`} />
                ))}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 p-4 bg-slate-100/50 dark:bg-white/5 rounded-xl">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <BookOpen size={18} /> Historique des partiels
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-600 dark:text-slate-400">
                  <th className="p-2">Année</th>
                  <th className="p-2">Démo 1</th>
                  <th className="p-2">Démo 2</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200 dark:border-white/10">
                  <td className="p-2 font-medium">2022-2023</td>
                  <td className="p-2">E[X] Binomiale (φ)</td>
                  <td className="p-2">Mode Poisson</td>
                </tr>
                <tr className="border-t border-slate-200 dark:border-white/10">
                  <td className="p-2 font-medium">2023-2024</td>
                  <td className="p-2">E[X] Poisson (φ)</td>
                  <td className="p-2">Mode Binomiale</td>
                </tr>
                <tr className="border-t border-slate-200 dark:border-white/10">
                  <td className="p-2 font-medium">2024-2025</td>
                  <td className="p-2">Loi à partir des μ[k]</td>
                  <td className="p-2">V[X] Poisson (φ)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl pt-20 sm:pt-24 px-4 sm:px-6 pb-16">
      <button onClick={() => setSelectedDemo(null)} className="flex items-center gap-2 text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:text-slate-300 mb-8 text-sm">
        <ArrowLeft size={14} /> Retour aux démonstrations
      </button>
      
      {selectedDemo === 'croissante' && <DemoCroissante />}
      {selectedDemo === 'proba-totales' && <DemoProbaTotales />}
      {selectedDemo === 'e-binomiale-def' && <DemoEBinomialeDef />}
      {selectedDemo === 'e-poisson-def' && <DemoEPoissonDef />}
      {selectedDemo === 'v-poisson-def' && <DemoVPoissonDef />}
      {selectedDemo === 'approx-poisson' && <DemoApproxPoisson />}
      {selectedDemo === 'gamma-recurrence' && <DemoGammaRecurrence />}
      {selectedDemo === 'e-binomiale-phi' && <DemoEBinomialePhi />}
      {selectedDemo === 'mode-poisson' && <DemoModePoisson />}
      {selectedDemo === 'e-poisson-phi' && <DemoEPoissonPhi />}
      {selectedDemo === 'mode-binomiale' && <DemoModeBinomiale />}
      {selectedDemo === 'loi-moments-fact' && <DemoLoiMomentsFact />}
      {selectedDemo === 'v-poisson-phi' && <DemoVPoissonPhi />}
      {selectedDemo === 'v-binomiale-phi' && <DemoVBinomialePhi />}
      {selectedDemo === 'bienayme' && <DemoBienayme />}
      {selectedDemo === 'variance-somme' && <DemoVarianceSomme />}
      {selectedDemo === 'centree-reduite' && <DemoCentreeReduite />}
    </div>
  );
}

function DemoCroissante() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle size={18} className="text-emerald-500" />
        <span className="text-sm text-emerald-600 font-medium">Démonstration exigible</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">P est une fonction croissante</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Si A ⊂ B alors P(A) ≤ P(B)</p>

      <Callout type="tip" title="Énoncé">
        <p>Démontrer que si A ⊂ B, alors P(A) ≤ P(B)</p>
      </Callout>

      <h2 className="text-lg font-semibold mt-8 mb-4">Démonstration</h2>
      <div className="space-y-4 text-sm">
        <p><strong>Hypothèses :</strong> A, B ⊂ Ω et A, B ∈ F avec A ⊂ B</p>
        
        <p><strong>Étape 1 :</strong> Décomposer B en parties disjointes</p>
        <div className="my-3 text-center"><M display>{"B = A \\cup (B \\cap \\bar{A})"}</M></div>
        <p className="text-slate-700 dark:text-slate-300">Car tout élément de B est soit dans A, soit dans B mais pas dans A.</p>
        
        <p><strong>Étape 2 :</strong> Vérifier que ces parties sont disjointes</p>
        <div className="my-3 text-center"><M display>{"A \\cap (B \\cap \\bar{A}) = \\emptyset"}</M></div>
        
        <p><strong>Étape 3 :</strong> Appliquer l'additivité restreinte</p>
        <div className="my-3 text-center"><M display>{"P(B) = P(A) + P(B \\cap \\bar{A})"}</M></div>
        
        <p><strong>Étape 4 :</strong> Conclure</p>
        <p>Comme P(B ∩ Ā) ≥ 0 (axiome de positivité) :</p>
        <div className="my-3 text-center"><M display>{"P(B) = P(A) + P(B \\cap \\bar{A}) \\geq P(A)"}</M></div>
        
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border-l-4 border-emerald-400">
          <p className="font-medium text-emerald-800">Conclusion : P(A) ≤ P(B) ∎</p>
        </div>
      </div>
    </div>
  );
}

function DemoProbaTotales() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle size={18} className="text-emerald-500" />
        <span className="text-sm text-emerald-600 font-medium">Démonstration exigible</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">Théorème des probabilités totales</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">P(A ∪ B) = P(A) + P(B) - P(A ∩ B)</p>

      <h2 className="text-lg font-semibold mt-8 mb-4">Démonstration</h2>
      <div className="space-y-4 text-sm">
        <p><strong>Étape 1 :</strong> Décomposer A ∪ B</p>
        <div className="my-3 text-center"><M display>{"A \\cup B = A \\cup (B \\cap \\bar{A})"}</M></div>
        <p className="text-slate-700 dark:text-slate-300">Avec A ∩ (B ∩ Ā) = ∅ (disjoints)</p>
        
        <p><strong>Étape 2 :</strong> Appliquer l'additivité</p>
        <div className="my-3 text-center"><M display>{"P(A \\cup B) = P(A) + P(B \\cap \\bar{A})"}</M></div>
        
        <p><strong>Étape 3 :</strong> Exprimer P(B ∩ Ā)</p>
        <p>On décompose B :</p>
        <div className="my-3 text-center"><M display>{"B = (B \\cap A) \\cup (B \\cap \\bar{A})"}</M></div>
        <p>Ces deux parties sont disjointes, donc :</p>
        <div className="my-3 text-center"><M display>{"P(B) = P(B \\cap A) + P(B \\cap \\bar{A})"}</M></div>
        <div className="my-3 text-center"><M display>{"P(B \\cap \\bar{A}) = P(B) - P(A \\cap B)"}</M></div>
        
        <p><strong>Étape 4 :</strong> Substituer</p>
        <div className="my-3 text-center"><M display>{"P(A \\cup B) = P(A) + P(B) - P(A \\cap B)"}</M></div>
        
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border-l-4 border-emerald-400">
          <p className="font-medium text-emerald-800">CQFD ∎</p>
        </div>
      </div>
    </div>
  );
}

function DemoEBinomialeDef() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle size={18} className="text-emerald-500" />
        <span className="text-sm text-emerald-600 font-medium">Démonstration exigible</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">E[X] d'une Binomiale (définition)</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Si X ~ B(n,p), alors E[X] = np</p>

      <Callout type="tip" title="Rappel">
        <M>{"P(X = k) = C_n^k p^k q^{n-k} \\text{ avec } q = 1-p"}</M>
      </Callout>

      <h2 className="text-lg font-semibold mt-8 mb-4">Méthode 1 : Par la définition</h2>
      <div className="space-y-4 text-sm">
        <div className="my-3 text-center"><M display>{"E[X] = \\sum_{x=0}^{n} x \\cdot C_n^x p^x q^{n-x}"}</M></div>
        
        <p>Le terme x=0 est nul, donc :</p>
        <div className="my-3 text-center"><M display>{"E[X] = \\sum_{x=1}^{n} x \\cdot \\frac{n!}{x!(n-x)!} p^x q^{n-x}"}</M></div>
        
        <p>On simplifie x avec x! :</p>
        <div className="my-3 text-center"><M display>{"E[X] = \\sum_{x=1}^{n} \\frac{n!}{(x-1)!(n-x)!} p^x q^{n-x}"}</M></div>
        
        <p>On factorise np :</p>
        <div className="my-3 text-center"><M display>{"E[X] = np \\sum_{x=1}^{n} \\frac{(n-1)!}{(x-1)!(n-x)!} p^{x-1} q^{n-x}"}</M></div>
        
        <p>Changement de variable : y = x-1, N = n-1</p>
        <div className="my-3 text-center"><M display>{"E[X] = np \\sum_{y=0}^{N} C_N^y p^y q^{N-y} = np(p+q)^N = np"}</M></div>
      </div>

      <h2 className="text-lg font-semibold mt-8 mb-4">Méthode 2 : Somme de Bernoulli</h2>
      <div className="space-y-4 text-sm">
        <p>X ~ B(n,p) = somme de n Bernoulli indépendantes :</p>
        <div className="my-3 text-center"><M display>{"X = \\sum_{i=1}^{n} X_i \\text{ avec } X_i \\sim \\mathcal{B}(1,p)"}</M></div>
        
        <p>Par linéarité de l'espérance :</p>
        <div className="my-3 text-center"><M display>{"E[X] = \\sum_{i=1}^{n} E[X_i] = \\sum_{i=1}^{n} p = np"}</M></div>
        
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border-l-4 border-emerald-400">
          <p className="font-medium text-emerald-800">E[X] = np ∎</p>
        </div>
      </div>
    </div>
  );
}

function DemoEPoissonDef() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle size={18} className="text-emerald-500" />
        <span className="text-sm text-emerald-600 font-medium">Démonstration exigible</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">E[X] d'une Poisson (définition)</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Si X ~ P(λ), alors E[X] = λ</p>

      <Callout type="tip" title="Rappel">
        <M>{"P(X = k) = e^{-\\lambda} \\frac{\\lambda^k}{k!}"}</M>
      </Callout>

      <h2 className="text-lg font-semibold mt-8 mb-4">Démonstration</h2>
      <div className="space-y-4 text-sm">
        <div className="my-3 text-center"><M display>{"E[X] = \\sum_{x=0}^{+\\infty} x \\cdot \\frac{e^{-\\lambda} \\lambda^x}{x!}"}</M></div>
        
        <p>Le terme x=0 est nul :</p>
        <div className="my-3 text-center"><M display>{"E[X] = e^{-\\lambda} \\sum_{x=1}^{+\\infty} \\frac{x \\cdot \\lambda^x}{x!}"}</M></div>
        
        <p>On simplifie x avec x! :</p>
        <div className="my-3 text-center"><M display>{"E[X] = e^{-\\lambda} \\sum_{x=1}^{+\\infty} \\frac{\\lambda^x}{(x-1)!}"}</M></div>
        
        <p>On factorise λ :</p>
        <div className="my-3 text-center"><M display>{"E[X] = e^{-\\lambda} \\lambda \\sum_{x=1}^{+\\infty} \\frac{\\lambda^{x-1}}{(x-1)!}"}</M></div>
        
        <p>Changement de variable : y = x-1</p>
        <div className="my-3 text-center"><M display>{"E[X] = e^{-\\lambda} \\lambda \\sum_{y=0}^{+\\infty} \\frac{\\lambda^y}{y!}"}</M></div>
        
        <p>On reconnaît le développement de e<sup>λ</sup> :</p>
        <div className="my-3 text-center"><M display>{"E[X] = e^{-\\lambda} \\lambda \\cdot e^{\\lambda} = \\lambda"}</M></div>
        
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border-l-4 border-emerald-400">
          <p className="font-medium text-emerald-800">E[X] = λ ∎</p>
        </div>
      </div>
    </div>
  );
}

function DemoVPoissonDef() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle size={18} className="text-emerald-500" />
        <span className="text-sm text-emerald-600 font-medium">Démonstration exigible</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">V[X] d'une Poisson (définition)</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Si X ~ P(λ), alors V[X] = λ</p>

      <h2 className="text-lg font-semibold mt-8 mb-4">Démonstration</h2>
      <div className="space-y-4 text-sm">
        <p>On utilise V(X) = E[X²] - (E[X])² = m₂ - m₁²</p>
        <p>On sait que m₁ = E[X] = λ</p>
        
        <p><strong>Astuce :</strong> On utilise x² = x(x-1) + x</p>
        <div className="my-3 text-center"><M display>{"m_2 = E[X^2] = E[X(X-1)] + E[X] = \\mu_{[2]} + \\lambda"}</M></div>
        
        <p><strong>Calcul de μ[2] = E[X(X-1)] :</strong></p>
        <div className="my-3 text-center"><M display>{"\\mu_{[2]} = \\sum_{x=0}^{+\\infty} x(x-1) \\frac{e^{-\\lambda} \\lambda^x}{x!}"}</M></div>
        
        <p>Les termes x=0 et x=1 sont nuls :</p>
        <div className="my-3 text-center"><M display>{"\\mu_{[2]} = e^{-\\lambda} \\sum_{x=2}^{+\\infty} \\frac{\\lambda^x}{(x-2)!}"}</M></div>
        
        <p>On factorise λ² :</p>
        <div className="my-3 text-center"><M display>{"\\mu_{[2]} = e^{-\\lambda} \\lambda^2 \\sum_{x=2}^{+\\infty} \\frac{\\lambda^{x-2}}{(x-2)!}"}</M></div>
        
        <p>Changement z = x-2 :</p>
        <div className="my-3 text-center"><M display>{"\\mu_{[2]} = e^{-\\lambda} \\lambda^2 e^{\\lambda} = \\lambda^2"}</M></div>
        
        <p><strong>Conclusion :</strong></p>
        <div className="my-3 text-center"><M display>{"m_2 = \\lambda^2 + \\lambda"}</M></div>
        <div className="my-3 text-center"><M display>{"V(X) = m_2 - m_1^2 = \\lambda^2 + \\lambda - \\lambda^2 = \\lambda"}</M></div>
        
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border-l-4 border-emerald-400">
          <p className="font-medium text-emerald-800">V[X] = λ ∎</p>
        </div>
      </div>
    </div>
  );
}


function DemoApproxPoisson() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle size={18} className="text-emerald-500" />
        <span className="text-sm text-emerald-600 font-medium">Démonstration exigible</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">Approximation Binomiale → Poisson</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">B(n,p) → P(λ) quand n→∞, p→0, np=λ</p>

      <h2 className="text-lg font-semibold mt-8 mb-4">Démonstration</h2>
      <div className="space-y-4 text-sm">
        <p>Soit X ~ B(n,p) avec λ = np, donc p = λ/n</p>
        
        <div className="my-3 text-center"><M display>{"P_x = C_n^x p^x (1-p)^{n-x} = \\frac{n!}{x!(n-x)!} \\left(\\frac{\\lambda}{n}\\right)^x \\left(1-\\frac{\\lambda}{n}\\right)^{n-x}"}</M></div>
        
        <p>On réorganise :</p>
        <div className="my-3 text-center"><M display>{"P_x = \\frac{\\lambda^x}{x!} \\cdot \\frac{n(n-1)...(n-x+1)}{n^x} \\cdot \\left(1-\\frac{\\lambda}{n}\\right)^n \\cdot \\left(1-\\frac{\\lambda}{n}\\right)^{-x}"}</M></div>
        
        <p><strong>Quand n → +∞ :</strong></p>
        <ul className="list-disc pl-6 space-y-2">
          <li><M>{"\\frac{n(n-1)...(n-x+1)}{n^x} \\to 1"}</M></li>
          <li><M>{"\\left(1-\\frac{\\lambda}{n}\\right)^n \\to e^{-\\lambda}"}</M> (limite remarquable)</li>
          <li><M>{"\\left(1-\\frac{\\lambda}{n}\\right)^{-x} \\to 1"}</M></li>
        </ul>
        
        <p><strong>Donc :</strong></p>
        <div className="my-3 text-center"><M display>{"P_x \\to \\frac{\\lambda^x e^{-\\lambda}}{x!}"}</M></div>
        
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border-l-4 border-emerald-400">
          <p className="font-medium text-emerald-800">C'est la loi de Poisson P(λ) ∎</p>
        </div>
        
        <Callout type="warning" title="Règle pratique">
          <p>B(n,p) ≈ P(np) si n {">"} 50 et p {"<"} 0.1</p>
        </Callout>
      </div>
    </div>
  );
}

function DemoGammaRecurrence() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle size={18} className="text-emerald-500" />
        <span className="text-sm text-emerald-600 font-medium">Démonstration exigible</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">Récurrence de Γ(a)</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Γ(a) = (a-1)·Γ(a-1)</p>

      <Callout type="tip" title="Rappel">
        <M>{"\\Gamma(a) = \\int_0^{+\\infty} t^{a-1} e^{-t} dt"}</M>
      </Callout>

      <h2 className="text-lg font-semibold mt-8 mb-4">Démonstration (IPP)</h2>
      <div className="space-y-4 text-sm">
        <p>On pose pour l'intégration par parties :</p>
        <ul className="list-disc pl-6">
          <li>u = t<sup>a-1</sup> → du = (a-1)t<sup>a-2</sup>dt</li>
          <li>dv = e<sup>-t</sup>dt → v = -e<sup>-t</sup></li>
        </ul>
        
        <div className="my-3 text-center"><M display>{"\\Gamma(a) = \\left[-t^{a-1}e^{-t}\\right]_0^{+\\infty} + (a-1)\\int_0^{+\\infty} t^{a-2}e^{-t}dt"}</M></div>
        
        <p><strong>Calcul du crochet :</strong></p>
        <ul className="list-disc pl-6">
          <li>En +∞ : t<sup>a-1</sup>e<sup>-t</sup> → 0 (l'exponentielle domine)</li>
          <li>En 0 : t<sup>a-1</sup>e<sup>-t</sup> → 0 (pour a {">"} 1)</li>
        </ul>
        
        <p>Donc le crochet vaut 0, et :</p>
        <div className="my-3 text-center"><M display>{"\\Gamma(a) = (a-1)\\int_0^{+\\infty} t^{a-2}e^{-t}dt = (a-1)\\Gamma(a-1)"}</M></div>
        
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border-l-4 border-emerald-400">
          <p className="font-medium text-emerald-800">Γ(a) = (a-1)·Γ(a-1) ∎</p>
        </div>
        
        <p className="mt-4"><strong>Conséquence :</strong> Pour n ∈ ℕ* : <M>{"\\Gamma(n) = (n-1)!"}</M></p>
      </div>
    </div>
  );
}


function DemoEBinomialePhi() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Star size={18} className="text-amber-500" />
        <span className="text-sm text-amber-600 font-medium">Partiel 2022-2023</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">E[X] Binomiale (fonction caractéristique)</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Démontrer E[X] = np à partir de φ_X(t)</p>

      <Callout type="tip" title="Rappel">
        <M>{"\\varphi_X(t) = (pe^{it}+q)^n"}</M>
      </Callout>

      <h2 className="text-lg font-semibold mt-8 mb-4">Démonstration</h2>
      <div className="space-y-4 text-sm">
        <p><strong>Étape 1 :</strong> Développer e<sup>it</sup></p>
        <div className="my-3 text-center"><M display>{"pe^{it}+q = 1 + p\\left(\\frac{it}{1!}+\\frac{(it)^2}{2!}+...\\right)"}</M></div>
        
        <p><strong>Étape 2 :</strong> Poser A et développer (1+A)<sup>n</sup></p>
        <div className="my-3 text-center"><M display>{"(1+A)^n = 1+nA+\\frac{n(n-1)}{2}A^2+..."}</M></div>
        
        <p><strong>Étape 3 :</strong> Identifier les coefficients</p>
        <div className="my-3 text-center"><M display>{"(pe^{it}+q)^n = 1+np\\frac{it}{1!} + \\left(np + n(n-1)p^2\\right)\\frac{(it)^2}{2!} + ..."}</M></div>
        
        <p><strong>Étape 4 :</strong> Comparer avec le développement général</p>
        <div className="my-3 text-center"><M display>{"\\varphi_X(t) = 1+m_1\\frac{it}{1!} + m_2\\frac{(it)^2}{2!}+..."}</M></div>
        
        <p>Par identification : m₁ = np = E[X]</p>
        
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border-l-4 border-emerald-400">
          <p className="font-medium text-emerald-800">E[X] = np ∎</p>
        </div>
        
        <p className="mt-4"><strong>Bonus :</strong> V[X] = m₂ - m₁² = npq</p>
      </div>
    </div>
  );
}

function DemoModePoisson() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Star size={18} className="text-amber-500" />
        <span className="text-sm text-amber-600 font-medium">Partiel 2022-2023</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">Mode d'une Poisson</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">λ - 1 ≤ x_Mo ≤ λ</p>

      <h2 className="text-lg font-semibold mt-8 mb-4">Démonstration</h2>
      <div className="space-y-4 text-sm">
        <p>Le mode x_Mo vérifie :</p>
        <div className="my-3 text-center"><M display>{"\\frac{P_{x_{Mo}}}{P_{x_{Mo}-1}} \\geq 1 \\quad \\text{et} \\quad \\frac{P_{x_{Mo}}}{P_{x_{Mo}+1}} \\geq 1"}</M></div>
        
        <p><strong>Calcul des rapports :</strong></p>
        <div className="my-3 text-center"><M display>{"\\frac{P_x}{P_{x-1}} = \\frac{\\lambda}{x} \\quad ; \\quad \\frac{P_x}{P_{x+1}} = \\frac{x+1}{\\lambda}"}</M></div>
        
        <p><strong>Conditions sur le mode :</strong></p>
        <ul className="list-disc pl-6 space-y-2">
          <li><M>{"\\frac{\\lambda}{x_{Mo}} \\geq 1 \\Rightarrow x_{Mo} \\leq \\lambda"}</M></li>
          <li><M>{"\\frac{x_{Mo}+1}{\\lambda} \\geq 1 \\Rightarrow x_{Mo} \\geq \\lambda-1"}</M></li>
        </ul>
        
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border-l-4 border-emerald-400">
          <M>{"\\boxed{\\lambda - 1 \\leq x_{Mo} \\leq \\lambda}"}</M>
        </div>
        
        <Callout type="warning" title="Remarque">
          <p>Si λ est entier, il y a 2 modes : λ-1 et λ</p>
        </Callout>
      </div>
    </div>
  );
}

function DemoEPoissonPhi() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Star size={18} className="text-amber-500" />
        <span className="text-sm text-amber-600 font-medium">Partiel 2023-2024</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">E[X] Poisson (fonction caractéristique)</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Démontrer E[X] = λ à partir de φ_X(t)</p>

      <Callout type="tip" title="Rappel">
        <M>{"\\varphi_X(t) = e^{\\lambda(e^{it}-1)}"}</M>
      </Callout>

      <h2 className="text-lg font-semibold mt-8 mb-4">Démonstration</h2>
      <div className="space-y-4 text-sm">
        <p><strong>Étape 1 :</strong> Développer e<sup>it</sup></p>
        <div className="my-3 text-center"><M display>{"e^{it} = 1 + \\frac{it}{1!} + \\frac{(it)^2}{2!} + ..."}</M></div>
        
        <p><strong>Étape 2 :</strong> Calculer λ(e<sup>it</sup> - 1)</p>
        <div className="my-3 text-center"><M display>{"\\lambda(e^{it}-1) = \\lambda\\left[\\frac{it}{1!} + \\frac{(it)^2}{2!} + ...\\right]"}</M></div>
        
        <p><strong>Étape 3 :</strong> Développer et identifier</p>
        <div className="my-3 text-center"><M display>{"\\varphi_X(t) = 1 + \\lambda\\frac{it}{1!} + (\\lambda + \\lambda^2)\\frac{(it)^2}{2!} + ..."}</M></div>
        
        <p>Par identification : m₁ = λ = E[X]</p>
        
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border-l-4 border-emerald-400">
          <p className="font-medium text-emerald-800">E[X] = λ ∎</p>
        </div>
      </div>
    </div>
  );
}


function DemoModeBinomiale() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Star size={18} className="text-amber-500" />
        <span className="text-sm text-amber-600 font-medium">Partiel 2023-2024</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">Mode d'une Binomiale</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">np - q ≤ x_Mo ≤ np + p</p>

      <h2 className="text-lg font-semibold mt-8 mb-4">Démonstration</h2>
      <div className="space-y-4 text-sm">
        <p>Le mode x_Mo vérifie les deux conditions de maximum.</p>
        
        <p><strong>Calcul des rapports :</strong></p>
        <div className="my-3 text-center"><M display>{"\\frac{P_x}{P_{x-1}} = \\frac{(n-x+1)p}{xq} \\quad ; \\quad \\frac{P_x}{P_{x+1}} = \\frac{(x+1)q}{(n-x)p}"}</M></div>
        
        <p><strong>Condition 1 :</strong> <M>{"\\frac{(n-x+1)p}{xq} \\geq 1"}</M></p>
        <div className="my-3 text-center"><M display>{"(n-x+1)p \\geq xq \\Rightarrow np+p \\geq x \\Rightarrow x \\leq np+p"}</M></div>
        
        <p><strong>Condition 2 :</strong> <M>{"\\frac{(x+1)q}{(n-x)p} \\geq 1"}</M></p>
        <div className="my-3 text-center"><M display>{"(x+1)q \\geq (n-x)p \\Rightarrow x \\geq np-q"}</M></div>
        
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border-l-4 border-emerald-400">
          <M>{"\\boxed{np - q \\leq x_{Mo} \\leq np + p}"}</M>
        </div>
        
        <Callout type="warning" title="Remarque">
          <p>Si np-q est entier, il y a 2 modes : np-q et np+p</p>
        </Callout>
      </div>
    </div>
  );
}

function DemoLoiMomentsFact() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Star size={18} className="text-amber-500" />
        <span className="text-sm text-amber-600 font-medium">Partiel 2024-2025</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">Identifier une loi à partir des μ[k]</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Si μ[k] = m^k pour tout k, quelle est la loi de X ?</p>

      <h2 className="text-lg font-semibold mt-8 mb-4">Démonstration</h2>
      <div className="space-y-4 text-sm">
        <p><strong>Rappel :</strong> La fonction génératrice se développe en :</p>
        <div className="my-3 text-center"><M display>{"g_X(1+v) = 1 + \\frac{v}{1!}\\mu_{[1]} + \\frac{v^2}{2!}\\mu_{[2]} + ... + \\frac{v^k}{k!}\\mu_{[k]} + ..."}</M></div>
        
        <p><strong>Avec μ[k] = m^k :</strong></p>
        <div className="my-3 text-center"><M display>{"g_X(1+v) = 1 + \\frac{mv}{1!} + \\frac{m^2v^2}{2!} + ... = e^{mv}"}</M></div>
        
        <p>En posant v = u-1 :</p>
        <div className="my-3 text-center"><M display>{"g_X(u) = e^{m(u-1)}"}</M></div>
        
        <p><strong>Identification :</strong> g_X(u) = e<sup>λ(u-1)</sup> est la fonction génératrice de P(λ)</p>
        
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border-l-4 border-emerald-400">
          <p className="font-medium text-emerald-800">X ~ P(m) ∎</p>
        </div>
      </div>
    </div>
  );
}

function DemoVPoissonPhi() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Star size={18} className="text-amber-500" />
        <span className="text-sm text-amber-600 font-medium">Partiel 2024-2025</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">V[X] Poisson (fonction caractéristique)</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Démontrer V[X] = λ à partir de φ_X(t)</p>

      <h2 className="text-lg font-semibold mt-8 mb-4">Démonstration</h2>
      <div className="space-y-4 text-sm">
        <p>On reprend le développement de φ_X(t) = e<sup>λ(e<sup>it</sup>-1)</sup> :</p>
        <div className="my-3 text-center"><M display>{"\\varphi_X(t) = 1 + \\lambda\\frac{it}{1!} + (\\lambda + \\lambda^2)\\frac{(it)^2}{2!} + ..."}</M></div>
        
        <p>Par identification : m₁ = λ, m₂ = λ + λ²</p>
        
        <p><strong>Calcul de la variance :</strong></p>
        <div className="my-3 text-center"><M display>{"V(X) = m_2 - m_1^2 = (\\lambda + \\lambda^2) - \\lambda^2 = \\lambda"}</M></div>
        
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border-l-4 border-emerald-400">
          <p className="font-medium text-emerald-800">V[X] = λ ∎</p>
        </div>
      </div>
    </div>
  );
}


function DemoVBinomialePhi() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle size={18} className="text-orange-500" />
        <span className="text-sm text-orange-600 font-medium">Potentielle - Jamais tombée</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">V[X] Binomiale (fonction caractéristique)</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Démontrer V[X] = npq à partir de φ_X(t)</p>

      <Callout type="warning" title="Pourquoi c'est probable ?">
        <p>E[X] Binomiale par φ est tombée en 2022-2023. La variance par φ serait une suite logique.</p>
      </Callout>

      <h2 className="text-lg font-semibold mt-8 mb-4">Démonstration</h2>
      <div className="space-y-4 text-sm">
        <p>On reprend le développement de φ_X(t) = (pe<sup>it</sup>+q)<sup>n</sup> :</p>
        <div className="my-3 text-center"><M display>{"(pe^{it}+q)^n = 1+np\\frac{it}{1!} + \\left(np + n(n-1)p^2\\right)\\frac{(it)^2}{2!} + ..."}</M></div>
        
        <p>Par identification : m₁ = np, m₂ = np + n(n-1)p²</p>
        
        <p><strong>Calcul de la variance :</strong></p>
        <div className="my-3 text-center"><M display>{"V(X) = m_2 - m_1^2 = np + n(n-1)p^2 - n^2p^2"}</M></div>
        <div className="my-3 text-center"><M display>{"= np + n^2p^2 - np^2 - n^2p^2 = np - np^2 = np(1-p)"}</M></div>
        
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border-l-4 border-emerald-400">
          <p className="font-medium text-emerald-800">V[X] = npq ∎</p>
        </div>
      </div>
    </div>
  );
}

function DemoBienayme() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle size={18} className="text-orange-500" />
        <span className="text-sm text-orange-600 font-medium">Potentielle - Jamais tombée</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">Inégalité de Bienaymé-Tchebychev</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">P(|X - μ| ≥ ε) ≤ σ²/ε²</p>

      <h2 className="text-lg font-semibold mt-8 mb-4">Démonstration (à partir de Markov)</h2>
      <div className="space-y-4 text-sm">
        <p><strong>Rappel de Markov :</strong> Pour Y ≥ 0 et t {">"} 0 :</p>
        <div className="my-3 text-center"><M display>{"P(Y \\geq t) \\leq \\frac{E[Y]}{t}"}</M></div>
        
        <p><strong>Application :</strong> On pose Y = (X - E[X])² ≥ 0 et t = ε²</p>
        <div className="my-3 text-center"><M display>{"P((X-E[X])^2 \\geq \\varepsilon^2) \\leq \\frac{E[(X-E[X])^2]}{\\varepsilon^2}"}</M></div>
        
        <p>Or (X - E[X])² ≥ ε² ⟺ |X - E[X]| ≥ ε</p>
        
        <div className="my-3 text-center"><M display>{"P(|X-E[X]| \\geq \\varepsilon) \\leq \\frac{V(X)}{\\varepsilon^2}"}</M></div>
        
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border-l-4 border-emerald-400">
          <M>{"\\boxed{P(|X-\\mu| \\geq \\varepsilon) \\leq \\frac{\\sigma^2}{\\varepsilon^2}}"}</M>
        </div>
        
        <p className="mt-4"><strong>Forme minorant :</strong></p>
        <div className="my-3 text-center"><M display>{"P(|X-\\mu| < \\varepsilon) \\geq 1 - \\frac{\\sigma^2}{\\varepsilon^2}"}</M></div>
      </div>
    </div>
  );
}

function DemoVarianceSomme() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle size={18} className="text-orange-500" />
        <span className="text-sm text-orange-600 font-medium">Potentielle - Classique</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">Variance d'une somme</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">V[X+Y] = V[X] + V[Y] + 2Cov(X,Y)</p>

      <h2 className="text-lg font-semibold mt-8 mb-4">Démonstration</h2>
      <div className="space-y-4 text-sm">
        <div className="my-3 text-center"><M display>{"V[X+Y] = E[(X+Y - E[X+Y])^2]"}</M></div>
        
        <p>Posons μ_X = E[X] et μ_Y = E[Y] :</p>
        <div className="my-3 text-center"><M display>{"V[X+Y] = E[(X-\\mu_X + Y-\\mu_Y)^2]"}</M></div>
        
        <p>On développe le carré :</p>
        <div className="my-3 text-center"><M display>{"= E[(X-\\mu_X)^2] + E[(Y-\\mu_Y)^2] + 2E[(X-\\mu_X)(Y-\\mu_Y)]"}</M></div>
        
        <p>On reconnaît les définitions :</p>
        <div className="my-3 text-center"><M display>{"= V[X] + V[Y] + 2Cov(X,Y)"}</M></div>
        
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border-l-4 border-emerald-400">
          <p className="font-medium text-emerald-800">V[X+Y] = V[X] + V[Y] + 2Cov(X,Y) ∎</p>
        </div>
        
        <Callout type="tip" title="Cas particuliers">
          <ul className="list-disc pl-4">
            <li>Si X et Y indépendantes : Cov(X,Y) = 0</li>
            <li>V[X-Y] = V[X] + V[Y] - 2Cov(X,Y)</li>
            <li>V[aX+bY] = a²V[X] + b²V[Y] + 2ab·Cov(X,Y)</li>
          </ul>
        </Callout>
      </div>
    </div>
  );
}

function DemoCentreeReduite() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle size={18} className="text-orange-500" />
        <span className="text-sm text-orange-600 font-medium">Potentielle - Classique</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">Variable centrée réduite</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Si Y = (X - μ)/σ, alors E[Y] = 0 et V[Y] = 1</p>

      <h2 className="text-lg font-semibold mt-8 mb-4">Démonstration</h2>
      <div className="space-y-4 text-sm">
        <p>Soit X une VA avec E[X] = μ et V[X] = σ²</p>
        <p>On pose :</p>
        <div className="my-3 text-center"><M display>{"Y = \\frac{X - \\mu}{\\sigma}"}</M></div>
        
        <p><strong>Calcul de E[Y] :</strong></p>
        <div className="my-3 text-center"><M display>{"E[Y] = E\\left[\\frac{X - \\mu}{\\sigma}\\right] = \\frac{1}{\\sigma}(E[X] - \\mu) = \\frac{1}{\\sigma}(\\mu - \\mu) = 0"}</M></div>
        
        <p><strong>Calcul de V[Y] :</strong></p>
        <div className="my-3 text-center"><M display>{"V[Y] = V\\left[\\frac{X - \\mu}{\\sigma}\\right] = \\frac{1}{\\sigma^2}V[X] = \\frac{\\sigma^2}{\\sigma^2} = 1"}</M></div>
        
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border-l-4 border-emerald-400">
          <p className="font-medium text-emerald-800">E[Y] = 0 et V[Y] = 1 ∎</p>
        </div>
      </div>
    </div>
  );
}
