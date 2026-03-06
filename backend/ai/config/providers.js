/**
 * Provider Configuration
 * Defines all LLM providers with their models, quotas, and settings
 */

export const PROVIDER_CONFIG = {
  groq: {
    name: 'groq',
    displayName: 'Groq',
    baseUrl: 'https://api.groq.com/openai/v1',
    priority: 1, // Highest priority (fastest, most generous quota)

    models: {
      fast: {
        id: 'llama-3.1-8b-instant',
        displayName: 'Llama 3.1 8B Instant',
        maxTokens: 8000,
        contextWindow: 8192,
        quotas: {
          rpm: 30,        // requests per minute
          rpd: 14400,     // requests per day
          tpm: 6000,      // tokens per minute
          tpd: 500000     // tokens per day
        },
        cost: 0,
        useCase: 'simple',  // Best for simple/medium questions
        averageLatency: 800, // ms
        temperature: 0.7,
        systemPrompt: `Tu es un assistant pédagogique expert pour étudiants en psychologie, économie et sciences sociales.

RÈGLE ABSOLUE - FORMATAGE LATEX :
Tu DOIS utiliser la syntaxe LaTeX pour TOUTE notation mathématique. C'est OBLIGATOIRE.

Exemples CORRECTS :
✓ "La formule est $Y = C + I + G$"
✓ "Le multiplicateur est $k = \\frac{1}{1-c_1}$"
✓ "Si $c_1 = 0.8$ alors $k = 5$"
✓ "L'équation $$Y = C(Y-T) + I(Y,i) + G$$ représente l'équilibre IS"
✓ "Le taux $\\alpha = 0.05$ est significatif"

Exemples INTERDITS (JAMAIS faire ça) :
✗ "La formule est Y = C + I + G" (texte brut)
✗ "Le multiplicateur est k = 1/(1-c1)" (texte brut)
✗ "Si c1 = 0.8 alors k = 5" (texte brut)

AUTRES RÈGLES :
- Markdown simple : **gras** pour concepts clés, *italique* pour termes techniques
- Listes à puces pour structurer
- PAS de titres # sauf si vraiment nécessaire
- **IMPORTANT** : Base-toi UNIQUEMENT sur le contenu du cours fourni dans le contexte
- Si le contexte ne contient pas assez d'informations, dis : "Je n'ai pas accès à cette partie du cours. Peux-tu me donner plus de détails ?"
- N'invente JAMAIS de formules ou de contenu qui n'est pas dans le cours

STYLE : Clair, structuré, pédagogique. Pas d'abus de formatage.`
      },

      quality: {
        id: 'llama-3.3-70b-versatile',
        displayName: 'Llama 3.3 70B Versatile',
        maxTokens: 8000,
        contextWindow: 8192,
        quotas: {
          rpm: 30,
          rpd: 1000,      // Lower daily quota!
          tpm: 12000,
          tpd: 100000
        },
        cost: 0,
        useCase: 'complex',  // Best for complex questions
        averageLatency: 1500, // ms
        temperature: 0.7,
        systemPrompt: `Tu es un assistant pédagogique expert pour étudiants en psychologie, économie et sciences sociales.

RÈGLE ABSOLUE - FORMATAGE LATEX :
Tu DOIS utiliser la syntaxe LaTeX pour TOUTE notation mathématique. C'est OBLIGATOIRE.

Exemples CORRECTS :
✓ "La courbe IS : $Y = C(Y-T) + I(Y,i) + G$"
✓ "Le multiplicateur keynésien $k = \\frac{1}{1-c_1} = \\frac{1}{s}$"
✓ "Si $c_1 = 0.8$ alors $k = 5$"
✓ "L'équilibre : $$\\frac{M^S}{P} = L(Y,i)$$"
✓ "Test statistique : $t(df) = 2.5$, $p < 0.05$"
✓ "Probabilité conditionnelle : $$P(A|B) = \\frac{P(B|A)P(A)}{P(B)}$$"

Exemples INTERDITS (JAMAIS faire ça) :
✗ "Y = C + I + G" (texte brut)
✗ "k = 1/(1-c1)" (texte brut)
✗ "P(A|B) = P(B|A)P(A)/P(B)" (texte brut)

AUTRES RÈGLES :
- Markdown simple : **gras** pour concepts clés, *italique* pour termes techniques
- Listes à puces pour structurer
- PAS de titres # sauf si vraiment nécessaire
- **IMPORTANT** : Base-toi UNIQUEMENT sur le contenu du cours fourni dans le contexte
- Si le contexte ne contient pas assez d'informations, dis : "Je n'ai pas accès à cette partie du cours dans le contexte actuel. Peux-tu me donner plus de détails ou reformuler ta question ?"
- N'invente JAMAIS de formules ou de contenu qui n'est pas dans le cours

STYLE : Approfondi, nuancé, structuré avec exemples concrets. Pas d'abus de formatage.`
      }
    },

    // Header names for rate limit tracking
    headers: {
      remainingRequests: 'x-ratelimit-remaining-requests',
      remainingTokens: 'x-ratelimit-remaining-tokens',
      resetRequests: 'x-ratelimit-reset-requests',  // seconds until reset
      resetTokens: 'x-ratelimit-reset-tokens'
    },

    // Retry configuration
    retryConfig: {
      maxRetries: 2,
      backoffMs: 1000,  // 1s, 2s
      retryOn: [429, 500, 502, 503, 504]
    },

    // Circuit breaker settings
    circuitBreaker: {
      failureThreshold: 5,        // Open after 5 consecutive failures
      resetTimeoutMs: 60000,      // Try half-open after 60s
      halfOpenRequests: 3         // Test with 3 requests in half-open
    }
  },

  gemini: {
    name: 'gemini',
    displayName: 'Google Gemini',
    baseUrl: 'https://generativelanguage.googleapis.com/v1',
    priority: 2, // Fallback provider

    models: {
      flash: {
        id: 'gemini-2.0-flash-exp',
        displayName: 'Gemini 2.0 Flash',
        maxTokens: 8192,
        contextWindow: 1000000,  // 1M context!
        quotas: {
          rpm: 10,         // Conservative estimate
          rpd: 250,        // Low daily quota
          tpm: 250000,     // High token quota
          tpd: 10000000    // Very high but RPM limited
        },
        cost: 0,
        useCase: 'fallback',
        averageLatency: 1200, // ms
        temperature: 0.7,
        systemPrompt: `Tu es un assistant pédagogique pour étudiants en L2 psychologie, économie et sociologie.

RÈGLE ABSOLUE - FORMATAGE LATEX :
Tu DOIS utiliser $formule$ pour inline ou $$formule$$ pour display. JAMAIS de texte brut.

Exemples : $\\mu$, $\\sigma^2$, $p < 0.05$, $$\\bar{x} = \\frac{\\sum x}{n}$$

Base-toi UNIQUEMENT sur le contenu du cours fourni. Si tu n'as pas l'info, dis-le.`
      }
    },

    // Gemini doesn't return rate limit headers consistently
    headers: {
      remainingRequests: null,
      remainingTokens: null,
      resetRequests: null,
      resetTokens: null
    },

    retryConfig: {
      maxRetries: 2,
      backoffMs: 1500,
      retryOn: [429, 500, 503]
    },

    circuitBreaker: {
      failureThreshold: 3,
      resetTimeoutMs: 120000,  // 2 minutes
      halfOpenRequests: 2
    }
  },

  openrouter: {
    name: 'openrouter',
    displayName: 'OpenRouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    priority: 3, // Last resort

    models: {
      free: {
        id: 'meta-llama/llama-3.1-8b-instruct:free',
        displayName: 'Llama 3.1 8B (Free)',
        maxTokens: 4096,
        contextWindow: 8192,
        quotas: {
          rpm: 20,
          rpd: 200,        // Very limited
          tpm: 100000,
          tpd: 1000000
        },
        cost: 0,
        useCase: 'emergency',
        averageLatency: 2000, // ms (slower, queued)
        temperature: 0.7,
        systemPrompt: `Tu es un assistant pédagogique pour étudiants en sciences sociales.

RÈGLE ABSOLUE : Utilise $formule$ pour TOUTE notation mathématique. Exemples : $Y = C + I$, $k = \\frac{1}{s}$

Base-toi UNIQUEMENT sur le contenu du cours fourni.`
      }
    },

    headers: {
      remainingRequests: null,  // OpenRouter may not provide these
      remainingTokens: null,
      resetRequests: null,
      resetTokens: null
    },

    retryConfig: {
      maxRetries: 1,  // Don't retry much on free tier
      backoffMs: 2000,
      retryOn: [429, 503]
    },

    circuitBreaker: {
      failureThreshold: 3,
      resetTimeoutMs: 180000,  // 3 minutes
      halfOpenRequests: 1
    }
  }
};

