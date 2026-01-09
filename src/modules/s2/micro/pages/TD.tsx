import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, FileText, ArrowLeft, Star, BookOpen } from 'lucide-react';
import { Math } from '../../../../components';

type Difficulty = 1 | 2 | 3;

interface Exercise {
  id: string;
  title: string;
  content: React.ReactNode;
  solution: React.ReactNode;
  difficulty?: Difficulty;
  tags?: string[];
}

interface TDSheet {
  id: string;
  number: number;
  title: string;
  chapter: string;
  description: string;
  exercises: Exercise[];
  reminders?: { title: string; formula: string }[];
}

function DifficultyStars({ level }: { level: Difficulty }) {
  const colors = { 1: 'text-green-500', 2: 'text-amber-500', 3: 'text-red-500' };
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map((i) => (
        <Star key={i} size={14} className={i <= level ? colors[level] : 'text-slate-300 dark:text-slate-700'} fill={i <= level ? 'currentColor' : 'none'} />
      ))}
    </div>
  );
}

function SkillTags({ tags }: { tags: string[] }) {
  const tagColors: Record<string, string> = {
    'Lagrangien': 'bg-purple-100 dark:bg-purple-950/30 text-purple-700',
    'TMS': 'bg-blue-100 dark:bg-blue-950/30 text-blue-700',
    'Cobb-Douglas': 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700',
    'Demande Marshallienne': 'bg-rose-100 text-rose-700',
    'Élasticité': 'bg-amber-100 dark:bg-amber-950/30 text-amber-700',
    'Surplus': 'bg-indigo-100 text-indigo-700',
    'Équilibre': 'bg-cyan-100 text-cyan-700',
    'Slutsky': 'bg-pink-100 text-pink-700',
    'Travail-Loisir': 'bg-orange-100 text-orange-700',
    'Intertemporel': 'bg-teal-100 text-teal-700',
  };
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span key={tag} className={`px-2 py-0.5 rounded-full text-xs font-medium ${tagColors[tag] || 'bg-slate-100/80 dark:bg-white/5 text-slate-700 dark:text-slate-300'}`}>
          {tag}
        </span>
      ))}
    </div>
  );
}

