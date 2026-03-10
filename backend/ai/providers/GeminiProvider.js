import BaseProvider from './BaseProvider.js';

/**
 * GeminiProvider
 *
 * Google Gemini API implementation.
 * Backup provider for when Groq is rate-limited.
 *
 * Docs: https://ai.google.dev/api/rest
 */

export class GeminiProvider extends BaseProvider {
    constructor(config) {
        super(config);
    }

    /**
     * Generate completion using Gemini API
     *
     * Note: Gemini API structure is different from OpenAI
     */
    async generate(params) {
        this.validateApiKey();

        const {
            model,
            messages,
            maxTokens = 1024,
            temperature = 0.7
        } = params;

        // Convert OpenAI-style messages to Gemini format
        const contents = this.convertMessagesToGeminiFormat(messages);

        const requestBody = {
            contents,
            generationConfig: {
                maxOutputTokens: maxTokens,
                temperature
            }
        };

        try {
            const response = await this.retry(async () => {
                // Gemini API URL format: .../models/{model}:generateContent
                const url = `${this.baseUrl}/models/${model}:generateContent`; 

                const res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-goog-api-key': this.apiKey
                    },
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

            // Extract content from Gemini response
            const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

            // Estimate tokens (Gemini doesn't always return usage)
            const promptTokens = data.usageMetadata?.promptTokenCount || this.estimateMessagesTokens(messages);
            const completionTokens = data.usageMetadata?.candidatesTokenCount || this.estimateTokens(content);
            const tokensUsed = promptTokens + completionTokens;

            return {
                content,
                tokensUsed,
                promptTokens,
                completionTokens,
                finishReason: data.candidates?.[0]?.finishReason,
                model,
                headers: this.parseRateLimitHeaders(headers),
                rawResponse: data
            };
        } catch (error) {
            throw this.handleError(error, { model });
        }
    }

    /**
     * Convert OpenAI-style messages to Gemini format
     *
     * OpenAI: [{ role: 'user', content: 'Hello' }]
     * Gemini: [{ role: 'user', parts: [{ text: 'Hello' }] }]
     */
    convertMessagesToGeminiFormat(messages) {
        const systemInstructions = messages
            .filter((msg) => msg.role === 'system')
            .map((msg) => msg.content?.trim())
            .filter(Boolean)
            .join('\n\n');

        const output = [];
        let systemInjected = false;

        for (const msg of messages) {
            if (msg.role === 'system') {
                continue;
            }

            let role = msg.role;
            if (role === 'assistant') role = 'model';

            let text = msg.content;
            if (!systemInjected && role === 'user' && systemInstructions) {
                text = `[INSTRUCTIONS SYSTEME]\n${systemInstructions}\n[/INSTRUCTIONS SYSTEME]\n\n${msg.content}`;
                systemInjected = true;
            }

            output.push({
                role,
                parts: [{ text }]
            });
        }

        return output;
    }

    /**
     * Parse Gemini rate limit headers
     *
     * Note: Gemini's rate limiting is less transparent than Groq's.
     * Headers may vary depending on quota tier.
     */
    parseRateLimitHeaders(headers) {
        const parseNumber = (value) => {
            const num = parseInt(value);
            return isNaN(num) ? null : num;
        };

        // Gemini uses different header names (if present)
        const remainingRequests = parseNumber(headers['x-goog-quota-user']);
        const resetAt = headers['x-ratelimit-reset'];

        return {
            remainingRequests,
            remainingTokens: null, // Gemini doesn't typically expose this
            resetRequestsAt: resetAt ? parseInt(resetAt) * 1000 : null,
            resetTokensAt: null
        };
    }

    /**
     * Build headers for Gemini
     */
    buildHeaders() {
        return {
            'Content-Type': 'application/json',
            'x-goog-api-key': this.apiKey
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
     * Get model by key
     */
    getModel(modelKey) {
        return this.config.models[modelKey];
    }
}

// Singleton instance
import { PROVIDER_CONFIG } from '../config/providers.js';
export const geminiProvider = new GeminiProvider(PROVIDER_CONFIG.gemini);
export default geminiProvider;
