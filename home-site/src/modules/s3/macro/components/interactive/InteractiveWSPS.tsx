import { useState } from 'react';
import { Math as MathDisplay } from '../../../../../components/Math';
import { RotateCcw, Info, Lightbulb } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { IntuitionPanel } from './IntuitionPanel';

type Event = 'none' | 'mu_up' | 'mu_down' | 'z_up' | 'z_down' | 'productivity';
type Mode = 'theorique' | 'numerique';

export function InteractiveWSPS() {
  const [event, setEvent] = useState<Event>('none');
  const [showLegend, setShowLegend] = useState(false);
  const [mode, /* setMode */] = useState<Mode>('theorique');
  const [showIntuition, setShowIntuition] = useState(false);

  const W = 450, H = 400;
  const margin = { top: 30, right: 30, bottom: 50, left: 60 };
  const w = W - margin.left - margin.right;
  const h = H - margin.top - margin.bottom;

  // Paramètres numériques réalistes
  const params = {
    z0: 0.6,      // Pouvoir de négociation initial
    mu0: 0.25,    // Taux de marge initial (25%)
    alpha: 0.04,  // Sensibilité du salaire au chômage
    A: 1,         // Productivité (normalisée)
    L: 100,       // Population active (millions)
  };

  const uMax = mode === 'numerique' ? 20 : 25;
  const wpMax = mode === 'numerique' ? 1.0 : 1.0;
  const toX = (u: number) => margin.left + (u / uMax) * w;
  const toY = (wp: number) => margin.top + h - (wp / wpMax) * h;

  // Calculs numériques
  const getNumericShifts = () => {
    switch (event) {
      case 'mu_up': return { dMu: 0.15, dZ: 0, dA: 0 };      // μ: 25% → 40%
      case 'mu_down': return { dMu: -0.10, dZ: 0, dA: 0 };   // μ: 25% → 15%
      case 'z_up': return { dMu: 0, dZ: 0.15, dA: 0 };       // z: 0.6 → 0.75
      case 'z_down': return { dMu: 0, dZ: -0.15, dA: 0 };    // z: 0.6 → 0.45
      case 'productivity': return { dMu: 0, dZ: 0, dA: 0.2 }; // A: 1 → 1.2
      default: return { dMu: 0, dZ: 0, dA: 0 };
    }
  };

  const { dMu, dZ, dA } = getNumericShifts();
  const mu = params.mu0 + dMu;
  const z = params.z0 + dZ;
  const A = params.A + dA;

  // Équations WS-PS
  // WS: W/Pᵉ = z(1 - αu)
  // PS: W/P = A/(1+μ)
  // À l'équilibre MT: P = Pᵉ donc WS = PS
  // z(1 - αuₙ) = A/(1+μ)
  // uₙ = (1 - A/(z(1+μ))) / α

  const calcWS = (u: number, zVal: number) => zVal * (1 - params.alpha * u);
  const calcPS = (muVal: number, aVal: number) => aVal / (1 + muVal);
  const calcUn = (zVal: number, muVal: number, aVal: number) => {
    const ps = calcPS(muVal, aVal);
    return (1 - ps / zVal) / params.alpha;
  };

  // Valeurs initiales et finales
  const wP_PS0 = calcPS(params.mu0, params.A);
  const wP_PS = calcPS(mu, A);
  const un0 = calcUn(params.z0, params.mu0, params.A);
  const un = calcUn(z, mu, A);
  const Yn0 = params.L * (1 - un0 / 100);
  const Yn = params.L * (1 - un / 100);

  // Mode théorique (simplifié)
  const getTheoreticShifts = () => {
    switch (event) {
      case 'mu_up': return { dMuT: 0.35, dZT: 0, dPST: 0 };
      case 'mu_down': return { dMuT: -0.25, dZT: 0, dPST: 0 };
      case 'z_up': return { dMuT: 0, dZT: 0.18, dPST: 0 };
      case 'z_down': return { dMuT: 0, dZT: -0.15, dPST: 0 };
      case 'productivity': return { dMuT: 0, dZT: 0, dPST: 0.10 };
      default: return { dMuT: 0, dZT: 0, dPST: 0 };
    }
  };

  const { dMuT, dZT, dPST } = getTheoreticShifts();
  const z0T = 0.75, mu0T = 0.75, alphaT = 0.032;
  const zT = z0T + dZT;
  const wP_PS0T = 1 / (1 + mu0T);
  const wP_PST = 1 / (1 + mu0T + dMuT) + dPST;
  const calcWST = (u: number, zVal: number) => zVal * (1 - alphaT * u);
  const calcUnT = (zVal: number, psVal: number) => (1 - psVal / zVal) / alphaT;
  const un0T = calcUnT(z0T, wP_PS0T);
  const unT = calcUnT(zT, wP_PST);

  const genWS = (zVal: number) => {
    const pts: string[] = [];
    const calcFn = mode === 'numerique' ? calcWS : calcWST;
    for (let u = 0; u <= uMax; u += 0.5) {
      const wp = calcFn(u, zVal);
      if (wp >= 0 && wp <= wpMax) pts.push(`${toX(u)},${toY(wp)}`);
    }
    return pts.length > 1 ? `M ${pts.join(' L ')}` : '';
  };

  const events = [
    { id: 'mu_up', label: '↑μ (marges)', color: 'var(--color-warning)' },
    { id: 'mu_down', label: '↓μ (concurrence)', color: 'var(--color-warning)' },
    { id: 'z_up', label: '↑z (alloc/syndicats)', color: 'var(--color-micro)' },
    { id: 'z_down', label: '↓z (flexibilité)', color: 'var(--color-micro)' },
    { id: 'productivity', label: '↑A (productivité)', color: 'var(--color-success)' },
  ] as const;

  const currentUn = mode === 'numerique' ? un : unT;
  const currentUn0 = mode === 'numerique' ? un0 : un0T;
  const currentPS = mode === 'numerique' ? wP_PS : wP_PST;
  const currentPS0 = mode === 'numerique' ? wP_PS0 : wP_PS0T;
  const currentZ = mode === 'numerique' ? z : zT;
  const currentZ0 = mode === 'numerique' ? params.z0 : z0T;

  const isWSMoving = mode === 'numerique' ? dZ !== 0 : dZT !== 0;
  const isPSMoving = mode === 'numerique' ? (dMu !== 0 || dA !== 0) : (dMuT !== 0 || dPST !== 0);

  const getExplanation = () => {
    const numericDetails = mode === 'numerique' ? {
      mu_up: `μ passe de ${(params.mu0*100).toFixed(0)}% à ${(mu*100).toFixed(0)}%. PS = A/(1+μ) = ${A.toFixed(1)}/${(1+mu).toFixed(2)} = ${wP_PS.toFixed(3)}. Le salaire réel offert baisse.`,
      mu_down: `μ passe de ${(params.mu0*100).toFixed(0)}% à ${(mu*100).toFixed(0)}%. Plus de concurrence → marges plus faibles → salaire réel offert plus élevé.`,
      z_up: `z passe de ${params.z0.toFixed(2)} à ${z.toFixed(2)}. Les salariés ont plus de pouvoir → demandent des salaires plus élevés.`,
      z_down: `z passe de ${params.z0.toFixed(2)} à ${z.toFixed(2)}. Flexibilisation → salariés acceptent des salaires plus bas.`,
      productivity: `A passe de ${params.A.toFixed(1)} à ${A.toFixed(1)}. PS = A/(1+μ) augmente → salaire réel offert plus élevé.`,
    } : null;

    switch (event) {
      case 'mu_up':
        return {
          title: 'Hausse du taux de marge (↑μ)',
          steps: [
            { formula: '\\frac{W}{P} = \\frac{A}{1+\\underbrace{\\mu}_{\\uparrow}}', text: 'PS : μ est au dénominateur. Si μ↑, le salaire réel offert diminue.' },
            { formula: '\\text{PS est horizontale à } \\frac{W}{P} = \\frac{A}{1+\\mu}', text: 'Géométriquement : PS est une droite horizontale qui descend.' },
            { formula: 'PS \\rightarrow \\text{bas}', text: 'L\'intersection avec WS se fait à un u plus élevé → uₙ↑.' },
          ],
          result: 'uₙ↑ (plus de chômage structurel)',
          numeric: numericDetails?.mu_up
        };
      case 'mu_down':
        return {
          title: 'Baisse du taux de marge (↓μ)',
          steps: [
            { formula: '\\frac{W}{P} = \\frac{A}{1+\\underbrace{\\mu}_{\\downarrow}}', text: 'μ diminue → le salaire réel offert augmente.' },
            { formula: '\\text{PS monte}', text: 'La droite horizontale PS monte.' },
            { formula: 'PS \\rightarrow \\text{haut}', text: 'L\'intersection avec WS se fait à un u plus bas → uₙ↓.' },
          ],
          result: 'uₙ↓ (moins de chômage structurel)',
          numeric: numericDetails?.mu_down
        };
      case 'z_up':
        return {
          title: 'Hausse du pouvoir de négociation (↑z)',
          steps: [
            { formula: '\\frac{W}{P^e} = \\underbrace{z}_{\\uparrow}(1-\\alpha u)', text: 'z multiplie toute la courbe. Si z↑, le salaire demandé augmente pour tout u.' },
            { formula: '\\text{WS est décroissante en } u', text: 'WS est une droite décroissante qui se translate vers le haut.' },
            { formula: 'WS \\rightarrow \\text{haut}', text: 'L\'intersection avec PS (fixe) se fait à un u plus élevé → uₙ↑.' },
          ],
          result: 'uₙ↑ (allocations généreuses = plus de chômage)',
          numeric: numericDetails?.z_up
        };
      case 'z_down':
        return {
          title: 'Baisse du pouvoir de négociation (↓z)',
          steps: [
            { formula: '\\frac{W}{P^e} = \\underbrace{z}_{\\downarrow}(1-\\alpha u)', text: 'z diminue → salaire demandé plus bas pour tout u.' },
            { formula: 'WS \\rightarrow \\text{bas}', text: 'WS se translate vers le bas.' },
            { formula: 'u_n \\downarrow', text: 'L\'intersection avec PS se fait à un u plus bas → uₙ↓.' },
          ],
          result: 'uₙ↓ (flexibilité du marché du travail)',
          numeric: numericDetails?.z_down
        };
      case 'productivity':
        return {
          title: 'Progrès technique (↑A)',
          steps: [
            { formula: '\\frac{W}{P} = \\frac{\\underbrace{A}_{\\uparrow}}{1+\\mu}', text: 'A est au numérateur. Si A↑, le salaire réel offert augmente.' },
            { formula: 'PS \\rightarrow \\text{haut}', text: 'La droite horizontale PS monte.' },
            { formula: 'u_n \\downarrow', text: 'L\'intersection avec WS se fait à un u plus bas → uₙ↓.' },
          ],
          result: 'uₙ↓ (les gains de productivité réduisent le chômage)',
          numeric: numericDetails?.productivity
        };
      default: return null;
    }
  };

  const expl = getExplanation();

  // Intuition sur la forme des courbes
  const intuitionContent = {
    WS: {
      title: 'WS décroissante',
      steps: [
        { text: 'Quand le chômage est faible, les travailleurs sont en position de force' },
        { text: 'Peu de concurrence entre eux = ils négocient des salaires élevés', formula: 'u \\downarrow \\Rightarrow W \\uparrow' },
        { text: 'À l\'inverse, un chômage élevé affaiblit leur pouvoir de négociation' },
        { text: 'Ils acceptent des salaires plus bas pour garder leur emploi', formula: 'u \\uparrow \\Rightarrow W \\downarrow' },
      ]
    },
    PS: {
      title: 'PS horizontale',
      steps: [
        { text: 'Les entreprises fixent leurs prix avec une marge sur les coûts', formula: 'P = (1+\\mu) \\times W' },
        { text: 'Cette marge μ dépend de leur pouvoir de marché, pas du chômage' },
        { text: 'Le salaire réel qu\'elles offrent est donc constant', formula: '\\frac{W}{P} = \\frac{1}{1+\\mu}' },
        { text: 'Peu importe le niveau de chômage, PS reste au même niveau' },
      ]
    }
  };

  // Position du label WS avec anti-collision
  const baseWsLabelU = 3;
  const wsLabelBaseX = toX(baseWsLabelU);
  const wsLabelBaseY = toY(mode === 'numerique' ? calcWS(baseWsLabelU, currentZ) : calcWST(baseWsLabelU, currentZ));
  const e1X = toX(currentUn);
  const e1Y = toY(currentPS);
  const distanceToE1 = Math.sqrt(Math.pow(e1X - wsLabelBaseX, 2) + Math.pow(e1Y - wsLabelBaseY, 2));
  const needsOffset = (distanceToE1 < 70 || currentUn < 6) && event !== 'none';
  const wsLabelUAdjusted = needsOffset ? 12 : baseWsLabelU;
  const wsLabelWPAdjusted = mode === 'numerique' ? calcWS(wsLabelUAdjusted, currentZ) : calcWST(wsLabelUAdjusted, currentZ);

  return (
    <div className="bg-[var(--color-bg-raised)] rounded-2xl border border-[var(--color-border-default)] p-6 my-8">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold">Modèle WS-PS</h3>
        <div className="flex items-center gap-2">
          {/* Toggle Mode - Désactivé pour production
          <div className="flex bg-[var(--color-bg-overlay)] rounded-lg p-1">
            <button onClick={() => setMode('theorique')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors ${mode === 'theorique' ? 'bg-[var(--color-bg-raised)] shadow text-[var(--color-micro)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
              <BookOpen size={14} /> Théorique
            </button>
            <button onClick={() => setMode('numerique')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors ${mode === 'numerique' ? 'bg-[var(--color-bg-raised)] shadow text-[var(--color-success)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
              <Calculator size={14} /> Numérique
            </button>
          </div>
          */}
          <button onClick={() => setShowLegend(!showLegend)}
            className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 ${showLegend ? 'bg-[var(--color-micro-subtle)] text-[var(--color-micro)]' : 'bg-[var(--color-bg-overlay)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'}`}>
            <Info size={16} /> {showLegend ? 'Masquer' : 'Variables'}
          </button>
        </div>
      </div>
      <p className="text-sm text-[var(--color-text-secondary)] mb-4">
        Détermination du taux de chômage naturel
      </p>

      {showLegend && (
        <div className="mb-4 p-3 bg-[var(--color-micro-subtle)] rounded-lg text-sm border border-[var(--color-micro)]">
          <div className="grid grid-cols-4 gap-2 text-[var(--color-micro)]">
            <span><strong>W/P</strong> = Salaire réel</span>
            <span><strong>u</strong> = Chômage (%)</span>
            <span><strong>uₙ</strong> = Chômage naturel</span>
            <span><strong>μ</strong> = Taux de marge</span>
            <span><strong>z</strong> = Pouvoir négociation</span>
            <span><strong>α</strong> = Sensibilité</span>
            <span><strong>A</strong> = Productivité</span>
            <span><strong>Pᵉ</strong> = Prix anticipé</span>
          </div>
          {mode === 'numerique' && (
            <div className="mt-3 pt-3 border-t border-[var(--color-micro)] grid grid-cols-4 gap-2 text-[var(--color-success)]">
              <span>z₀ = {params.z0}</span>
              <span>μ₀ = {(params.mu0*100).toFixed(0)}%</span>
              <span>α = {params.alpha}</span>
              <span>L = {params.L}M</span>
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
            { title: intuitionContent.WS.title, color: 'var(--color-micro)', steps: intuitionContent.WS.steps },
            { title: intuitionContent.PS.title, color: 'var(--color-warning)', steps: intuitionContent.PS.steps },
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
            {(mode === 'numerique' ? [0, 5, 10, 15, 20] : [0, 5, 10, 15, 20, 25]).map(v => (
              <line key={`gx${v}`} x1={toX(v)} y1={margin.top} x2={toX(v)} y2={margin.top + h} stroke="var(--color-border-default)" />
            ))}
            {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map(v => (
              <line key={`gy${v}`} x1={margin.left} y1={toY(v)} x2={margin.left + w} y2={toY(v)} stroke="var(--color-border-default)" />
            ))}
            
            {/* Axes */}
            <line x1={margin.left} y1={margin.top + h} x2={margin.left + w} y2={margin.top + h} stroke="var(--color-text-secondary)" strokeWidth="2" />
            <line x1={margin.left} y1={margin.top} x2={margin.left} y2={margin.top + h} stroke="var(--color-text-secondary)" strokeWidth="2" />
            <polygon points={`${margin.left + w},${margin.top + h} ${margin.left + w - 8},${margin.top + h - 4} ${margin.left + w - 8},${margin.top + h + 4}`} fill="var(--color-text-secondary)" />
            <polygon points={`${margin.left},${margin.top} ${margin.left - 4},${margin.top + 8} ${margin.left + 4},${margin.top + 8}`} fill="var(--color-text-secondary)" />
            <text x={margin.left + w - 5} y={margin.top + h + 28} className="text-sm font-semibold fill-[var(--color-text-secondary)]" textAnchor="end">u (%)</text>
            <text x={margin.left - 8} y={margin.top - 8} className="text-sm font-semibold fill-[var(--color-text-secondary)]">W/P</text>

            {/* Graduations en mode numérique */}
            {mode === 'numerique' && (
              <>
                {[0, 5, 10, 15, 20].map(v => (
                  <text key={`lx${v}`} x={toX(v)} y={margin.top + h + 15} className="text-[10px] fill-[var(--color-text-muted)]" textAnchor="middle">{v}%</text>
                ))}
                {[0.2, 0.4, 0.6, 0.8].map(v => (
                  <text key={`ly${v}`} x={margin.left - 8} y={toY(v) + 4} className="text-[10px] fill-[var(--color-text-muted)]" textAnchor="end">{v.toFixed(1)}</text>
                ))}
              </>
            )}

            {/* Courbes initiales si elles bougent */}
            {event !== 'none' && (
              <>
                {isWSMoving && (
                  <>
                    <path d={genWS(currentZ0)} fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeDasharray="6,4" />
                    <text x={toX(3)} y={toY(mode === 'numerique' ? calcWS(3, currentZ0) : calcWST(3, currentZ0)) - 8} className="text-xs fill-[var(--color-text-muted)]" textAnchor="middle">WS</text>
                  </>
                )}
                {isPSMoving && (
                  <>
                    <line x1={margin.left} y1={toY(currentPS0)} x2={margin.left + w} y2={toY(currentPS0)} stroke="var(--color-text-muted)" strokeWidth="2" strokeDasharray="6,4" />
                    <text x={margin.left + w - 24} y={toY(currentPS0) - 8} className="text-xs fill-[var(--color-text-muted)]" textAnchor="middle">PS</text>
                  </>
                )}
                <circle cx={toX(currentUn0)} cy={toY(currentPS0)} r="7" fill="var(--color-bg-raised)" />
                <circle cx={toX(currentUn0)} cy={toY(currentPS0)} r="5" fill="var(--color-text-muted)" />
                <text x={toX(currentUn0)} y={toY(currentPS0) - 12} className="text-xs font-medium" textAnchor="middle" stroke="var(--color-bg-raised)" strokeWidth="3" paintOrder="stroke">E₀</text>
                <text x={toX(currentUn0)} y={toY(currentPS0) - 12} className="text-xs font-medium fill-[var(--color-text-muted)]" textAnchor="middle">E₀</text>
              </>
            )}

            {/* WS (violette) */}
            <path d={genWS(currentZ)} fill="none" stroke="var(--color-micro)" strokeWidth="3" className="transition-all duration-500" />
            <text x={toX(wsLabelUAdjusted)} y={toY(wsLabelWPAdjusted) - 10} className="text-sm font-bold" textAnchor="middle" stroke="var(--color-bg-raised)" strokeWidth="4" paintOrder="stroke">
              WS{isWSMoving ? "'" : ''}
            </text>
            <text x={toX(wsLabelUAdjusted)} y={toY(wsLabelWPAdjusted) - 10} className="text-sm font-bold fill-[var(--color-micro)]" textAnchor="middle">
              WS{isWSMoving ? "'" : ''}
            </text>

            {/* PS (orange) */}
            <line x1={margin.left} y1={toY(currentPS)} x2={margin.left + w} y2={toY(currentPS)} stroke="var(--color-warning)" strokeWidth="3" className="transition-all duration-500" />
            <text x={margin.left + w - 22} y={toY(currentPS) - 10} className="text-sm font-bold" textAnchor="middle" stroke="var(--color-bg-raised)" strokeWidth="4" paintOrder="stroke">
              PS{isPSMoving ? "'" : ''}
            </text>
            <text x={margin.left + w - 22} y={toY(currentPS) - 10} className="text-sm font-bold fill-[var(--color-warning)]" textAnchor="middle">
              PS{isPSMoving ? "'" : ''}
            </text>

            {/* Équilibre */}
            <line x1={toX(currentUn)} y1={toY(currentPS)} x2={toX(currentUn)} y2={margin.top + h} stroke="var(--color-error)" strokeWidth="1.5" strokeDasharray="5,3" className="transition-all duration-500" />
            
            {mode === 'numerique' ? (
              <>
                <text x={toX(currentUn)} y={margin.top + h + 28} className="text-xs font-bold fill-[var(--color-error)]" textAnchor="middle">uₙ={currentUn.toFixed(1)}%</text>
                <text x={margin.left - 5} y={toY(currentPS) + 4} className="text-xs font-bold fill-[var(--color-warning)]" textAnchor="end">{currentPS.toFixed(2)}</text>
              </>
            ) : (
              <>
                <text x={toX(currentUn)} y={margin.top + h + 15} className="text-xs font-medium fill-[var(--color-error)]" textAnchor="middle">uₙ</text>
                <text x={margin.left - 8} y={toY(currentPS) + 4} className="text-xs font-medium fill-[var(--color-warning)]" textAnchor="end">W/P*</text>
              </>
            )}
            
            <circle cx={toX(currentUn)} cy={toY(currentPS)} r="9" fill="var(--color-bg-raised)" className="transition-all duration-500" />
            <circle cx={toX(currentUn)} cy={toY(currentPS)} r="7" fill="var(--color-error)" className="transition-all duration-500" />
            <text x={toX(currentUn) + 15} y={toY(currentPS) + 4} className="text-sm font-bold" stroke="var(--color-bg-raised)" strokeWidth="3" paintOrder="stroke">{event === 'none' ? 'E*' : 'E₁'}</text>
            <text x={toX(currentUn) + 15} y={toY(currentPS) + 4} className="text-sm font-bold fill-[var(--color-error)]">{event === 'none' ? 'E*' : 'E₁'}</text>
          </svg>

          {/* Encadré valeurs numériques */}
          {mode === 'numerique' && event !== 'none' && (
            <div className="mt-4 p-3 bg-[var(--color-success-subtle)] rounded-lg border border-[var(--color-success)]">
              <p className="text-sm font-semibold text-[var(--color-success)] mb-2">📊 Calcul numérique</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[var(--color-text-secondary)]">Avant (E₀) :</p>
                  <p className="font-mono text-[var(--color-success)]">uₙ₀ = {currentUn0.toFixed(1)}%, Yₙ₀ = {Yn0.toFixed(1)}M</p>
                </div>
                <div>
                  <p className="text-[var(--color-text-secondary)]">Après (E₁) :</p>
                  <p className="font-mono text-[var(--color-success)]">uₙ₁ = {currentUn.toFixed(1)}%, Yₙ₁ = {Yn.toFixed(1)}M</p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[var(--color-success)]">
                <p className="text-sm text-[var(--color-success)]">
                  <strong>Δuₙ = {(currentUn - currentUn0).toFixed(1)} pts</strong> | 
                  <strong> ΔYₙ = {(Yn - Yn0).toFixed(1)}M</strong> ({((Yn - Yn0) / Yn0 * 100).toFixed(1)}%)
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          {expl ? (
            <div className="bg-[var(--color-micro-subtle)] rounded-xl p-4 border border-[var(--color-micro)]">
              <p className="font-semibold text-[var(--color-text-primary)] mb-3">{expl.title}</p>
              <div className="space-y-3">
                {expl.steps.map((s, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[var(--color-micro-subtle)] text-[var(--color-micro)] text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <div>
                      <MathDisplay>{s.formula}</MathDisplay>
                      <p className="text-sm text-[var(--color-micro)] mt-1">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 pt-3 border-t border-[var(--color-micro)] text-base font-bold text-[var(--color-text-primary)]">{expl.result}</p>
              {mode === 'numerique' && expl.numeric && (
                <div className="mt-3 p-3 bg-[var(--color-success-subtle)] rounded-lg border border-[var(--color-success)]">
                  <p className="text-sm text-[var(--color-success)]">{expl.numeric}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[var(--color-bg-overlay)] rounded-xl p-4 border border-[var(--color-border-default)]">
              <p className="font-medium text-[var(--color-text-primary)] mb-2">État initial</p>
              <p className="text-sm text-[var(--color-text-secondary)] mb-3">Clique sur un événement pour voir les effets sur uₙ.</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><div className="w-6 h-1 bg-[var(--color-micro-subtle)]0 rounded" /><span><strong>WS</strong> : Négociation salariale</span></div>
                <div className="flex items-center gap-2"><div className="w-6 h-1 bg-[var(--color-warning)] rounded" /><span><strong>PS</strong> : Fixation des prix</span></div>
              </div>
              {mode === 'numerique' && (
                <div className="mt-3 pt-3 border-t border-[var(--color-border-default)] text-sm text-[var(--color-text-secondary)]">
                  <p>Paramètres : z={params.z0}, μ={(params.mu0*100).toFixed(0)}%, A={params.A}</p>
                  <p>Équilibre : uₙ={currentUn0.toFixed(1)}%, Yₙ={Yn0.toFixed(1)}M</p>
                </div>
              )}
            </div>
          )}

          <div className="space-y-3">
            <div className="p-4 bg-[var(--color-bg-overlay)] rounded-lg border border-[var(--color-border-default)] relative">
              <Tooltip term="WS (Wage Setting)" formula={"\\frac{W}{P^e} = z(1-\\alpha u)"}>
                Courbe de <strong>négociation salariale</strong>. Les travailleurs demandent un salaire réel W/Pᵉ qui dépend de :
                <br/>• <strong>u</strong> : plus le chômage est bas, plus ils ont de pouvoir → salaire demandé↑
                <br/>• <strong>z</strong> : allocations chômage, syndicats, salaire minimum → salaire demandé↑
                <br/>La courbe est <strong>décroissante</strong> en u.
              </Tooltip>
              <MathDisplay>{"\\frac{W}{P^e} = z(1-\\alpha u)"}</MathDisplay>
            </div>
            <div className="p-4 bg-[var(--color-bg-overlay)] rounded-lg border border-[var(--color-border-default)] relative">
              <Tooltip term="PS (Price Setting)" formula={"\\frac{W}{P} = \\frac{A}{1+\\mu}"}>
                Courbe de <strong>fixation des prix</strong>. Les entreprises fixent P = (1+μ)×W/A. 
                Donc le salaire réel offert est W/P = A/(1+μ).
                <br/>• <strong>μ</strong> : taux de marge (pouvoir de marché) → si μ↑, W/P↓
                <br/>• <strong>A</strong> : productivité → si A↑, W/P↑
                <br/>C'est une droite <strong>horizontale</strong> car elle ne dépend pas de u.
              </Tooltip>
              <MathDisplay>{"\\frac{W}{P} = \\frac{A}{1+\\mu}"}</MathDisplay>
              {mode === 'numerique' && (
                <p className="text-xs text-[var(--color-success)] mt-2">PS = {params.A}/{(1+params.mu0).toFixed(2)} = {wP_PS0.toFixed(3)}</p>
              )}
            </div>
            <div className="p-4 bg-[var(--color-bg-overlay)] rounded-lg border border-[var(--color-border-default)] relative">
              <Tooltip term="Équilibre (P = Pᵉ)" formula={"F(u_n, z) = \\frac{A}{1+\\mu}"}>
                À l'équilibre de <strong>moyen terme</strong>, les anticipations sont correctes : P = Pᵉ.
                <br/>Le chômage naturel uₙ est celui où WS = PS.
                <br/>C'est un chômage <strong>structurel</strong> qui ne dépend pas de la demande (G, M...).
                <br/>Il dépend uniquement de μ, z, α (facteurs structurels du marché du travail).
              </Tooltip>
              <MathDisplay>{"z(1-\\alpha u_n) = \\frac{A}{1+\\mu}"}</MathDisplay>
            </div>
            <div className="p-4 bg-[var(--color-bg-overlay)] rounded-lg border border-[var(--color-border-default)] relative">
              <Tooltip term="Production naturelle" formula={"Y_n = L(1-u_n)"}>
                La production naturelle Yₙ correspond au niveau de production quand u = uₙ.
                <br/>Avec L travailleurs dans l'économie et un taux de chômage uₙ :
                <br/>• Nombre d'employés = L × (1 - uₙ)
                <br/>• Production = Yₙ = L × (1 - uₙ)
                <br/>C'est le PIB potentiel de l'économie.
              </Tooltip>
              <MathDisplay>{"Y_n = L(1-u_n)"}</MathDisplay>
              {mode === 'numerique' && (
                <p className="text-xs text-[var(--color-success)] mt-2">Yₙ = {params.L} × (1 - {(currentUn0/100).toFixed(3)}) = {Yn0.toFixed(1)}M</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
