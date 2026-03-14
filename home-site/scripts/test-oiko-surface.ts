import assert from 'node:assert/strict';

import {
  buildHeroDek,
  buildHeroIntroParagraphs,
  buildLeadSections,
  buildMarketFallbackRows,
  buildMarketSectionMeta,
  buildStableMarketLines,
  buildMenuRows,
  getMarketDeltaPresentation,
} from '../src/pages/oikoEditionSurface.ts';

function assertDeltaCoherence(
  delta: ReturnType<typeof getMarketDeltaPresentation>,
  expected: { direction: 'up' | 'down' | 'flat'; tone: 'positive' | 'negative' | 'neutral'; arrow: string; prefix: string },
) {
  assert.equal(delta.direction, expected.direction);
  assert.equal(delta.tone, expected.tone);
  assert.equal(delta.arrow, expected.arrow);
  if (expected.prefix) {
    assert.equal(delta.text.startsWith(expected.prefix), true);
  } else {
    assert.equal(delta.text.startsWith('+'), false);
    assert.equal(delta.text.startsWith('-'), false);
  }
}

const edition = {
  sourceKind: 'v3_packet',
  marketRegime: 'risk_off',
  editorialAngle: "Le petrole remet l'energie au centre sert de porte d'entree pour lire la diffusion du risque.",
  marketContext: {
    windowStart: '2026-03-11T05:30:00.000Z',
    windowEnd: '2026-03-11T09:30:00.000Z',
    generatedAt: '2026-03-11T09:30:00.000Z',
    narrativeHints: ["L'energie redonne le ton de la matinee."],
    missingDataFlags: [],
    equities: [
      { key: 'sp500', label: 'S&P 500', latestValue: 5124, changePct: -1.1, period: '5d', points: [5190, 5178, 5155, 5140, 5124], labels: ['J-4', 'J-3', 'J-2', 'J-1', 'J'] },
      { key: 'nasdaq100', label: 'Nasdaq 100', latestValue: 17880, changePct: -0.6, period: '5d', points: [18010, 17990, 17940, 17910, 17880], labels: ['J-4', 'J-3', 'J-2', 'J-1', 'J'] },
    ],
    fx: [{ key: 'eurusd', label: 'EUR/USD', latestValue: 1.08, changePct: -0.2, period: '5d', points: [1.089, 1.087, 1.085, 1.082, 1.08], labels: ['J-4', 'J-3', 'J-2', 'J-1', 'J'] }],
    rates: [{ key: 'us10y', label: 'US 10Y', latestValue: 4.18, changePct: 0.05, period: '5d', points: [4.12, 4.14, 4.16, 4.17, 4.18], labels: ['J-4', 'J-3', 'J-2', 'J-1', 'J'] }],
    crypto: [{ key: 'bitcoin', label: 'Bitcoin', latestValue: 68250, changePct: 1.4, period: '24h', points: [67120, 67480, 67910, 68140, 68250], labels: ['00h', '06h', '12h', '18h', '24h'] }],
    commodities: [{ key: 'brent', label: 'Brent', latestValue: 84.4, changePct: 2.8, period: '5d', points: [79.5, 80.1, 81.7, 82.9, 84.4], labels: ['J-4', 'J-3', 'J-2', 'J-1', 'J'] }],
  },
} as any;

