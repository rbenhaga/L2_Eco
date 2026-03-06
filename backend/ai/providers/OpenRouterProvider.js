import BaseProvider from './BaseProvider.js';

/**
 * OpenRouterProvider
 *
 * OpenRouter API implementation (aggregator).
 * Last resort provider when Groq and Gemini are exhausted.
 *
 * Docs: https://openrouter.ai/docs
 */

export class OpenRouterProvider extends BaseProvider {
    constructor(config) {
        super(config);
        this.referer = process.env.OPENROUTER_REFERER || 'https://localhost:3000';
        this.appName = process.env.OPENROUTER_APP_NAME || 'RevP2';
    }

    /**
     * Generate completion using OpenRouter API
     *
     * OpenRouter is OpenAI-compatible with some extensions
     */
    async generate(params) {
        this.validateApiKey();

        const {
            model,
            messages,
            maxTokens = 1024,
            temperature = 0.7,
            stream = false
        } = params;

        const requestBody = {
            model,
            messages,
            max_tokens: maxTokens,
            temperature,
            stream
        };

        try {
            const response = await this.retry(async () => {
                const res = await fetch(`${this.baseUrl}/chat/completions`, {
                    method: 'POST',
                    headers: this.buildHeaders(),
                    body: JSON.stringify(requestBody)
                });

                if (!res.ok) {
                    const errorBody = await res.json().catch(() => ({}));
                    const error = new Error(errorBody.error?.message || `HTTP ${res.status}`);
                    error.statusCode = res.status;
                    error.headers = Object.fromEntries(res.headers.entries());
                    throw error;
                }

                return res;
            });

            const data = await response.json();
            const headers = Object.fromEntries(response.headers.entries());

            // Extract content and token usage
            const content = data.choices[0]?.message?.content || '';
            const tokensUsed = data.usage?.total_tokens || 0;

            // Parse rate limit headers
            const rateLimitInfo = this.parseRateLimitHeaders(headers);

            return {
                content,
                tokensUsed,
                promptTokens: data.usage?.prompt_tokens || 0,
                completionTokens: data.usage?.completion_tokens || 0,
                finishReason: data.choices[0]?.finish_reason,
                model: data.model,
                headers: rateLimitInfo,
                rawResponse: data
            };
        } catch (error) {
            throw this.handleError(error, { model });
        }
    }

    /**
     * Build headers with OpenRouter-specific requirements
     */
    buildHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
            'HTTP-Referer': this.referer,
            'X-Title': this.appName
        };
    }

    /**
     * Parse OpenRouter rate limit headers
     *
     * OpenRouter uses similar headers to OpenAI
     */
    parseRateLimitHeaders(headers) {
        const parseNumber = (value) => {
            const num = parseInt(value);
            return isNaN(num) ? null : num;
        };

        const remainingRequests = parseNumber(headers['x-ratelimit-remaining-requests']);
        const remainingTokens = parseNumber(headers['x-ratelimit-remaining-tokens']);
        const resetRequests = headers['x-ratelimit-reset-requests'];
        const resetTokens = headers['x-ratelimit-reset-tokens'];

        return {
            remainingRequests,
            remainingTokens,
            resetRequestsAt: resetRequests ? new Date(resetRequests).getTime() : null,
            resetTokensAt: resetTokens ? new Date(resetTokens).getTime() : null,
            limitRequests: parseNumber(headers['x-ratelimit-limit-requests']),
            limitTokens: parseNumber(headers['x-ratelimit-limit-tokens'])
        };
    }

    /**
     * Get available models (only free ones)
     */
    getAvailableModels() {
        return Object.entries(this.config.models)
            .filter(([, model]) => model.id.includes(':free'))
            .map(([key, model]) => ({
                key,
                id: model.id,
                displayName: model.displayName,
                useCase: model.useCase,
                quotas: model.quotas
            }));
    }

    /**
     * Get model by key
     */
    getModel(modelKey) {
        return this.config.models[modelKey];
    }
}

// Singleton instance
import { PROVIDER_CONFIG } from '../config/providers.js';
export const openRouterProvider = new OpenRouterProvider(PROVIDER_CONFIG.openrouter);
export default openRouterProvider;
