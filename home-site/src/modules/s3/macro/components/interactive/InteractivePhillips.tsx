import { useState } from 'react';
import { Math as MathDisplay } from '../../../../../components/Math';
import { RotateCcw, Info, Lightbulb } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { IntuitionPanel } from './IntuitionPanel';

type Event = 'none' | 'u_down' | 'u_up' | 'piE_up' | 'stagflation' | 'credibility';
type Mode = 'theorique' | 'numerique';

export function InteractivePhillips() {
  const [event, setEvent] = useState<Event>('none');
  const [showLegend, setShowLegend] = useState(false);
  const [mode, /* setMode */] = useState<Mode>('theorique');
  const [showIntuition, setShowIntuition] = useState(false);

  const W = 480, H = 400;
  const margin = { top: 30, right: 50, bottom: 50, left: 60 };
  const w = W - margin.left - margin.right;
  const h = H - margin.top - margin.bottom;

  // Paramètres numériques réalistes
  const params = {
    alpha: 0.5,    // Sensibilité de π à u (coefficient de Phillips)
    un: 5,         // Chômage naturel (5%)
    piE0: 2,       // Inflation anticipée initiale (2%)
  };

  const uMax = mode === 'numerique' ? 12 : 20;
  const piMin = mode === 'numerique' ? -4 : -15;
  const piMax = mode === 'numerique' ? 12 : 35;
  const toX = (u: number) => margin.left + (u / uMax) * w;
  const toY = (pi: number) => margin.top + h - ((pi - piMin) / (piMax - piMin)) * h;

  // Mode théorique
  const alphaT = 2;
  const mzT = 20;
  const unT = mzT / alphaT;

  // Calculs selon le mode
  const getState = () => {
    if (mode === 'numerique') {
      switch (event) {
        case 'u_down': return { u: 3, piE: params.piE0 };      // Relance : u passe de 5% à 3%
        case 'u_up': return { u: 8, piE: params.piE0 };        // Austérité : u passe de 5% à 8%
        case 'piE_up': return { u: params.un, piE: 6 };        // Anticipations montent à 6%
        case 'stagflation': return { u: 7, piE: 5 };           // Choc d'offre
        case 'credibility': return { u: params.un, piE: 0 };   // BC crédible ramène πᵉ à 0
        default: return { u: params.un, piE: params.piE0 };
      }
    } else {
      switch (event) {
        case 'u_down': return { u: 5, piE: 0 };
        case 'u_up': return { u: 15, piE: 0 };
        case 'piE_up': return { u: unT, piE: 12 };
        case 'stagflation': return { u: 14, piE: 8 };
        case 'credibility': return { u: unT, piE: -8 };
        default: return { u: unT, piE: 0 };
      }
    }
  };

  const state = getState();
  const currentUn = mode === 'numerique' ? params.un : unT;
  
  // Équation de Phillips : π = πᵉ + (m+z) - αu  OU  π = πᵉ - α(u - uₙ)
  const calcCT = (u: number, piE: number) => {
    if (mode === 'numerique') {
      // π = πᵉ - α(u - uₙ)
      return piE - params.alpha * (u - params.un);
    }
    return piE + mzT - alphaT * u;
  };

  const pi = calcCT(state.u, state.piE);
  const pi0 = calcCT(currentUn, mode === 'numerique' ? params.piE0 : 0);

  const generateCT = (piE: number) => {
    const points: string[] = [];
    for (let u = 0; u <= uMax; u += 0.2) {
      const piVal = calcCT(u, piE);
      if (piVal >= piMin && piVal <= piMax) {
        points.push(`${toX(u)},${toY(piVal)}`);
      }
    }
    return points.length > 1 ? `M ${points.join(' L ')}` : '';
  };

  const events = [
    { id: 'u_down', label: '↓u (relance)', color: 'var(--color-info)' },
    { id: 'u_up', label: '↑u (austérité)', color: 'var(--color-success)' },
    { id: 'piE_up', label: '↑πᵉ (anticipations)', color: 'var(--color-micro)' },
    { id: 'stagflation', label: 'Stagflation', color: 'var(--color-error)' },
    { id: 'credibility', label: 'BC crédible', color: 'var(--color-stats)' },
  ] as const;

  const isCTMoving = state.piE !== (mode === 'numerique' ? params.piE0 : 0);
  const piE0 = mode === 'numerique' ? params.piE0 : 0;

  const getExplanation = () => {
    const numericDetails = mode === 'numerique' ? {
      u_down: `u passe de ${params.un}% à ${state.u}%. Δu = ${state.u - params.un}%. Δπ = -α×Δu = -${params.alpha}×(${state.u - params.un}) = +${(-params.alpha * (state.u - params.un)).toFixed(1)}%. π = ${pi.toFixed(1)}%.`,
      u_up: `u passe de ${params.un}% à ${state.u}%. Δu = +${state.u - params.un}%. Δπ = -${params.alpha}×${state.u - params.un} = ${(-params.alpha * (state.u - params.un)).toFixed(1)}%. π = ${pi.toFixed(1)}%.`,
      piE_up: `πᵉ passe de ${params.piE0}% à ${state.piE}%. À u = uₙ, π = πᵉ = ${state.piE}%. La courbe CT monte de ${state.piE - params.piE0} points.`,
      stagflation: `Choc d'offre : uₙ↑ et πᵉ↑. Nouveau point : u = ${state.u}%, π = ${pi.toFixed(1)}%. C'est la stagflation.`,
      credibility: `BC crédible : πᵉ passe de ${params.piE0}% à ${state.piE}%. CT descend. À u = uₙ = ${params.un}%, π = ${pi.toFixed(1)}%.`,
    } : null;

    switch (event) {
      case 'u_down':
        return {
          title: 'Politique expansionniste (u < uₙ)',
          steps: [
            { formula: '\\pi = \\pi^e + (m+z) - \\alpha \\underbrace{u}_{\\downarrow}', text: 'Équation de Phillips : u apparaît avec un coefficient négatif (-α). Si u↓, alors π↑.' },
            { formula: '\\text{Déplacement le long de CT}', text: 'Géométriquement : on se déplace vers la gauche sur la courbe CT (u↓), donc on monte (π↑).' },
            { formula: '\\pi^e_{t+1} = \\pi_t', text: 'Anticipations adaptatives : les agents ajustent πᵉ à l\'inflation observée. Si π↑, alors πᵉ↑ la période suivante.' },
          ],
          result: 'SPIRALE INFLATIONNISTE : Si u < uₙ maintenu, π accélère chaque période !',
          numeric: numericDetails?.u_down
        };
      case 'u_up':
        return {
          title: 'Politique restrictive (u > uₙ)',
          steps: [
            { formula: '\\pi = \\pi^e + (m+z) - \\alpha \\underbrace{u}_{\\uparrow}', text: 'Équation de Phillips : si u↑, alors π↓.' },
            { formula: '\\text{Déplacement le long de CT}', text: 'Géométriquement : on se déplace vers la droite sur CT (u↑), donc on descend (π↓).' },
            { formula: '\\text{Ratio de sacrifice} = \\frac{1}{\\alpha}', text: 'Pour réduire π de 1 point, il faut accepter 1/α points de chômage supplémentaire.' },
          ],
          result: 'Désinflation coûteuse : chaque point d\'inflation en moins coûte du chômage',
          numeric: numericDetails?.u_up
        };
      case 'piE_up':
        return {
          title: 'Hausse des anticipations (↑πᵉ)',
          steps: [
            { formula: '\\pi = \\underbrace{\\pi^e}_{\\uparrow} + (m+z) - \\alpha u', text: 'Équation de Phillips : πᵉ apparaît avec un coefficient +1. Si πᵉ↑, alors π↑ pour tout u.' },
            { formula: '\\text{CT se translate vers le haut}', text: 'Géométriquement : toute la courbe CT monte de Δπᵉ (translation verticale).' },
            { formula: '\\text{À } u = u_n : \\pi = \\pi^e', text: 'Au chômage naturel, l\'inflation égale l\'inflation anticipée (anticipations auto-réalisatrices).' },
          ],
          result: 'À uₙ : π = πᵉ (les anticipations déterminent l\'inflation)',
          numeric: numericDetails?.piE_up
        };
      case 'stagflation':
        return {
          title: 'Stagflation (années 70)',
          steps: [
            { formula: '\\text{Choc d\'offre (pétrole)}', text: 'Un choc d\'offre négatif (ex: hausse du prix du pétrole) augmente les coûts de production.' },
            { formula: 'u_n \\uparrow \\text{ et } \\pi^e \\uparrow', text: 'Le chômage naturel augmente (WS-PS) ET les anticipations d\'inflation montent.' },
            { formula: 'CT \\uparrow + u \\rightarrow', text: 'Géométriquement : CT monte (πᵉ↑) ET on se déplace vers la droite (u↑ vers le nouveau uₙ).' },
          ],
          result: 'STAGFLATION : π↑ et u↑ simultanément (contradiction apparente avec Phillips)',
          numeric: numericDetails?.stagflation
        };
      case 'credibility':
        return {
          title: 'Crédibilité de la banque centrale',
          steps: [
            { formula: '\\text{BC annonce } \\pi_{\\text{cible}} = 0', text: 'La banque centrale s\'engage de manière crédible à une inflation nulle.' },
            { formula: '\\pi^e \\downarrow \\text{ immédiatement}', text: 'Si la BC est crédible, les agents ajustent immédiatement leurs anticipations : πᵉ↓.' },
            { formula: 'CT \\rightarrow \\text{bas sans } \\Delta u', text: 'Géométriquement : CT descend sans qu\'on ait besoin d\'augmenter u.' },
          ],
          result: 'Désinflation SANS COÛT si la BC est parfaitement crédible',
          numeric: numericDetails?.credibility
        };
      default: return null;
    }
  };

  const expl = getExplanation();

  // Intuition sur la forme des courbes
  const intuitionContent = {
    CT: {
      title: 'Phillips CT décroissante',
      steps: [
        { text: 'Quand le chômage baisse, les salariés sont en position de force' },
        { text: 'Ils négocient des hausses de salaires', formula: 'u \\downarrow \\Rightarrow W \\uparrow' },
        { text: 'Les entreprises augmentent leurs prix pour maintenir leurs marges' },
        { text: 'L\'inflation accélère : moins de chômage = plus d\'inflation', formula: '\\pi \\uparrow' },
      ]
    },
    LT: {
      title: 'Phillips LT verticale',
      steps: [
        { text: 'À long terme, les gens anticipent correctement l\'inflation', formula: '\\pi^e = \\pi' },
        { text: 'Les hausses de salaires sont neutralisées par l\'inflation anticipée' },
        { text: 'Le chômage revient toujours à son niveau naturel uₙ', formula: 'u = u_n' },
        { text: 'Impossible de réduire durablement le chômage par l\'inflation' },
      ]
    }
  };

  // Position du label CT
  const ctLabelU = mode === 'numerique' ? 1 : 2;
  const ctLabelPi = calcCT(ctLabelU, state.piE);

  return (
    <div className="rounded-2xl p-6 my-8" style={{ background: 'var(--color-bg-raised)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-border-default)' }}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold">Courbe de Phillips</h3>
        <div className="flex items-center gap-2">
          {/* Toggle Mode - Désactivé pour production
          <div className="flex bg-[var(--color-bg-overlay)] rounded-lg p-1">
            <button onClick={() => setMode('theorique')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors ${mode === 'theorique' ? 'bg-[var(--color-bg-raised)] shadow text-[var(--color-error)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
              <BookOpen size={14} /> Théorique
            </button>
            <button onClick={() => setMode('numerique')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors ${mode === 'numerique' ? 'bg-[var(--color-bg-raised)] shadow text-[var(--color-success)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
              <Calculator size={14} /> Numérique
            </button>
          </div>
          */}
          <button onClick={() => setShowLegend(!showLegend)}
            className="px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5"
            style={showLegend ? { background: 'var(--color-error-subtle)', color: 'var(--color-error)' } : { background: 'var(--color-bg-overlay)', color: 'var(--color-text-secondary)' }}>
            <Info size={16} /> {showLegend ? 'Masquer' : 'Variables'}
          </button>
        </div>
      </div>
      <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
        Relation inflation-chômage : arbitrage CT et neutralité LT
      </p>

      {showLegend && (
        <div className="mb-4 p-3 bg-[var(--color-error-subtle)] rounded-lg text-sm border border-[var(--color-error)]">
          <div className="grid grid-cols-4 gap-2 text-[var(--color-error)]">
            <span><strong>π</strong> = Taux d'inflation (%)</span>
            <span><strong>πᵉ</strong> = Inflation anticipée</span>
            <span><strong>u</strong> = Taux de chômage (%)</span>
            <span><strong>uₙ</strong> = Chômage naturel</span>
            <span><strong>α</strong> = Sensibilité</span>
            <span><strong>CT</strong> = Court terme</span>
            <span><strong>LT</strong> = Long terme</span>
            <span><strong>BC</strong> = Banque centrale</span>
          </div>
          {mode === 'numerique' && (
            <div className="mt-3 pt-3 border-t border-[var(--color-error)] grid grid-cols-3 gap-2 text-[var(--color-success)]">
              <span>α = {params.alpha}</span>
              <span>uₙ = {params.un}%</span>
              <span>πᵉ₀ = {params.piE0}%</span>
            </div>
          )}
        </div>
      )}

      {/* Bouton Intuition */}
      <div className="mb-4">
        <button onClick={() => setShowIntuition(!showIntuition)}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${showIntuition ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-raised)]' : 'bg-[var(--color-bg-overlay)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'}`}>
          <Lightbulb size={16} /> {showIntuition ? 'Masquer' : 'Intuition'}
        </button>
      </div>

      {showIntuition && (
        <IntuitionPanel
          sections={[
            { title: intuitionContent.CT.title, color: 'var(--color-info)', steps: intuitionContent.CT.steps },
            { title: intuitionContent.LT.title, color: 'var(--color-error)', steps: intuitionContent.LT.steps },
          ]}
        />
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setEvent('none')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 ${event === 'none' ? 'bg-[var(--color-text-primary)] text-[var(--color-bg-raised)]' : 'bg-[var(--color-bg-overlay)] hover:bg-[var(--color-surface-hover)]'}`}>
          <RotateCcw size={14} /> Reset
        </button>
        {events.map(e => (
          <button key={e.id} onClick={() => setEvent(e.id)}
            style={{ backgroundColor: event === e.id ? e.color : `color-mix(in srgb, ${e.color} 14%, transparent)`, color: event === e.id ? 'var(--color-bg-raised)' : e.color }}
            className="px-3 py-1.5 rounded-lg text-sm font-medium">
            {e.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full bg-[var(--color-bg-overlay)] rounded-xl border border-[var(--color-border-default)]">
            {/* Grille */}
            {(mode === 'numerique' ? [0, 3, 6, 9, 12] : [0, 5, 10, 15, 20]).map(u => (
              <line key={`gu${u}`} x1={toX(u)} y1={margin.top} x2={toX(u)} y2={margin.top + h} stroke="var(--color-border-default)" />
            ))}
            {(mode === 'numerique' ? [-4, 0, 4, 8, 12] : [-10, 0, 10, 20, 30]).map(piVal => (
              <line key={`gp${piVal}`} x1={margin.left} y1={toY(piVal)} x2={margin.left + w} y2={toY(piVal)} 
                stroke={piVal === 0 ? "var(--color-text-muted)" : "var(--color-border-default)"} strokeWidth={piVal === 0 ? 1.5 : 1} />
            ))}

            {/* Axes */}
            <line x1={margin.left} y1={margin.top + h} x2={margin.left + w} y2={margin.top + h} stroke="var(--color-text-secondary)" strokeWidth="2" />
            <line x1={margin.left} y1={margin.top} x2={margin.left} y2={margin.top + h} stroke="var(--color-text-secondary)" strokeWidth="2" />
            <polygon points={`${margin.left + w},${margin.top + h} ${margin.left + w - 8},${margin.top + h - 4} ${margin.left + w - 8},${margin.top + h + 4}`} fill="var(--color-text-secondary)" />
            <polygon points={`${margin.left},${margin.top} ${margin.left - 4},${margin.top + 8} ${margin.left + 4},${margin.top + 8}`} fill="var(--color-text-secondary)" />
            <text x={margin.left + w + 10} y={margin.top + h + 5} className="text-sm font-semibold fill-[var(--color-text-secondary)]">u (%)</text>
            <text x={margin.left - 8} y={margin.top - 8} className="text-sm font-semibold fill-[var(--color-text-secondary)]">π (%)</text>

            {/* Graduations */}
            {mode === 'numerique' && (
              <>
                {[0, 3, 6, 9, 12].map(v => (
                  <text key={`lx${v}`} x={toX(v)} y={margin.top + h + 15} className="text-[10px] fill-[var(--color-text-muted)]" textAnchor="middle">{v}</text>
                ))}
                {[-4, 0, 4, 8, 12].map(v => (
                  <text key={`ly${v}`} x={margin.left - 8} y={toY(v) + 4} className="text-[10px] fill-[var(--color-text-muted)]" textAnchor="end">{v}</text>
                ))}
              </>
            )}
            <text x={margin.left - 12} y={toY(0) + 4} className="text-[11px] fill-[var(--color-text-muted)]" textAnchor="end">0</text>

            {/* LT (verticale rouge en uₙ) */}
            <line x1={toX(currentUn)} y1={margin.top} x2={toX(currentUn)} y2={margin.top + h}
              stroke="var(--color-error)" strokeWidth="3" strokeDasharray="10,5" />
            <text x={toX(currentUn) + 8} y={margin.top + 20} className="text-sm font-bold" stroke="var(--color-bg-raised)" strokeWidth="3" paintOrder="stroke">LT</text>
            <text x={toX(currentUn) + 8} y={margin.top + 20} className="text-sm font-bold fill-[var(--color-error)]">LT</text>
            <text x={toX(currentUn)} y={margin.top + h + 35} className="text-xs font-medium fill-[var(--color-error)]" textAnchor="middle">
              uₙ{mode === 'numerique' ? `=${currentUn}%` : ''}
            </text>

            {/* CT initiale si elle bouge */}
            {event !== 'none' && isCTMoving && (
              <>
                <path d={generateCT(piE0)} fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeDasharray="8,4" />
                <text x={toX(mode === 'numerique' ? 1 : 2)} y={toY(calcCT(mode === 'numerique' ? 1 : 2, piE0)) - 8} className="text-xs fill-[var(--color-text-muted)]" textAnchor="middle">CT</text>
                <circle cx={toX(currentUn)} cy={toY(pi0)} r="7" fill="var(--color-bg-raised)" />
                <circle cx={toX(currentUn)} cy={toY(pi0)} r="5" fill="var(--color-text-muted)" />
                <text x={toX(currentUn)} y={toY(pi0) - 12} className="text-xs font-medium" textAnchor="middle" stroke="var(--color-bg-raised)" strokeWidth="3" paintOrder="stroke">E₀</text>
                <text x={toX(currentUn)} y={toY(pi0) - 12} className="text-xs font-medium fill-[var(--color-text-muted)]" textAnchor="middle">E₀</text>
              </>
            )}

            {/* CT (bleue) */}
            <path d={generateCT(state.piE)} fill="none" stroke="var(--color-info)" strokeWidth="3" className="transition-all duration-500" />
            <text x={toX(ctLabelU)} y={toY(ctLabelPi) - 10} className="text-sm font-bold" textAnchor="middle" stroke="var(--color-bg-raised)" strokeWidth="4" paintOrder="stroke">
              CT{isCTMoving ? "'" : ''}
            </text>
            <text x={toX(ctLabelU)} y={toY(ctLabelPi) - 10} className="text-sm font-bold fill-[var(--color-info)]" textAnchor="middle">
              CT{isCTMoving ? "'" : ''}
            </text>

            {/* Point actuel */}
            <line x1={toX(state.u)} y1={toY(pi)} x2={toX(state.u)} y2={margin.top + h}
              stroke="var(--color-error)" strokeWidth="1.5" strokeDasharray="5,3" className="transition-all duration-500" />
            <line x1={margin.left} y1={toY(pi)} x2={toX(state.u)} y2={toY(pi)}
              stroke="var(--color-error)" strokeWidth="1.5" strokeDasharray="5,3" className="transition-all duration-500" />
            
            {mode === 'numerique' ? (
              <>
                <text x={toX(state.u)} y={margin.top + h + 15} className="text-xs font-bold fill-[var(--color-error)]" textAnchor="middle">u={state.u}%</text>
                <text x={margin.left - 5} y={toY(pi) + 4} className="text-xs font-bold fill-[var(--color-error)]" textAnchor="end">π={pi.toFixed(1)}%</text>
              </>
            ) : (
              <>
                <text x={toX(state.u)} y={margin.top + h + 15} className="text-xs font-medium fill-[var(--color-error)]" textAnchor="middle">u</text>
                <text x={margin.left - 8} y={toY(pi) + 4} className="text-xs font-medium fill-[var(--color-error)]" textAnchor="end">π</text>
              </>
            )}
            
            <circle cx={toX(state.u)} cy={toY(pi)} r="9" fill="var(--color-bg-raised)" className="transition-all duration-500" />
            <circle cx={toX(state.u)} cy={toY(pi)} r="7" fill="var(--color-error)" className="transition-all duration-500" />
            <text x={toX(state.u) + 15} y={toY(pi) + 4} className="text-sm font-bold" stroke="var(--color-bg-raised)" strokeWidth="3" paintOrder="stroke">
              {event === 'none' ? 'E*' : 'E₁'}
            </text>
            <text x={toX(state.u) + 15} y={toY(pi) + 4} className="text-sm font-bold fill-[var(--color-error)]">
              {event === 'none' ? 'E*' : 'E₁'}
            </text>
          </svg>

          {/* Encadré valeurs numériques */}
          {mode === 'numerique' && event !== 'none' && (
            <div className="mt-4 p-3 bg-[var(--color-success-subtle)] rounded-lg border border-[var(--color-success)]">
              <p className="text-sm font-semibold text-[var(--color-success)] mb-2">📊 Calcul numérique</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[var(--color-text-secondary)]">Avant (E₀) :</p>
                  <p className="font-mono text-[var(--color-success)]">u₀ = {currentUn}%, π₀ = {pi0.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-[var(--color-text-secondary)]">Après (E₁) :</p>
                  <p className="font-mono text-[var(--color-success)]">u₁ = {state.u}%, π₁ = {pi.toFixed(1)}%</p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[var(--color-success)]">
                <p className="text-sm text-[var(--color-success)]">
                  <strong>Δu = {(state.u - currentUn).toFixed(1)} pts</strong> | 
                  <strong> Δπ = {(pi - pi0).toFixed(1)} pts</strong>
                  {state.u !== currentUn && <span className="ml-2">(ratio = {Math.abs((pi - pi0) / (state.u - currentUn)).toFixed(2)})</span>}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          {expl ? (
            <div className="bg-[var(--color-error-subtle)] rounded-xl p-4 border border-[var(--color-error)]">
              <p className="font-semibold text-[var(--color-text-primary)] mb-3">{expl.title}</p>
              <div className="space-y-3">
                {expl.steps.map((s, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[var(--color-error-subtle)] text-[var(--color-error)] text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <div>
                      <MathDisplay>{s.formula}</MathDisplay>
                      <p className="text-sm text-[var(--color-error)] mt-1">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 pt-3 border-t border-[var(--color-error)] text-base font-bold text-[var(--color-text-primary)]">{expl.result}</p>
              {mode === 'numerique' && expl.numeric && (
                <div className="mt-3 p-3 bg-[var(--color-success-subtle)] rounded-lg border border-[var(--color-success)]">
                  <p className="text-sm text-[var(--color-success)]">{expl.numeric}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[var(--color-bg-overlay)] rounded-xl p-4 border border-[var(--color-border-default)]">
              <p className="font-medium text-[var(--color-text-primary)] mb-2">Équilibre (u = uₙ, π = πᵉ)</p>
              <p className="text-sm text-[var(--color-text-secondary)] mb-3">Clique sur un événement pour voir l'arbitrage inflation-chômage.</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><div className="w-6 h-1 bg-[var(--color-info)] rounded" /><span><strong>CT</strong> : Court terme (décroissante)</span></div>
                <div className="flex items-center gap-2"><div className="w-6 h-1 bg-[var(--color-error-subtle)]0 rounded" style={{ backgroundImage: 'repeating-linear-gradient(90deg, var(--color-error) 0, var(--color-error) 6px, transparent 6px, transparent 10px)' }} /><span><strong>LT</strong> : Long terme (verticale en uₙ)</span></div>
              </div>
              {mode === 'numerique' && (
                <div className="mt-3 pt-3 border-t border-[var(--color-border-default)] text-sm text-[var(--color-text-secondary)]">
                  <p>Équilibre : u = uₙ = {currentUn}%, π = πᵉ = {pi0.toFixed(1)}%</p>
                </div>
              )}
            </div>
          )}

          <div className="space-y-3">
            <div className="p-4 bg-[var(--color-bg-overlay)] rounded-lg border border-[var(--color-border-default)] relative">
              <Tooltip term="Courbe de Phillips" formula={"\\pi_t = \\pi_t^e - \\alpha(u_t - u_n)"}>
                Relation empirique découverte par Phillips (1958) : quand le chômage est bas, l'inflation est élevée.
                <br/>• <strong>πᵉ</strong> : inflation anticipée (ajoutée par Friedman/Phelps)
                <br/>• <strong>α</strong> : sensibilité de l'inflation au chômage
                <br/>• <strong>uₙ</strong> : chômage naturel
                <br/>La courbe CT est <strong>décroissante</strong> : u↑ → π↓
              </Tooltip>
              <MathDisplay>{"\\pi_t = \\pi_t^e - \\alpha(u_t - u_n)"}</MathDisplay>
              {mode === 'numerique' && (
                <p className="text-xs text-[var(--color-success)] mt-2">π = {params.piE0} - {params.alpha}×(u - {params.un})</p>
              )}
            </div>
            <div className="p-4 bg-[var(--color-bg-overlay)] rounded-lg border border-[var(--color-border-default)] relative">
              <Tooltip term="Chômage naturel" formula={"u_n"}>
                Taux de chômage d'équilibre de <strong>moyen terme</strong>, déterminé par WS-PS.
                <br/>C'est le chômage "structurel" qui ne dépend pas de la demande.
                <br/>À u = uₙ, l'inflation est <strong>stable</strong> : π = πᵉ.
                <br/>La courbe LT est <strong>verticale</strong> en uₙ : à LT, pas d'arbitrage π/u.
              </Tooltip>
              <MathDisplay>{"\\text{À LT : } u = u_n, \\quad \\pi = \\pi^e"}</MathDisplay>
            </div>
            <div className="p-4 bg-[var(--color-bg-overlay)] rounded-lg border border-[var(--color-border-default)] relative">
              <Tooltip term="Ratio de sacrifice" formula={"\\text{Ratio} = \\frac{1}{\\alpha}"}>
                <strong>Coût de la désinflation</strong> : pour réduire l'inflation de 1 point de %, 
                il faut accepter 1/α points de chômage supplémentaire pendant un an.
                <br/>Plus α est grand, moins la désinflation est coûteuse.
              </Tooltip>
              <MathDisplay>{"\\text{Ratio de sacrifice} = \\frac{1}{\\alpha}"}</MathDisplay>
              {mode === 'numerique' && (
                <p className="text-xs text-[var(--color-success)] mt-2">Ratio = 1/{params.alpha} = {(1/params.alpha).toFixed(1)} → Pour baisser π de 1pt, il faut {(1/params.alpha).toFixed(1)}pt de chômage en plus</p>
              )}
            </div>
            <div className="p-4 bg-[var(--color-bg-overlay)] rounded-lg border border-[var(--color-border-default)] relative">
              <Tooltip term="Anticipations adaptatives" formula={"\\pi^e_{t+1} = \\pi_t"}>
                Les agents forment leurs anticipations en regardant le passé : ils anticipent que l'inflation de demain sera égale à celle d'aujourd'hui.
                <br/><br/>
                <strong>Conséquence importante :</strong> si le chômage reste en-dessous du naturel, l'inflation accélère période après période (spirale inflationniste).
              </Tooltip>
              <div className="space-y-1 text-sm text-[var(--color-text-primary)]">
                <p><strong>Anticipations adaptatives :</strong> πᵉₜ₊₁ = πₜ</p>
                <p className="text-[var(--color-text-secondary)]">Si u &lt; uₙ maintenu → π accélère sans fin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
