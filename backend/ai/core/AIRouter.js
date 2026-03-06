import groqProvider from '../providers/GroqProvider.js';
import geminiProvider from '../providers/GeminiProvider.js';
import openRouterProvider from '../providers/OpenRouterProvider.js';
import quotaService from '../services/QuotaService.js';
import complexityDetector from '../services/ComplexityDetector.js';
import { PROVIDER_CONFIG } from '../config/providers.js';

/**
 * AIRouter
 *
 * Core routing logic for selecting the best provider + model based on:
 * 1. Question complexity
 * 2. Provider quotas
 * 3. Circuit breaker states
 * 4. Historical success rates
 *
 * Fallback chain: Groq -> Gemini -> OpenRouter
 */

export class AIRouter {
    constructor() {
        this.providers = {
            groq: groqProvider,
            gemini: geminiProvider,
            openrouter: openRouterProvider
        };

        this.quotaService = quotaService;
        this.complexityDetector = complexityDetector;
    }

    /**
     * Main routing function
     *
     * @param {string} question - The user's question
     * @param {object} context - Context (courseId, chapterId, pageId, pageContent)
     * @param {Array} conversationHistory - Previous messages in conversation
     * @param {string} userId - User's Firebase UID
     * @returns {Promise<object>} Generated response with metadata
     */
    async route(question, context = {}, conversationHistory = [], userId) {
        console.log(`\n[AI] Routing question for user ${userId}...`);
        console.log(`[AI] Conversation history: ${conversationHistory.length} messages`);

        // 1. Analyze question complexity
        const complexity = this.complexityDetector.analyze(question, context);
        console.log(`[AI] Complexity: ${complexity.category} (${complexity.score.toFixed(2)})`);

        // 2. Get candidates based on complexity
        const candidates = this.getCandidates(complexity);
        console.log(`[AI] Found ${candidates.length} candidates`);

        // 3. Score and sort candidates
        const scoredCandidates = await this.scoreCandidates(candidates, userId);
        scoredCandidates.sort((a, b) => b.score - a.score);

        console.log('\n[AI] Scored candidates:');
        scoredCandidates.forEach((candidate, i) => {
            console.log(`  ${i + 1}. ${candidate.provider}/${candidate.model} - score ${candidate.score.toFixed(2)}`);
        });

        // 4. Try candidates in order
        for (const candidate of scoredCandidates) {
            if (candidate.score === 0) {
                console.log(`[AI] Skipping ${candidate.provider}/${candidate.model} (score 0)`);
                continue;
            }

            try {
                console.log(`\n[AI] Trying ${candidate.provider}/${candidate.model}...`);
                const response = await this.executeWithCandidate(candidate, question, context, conversationHistory);

                // Record success
                this.quotaService.recordProviderSuccess(
                    candidate.provider,
                    candidate.model,
                    response.tokensUsed
                );

                console.log(`[AI] Success with ${candidate.provider}/${candidate.model}`);

                return {
                    ...response,
                    provider: candidate.provider,
                    model: candidate.model,
                    complexity: complexity.category,
                    complexityScore: complexity.score
                };
            } catch (error) {
                console.error(`[AI] Failed with ${candidate.provider}/${candidate.model}: ${error.message}`);

                // Record failure
                this.quotaService.recordProviderFailure(
                    candidate.provider,
                    candidate.model,
                    error
                );

                // Continue to next candidate
                continue;
            }
        }

        // All providers failed
        throw new Error('All providers failed. Please try again later.');
    }

    /**
     * Get candidate providers/models based on complexity
     */
    getCandidates(complexity) {
        const candidates = [];

        // Simple questions -> fast models
        if (complexity.category === 'simple') {
            candidates.push(
                { provider: 'groq', model: 'llama-3.1-8b-instant', quality: 0.7, priority: 1 },
                { provider: 'gemini', model: 'gemini-2.0-flash-exp', quality: 0.6, priority: 2 },
                { provider: 'openrouter', model: 'meta-llama/llama-3.1-8b-instruct:free', quality: 0.5, priority: 3 }
            );
        }
        // Medium questions -> quality first, then fast
        else if (complexity.category === 'medium') {
            candidates.push(
                { provider: 'groq', model: 'llama-3.3-70b-versatile', quality: 0.9, priority: 1 },
                { provider: 'groq', model: 'llama-3.1-8b-instant', quality: 0.7, priority: 2 },
                { provider: 'gemini', model: 'gemini-2.0-flash-exp', quality: 0.8, priority: 3 }
            );
        }
        // Complex questions -> quality models only
        else {
            candidates.push(
                { provider: 'groq', model: 'llama-3.3-70b-versatile', quality: 0.9, priority: 1 },
                { provider: 'gemini', model: 'gemini-2.0-flash-exp', quality: 0.8, priority: 2 },
                { provider: 'groq', model: 'llama-3.1-8b-instant', quality: 0.7, priority: 3 }
            );
        }

        return candidates;
    }