/**
 * Model selection strategy based on question complexity
 */
export const MODEL_SELECTION_STRATEGY = {
  // Complexity thresholds (adjusted to favor fast model)
  complexityThresholds: {
    simple: 0.4,    // 0-0.4 = simple question (use 8B)
    medium: 0.7,    // 0.4-0.7 = medium question (prefer 8B, fallback 70B)
    complex: 1.0    // 0.7-1.0 = complex question (use 70B)
  },

  // Model priority per complexity level
  // Router will try providers in this order, subject to quota/health
  modelPriority: {
    simple: [
      { provider: 'groq', model: 'fast' },       // Fast 8B (14,400/day)
      { provider: 'gemini', model: 'flash' },    // Gemini fallback
      { provider: 'openrouter', model: 'free' }  // Last resort
    ],
    medium: [
      { provider: 'groq', model: 'fast' },       // PREFER 8B for medium too!
      { provider: 'gemini', model: 'flash' },    // Gemini fallback
      { provider: 'groq', model: 'quality' }     // 70B only if others fail
    ],
    complex: [
      { provider: 'groq', model: 'quality' },    // 70B for truly complex
      { provider: 'gemini', model: 'flash' },    // Gemini fallback
      { provider: 'groq', model: 'fast' }        // 8B last resort
    ]
  }
};

