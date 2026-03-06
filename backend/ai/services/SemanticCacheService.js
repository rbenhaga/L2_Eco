/**
 * SemanticCacheService
 *
 * Wrapper around the existing semantic cache system (AI Cours/).
 * Adapts the cache to work with the Express backend.
 *
 * Reuses:
 * - CloudflareEmbeddingProvider (embeddings)
 * - UpstashVectorStore (vector DB)
 * - SemanticCache (core caching logic)
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Dynamic import wrapper for ES modules
 * Uses pathToFileURL for Windows compatibility
 */
async function loadCacheModules() {
    const { pathToFileURL } = await import('url');
    const aiCoursPath = join(__dirname, '../../../AI Cours');

    try {
        // Convert paths to file:// URLs for Windows compatibility
        const embeddingProviderUrl = pathToFileURL(join(aiCoursPath, 'embedding-provider.js')).href;
        const vectorStoreUrl = pathToFileURL(join(aiCoursPath, 'upstash-vector-store-final.js')).href;
        const semanticCacheUrl = pathToFileURL(join(aiCoursPath, 'semantic-cache.js')).href;

        // Import existing cache modules
        const { CloudflareEmbeddingProvider } = await import(embeddingProviderUrl);
        const { UpstashVectorStore } = await import(vectorStoreUrl);
        const { SemanticCache } = await import(semanticCacheUrl);

        return { CloudflareEmbeddingProvider, UpstashVectorStore, SemanticCache };
    } catch (error) {
        console.error('❌ Failed to load cache modules:', error.message);
        // Return null instead of throwing - allows graceful degradation
        return null;
    }
}

export class SemanticCacheService {
    constructor() {
        this.cache = null;
        this.initialized = false;
        this.initPromise = null;
    }

    /**
     * Initialize the semantic cache
     * Lazy initialization: only when first needed
     */
    async initialize() {
        if (this.initialized) return;

        if (this.initPromise) {
            // Already initializing, wait for it
            return this.initPromise;
        }

        this.initPromise = (async () => {
            try {
                console.log('🔧 Initializing semantic cache...');

                // Load cache modules (may return null if not available)
                const modules = await loadCacheModules();
                
                if (!modules) {
                    console.warn('⚠️ Semantic cache modules not available - cache disabled');
                    this.initialized = true;
                    this.cache = null;
                    return;
                }

                const { CloudflareEmbeddingProvider, UpstashVectorStore, SemanticCache } = modules;

                // Check required env vars
                if (!process.env.CLOUDFLARE_ACCOUNT_ID || !process.env.CLOUDFLARE_API_TOKEN ||
                    !process.env.UPSTASH_VECTOR_URL || !process.env.UPSTASH_VECTOR_TOKEN) {
                    console.warn('⚠️ Missing cache env vars - semantic cache disabled');
                    this.initialized = true;
                    this.cache = null;
                    return;
                }

                // Initialize embedding provider
                const embeddingProvider = new CloudflareEmbeddingProvider({
                    accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
                    apiToken: process.env.CLOUDFLARE_API_TOKEN
                });

                // Initialize vector store
                const vectorStore = new UpstashVectorStore({
                    url: process.env.UPSTASH_VECTOR_URL,
                    token: process.env.UPSTASH_VECTOR_TOKEN
                });

                // Initialize semantic cache
                this.cache = new SemanticCache({
                    embeddingProvider,
                    vectorStore,
                    minSimilarity: parseFloat(process.env.AI_CACHE_MIN_SIMILARITY || '0.88'),
                    maxResults: 3
                });

                this.initialized = true;
                console.log('✅ Semantic cache initialized');
            } catch (error) {
                console.error('❌ Failed to initialize semantic cache:', error.message);
                // Mark as initialized but without cache - graceful degradation
                this.initialized = true;
                this.cache = null;
            }
        })();

        return this.initPromise;
    }

    /**
     * Check cache for a similar question
     *
     * @param {string} question - The question to search for
     * @param {object} context - Context (courseId, chapterId, pageId)
     * @returns {Promise<object>} { useCache: boolean, entry?: object, similarity?: number }
     */
    async checkCache(question, context = {}) {
        await this.initialize();

        // If cache not available, return miss
        if (!this.cache) {
            return { useCache: false };
        }

        try {
            // Use the correct API: cache.get()
            const cacheDecision = await this.cache.get(question, context);

            if (cacheDecision.useCache && cacheDecision.entry) {
                console.log(`💾 Cache HIT! Similarity: ${cacheDecision.similarityScore?.toFixed(3) || 'N/A'}`);

                return {
                    useCache: true,
                    entry: cacheDecision.entry,
                    similarity: cacheDecision.similarityScore,
                    cacheId: cacheDecision.entry.id
                };
            }

            console.log('🔍 Cache MISS');
            return { useCache: false };

        } catch (error) {
            console.error('⚠️ Cache check failed:', error.message);
            // Fail gracefully: proceed without cache
            return { useCache: false, error: error.message };
        }
    }

    /**
     * Store a Q&A pair in the cache
     *
     * @param {string} question - The question
     * @param {string} answer - The answer
     * @param {object} context - Context (courseId, chapterId, pageId)
     * @param {object} metadata - Additional metadata (provider, model, tokensUsed)
     * @returns {Promise<string>} Cache entry ID
     */
    async storeInCache(question, answer, context = {}, metadata = {}) {
        await this.initialize();

        // If cache not available, skip
        if (!this.cache) {
            return null;
        }

        try {
            const entry = {
                question,
                answer,
                context,
                metadata: {
                    ...metadata,
                    timestamp: Date.now(),
                    source: 'llm'
                }
            };

            const entryId = await this.cache.store(entry);
            console.log(`💾 Stored in cache: ${entryId}`);

            return entryId;
        } catch (error) {
            console.error('⚠️ Failed to store in cache:', error.message);
            // Fail gracefully: don't block the response
            return null;
        }
    }

    /**
     * Update cache entry with feedback
     *
     * @param {string} cacheId - Cache entry ID
     * @param {boolean} isPositive - True for positive, false for negative
     */
    async submitFeedback(cacheId, isPositive) {
        await this.initialize();

        // If cache not available, skip
        if (!this.cache) {
            return;
        }

        try {
            await this.cache.updateFeedback(cacheId, {
                isPositive,
                timestamp: Date.now()
            });

            console.log(`👍 Feedback recorded for ${cacheId}: ${isPositive ? 'positive' : 'negative'}`);
        } catch (error) {
            console.error('⚠️ Failed to submit feedback:', error.message);
        }
    }

    /**
     * Get cache metrics
     */
    async getMetrics() {
        await this.initialize();

        // If cache not available, return empty metrics
        if (!this.cache) {
            return {
                totalEntries: 0,
                hitRate: 0,
                avgSimilarity: 0,
                available: false
            };
        }

        try {
            const metrics = await this.cache.getMetrics();
            return {
                totalEntries: metrics.totalEntries || 0,
                hitRate: metrics.hitRate || 0,
                avgSimilarity: metrics.avgSimilarity || 0,
                available: true,
                lastUpdated: Date.now()
            };
        } catch (error) {
            console.error('⚠️ Failed to get cache metrics:', error.message);
            return {
                totalEntries: 0,
                hitRate: 0,
                avgSimilarity: 0,
                available: false,
                error: error.message
            };
        }
    }

    /**
     * Check if cache is available
     */
    async isAvailable() {
        try {
            await this.initialize();
            return this.initialized;
        } catch (error) {
            return false;
        }
    }
}

// Singleton instance
export const semanticCacheService = new SemanticCacheService();
export default semanticCacheService;
