import { useState } from 'react';
import { ArrowRight, AlertTriangle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Math as MathDisplay } from '../../../../../components/Math';

type Tab = 'links' | 'traps' | 'history';

export function ModelSynthesis() {
  const [activeTab, setActiveTab] = useState<Tab>('links');
  const [expandedTrap, setExpandedTrap] = useState<number | null>(null);

  const traps = [
    {
      title: 'Déplacement DE vs SUR la courbe',
      wrong: 'Si i↑, IS se déplace vers la gauche',
      correct: 'Si i↑, on se déplace le long de IS. IS ne bouge que si G, T ou confiance changent.',
      formula: 'IS : Y = f(i, \\underbrace{G, T}_{\\text{déplacent IS}})'
    },
    {
      title: 'Court terme vs Moyen terme',
      wrong: 'M↑ augmente Y de façon permanente',
      correct: 'À MT, Y revient à Yₙ. Seul P augmente. Neutralité de la monnaie.',
      formula: 'MT : Y = Y_n'
    },
    {
      title: 'Effet d\'éviction',
      wrong: 'G↑ augmente Y du montant G × multiplicateur',
      correct: 'G↑ fait monter i, ce qui réduit I. L\'effet net est plus faible.',
      formula: 'G\\uparrow \\Rightarrow i\\uparrow \\Rightarrow I\\downarrow'
    },
    {
      title: 'Phillips CT vs LTJ',
      wrong: 'On peut maintenir u < uₙ en acceptant plus d\'inflation',
      correct: 'Si u < uₙ maintenu, π accélère sans fin. Pas d\'arbitrage stable.',
      formula: '\\pi^e_{t+1} = \\pi_t'
    },
    {
      title: 'WS-PS et la demande',
      wrong: 'G↑ peut réduire le chômage naturel',
      correct: 'uₙ dépend uniquement de μ, z, α. G et M n\'affectent pas uₙ.',
      formula: 'u_n = f(\\mu, z)'
    },
  ];

  const historicalExamples = [
    { event: 'Crise 2008', year: '2008', model: 'IS-LM', desc: 'I↓↓ → IS gauche. Réponse : M↑↑ + G↑', color: '#3b82f6' },
    { event: 'Choc pétrolier', year: '1973', model: 'AS-AD', desc: 'Coûts↑ → AS↑, Yₙ↓. Stagflation.', color: '#ef4444' },
    { event: 'Volcker', year: '1980', model: 'Phillips', desc: 'M↓↓ → u↑↑ pour casser πᵉ', color: '#8b5cf6' },
    { event: 'Réformes Hartz', year: '2005', model: 'WS-PS', desc: 'z↓ → WS↓ → uₙ↓', color: '#10b981' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 my-8 shadow-sm">
      {/* Tabs minimalistes */}
      <div className="flex gap-1 mb-8 border-b border-gray-100 pb-4">
        {[
          { id: 'links', label: 'Liens' },
          { id: 'traps', label: 'Pièges' },
          { id: 'history', label: 'Histoire' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id 
                ? 'bg-gray-900 text-white' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Liens entre modèles */}
      {activeTab === 'links' && (
        <div className="space-y-10">
          {/* Schéma central minimaliste */}
          <div className="flex items-center justify-center gap-2 py-6">
            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center mb-2 group-hover:border-slate-300 transition-colors">
                <span className="text-slate-700 font-semibold text-sm">IS-LM</span>
              </div>
              <p className="text-[10px] text-slate-400">Prix fixe</p>
            </div>
            
            <div className="flex flex-col items-center px-2">
              <ArrowRight className="w-5 h-5 text-slate-300" />
              <span className="text-[9px] text-slate-400 mt-1">varier P</span>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center mb-2 group-hover:border-slate-300 transition-colors">
                <span className="text-slate-700 font-semibold text-sm">AD</span>
              </div>
              <p className="text-[10px] text-slate-400">Demande</p>
            </div>

            <div className="w-8 flex justify-center">
              <span className="text-slate-300 text-lg">+</span>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center mb-2 group-hover:border-slate-300 transition-colors">
                <span className="text-slate-700 font-semibold text-sm">WS-PS</span>
              </div>
              <p className="text-[10px] text-slate-400">Équilibre uₙ</p>
            </div>
            
            <div className="flex flex-col items-center px-2">
              <ArrowRight className="w-5 h-5 text-slate-300" />
              <span className="text-[9px] text-slate-400 mt-1">varier Y</span>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center mb-2 group-hover:border-slate-300 transition-colors">
                <span className="text-slate-700 font-semibold text-sm">AS</span>
              </div>
              <p className="text-[10px] text-slate-400">Offre</p>
            </div>

            <div className="w-8 flex justify-center">
              <span className="text-slate-300 text-lg">=</span>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-2">
                <span className="text-white font-semibold text-sm">Y, P</span>
              </div>
              <p className="text-[10px] text-slate-400">Équilibre</p>
            </div>
          </div>

          {/* Deux mécanismes clés */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl">
            <div className="text-center">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Comment AD est décroissante</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                P↑ → M/P↓ → i↑ → I↓ → Y↓
              </p>
              <p className="text-xs text-slate-400 mt-2">Les prix élevés réduisent la demande</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Comment AS est croissante</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Y↑ → u↓ → W↑ → P↑
              </p>
              <p className="text-xs text-slate-400 mt-2">La production élevée fait monter les prix</p>
            </div>
          </div>

          {/* Timeline CT → MT → LT */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="text-center px-6 py-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs font-medium text-slate-700 mb-1">Court terme</p>
              <p className="text-[11px] text-slate-500">Y peut ≠ Yₙ</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300" />
            <div className="text-center px-6 py-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs font-medium text-slate-700 mb-1">Moyen terme</p>
              <p className="text-[11px] text-slate-500">Y → Yₙ</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300" />
            <div className="text-center px-6 py-4 rounded-xl bg-slate-800">
              <p className="text-xs font-medium text-white mb-1">Long terme</p>
              <p className="text-[11px] text-slate-300">Y = Yₙ toujours</p>
            </div>
          </div>
        </div>
      )}

      {/* Pièges à éviter */}
      {activeTab === 'traps' && (
        <div className="space-y-3">
          {traps.map((trap, idx) => (
            <div 
              key={idx} 
              className="border border-gray-100 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedTrap(expandedTrap === idx ? null : idx)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-100/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-slate-900">{trap.title}</span>
                </div>
                {expandedTrap === idx ? (
                  <ChevronUp className="w-4 h-4 text-slate-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                )}
              </button>
              
              {expandedTrap === idx && (
                <div className="px-4 pb-4 pt-2 border-t border-gray-50">
                  <div className="grid md:grid-cols-2 gap-3 mb-3">
                    <div className="p-3 rounded-lg bg-red-50">
                      <p className="text-xs font-medium text-red-600 mb-1">✗ Faux</p>
                      <p className="text-sm text-red-700">{trap.wrong}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-50">
                      <p className="text-xs font-medium text-green-600 mb-1">✓ Vrai</p>
                      <p className="text-sm text-green-700">{trap.correct}</p>
                    </div>
                  </div>
                  <div className="p-2 bg-slate-100/50 rounded-lg inline-block">
                    <MathDisplay>{trap.formula}</MathDisplay>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Exemples historiques */}
      {activeTab === 'history' && (
        <div className="grid md:grid-cols-2 gap-3">
          {historicalExamples.map((ex, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-xl border border-gray-100 hover:border-slate-200 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="text-xs text-slate-600">{ex.year}</span>
                </div>
                <span 
                  className="text-xs font-medium px-2 py-0.5 rounded"
                  style={{ backgroundColor: `${ex.color}15`, color: ex.color }}
                >
                  {ex.model}
                </span>
              </div>
              <p className="font-medium text-slate-900 mb-1">{ex.event}</p>
              <p className="text-sm text-slate-700">{ex.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
