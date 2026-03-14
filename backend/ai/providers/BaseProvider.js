/**
 * BaseProvider
 *
 * Abstract base class for all LLM providers.
 * Defines common interface and utility methods.
 */

export class BaseProvider {
    constructor(config) {
        this.config = config;
        this.name = config.name;
        this.baseUrl = config.baseUrl;
        // Don't load API key in constructor - load lazily to ensure dotenv is loaded
        this._apiKey = null;
    }

    /**
     * Get API key from environment variables (lazy loading)
     */
    get apiKey() {
        if (this._apiKey === null) {
            const envKey = `${this.name.toUpperCase()}_API_KEY`;
            this._apiKey = process.env[envKey] || '';
            
            if (!this._apiKey) {
                console.warn(`[warn] Missing API key for ${this.name}: ${envKey}`);
            }
        }
        return this._apiKey;
    }

    /**
     * Generate a completion
     * MUST be implemented by subclasses
     *
     * @param {object} params - Generation parameters
     * @param {string} params.model - Model ID
     * @param {array} params.messages - Chat messages
     * @param {number} params.maxTokens - Max tokens to generate
     * @param {number} params.temperature - Temperature (0-1)
     * @param {AbortSignal} [params.signal] - Optional abort signal for request cancellation
     * @returns {Promise<object>} { content, tokensUsed, headers }
     */
    async generate(params) {
        throw new Error(`generate() must be implemented by ${this.constructor.name}`);
    }

    /**
     * Parse rate limit headers
     * Override in subclass for provider-specific parsing
     *
     * @param {object} headers - Response headers
     * @returns {object} { remainingRequests, remainingTokens, resetAt }
     */
    parseRateLimitHeaders(headers) {
        return {
            remainingRequests: null,
            remainingTokens: null,
            resetAt: null
        };
    }

    /**
     * Estimate tokens in text (rough approximation)
     * More accurate estimation can be done with tiktoken
     *
     * @param {string} text - Text to estimate
     * @returns {number} Estimated token count
     */
    estimateTokens(text) {
        if (!text) return 0;

        // Rough estimate: ~4 characters per token for English
        // French tends to be slightly more (4.5-5 chars/token)
        const avgCharsPerToken = 4.5;
        return Math.ceil(text.length / avgCharsPerToken);
    }

    /**
     * Estimate tokens for messages array
     *
     * @param {array} messages - Chat messages
     * @returns {number} Estimated total tokens
     */
    estimateMessagesTokens(messages) {
        return messages.reduce((total, msg) => {
            return total + this.estimateTokens(msg.content) + 4; // +4 for message overhead
        }, 0);
    }

    /**
     * Validate API key before making requests
     */
    validateApiKey() {
        if (!this.apiKey) {
            throw new Error(`Missing API key for provider: ${this.name}`);
        }
    }

    /**
     * Build request headers
     * Override or extend in subclass
     */
    buildHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
        };
    }

    /**
     * Handle API errors
     * Can be overridden for provider-specific error handling
     */
    handleError(error, context = {}) {
        const errorInfo = {
            provider: this.name,
            model: context.model,
            message: error.message,
            statusCode: error.statusCode || error.status,
            timestamp: Date.now()
        };

        // Rate limit errors
        if (errorInfo.statusCode === 429) {
            return new RateLimitError(
                `Rate limit exceeded for ${this.name}`,
                error.headers?.['retry-after']
            );
        }

        // Server errors (5xx)
        if (errorInfo.statusCode >= 500) {
            return new ProviderError(
                `Server error from ${this.name}: ${error.message}`,
                errorInfo.statusCode,
                true // isRetryable
            );
        }

        // Client errors (4xx)
        if (errorInfo.statusCode >= 400) {
            return new ProviderError(
                `Client error from ${this.name}: ${error.message}`,
                errorInfo.statusCode,
                false // not retryable
            );
        }

        // Network/timeout errors
        if (error.name === 'AbortError' || error.code === 'ABORT_ERR') {
            return new ProviderError(`Request aborted for ${this.name}: ${error.message}`, 0, false);
        }

        if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
            return new ProviderError(
                `Network error for ${this.name}: ${error.message}`,
                0,
                true // isRetryable
            );
        }

        // Generic error
        return new ProviderError(
            `Unknown error from ${this.name}: ${error.message}`,
            0,
            false
        );
    }

    /**
     * Retry logic with exponential backoff
     */
    async retry(fn, maxRetries = 2, initialDelay = 1000) {
        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                return await fn();
            } catch (error) {
                const isLastAttempt = attempt === maxRetries;
                const handledError = this.handleError(error);

                // Don't retry if not retryable or last attempt
                if (!handledError.isRetryable || isLastAttempt) {
                    throw handledError;
                }

                // Exponential backoff
                const delay = initialDelay * Math.pow(2, attempt);
                console.log(`[retry] ${this.name} in ${delay}ms (attempt ${attempt + 1}/${maxRetries})...`);
                await this.sleep(delay);
            }
        }
    }

    /**
     * Sleep utility
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Check if provider is healthy
     * Can be overridden for provider-specific health checks
     */
    async healthCheck() {
        try {
            // Simple generation test
            await this.generate({
                model: Object.values(this.config.models)[0].id,
                messages: [{ role: 'user', content: 'test' }],
                maxTokens: 10
            });
            return { healthy: true, provider: this.name };
        } catch (error) {
            return {
                healthy: false,
                provider: this.name,
                error: error.message
            };
        }
    }
}

/**
 * Custom error classes
 */

export class ProviderError extends Error {
    constructor(message, statusCode, isRetryable = false) {
        super(message);
        this.name = 'ProviderError';
        this.statusCode = statusCode;
        this.isRetryable = isRetryable;
    }
}

export class RateLimitError extends ProviderError {
    constructor(message, retryAfter = null) {
        super(message, 429, false);
        this.name = 'RateLimitError';
        this.retryAfter = retryAfter;
    }
}

export default BaseProvider;






