import { fetchMarketSnapshot } from '../sources.ts';
import { getEditionWindow } from '../utils.ts';
import type { StructuredMarketContext, StructuredMarketSeries } from './types.ts';

function mapMarketItems(items: any[] = [], allowedKeys: string[]) {
  return items
    .filter((item) => allowedKeys.includes(String(item?.key || '')))
    .map((item) => ({
      key: String(item.key || ''),
      label: String(item.label || item.name || item.key || ''),
      latestValue: Number(item.latest_value || 0),
      changePct: Number(item.change_pct || 0),
      period: String(item.period || 'n/a'),
      points: Array.isArray(item.points) ? item.points.map((point: any) => Number(point || 0)) : [],
      labels: Array.isArray(item.labels) ? item.labels.map((label: any) => String(label || '')) : [],
    })) as StructuredMarketSeries[];
}

export async function buildStructuredMarketContext(editionDate: string) {
  const window = getEditionWindow(editionDate);
  const snapshot = await fetchMarketSnapshot(editionDate, window);
  const equities = mapMarketItems(snapshot.items, ['actions']);
  const crypto = mapMarketItems(snapshot.items, ['crypto']);
  const fx = mapMarketItems(snapshot.items, ['europe-fx']);
  const rates: StructuredMarketSeries[] = [];
  const commodities: StructuredMarketSeries[] = [];
  const missingDataFlags: string[] = [];

  if (!equities.length) missingDataFlags.push('equities_missing');
  if (!crypto.length) missingDataFlags.push('crypto_missing');
  if (!fx.length) missingDataFlags.push('fx_missing');
  missingDataFlags.push('rates_missing');
  missingDataFlags.push('commodities_missing');

  const totalBuckets = 5;
  const missingRatio = missingDataFlags.length / totalBuckets;

  return {
    windowStart: snapshot.window.startIso,
    windowEnd: snapshot.window.endIso,
    generatedAt: snapshot.generated_at,
    equities,
    crypto,
    rates,
    fx,
    commodities,
    missingDataFlags,
    confidence: Number((1 - Math.min(0.8, missingRatio)).toFixed(2)),
    marketRegime: snapshot.market_regime,
    narrativeHints: [snapshot.equities_note].filter(Boolean),
  } satisfies StructuredMarketContext;
}

export default {
  buildStructuredMarketContext,
};
