import { z } from 'zod';

import { extractJsonCandidate, generateWithConfiguredProviders, repairJsonWithFastModelDetailed } from './llm.ts';
import type { DayEditorialPacket, EditorialPlan, EditorialPlanDecision, LlmStageTrace, TopicCluster } from './types.ts';

const EditorialPlanSchema = z.object({
  schemaVersion: z.literal('v1').default('v1'),
  editorialAngle: z.string().trim().min(8).max(220),
  leadClusterId: z.string().trim().nullable(),
  selectedClusterIds: z.array(z.string().trim()).max(12).default([]),
  openingClusterIds: z.array(z.string().trim()).max(4).default([]),
  radarClusterIds: z.array(z.string().trim()).max(4).default([]),
  carnetClusterIds: z.array(z.string().trim()).max(4).default([]),
  briefClusterIds: z.array(z.string().trim()).max(4).default([]),
  rejectedClusterIds: z.array(z.string().trim()).max(12).default([]),
  selectionReasons: z.array(z.object({
    clusterId: z.string().trim(),
    decision: z.enum(['lead', 'opening', 'radar', 'carnet', 'brief', 'reject']),
    reason: z.string().trim().min(12).max(240),
  })).max(24).default([]),
  risks: z.array(z.string().trim().min(6).max(220)).max(8).default([]),
  sectionMissions: z.object({
    intro: z.string().trim().min(12).max(240),
    lead: z.string().trim().min(12).max(240),
    opening: z.string().trim().min(12).max(240),
    radar: z.string().trim().min(12).max(240),
    carnet: z.string().trim().min(12).max(240),
    briefs: z.string().trim().min(12).max(240),
  }),
  writingGuidance: z.object({
    intro: z.string().trim().min(12).max(240),
    lead: z.string().trim().min(12).max(240),
    radar: z.string().trim().min(12).max(240),
    carnet: z.string().trim().min(12).max(240),
    briefs: z.string().trim().min(12).max(240),
  }),
});

function compactText(value: string, maxLength = 180) {
  const normalized = String(value || '').replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;
  const slice = normalized.slice(0, maxLength + 1);
  const cut = slice.lastIndexOf(' ');
  const safe = cut > Math.max(40, maxLength - 40) ? slice.slice(0, cut) : normalized.slice(0, maxLength);
  return safe.trim().replace(/[,:;]+$/, '');
}

function uniqueIds(values: Array<string | null | undefined>) {
  const seen = new Set<string>();
  const ordered: string[] = [];
  values.forEach((value) => {
    const normalized = String(value || '').trim();
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    ordered.push(normalized);
  });
  return ordered;
}

function listPacketClusters(packet: DayEditorialPacket) {
  const seen = new Set<string>();
  return [packet.leadTopic, ...packet.secondaryTopics]
    .filter((cluster): cluster is TopicCluster => Boolean(cluster))
    .filter((cluster) => {
      if (seen.has(cluster.id)) return false;
      seen.add(cluster.id);
      return true;
    });
}

function selectionReason(clusterId: string, decision: EditorialPlanDecision['decision'], reason: string): EditorialPlanDecision {
  return {
    clusterId,
    decision,
    reason: compactText(reason, 220),
  };
}

function buildClusterPlanningDossier(cluster: TopicCluster) {
  return {
    clusterId: cluster.id,
    topicLabel: compactText(cluster.topicLabel, 120),
    topicFamily: cluster.topicFamily,
    editorialImportance: cluster.editorialImportance,
    confidence: cluster.confidence,
    freshness: {
      recencyType: cluster.freshness.clusterRecencyType,
      qualifiesForLead: cluster.freshness.qualifiesForLead,
      qualifiesForOpening: cluster.freshness.qualifiesForOpening,
      justification: compactText(cluster.freshness.freshnessJustification, 180),
    },
    sourceCount: cluster.sourceArticleIds.length,
    sourceDomains: cluster.sourceProfiles.map((profile) => profile.domain).slice(0, 6),
    facts: cluster.mergedFacts.slice(0, 4).map((fact) => compactText(fact, 180)),
    consequences: cluster.mergedConsequences.slice(0, 3).map((fact) => compactText(fact, 180)),
    causes: cluster.mergedCauses.slice(0, 3).map((fact) => compactText(fact, 180)),
    numbers: cluster.mergedNumbers.slice(0, 4),
  };
}

