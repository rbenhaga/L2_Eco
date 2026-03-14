import BaseProvider from './BaseProvider.js';

/**
 * GroqProvider
 *
 * Groq API implementation (OpenAI-compatible endpoint).
 * Primary provider for fast, high-quality responses.
 *
 * Docs: https://console.groq.com/docs/api-reference
 */

export class GroqProvider extends BaseProvider {
    constructor(config) {
        super(config);
    }

    /**
     * Generate completion using Groq API
     */
    async generate(params) {
        this.validateApiKey();

        const {
            model,
            messages,
            maxTokens = 1024,
            temperature = 0.7,
            stream = false,
            signal
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
                    body: JSON.stringify(requestBody),
                    signal
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
     * Parse Groq-specific rate limit headers
     *
     * Header examples:
     * - x-ratelimit-limit-requests: "30"
     * - x-ratelimit-remaining-requests: "29"
     * - x-ratelimit-reset-requests: "42.123" (seconds until reset)
     * - x-ratelimit-limit-tokens: "6000"
     * - x-ratelimit-remaining-tokens: "5950"
     * - x-ratelimit-reset-tokens: "42.123"
     */
    parseRateLimitHeaders(headers) {
        const parseNumber = (value) => {
            const num = parseFloat(value);
            return isNaN(num) ? null : num;
        };

        const remainingRequests = parseNumber(headers['x-ratelimit-remaining-requests']);
        const remainingTokens = parseNumber(headers['x-ratelimit-remaining-tokens']);
        const resetRequests = parseNumber(headers['x-ratelimit-reset-requests']);
        const resetTokens = parseNumber(headers['x-ratelimit-reset-tokens']);

        // Convert reset seconds to timestamp
        const now = Date.now();
        const resetRequestsAt = resetRequests ? now + (resetRequests * 1000) : null;
        const resetTokensAt = resetTokens ? now + (resetTokens * 1000) : null;

        return {
            remainingRequests,
            remainingTokens,
            resetRequestsAt,
            resetTokensAt,
            limitRequests: parseNumber(headers['x-ratelimit-limit-requests']),
            limitTokens: parseNumber(headers['x-ratelimit-limit-tokens'])
        };
    }

    /**
     * Get available models
     */
    getAvailableModels() {
        return Object.entries(this.config.models).map(([key, model]) => ({
            key,
            id: model.id,
            displayName: model.displayName,
            useCase: model.useCase,
            quotas: model.quotas
        }));
    }

    /**
     * Get model by key (fast, quality, etc.)
     */
    getModel(modelKey) {
        return this.config.models[modelKey];
    }

    /**
     * Stream completion (for future implementation)
     */
    async *generateStream(params) {
        // TODO: Implement streaming support
        throw new Error('Streaming not yet implemented for GroqProvider');
    }
}

// Singleton instance
import { PROVIDER_CONFIG } from '../config/providers.js';
export const groqProvider = new GroqProvider(PROVIDER_CONFIG.groq);
export default groqProvider;