    /**
     * Score candidates based on multiple factors
     */
    async scoreCandidates(candidates, userId) {
        const scoredCandidates = [];

        for (const candidate of candidates) {
            let score = 0;

            // 1. Base priority (30 pts max)
            score += (10 - candidate.priority) * 3;

            // 2. Circuit breaker check (0 pts if open, half score if half-open)
            const isAvailable = this.quotaService.isProviderAvailable(candidate.provider, candidate.model);
            if (!isAvailable) {
                score = 0;
            } else {
                const health = this.quotaService.getProviderHealth(candidate.provider, candidate.model);
                if (health.circuit_breaker_state === 'half-open') {
                    score *= 0.5;
                }
            }

            // 3. Quota availability (30 pts max)
            const quotaStatus = this.quotaService.getProviderQuotaStatus(candidate.provider, candidate.model);
            const quotaPercent = this.calculateQuotaPercent(quotaStatus);
            score += quotaPercent * 0.3 * 100;

            // 4. Historical success rate (20 pts max)
            const health = this.quotaService.getProviderHealth(candidate.provider, candidate.model);
            const successRate = this.calculateSuccessRate(health);
            score += successRate * 20;

            // 5. Quality fit (10 pts max)
            score += candidate.quality * 10;

            scoredCandidates.push({
                ...candidate,
                score,
                quotaPercent,
                successRate,
                isAvailable
            });
        }

        return scoredCandidates;
    }

    /**
     * Calculate quota availability percentage
     */
    calculateQuotaPercent(quotaStatus) {
        if (!quotaStatus) return 0.5;

        const requestsPercent = quotaStatus.requests_remaining /
            (quotaStatus.requests_count + quotaStatus.requests_remaining);

        const tokensPercent = quotaStatus.tokens_remaining /
            (quotaStatus.tokens_used + quotaStatus.tokens_remaining);

        return Math.min(requestsPercent, tokensPercent);
    }

    /**
     * Calculate success rate from health stats
     */
    calculateSuccessRate(health) {
        const total = health.success_count + health.failure_count;
        if (total === 0) return 0.8;

        return health.success_count / total;
    }

    /**
     * Execute generation with selected candidate
     */
    async executeWithCandidate(candidate, question, context, conversationHistory) {
        const provider = this.providers[candidate.provider];

        // Build messages
        const messages = this.buildMessages(question, context, conversationHistory);

        // Generate
        const response = await provider.generate({
            model: candidate.model,
            messages,
            maxTokens: 1024,
            temperature: 0.7
        });

        // Normalize and validate LaTeX output before returning to frontend
        const normalizedContent = this.normalizeMathFormatting(response.content || '');
        this.validateMathFormatting(normalizedContent);

        // Update provider quota from headers
        if (response.headers) {
            this.quotaService.updateProviderQuotaFromHeaders(
                candidate.provider,
                candidate.model,
                response.headers
            );
        }

        return {
            ...response,
            content: normalizedContent
        };
    }

    /**
     * Build messages array for LLM
     */
    buildMessages(question, context, conversationHistory = []) {
        const messages = [];

        let systemContent = `Tu es Oiko, assistant pedagogique L2 sciences sociales (Macro/Micro/Stats/Psycho/Socio).

Consignes de style:
- Reponse claire, precise, concise et pedagogique.
- Niveau L2, avec exemples concrets si utile.

Consignes LaTeX (obligatoires):
- Toute formule mathematique doit etre ecrite en LaTeX.
- Variable, parametre ou notation mathematique (x, y, alpha, beta, sigma, E(X), Var(X), etc.) doit etre en LaTeX.
- Utilise uniquement $...$ (inline) et $$...$$ (bloc) pour les maths.
- N'utilise jamais les delimiters \\( \\) ou \\[ \\].
- N'ecris pas de formules mathematiques en texte brut.`;

        if (context.courseId || context.chapterId || context.pageId) {
            systemContent += '\n\nContexte:';
            if (context.courseId) systemContent += ` ${context.courseId}`;
            if (context.chapterId) systemContent += ` - ${context.chapterId}`;
            if (context.pageId) systemContent += ` - ${context.pageId}`;
        }

        if (context.pageContent) {
            const limitedContent = context.pageContent.length > 3000
                ? context.pageContent.substring(0, 3000) + '\n[... tronque ...]'
                : context.pageContent;

            systemContent += `\n\nContenu cours:\n${limitedContent}`;
        }

        messages.push({ role: 'system', content: systemContent });

        if (conversationHistory && conversationHistory.length > 0) {
            console.log(`[AI] Adding ${conversationHistory.length} messages from history`);
            conversationHistory.forEach((msg) => {
                messages.push({
                    role: msg.role,
                    content: msg.content
                });
            });
        }

        messages.push({ role: 'user', content: question });

        return messages;
    }

