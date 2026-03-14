import groqProvider from '../../ai/providers/GroqProvider.js';
import geminiProvider from '../../ai/providers/GeminiProvider.js';
import openRouterProvider from '../../ai/providers/OpenRouterProvider.js';
import OIKO_CONFIG from '../config.ts';
import { OIKO_V3_POLICY } from '../policy/v3.ts';
import { getGroqTrackedServiceKey, trackOikoApiUsage } from '../usage.ts';

type ProviderName = 'groq' | 'gemini' | 'openrouter';
type ProviderMessage = { role: string; content: string };
type ProviderGenerateParams = {
  model: string;
  messages: ProviderMessage[];
  maxTokens?: number;
  temperature?: number;
  signal?: AbortSignal;
};

export type ProviderGenerationResult = {
  content: string;
  tokensUsed: number;
  promptTokens: number;
  completionTokens: number;
  finishReason?: string | null;
  model?: string | null;
  headers?: Record<string, unknown>;
  rawResponse?: unknown;
};

type ProviderClient = {
  generate(params: ProviderGenerateParams): Promise<ProviderGenerationResult>;
};

type AttemptDefinition = {
  provider: string;
  model: string;
  label: string;
};

export type ProviderAttempt = AttemptDefinition & {
  status: 'success' | 'failed';
  tokensUsed?: number;
  error?: string;
  timeoutMs?: number;
};

export type ProviderSelectionResult = {
  content: string;
  providerUsed: string | null;
  modelUsed: string | null;
  attempts: ProviderAttempt[];
};

export type JsonRepairResult = {
  parsed: unknown | null;
  providerUsed: string | null;
  modelUsed: string | null;
  attempts: ProviderAttempt[];
};

const providerRegistry: Record<ProviderName, ProviderClient> = {
  groq: groqProvider,
  gemini: geminiProvider,
  openrouter: openRouterProvider,
};

function getProvider(providerName: string): ProviderClient | null {
  if (providerName === 'groq' || providerName === 'gemini' || providerName === 'openrouter') {
    return providerRegistry[providerName];
  }
  return null;
}

function getRequestTimeoutMs(options: { maxTokens?: number }) {
  const baseTimeoutMs = OIKO_V3_POLICY.llm.requestTimeoutMs;
  return options.maxTokens && options.maxTokens > 6000 ? Math.round(baseTimeoutMs * 1.5) : baseTimeoutMs;
}

function createTimeoutController(timeoutMs: number) {
  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  return {
    signal: controller.signal,
    didTimeout: () => timedOut,
    clear: () => clearTimeout(timer),
  };
}

export function extractJsonCandidate(rawText?: string | null) {
  if (!rawText) return null;
  const trimmed = rawText.trim();
  try {
    return JSON.parse(trimmed);
  } catch (_error) {
    const start = trimmed.indexOf('{');
    const end = trimmed.lastIndexOf('}');
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(trimmed.slice(start, end + 1));
      } catch (_innerError) {
        return null;
      }
    }
    return null;
  }
}

export async function callConfiguredProvider(
  providerName: string,
  model: string,
  messages: ProviderMessage[],
  options: { maxTokens?: number; temperature?: number } = {},
  usageDate?: string,
): Promise<ProviderGenerationResult> {
  const provider = getProvider(providerName);
  if (!provider || !model) {
    throw new Error(`Unknown provider/model combination: ${providerName}/${model}`);
  }

  const trackedServiceKey = providerName === 'groq' ? getGroqTrackedServiceKey(model) : null;
  const timeoutMs = getRequestTimeoutMs(options);
  const timeout = createTimeoutController(timeoutMs);
  const timeoutMessage = `LLM call timed out after ${timeoutMs}ms [${providerName}/${model}]`;

  try {
    const result = await provider.generate({
      model,
      messages,
      maxTokens: options.maxTokens || 7200,
      temperature: options.temperature ?? 0.15,
      signal: timeout.signal,
    });

    if (trackedServiceKey && usageDate) {
      trackOikoApiUsage(trackedServiceKey, { usageDate, requests: 1, tokens: result.tokensUsed || 0 });
    }

    return result;
  } catch (error) {
    if (trackedServiceKey && usageDate) {
      trackOikoApiUsage(trackedServiceKey, { usageDate, requests: 1 });
    }
    if (timeout.didTimeout()) {
      throw new Error(timeoutMessage);
    }
    throw error;
  } finally {
    timeout.clear();
  }
}

