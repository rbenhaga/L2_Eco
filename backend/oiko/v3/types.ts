import type { GeneratedOikoEditionV21 } from '../content.ts';

export type SourceTier = 'official' | 'tier1' | 'tier2' | 'secondary';
export type SourceTypeProfile = 'institution' | 'wire' | 'press' | 'analysis' | 'market_blog';
export type ContentDepth = 'title_only' | 'title_snippet' | 'partial_body' | 'full_body';
export type AcquisitionStatus = 'ok' | 'partial' | 'blocked' | 'failed';
export type LicenseStatus = 'allowed' | 'unknown' | 'blocked';
export type ArticleLanguage = 'fr' | 'en' | 'other';
export type ArticleRecencyType = 'new_event' | 'new_update' | 'background' | 'old_news_recap';
export type ClusterRecencyType = 'fresh_event' | 'fresh_update' | 'context_only' | 'stale';
export type V3StageStatus = 'pending' | 'passed' | 'failed';
export type V3PublicationStatus = 'draft' | 'ready' | 'sent' | 'short_draft' | 'insufficient_material_review' | 'blocked_insufficient_fresh_material' | 'failed_quality';
export type V3Visibility = 'public' | 'internal';
export type MaterialTier = 'premium' | 'short' | 'blocked';
export type DraftEditionFormat = 'premium' | 'short';
export type LlmStageName =
  | 'facts_extract'
  | 'facts_extract_repair'
  | 'facts_localize'
  | 'facts_localize_repair'
  | 'editorial_plan'
  | 'editorial_plan_repair'
  | 'draft_write'
  | 'draft_repair';

export type LlmAttemptTrace = {
  provider: string;
  model: string;
  label?: string;
  status: 'success' | 'failed';
  tokensUsed?: number;
  error?: string;
  timeoutMs?: number;
};

export type LlmStageTrace = {
  stage: LlmStageName;
  providerUsed: string | null;
  modelUsed: string | null;
  attempts: LlmAttemptTrace[];
  success: boolean;
  usedFallback: boolean;
  fallbackReason?: string | null;
  contentSource?: 'llm' | 'deterministic' | 'hybrid';
};

export type SourceProfile = {
  sourceName: string;
  domain: string;
  sourceTier: SourceTier;
  sourceReliabilityScore: number;
  sourceType: SourceTypeProfile;
  paywallRisk: number;
  snippetOnlyRisk: number;
};

export type RawArticle = {
  id: string;
  url: string;
  title: string;
  sourceName: string;
  sourceDomain: string;
  provider: string;
  publishedAt: string;
  language: string;
  snippetRaw: string;
  bodyRaw: string;
  topicFamily?: string;
  rawJson: Record<string, unknown>;
};

export type AcquiredArticle = RawArticle & {
  canonicalUrl: string;
  acquiredHtml: string;
  acquiredText: string;
  contentDepth: ContentDepth;
  acquisitionStatus: AcquisitionStatus;
  acquisitionError: string | null;
  robotsAllowed: boolean;
  licenseStatus: LicenseStatus;
  paywallDetected: boolean;
  sourceProfile: SourceProfile;
};

export type NormalizedArticle = {
  id: string;
  title: string;
  sourceName: string;
  sourceDomain: string;
  url: string;
  canonicalUrl: string;
  publishedAt: string;
  language: ArticleLanguage;
  cleanTitle: string;
  cleanSnippet: string;
  cleanBody: string;
  provider: string;
  topicFamily?: string;
  contentDepth: ContentDepth;
  sourceProfile: SourceProfile;
  rawArticleId: string;
};

export type ExtractedNumber = {
  label: string;
  value: string;
  unit?: string;
};

export type ExtractedFactSheet = {
  articleId: string;
  mainEvent: string;
  geography: string[];
  entities: string[];
  facts: string[];
  numbers: ExtractedNumber[];
  timeline: string[];
  causes: string[];
  consequences: string[];
  uncertainties: string[];
  economicAngle: string;
  confidence: number;
};

export type TemporalFactSheet = {
  articleId: string;
  publishedAt: string;
  primaryEventTimeStart?: string;
  primaryEventTimeEnd?: string;
  recencyType: ArticleRecencyType;
  freshnessScore: number;
  temporalJustification: string;
};

export type FactRecord = {
  factId: string;
  articleId: string;
  statement: string;
};

export type FactSheetRecord = {
  article: NormalizedArticle;
  factSheet: ExtractedFactSheet;
  temporal: TemporalFactSheet;
  factRecords: FactRecord[];
};

export type FactSheetExtractionResult = {
  records: FactSheetRecord[];
  llmStages: LlmStageTrace[];
};

export type ClusterFreshness = {
  clusterId: string;
  clusterRecencyType: ClusterRecencyType;
  primaryEventTimeStart?: string;
  primaryEventTimeEnd?: string;
  freshnessJustification: string;
  qualifiesForLead: boolean;
  qualifiesForOpening: boolean;
};

