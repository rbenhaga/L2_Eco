import { useState } from 'react';
import { Zap, Target, AlertTriangle, CheckCircle, Clock, BookOpen, ChevronDown, ChevronRight } from 'lucide-react';
import { Math as MathDisplay } from '../../../../components';

function M({ children }: { children: string }) {
  return <MathDisplay>{children}</MathDisplay>;
}

function Formula({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="my-3 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 rounded-lg overflow-x-auto">
      {label && <p className="text-xs text-blue-600 font-medium mb-1">{label}</p>}
      <div className="text-center">{children}</div>
    </div>
  );
}

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Section({ title, icon, color, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-3 p-4 rounded-xl border ${color} transition-all text-left hover:shadow-md`}
      >
        {open ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        {icon}
        <span className="font-semibold flex-1">{title}</span>
      </button>
      {open && (
        <div className="mt-2 p-4 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl">
          {children}
        </div>
      )}
    </div>
  );
}

function QuestionCours({ num, question, answer, trap }: { num: number; question: string; answer: string; trap?: string }) {
  return (
    <div className="mb-4 p-4 bg-slate-100/50 dark:bg-white/5 rounded-lg border-l-4 border-emerald-500">
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-7 h-7 bg-emerald-600 dark:bg-emerald-950/30 text-white rounded-full flex items-center justify-center text-sm font-bold">
          {num}
        </span>
        <div className="flex-1">
          <p className="font-medium text-slate-900 dark:text-white mb-2">{question}</p>
          <p className="text-emerald-700 font-semibold">✓ {answer}</p>
          {trap && (
            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle size={14} /> Piège : {trap}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function FicheExpress() {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-sm text-red-600 mb-3 font-medium">
          <Zap className="w-4 h-4" />
          <span>RÉVISION EXPRESS • 30 MIN</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Fiche Partiel CM</h1>
        <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
          Basée sur les examens 2020, 2022, 2025. Uniquement ce qui tombe VRAIMENT au partiel.
        </p>
      </div>

      {/* Timer suggestion */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 rounded-xl p-4 mb-8 flex items-center gap-3">
        <Clock className="w-5 h-5 text-amber-600 shrink-0" />
        <div>
          <p className="font-medium text-amber-800">Temps recommandé : 30 min</p>
          <p className="text-sm text-amber-700">15 min questions de cours + 15 min méthodes exercices</p>
        </div>
      </div>

      {/* Questions de cours */}
      <Section
        title="Les 6 Questions de Cours (6 pts)"
        icon={<BookOpen className="w-5 h-5" />}
        color="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 text-emerald-800"
        defaultOpen={true}
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">Ces questions reviennent CHAQUE ANNÉE. Apprends les réponses par cœur.</p>

        <QuestionCours
          num={1}
          question="Quand une firme ferme-t-elle à court terme ?"
          answer="Quand P < CVM (coût variable moyen minimum)"
          trap="Ce n'est PAS P < CM ! CM c'est pour le long terme."
        />

        <QuestionCours
          num={2}
          question="Qu'est-ce qu'un duopole de Cournot ?"
          answer="Les firmes choisissent leurs QUANTITÉS, simultanément et indépendamment"
          trap="Bertrand = prix, Stackelberg = séquentiel, Cartel = coopération"
        />

        <QuestionCours
          num={3}
          question="Effet d'une hausse de salaire sur l'offre de travail ?"
          answer="AMBIGU : ES pousse à travailler plus, ER pousse à travailler moins"
          trap="Ne jamais dire 'le travail augmente forcément'"
        />

        <QuestionCours
          num={4}
          question="Pourquoi le monopole est-il inefficace ?"
          answer="Il produit MOINS que l'optimum social et crée une PERTE SÈCHE"
        />

        <QuestionCours
          num={5}
          question="Qu'est-ce que le TMS ?"
          answer="Quantité de bien 2 qu'on sacrifie pour 1 unité de bien 1 (= Um₁/Um₂)"
        />

        <QuestionCours
          num={6}
          question="Courbe d'offre de long terme ?"
          answer="Partie croissante du Cm au-dessus du CM minimum"
          trap="À CT c'est au-dessus du CVM, pas du CM"
        />

        <div className="mt-4 p-3 bg-slate-100/80 dark:bg-white/5 rounded-lg">
          <p className="font-semibold text-slate-900 dark:text-white mb-2">📊 Tableau des seuils (à connaître !)</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-300 dark:border-white/15">
                <th className="text-left py-2">Horizon</th>
                <th className="text-left py-2">Seuil</th>
                <th className="text-left py-2">Condition fermeture</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200 dark:border-white/10">
                <td className="py-2 font-medium">Court terme</td>
                <td className="py-2">min CVM</td>
                <td className="py-2">P {'<'} CVM</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Long terme</td>
                <td className="py-2">min CM</td>
                <td className="py-2">P {'<'} CM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Exercice Travail-Loisir */}
      <Section
        title="Exercice Type : Travail-Loisir (7 pts)"
        icon={<Target className="w-5 h-5" />}
        color="bg-blue-50 dark:bg-blue-950/30 border-blue-200 text-blue-800"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">Fonction classique : <M>{"U(C, L) = C + 2\\sqrt{L}"}</M></p>

        <div className="space-y-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <p className="font-semibold text-blue-800 mb-2">Étape 1 : Utilité marginale du loisir</p>
            <Formula><M>{"Um_L = \\frac{\\partial U}{\\partial L} = \\frac{1}{\\sqrt{L}}"}</M></Formula>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <p className="font-semibold text-blue-800 mb-2">Étape 2 : TMS</p>
            <Formula><M>{"TMS = \\frac{Um_L}{Um_C} = \\frac{1/\\sqrt{L}}{1} = \\frac{1}{\\sqrt{L}}"}</M></Formula>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <p className="font-semibold text-blue-800 mb-2">Étape 3 : Condition d'équilibre</p>
            <Formula><M>{"TMS = w \\quad \\Rightarrow \\quad \\frac{1}{\\sqrt{L}} = w \\quad \\Rightarrow \\quad L^* = \\frac{1}{w^2}"}</M></Formula>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200">
            <p className="font-semibold text-amber-800 mb-2">⚠️ Question piège : "Le travail augmente-t-il si w augmente ?"</p>
            <p className="text-amber-900">Réponse : <strong>AMBIGU</strong> (ES et ER de sens opposés)</p>
            <p className="text-sm text-amber-700 mt-1">Mais si on peut calculer : L = 1/w² → si w↑, L↓ → donc travail↑</p>
          </div>
        </div>
      </Section>

      {/* Exercice Monopole */}
      <Section
        title="Exercice Type : Monopole (7 pts)"
        icon={<Target className="w-5 h-5" />}
        color="bg-purple-50 dark:bg-purple-950/30 border-purple-200 text-purple-800"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">Données classiques : <M>{"P = a - bQ"}</M>, <M>{"CT = cQ^2 + d"}</M></p>

        <div className="space-y-4">
          <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <p className="font-semibold text-purple-800 mb-2">Étape 1 : Recette marginale (PENTE DOUBLE !)</p>
            <Formula><M>{"RT = P \\times Q = (a - bQ)Q = aQ - bQ^2"}</M></Formula>
            <Formula label="⚠️ Formule clé"><M>{"Rm = a - 2bQ"}</M></Formula>
          </div>

          <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <p className="font-semibold text-purple-800 mb-2">Étape 2 : Coût marginal</p>
            <Formula><M>{"Cm = \\frac{dCT}{dQ}"}</M></Formula>
          </div>

          <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <p className="font-semibold text-purple-800 mb-2">Étape 3 : Quantité monopole</p>
            <Formula label="Condition d'équilibre"><M>{"Rm = Cm \\quad \\Rightarrow \\quad \\text{résoudre pour } Q^*"}</M></Formula>
          </div>

          <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <p className="font-semibold text-purple-800 mb-2">Étape 4 : Prix monopole</p>
            <Formula><M>{"P^* = a - bQ^* \\quad \\text{(remplacer dans la demande)}"}</M></Formula>
          </div>

          <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <p className="font-semibold text-purple-800 mb-2">Étape 5 : Surplus consommateur</p>
            <Formula label="Triangle sous la demande"><M>{"SC = \\frac{1}{2} \\times (P_{max} - P^*) \\times Q^*"}</M></Formula>
            <p className="text-sm text-purple-700">où P<sub>max</sub> = a (prix quand Q = 0)</p>
          </div>

          <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <p className="font-semibold text-purple-800 mb-2">Étape 6 : Optimum social (CPP)</p>
            <Formula><M>{"P = Cm \\quad \\Rightarrow \\quad a - bQ = Cm \\quad \\Rightarrow \\quad Q_{social}"}</M></Formula>
          </div>
        </div>

        {/* Exemple concret */}
        <div className="mt-6 p-4 bg-slate-100/50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
          <p className="font-bold text-slate-900 dark:text-white mb-3">📝 Exemple Exam 2025</p>
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3"><M>{"P = 120 - 3Q"}</M>, <M>{"CT = Q^2 + 20"}</M></p>
          <div className="space-y-2 text-sm">
            <p><strong>Rm</strong> = 120 - 6Q</p>
            <p><strong>Cm</strong> = 2Q</p>
            <p><strong>Rm = Cm</strong> → 120 - 6Q = 2Q → <strong>Q* = 15</strong></p>
            <p><strong>P*</strong> = 120 - 45 = <strong>75</strong></p>
            <p><strong>SC</strong> = ½ × (120 - 75) × 15 = <strong>337.5</strong></p>
            <p><strong>Optimum</strong> : 120 - 3Q = 2Q → Q = 24, P = 48</p>
          </div>
        </div>
      </Section>

      {/* Formules essentielles */}
      <Section
        title="Formules Essentielles"
        icon={<Zap className="w-5 h-5" />}
        color="bg-rose-50 border-rose-200 text-rose-800"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-rose-50 rounded-xl border border-rose-200">
            <p className="font-semibold text-rose-800 mb-2">Cobb-Douglas (α + β = 1)</p>
            <Formula><M>{"x_1^* = \\frac{\\alpha R}{p_1}"}</M></Formula>
            <Formula><M>{"x_2^* = \\frac{\\beta R}{p_2}"}</M></Formula>
          </div>

          <div className="p-4 bg-rose-50 rounded-xl border border-rose-200">
            <p className="font-semibold text-rose-800 mb-2">Surplus (triangle)</p>
            <Formula><M>{"SC = \\frac{1}{2} \\times base \\times hauteur"}</M></Formula>
          </div>

          <div className="p-4 bg-rose-50 rounded-xl border border-rose-200">
            <p className="font-semibold text-rose-800 mb-2">Élasticité</p>
            <Formula><M>{"\\varepsilon = \\frac{\\Delta Q / Q}{\\Delta P / P}"}</M></Formula>
          </div>

          <div className="p-4 bg-rose-50 rounded-xl border border-rose-200">
            <p className="font-semibold text-rose-800 mb-2">Indice de Lerner</p>
            <Formula><M>{"L = \\frac{P - Cm}{P} = \\frac{1}{|\\varepsilon|}"}</M></Formula>
          </div>
        </div>
      </Section>

      {/* Pièges à éviter */}
      <Section
        title="⚠️ Pièges Classiques"
        icon={<AlertTriangle className="w-5 h-5" />}
        color="bg-red-50 dark:bg-red-950/30 border-red-200 text-red-800"
        defaultOpen={false}
      >
        <ol className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="shrink-0 w-6 h-6 bg-red-100 dark:bg-red-950/30 text-red-700 rounded-full flex items-center justify-center text-sm font-bold">1</span>
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Offre LT ≠ Offre CT</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">CT : Cm au-dessus de CVM | LT : Cm au-dessus de CM</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="shrink-0 w-6 h-6 bg-red-100 dark:bg-red-950/30 text-red-700 rounded-full flex items-center justify-center text-sm font-bold">2</span>
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Rm ≠ P en monopole</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">En CPP : Rm = P | En monopole : Rm {'<'} P (pente double)</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="shrink-0 w-6 h-6 bg-red-100 dark:bg-red-950/30 text-red-700 rounded-full flex items-center justify-center text-sm font-bold">3</span>
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Cournot = quantités, Bertrand = prix</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">Ne pas confondre !</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="shrink-0 w-6 h-6 bg-red-100 dark:bg-red-950/30 text-red-700 rounded-full flex items-center justify-center text-sm font-bold">4</span>
            <div>
              <p className="font-medium text-slate-900 dark:text-white">ES et ER opposés pour le travail</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">Ne jamais dire "le travail augmente forcément"</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="shrink-0 w-6 h-6 bg-red-100 dark:bg-red-950/30 text-red-700 rounded-full flex items-center justify-center text-sm font-bold">5</span>
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Quasi-linéaire : demande indépendante du revenu</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">U = x₁ + f(x₂) → x₂* ne dépend pas de R</p>
            </div>
          </li>
        </ol>
      </Section>

      {/* Checklist */}
      <div className="mt-8 p-6 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200">
        <h3 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" /> Checklist avant l'exam
        </h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            { id: 'rm', label: 'Je sais calculer Rm (pente × 2)' },
            { id: 'seuils', label: 'Je connais CVM vs CM pour les seuils' },
            { id: 'cournot', label: 'Cournot = quantités simultanées' },
            { id: 'travail', label: 'ES et ER opposés pour le travail' },
            { id: 'surplus', label: 'Surplus = ½ × base × hauteur' },
            { id: 'cobb', label: 'Formules Cobb-Douglas par cœur' },
          ].map(item => (
            <label key={item.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist[item.id] || false}
                onChange={() => toggleCheck(item.id)}
                className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className={`text-sm ${checklist[item.id] ? 'text-emerald-700 line-through' : 'text-emerald-900'}`}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Résumé ultra-condensé */}
      <div className="mt-8 p-6 bg-gray-900 rounded-xl text-white">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" /> Résumé Ultra-Condensé
        </h3>
        <div className="font-mono text-sm space-y-2 text-slate-400 dark:text-slate-600">
          <p><span className="text-emerald-400">SEUILS:</span> CT → P {'<'} CVM ferme | LT → P {'<'} CM sort</p>
          <p><span className="text-blue-400">COURNOT:</span> quantités, simultané, indépendant</p>
          <p><span className="text-purple-400">TRAVAIL:</span> ES↑ vs ER↓ → AMBIGU</p>
          <p><span className="text-rose-400">MONOPOLE:</span> Rm = Cm (pas P = Cm !)</p>
          <p><span className="text-amber-400">DEMANDE:</span> P = a - bQ → Rm = a - 2bQ</p>
          <p><span className="text-cyan-400">SURPLUS:</span> SC = ½(Pmax - P*)Q*</p>
          <p><span className="text-pink-400">COBB-DOUGLAS:</span> x₁* = αR/p₁</p>
        </div>
      </div>

      <p className="text-center text-slate-600 dark:text-slate-400 mt-8">Bonne chance ! 🍀</p>
    </main>
  );
}