function buildAttemptChain(): AttemptDefinition[] {
  const configuredAttempts = [
    { provider: OIKO_CONFIG.primaryProvider, model: OIKO_CONFIG.primaryModel, label: 'primary' },
    ...(OIKO_CONFIG.secondaryProvider && OIKO_CONFIG.secondaryModel
      ? [{ provider: OIKO_CONFIG.secondaryProvider, model: OIKO_CONFIG.secondaryModel, label: 'secondary' }]
      : []),
  ];

  const autoFallbacks = [
    ...(process.env.GEMINI_API_KEY ? [
      { provider: 'gemini', model: process.env.OIKO_GEMINI_FALLBACK_MODEL || 'gemini-2.5-flash', label: 'auto-gemini-primary' },
      { provider: 'gemini', model: 'gemini-2.0-flash', label: 'auto-gemini-compat' },
    ] : []),
    ...(process.env.OPENROUTER_API_KEY ? [
      { provider: 'openrouter', model: process.env.OIKO_OPENROUTER_FALLBACK_MODEL || 'meta-llama/llama-3.1-8b-instruct:free', label: 'auto-openrouter' },
    ] : []),
  ] as AttemptDefinition[];

  const seen = new Set<string>();
  return [...configuredAttempts, ...autoFallbacks].filter((attempt) => {
    const key = `${attempt.provider}:${attempt.model}`;
    if (!attempt.provider || !attempt.model || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function generateWithConfiguredProviders(
  messages: ProviderMessage[],
  usageDate?: string,
  options: { maxTokens?: number; temperature?: number } = {},
): Promise<ProviderSelectionResult> {
  const attempts: ProviderAttempt[] = [];
  const attemptChain = buildAttemptChain();
  const timeoutMs = getRequestTimeoutMs(options);

  for (const attempt of attemptChain) {
    try {
      const result = await callConfiguredProvider(attempt.provider, attempt.model, messages, options, usageDate);
      attempts.push({ ...attempt, status: 'success', tokensUsed: result.tokensUsed || 0, timeoutMs });
      return {
        content: String(result.content || ''),
        providerUsed: attempt.provider,
        modelUsed: attempt.model,
        attempts,
      };
    } catch (error) {
      attempts.push({
        ...attempt,
        status: 'failed',
        error: error instanceof Error ? error.message : String(error),
        timeoutMs,
      });
    }
  }

  return {
    content: '',
    providerUsed: null,
    modelUsed: null,
    attempts,
  };
}

export async function repairJsonWithFastModelDetailed(rawText: string, usageDate?: string): Promise<JsonRepairResult> {
  if (!rawText) {
    return { parsed: null, providerUsed: null, modelUsed: null, attempts: [] };
  }

  const repairMessages: ProviderMessage[] = [
    {
      role: 'system',
      content: 'R?pare uniquement le JSON fourni. R?ponds avec un JSON valide, sans ajouter ni supprimer de sens.',
    },
    {
      role: 'user',
      content: rawText,
    },
  ];

  const repairAttempts = [
    ...(process.env.GROQ_API_KEY ? [{ provider: 'groq', model: 'llama-3.1-8b-instant' }] : []),
    ...(process.env.GEMINI_API_KEY ? [
      { provider: 'gemini', model: process.env.OIKO_GEMINI_FALLBACK_MODEL || 'gemini-2.5-flash' },
      { provider: 'gemini', model: 'gemini-2.0-flash' },
    ] : []),
    ...(process.env.OPENROUTER_API_KEY ? [{ provider: 'openrouter', model: process.env.OIKO_OPENROUTER_FALLBACK_MODEL || 'meta-llama/llama-3.1-8b-instruct:free' }] : []),
  ] as Array<{ provider: string; model: string }>;

  const attempts: ProviderAttempt[] = [];

  for (const attempt of repairAttempts) {
    try {
      const repaired = await callConfiguredProvider(attempt.provider, attempt.model, repairMessages, { maxTokens: 4096, temperature: 0 }, usageDate);
      const parsed = extractJsonCandidate(String(repaired.content || ''));
      if (parsed) {
        attempts.push({
          provider: attempt.provider,
          model: attempt.model,
          label: 'repair',
          status: 'success',
          tokensUsed: repaired.tokensUsed || 0,
        });
        return {
          parsed,
          providerUsed: attempt.provider,
          modelUsed: attempt.model,
          attempts,
        };
      }
      attempts.push({
        provider: attempt.provider,
        model: attempt.model,
        label: 'repair',
        status: 'failed',
        tokensUsed: repaired.tokensUsed || 0,
        error: 'invalid_json_candidate',
      });
    } catch (error) {
      attempts.push({
        provider: attempt.provider,
        model: attempt.model,
        label: 'repair',
        status: 'failed',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return {
    parsed: null,
    providerUsed: null,
    modelUsed: null,
    attempts,
  };
}

export async function repairJsonWithFastModel(rawText: string, usageDate?: string) {
  const result = await repairJsonWithFastModelDetailed(rawText, usageDate);
  return result.parsed;
}