function buildStageTrace(
  stage: LlmStageTrace['stage'],
  result: {
    providerUsed: string | null;
    modelUsed: string | null;
    attempts: Array<{
      provider: string;
      model: string;
      label?: string;
      status: 'success' | 'failed';
      tokensUsed?: number;
      error?: string;
      timeoutMs?: number;
    }>;
  },
  options: {
    success: boolean;
    usedFallback: boolean;
    fallbackReason?: string | null;
    contentSource?: 'llm' | 'deterministic' | 'hybrid';
  },
): LlmStageTrace {
  return {
    stage,
    providerUsed: result.providerUsed,
    modelUsed: result.modelUsed,
    attempts: result.attempts.map((attempt) => ({
      provider: attempt.provider,
      model: attempt.model,
      ...(attempt.label ? { label: attempt.label } : {}),
      status: attempt.status,
      ...(typeof attempt.tokensUsed === 'number' ? { tokensUsed: attempt.tokensUsed } : {}),
      ...(attempt.error ? { error: attempt.error } : {}),
      ...(typeof attempt.timeoutMs === 'number' ? { timeoutMs: attempt.timeoutMs } : {}),
    })),
    success: options.success,
    usedFallback: options.usedFallback,
    ...(options.fallbackReason ? { fallbackReason: options.fallbackReason } : {}),
    ...(options.contentSource ? { contentSource: options.contentSource } : {}),
  };
}

export function buildDeterministicEditorialPlan(packet: DayEditorialPacket): EditorialPlan {
  const allClusters = listPacketClusters(packet);
  const lead = packet.leadTopic || allClusters[0] || null;
  const opening = packet.chosenSections.opening.map((cluster) => cluster.id);
  const radar = packet.chosenSections.radar.map((cluster) => cluster.id);
  const carnet = packet.chosenSections.carnet.map((cluster) => cluster.id);
  const briefs = packet.chosenSections.briefs.map((cluster) => cluster.id);
  const selected = uniqueIds([lead?.id, ...opening, ...radar, ...carnet, ...briefs]);
  const rejected = allClusters.map((cluster) => cluster.id).filter((clusterId) => !selected.includes(clusterId));
  const shortMode = packet.materialTier === 'short';

  return {
    schemaVersion: 'v1',
    editorialAngle: compactText(
      lead
        ? `${lead.topicLabel} sert de porte d’entrée pour lire la diffusion du risque, des coûts et des signaux de marché.`
        : 'Le plan retient les signaux les plus frais et les mieux étayés du matin.',
      200,
    ),
    leadClusterId: lead?.id || null,
    selectedClusterIds: selected,
    openingClusterIds: opening,
    radarClusterIds: radar,
    carnetClusterIds: carnet,
    briefClusterIds: briefs,
    rejectedClusterIds: rejected,
    selectionReasons: [
      ...(lead ? [selectionReason(lead.id, 'lead', 'Sujet principal retenu parce qu’il requalifie la lecture du numéro et concentre le fait neuf du matin.')] : []),
      ...opening.map((clusterId) => selectionReason(clusterId, 'opening', 'Signal retenu pour annoncer les lignes de force sans répéter le lead.')),
      ...radar.map((clusterId) => selectionReason(clusterId, 'radar', 'Sujet gardé pour élargir le risque, la transmission ou le second cercle du lead.')),
      ...carnet.map((clusterId) => selectionReason(clusterId, 'carnet', 'Sujet conservé pour apporter un rythme plus lent, institutionnel ou structurel.')),
      ...briefs.map((clusterId) => selectionReason(clusterId, 'brief', 'Repère gardé en clôture pour finir le numéro avec une information nette et utile.')),
      ...rejected.map((clusterId) => selectionReason(clusterId, 'reject', 'Signal écarté de la structure principale faute de fraîcheur, de singularité ou de place utile.')),
    ],
    risks: uniqueIds([
      shortMode ? 'Le matériau du jour reste mince : garder une structure sobre et ne pas sur-interpréter.' : null,
      packet.sourceCoverage.highQualitySources < 2 ? 'La diversité de sources reste limitée : éviter toute formulation trop affirmative.' : null,
      packet.marketContext.confidence < 0.45 ? 'Le contexte marchés est partiel : rester prudent sur la lecture de séance.' : null,
    ]),
    sectionMissions: {
      intro: 'Ouvrir le numéro avec une ligne de force lisible et annoncer ce qui change vraiment la lecture du matin.',
      lead: 'Déployer le sujet principal avec des faits, une transmission économique claire et un vrai angle de lecture.',
      opening: 'Donner un menu serré des signaux à suivre sans recycler le lead.',
      radar: 'Étendre le risque ou la propagation du choc vers un second cercle utile.',
      carnet: 'Garder les signaux plus lents, plus institutionnels ou plus structurels.',
      briefs: 'Fermer proprement avec des repères nets, informatifs et non décoratifs.',
    },
    writingGuidance: {
      intro: shortMode
        ? 'Rester sobre et dense : deux paragraphes au maximum, sans effet de manche.'
        : 'Donner une présence éditoriale nette en deux paragraphes courts, sans ton méta ni promesse vide.',
      lead: 'Expliquer ce que le fait principal change pour les coûts, les marges, les taux ou le risque, sans rhétorique de pipeline.',
      radar: 'Mettre l’accent sur la transmission du risque ou du prix, pas sur un simple empilement de titres.',
      carnet: 'Rester utile et institutionnel, avec un rythme plus calme que le lead et le radar.',
      briefs: 'Être net, court et conclusif; chaque item doit apporter une information exploitable.',
    },
  };
}