function CourseReminders({ td }: { td: TDSheet }) {
  const [isOpen, setIsOpen] = useState(false);
  if (!td.reminders || td.reminders.length === 0) return null;
  return (
    <div className="mb-8 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-100/50 dark:bg-white/5 transition-colors">
        <div className="flex items-center gap-3">
          <BookOpen size={18} className="text-slate-500 dark:text-slate-500" />
          <span className="font-medium text-slate-900 dark:text-white">Rappels de cours</span>
          <span className="text-sm text-slate-500 dark:text-slate-500">{td.reminders.length}</span>
        </div>
        <ChevronDown size={16} className={`text-slate-500 dark:text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <div className="grid gap-4 sm:grid-cols-2 pt-4">
            {td.reminders.map((reminder, i) => (
              <div key={i} className="space-y-1">
                <div className="text-xs text-slate-600 dark:text-slate-400">{reminder.title}</div>
                <div className="text-slate-900 dark:text-white text-sm"><Math>{reminder.formula}</Math></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const [showSolution, setShowSolution] = useState(false);
  return (
    <div className="mb-6 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden bg-white dark:bg-slate-900/80 shadow-sm">
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3">
            <span className="shrink-0 w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 flex items-center justify-center">
              <FileText size={18} />
            </span>
            <h4 className="font-semibold text-slate-900 dark:text-white text-lg leading-tight">{exercise.title}</h4>
          </div>
          {exercise.difficulty && <DifficultyStars level={exercise.difficulty} />}
        </div>
        {exercise.tags && exercise.tags.length > 0 && (
          <div className="pl-11 mb-4"><SkillTags tags={exercise.tags} /></div>
        )}
        <div className="text-slate-800 dark:text-slate-200 leading-relaxed pl-11">{exercise.content}</div>
      </div>
      <button onClick={() => setShowSolution(!showSolution)} className="w-full px-6 py-4 flex items-center justify-center gap-2 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-950/30 transition-colors border-t border-gray-100">
        <CheckCircle2 size={18} />
        <span className="font-medium">{showSolution ? 'Masquer la correction' : 'Voir la correction'}</span>
        {showSolution ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {showSolution && (
        <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30 border-t border-emerald-200">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={20} className="text-emerald-600" />
            <span className="font-semibold text-emerald-800">Correction détaillée</span>
          </div>
          <div className="text-emerald-900 leading-relaxed">{exercise.solution}</div>
        </div>
      )}
    </div>
  );
}

const tdSheets: TDSheet[] = [
  {
    id: 'td1',
    number: 1,
    title: 'Théorie du Consommateur',
    chapter: 'Chapitre 0',
    description: 'Contrainte budgétaire, préférences, TMS, équilibre du consommateur',
    reminders: [
      { title: 'Contrainte budgétaire', formula: 'p_1 x_1 + p_2 x_2 = R' },
      { title: 'TMS', formula: 'TMS_{1,2} = \\frac{Um_1}{Um_2} = \\frac{p_1}{p_2}' },
      { title: 'Demande Cobb-Douglas', formula: 'x_1^* = \\frac{\\alpha R}{(\\alpha + \\beta) p_1}' },
    ],
    exercises: [
      {
        id: 'td1-ex1',
        title: 'Exercice 1 : Fonction Cobb-Douglas',
        difficulty: 2,
        tags: ['Lagrangien', 'Cobb-Douglas', 'Demande Marshallienne'],
        content: (
          <div className="space-y-3">
            <p>Un consommateur a pour fonction d'utilité <Math>U(x_1, x_2) = x_1^\alpha x_2^\beta</Math> avec <Math>\alpha + \beta = 1</Math>.</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Déterminer les fonctions de demande Marshalliennes <Math>x_1^*(p, R)</Math> et <Math>x_2^*(p, R)</Math>.</li>
              <li>Montrer que les biens sont normaux.</li>
              <li>Donner l'expression du sentier d'expansion.</li>
            </ol>
          </div>
        ),
        solution: (
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">1. Demandes Marshalliennes :</p>
              <p>On maximise <Math>{'U = x_1^\\alpha x_2^\\beta'}</Math> sous <Math>{'p_1 x_1 + p_2 x_2 = R'}</Math>.</p>
              <p className="mt-2">Lagrangien : <Math>{'\\mathcal{L} = x_1^\\alpha x_2^\\beta + \\lambda(R - p_1 x_1 - p_2 x_2)'}</Math></p>
              <p className="mt-2">CPO : <Math>{'\\frac{\\partial \\mathcal{L}}{\\partial x_1} = \\alpha x_1^{\\alpha-1} x_2^\\beta - \\lambda p_1 = 0'}</Math></p>
              <p><Math>{'\\frac{\\partial \\mathcal{L}}{\\partial x_2} = \\beta x_1^\\alpha x_2^{\\beta-1} - \\lambda p_2 = 0'}</Math></p>
              <p className="mt-2">En divisant : <Math>{'\\frac{\\alpha x_2}{\\beta x_1} = \\frac{p_1}{p_2}'}</Math> → <Math>{'x_2 = \\frac{\\beta p_1}{\\alpha p_2} x_1'}</Math></p>
              <p className="mt-2">En substituant dans la contrainte :</p>
              <p className="mt-1 p-2 bg-white dark:bg-slate-900/80 rounded"><Math>{'x_1^* = \\frac{\\alpha R}{(\\alpha + \\beta) p_1} = \\frac{\\alpha R}{p_1}'}</Math></p>
              <p className="mt-1 p-2 bg-white dark:bg-slate-900/80 rounded"><Math>{'x_2^* = \\frac{\\beta R}{(\\alpha + \\beta) p_2} = \\frac{\\beta R}{p_2}'}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">2. Biens normaux :</p>
              <p><Math>{'\\frac{\\partial x_1^*}{\\partial R} = \\frac{\\alpha}{p_1} > 0'}</Math> et <Math>{'\\frac{\\partial x_2^*}{\\partial R} = \\frac{\\beta}{p_2} > 0'}</Math></p>
              <p>Les deux dérivées sont positives, donc les biens sont normaux.</p>
            </div>
            <div>
              <p className="font-medium mb-2">3. Sentier d'expansion :</p>
              <p><Math>{'\\frac{x_2^*}{x_1^*} = \\frac{\\beta p_1}{\\alpha p_2}'}</Math> → <Math>{'x_2 = \\frac{\\beta p_1}{\\alpha p_2} x_1'}</Math></p>
              <p>C'est une droite passant par l'origine (relation linéaire).</p>
            </div>
          </div>
        ),
      },
      {
        id: 'td1-ex2',
        title: 'Exercice 2 : Équilibre graphique',
        difficulty: 1,
        tags: ['TMS', 'Équilibre'],
        content: (
          <div className="space-y-3">
            <p>Soit <Math>{'U(x, y) = x^{0.5} y^{0.5}'}</Math>, <Math>{'p_x = 2'}</Math>, <Math>{'p_y = 1'}</Math>, <Math>{'R = 100'}</Math>.</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Calculer les quantités optimales <Math>{'x^*'}</Math> et <Math>{'y^*'}</Math>.</li>
              <li>Calculer le niveau d'utilité <Math>{'u^*'}</Math>.</li>
              <li>Représenter graphiquement l'équilibre.</li>
            </ol>
          </div>
        ),
        solution: (
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">1. Quantités optimales :</p>
              <p>Avec <Math>{'\\alpha = \\beta = 0.5'}</Math> :</p>
              <p><Math>{'x^* = \\frac{0.5 \\times 100}{2} = 25'}</Math></p>
              <p><Math>{'y^* = \\frac{0.5 \\times 100}{1} = 50'}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">2. Niveau d'utilité :</p>
              <p><Math>{'u^* = \\sqrt{25} \\times \\sqrt{50} = 5 \\times \\sqrt{50} = 5\\sqrt{50} \\approx 35.36'}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">3. Graphiquement :</p>
              <p>La droite de budget a pour équation <Math>{'2x + y = 100'}</Math>.</p>
              <p>L'équilibre est au point de tangence entre la courbe d'indifférence et la droite de budget.</p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'td2',
    number: 2,
    title: 'Arbitrage Travail-Loisir',
    chapter: 'Chapitre 1',
    description: 'Offre de travail, effet substitution et revenu, backward-bending',
    reminders: [
      { title: 'Contrainte', formula: 'C + wL = wT + R_0' },
      { title: 'Coût opportunité loisir', formula: 'w' },
      { title: 'Offre de travail', formula: 'L_s = T - L^*' },
    ],
    exercises: [
      {
        id: 'td2-ex1',
        title: 'Exercice 1 : Offre de travail',
        difficulty: 2,
        tags: ['Travail-Loisir', 'Lagrangien'],
        content: (
          <div className="space-y-3">
            <p>Un individu a pour fonction d'utilité <Math>U(C, L) = C^\alpha L^\beta</Math> avec <Math>\alpha + \beta = 1</Math>.</p>
            <p>Il dispose d'un temps total <Math>T</Math> et d'un revenu exogène <Math>R_0</Math>. Le salaire horaire est <Math>w</Math>.</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Écrire la contrainte budgétaire.</li>
              <li>Déterminer le loisir optimal <Math>L^*</Math>.</li>
              <li>En déduire l'offre de travail <Math>L_s</Math>.</li>
            </ol>
          </div>
        ),
        solution: (
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">1. Contrainte budgétaire :</p>
              <p><Math>{'C = w(T - L) + R_0'}</Math> ou <Math>{'C + wL = wT + R_0'}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">2. Loisir optimal :</p>
              <p>Par la méthode du Lagrangien, on obtient :</p>
              <p className="mt-1 p-2 bg-white dark:bg-slate-900/80 rounded"><Math>{'L^* = \\frac{\\beta}{\\alpha + \\beta} \\left(\\frac{R_0}{w} + T\\right) = \\beta \\left(\\frac{R_0}{w} + T\\right)'}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">3. Offre de travail :</p>
              <p><Math>{'L_s = T - L^* = T - \\beta \\left(\\frac{R_0}{w} + T\\right) = \\alpha T - \\frac{\\beta R_0}{w}'}</Math></p>
              <p className="mt-2">Si <Math>{'R_0 = 0'}</Math> : <Math>{'L_s = \\alpha T'}</Math> (indépendant de w !)</p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'td3',
    number: 3,
    title: 'Choix Intertemporels',
    chapter: 'Chapitre 2',
    description: 'Épargne, emprunt, taux réel vs nominal',
    reminders: [
      { title: 'Contrainte intertemporelle', formula: 'C_1 + \\frac{C_2}{1+r} = Y_1 + \\frac{Y_2}{1+r}' },
      { title: 'Équation de Fisher', formula: '\\rho \\approx i - \\pi' },
    ],
    exercises: [
      {
        id: 'td3-ex1',
        title: 'Exercice 1 : Choix intertemporel',
        difficulty: 2,
        tags: ['Intertemporel', 'Lagrangien'],
        content: (
          <div className="space-y-3">
            <p>Un consommateur vit deux périodes avec <Math>U(C_1, C_2) = \ln C_1 + \ln C_2</Math>.</p>
            <p>Revenus : <Math>Y_1 = 100</Math>, <Math>Y_2 = 50</Math>. Taux d'intérêt : <Math>r = 10\%</Math>.</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Écrire la contrainte budgétaire intertemporelle.</li>
              <li>Déterminer <Math>C_1^*</Math> et <Math>C_2^*</Math>.</li>
              <li>L'individu est-il épargnant ou emprunteur ?</li>
            </ol>
          </div>
        ),
        solution: (
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">1. Contrainte intertemporelle :</p>
              <p><Math>{'C_1 + \\frac{C_2}{1.1} = 100 + \\frac{50}{1.1} = 100 + 45.45 = 145.45'}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">2. Consommations optimales :</p>
              <p>Avec <Math>{'U = \\ln C_1 + \\ln C_2'}</Math>, on a <Math>{'\\alpha = \\beta = 0.5'}</Math> :</p>
              <p><Math>{'C_1^* = 0.5 \\times 145.45 = 72.73'}</Math></p>
              <p><Math>{'C_2^* = 0.5 \\times 145.45 \\times 1.1 = 80'}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">3. Épargnant ou emprunteur ?</p>
              <p><Math>{'C_1^* = 72.73 < Y_1 = 100'}</Math></p>
              <p>L'individu est <strong>épargnant</strong> : il consomme moins que son revenu en période 1.</p>
              <p>Épargne : <Math>{'S = Y_1 - C_1^* = 100 - 72.73 = 27.27'}</Math></p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'td4',
    number: 4,
    title: 'Surplus et Bien-être',
    chapter: 'Chapitre 3',
    description: 'Surplus du consommateur, surplus du producteur, perte sèche',
    reminders: [
      { title: 'Surplus consommateur', formula: 'SC = \\int_0^{Q^*} P(Q) dQ - P^* Q^*' },
      { title: 'Perte sèche', formula: 'DWL \\propto t^2' },
    ],
    exercises: [
      {
        id: 'td4-ex1',
        title: 'Exercice 1 : Équilibre de marché',
        difficulty: 2,
        tags: ['Surplus', 'Équilibre'],
        content: (
          <div className="space-y-3">
            <p>Offre : <Math>Q_O(p) = 2p - 6</Math>. Demande : <Math>Q_D(p) = 12 - p</Math>.</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Calculer le prix et la quantité d'équilibre.</li>
              <li>Calculer le surplus du consommateur et du producteur.</li>
              <li>Représenter graphiquement.</li>
            </ol>
          </div>
        ),
        solution: (
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">1. Équilibre :</p>
              <p><Math>{'Q_O = Q_D'}</Math> → <Math>{'2p - 6 = 12 - p'}</Math> → <Math>{'3p = 18'}</Math> → <Math>{'p^* = 6'}</Math></p>
              <p><Math>{'Q^* = 12 - 6 = 6'}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">2. Surplus :</p>
              <p>Prix max (demande) : <Math>{'p = 12'}</Math> quand <Math>{'Q = 0'}</Math></p>
              <p>Prix min (offre) : <Math>{'p = 3'}</Math> quand <Math>{'Q = 0'}</Math></p>
              <p><Math>{'SC = \\frac{1}{2} \\times (12 - 6) \\times 6 = 18'}</Math></p>
              <p><Math>{'SP = \\frac{1}{2} \\times (6 - 3) \\times 6 = 9'}</Math></p>
              <p>Surplus total : <Math>{'ST = 18 + 9 = 27'}</Math></p>
            </div>
          </div>
        ),
      },
    ],
  },

  {
    id: 'td5',
    number: 5,
    title: 'Théorie du Producteur',
    chapter: 'Chapitre 5',
    description: 'Fonction de production, minimisation des coûts, TMST',
    reminders: [
      { title: 'TMST', formula: 'TMST = \\frac{Pm_L}{Pm_K} = \\frac{w}{r}' },
      { title: 'Coût marginal', formula: 'Cm = \\frac{dCT}{dQ}' },
    ],
    exercises: [
      {
        id: 'td5-ex1',
        title: 'Exercice 1 : Minimisation des coûts',
        difficulty: 2,
        tags: ['Lagrangien', 'TMST'],
        content: (
          <div className="space-y-3">
            <p>Fonction de production : <Math>{'Q = K^{0.5} L^{0.5}'}</Math>. Prix des facteurs : <Math>{'r = 4'}</Math>, <Math>{'w = 1'}</Math>.</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Déterminer la relation optimale K/L.</li>
              <li>Pour <Math>{'Q = 10'}</Math>, calculer K et L optimaux.</li>
              <li>Calculer le coût total.</li>
            </ol>
          </div>
        ),
        solution: (
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">1. Relation optimale :</p>
              <p><Math>{'TMST = \\frac{Pm_L}{Pm_K} = \\frac{0.5 K^{0.5} L^{-0.5}}{0.5 K^{-0.5} L^{0.5}} = \\frac{K}{L}'}</Math></p>
              <p>Condition : <Math>{'\\frac{K}{L} = \\frac{w}{r} = \\frac{1}{4}'}</Math> → <Math>{'K = \\frac{L}{4}'}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">2. Pour Q = 10 :</p>
              <p><Math>{'10 = K^{0.5} L^{0.5} = \\left(\\frac{L}{4}\\right)^{0.5} L^{0.5} = \\frac{L}{2}'}</Math></p>
              <p><Math>{'L^* = 20'}</Math>, <Math>{'K^* = 5'}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">3. Coût total :</p>
              <p><Math>{'CT = rK + wL = 4 \\times 5 + 1 \\times 20 = 40'}</Math></p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'td6',
    number: 6,
    title: 'Concurrence Parfaite',
    chapter: 'Chapitre 6',
    description: 'Offre de la firme, équilibre de marché, seuils',
    reminders: [
      { title: 'Condition profit max', formula: 'P = Cm' },
      { title: 'Seuil fermeture CT', formula: 'P = \\min CVM' },
      { title: 'Seuil rentabilité', formula: 'P = \\min CM' },
    ],
    exercises: [
      {
        id: 'td6-ex1',
        title: 'Exercice 1 : Offre de la firme',
        difficulty: 2,
        tags: ['Équilibre'],
        content: (
          <div className="space-y-3">
            <p>Coût total : <Math>{'CT(Q) = \\frac{Q^2}{a} + bQ + c'}</Math>.</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Déterminer le coût marginal.</li>
              <li>Déterminer la fonction d'offre.</li>
              <li>Calculer le seuil de fermeture.</li>
            </ol>
          </div>
        ),
        solution: (
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">1. Coût marginal :</p>
              <p><Math>{'Cm = \\frac{dCT}{dQ} = \\frac{2Q}{a} + b'}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">2. Fonction d'offre :</p>
              <p>En CPP : <Math>{'P = Cm'}</Math> → <Math>{'P = \\frac{2Q}{a} + b'}</Math></p>
              <p><Math>{'Q(P) = \\frac{a(P - b)}{2}'}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">3. Seuil de fermeture :</p>
              <p><Math>{'CVM = \\frac{Q}{a} + b'}</Math></p>
              <p>Le minimum est atteint quand <Math>{'Q \\to 0'}</Math> : <Math>{'\\min CVM = b'}</Math></p>
              <p>Seuil de fermeture : <Math>{'P = b'}</Math></p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'td7',
    number: 7,
    title: 'Monopole et Oligopole',
    chapter: 'Chapitre 7',
    description: 'Monopole, Cournot, Bertrand, Stackelberg',
    reminders: [
      { title: 'Condition monopole', formula: 'Rm = Cm' },
      { title: 'Indice de Lerner', formula: 'L = \\frac{P - Cm}{P} = -\\frac{1}{\\varepsilon}' },
      { title: 'Fonction de réaction Cournot', formula: 'q_1 = \\frac{a - c - q_2}{2}' },
    ],
    exercises: [
      {
        id: 'td7-ex1',
        title: 'Exercice 1 : Monopole',
        difficulty: 2,
        tags: ['Monopole'],
        content: (
          <div className="space-y-3">
            <p>Demande inverse : <Math>P = 100 - 2Q</Math>. Coût marginal : <Math>Cm = 10</Math>.</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Calculer la quantité et le prix de monopole.</li>
              <li>Calculer le profit du monopole.</li>
              <li>Calculer l'indice de Lerner.</li>
            </ol>
          </div>
        ),
        solution: (
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">1. Quantité et prix :</p>
              <p>Recette totale : <Math>RT = P \times Q = (100 - 2Q)Q = 100Q - 2Q^2</Math></p>
              <p>Recette marginale : <Math>Rm = 100 - 4Q</Math></p>
              <p><Math>Rm = Cm</Math> → <Math>100 - 4Q = 10</Math> → <Math>Q^* = 22.5</Math></p>
              <p><Math>P^* = 100 - 2 \times 22.5 = 55</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">2. Profit :</p>
              <p><Math>{'\\pi = (P - Cm) \\times Q = (55 - 10) \\times 22.5 = 1012.5'}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">3. Indice de Lerner :</p>
              <p><Math>{'L = \\frac{P - Cm}{P} = \\frac{55 - 10}{55} = \\frac{45}{55} \\approx 0.82'}</Math></p>
            </div>
          </div>
        ),
      },
      {
        id: 'td7-ex2',
        title: 'Exercice 2 : Duopole de Cournot',
        difficulty: 3,
        tags: ['Cournot', 'Oligopole'],
        content: (
          <div className="space-y-3">
            <p>Demande inverse : <Math>{'P = 120 - (q_1 + q_2)'}</Math>. Coût marginal : <Math>{'Cm = 20'}</Math>.</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Déterminer les fonctions de réaction.</li>
              <li>Calculer l'équilibre de Cournot-Nash.</li>
              <li>Comparer avec le monopole et la CPP.</li>
            </ol>
          </div>
        ),
        solution: (
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">1. Fonctions de réaction :</p>
              <p>Profit firme 1 : <Math>{'\\pi_1 = (120 - q_1 - q_2)q_1 - 20q_1'}</Math></p>
              <p>CPO : <Math>{'\\frac{d\\pi_1}{dq_1} = 120 - 2q_1 - q_2 - 20 = 0'}</Math></p>
              <p><Math>{'q_1 = 50 - \\frac{q_2}{2}'}</Math> (fonction de réaction)</p>
              <p>Par symétrie : <Math>{'q_2 = 50 - \\frac{q_1}{2}'}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">2. Équilibre de Cournot :</p>
              <p>En substituant : <Math>{'q_1 = 50 - \\frac{1}{2}(50 - \\frac{q_1}{2})'}</Math></p>
              <p><Math>{'q_1 = 50 - 25 + \\frac{q_1}{4}'}</Math> → <Math>{'\\frac{3q_1}{4} = 25'}</Math> → <Math>{'q_1^* = q_2^* = 33.33'}</Math></p>
              <p><Math>{'Q^* = 66.67'}</Math>, <Math>{'P^* = 120 - 66.67 = 53.33'}</Math></p>
            </div>
            <div>
              <p className="font-medium mb-2">3. Comparaison :</p>
              <p>Monopole : <Math>{'Q_m = 50'}</Math>, <Math>{'P_m = 70'}</Math></p>
              <p>CPP : <Math>{'Q_{CPP} = 100'}</Math>, <Math>{'P_{CPP} = 20'}</Math></p>
              <p>Cournot est intermédiaire : <Math>{'Q_m < Q_{Cournot} < Q_{CPP}'}</Math></p>
            </div>
          </div>
        ),
      },
    ],
  },
];

function TDCard({ td, onClick }: { td: TDSheet; onClick: () => void }) {
  const totalExercises = td.exercises.length;
  return (
    <button onClick={onClick} className="w-full p-5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:border-white/15 hover:bg-slate-100/50 dark:bg-white/5 transition-all text-left group flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-500 dark:text-slate-500 font-medium w-6">{String(td.number).padStart(2, '0')}</span>
        <div>
          <h2 className="font-medium text-slate-900 dark:text-white group-hover:text-slate-800 dark:text-slate-200">TD{td.number} — {td.title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-500">{td.chapter} · {td.description}</p>
        </div>
      </div>
      <span className="text-sm text-slate-500 dark:text-slate-500">{totalExercises} exercices</span>
    </button>
  );
}

function TDDetailView({ td, onBack }: { td: TDSheet; onBack: () => void }) {
  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200 mb-6 transition-colors">
        <ArrowLeft size={18} />
        <span>Retour aux TD</span>
      </button>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-emerald-600 dark:bg-emerald-950/30 text-white flex items-center justify-center font-bold">{td.number}</div>
          <span className="px-2.5 py-1 bg-slate-100/80 dark:bg-white/5 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium">{td.chapter}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">TD{td.number} — {td.title}</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">{td.description}</p>
      </div>
      <CourseReminders td={td} />
      {td.exercises.map((ex) => (
        <ExerciseCard key={ex.id} exercise={ex} />
      ))}
    </div>
  );
}

export function TD() {
  const [selectedTD, setSelectedTD] = useState<TDSheet | null>(null);
  const totalExercises = tdSheets.reduce((acc, td) => acc + td.exercises.length, 0);

  if (selectedTD) {
    return (
      <main className="max-w-2xl mx-auto pt-20 sm:pt-24 px-4 sm:px-6 pb-12">
        <TDDetailView td={selectedTD} onBack={() => setSelectedTD(null)} />
      </main>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pt-20 sm:pt-24 px-4 sm:px-6 pb-12">
      <div className="text-center mb-10 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white mb-2 sm:mb-3">TD Corrigés</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">{totalExercises} exercices · {tdSheets.length} TD</p>
      </div>
      <div className="space-y-3">
        {tdSheets.map((td) => (
          <TDCard key={td.id} td={td} onClick={() => setSelectedTD(td)} />
        ))}
      </div>
    </div>
  );
}
