import { useState } from 'react';
import { Math as MathDisplay } from '../../../../../components/Math';
import { RotateCcw, Info, Lightbulb } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { IntuitionPanel } from './IntuitionPanel';

type Event = 'none' | 'G_up' | 'G_down' | 'M_up' | 'M_down' | 'T_up' | 'policy_mix';
type Mode = 'theorique' | 'numerique';

export function InteractiveISLM() {
  const [event, setEvent] = useState<Event>('none');
  const [showLegend, setShowLegend] = useState(false);
  const [mode, /* setMode */] = useState<Mode>('theorique');
  const [showIntuition, setShowIntuition] = useState(false);

  const W = 450, H = 400;
  const margin = { top: 30, right: 30, bottom: 50, left: 60 };
  const w = W - margin.left - margin.right;
  const h = H - margin.top - margin.bottom;

  // Paramètres numériques réalistes (mode numérique)
  const params = {
    c: 0.75,     // Propension marginale à consommer
    b: 25,       // Sensibilité de I à i
    G0: 100,     // Dépenses publiques initiales
    T0: 80,      // Impôts initiaux
    C0: 40,      // Consommation autonome
    I0: 100,     // Investissement autonome
    M0: 400,     // Masse monétaire initiale
    P: 1,        // Niveau des prix (fixé à CT)
    k: 0.25,     // Sensibilité de L à Y
    h: 50,       // Sensibilité de L à i
  };

  const Ymax = mode === 'numerique' ? 800 : 100;
  const iMax = mode === 'numerique' ? 10 : 10;
  const toX = (Y: number) => margin.left + (Y / Ymax) * w;
  const toY = (i: number) => margin.top + h - (i / iMax) * h;

  // Calculs pour le mode numérique
  const getNumericShifts = () => {
    switch (event) {
      case 'G_up': return { dG: 30, dM: 0, dT: 0 };
      case 'G_down': return { dG: -30, dM: 0, dT: 0 };
      case 'M_up': return { dG: 0, dM: 80, dT: 0 };
      case 'M_down': return { dG: 0, dM: -80, dT: 0 };
      case 'T_up': return { dG: 0, dM: 0, dT: 30 };
      case 'policy_mix': return { dG: 30, dM: 80, dT: 0 };
      default: return { dG: 0, dM: 0, dT: 0 };
    }
  };

  const { dG, dM, dT } = getNumericShifts();
  const G = params.G0 + dG;
  const M = params.M0 + dM;
  const T = params.T0 + dT;

  // Équations IS-LM numériques
  // IS: Y = C0 + c(Y-T) + I0 - b*i + G => Y(1-c) = C0 - cT + I0 - b*i + G => Y = (C0 - cT + I0 + G)/(1-c) - (b/(1-c))*i
  // LM: M/P = kY - hi => i = (kY - M/P)/h

  const calcISNumeric = (Y: number, gVal: number, tVal: number) => {
    // De IS : i = (C0 + c(Y-T) + I0 + G - Y) / b = (C0 - cT + I0 + G - Y(1-c)) / b
    const numerator = params.C0 - params.c * tVal + params.I0 + gVal - Y * (1 - params.c);
    return numerator / params.b;
  };

  const calcLMNumeric = (Y: number, mVal: number) => {
    // De LM : i = (kY - M/P) / h
    return (params.k * Y - mVal / params.P) / params.h;
  };

  const calcEqNumeric = (gVal: number, tVal: number, mVal: number) => {
    // Résolution IS = LM
    // IS: i = (C0 - cT + I0 + G - Y(1-c)) / b
    // LM: i = (kY - M/P) / h
    // Égalité: (C0 - cT + I0 + G - Y(1-c)) / b = (kY - M/P) / h
    // h(C0 - cT + I0 + G) - h(1-c)Y = b*kY - b*M/P
    // h(C0 - cT + I0 + G) + b*M/P = Y(h(1-c) + b*k)
    const A = params.C0 - params.c * tVal + params.I0 + gVal;
    const Yeq = (params.h * A + params.b * mVal / params.P) / (params.h * (1 - params.c) + params.b * params.k);
    const ieq = calcLMNumeric(Yeq, mVal);
    return { Y: Yeq, i: ieq };
  };

  // Mode théorique (simplifié)
  const getTheoreticShifts = () => {
    switch (event) {
      case 'G_up': return { isShift: 15, lmShift: 0 };
      case 'G_down': return { isShift: -15, lmShift: 0 };
      case 'M_up': return { isShift: 0, lmShift: 15 };
      case 'M_down': return { isShift: 0, lmShift: -15 };
      case 'T_up': return { isShift: -12, lmShift: 0 };
      case 'policy_mix': return { isShift: 15, lmShift: 15 };
      default: return { isShift: 0, lmShift: 0 };
    }
  };

  const { isShift, lmShift } = getTheoreticShifts();

  const calcISTheoretic = (Y: number, shift: number) => 8 + 0.1 * shift - 0.1 * Y;
  const calcLMTheoretic = (Y: number, shift: number) => -2 - 0.1 * shift + 0.1 * Y;

  const calcEqTheoretic = (isS: number, lmS: number) => {
    const Yeq = 50 + 0.5 * isS + 0.5 * lmS;
    return { Y: Yeq, i: calcISTheoretic(Yeq, isS) };
  };

  // Valeurs selon le mode
  const eq0 = mode === 'numerique' 
    ? calcEqNumeric(params.G0, params.T0, params.M0)
    : calcEqTheoretic(0, 0);
  const eq1 = mode === 'numerique'
    ? calcEqNumeric(G, T, M)
    : calcEqTheoretic(isShift, lmShift);

  const genIS = (shiftOrG: number, tVal?: number) => {
    const pts: string[] = [];
    for (let Y = 0; Y <= Ymax; Y += Ymax / 50) {
      const i = mode === 'numerique' 
        ? calcISNumeric(Y, shiftOrG, tVal ?? params.T0)
        : calcISTheoretic(Y, shiftOrG);
      if (i >= 0 && i <= iMax) pts.push(`${toX(Y)},${toY(i)}`);
    }
    return pts.length > 1 ? `M ${pts.join(' L ')}` : '';
  };

  const genLM = (shiftOrM: number) => {
    const pts: string[] = [];
    for (let Y = 0; Y <= Ymax; Y += Ymax / 50) {
      const i = mode === 'numerique'
        ? calcLMNumeric(Y, shiftOrM)
        : calcLMTheoretic(Y, shiftOrM);
      if (i >= 0 && i <= iMax) pts.push(`${toX(Y)},${toY(i)}`);
    }
    return pts.length > 1 ? `M ${pts.join(' L ')}` : '';
  };

  const events = [
    { id: 'G_up', label: '↑G (dépenses)', color: '#2563eb' },
    { id: 'G_down', label: '↓G (austérité)', color: '#2563eb' },
    { id: 'T_up', label: '↑T (impôts)', color: '#d97706' },
    { id: 'M_up', label: '↑M (monnaie)', color: '#059669' },
    { id: 'M_down', label: '↓M (restriction)', color: '#059669' },
    { id: 'policy_mix', label: 'Policy Mix', color: '#7c3aed' },
  ] as const;

  const getExplanation = () => {
    const numericDetails = mode === 'numerique' ? {
      G_up: `G passe de ${params.G0} à ${G}. Multiplicateur k = 1/(1-c) = ${(1/(1-params.c)).toFixed(1)}. Effet brut sur Y : ΔG × k = ${dG} × ${(1/(1-params.c)).toFixed(1)} = ${(dG/(1-params.c)).toFixed(0)}. Mais l'effet d'éviction réduit cet impact.`,
      G_down: `G passe de ${params.G0} à ${G}. Contraction de ${-dG} → effet multiplicateur négatif.`,
      M_up: `M passe de ${params.M0} à ${M}. Plus de liquidité → i↓ → I↑ → Y↑.`,
      M_down: `M passe de ${params.M0} à ${M}. Moins de liquidité → i↑ → I↓ → Y↓.`,
      T_up: `T passe de ${params.T0} à ${T}. Revenu disponible Yd = Y - T diminue → C↓.`,
      policy_mix: `G : ${params.G0} → ${G}, M : ${params.M0} → ${M}. Double relance coordonnée.`,
    } : null;

    switch (event) {
      case 'G_up':
        return {
          title: 'Politique budgétaire expansionniste',
          steps: [
            { 
              formula: 'Y = C(Y-T) + I(i) + \\underbrace{G}_{\\uparrow}', 
              text: 'Équation IS : G est une composante de la demande. Si G↑, la demande totale augmente.' 
            },
            { 
              formula: '\\text{À } i \\text{ fixé : } Y_{\\text{équilibre}} \\uparrow', 
              text: 'Géométriquement : pour chaque niveau de i, le Y qui équilibre le marché des biens est plus grand.' 
            },
            { 
              formula: 'IS \\rightarrow \\text{droite}', 
              text: 'Donc la courbe IS se translate horizontalement vers la droite.' 
            },
          ],
          result: 'Y↑ et i↑ (l\'effet d\'éviction limite la hausse de Y)',
          numeric: numericDetails?.G_up
        };
      case 'G_down':
        return {
          title: 'Politique budgétaire restrictive',
          steps: [
            { formula: 'Y = C(Y-T) + I(i) + \\underbrace{G}_{\\downarrow}', text: 'G diminue → demande totale diminue.' },
            { formula: '\\text{À } i \\text{ fixé : } Y_{\\text{équilibre}} \\downarrow', text: 'Pour chaque i, le Y d\'équilibre est plus petit.' },
            { formula: 'IS \\rightarrow \\text{gauche}', text: 'La courbe IS se translate vers la gauche.' },
          ],
          result: 'Y↓ et i↓',
          numeric: numericDetails?.G_down
        };
      case 'M_up':
        return {
          title: 'Politique monétaire expansionniste',
          steps: [
            { formula: '\\underbrace{M}_{\\uparrow}/P = L(Y, i)', text: 'M est l\'offre de monnaie. Si M↑, l\'offre réelle augmente.' },
            { formula: '\\text{À } Y \\text{ fixé : } i_{\\text{équilibre}} \\downarrow', text: 'Pour équilibrer avec plus de M, il faut i plus bas.' },
            { formula: 'LM \\rightarrow \\text{droite}', text: 'La courbe LM se translate vers la droite/bas.' },
          ],
          result: 'Y↑ et i↓ (pas d\'effet d\'éviction)',
          numeric: numericDetails?.M_up
        };
      case 'M_down':
        return {
          title: 'Politique monétaire restrictive',
          steps: [
            { formula: '\\underbrace{M}_{\\downarrow}/P = L(Y, i)', text: 'M diminue → offre réelle diminue.' },
            { formula: '\\text{À } Y \\text{ fixé : } i_{\\text{équilibre}} \\uparrow', text: 'Pour équilibrer avec moins de M, il faut i plus haut.' },
            { formula: 'LM \\rightarrow \\text{gauche}', text: 'La courbe LM se translate vers la gauche/haut.' },
          ],
          result: 'Y↓ et i↑',
          numeric: numericDetails?.M_down
        };
      case 'T_up':
        return {
          title: 'Hausse des impôts',
          steps: [
            { formula: 'Y = C(Y-\\underbrace{T}_{\\uparrow}) + I(i) + G', text: 'T réduit le revenu disponible (Y-T), donc C diminue.' },
            { formula: '\\text{À } i \\text{ fixé : } Y_{\\text{équilibre}} \\downarrow', text: 'Moins de consommation → Y d\'équilibre plus bas.' },
            { formula: 'IS \\rightarrow \\text{gauche}', text: 'La courbe IS se translate vers la gauche.' },
          ],
          result: 'Y↓ et i↓',
          numeric: numericDetails?.T_up
        };
      case 'policy_mix':
        return {
          title: 'Policy Mix expansif',
          steps: [
            { formula: 'G \\uparrow \\Rightarrow IS \\rightarrow', text: 'Relance budgétaire : IS droite (Y↑, i↑).' },
            { formula: 'M \\uparrow \\Rightarrow LM \\rightarrow', text: 'Relance monétaire : LM droite (Y↑, i↓).' },
            { formula: '\\Delta i \\approx 0', text: 'Les effets sur i se compensent → pas d\'éviction !' },
          ],
          result: 'Y↑↑ et i stable (effet maximal sur Y)',
          numeric: numericDetails?.policy_mix
        };
      default: return null;
    }
  };

  const expl = getExplanation();
  const isISMoving = mode === 'numerique' ? (dG !== 0 || dT !== 0) : isShift !== 0;
  const isLMMoving = mode === 'numerique' ? dM !== 0 : lmShift !== 0;

  // Positions des labels
  const isLabelY = mode === 'numerique' ? 150 : (15 + isShift);
  const isLabelI = mode === 'numerique' ? calcISNumeric(isLabelY, G, T) : calcISTheoretic(isLabelY, isShift);
  const lmLabelY = mode === 'numerique' ? 650 : (85 + lmShift);
  const lmLabelI = mode === 'numerique' ? calcLMNumeric(lmLabelY, M) : calcLMTheoretic(lmLabelY, lmShift);

  // Intuition sur la forme des courbes
  const intuitionContent = {
    IS: {
      title: 'IS décroissante',
      steps: [
        { text: 'Quand les taux montent, emprunter coûte plus cher' },
        { text: 'Les entreprises réduisent leurs investissements', formula: 'i \\uparrow \\Rightarrow I \\downarrow' },
        { text: 'Moins d\'investissement = moins de demande globale' },
        { text: 'La production doit baisser pour équilibrer le marché', formula: 'Y \\downarrow' },
      ]
    },
    LM: {
      title: 'LM croissante',
      steps: [
        { text: 'Quand la production augmente, les gens font plus de transactions' },
        { text: 'Ils ont besoin de plus de monnaie pour payer', formula: 'Y \\uparrow \\Rightarrow L^d \\uparrow' },
        { text: 'Mais la banque centrale fixe la quantité de monnaie' },
        { text: 'Le taux d\'intérêt monte pour rationner la monnaie disponible', formula: 'i \\uparrow' },
      ]
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 my-8">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold">Modèle IS-LM</h3>
        <div className="flex items-center gap-2">
          {/* Toggle Mode - Désactivé pour production
          <div className="flex bg-slate-100/80 rounded-lg p-1">
            <button
              onClick={() => setMode('theorique')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors ${
                mode === 'theorique' ? 'bg-white shadow text-blue-600' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <BookOpen size={14} /> Théorique
            </button>
            <button
              onClick={() => setMode('numerique')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors ${
                mode === 'numerique' ? 'bg-white shadow text-emerald-600' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Calculator size={14} /> Numérique
            </button>
          </div>
          */}
          <button onClick={() => setShowLegend(!showLegend)}
            className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 ${showLegend ? 'bg-blue-100 text-blue-600' : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200'}`}>
            <Info size={16} /> {showLegend ? 'Masquer' : 'Variables'}
          </button>
        </div>
      </div>
      <p className="text-sm text-slate-600 mb-4">
        Équilibre marché des biens (IS) et marché monétaire (LM)
      </p>

      {showLegend && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm border border-blue-100">
          <div className="grid grid-cols-4 gap-2 text-blue-800">
            <span><strong>Y</strong> = Production</span>
            <span><strong>i</strong> = Taux d'intérêt</span>
            <span><strong>G</strong> = Dépenses pub.</span>
            <span><strong>T</strong> = Impôts</span>
            <span><strong>M</strong> = Masse monétaire</span>
            <span><strong>C</strong> = Consommation</span>
            <span><strong>I</strong> = Investissement</span>
            <span><strong>P</strong> = Prix</span>
          </div>
          {mode === 'numerique' && (
            <div className="mt-3 pt-3 border-t border-blue-200 grid grid-cols-4 gap-2 text-emerald-700">
              <span>c = {params.c}</span>
              <span>b = {params.b}</span>
              <span>k = {params.k}</span>
              <span>h = {params.h}</span>
            </div>
          )}
        </div>
      )}

      {/* Bouton Intuition */}
      <div className="mb-4">
        <button
          onClick={() => setShowIntuition(!showIntuition)}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
            showIntuition ? 'bg-gray-900 text-white' : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Lightbulb size={16} /> {showIntuition ? 'Masquer' : 'Intuition'}
        </button>
      </div>

      {showIntuition && (
        <IntuitionPanel
          sections={[
            { title: intuitionContent.IS.title, color: '#2563eb', steps: intuitionContent.IS.steps },
            { title: intuitionContent.LM.title, color: '#059669', steps: intuitionContent.LM.steps },
          ]}
        />
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setEvent('none')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 ${event === 'none' ? 'bg-gray-900 text-white' : 'bg-slate-100/80 hover:bg-slate-200'}`}>
          <RotateCcw size={14} /> Reset
        </button>
        {events.map(e => (
          <button key={e.id} onClick={() => setEvent(e.id)}
            style={{ backgroundColor: event === e.id ? e.color : `${e.color}15`, color: event === e.id ? 'white' : e.color }}
            className="px-3 py-1.5 rounded-lg text-sm font-medium">
            {e.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full bg-slate-100/50 rounded-xl border border-gray-100">
            {/* Grille */}
            {(mode === 'numerique' ? [0, 200, 400, 600, 800] : [0, 20, 40, 60, 80, 100]).map(v => (
              <line key={`gx${v}`} x1={toX(v)} y1={margin.top} x2={toX(v)} y2={margin.top + h} stroke="#e5e7eb" />
            ))}
            {(mode === 'numerique' ? [0, 3, 6, 9, 12] : [0, 2, 4, 6, 8, 10]).map(v => (
              <line key={`gy${v}`} x1={margin.left} y1={toY(v)} x2={margin.left + w} y2={toY(v)} stroke="#e5e7eb" />
            ))}
            
            {/* Axes */}
            <line x1={margin.left} y1={margin.top + h} x2={margin.left + w} y2={margin.top + h} stroke="#1f2937" strokeWidth="2" />
            <line x1={margin.left} y1={margin.top} x2={margin.left} y2={margin.top + h} stroke="#1f2937" strokeWidth="2" />
            <polygon points={`${margin.left + w},${margin.top + h} ${margin.left + w - 8},${margin.top + h - 4} ${margin.left + w - 8},${margin.top + h + 4}`} fill="#1f2937" />
            <polygon points={`${margin.left},${margin.top} ${margin.left - 4},${margin.top + 8} ${margin.left + 4},${margin.top + 8}`} fill="#1f2937" />
            <text x={margin.left + w + 10} y={margin.top + h + 5} className="text-sm font-semibold fill-gray-700">Y</text>
            <text x={margin.left - 8} y={margin.top - 8} className="text-sm font-semibold fill-gray-700">i (%)</text>

            {/* Graduations en mode numérique */}
            {mode === 'numerique' && (
              <>
                {[0, 200, 400, 600, 800].map(v => (
                  <text key={`lx${v}`} x={toX(v)} y={margin.top + h + 15} className="text-[10px] fill-gray-500" textAnchor="middle">{v}</text>
                ))}
                {[0, 3, 6, 9, 12].map(v => (
                  <text key={`ly${v}`} x={margin.left - 8} y={toY(v) + 4} className="text-[10px] fill-gray-500" textAnchor="end">{v}</text>
                ))}
              </>
            )}

            {/* Courbes initiales si elles bougent */}
            {event !== 'none' && (
              <>
                {isISMoving && (
                  <>
                    <path d={mode === 'numerique' ? genIS(params.G0, params.T0) : genIS(0)} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                    <text x={toX(mode === 'numerique' ? 150 : 15)} y={toY(mode === 'numerique' ? calcISNumeric(150, params.G0, params.T0) : calcISTheoretic(15, 0)) - 8} className="text-xs fill-gray-400" textAnchor="middle">IS</text>
                  </>
                )}
                {isLMMoving && (
                  <>
                    <path d={mode === 'numerique' ? genLM(params.M0) : genLM(0)} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                    <text x={toX(mode === 'numerique' ? 600 : 85)} y={toY(mode === 'numerique' ? calcLMNumeric(600, params.M0) : calcLMTheoretic(85, 0)) - 8} className="text-xs fill-gray-400" textAnchor="middle">LM</text>
                  </>
                )}
                <circle cx={toX(eq0.Y)} cy={toY(eq0.i)} r="7" fill="white" />
                <circle cx={toX(eq0.Y)} cy={toY(eq0.i)} r="5" fill="#94a3b8" />
                <text x={toX(eq0.Y)} y={toY(eq0.i) - 12} className="text-xs font-medium" textAnchor="middle" stroke="white" strokeWidth="3" paintOrder="stroke">E₀</text>
                <text x={toX(eq0.Y)} y={toY(eq0.i) - 12} className="text-xs font-medium fill-gray-500" textAnchor="middle">E₀</text>
              </>
            )}

            {/* IS (bleue) */}
            <path d={mode === 'numerique' ? genIS(G, T) : genIS(isShift)} fill="none" stroke="#2563eb" strokeWidth="3" className="transition-all duration-500" />
            <text x={toX(isLabelY)} y={toY(isLabelI) - 10} className="text-sm font-bold" textAnchor="middle" stroke="white" strokeWidth="4" paintOrder="stroke">
              IS{isISMoving ? "'" : ''}
            </text>
            <text x={toX(isLabelY)} y={toY(isLabelI) - 10} className="text-sm font-bold fill-blue-600" textAnchor="middle">
              IS{isISMoving ? "'" : ''}
            </text>

            {/* LM (verte) */}
            <path d={mode === 'numerique' ? genLM(M) : genLM(lmShift)} fill="none" stroke="#059669" strokeWidth="3" className="transition-all duration-500" />
            <text x={toX(lmLabelY)} y={toY(lmLabelI) - 10} className="text-sm font-bold" textAnchor="middle" stroke="white" strokeWidth="4" paintOrder="stroke">
              LM{isLMMoving ? "'" : ''}
            </text>
            <text x={toX(lmLabelY)} y={toY(lmLabelI) - 10} className="text-sm font-bold fill-emerald-600" textAnchor="middle">
              LM{isLMMoving ? "'" : ''}
            </text>

            {/* Équilibre */}
            <line x1={toX(eq1.Y)} y1={toY(eq1.i)} x2={toX(eq1.Y)} y2={margin.top + h} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5,3" className="transition-all duration-500" />
            <line x1={margin.left} y1={toY(eq1.i)} x2={toX(eq1.Y)} y2={toY(eq1.i)} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5,3" className="transition-all duration-500" />
            
            {/* Valeurs numériques sur les axes */}
            {mode === 'numerique' ? (
              <>
                <text x={toX(eq1.Y)} y={margin.top + h + 28} className="text-xs font-bold fill-red-600" textAnchor="middle">Y*={eq1.Y.toFixed(0)}</text>
                <text x={margin.left - 5} y={toY(eq1.i) + 4} className="text-xs font-bold fill-red-600" textAnchor="end">i*={eq1.i.toFixed(1)}%</text>
              </>
            ) : (
              <>
                <text x={toX(eq1.Y)} y={margin.top + h + 15} className="text-xs font-medium fill-red-600" textAnchor="middle">Y*</text>
                <text x={margin.left - 8} y={toY(eq1.i) + 4} className="text-xs font-medium fill-red-600" textAnchor="end">i*</text>
              </>
            )}
            
            <circle cx={toX(eq1.Y)} cy={toY(eq1.i)} r="9" fill="white" className="transition-all duration-500" />
            <circle cx={toX(eq1.Y)} cy={toY(eq1.i)} r="7" fill="#dc2626" className="transition-all duration-500" />
            <text x={toX(eq1.Y) + 15} y={toY(eq1.i) + 4} className="text-sm font-bold" stroke="white" strokeWidth="3" paintOrder="stroke">{event === 'none' ? 'E*' : 'E₁'}</text>
            <text x={toX(eq1.Y) + 15} y={toY(eq1.i) + 4} className="text-sm font-bold fill-red-600">{event === 'none' ? 'E*' : 'E₁'}</text>
          </svg>

          {/* Encadré valeurs numériques */}
          {mode === 'numerique' && event !== 'none' && (
            <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-sm font-semibold text-emerald-800 mb-2">📊 Calcul numérique</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-700">Avant (E₀) :</p>
                  <p className="font-mono text-emerald-700">Y₀ = {eq0.Y.toFixed(0)}, i₀ = {eq0.i.toFixed(2)}%</p>
                </div>
                <div>
                  <p className="text-slate-700">Après (E₁) :</p>
                  <p className="font-mono text-emerald-700">Y₁ = {eq1.Y.toFixed(0)}, i₁ = {eq1.i.toFixed(2)}%</p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-emerald-200">
                <p className="text-sm text-emerald-700">
                  <strong>ΔY = {(eq1.Y - eq0.Y).toFixed(0)}</strong> ({((eq1.Y - eq0.Y) / eq0.Y * 100).toFixed(1)}%) | 
                  <strong> Δi = {(eq1.i - eq0.i).toFixed(2)}</strong> points
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          {expl ? (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="font-semibold text-blue-900 mb-3">{expl.title}</p>
              <div className="space-y-3">
                {expl.steps.map((s, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-800 text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <div>
                      <MathDisplay>{s.formula}</MathDisplay>
                      <p className="text-sm text-blue-700 mt-1">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 pt-3 border-t border-blue-200 text-base font-bold text-blue-900">{expl.result}</p>
              {mode === 'numerique' && expl.numeric && (
                <div className="mt-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <p className="text-sm text-emerald-800">{expl.numeric}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-100/50 rounded-xl p-4 border border-slate-200">
              <p className="font-medium text-slate-800 mb-2">État initial</p>
              <p className="text-sm text-slate-700 mb-3">Clique sur un événement pour voir les effets.</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><div className="w-6 h-1 bg-blue-500 rounded" /><span><strong>IS</strong> : Marché des biens</span></div>
                <div className="flex items-center gap-2"><div className="w-6 h-1 bg-emerald-500 rounded" /><span><strong>LM</strong> : Marché monétaire</span></div>
              </div>
              {mode === 'numerique' && (
                <div className="mt-3 pt-3 border-t border-slate-200 text-sm text-slate-700">
                  <p>Paramètres : G={params.G0}, T={params.T0}, M={params.M0}</p>
                  <p>Équilibre : Y*={eq0.Y.toFixed(0)}, i*={eq0.i.toFixed(2)}%</p>
                </div>
              )}
            </div>
          )}

          <div className="space-y-3">
            <div className="p-4 bg-slate-100/50 rounded-lg border border-slate-200 relative">
              <Tooltip term="IS (marché des biens)" formula={"Y = C(Y-T) + I(i) + G"}>
                La courbe IS représente l'équilibre sur le marché des biens. Elle est <strong>décroissante</strong> car : 
                si i↑ → I↓ (l'investissement baisse) → Y↓. Chaque point de IS est un couple (Y,i) où offre = demande de biens.
              </Tooltip>
              <MathDisplay>{"Y = C(Y-T) + I(i) + G"}</MathDisplay>
            </div>
            <div className="p-4 bg-slate-100/50 rounded-lg border border-slate-200 relative">
              <Tooltip term="LM (marché monétaire)" formula={"\\frac{M}{P} = L(Y, i)"}>
                La courbe LM représente l'équilibre sur le marché de la monnaie. Elle est <strong>croissante</strong> car : 
                si Y↑ → demande de monnaie↑ → pour équilibrer, i↑. L(Y,i) est la demande de monnaie (croissante en Y, décroissante en i).
              </Tooltip>
              <MathDisplay>{"\\frac{M}{P} = L(Y, i)"}</MathDisplay>
            </div>
            <div className="p-4 bg-slate-100/50 rounded-lg border border-slate-200 relative">
              <Tooltip term="Effet d'éviction" formula={"G\\uparrow \\Rightarrow i\\uparrow \\Rightarrow I\\downarrow"}>
                Quand l'État augmente ses dépenses (G↑), il emprunte sur le marché financier. Cela fait monter les taux d'intérêt (i↑). 
                Les entreprises, face à des taux plus élevés, investissent moins (I↓). L'investissement privé est "évincé" par la dépense publique. 
                L'effet net sur Y est donc plus faible que le multiplicateur simple ne le prédit.
              </Tooltip>
              <MathDisplay>{"G\\uparrow \\Rightarrow i\\uparrow \\Rightarrow I\\downarrow"}</MathDisplay>
            </div>
            <div className="p-4 bg-slate-100/50 rounded-lg border border-slate-200 relative">
              <Tooltip term="Multiplicateur keynésien" formula={"k = \\frac{1}{1-c}"}>
                Quand G augmente de 1€, Y augmente de plus de 1€. Pourquoi ? Les revenus supplémentaires génèrent de la consommation (C = c×Y), 
                qui génère des revenus, etc. Si c = 0.8 (on consomme 80% du revenu), alors k = 1/(1-0.8) = 5. 
                Donc 1€ de dépense publique crée 5€ de PIB (en économie fermée, sans effet d'éviction).
              </Tooltip>
              <MathDisplay>{"k = \\frac{1}{1-c}"}</MathDisplay>
              {mode === 'numerique' && (
                <p className="text-xs text-emerald-600 mt-2">Avec c = {params.c}, k = {(1 / (1 - params.c)).toFixed(1)}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