const content = {
  preview_text: 'Le petrole requalifie la seance asiatique, pendant que le gaz europeen et les signaux macro testent la diffusion du choc.',
  intro: {
    paragraphs: [
      { parts: [{ text: "Le matin se reclasse par l'energie et remet un prix sur le risque." }] },
      { parts: [{ text: "Ensuite, la sequence iranienne et le gaz europeen disent si le choc diffuse." }] },
    ],
  },
  opening_brief: {
    items: [
      { label: 'Iran', parts: [{ text: "La sequence iranienne epaissit la prime de risque." }] },
      { label: 'Cuivre', parts: [{ text: 'Le cuivre protege une chaine industrielle exposee.' }] },
      { label: 'BCE', parts: [{ text: "La BCE garde un marche du travail ferme, mais moins explosif." }] },
    ],
  },
  markets_section: {
    paragraphs: [
      { label: 'Marches', parts: [{ text: "Les actions repricent la facture energetique." }] },
      { label: 'Change', parts: [{ text: 'Le change reste le test le plus direct du choc.' }] },
      { label: 'Crypto', parts: [{ text: 'La crypto reste secondaire dans cette seance.' }] },
    ],
  },
  lead_story: {
    paragraphs: [
      { parts: [{ text: "Le petrole ne monte plus seul et remet les couts au centre." }] },
      { parts: [{ text: "La reaction se voit d'abord sur l'Asie et les valeurs cycliques." }] },
      { parts: [{ text: 'Le marche regarde ensuite le fret, le gaz et les marges.' }] },
      { parts: [{ text: 'La question est de savoir si le choc dure assez pour remonter aux taux.' }] },
      { parts: [{ text: 'Le test cle reste la duree du choc et sa diffusion europeenne.' }] },
    ],
  },
} as any;

assertDeltaCoherence(getMarketDeltaPresentation(2.8), { direction: 'up', tone: 'positive', arrow: '↑', prefix: '+' });
assertDeltaCoherence(getMarketDeltaPresentation(-0.2), { direction: 'down', tone: 'negative', arrow: '↓', prefix: '-' });
assertDeltaCoherence(getMarketDeltaPresentation(0), { direction: 'flat', tone: 'neutral', arrow: '→', prefix: '' });
assertDeltaCoherence(getMarketDeltaPresentation(-0), { direction: 'flat', tone: 'neutral', arrow: '→', prefix: '' });

const stableLines = buildStableMarketLines(edition);
assert.deepEqual(stableLines.map((line) => line.label), ['Brent', 'S&P 500', 'Nasdaq 100', 'EUR/USD', 'US 10Y', 'Bitcoin']);
assert.deepEqual(stableLines.map((line) => line.period), ['5 séances', '5 séances', '5 séances', '5 séances', '5 séances', '24 h']);
stableLines.forEach((line) => {
  if (line.delta.rawValue > 0) {
    assertDeltaCoherence(line.delta, { direction: 'up', tone: 'positive', arrow: '↑', prefix: '+' });
  } else if (line.delta.rawValue < 0) {
    assertDeltaCoherence(line.delta, { direction: 'down', tone: 'negative', arrow: '↓', prefix: '-' });
  } else {
    assertDeltaCoherence(line.delta, { direction: 'flat', tone: 'neutral', arrow: '→', prefix: '' });
  }
  assert.equal(Object.prototype.hasOwnProperty.call(line, 'sparklinePath'), false);
  assert.equal(Object.prototype.hasOwnProperty.call(line, 'sparklineAreaPath'), false);
});

assert.equal(buildHeroDek(edition, content).includes("sert de porte d'entree"), false);
assert.equal(buildHeroIntroParagraphs(edition, content).length, 2);
assert.equal(buildMenuRows(content).length, 3);
assert.equal(buildMarketSectionMeta(edition), 'Données de la fenêtre 05h30 UTC - 09h30 UTC.');

const leadSections = buildLeadSections(content);
assert.deepEqual(leadSections.map((section) => section.label), ['Pourquoi on en parle ?', 'Contexte', 'Bref']);
assert.equal(leadSections[0].paragraphs.length, 2);

const legacyFallbackRows = buildMarketFallbackRows({
  markets_section: {
    paragraphs: [
      { label: 'Marchés', parts: [{ text: 'Marches actions fermes, derniere cloture disponible.' }] },
      { label: 'Change', parts: [{ text: "Le nouveau format n'etait pas encore actif sur cette edition." }] },
      { label: 'Crypto', parts: [{ text: "La lecture crypto reste disponible dans l'archive historique." }] },
    ],
  },
} as any);
assert.deepEqual(legacyFallbackRows.map((row) => row.label), ['Marchés', 'Change', 'Crypto']);

console.log('Oiko newsletter surface checks passed');