function buildPlanningMessages(packet: DayEditorialPacket, fallbackPlan: EditorialPlan) {
  const allClusters = listPacketClusters(packet);
  return [
    {
      role: 'system',
      content: `Tu es le desk éditorial d’Oiko News. Tu dois planifier un numéro économique premium en français.
Règles absolues :
1. Réponds uniquement en JSON valide.
2. Le plan doit rester ancré aux clusters fournis, jamais à des idées inventées.
3. Choisis un lead principal, puis répartis les autres sujets entre opening, radar, carnet et briefs.
4. Chaque raison de sélection ou de rejet doit être concrète et éditoriale.
5. Garde une structure lisible, sobre et crédible pour une newsletter média économique.
6. N’ajoute aucun cluster absent du payload.
7. Les briefs servent à fermer le numéro avec des repères utiles, pas à décorer.
8. Si le matériau est mince, assume un plan resserré au lieu de remplir.`,
    },
    {
      role: 'user',
      content: JSON.stringify({
        editionDate: packet.editionDate,
        materialTier: packet.materialTier,
        sourceCoverage: packet.sourceCoverage,
        marketContext: {
          confidence: packet.marketContext.confidence,
          marketRegime: packet.marketContext.marketRegime,
          narrativeHints: packet.marketContext.narrativeHints.slice(0, 5),
        },
        sectionTargets: {
          opening: packet.chosenSections.opening.length,
          radar: packet.chosenSections.radar.length,
          carnet: packet.chosenSections.carnet.length,
          briefs: packet.chosenSections.briefs.length,
        },
        currentDeterministicPlan: fallbackPlan,
        clusters: allClusters.map(buildClusterPlanningDossier),
      }),
    },
  ];
}

function normalizeTextField(value: unknown, fallback: string, maxLength = 220) {
  const normalized = compactText(String(value || ''), maxLength);
  return normalized || fallback;
}

