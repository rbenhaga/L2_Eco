import { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle, AlertTriangle, Target, Flame, TrendingUp, Clock, BarChart3 } from 'lucide-react';
import { Math as MathDisplay, SolutionBox } from '../../../../components';

function M({ children }: { children: string }) {
  return <MathDisplay>{children}</MathDisplay>;
}

// Tags de probabilité d'apparition
type ProbabilityTag = 'deja-tombe' | 'tres-probable' | 'probable' | 'peu-probable';

const tagConfig: Record<ProbabilityTag, { label: string; color: string; bg: string; icon: typeof Flame; iconColor: string }> = {
  'deja-tombe': { label: 'Déjà tombé', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-500/30', icon: Flame, iconColor: 'text-red-600 dark:text-red-400' },
  'tres-probable': { label: 'Très probable', color: 'text-orange-700 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-500/30', icon: Target, iconColor: 'text-orange-600 dark:text-orange-400' },
  'probable': { label: 'Probable', color: 'text-yellow-700 dark:text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-500/30', icon: TrendingUp, iconColor: 'text-yellow-600 dark:text-yellow-500' },
  'peu-probable': { label: 'Peu probable', color: 'text-green-700 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-500/30', icon: Clock, iconColor: 'text-green-600 dark:text-green-400' },
};

function ProbabilityBadge({ tag }: { tag: ProbabilityTag }) {
  const config = tagConfig[tag];
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color} border`}>
      <Icon className={`w-3.5 h-3.5 ${config.iconColor}`} />
      {config.label}
    </span>
  );
}

interface ExerciseProps {
  title: string;
  tag: ProbabilityTag;
  examRef?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Exercise({ title, tag, examRef, children, defaultOpen = false }: ExerciseProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`border rounded-xl mb-4 overflow-hidden ${tagConfig[tag].bg}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/50 transition-colors text-left"
      >
        <div className="flex items-center gap-3 flex-wrap">
          {open ? <ChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />}
          <span className="font-semibold text-slate-900 dark:text-white">{title}</span>
          <ProbabilityBadge tag={tag} />
        </div>
        {examRef && <span className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900/80 px-2 py-1 rounded">{examRef}</span>}
      </button>
      {open && <div className="p-5 bg-white dark:bg-slate-900/80 border-t">{children}</div>}
    </div>
  );
}

function Question({ num, question, tag, children }: { num: string; question: React.ReactNode; tag?: ProbabilityTag; children: React.ReactNode }) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-start gap-3 mb-3 flex-wrap">
        <span className="shrink-0 w-7 h-7 bg-blue-100 dark:bg-blue-950/30 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
          {num}
        </span>
        <div className="text-slate-900 dark:text-white font-medium pt-0.5 flex-1">{question}</div>
        {tag && <ProbabilityBadge tag={tag} />}
      </div>
      <div className="ml-10 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 rounded-lg">
        <div className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div className="text-slate-800 dark:text-slate-200 space-y-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