export type TopicCluster = {
  id: string;
  topicLabel: string;
  topicFamily: string;
  sourceArticleIds: string[];
  factIds: string[];
  mergedFacts: string[];
  mergedNumbers: ExtractedNumber[];
  mergedCauses: string[];
  mergedConsequences: string[];
  contradictions: string[];
  confidence: number;
  editorialImportance: number;
  freshness: ClusterFreshness;
  sourceProfiles: SourceProfile[];
};

export type MicroBriefCandidate = {
  id: string;
  kind: 'lead_aftershock' | 'context_pulse';
  titleHint: string;
  textHint: string;
  factIds: string[];
  articleIds: string[];
  clusterIds?: string[];
  marketKeys?: string[];
  sourceClusterId?: string;
  priority: number;
};

export type StructuredMarketSeries = {
  key: string;
  label: string;
  latestValue: number;
  changePct: number;
  period: string;
  points: number[];
  labels: string[];
};

export type StructuredMarketContext = {
  windowStart: string;
  windowEnd: string;
  generatedAt: string;
  equities: StructuredMarketSeries[];
  crypto: StructuredMarketSeries[];
  rates: StructuredMarketSeries[];
  fx: StructuredMarketSeries[];
  commodities: StructuredMarketSeries[];
  missingDataFlags: string[];
  confidence: number;
  marketRegime: string;
  narrativeHints: string[];
};

export type EditorialPlanDecision = {
  clusterId: string;
  decision: 'lead' | 'opening' | 'radar' | 'carnet' | 'brief' | 'reject';
  reason: string;
};

export type EditorialPlan = {
  schemaVersion: 'v1';
  editorialAngle: string;
  leadClusterId: string | null;
  selectedClusterIds: string[];
  openingClusterIds: string[];
  radarClusterIds: string[];
  carnetClusterIds: string[];
  briefClusterIds: string[];
  rejectedClusterIds: string[];
  selectionReasons: EditorialPlanDecision[];
  risks: string[];
  sectionMissions: {
    intro: string;
    lead: string;
    opening: string;
    radar: string;
    carnet: string;
    briefs: string;
  };
  writingGuidance: {
    intro: string;
    lead: string;
    radar: string;
    carnet: string;
    briefs: string;
  };
};

export type DayEditorialPacket = {
  editionDate: string;
  leadTopic: TopicCluster | null;
  secondaryTopics: TopicCluster[];
  marketContext: StructuredMarketContext;
  chosenSections: {
    opening: TopicCluster[];
    radar: TopicCluster[];
    carnet: TopicCluster[];
    briefs: TopicCluster[];
  };
  microBriefCandidates: MicroBriefCandidate[];
  editorialPlan?: EditorialPlan | null;
  llmStages?: LlmStageTrace[];
  sourceCoverage: {
    distinctSources: number;
    distinctDomains: number;
    officialSources: number;
    highQualitySources: number;
  };
  freshEventCount: number;
  distinctClusterCount: number;
  materialTier: MaterialTier;
};

export type EvidenceRef = {
  factIds: string[];
  articleIds: string[];
  clusterIds?: string[];
  marketKeys?: string[];
};

export type DraftEvidence = {
  sentenceEvidenceMap: Record<string, EvidenceRef>;
  paragraphEvidenceMap: Record<string, EvidenceRef>;
};

export type V3Draft = {
  payload: GeneratedOikoEditionV21;
  evidence: DraftEvidence;
  metadata: {
    writer: string;
    model: string;
    usedFallback: boolean;
    editionFormat: DraftEditionFormat;
    planningSource?: 'llm' | 'deterministic';
    llmStages?: LlmStageTrace[];
  };
};

export type PublicationGateMetrics = {
  french_only: boolean;
  originality_gate: boolean;
  traceability_gate: boolean;
  freshness_gate: boolean;
  duplication_gate: boolean;
  lead_cluster_fresh: boolean;
  distinct_cluster_count: number;
  supported_sentence_ratio: number;
  forbidden_residue_count: number;
  fresh_event_count: number;
  high_quality_source_count: number;
  english_sentence_count: number;
  mixed_language_sentence_count: number;
  provider_residue_count: number;
  duplication_ratio: number;
  language_quality_score: number;
  assetCoverage: number;
  missingAssets: string[];
  brokenAssetCount: number;
};

export type QualityIssue = {
  code: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  target?: string;
};

export type QualityReport = {
  stage: string;
  status: V3StageStatus;
  summaryText: string;
  metrics: PublicationGateMetrics;
  issues: QualityIssue[];
  publicationStatus: V3PublicationStatus;
  publicationReason: string;
  publicationReasonCode: string;
  visibility: V3Visibility;
};