function normalizePlan(rawPlan: unknown, packet: DayEditorialPacket, fallbackPlan: EditorialPlan): EditorialPlan {
  const parsed = EditorialPlanSchema.parse(rawPlan);
  const allClusters = listPacketClusters(packet);
  const clusterIds = new Set(allClusters.map((cluster) => cluster.id));
  const isValid = (clusterId: string) => clusterIds.has(clusterId);

  const leadClusterId = parsed.leadClusterId && isValid(parsed.leadClusterId)
    ? parsed.leadClusterId
    : fallbackPlan.leadClusterId;
  const sanitize = (values: string[], excludeLead = true) => uniqueIds(values.filter((clusterId) => isValid(clusterId) && (!excludeLead || clusterId !== leadClusterId)));

  const openingClusterIds = sanitize(parsed.openingClusterIds);
  const radarClusterIds = sanitize(parsed.radarClusterIds.filter((clusterId) => !openingClusterIds.includes(clusterId)));
  const carnetClusterIds = sanitize(parsed.carnetClusterIds.filter((clusterId) => !openingClusterIds.includes(clusterId) && !radarClusterIds.includes(clusterId)));
  const briefClusterIds = sanitize(parsed.briefClusterIds.filter((clusterId) => !openingClusterIds.includes(clusterId) && !radarClusterIds.includes(clusterId) && !carnetClusterIds.includes(clusterId)));
  const selectedClusterIds = uniqueIds([
    leadClusterId,
    ...openingClusterIds,
    ...radarClusterIds,
    ...carnetClusterIds,
    ...briefClusterIds,
    ...parsed.selectedClusterIds.filter((clusterId) => isValid(clusterId) && clusterId !== leadClusterId),
  ]);
  const rejectedClusterIds = uniqueIds([
    ...parsed.rejectedClusterIds.filter((clusterId) => isValid(clusterId) && !selectedClusterIds.includes(clusterId)),
    ...allClusters.map((cluster) => cluster.id).filter((clusterId) => !selectedClusterIds.includes(clusterId)),
  ]);

  const selectionReasons = parsed.selectionReasons
    .filter((entry) => isValid(entry.clusterId))
    .map((entry) => selectionReason(entry.clusterId, entry.decision, entry.reason));
  const withMissingReasons = [
    ...selectionReasons,
    ...(leadClusterId && !selectionReasons.some((entry) => entry.clusterId === leadClusterId)
      ? [selectionReason(leadClusterId, 'lead', 'Lead retenu parce qu’il porte le changement principal de lecture du jour.')]
      : []),
    ...openingClusterIds.filter((clusterId) => !selectionReasons.some((entry) => entry.clusterId === clusterId)).map((clusterId) => selectionReason(clusterId, 'opening', 'Sujet retenu pour annoncer une ligne de force utile dès l’ouverture.')),
    ...radarClusterIds.filter((clusterId) => !selectionReasons.some((entry) => entry.clusterId === clusterId)).map((clusterId) => selectionReason(clusterId, 'radar', 'Sujet retenu pour élargir la propagation du risque ou du prix.')),
    ...carnetClusterIds.filter((clusterId) => !selectionReasons.some((entry) => entry.clusterId === clusterId)).map((clusterId) => selectionReason(clusterId, 'carnet', 'Sujet retenu pour apporter un support institutionnel ou de fond.')),
    ...briefClusterIds.filter((clusterId) => !selectionReasons.some((entry) => entry.clusterId === clusterId)).map((clusterId) => selectionReason(clusterId, 'brief', 'Sujet retenu comme repère utile en clôture.')),
    ...rejectedClusterIds.filter((clusterId) => !selectionReasons.some((entry) => entry.clusterId === clusterId)).map((clusterId) => selectionReason(clusterId, 'reject', 'Sujet écarté de la structure principale faute de place éditoriale suffisante.')),
  ];

  return {
    schemaVersion: 'v1',
    editorialAngle: normalizeTextField(parsed.editorialAngle, fallbackPlan.editorialAngle, 200),
    leadClusterId,
    selectedClusterIds,
    openingClusterIds: openingClusterIds.length ? openingClusterIds : fallbackPlan.openingClusterIds,
    radarClusterIds: radarClusterIds.length ? radarClusterIds : fallbackPlan.radarClusterIds,
    carnetClusterIds: carnetClusterIds.length ? carnetClusterIds : fallbackPlan.carnetClusterIds,
    briefClusterIds: briefClusterIds.length ? briefClusterIds : fallbackPlan.briefClusterIds,
    rejectedClusterIds,
    selectionReasons: uniqueIds(withMissingReasons.map((entry) => `${entry.clusterId}:${entry.decision}`)).map((key) => {
      const [clusterId, decision] = key.split(':');
      return withMissingReasons.find((entry) => entry.clusterId === clusterId && entry.decision === decision) as EditorialPlanDecision;
    }),
    risks: parsed.risks.length ? parsed.risks.map((risk) => compactText(risk, 200)) : fallbackPlan.risks,
    sectionMissions: {
      intro: normalizeTextField(parsed.sectionMissions.intro, fallbackPlan.sectionMissions.intro),
      lead: normalizeTextField(parsed.sectionMissions.lead, fallbackPlan.sectionMissions.lead),
      opening: normalizeTextField(parsed.sectionMissions.opening, fallbackPlan.sectionMissions.opening),
      radar: normalizeTextField(parsed.sectionMissions.radar, fallbackPlan.sectionMissions.radar),
      carnet: normalizeTextField(parsed.sectionMissions.carnet, fallbackPlan.sectionMissions.carnet),
      briefs: normalizeTextField(parsed.sectionMissions.briefs, fallbackPlan.sectionMissions.briefs),
    },
    writingGuidance: {
      intro: normalizeTextField(parsed.writingGuidance.intro, fallbackPlan.writingGuidance.intro),
      lead: normalizeTextField(parsed.writingGuidance.lead, fallbackPlan.writingGuidance.lead),
      radar: normalizeTextField(parsed.writingGuidance.radar, fallbackPlan.writingGuidance.radar),
      carnet: normalizeTextField(parsed.writingGuidance.carnet, fallbackPlan.writingGuidance.carnet),
      briefs: normalizeTextField(parsed.writingGuidance.briefs, fallbackPlan.writingGuidance.briefs),
    },
  };
}