// Using centralized SolutionBox for Formula and Warning boxes
function Formula({ children }: { children: React.ReactNode }) {
  return (
    <SolutionBox variant="info" className="my-3 text-center overflow-x-auto">
      {children}
    </SolutionBox>
  );
}

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <SolutionBox variant="warning" className="my-3">
      {children}
    </SolutionBox>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: typeof Flame; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4 pb-2 border-b-2 border-slate-200 dark:border-white/10">
        <Icon className="w-6 h-6 text-slate-800 dark:text-slate-200" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export function RevisionIntensive() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-sm text-red-600 mb-3 font-medium">
          <Flame className="w-4 h-4" />
          <span>DERNIÈRE LIGNE DROITE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Révision Intensive</h1>
        <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mb-6">
          Exercices ciblés basés sur l'analyse des annales 2023-2024 et 2024-2025. Focus sur ce qui tombe vraiment.
        </p>

        {/* Légende */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {Object.entries(tagConfig).map(([key, config]) => (
            <span key={key} className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${config.bg} ${config.color} border`}>
              {config.label}
            </span>
          ))}
        </div>
      </div>

      {/* Analyse rapide des patterns */}
      <div className="bg-linear-to-r from-red-600 to-orange-600 text-white p-6 rounded-xl mb-8">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-5 h-5" />
          <h2 className="text-xl font-bold">Analyse des Annales</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="flex items-center gap-1.5 font-semibold mb-1">
              <CheckCircle className="w-4 h-4" />
              <p>TOUJOURS présent :</p>
            </div>
            <ul className="list-disc ml-4 text-red-100">
              <li>VA 2D continue avec domaine complexe</li>
              <li>Marginales (souvent 2 cas !)</li>
              <li>Conditionnelles et E[X|Y=a]</li>
              <li>Démonstration via φ(t)</li>
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-semibold mb-1">
              <AlertTriangle className="w-4 h-4" />
              <p>TRÈS fréquent :</p>
            </div>
            <ul className="list-disc ml-4 text-orange-100">
              <li>Bayes / Probabilités totales</li>
              <li>Covariance, Variance combinaisons</li>
              <li>Intégrale Beta</li>
              <li>Mode Binomiale/Poisson</li>
            </ul>
          </div>
        </div>
      </div>


      {/* SECTION 1: Probabilités et Bayes */}
      <Section title="Probabilités Conditionnelles & Bayes" icon={Target}>
        <Exercise title="Exercice 1 - Bayes Classique (Usines)" tag="deja-tombe" examRef="Style 2024-2025" defaultOpen={true}>
          <div className="p-3 bg-slate-100/50 dark:bg-white/5 rounded-lg mb-4 text-sm">
            <strong>Énoncé :</strong> Une entreprise a 3 usines. Usine A : 50% production, 2% défauts. Usine B : 30% production, 3% défauts. Usine C : 20% production, 5% défauts.
          </div>

          <Question num="1" question="Calculer P(Défectueux)" tag="deja-tombe">
            <p><strong>Probabilités totales :</strong></p>
            <Formula><M>{"P(D) = P(D|A)P(A) + P(D|B)P(B) + P(D|C)P(C)"}</M></Formula>
            <Formula><M>{"P(D) = 0.02 \\times 0.50 + 0.03 \\times 0.30 + 0.05 \\times 0.20 = 0.029"}</M></Formula>
          </Question>

          <Question num="2" question="P(Usine C | Défectueux) ?" tag="deja-tombe">
            <p><strong>Formule de Bayes :</strong></p>
            <Formula><M>{"P(C|D) = \\frac{P(D|C) \\cdot P(C)}{P(D)} = \\frac{0.05 \\times 0.20}{0.029} = \\boxed{0.345}"}</M></Formula>
            <WarningBox>
              <strong>Piège classique :</strong> Ne pas confondre P(D|C) = 5% avec P(C|D) = 34.5% !
            </WarningBox>
          </Question>
        </Exercise>

        <Exercise title="Exercice 2 - Tableau de contingence (Urbanisme)" tag="deja-tombe" examRef="Examen 2024-2025">
          <div className="p-3 bg-slate-100/50 dark:bg-white/5 rounded-lg mb-4 text-sm overflow-x-auto">
            <table className="w-full text-center text-xs">
              <thead>
                <tr className="border-b"><th className="p-2">Arr.</th><th>1</th><th>2</th><th>3</th><th>4</th></tr>
              </thead>
              <tbody>
                <tr><td className="p-2 font-medium">Population</td><td>15%</td><td>32%</td><td>23%</td><td>30%</td></tr>
                <tr><td className="p-2 font-medium">Favorables</td><td>12%</td><td>31%</td><td>72%</td><td>55%</td></tr>
              </tbody>
            </table>
          </div>

          <Question num="1" question="P(Arr. 3 | Favorable) = ?" tag="deja-tombe">
            <Formula><M>{"P(F) = 0.12(0.15) + 0.31(0.32) + 0.72(0.23) + 0.55(0.30) = 0.4478"}</M></Formula>
            <Formula><M>{"P(A_3|F) = \\frac{0.72 \\times 0.23}{0.4478} = \\boxed{0.37}"}</M></Formula>
          </Question>
        </Exercise>
      </Section>

      {/* SECTION 2: VA Discrètes */}
      <Section title="Variables Aléatoires Discrètes" icon={TrendingUp}>
        <Exercise title="Exercice 3 - Covariance et Variance" tag="deja-tombe" examRef="Examen 2023-2024">
          <div className="p-3 bg-slate-100/50 dark:bg-white/5 rounded-lg mb-4 text-sm">
            <strong>Données :</strong> E[X]=1, V[X]=2, E[Y]=2, V[Y]=3, E[Z]=1, V[Z]=5, Cov(X,Z)=1, Cov(X,Y)=1, Cov(Y,Z)=0
          </div>

          <Question num="1" question={<>E[2X + 3Y - 4Z] = ?</>} tag="deja-tombe">
            <p><strong>Linéarité de l'espérance :</strong></p>
            <Formula><M>{"E[2X + 3Y - 4Z] = 2(1) + 3(2) - 4(1) = \\boxed{4}"}</M></Formula>
          </Question>

          <Question num="2" question={<>V[2X + 3Y - 4Z] = ?</>} tag="deja-tombe">
            <p><strong>Formule complète :</strong></p>
            <Formula><M>{"V[aX + bY + cZ] = a^2V[X] + b^2V[Y] + c^2V[Z] + 2ab\\text{Cov}(X,Y) + 2ac\\text{Cov}(X,Z) + 2bc\\text{Cov}(Y,Z)"}</M></Formula>
            <Formula><M>{"= 4(2) + 9(3) + 16(5) + 2(6)(1) + 2(-8)(1) + 0 = 8 + 27 + 80 + 12 - 16 = \\boxed{111}"}</M></Formula>
            <WarningBox>
              <strong>Attention aux signes !</strong> Avec c = -4, le terme 2ac = 2(2)(-4) = -16, pas +16.
            </WarningBox>
          </Question>

          <Question num="3" question="Cov(4X + 5Y, Y) = ?" tag="tres-probable">
            <Formula><M>{"Cov(aX + bY, Y) = a \\cdot Cov(X,Y) + b \\cdot V[Y] = 4(1) + 5(3) = \\boxed{19}"}</M></Formula>
          </Question>
        </Exercise>

        <Exercise title="Exercice 4 - VA Discrète 2D (Billetterie)" tag="deja-tombe" examRef="Examen 2024-2025">
          <div className="p-3 bg-slate-100/50 dark:bg-white/5 rounded-lg mb-4 text-sm">
            <strong>Contexte :</strong> 4 caisses équiprobables, 2 clients consécutifs indépendants.<br />
            X = nb clients qui choisissent la caisse 1, Y = nb clients qui choisissent la caisse 2.
          </div>

          <Question num="1" question="Loi de X et son mode ?" tag="tres-probable">
            <p><strong>Identification de la loi :</strong></p>
            <p className="text-sm">Chaque client a une proba p = 1/4 de choisir la caisse 1 (4 caisses équiprobables).</p>
            <p className="text-sm">On a n = 2 clients indépendants → <strong>X suit une loi Binomiale B(n=2, p=1/4)</strong></p>

            <p className="mt-3"><strong>Formule de la loi Binomiale :</strong></p>
            <Formula><M>{"P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k} = \\binom{2}{k} \\left(\\frac{1}{4}\\right)^k \\left(\\frac{3}{4}\\right)^{2-k}"}</M></Formula>

            <p className="mt-3"><strong>Calcul détaillé de chaque probabilité :</strong></p>
            <Formula><M>{"P(X=0) = \\binom{2}{0} \\left(\\frac{1}{4}\\right)^0 \\left(\\frac{3}{4}\\right)^2 = 1 \\times 1 \\times \\frac{9}{16} = \\frac{9}{16}"}</M></Formula>
            <Formula><M>{"P(X=1) = \\binom{2}{1} \\left(\\frac{1}{4}\\right)^1 \\left(\\frac{3}{4}\\right)^1 = 2 \\times \\frac{1}{4} \\times \\frac{3}{4} = \\frac{6}{16}"}</M></Formula>
            <Formula><M>{"P(X=2) = \\binom{2}{2} \\left(\\frac{1}{4}\\right)^2 \\left(\\frac{3}{4}\\right)^0 = 1 \\times \\frac{1}{16} \\times 1 = \\frac{1}{16}"}</M></Formula>

            <p className="mt-3"><strong>Mode :</strong> La valeur avec la plus grande probabilité est <strong>X = 0</strong> (P = 9/16)</p>
            <WarningBox>
              <strong>Vérification :</strong> 9/16 + 6/16 + 1/16 = 16/16 = 1 ✓
            </WarningBox>
          </Question>

          <Question num="2" question="E[X|Y=1] = ?" tag="deja-tombe">
            <p><strong>Étape 1 :</strong> Construire le tableau de contingence P(X=i, Y=j)</p>
            <p className="text-sm">Si Y=1, un seul client a choisi la caisse 2. L'autre client a choisi parmi les 3 autres caisses.</p>
            <p className="text-sm">Pour X sachant Y=1 : X peut valoir 0 ou 1 (pas 2, car un client est déjà en caisse 2)</p>

            <p className="mt-2"><strong>Étape 2 :</strong> Calculer P(Y=1)</p>
            <p className="text-sm">Y ~ B(2, 1/4) donc P(Y=1) = 6/16 (même calcul que X)</p>

            <p className="mt-2"><strong>Étape 3 :</strong> Calculer les probabilités conjointes</p>
            <Formula><M>{"P(X=0, Y=1) = \\frac{4}{16} \\quad \\text{(1 client caisse 2, 1 client caisses 3 ou 4)}"}</M></Formula>
            <Formula><M>{"P(X=1, Y=1) = \\frac{2}{16} \\quad \\text{(1 client caisse 1, 1 client caisse 2)}"}</M></Formula>

            <p className="mt-2"><strong>Étape 4 :</strong> Loi conditionnelle</p>
            <Formula><M>{"P(X=0|Y=1) = \\frac{P(X=0, Y=1)}{P(Y=1)} = \\frac{4/16}{6/16} = \\frac{2}{3}"}</M></Formula>
            <Formula><M>{"P(X=1|Y=1) = \\frac{P(X=1, Y=1)}{P(Y=1)} = \\frac{2/16}{6/16} = \\frac{1}{3}"}</M></Formula>

            <p className="mt-2"><strong>Étape 5 :</strong> Espérance conditionnelle</p>
            <Formula><M>{"E[X|Y=1] = 0 \\times \\frac{2}{3} + 1 \\times \\frac{1}{3} = \\boxed{\\frac{1}{3} \\approx 0.333}"}</M></Formula>
          </Question>

          <Question num="3" question="ρ(X,Y) = ?" tag="tres-probable">
            <p><strong>Étape 1 :</strong> Calculer E[X] et E[Y]</p>
            <p className="text-sm">Pour une Binomiale B(n,p) : E[X] = np</p>
            <Formula><M>{"E[X] = E[Y] = 2 \\times \\frac{1}{4} = \\frac{1}{2}"}</M></Formula>

            <p className="mt-2"><strong>Étape 2 :</strong> Calculer V[X] et V[Y]</p>
            <p className="text-sm">Pour une Binomiale B(n,p) : V[X] = np(1-p)</p>
            <Formula><M>{"V[X] = V[Y] = 2 \\times \\frac{1}{4} \\times \\frac{3}{4} = \\frac{3}{8}"}</M></Formula>

            <p className="mt-2"><strong>Étape 3 :</strong> Calculer E[XY]</p>
            <p className="text-sm">Seul cas où XY ≠ 0 : X=1 et Y=1</p>
            <Formula><M>{"E[XY] = \\sum_{i,j} ij \\cdot P(X=i, Y=j) = 1 \\times 1 \\times P(X=1, Y=1) = 1 \\times \\frac{2}{16} = \\frac{1}{8}"}</M></Formula>

            <p className="mt-2"><strong>Étape 4 :</strong> Calculer Cov(X,Y)</p>
            <Formula><M>{"Cov(X,Y) = E[XY] - E[X]E[Y] = \\frac{1}{8} - \\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{8} - \\frac{1}{4} = -\\frac{1}{8}"}</M></Formula>

            <p className="mt-2"><strong>Étape 5 :</strong> Coefficient de corrélation</p>
            <Formula><M>{"\\rho_{XY} = \\frac{Cov(X,Y)}{\\sigma_X \\sigma_Y} = \\frac{-1/8}{\\sqrt{3/8} \\times \\sqrt{3/8}} = \\frac{-1/8}{3/8} = \\boxed{-\\frac{1}{3}}"}</M></Formula>
            <WarningBox>
              <strong>Interprétation :</strong> ρ &lt; 0 → corrélation négative. Si X↑ alors Y↓ (logique : si plus de clients vont en caisse 1, moins vont en caisse 2)
            </WarningBox>
          </Question>

          <Question num="4" question="Borne sup P(Y≥1) par Markov ?" tag="deja-tombe">
            <p><strong>Inégalité de Markov</strong> (pour Y ≥ 0) :</p>
            <Formula><M>{"P(Y \\ge t) \\le \\frac{E[Y]}{t}"}</M></Formula>
            <p className="text-sm">Application avec t = 1 :</p>
            <Formula><M>{"P(Y \\ge 1) \\le \\frac{E[Y]}{1} = \\frac{1/2}{1} = \\boxed{0.5}"}</M></Formula>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">Note : La vraie valeur est P(Y≥1) = P(Y=1) + P(Y=2) = 6/16 + 1/16 = 7/16 ≈ 0.44, bien inférieure à la borne.</p>
          </Question>
        </Exercise>

        <Exercise title="Exercice 5 - Mode Binomiale/Poisson" tag="deja-tombe" examRef="Démonstration exigible">
          <Question num="1" question="Formule du mode de la Binomiale B(n,p)" tag="deja-tombe">
            <Formula><M>{"x_{Mo} = \\lfloor (n+1)p \\rfloor"}</M></Formula>
            <p className="text-sm">Si (n+1)p est entier : deux modes, (n+1)p et (n+1)p - 1</p>
          </Question>

          <Question num="2" question="Mode de Poisson(λ)" tag="tres-probable">
            <p>Si λ entier : deux modes, λ-1 et λ</p>
            <p>Si λ non entier : mode = ⌊λ⌋</p>
          </Question>
        </Exercise>
      </Section>


      {/* SECTION 3: VA Continues */}
      <Section title="Variables Aléatoires Continues" icon={TrendingUp}>
        <Exercise title="Exercice 6 - Intégrale Beta" tag="deja-tombe" examRef="QCM 2024-2025">
          <Question num="1" question={<>Calculer <M>{"\\int_0^1 x^2(1-x)^3 dx"}</M></>} tag="deja-tombe">
            <p><strong>Reconnaissance de la fonction Beta :</strong></p>
            <Formula><M>{"B(p,q) = \\int_0^1 t^{p-1}(1-t)^{q-1} dt = \\frac{\\Gamma(p)\\Gamma(q)}{\\Gamma(p+q)} = \\frac{(p-1)!(q-1)!}{(p+q-1)!}"}</M></Formula>
            <p className="text-sm">Ici : p-1 = 2 → p = 3, q-1 = 3 → q = 4</p>
            <Formula><M>{"B(3,4) = \\frac{2! \\times 3!}{6!} = \\frac{12}{720} = \\boxed{\\frac{1}{60} \\approx 0.017}"}</M></Formula>
            <WarningBox>
              <strong>Méthode rapide :</strong> Identifier p et q, puis utiliser la formule factorielle !
            </WarningBox>
          </Question>
        </Exercise>

        <Exercise title="Exercice 7 - Densité Gaussienne tronquée" tag="deja-tombe" examRef="Examen 2023-2024">
          <div className="p-3 bg-slate-100/50 dark:bg-white/5 rounded-lg mb-4 text-sm">
            <strong>Énoncé :</strong> <M>{"f(x) = k e^{-(x-2)^2/2}"}</M> pour x &gt; 2, 0 ailleurs.
          </div>

          <Question num="1" question="Déterminer k" tag="deja-tombe">
            <p>Changement de variable u = x - 2 :</p>
            <Formula><M>{"k \\int_0^{+\\infty} e^{-u^2/2} du = 1"}</M></Formula>
            <p className="text-sm">Intégrale de Gauss : <M>{"\\int_0^{+\\infty} e^{-u^2/2} du = \\sqrt{\\frac{\\pi}{2}}"}</M></p>
            <Formula><M>{"k = \\sqrt{\\frac{2}{\\pi}} \\approx \\boxed{0.798}"}</M></Formula>
          </Question>

          <Question num="2" question="E[X] = ?" tag="tres-probable">
            <Formula><M>{"E[X] = k \\int_0^{+\\infty} (u+2) e^{-u^2/2} du = k + 2 \\approx \\boxed{2.8}"}</M></Formula>
          </Question>
        </Exercise>

        <Exercise title="Exercice 8 - Densité linéaire moyenne" tag="deja-tombe" examRef="QCM 2024-2025">
          <div className="p-3 bg-slate-100/50 dark:bg-white/5 rounded-lg mb-4 text-sm">
            <strong>Énoncé :</strong> <M>{"f(x) = \\frac{3}{x^4}"}</M> pour x &gt; 1. Calculer la densité linéaire moyenne sur [2,4].
          </div>

          <Question num="1" question="Formule et calcul" tag="deja-tombe">
            <Formula><M>{"\\Delta_{[a,b]} = \\frac{F(b) - F(a)}{b - a} = \\frac{P(a < X < b)}{b - a}"}</M></Formula>
            <Formula><M>{"P(2 < X < 4) = \\int_2^4 \\frac{3}{x^4} dx = \\left[-\\frac{1}{x^3}\\right]_2^4 = \\frac{1}{8} - \\frac{1}{64} = \\frac{7}{64}"}</M></Formula>
            <Formula><M>{"\\Delta_{[2,4]} = \\frac{7/64}{2} = \\boxed{0.055}"}</M></Formula>
          </Question>
        </Exercise>

        <Exercise title="Exercice 9 - Inégalités de Markov et Bienaymé" tag="deja-tombe" examRef="Examen 2024-2025">
          <div className="p-3 bg-slate-100/50 dark:bg-white/5 rounded-lg mb-4 text-sm">
            <strong>Données :</strong> E[X] = 10, V[X] = 4
          </div>

          <Question num="1" question="Borne sup de P(X ≥ 15) par Markov" tag="deja-tombe">
            <Formula><M>{"P(X \\ge t) \\le \\frac{E[X]}{t} \\quad \\text{(si } X \\ge 0\\text{)}"}</M></Formula>
            <Formula><M>{"P(X \\ge 15) \\le \\frac{10}{15} = \\boxed{\\frac{2}{3}}"}</M></Formula>
          </Question>

          <Question num="2" question="Borne sup de P(|X-10| ≥ 3) par Bienaymé" tag="tres-probable">
            <Formula><M>{"P(|X - E[X]| \\ge \\varepsilon) \\le \\frac{V[X]}{\\varepsilon^2}"}</M></Formula>
            <Formula><M>{"P(|X - 10| \\ge 3) \\le \\frac{4}{9} = \\boxed{0.444}"}</M></Formula>
          </Question>
        </Exercise>
      </Section>

      {/* SECTION 4: VA 2D Continues - LE PLUS IMPORTANT */}
      <Section title="VA 2D Continues - PRIORITÉ ABSOLUE" icon={Flame}>
        <div className="bg-red-100 dark:bg-red-950/30 border border-red-300 rounded-lg p-4 mb-6">
          <p className="text-red-800 font-medium">⚠️ Cette section représente ~6 points sur 20 à chaque examen. Maîtrise-la parfaitement !</p>
        </div>

        {/* Rappel méthodologique */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-blue-900 mb-2">📐 MÉTHODOLOGIE - Calcul des intégrales doubles</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p><strong>Méthode 1 - On bloque x :</strong> x est constant, y varie en fonction de x</p>
            <Formula><M>{"\\iint_D f(x,y) \\, dxdy = \\int_{D_{/ox}} \\left[ \\int_{D_{Y/X}} f(x,y) \\, dy \\right] dx"}</M></Formula>
            <p><strong>Méthode 2 - On bloque y :</strong> y est constant, x varie en fonction de y</p>
            <Formula><M>{"\\iint_D f(x,y) \\, dxdy = \\int_{D_{/oy}} \\left[ \\int_{D_{X/Y}} f(x,y) \\, dx \\right] dy"}</M></Formula>
            <p className="mt-2"><strong>Notations :</strong></p>
            <ul className="list-disc ml-4">
              <li><M>{"D_{/ox}"}</M> = domaine marginal de X (valeurs possibles de x)</li>
              <li><M>{"D_{Y/X}"}</M> = domaine conditionnel de Y sachant X (bornes de y quand x est fixé)</li>
            </ul>
          </div>
        </div>

        <Exercise title="Exercice 10 - Domaine parallélogramme (2 cas pour marginale)" tag="deja-tombe" examRef="Examen 2024-2025" defaultOpen={true}>
          <div className="p-3 bg-slate-100/50 dark:bg-white/5 rounded-lg mb-4 text-sm">
            <strong>Énoncé :</strong> <M>{"f(x,y) = k(x+y)"}</M> sur D : y &lt; x &lt; y+1, 0 &lt; y &lt; 1
          </div>

          <Question num="1" question="Tracer le domaine D et identifier les domaines marginaux/conditionnels" tag="deja-tombe">
            <p><strong>Étape 1 : Tracer le domaine</strong></p>
            <p className="text-sm">Les contraintes sont : y &lt; x &lt; y+1 et 0 &lt; y &lt; 1</p>
            <p className="text-sm">Réécrivons : x &gt; y (droite y = x) et x &lt; y+1 (droite y = x-1)</p>
            <div className="bg-slate-100/80 dark:bg-white/5 p-3 rounded font-mono text-xs my-2">
              <pre>{`y
↑
1 ├───────┬───────┐
  │       │ ╱     │  y = x-1
  │   D   │╱      │
  │     ╱ │       │
  │   ╱   │       │  y = x
0 └─╱─────┴───────┴──→ x
  0       1       2`}</pre>
            </div>

            <p className="mt-3"><strong>Étape 2 : Identifier les domaines (méthode "on bloque y")</strong></p>
            <p className="text-sm">Si on fixe y ∈ ]0, 1[, alors x varie de y à y+1</p>
            <ul className="text-sm list-disc ml-4">
              <li><M>{"D_{/oy} = ]0, 1["}</M> (domaine marginal de Y)</li>
              <li><M>{"D_{X/Y} = ]y, y+1["}</M> (domaine conditionnel de X sachant Y)</li>
            </ul>

            <p className="mt-3"><strong>Étape 3 : Identifier les domaines (méthode "on bloque x")</strong></p>
            <p className="text-sm">⚠️ <strong>ATTENTION : Le domaine marginal de X se divise en 2 sous-domaines !</strong></p>
            <ul className="text-sm list-disc ml-4">
              <li><M>{"D_{/ox} = D^1_{/ox} \\cup D^2_{/ox} = ]0, 1] \\cup ]1, 2["}</M></li>
              <li>Si x ∈ ]0, 1] : <M>{"D^1_{Y/X} = ]0, x["}</M> (y varie de 0 à x)</li>
              <li>Si x ∈ ]1, 2[ : <M>{"D^2_{Y/X} = ]x-1, 1["}</M> (y varie de x-1 à 1)</li>
            </ul>
            <WarningBox>
              <strong>C'est LE piège classique !</strong> Quand le domaine n'est pas un rectangle, la marginale peut avoir plusieurs expressions selon les valeurs de la variable.
            </WarningBox>
          </Question>

          <Question num="2" question="Déterminer k pour que f soit une densité" tag="deja-tombe">
            <p><strong>Rappel des propriétés d'une densité :</strong></p>
            <ul className="text-sm list-disc ml-4 mb-2">
              <li>f continue sur D ✓</li>
              <li>f ≥ 0 sur D (ici k &gt; 0 car x+y &gt; 0 sur D) ✓</li>
              <li><M>{"\\iint_D f(x,y) \\, dxdy = 1"}</M></li>
            </ul>

            <p><strong>Calcul (méthode "on bloque y" - plus simple ici) :</strong></p>
            <Formula><M>{"\\int_0^1 \\int_y^{y+1} k(x+y) \\, dx \\, dy = 1"}</M></Formula>

            <p className="text-sm"><strong>Intégrale intérieure</strong> (x varie, y est constant) :</p>
            <Formula><M>{"\\int_y^{y+1} (x+y) \\, dx = \\left[\\frac{x^2}{2} + xy\\right]_y^{y+1}"}</M></Formula>
            <Formula><M>{"= \\frac{(y+1)^2}{2} + (y+1)y - \\frac{y^2}{2} - y^2"}</M></Formula>
            <Formula><M>{"= \\frac{y^2 + 2y + 1}{2} + y^2 + y - \\frac{y^2}{2} - y^2 = y + \\frac{1}{2} + y = 2y + \\frac{1}{2}"}</M></Formula>

            <p className="text-sm mt-2"><strong>Intégrale extérieure :</strong></p>
            <Formula><M>{"k \\int_0^1 \\left(2y + \\frac{1}{2}\\right) dy = k \\left[y^2 + \\frac{y}{2}\\right]_0^1 = k \\left(1 + \\frac{1}{2}\\right) = \\frac{3k}{2} = 1"}</M></Formula>
            <Formula><M>{"\\boxed{k = \\frac{2}{3}}"}</M></Formula>
          </Question>

          <Question num="3" question={<>Loi marginale de X : <M>{"\\{a(x); D_{/ox}\\}"}</M></>} tag="deja-tombe">
            <p><strong>Formule :</strong> <M>{"a(x) = \\int_{D_{Y/X}} f(x,y) \\, dy"}</M></p>
            <WarningBox>
              <strong>DEUX CAS</strong> car <M>{"D_{/ox} = ]0, 1] \\cup ]1, 2["}</M>
            </WarningBox>

            <p className="text-sm font-medium mt-3"><strong>Cas 1 :</strong> ∀x ∈ D¹<sub>/ox</sub> = ]0, 1], on a D¹<sub>Y/X</sub> = ]0, x[</p>
            <Formula><M>{"a_1(x) = \\int_0^x \\frac{2}{3}(x+y) \\, dy = \\frac{2}{3}\\left[xy + \\frac{y^2}{2}\\right]_0^x"}</M></Formula>
            <Formula><M>{"= \\frac{2}{3}\\left(x \\cdot x + \\frac{x^2}{2} - 0\\right) = \\frac{2}{3} \\cdot \\frac{3x^2}{2} = \\boxed{x^2}"}</M></Formula>

            <p className="text-sm font-medium mt-3"><strong>Cas 2 :</strong> ∀x ∈ D²<sub>/ox</sub> = ]1, 2[, on a D²<sub>Y/X</sub> = ]x-1, 1[</p>
            <Formula><M>{"a_2(x) = \\int_{x-1}^1 \\frac{2}{3}(x+y) \\, dy = \\frac{2}{3}\\left[xy + \\frac{y^2}{2}\\right]_{x-1}^1"}</M></Formula>
            <Formula><M>{"= \\frac{2}{3}\\left[\\left(x + \\frac{1}{2}\\right) - \\left(x(x-1) + \\frac{(x-1)^2}{2}\\right)\\right]"}</M></Formula>
            <Formula><M>{"= \\frac{2}{3}\\left[x + \\frac{1}{2} - x^2 + x - \\frac{x^2 - 2x + 1}{2}\\right] = \\boxed{-x^2 + 2x - \\frac{1}{3}}"}</M></Formula>

            <p className="mt-3"><strong>Conclusion - Loi marginale de X :</strong></p>
            <div className="bg-green-100 dark:bg-green-950/30 p-3 rounded text-sm">
              <M>{"a(x) = \\begin{cases} x^2 & \\text{si } x \\in ]0, 1] \\\\ -x^2 + 2x - \\frac{1}{3} & \\text{si } x \\in ]1, 2[ \\\\ 0 & \\text{sinon} \\end{cases}"}</M>
            </div>
          </Question>

          <Question num="4" question={<>Loi conditionnelle de X sachant Y = 1/2</>} tag="deja-tombe">
            <p><strong>Formule :</strong> <M>{"a^*(x) = \\frac{f(x,y)}{b(y)}"}</M> sur <M>{"D_{X/Y}"}</M></p>

            <p className="text-sm mt-2"><strong>Étape 1 :</strong> Déterminer le domaine conditionnel</p>
            <p className="text-sm">Pour y = 1/2, on a <M>{"D_{X/Y=1/2} = ]1/2, 3/2["}</M></p>

            <p className="text-sm mt-2"><strong>Étape 2 :</strong> Calculer b(1/2) (marginale de Y en y = 1/2)</p>
            <Formula><M>{"b(y) = \\int_{D_{X/Y}} f(x,y) \\, dx = \\int_y^{y+1} \\frac{2}{3}(x+y) \\, dx"}</M></Formula>
            <Formula><M>{"b(1/2) = \\int_{1/2}^{3/2} \\frac{2}{3}\\left(x + \\frac{1}{2}\\right) dx = \\frac{2}{3}\\left[\\frac{x^2}{2} + \\frac{x}{2}\\right]_{1/2}^{3/2}"}</M></Formula>
            <Formula><M>{"= \\frac{2}{3}\\left[\\frac{9/4}{2} + \\frac{3/4}{1} - \\frac{1/4}{2} - \\frac{1/4}{1}\\right] = \\frac{2}{3} \\cdot \\frac{3}{2} = 1"}</M></Formula>

            <p className="text-sm mt-2"><strong>Étape 3 :</strong> Calculer la densité conditionnelle</p>
            <Formula><M>{"a^*_{Y=1/2}(x) = \\frac{f(x, 1/2)}{b(1/2)} = \\frac{\\frac{2}{3}(x + \\frac{1}{2})}{1} = \\boxed{\\frac{2x + 1}{3}}"}</M></Formula>
            <p className="text-sm">pour x ∈ ]1/2, 3/2[</p>

            <p className="text-sm mt-2 text-slate-700 dark:text-slate-300"><strong>Vérification :</strong> <M>{"\\int_{1/2}^{3/2} \\frac{2x+1}{3} dx = 1"}</M> ✓</p>
          </Question>

          <Question num="5" question="E[X | Y = 1/2] = ?" tag="deja-tombe">
            <p><strong>Formule :</strong> <M>{"E[X|Y=y] = \\int_{D_{X/Y}} x \\cdot a^*(x) \\, dx"}</M></p>
            <Formula><M>{"E[X|Y=1/2] = \\int_{1/2}^{3/2} x \\cdot \\frac{2x+1}{3} \\, dx = \\frac{1}{3}\\int_{1/2}^{3/2} (2x^2 + x) \\, dx"}</M></Formula>
            <Formula><M>{"= \\frac{1}{3}\\left[\\frac{2x^3}{3} + \\frac{x^2}{2}\\right]_{1/2}^{3/2}"}</M></Formula>
            <Formula><M>{"= \\frac{1}{3}\\left[\\left(\\frac{2 \\cdot 27/8}{3} + \\frac{9/4}{2}\\right) - \\left(\\frac{2 \\cdot 1/8}{3} + \\frac{1/4}{2}\\right)\\right]"}</M></Formula>
            <Formula><M>{"= \\frac{1}{3}\\left[\\frac{9}{4} + \\frac{9}{8} - \\frac{1}{12} - \\frac{1}{8}\\right] = \\frac{1}{3} \\cdot \\frac{19}{6} = \\boxed{\\frac{19}{18} \\approx 1.056}"}</M></Formula>
          </Question>
        </Exercise>

        <Exercise title="Exercice 11 - Domaine type examen (y ≤ x, y ≥ x-c)" tag="deja-tombe" examRef="Examen 2023-2024">
          <div className="p-3 bg-slate-100/50 dark:bg-white/5 rounded-lg mb-4 text-sm">
            <strong>Énoncé :</strong> <M>{"f(x,y) = ke^{-y}"}</M> sur D : y ≤ x, x ≥ 0, y ≥ x-4, y ≥ 0
          </div>

          <Question num="1" question="Tracer le domaine D et identifier tous les domaines" tag="deja-tombe">
            <p><strong>Étape 1 : Analyser les contraintes</strong></p>
            <ul className="text-sm list-disc ml-4">
              <li>y ≤ x → sous la droite y = x</li>
              <li>y ≥ x - 4 → au-dessus de la droite y = x - 4</li>
              <li>y ≥ 0 → au-dessus de l'axe des x</li>
              <li>x ≥ 0 → à droite de l'axe des y</li>
            </ul>

            <div className="bg-slate-100/80 dark:bg-white/5 p-3 rounded font-mono text-xs my-2">
              <pre>{`y
↑
  │         y = x
4 ├───────╱─────────
  │     ╱           
  │   ╱    D        y = x - 4
  │ ╱             ╱
0 └─────────────╱───→ x
  0       4         `}</pre>
            </div>

            <p className="mt-3"><strong>Étape 2 : Domaines marginaux et conditionnels</strong></p>
            <div className="bg-yellow-50 p-3 rounded text-sm">
              <p><strong>Méthode "on bloque y" :</strong></p>
              <ul className="list-disc ml-4">
                <li><M>{"D_{/oy} = [0, +\\infty["}</M></li>
                <li><M>{"D_{X/Y} = [y, y+4]"}</M> (domaine simple, pas de sous-cas)</li>
              </ul>
              <p className="mt-2"><strong>Méthode "on bloque x" :</strong></p>
              <ul className="list-disc ml-4">
                <li><M>{"D_{/ox} = D^1_{/ox} \\cup D^2_{/ox} = [0, 4] \\cup ]4, +\\infty["}</M></li>
                <li>Si x ∈ [0, 4] : <M>{"D^1_{Y/X} = [0, x]"}</M></li>
                <li>Si x ∈ ]4, +∞[ : <M>{"D^2_{Y/X} = [x-4, x]"}</M></li>
              </ul>
            </div>
            <WarningBox>
              <strong>Conseil :</strong> Choisir la méthode où le domaine conditionnel est le plus simple. Ici, "on bloque y" donne un seul cas !
            </WarningBox>
          </Question>

          <Question num="2" question="Déterminer k" tag="deja-tombe">
            <p><strong>Méthode "on bloque y" (plus simple) :</strong></p>
            <Formula><M>{"\\int_0^{+\\infty} \\int_y^{y+4} ke^{-y} \\, dx \\, dy = 1"}</M></Formula>

            <p className="text-sm"><strong>Intégrale intérieure</strong> (x varie, y constant) :</p>
            <Formula><M>{"\\int_y^{y+4} ke^{-y} \\, dx = ke^{-y} \\cdot [x]_y^{y+4} = ke^{-y} \\cdot 4 = 4ke^{-y}"}</M></Formula>

            <p className="text-sm"><strong>Intégrale extérieure :</strong></p>
            <Formula><M>{"\\int_0^{+\\infty} 4ke^{-y} \\, dy = 4k \\cdot [-e^{-y}]_0^{+\\infty} = 4k \\cdot (0 - (-1)) = 4k = 1"}</M></Formula>
            <Formula><M>{"\\boxed{k = \\frac{1}{4}}"}</M></Formula>

            <p className="text-sm mt-2 text-slate-700 dark:text-slate-300"><strong>Vérification f ≥ 0 :</strong> k = 1/4 &gt; 0 et e<sup>-y</sup> &gt; 0 ✓</p>
          </Question>

          <Question num="3" question={<>Loi marginale de X : <M>{"\\{a(x); D_{/ox}\\}"}</M></>} tag="deja-tombe">
            <p><strong>Formule :</strong> <M>{"a(x) = \\int_{D_{Y/X}} f(x,y) \\, dy"}</M></p>

            <p className="text-sm font-medium mt-3"><strong>Cas 1 :</strong> ∀x ∈ [0, 4], D<sup>1</sup><sub>Y/X</sub> = [0, x]</p>
            <Formula><M>{"a_1(x) = \\int_0^x \\frac{1}{4}e^{-y} \\, dy = \\frac{1}{4}[-e^{-y}]_0^x = \\frac{1}{4}(1 - e^{-x})"}</M></Formula>

            <p className="text-sm font-medium mt-3"><strong>Cas 2 :</strong> ∀x ∈ ]4, +∞[, D<sup>2</sup><sub>Y/X</sub> = [x-4, x]</p>
            <Formula><M>{"a_2(x) = \\int_{x-4}^x \\frac{1}{4}e^{-y} \\, dy = \\frac{1}{4}[-e^{-y}]_{x-4}^x"}</M></Formula>
            <Formula><M>{"= \\frac{1}{4}(-e^{-x} + e^{-(x-4)}) = \\frac{1}{4}e^{-x}(e^4 - 1)"}</M></Formula>

            <p className="mt-3"><strong>Conclusion :</strong></p>
            <div className="bg-green-100 dark:bg-green-950/30 p-3 rounded text-sm">
              <M>{"a(x) = \\begin{cases} \\frac{1}{4}(1 - e^{-x}) & \\text{si } x \\in [0, 4] \\\\ \\frac{e^4 - 1}{4}e^{-x} & \\text{si } x \\in ]4, +\\infty[ \\\\ 0 & \\text{sinon} \\end{cases}"}</M>
            </div>
          </Question>

          <Question num="4" question={<>Loi marginale de Y : <M>{"\\{b(y); D_{/oy}\\}"}</M></>} tag="deja-tombe">
            <p><strong>Formule :</strong> <M>{"b(y) = \\int_{D_{X/Y}} f(x,y) \\, dx"}</M></p>
            <p className="text-sm">∀y ∈ [0, +∞[, D<sub>X/Y</sub> = [y, y+4]</p>
            <Formula><M>{"b(y) = \\int_y^{y+4} \\frac{1}{4}e^{-y} \\, dx = \\frac{e^{-y}}{4} \\cdot [x]_y^{y+4} = \\frac{e^{-y}}{4} \\cdot 4 = \\boxed{e^{-y}}"}</M></Formula>
            <p className="text-sm text-slate-700 dark:text-slate-300">C'est une loi exponentielle de paramètre λ = 1 !</p>
          </Question>

          <Question num="5" question="Loi conditionnelle de X sachant Y = 2" tag="deja-tombe">
            <p><strong>Formule :</strong> <M>{"a^*(x) = \\frac{f(x,y)}{b(y)}"}</M> sur D<sub>X/Y</sub></p>
            <p className="text-sm">Pour y = 2 : D<sub>X/Y=2</sub> = [2, 6]</p>
            <Formula><M>{"a^*_{Y=2}(x) = \\frac{f(x, 2)}{b(2)} = \\frac{\\frac{1}{4}e^{-2}}{e^{-2}} = \\boxed{\\frac{1}{4}}"}</M></Formula>
            <p className="text-sm">pour x ∈ [2, 6]</p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">C'est une loi uniforme sur [2, 6] !</p>
          </Question>

          <Question num="6" question="E[X | Y = 2] = ?" tag="deja-tombe">
            <p><strong>Formule :</strong> <M>{"E[X|Y=y] = \\int_{D_{X/Y}} x \\cdot a^*(x) \\, dx"}</M></p>
            <Formula><M>{"E[X|Y=2] = \\int_2^6 x \\cdot \\frac{1}{4} \\, dx = \\frac{1}{4}\\left[\\frac{x^2}{2}\\right]_2^6 = \\frac{1}{4} \\cdot \\frac{36 - 4}{2} = \\frac{1}{4} \\cdot 16 = \\boxed{4}"}</M></Formula>
            <p className="text-sm text-slate-700 dark:text-slate-300">Cohérent avec la loi uniforme : E[U[a,b]] = (a+b)/2 = (2+6)/2 = 4 ✓</p>
          </Question>

          <Question num="7" question="X et Y sont-elles indépendantes ?" tag="tres-probable">
            <p><strong>Méthode graphique :</strong></p>
            <p className="text-sm">Le domaine D n'est PAS un rectangle → <strong>X et Y ne sont PAS indépendantes</strong></p>

            <p className="mt-2"><strong>Méthode analytique (vérification) :</strong></p>
            <p className="text-sm">Il faudrait que f(x,y) = a(x) × b(y) pour tout (x,y) ∈ D</p>
            <p className="text-sm">Or a(x) a deux expressions différentes selon x, donc le produit a(x)×b(y) ne peut pas donner f(x,y) = (1/4)e<sup>-y</sup> qui est uniforme en x.</p>
            <WarningBox>
              <strong>Critère rapide :</strong> Si le domaine conditionnel D<sub>Y/X</sub> dépend de x (ou D<sub>X/Y</sub> dépend de y), alors X et Y ne sont pas indépendantes.
            </WarningBox>
          </Question>
        </Exercise>


        <Exercise title="Exercice 12 - Changement de variable et Jacobien" tag="tres-probable" examRef="TD6 + Annales">
          <div className="p-3 bg-slate-100/50 dark:bg-white/5 rounded-lg mb-4 text-sm">
            <strong>Énoncé :</strong> <M>{"f(x,y) = ke^{-y}"}</M> sur D : 0 &lt; y ≤ x² ≤ 1.<br />
            On pose U = X² et V = Y. Déterminer la loi marginale de U.
          </div>

          <Question num="1" question="Analyser le domaine D original" tag="tres-probable">
            <p><strong>Contraintes :</strong> 0 &lt; y ≤ x² ≤ 1</p>
            <ul className="text-sm list-disc ml-4">
              <li>x² ≤ 1 → -1 ≤ x ≤ 1, mais on prend x &gt; 0 (racine positive)</li>
              <li>y ≤ x² et y &gt; 0</li>
            </ul>
            <div className="bg-slate-100/80 dark:bg-white/5 p-3 rounded font-mono text-xs my-2">
              <pre>{`y
↑
1 ├─────────┐
  │    ╱    │  y = x²
  │  ╱  D   │
  │╱        │
0 └─────────┴──→ x
  0         1`}</pre>
            </div>
            <p className="text-sm">Domaines : D<sub>/ox</sub> = ]0, 1], D<sub>Y/X</sub> = ]0, x²]</p>
          </Question>

          <Question num="2" question="Déterminer k" tag="tres-probable">
            <Formula><M>{"\\int_0^1 \\int_0^{x^2} ke^{-y} \\, dy \\, dx = 1"}</M></Formula>
            <Formula><M>{"k \\int_0^1 [-e^{-y}]_0^{x^2} dx = k \\int_0^1 (1 - e^{-x^2}) dx = 1"}</M></Formula>
            <p className="text-sm">Après calcul numérique : k ≈ 1.89 (ou forme exacte avec fonction erreur)</p>
          </Question>

          <Question num="3" question="Changement de variable : exprimer (X,Y) en fonction de (U,V)" tag="tres-probable">
            <p><strong>Transformation :</strong> U = X² et V = Y</p>
            <Formula><M>{"\\begin{cases} U = X^2 \\\\ V = Y \\end{cases} \\Rightarrow \\begin{cases} X = \\sqrt{U} & \\text{(racine positive)} \\\\ Y = V \\end{cases}"}</M></Formula>
          </Question>

          <Question num="4" question="Calculer le Jacobien" tag="tres-probable">
            <p><strong>Matrice Jacobienne :</strong></p>
            <Formula><M>{"J = \\begin{pmatrix} \\frac{\\partial x}{\\partial u} & \\frac{\\partial x}{\\partial v} \\\\ \\frac{\\partial y}{\\partial u} & \\frac{\\partial y}{\\partial v} \\end{pmatrix} = \\begin{pmatrix} \\frac{1}{2\\sqrt{u}} & 0 \\\\ 0 & 1 \\end{pmatrix}"}</M></Formula>
            <Formula><M>{"\\det(J) = \\frac{1}{2\\sqrt{u}} \\times 1 - 0 = \\frac{1}{2\\sqrt{u}}"}</M></Formula>
            <Formula><M>{"|\\det(J)| = \\boxed{\\frac{1}{2\\sqrt{u}}}"}</M></Formula>
            <WarningBox>
              <strong>Important :</strong> On prend toujours la VALEUR ABSOLUE du déterminant !
            </WarningBox>
          </Question>

          <Question num="5" question="Nouveau domaine Δ" tag="tres-probable">
            <p><strong>Transformation des contraintes :</strong></p>
            <ul className="text-sm list-disc ml-4">
              <li>0 &lt; x ≤ 1 → 0 &lt; √u ≤ 1 → 0 &lt; u ≤ 1</li>
              <li>0 &lt; y ≤ x² → 0 &lt; v ≤ u</li>
            </ul>
            <Formula><M>{"\\boxed{\\Delta: 0 < v \\le u \\le 1}"}</M></Formula>
            <p className="text-sm">Domaines : Δ<sub>/ou</sub> = ]0, 1], Δ<sub>V/U</sub> = ]0, u]</p>
          </Question>

          <Question num="6" question="Densité jointe g(u,v) après changement de variable" tag="tres-probable">
            <p><strong>Formule :</strong> g(u,v) = f(x(u,v), y(u,v)) × |det(J)|</p>
            <Formula><M>{"g(u,v) = ke^{-v} \\times \\frac{1}{2\\sqrt{u}} = \\boxed{\\frac{ke^{-v}}{2\\sqrt{u}}}"}</M></Formula>
          </Question>

          <Question num="7" question="Loi marginale de U" tag="tres-probable">
            <p><strong>Formule :</strong> <M>{"a(u) = \\int_{\\Delta_{V/U}} g(u,v) \\, dv"}</M></p>
            <p className="text-sm">∀u ∈ ]0, 1], Δ<sub>V/U</sub> = ]0, u]</p>
            <Formula><M>{"a(u) = \\int_0^u \\frac{ke^{-v}}{2\\sqrt{u}} \\, dv = \\frac{k}{2\\sqrt{u}} \\int_0^u e^{-v} \\, dv"}</M></Formula>
            <Formula><M>{"= \\frac{k}{2\\sqrt{u}} [-e^{-v}]_0^u = \\frac{k}{2\\sqrt{u}} (1 - e^{-u})"}</M></Formula>
            <Formula><M>{"\\boxed{a(u) = \\frac{k(1 - e^{-u})}{2\\sqrt{u}}} \\quad \\text{pour } u \\in ]0, 1]"}</M></Formula>
          </Question>
        </Exercise>

        <Exercise title="Exercice 13 - Synthèse : Indépendance et critères" tag="tres-probable" examRef="Méthode classique">
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-bold text-blue-900 mb-2">📋 Critères d'indépendance entre X et Y</h4>
            <div className="text-sm text-blue-800">
              <p><strong>X et Y sont indépendantes si et seulement si :</strong></p>
              <ol className="list-decimal ml-4 mt-2 space-y-1">
                <li>f(x,y) = a(x) × b(y) (la densité jointe est le produit des marginales)</li>
                <li>a*(x) = a(x) (la conditionnelle égale la marginale)</li>
                <li>b*(y) = b(y) (la conditionnelle égale la marginale)</li>
                <li>D<sub>X/Y</sub> = D<sub>/ox</sub> (le domaine conditionnel ne dépend pas de y)</li>
                <li>D<sub>Y/X</sub> = D<sub>/oy</sub> (le domaine conditionnel ne dépend pas de x)</li>
                <li><strong>Le domaine D est un rectangle</strong> : D = D<sub>/ox</sub> × D<sub>/oy</sub></li>
              </ol>
            </div>
          </div>

          <Question num="1" question="Méthode graphique rapide" tag="tres-probable">
            <p><strong>Règle :</strong> Si le domaine D n'est PAS un rectangle (ou carré), alors X et Y ne sont PAS indépendantes.</p>
            <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
              <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded">
                <p className="font-medium text-green-800">✓ Rectangle → Possible indépendance</p>
                <div className="bg-white dark:bg-slate-900/80 p-2 rounded font-mono text-xs mt-2">
                  <pre>{`y
↑
b ├─────────┐
  │    D    │
a ├─────────┘
  └─────────→ x
    c       d`}</pre>
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded">
                <p className="font-medium text-red-800">✗ Triangle → Pas indépendantes</p>
                <div className="bg-white dark:bg-slate-900/80 p-2 rounded font-mono text-xs mt-2">
                  <pre>{`y
↑
  │     ╱
  │   ╱ D
  │ ╱
  └───────→ x`}</pre>
                </div>
              </div>
            </div>
          </Question>

          <Question num="2" question="Méthode analytique" tag="tres-probable">
            <p><strong>Vérifier que f(x,y) = a(x) × b(y)</strong></p>
            <WarningBox>
              <strong>Piège :</strong> Même si f(x,y) se factorise en g(x) × h(y), cela ne suffit pas ! Il faut aussi que le domaine soit un rectangle.
            </WarningBox>
            <p className="text-sm mt-2"><strong>Exemple :</strong> f(x,y) = 2 sur D : 0 ≤ y ≤ x ≤ 1</p>
            <p className="text-sm">f(x,y) = 2 = 1 × 2 se factorise, mais D est un triangle → X et Y ne sont PAS indépendantes.</p>
          </Question>
        </Exercise>
      </Section>

      {/* SECTION 5: Démonstrations */}
      <Section title="Démonstrations via Fonction Caractéristique" icon={Target}>
        <Exercise title="Exercice 14 - E[X] pour Poisson via φ(t)" tag="deja-tombe" examRef="Examen 2023-2024" defaultOpen={true}>
          <Question num="1" question="Démontrer E[X] = λ pour X ~ Poisson(λ)" tag="deja-tombe">
            <p><strong>Étape 1 :</strong> Fonction caractéristique de Poisson(λ)</p>
            <Formula><M>{"\\varphi_X(t) = e^{\\lambda(e^{it}-1)}"}</M></Formula>

            <p><strong>Étape 2 :</strong> Dériver</p>
            <Formula><M>{"\\varphi'_X(t) = \\lambda i e^{it} \\cdot e^{\\lambda(e^{it}-1)}"}</M></Formula>

            <p><strong>Étape 3 :</strong> Évaluer en t = 0</p>
            <Formula><M>{"\\varphi'_X(0) = \\lambda i \\cdot 1 \\cdot e^0 = \\lambda i"}</M></Formula>

            <p><strong>Étape 4 :</strong> Conclure</p>
            <Formula><M>{"E[X] = \\frac{\\varphi'_X(0)}{i} = \\frac{\\lambda i}{i} = \\boxed{\\lambda}"}</M></Formula>
          </Question>
        </Exercise>

        <Exercise title="Exercice 15 - V[X] via φ(t)" tag="deja-tombe" examRef="Examen 2024-2025">
          <Question num="1" question="Formule de la variance via fonction caractéristique" tag="deja-tombe">
            <p><strong>Rappels :</strong></p>
            <ul className="text-sm list-disc ml-4">
              <li><M>{"\\varphi'_X(0) = i E[X]"}</M></li>
              <li><M>{"\\varphi''_X(0) = i^2 E[X^2] = -E[X^2]"}</M></li>
            </ul>

            <p className="mt-3"><strong>Formule :</strong></p>
            <Formula><M>{"V(X) = E[X^2] - (E[X])^2 = -\\varphi''_X(0) - \\left(\\frac{\\varphi'_X(0)}{i}\\right)^2"}</M></Formula>

            <p><strong>Simplification :</strong></p>
            <Formula><M>{"\\boxed{V(X) = -\\varphi''_X(0) + (\\varphi'_X(0))^2}"}</M></Formula>
          </Question>
        </Exercise>

        <Exercise title="Exercice 16 - Identifier une loi via moments factoriels" tag="deja-tombe" examRef="Examen 2024-2025">
          <div className="p-3 bg-slate-100/50 dark:bg-white/5 rounded-lg mb-4 text-sm">
            <strong>Énoncé :</strong> On connaît μ₍ₖ₎ = 3ᵏ. Identifier la loi de X.
          </div>

          <Question num="1" question="Reconstruction de G_X(u)" tag="deja-tombe">
            <p><strong>Rappel :</strong> <M>{"G_X(u) = \\sum_{k=0}^{\\infty} \\frac{(u-1)^k}{k!} \\mu_{[k]}"}</M></p>
            <Formula><M>{"G_X(u) = \\sum_{k=0}^{\\infty} \\frac{(u-1)^k}{k!} \\cdot 3^k = \\sum_{k=0}^{\\infty} \\frac{(3(u-1))^k}{k!} = e^{3(u-1)}"}</M></Formula>
            <p className="text-sm">C'est la fonction génératrice de <strong>Poisson(λ=3)</strong> !</p>
            <Formula><M>{"\\boxed{X \\sim \\mathcal{P}(3)}"}</M></Formula>
          </Question>
        </Exercise>
      </Section>

      {/* Récapitulatif final */}
      <div className="mt-12 p-6 bg-linear-to-br from-red-50 to-orange-50 rounded-xl border border-red-200">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Flame className="w-6 h-6 text-red-600" />
          Checklist Dernière Minute
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-white dark:bg-slate-900/80 rounded-lg">
            <h3 className="font-semibold text-red-700 mb-2">🔴 À SAVOIR PAR CŒUR</h3>
            <ul className="space-y-1 text-slate-800 dark:text-slate-200">
              <li>✓ Formule de Bayes</li>
              <li>✓ V[aX + bY + cZ] avec covariances</li>
              <li>✓ Intégrale Beta : B(p,q) = (p-1)!(q-1)!/(p+q-1)!</li>
              <li>✓ Mode Binomiale : ⌊(n+1)p⌋</li>
              <li>✓ Jacobien 2×2</li>
              <li>✓ E[X] Poisson via φ(t)</li>
            </ul>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900/80 rounded-lg">
            <h3 className="font-semibold text-orange-700 mb-2">⚠️ PIÈGES À ÉVITER</h3>
            <ul className="space-y-1 text-slate-800 dark:text-slate-200">
              <li>✗ Oublier les 2 cas pour f_X(x)</li>
              <li>✗ Confondre P(A|B) et P(B|A)</li>
              <li>✗ Oublier |J| (valeur absolue)</li>
              <li>✗ Mauvaises bornes d'intégration</li>
              <li>✗ Dire "indépendantes" sans vérifier le domaine</li>
              <li>✗ Oublier de vérifier ∫f = 1</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-lg font-medium text-slate-900 dark:text-white mb-2">Tu vas gérer ! 💪</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">Concentre-toi sur les exercices 🔴 et 🟠 en priorité.</p>
      </div>
    </main>
  );
}

export default RevisionIntensive;
