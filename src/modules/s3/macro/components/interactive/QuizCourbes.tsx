import { useState, useMemo, type CSSProperties } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, ChevronRight, Lightbulb, Brain, Ruler, Calculator } from 'lucide-react';
import { Math as MathDisplay } from '../../../../../components/Math';

function shuffleWithSeed<T>(array: T[], seed: number): T[] {
  const result = [...array];
  let m = result.length;
  while (m) {
    const i = Math.floor(seededRandom(seed + m) * m--);
    [result[m], result[i]] = [result[i], result[m]];
  }
  return result;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

interface Question {
  id: number;
  model: 'IS-LM' | 'WS-PS' | 'AS-AD' | 'Phillips';
  type: 'deplacement' | 'raisonnement' | 'calcul';
  event: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  formula: string;
}

const questions: Question[] = [
  // IS-LM - Déplacements
  { id: 1, model: 'IS-LM', type: 'deplacement', event: '↑G', question: 'Hausse des dépenses publiques (G↑) : que devient IS ?', options: ['IS → droite', 'IS → gauche', 'IS ne bouge pas', 'LM → droite'], correct: 0, explanation: 'Dans IS : Y = C + I + G. Si G↑, Y↑ à i constant → IS va à droite.', formula: 'Y = C(Y-T) + I(i) + G' },
  { id: 2, model: 'IS-LM', type: 'deplacement', event: '↑T', question: 'Hausse des impôts (T↑) : que devient IS ?', options: ['IS → droite', 'IS → gauche', 'LM → gauche', 'Aucun effet'], correct: 1, explanation: 'T↑ → Yd↓ → C↓ → Y↓ à i constant → IS va à gauche.', formula: 'Y = C(Y-T) + I(i) + G' },
  { id: 3, model: 'IS-LM', type: 'deplacement', event: '↑M', question: 'Hausse de la masse monétaire (M↑) : que devient LM ?', options: ['LM → gauche', 'IS → droite', 'LM → droite', 'LM ne bouge pas'], correct: 2, explanation: 'M↑ → M/P↑ → pour équilibrer : Y↑ ou i↓ → LM va à droite.', formula: '\\frac{M}{P} = L(Y, i)' },
  
  // IS-LM - Raisonnement
  { id: 4, model: 'IS-LM', type: 'raisonnement', event: 'Éviction', question: 'Pourquoi l\'effet d\'éviction limite-t-il l\'efficacité de la politique budgétaire ?', options: ['Car G↑ fait baisser i, ce qui réduit C', 'Car G↑ fait monter i, ce qui réduit I', 'Car G↑ fait monter P, ce qui réduit M/P', 'Car G↑ fait baisser les exportations'], correct: 1, explanation: 'G↑ → IS droite → i↑ → I(i)↓. L\'investissement privé est "évincé" par la dépense publique.', formula: 'G\\uparrow \\Rightarrow i\\uparrow \\Rightarrow I\\downarrow' },
  { id: 5, model: 'IS-LM', type: 'raisonnement', event: 'Policy Mix', question: 'Pourquoi le policy mix (G↑ + M↑) est-il plus efficace que G↑ seul ?', options: ['Car il évite la hausse de P', 'Car il évite la hausse de i (pas d\'éviction)', 'Car il augmente les exportations', 'Car il réduit le déficit public'], correct: 1, explanation: 'G↑ pousse i↑, M↑ pousse i↓. Les effets se compensent → pas d\'éviction → effet maximal sur Y.', formula: 'IS \\rightarrow + LM \\rightarrow \\Rightarrow \\Delta i \\approx 0' },

  // IS-LM - Calcul
  { id: 6, model: 'IS-LM', type: 'calcul', event: 'Multiplicateur', question: 'Si c = 0.8 (propension à consommer), quel est le multiplicateur keynésien simple ?', options: ['k = 2', 'k = 4', 'k = 5', 'k = 0.8'], correct: 2, explanation: 'k = 1/(1-c) = 1/(1-0.8) = 1/0.2 = 5. Donc 1€ de G crée 5€ de Y (sans éviction).', formula: 'k = \\frac{1}{1-c} = \\frac{1}{1-0.8} = 5' },

  // WS-PS - Déplacements
  { id: 7, model: 'WS-PS', type: 'deplacement', event: '↑μ', question: 'Hausse du taux de marge (μ↑) : que devient PS ?', options: ['PS → haut', 'PS → bas', 'WS → haut', 'Aucun effet'], correct: 1, explanation: 'PS : W/P = 1/(1+μ). Si μ↑, W/P offert↓ → PS descend.', formula: '\\frac{W}{P} = \\frac{1}{1+\\mu}' },
  { id: 8, model: 'WS-PS', type: 'deplacement', event: '↑z', question: 'Hausse des allocations chômage (z↑) : effet sur uₙ ?', options: ['uₙ inchangé', 'Effet ambigu', 'uₙ↑', 'uₙ↓'], correct: 2, explanation: 'z↑ → WS monte → intersection avec PS à un u plus élevé → uₙ↑.', formula: '\\frac{W}{P^e} = z(1-\\alpha u)' },
  
  // WS-PS - Raisonnement
  { id: 9, model: 'WS-PS', type: 'raisonnement', event: 'Structurel', question: 'Pourquoi une politique de relance (G↑) ne peut-elle PAS réduire le chômage naturel ?', options: ['Car G↑ fait monter l\'inflation', 'Car uₙ dépend de μ, z, α, pas de G ou M', 'Car G↑ fait monter les taux d\'intérêt', 'Car G↑ réduit la productivité'], correct: 1, explanation: 'uₙ est déterminé par WS-PS (facteurs structurels). G et M n\'apparaissent pas dans ces équations.', formula: 'u_n = f(\\mu, z, \\alpha) \\neq f(G, M)' },
  { id: 10, model: 'WS-PS', type: 'raisonnement', event: 'Productivité', question: 'Pourquoi le progrès technique (A↑) réduit-il le chômage naturel ?', options: ['Car il augmente la demande de travail', 'Car il permet aux entreprises d\'offrir un salaire réel plus élevé (PS↑)', 'Car il réduit les anticipations d\'inflation', 'Car il augmente les exportations'], correct: 1, explanation: 'PS : W/P = A/(1+μ). Si A↑, PS monte → intersection avec WS à un u plus bas → uₙ↓.', formula: '\\frac{W}{P} = \\frac{A}{1+\\mu}' },

  // AS-AD - Déplacements
  { id: 11, model: 'AS-AD', type: 'deplacement', event: '↑G', question: 'Politique budgétaire expansive : que devient AD ?', options: ['AD → gauche', 'AS → haut', 'AD → droite', 'AD ne bouge pas'], correct: 2, explanation: 'G↑ → IS droite → Y↑ à P constant → AD va à droite.', formula: 'Y = Y(\\frac{M}{P}, G, T)' },
  { id: 12, model: 'AS-AD', type: 'deplacement', event: 'CT→MT', question: 'Après un choc de demande positif, que fait AS au moyen terme ?', options: ['AS → bas', 'AS ne bouge pas', 'AS devient verticale', 'AS → haut'], correct: 3, explanation: 'Y > Yₙ → u < uₙ → W↑ → P↑ → Pᵉ↑ → AS monte jusqu\'à Y = Yₙ.', formula: 'P = P^e(1+\\mu)F(...)' },
  
  // AS-AD - Raisonnement
  { id: 13, model: 'AS-AD', type: 'raisonnement', event: 'Neutralité', question: 'Pourquoi dit-on que la monnaie est "neutre" à moyen terme ?', options: ['Car M↑ n\'a aucun effet, même à CT', 'Car M↑ augmente Y et P de façon permanente', 'Car M↑ n\'augmente que P à MT, pas Y (Y revient à Yₙ)', 'Car M↑ réduit le chômage naturel'], correct: 2, explanation: 'À MT, Y revient toujours à Yₙ. M↑ ne fait qu\'augmenter P proportionnellement. Pas d\'effet réel.', formula: 'MT : Y = Y_n, \\quad \\Delta M \\Rightarrow \\Delta P' },
  { id: 14, model: 'AS-AD', type: 'raisonnement', event: 'Stagflation', question: 'Qu\'est-ce qui caractérise la stagflation ?', options: ['Inflation élevée et croissance forte', 'Inflation faible et chômage élevé', 'Inflation élevée et chômage élevé (Y↓)', 'Déflation et croissance forte'], correct: 2, explanation: 'Stagflation = Stagnation (Y↓, u↑) + Inflation (P↑). Causée par un choc d\'offre négatif (AS↑, Yₙ↓).', formula: '\\text{Choc offre} \\Rightarrow AS\\uparrow, Y_n\\downarrow' },

  // Phillips - Déplacements
  { id: 15, model: 'Phillips', type: 'deplacement', event: '↑πᵉ', question: 'Hausse des anticipations (πᵉ↑) : que devient la courbe CT ?', options: ['CT → haut', 'CT → bas', 'CT pivote', 'CT ne bouge pas'], correct: 0, explanation: 'π = πᵉ + ... → Si πᵉ↑, π↑ à u constant → CT monte (déplacement vertical).', formula: '\\pi = \\pi^e + (m+z) - \\alpha u' },
  { id: 16, model: 'Phillips', type: 'deplacement', event: 'u < uₙ', question: 'Si u < uₙ maintenu avec anticipations adaptatives, que fait π ?', options: ['π constant', 'π décélère', 'π = 0', 'π accélère'], correct: 3, explanation: 'u < uₙ → π > πᵉ → πᵉ s\'ajuste à π → π↑ encore. SPIRALE !', formula: '\\pi^e_{t+1} = \\pi_t \\Rightarrow \\text{spirale}' },
  
  // Phillips - Raisonnement
  { id: 17, model: 'Phillips', type: 'raisonnement', event: 'LT verticale', question: 'Pourquoi la courbe de Phillips LT est-elle verticale ?', options: ['Car π = 0 à LT', 'Car u = uₙ et π = πᵉ à LT (pas d\'arbitrage)', 'Car α = 0 à LT', 'Car les salaires sont rigides'], correct: 1, explanation: 'À LT : anticipations correctes (π = πᵉ) → 0 = (m+z) - αu → u = uₙ quel que soit π.', formula: 'u_n = \\frac{m+z}{\\alpha}' },
  { id: 18, model: 'Phillips', type: 'raisonnement', event: 'Crédibilité', question: 'Comment une BC crédible peut-elle réduire l\'inflation sans coût ?', options: ['En augmentant M', 'En réduisant G', 'En ancrant πᵉ↓ immédiatement (CT descend sans ↑u)', 'En augmentant la productivité'], correct: 2, explanation: 'BC crédible → agents croient à π↓ → πᵉ↓ immédiatement → CT descend sans u↑.', formula: '\\pi^e \\downarrow \\Rightarrow CT \\downarrow' },
  
  // Phillips - Calcul
  { id: 19, model: 'Phillips', type: 'calcul', event: 'Ratio sacrifice', question: 'Si α = 0.5, quel est le ratio de sacrifice ?', options: ['0.5', '1', '2', '5'], correct: 2, explanation: 'Ratio = 1/α = 1/0.5 = 2. Pour baisser π de 1pt, il faut 2pts de chômage en plus.', formula: '\\text{Ratio} = \\frac{1}{\\alpha} = \\frac{1}{0.5} = 2' },
  { id: 20, model: 'Phillips', type: 'calcul', event: 'Calcul π', question: 'Si πᵉ = 3%, uₙ = 5%, u = 3%, α = 0.5, quelle est l\'inflation π ?', options: ['π = 2%', 'π = 3%', 'π = 4%', 'π = 5%'], correct: 2, explanation: 'π = πᵉ - α(u - uₙ) = 3 - 0.5×(3-5) = 3 - 0.5×(-2) = 3 + 1 = 4%.', formula: '\\pi = 3 - 0.5 \\times (3-5) = 4\\%' },

  // Questions transversales - Raisonnement
  { id: 21, model: 'AS-AD', type: 'raisonnement', event: 'Lien IS-LM→AD', question: 'Comment IS-LM génère-t-il la courbe AD ?', options: ['AD = IS + LM', 'Pour chaque P, on résout IS-LM et on obtient Y', 'AD est indépendante de IS-LM', 'AD = LM quand IS est verticale'], correct: 1, explanation: 'AD montre la relation Y-P. Pour chaque P, M/P change → LM bouge → nouvel équilibre IS-LM → nouveau Y.', formula: 'P\\uparrow \\Rightarrow \\frac{M}{P}\\downarrow \\Rightarrow LM\\leftarrow \\Rightarrow Y\\downarrow' },
  { id: 22, model: 'AS-AD', type: 'raisonnement', event: 'Lien WS-PS→AS', question: 'Comment WS-PS génère-t-il la courbe AS ?', options: ['AS = WS + PS', 'WS-PS donne uₙ, AS montre comment P varie avec Y à Pᵉ fixé', 'AS est indépendante de WS-PS', 'AS = PS quand WS est horizontale'], correct: 1, explanation: 'WS-PS détermine uₙ (donc Yₙ). AS montre que si Y > Yₙ → u < uₙ → W↑ → P↑.', formula: 'Y > Y_n \\Rightarrow u < u_n \\Rightarrow W\\uparrow \\Rightarrow P\\uparrow' },
  { id: 23, model: 'Phillips', type: 'raisonnement', event: 'Lien AS→Phillips', question: 'Quel est le lien entre AS et la courbe de Phillips ?', options: ['Aucun lien', 'Phillips = AS reformulée en (π, u) au lieu de (P, Y)', 'Phillips = AD reformulée', 'Phillips = IS-LM reformulé'], correct: 1, explanation: 'Phillips est une autre façon d\'écrire AS, en remplaçant P par π (taux de variation) et Y par u (via Yₙ).', formula: 'AS : P = f(Y) \\Leftrightarrow Phillips : \\pi = f(u)' },
  { id: 24, model: 'IS-LM', type: 'raisonnement', event: 'Pente IS', question: 'Pourquoi IS est-elle décroissante ?', options: ['Car C↓ quand i↑', 'Car I↓ quand i↑, donc Y↓', 'Car M/P↓ quand i↑', 'Car L↑ quand i↑'], correct: 1, explanation: 'Si i↑ → I(i)↓ (investissement baisse car emprunter coûte plus cher) → demande↓ → Y↓.', formula: 'i\\uparrow \\Rightarrow I(i)\\downarrow \\Rightarrow Y\\downarrow' },
  { id: 25, model: 'IS-LM', type: 'raisonnement', event: 'Pente LM', question: 'Pourquoi LM est-elle croissante ?', options: ['Car I↑ quand Y↑', 'Car L(Y)↑ quand Y↑, donc i↑ pour équilibrer', 'Car M↑ quand Y↑', 'Car C↑ quand Y↑'], correct: 1, explanation: 'Si Y↑ → demande de monnaie L(Y,i)↑ → pour équilibrer avec M/P fixe, i doit monter.', formula: 'Y\\uparrow \\Rightarrow L(Y,i)\\uparrow \\Rightarrow i\\uparrow' },
];


export function QuizCourbes() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [showHint, setShowHint] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredQuestions = useMemo(() => {
    let result = questions;
    if (filter !== 'all') {
      result = result.filter(q => q.model === filter);
    }
    if (typeFilter !== 'all') {
      result = result.filter(q => q.type === typeFilter);
    }
    return result;
  }, [filter, typeFilter]);

  const q = filteredQuestions[currentQ] || questions[0];
  
  const correctAnswer = q.options[q.correct];
  const shuffledOptions = useMemo(() => shuffleWithSeed(q.options, q.id * 100), [q.id, q.options]);
  const shuffledCorrectIndex = shuffledOptions.indexOf(correctAnswer);

  const handleAnswer = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === shuffledCorrectIndex && !answered[q.id - 1]) {
      setScore(s => s + 1);
      const newAnswered = [...answered];
      newAnswered[q.id - 1] = true;
      setAnswered(newAnswered);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowResult(false);
    setShowHint(false);
    setCurrentQ(c => (c + 1) % filteredQuestions.length);
  };

  const reset = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setAnswered(new Array(questions.length).fill(false));
    setShowHint(false);
  };

  const modelStyles: Record<Question['model'], { backgroundColor: string; color: string; borderColor: string }> = {
    'IS-LM': { backgroundColor: 'var(--color-info-subtle)', color: 'var(--color-info)', borderColor: 'var(--color-info)' },
    'WS-PS': { backgroundColor: 'var(--color-micro-subtle)', color: 'var(--color-micro)', borderColor: 'var(--color-micro)' },
    'AS-AD': { backgroundColor: 'var(--color-warning-subtle)', color: 'var(--color-warning)', borderColor: 'var(--color-warning)' },
    'Phillips': { backgroundColor: 'var(--color-error-subtle)', color: 'var(--color-error)', borderColor: 'var(--color-error)' },
  };

  const typeStyles: Record<Question['type'], { backgroundColor: string; color: string }> = {
    deplacement: { backgroundColor: 'var(--color-info-subtle)', color: 'var(--color-info)' },
    raisonnement: { backgroundColor: 'var(--color-warning-subtle)', color: 'var(--color-warning)' },
    calcul: { backgroundColor: 'var(--color-success-subtle)', color: 'var(--color-success)' },
  };

  const typeLabels: Record<string, { icon: React.ReactNode; label: string }> = {
    'deplacement': { icon: <Ruler size={14} />, label: 'Déplacement' },
    'raisonnement': { icon: <Brain size={14} />, label: 'Raisonnement' },
    'calcul': { icon: <Calculator size={14} />, label: 'Calcul' },
  };

  return (
    <div className="bg-[var(--color-bg-raised)] rounded-2xl border border-[var(--color-border-default)] p-6 my-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Brain className="w-6 h-6 text-[var(--color-warning)]" />
            Quiz : Maîtrise les modèles
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)]">Déplacements, raisonnement et calculs</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[var(--color-warning-subtle)] px-3 py-1.5 rounded-lg border border-[var(--color-warning)]">
            <Trophy size={16} className="text-[var(--color-warning)]" />
            <span className="font-semibold text-[var(--color-warning)]">{score}/{filteredQuestions.length}</span>
          </div>
          <button onClick={reset} className="p-2 rounded-lg bg-[var(--color-bg-overlay)] hover:bg-[var(--color-surface-hover)]">
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Filtres par modèle */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-sm text-[var(--color-text-secondary)] self-center">Modèle :</span>
        {['all', 'IS-LM', 'WS-PS', 'AS-AD', 'Phillips'].map(f => (
          <button key={f} onClick={() => { setFilter(f); setCurrentQ(0); setSelected(null); setShowResult(false); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === f ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-raised)]' : 'bg-[var(--color-bg-overlay)] hover:bg-[var(--color-surface-hover)]'}`}>
            {f === 'all' ? 'Tous' : f}
          </button>
        ))}
      </div>

      {/* Filtres par type */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-sm text-[var(--color-text-secondary)] self-center">Type :</span>
        {['all', 'deplacement', 'raisonnement', 'calcul'].map(t => (
          <button key={t} onClick={() => { setTypeFilter(t); setCurrentQ(0); setSelected(null); setShowResult(false); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${typeFilter === t ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-raised)]' : 'bg-[var(--color-bg-overlay)] hover:bg-[var(--color-surface-hover)]'}`}>
            {t === 'all' ? 'Tous types' : <span className="flex items-center gap-1">{typeLabels[t].icon} {typeLabels[t].label}</span>}
          </button>
        ))}
      </div>

      {/* Question */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 rounded text-xs font-semibold border" style={modelStyles[q.model]}>{q.model}</span>
          <span className="px-2 py-1 rounded text-xs font-semibold flex items-center gap-1" style={typeStyles[q.type]}>{typeLabels[q.type].icon} {typeLabels[q.type].label}</span>
          <span className="text-sm text-[var(--color-text-secondary)]">Question {currentQ + 1}/{filteredQuestions.length}</span>
        </div>
        <p className="text-lg font-medium text-[var(--color-text-primary)] mb-3">{q.question}</p>
        
        {/* Bouton indice */}
        {!showResult && (
          <button onClick={() => setShowHint(!showHint)} 
            className="text-sm text-[var(--color-warning)] hover:text-[var(--color-warning)] flex items-center gap-1 mb-3">
            <Lightbulb size={14} /> {showHint ? 'Masquer' : 'Voir'} la formule
          </button>
        )}
        {showHint && !showResult && (
          <div className="p-3 bg-[var(--color-warning-subtle)] rounded-xl border border-[var(--color-warning)] mb-3">
            <p className="text-xs text-[var(--color-warning)] mb-1 font-medium">Formule clé :</p>
            <MathDisplay>{q.formula}</MathDisplay>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="space-y-2 mb-6">
        {shuffledOptions.map((opt, idx) => {
          let style: CSSProperties = {
            backgroundColor: 'var(--color-bg-overlay)',
            borderColor: 'var(--color-border-default)',
            color: 'var(--color-text-primary)',
          };
          if (showResult) {
            if (idx === shuffledCorrectIndex) {
              style = {
                backgroundColor: 'var(--color-success-subtle)',
                borderColor: 'var(--color-success)',
                color: 'var(--color-success)',
              };
            } else if (idx === selected) {
              style = {
                backgroundColor: 'var(--color-error-subtle)',
                borderColor: 'var(--color-error)',
                color: 'var(--color-error)',
              };
            } else {
              style = {
                backgroundColor: 'var(--color-bg-overlay)',
                borderColor: 'var(--color-border-default)',
                color: 'var(--color-text-secondary)',
              };
            }
          }
          return (
            <button key={idx} onClick={() => handleAnswer(idx)} disabled={showResult}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all flex items-center justify-between ${!showResult ? 'hover:bg-[var(--color-surface-hover)]' : ''} ${showResult && idx !== shuffledCorrectIndex && idx !== selected ? 'opacity-50' : ''}`}
              style={style}>
              <span>{opt}</span>
              {showResult && idx === shuffledCorrectIndex && <CheckCircle size={20} className="text-[var(--color-success)]" />}
              {showResult && idx === selected && idx !== shuffledCorrectIndex && <XCircle size={20} className="text-[var(--color-error)]" />}
            </button>
          );
        })}
      </div>

      {/* Explication */}
      {showResult && (
        <div
          className="p-4 rounded-xl mb-4 border"
          style={selected === shuffledCorrectIndex
            ? { backgroundColor: 'var(--color-success-subtle)', borderColor: 'var(--color-success)' }
            : { backgroundColor: 'var(--color-error-subtle)', borderColor: 'var(--color-error)' }}
        >
          <p
            className="font-semibold mb-2 text-base flex items-center gap-2"
            style={selected === shuffledCorrectIndex ? { color: 'var(--color-success)' } : { color: 'var(--color-error)' }}
          >
            {selected === shuffledCorrectIndex ? <><CheckCircle size={18} /> Correct !</> : <><XCircle size={18} /> Incorrect</>}
          </p>
          <p
            className="text-sm mb-3"
            style={selected === shuffledCorrectIndex ? { color: 'var(--color-success)' } : { color: 'var(--color-error)' }}
          >
            {q.explanation}
          </p>
          <div className="p-2 bg-[var(--color-bg-raised)] rounded-lg inline-block">
            <MathDisplay>{q.formula}</MathDisplay>
          </div>
        </div>
      )}

      {/* Navigation */}
      {showResult && (
        <button onClick={nextQuestion}
          className="w-full py-3 bg-[var(--color-text-primary)] text-[var(--color-bg-raised)] rounded-xl font-medium hover:bg-[var(--color-text-primary)] flex items-center justify-center gap-2">
          Question suivante <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}
