import groqProvider from '../../ai/providers/GroqProvider.js';
import geminiProvider from '../../ai/providers/GeminiProvider.js';
import openRouterProvider from '../../ai/providers/OpenRouterProvider.js';
import OIKO_CONFIG from '../config.ts';
import { getGroqTrackedServiceKey, trackOikoApiUsage } from '../usage.ts';

const providerRegistry = {
  groq: groqProvider,
  gemini: geminiProvider,
  openrouter: openRouterProvider,
};

/** Default timeout per LLM call in ms — overridable via OIKO_LLM_TIMEOUT_MS env var. */
const LLM_TIMEOUT_MS = Number(process.env.OIKO_LLM_TIMEOUT_MS) || 45_000;

/** Wraps a promise with a hard timeout. Rejects with a clear message if exceeded. */
function withTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`LLM call timed out after ${timeoutMs}ms [${label}]`));
    }, timeoutMs);

    promise
      .then((result) => { clearTimeout(timer); resolve(result); })
      .catch((error) => { clearTimeout(timer); reject(error); });
  });
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
  messages: Array<{ role: string; content: string }>,
  options: { maxTokens?: number; temperature?: number } = {},
  usageDate?: string,
) {
  const provider = providerRegistry[providerName as keyof typeof providerRegistry] as any;
  if (!provider || !model) {
    throw new Error(`Unknown provider/model combination: ${providerName}/${model}`);
  }

  const trackedServiceKey = providerName === 'groq' ? getGroqTrackedServiceKey(model) : null;

  const timeoutMs = options.maxTokens && options.maxTokens > 6000 ? LLM_TIMEOUT_MS * 1.5 : LLM_TIMEOUT_MS;

  try {
    const result = await withTimeout(
      provider.generate({
        model,
        messages,
        maxTokens: options.maxTokens || 7200,
        temperature: options.temperature ?? 0.15,
      }),
      timeoutMs,
      `${providerName}/${model}`,
    );

    if (trackedServiceKey && usageDate) {
      trackOikoApiUsage(trackedServiceKey, { usageDate, requests: 1, tokens: result.tokensUsed || 0 });
    }

    return result;
  } catch (error) {
    if (trackedServiceKey && usageDate) {
      trackOikoApiUsage(trackedServiceKey, { usageDate, requests: 1 });
    }
    throw error;
  }
}

function buildAttemptChain() {
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
  ] as Array<{ provider: string; model: string; label: string }>; 

  const seen = new Set<string>();
  return [...configuredAttempts, ...autoFallbacks].filter((attempt) => {
    const key = `${attempt.provider}:${attempt.model}`;
    if (!attempt.provider || !attempt.model || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function generateWithConfiguredProviders(
  messages: Array<{ role: string; content: string }>,
  usageDate?: string,
  options: { maxTokens?: number; temperature?: number } = {},
) {
  const attempts: Array<Record<string, unknown>> = [];
  const attemptChain = buildAttemptChain();

  for (const attempt of attemptChain) {
    try {
      const result = await callConfiguredProvider(attempt.provider, attempt.model, messages, options, usageDate);
      attempts.push({ ...attempt, status: 'success', tokensUsed: result.tokensUsed || 0 });
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

export async function repairJsonWithFastModel(rawText: string, usageDate?: string) {
  if (!rawText) {
    return null;
  }

  const repairMessages = [
    {
      role: 'system',
      content: 'Répare uniquement le JSON fourni. Réponds avec un JSON valide, sans ajouter ni supprimer de sens.',
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

  for (const attempt of repairAttempts) {
    try {
      const repaired = await callConfiguredProvider(attempt.provider, attempt.model, repairMessages, { maxTokens: 4096, temperature: 0 }, usageDate);
      const parsed = extractJsonCandidate(String(repaired.content || ''));
      if (parsed) return parsed;
    } catch (_error) {
      continue;
    }
  }

  return null;
}