/**
 * Global pool configuration
 */
export const POOL_CONFIG = {
  // Total daily quota across all providers
  totalDailyQuota: {
    groq_fast: 14400,
    groq_quality: 1000,
    gemini_flash: 250,
    openrouter_free: 200,
    // Total: ~15,850 requests/day
    total: 15850
  },

  // Safety reserve (don't allocate 100% to users)
  safetyReservePercent: 20,  // Keep 20% for spikes/errors

  // Usable quota after safety reserve
  usableQuota: Math.floor(15850 * 0.8),  // 12,680 requests/day

  // Peak hours multiplier (reduce limits during peak)
  peakHours: {
    start: 9,   // 9 AM
    end: 22,    // 10 PM
    multiplier: 0.8  // Reduce by 20% during peak
  },

  // Off-peak hours (more generous)
  offPeakMultiplier: 1.2  // Increase by 20% off-peak
};

/**
 * Helper: Get all available models
 */
export function getAllModels() {
  const models = [];
  for (const [providerName, providerConfig] of Object.entries(PROVIDER_CONFIG)) {
    for (const [modelKey, modelConfig] of Object.entries(providerConfig.models)) {
      models.push({
        provider: providerName,
        modelKey,
        ...modelConfig
      });
    }
  }
  return models;
}

/**
 * Helper: Get provider config
 */
export function getProviderConfig(providerName) {
  return PROVIDER_CONFIG[providerName];
}

/**
 * Helper: Get model config
 */
export function getModelConfig(providerName, modelKey) {
  return PROVIDER_CONFIG[providerName]?.models[modelKey];
}

/**
 * Helper: Calculate total pool capacity
 */
export function calculatePoolCapacity() {
  let totalRequests = 0;
  let totalTokens = 0;

  for (const provider of Object.values(PROVIDER_CONFIG)) {
    for (const model of Object.values(provider.models)) {
      totalRequests += model.quotas.rpd;
      totalTokens += model.quotas.tpd;
    }
  }

  return {
    totalRequests,
    totalTokens,
    usableRequests: Math.floor(totalRequests * (1 - POOL_CONFIG.safetyReservePercent / 100)),
    usableTokens: Math.floor(totalTokens * (1 - POOL_CONFIG.safetyReservePercent / 100))
  };
}

export default PROVIDER_CONFIG;
