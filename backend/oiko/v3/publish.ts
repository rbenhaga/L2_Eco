import fs from 'fs';
import path from 'path';
import { OIKO_V3_POLICY } from '../policy/v3.ts';
import { oikoQueries } from '../queries.ts';
import { renderEditionBundle } from '../render.ts';
import { toAbsoluteUrl } from '../utils.ts';
import type { DayEditorialPacket, QualityReport, StructuredMarketContext, StructuredMarketSeries, V3Draft } from './types.ts';
import { upsertEditorialPacket } from './upsertEditorialPacket.ts';

function buildStoredPathFromAssetUrl(url: string) {
  try {
    const pathname = new URL(url).pathname.replace(/^\/static\/oiko-news\//, '');
    return path.resolve(process.cwd(), 'public', 'oiko-news', pathname);
  } catch (_error) {
    return '';
  }
}

function compactText(value: string, maxLength = 190) {
  const normalized = String(value || '').replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;
  const slice = normalized.slice(0, maxLength + 1);
  const cut = slice.lastIndexOf(' ');
  return (cut > Math.max(40, maxLength - 40) ? slice.slice(0, cut) : normalized.slice(0, maxLength)).trim().replace(/[,:;]+$/, '');
}

function shortTopic(cluster?: DayEditorialPacket['leadTopic']) {
  if (!cluster) return 'les faits les plus frais du matin';
  const sample = `${cluster.topicLabel} ${cluster.mergedFacts.join(' ')}`.toLowerCase();
  if (/(all ordinaries|asx|oil|crude|pétrole|baril)/.test(sample)) return 'le choc pétrolier en Asie';
  if (/(gaz|gas)/.test(sample) && /(russ|russia|europe)/.test(sample)) return 'le risque gazier européen';
  if (/(cuivre|copper|phosphate hill|mount isa)/.test(sample)) return 'le dossier cuivre australien';
  if (/(iran|khamenei|bahreïn|bahrein|émirats|emirats)/.test(sample)) return 'la prime de risque iranienne';
  if (/(bce|ecb|zone euro|chômage|chomage|salaires|wages|labour|labor)/.test(sample)) return 'le marché du travail de la zone euro';
  return cluster.topicLabel.toLowerCase();
}

export function generateArchiveTeaserFromPacket(packet: DayEditorialPacket) {
  const lead = packet.leadTopic;
  const leadLine = lead
    ? shortTopic(lead) === 'le choc pétrolier en Asie'
      ? 'Le choc pétrolier frappe les marchés asiatiques et replace l’énergie au centre de la séance.'
      : `${compactText(lead.topicLabel, 120)}.`
    : 'Les faits les plus frais du matin structurent le numéro du jour.';
  const supporting = packet.chosenSections.opening.slice(0, 2).map((cluster) => shortTopic(cluster)).filter(Boolean);
  if (!supporting.length) {
    return leadLine;
  }
  return compactText(`${leadLine} À suivre aussi : ${supporting.join(' et ')}.`, 190);
}

export function computeAssetQuality(rendered: any) {
  const expectedAssets = [
    rendered.payload.markets_section?.charts?.[0]?.key ? 'chart:actions' : null,
    rendered.payload.markets_section?.charts?.[1]?.key ? 'chart:crypto' : null,
    rendered.payload.header_visual ? 'visual:header_visual' : null,
    rendered.payload.lead_story?.visual ? 'visual:lead_story' : null,
    rendered.payload.radar_section?.visual ? 'visual:radar_section' : null,
    rendered.payload.carnet_section?.visual ? 'visual:carnet_section' : null,
  ].filter(Boolean) as string[];

  const actualAssets = [
    ...(rendered.chartManifest || []).map((item: any) => `chart:${item.key}`),
    ...(rendered.assets || []).map((item: any) => `visual:${item.section_key}`),
  ];

  const missingAssets = expectedAssets.filter((asset) => !actualAssets.includes(asset));
  const brokenChartCount = (rendered.chartManifest || []).filter((item: any) => !item.filePath || !fs.existsSync(item.filePath)).length;
  const brokenVisualCount = (rendered.assets || []).filter((item: any) => {
    const filePath = buildStoredPathFromAssetUrl(item.stored_url);
    return !filePath || !fs.existsSync(filePath);
  }).length;
  const brokenAssetCount = brokenChartCount + brokenVisualCount;

  return {
    assetCoverage: expectedAssets.length ? Number(((actualAssets.length - missingAssets.length) / expectedAssets.length).toFixed(3)) : 1,
    missingAssets,
    brokenAssetCount,
  };
}

function mapMarketSeries(item: StructuredMarketSeries, overrideKey?: string) {
  return {
    key: overrideKey || item.key,
    label: item.label,
    latest_value: item.latestValue,
    change_pct: item.changePct,
    period: item.period,
    points: item.points,
    labels: item.labels,
  };
}

export async function renderV3Draft(editionDate: string, draft: V3Draft, packet: DayEditorialPacket, marketContext: StructuredMarketContext) {
  const rendered = await renderEditionBundle({
    editionDate,
    payload: draft.payload,
    marketSnapshot: {
      editionDate,
      generated_at: marketContext.generatedAt,
      market_regime: marketContext.marketRegime,
      items: [...marketContext.equities, ...marketContext.fx, ...marketContext.crypto].map((item) => mapMarketSeries(item)),
      chartCandidates: {
        actions: marketContext.equities.map((item) => mapMarketSeries(item, 'actions')),
        crypto: marketContext.crypto.map((item) => mapMarketSeries(item, 'crypto')),
      },
      equities_open: false,
      equities_note: packet.marketContext.narrativeHints[0] || 'Lecture de marché prudente.',
      window: {
        editionDate,
        startIso: marketContext.windowStart,
        endIso: marketContext.windowEnd,
      },
    },
    context: {
      selection: {
        topStories: packet.leadTopic ? [packet.leadTopic] : [],
        briefs: packet.chosenSections.briefs,
      },
      editorialAngle: packet.leadTopic?.topicLabel || 'Oiko News',
    },
  });

  return rendered;
}

export function persistQualityReports(editionDate: string, pipelineVersion: string, reports: QualityReport[]) {
  oikoQueries.v3.qualityReports.clearByEdition.run(editionDate, pipelineVersion);
  for (const report of reports) {
    oikoQueries.v3.qualityReports.upsert.run(
      editionDate,
      pipelineVersion,
      report.stage,
      report.status,
      report.summaryText,
      JSON.stringify(report.metrics),
      JSON.stringify(report.issues),
    );
  }
}

export function publishEdition(
  editionDate: string,
  pipelineVersion: string,
  packet: DayEditorialPacket,
  draft: V3Draft,
  rendered: any,
  qualityReport: QualityReport,
  assetQuality: { assetCoverage: number; missingAssets: string[]; brokenAssetCount: number },
) {
  const archiveTeaser = generateArchiveTeaserFromPacket(packet);
  const isShortEdition = packet.materialTier === 'short';
  const effectiveStatus = isShortEdition && qualityReport.publicationStatus === 'ready'
    ? 'short_draft' as const
    : qualityReport.publicationStatus;

  const visibility = OIKO_V3_POLICY.rollout.publicEnabled
    && effectiveStatus === 'ready'
    && qualityReport.metrics.french_only
    && qualityReport.metrics.originality_gate
    && qualityReport.metrics.traceability_gate
    && qualityReport.metrics.freshness_gate
    && qualityReport.metrics.duplication_gate
    ? 'public'
    : 'internal';

  const qualityState = (effectiveStatus === 'ready' || effectiveStatus === 'short_draft') ? 'passed' : 'failed';
  const publicationReason = visibility === 'internal' && effectiveStatus === 'ready'
    ? 'Draft V3 valide en interne, conservé hors public tant que le switch Phase C reste désactivé.'
    : effectiveStatus === 'short_draft'
      ? 'Édition courte V3 validée en interne, conservée hors public pour ne pas remplacer une édition premium.'
      : qualityReport.publicationReason;
  const publicationReasonCode = visibility === 'internal' && effectiveStatus === 'ready'
    ? 'internal_rollout_only'
    : qualityReport.publicationReasonCode;

  upsertEditorialPacket({
    editionDate,
    pipelineVersion,
    status: effectiveStatus,
    visibility: visibility as 'public' | 'internal',
    qualityState: qualityState as 'passed' | 'failed',
    packetJson: JSON.stringify(packet),
    draftJson: JSON.stringify(draft.metadata),
    evidenceJson: JSON.stringify(draft.evidence),
    contentJson: JSON.stringify(rendered.payload),
    marketContextJson: JSON.stringify(packet.marketContext),
    assetManifestJson: JSON.stringify({
      chartManifest: rendered.chartManifest,
      assets: rendered.assets,
      assetQuality,
    }),
    html: rendered.html,
    text: rendered.text,
    archiveTeaser,
    publicationReason,
    publicationReasonCode,
  });

  return {
    status: effectiveStatus,
    visibility,
    qualityState,
    publicationReason,
    publicationReasonCode,
    archiveTeaser,
    isShortEdition,
    emailHtmlPreviewUrl: visibility === 'public'
      ? toAbsoluteUrl(process.env.OIKO_PUBLIC_BASE_URL || 'http://localhost:3001', `/api/oiko-news/${editionDate}/email-html`)
      : null,
  };
}

export default {
  computeAssetQuality,
  generateArchiveTeaserFromPacket,
  renderV3Draft,
  persistQualityReports,
  publishEdition,
};