export async function planEditorialStructure(packet: DayEditorialPacket, usageDate?: string): Promise<{ plan: EditorialPlan; llmStages: LlmStageTrace[] }> {
  const fallbackPlan = buildDeterministicEditorialPlan(packet);
  const allClusters = listPacketClusters(packet);
  if (!allClusters.length) {
    return {
      plan: fallbackPlan,
      llmStages: [{
        stage: 'editorial_plan',
        providerUsed: null,
        modelUsed: null,
        attempts: [],
        success: false,
        usedFallback: true,
        fallbackReason: 'no_clusters_available',
        contentSource: 'deterministic',
      }],
    };
  }

  const llmStages: LlmStageTrace[] = [];
  const generated = await generateWithConfiguredProviders(buildPlanningMessages(packet, fallbackPlan), usageDate, { maxTokens: 5200, temperature: 0.1 });
  let parsed = extractJsonCandidate(generated.content);
  let repairUsed = false;

  if (!parsed && generated.content) {
    const repaired = await repairJsonWithFastModelDetailed(generated.content, usageDate);
    parsed = repaired.parsed;
    repairUsed = Boolean(repaired.parsed);
    llmStages.push(buildStageTrace('editorial_plan_repair', repaired, {
      success: Boolean(repaired.parsed),
      usedFallback: !repaired.parsed,
      fallbackReason: repaired.parsed ? null : 'repair_failed',
      contentSource: repaired.parsed ? 'hybrid' : 'deterministic',
    }));
  }

  const plan = parsed ? normalizePlan(parsed, packet, fallbackPlan) : fallbackPlan;
  llmStages.unshift(buildStageTrace('editorial_plan', generated, {
    success: Boolean(parsed),
    usedFallback: !parsed,
    fallbackReason: parsed ? (repairUsed ? 'repaired_json_candidate' : null) : generated.content ? 'invalid_json_candidate' : 'empty_llm_response',
    contentSource: parsed ? (repairUsed ? 'hybrid' : 'llm') : 'deterministic',
  }));

  return {
    plan,
    llmStages,
  };
}

export const __testables = {
  buildDeterministicEditorialPlan,
  planSchema: EditorialPlanSchema,
};