    /**
     * Normalize math delimiters to frontend-compatible format.
     */
    normalizeMathFormatting(content) {
        if (!content) return content;

        let normalized = content;

        // Convert fenced latex blocks to $$...$$ blocks
        normalized = normalized.replace(/```latex\s*([\s\S]*?)```/gi, (_, latex) => {
            const cleanLatex = String(latex).trim();
            return `\n$$\n${cleanLatex}\n$$\n`;
        });

        // Convert \[ ... \] to $$ ... $$
        normalized = normalized.replace(/\\\[([\s\S]*?)\\\]/g, (_, latex) => {
            const cleanLatex = String(latex).trim();
            return `\n$$\n${cleanLatex}\n$$\n`;
        });

        // Convert \( ... \) to $ ... $
        normalized = normalized.replace(/\\\((.*?)\\\)/g, (_, latex) => {
            const cleanLatex = String(latex).trim();
            return `$${cleanLatex}$`;
        });

        return normalized;
    }

    /**
     * Basic structural validation for math delimiters.
     * Throws if content has malformed math delimiters.
     */
    validateMathFormatting(content) {
        if (!content) return;

        const unescapedDoubleDollarCount = (content.match(/(?<!\\)\$\$/g) || []).length;
        if (unescapedDoubleDollarCount % 2 !== 0) {
            throw new Error('Invalid math formatting: unmatched $$ delimiter.');
        }

        const withoutBlocks = content.replace(/(?<!\\)\$\$[\s\S]*?(?<!\\)\$\$/g, '');
        const unescapedSingleDollarCount = (withoutBlocks.match(/(?<!\\)\$/g) || []).length;
        if (unescapedSingleDollarCount % 2 !== 0) {
            throw new Error('Invalid math formatting: unmatched $ delimiter.');
        }

        const openInlineParen = (content.match(/\\\(/g) || []).length;
        const closeInlineParen = (content.match(/\\\)/g) || []).length;
        if (openInlineParen !== closeInlineParen) {
            throw new Error('Invalid math formatting: unmatched \\( or \\) delimiter.');
        }

        const openDisplayBracket = (content.match(/\\\[/g) || []).length;
        const closeDisplayBracket = (content.match(/\\\]/g) || []).length;
        if (openDisplayBracket !== closeDisplayBracket) {
            throw new Error('Invalid math formatting: unmatched \\[ or \\] delimiter.');
        }
    }

    /**
     * Get provider statistics (for admin dashboard)
     */
    async getProviderStats() {
        const stats = {};

        for (const [name, provider] of Object.entries(this.providers)) {
            const models = provider.getAvailableModels();
            const modelStats = [];

            for (const model of models) {
                const health = this.quotaService.getProviderHealth(name, model.id);
                const quota = this.quotaService.getProviderQuotaStatus(name, model.id);

                modelStats.push({
                    model: model.id,
                    displayName: model.displayName,
                    health: {
                        status: health.status,
                        circuitBreaker: health.circuit_breaker_state,
                        successCount: health.success_count,
                        failureCount: health.failure_count,
                        successRate: this.calculateSuccessRate(health)
                    },
                    quota: {
                        requestsRemaining: quota.requests_remaining,
                        tokensRemaining: quota.tokens_remaining,
                        requestsCount: quota.requests_count,
                        tokensUsed: quota.tokens_used
                    }
                });
            }

            stats[name] = {
                provider: name,
                displayName: PROVIDER_CONFIG[name].displayName,
                priority: PROVIDER_CONFIG[name].priority,
                models: modelStats
            };
        }

        return stats;
    }
}

// Singleton instance
export const aiRouter = new AIRouter();
export default aiRouter;
