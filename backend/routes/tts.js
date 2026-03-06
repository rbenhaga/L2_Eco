import express from 'express';
import { requireAuth } from '../ai/middleware/auth.js';
import { AzureTTSService } from '../tts/azure-tts-service.js';
import { TTSCache } from '../tts/tts-cache.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configuration
const AZURE_SPEECH_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_SPEECH_REGION = process.env.AZURE_SPEECH_REGION || 'francecentral';
const AUDIO_OUTPUT_DIR = path.resolve(__dirname, '../../home-site/public/audio/generated');

// Initialisation des services
let ttsService = null;
let ttsCache = null;

// Initialiser les services au démarrage
async function initializeTTSServices() {
    if (!AZURE_SPEECH_KEY) {
        console.warn('⚠️  [TTS] Azure Speech credentials not configured');
        return;
    }

    try {
        ttsService = new AzureTTSService(AZURE_SPEECH_KEY, AZURE_SPEECH_REGION);
        ttsCache = new TTSCache(AUDIO_OUTPUT_DIR);
        await ttsCache.initialize();
        console.log('✅ [TTS] Services initialized');
    } catch (error) {
        console.error('❌ [TTS] Initialization error:', error.message);
    }
}

// Initialiser au chargement du module
initializeTTSServices();

/**
 * POST /api/tts/generate
 * Génère un fichier audio avec word boundaries pour un segment de cours
 *
 * Body:
 * {
 *   "text": "Texte à synthétiser",
 *   "segmentId": "macro-ch1-intro",
 *   "courseId": "macro",
 *   "chapterId": "ch1"
 * }
 */
router.post('/tts/generate', requireAuth, async (req, res) => {
    const startTime = Date.now();

    try {
        // Vérification des services
        if (!ttsService || !ttsCache) {
            return res.status(503).json({
                error: 'TTS service not available',
                message: 'Azure Speech credentials not configured',
            });
        }

        // Validation
        const { text, segmentId, courseId, chapterId } = req.body;

        if (!text || typeof text !== 'string') {
            return res.status(400).json({
                error: 'Invalid request',
                message: 'Text is required and must be a string',
            });
        }

        if (!segmentId || !courseId) {
            return res.status(400).json({
                error: 'Invalid request',
                message: 'segmentId and courseId are required',
            });
        }

        if (text.length > 10000) {
            return res.status(400).json({
                error: 'Text too long',
                message: 'Maximum 10,000 characters per segment',
            });
        }

        // Chemin de sortie
        const outputDir = path.join(AUDIO_OUTPUT_DIR, courseId, chapterId || 'default');
        const textHash = TTSCache.hashText(text);

        console.log(`🎤 [TTS] Request for ${segmentId} (${text.length} chars)`);

        // Vérifier le cache
        if (await ttsCache.has(segmentId, textHash)) {
            const cached = await ttsCache.get(segmentId);

            if (cached) {
                const responseTime = Date.now() - startTime;
                console.log(`⚡ [TTS] Cache hit for ${segmentId}`);

                return res.json({
                    success: true,
                    source: 'cache',
                    data: cached,
                    responseTime,
                });
            }
        }

        // Génération
        const result = await ttsService.generateSegment(text, segmentId, outputDir);

        // Mise en cache
        const audioPath = path.join(outputDir, `${segmentId}.mp3`);
        const metadataPath = path.join(outputDir, `${segmentId}.json`);

        await ttsCache.set(segmentId, textHash, audioPath, metadataPath, text.length);

        const responseTime = Date.now() - startTime;

        console.log(`✅ [TTS] Generated ${segmentId} in ${responseTime}ms`);

        res.json({
            success: true,
            source: 'generated',
            data: result,
            responseTime,
            stats: ttsService.getStats(),
        });

    } catch (error) {
        console.error('❌ [TTS] Generation error:', error);

        res.status(500).json({
            error: 'Generation failed',
            message: error.message,
        });
    }
});

/**
 * GET /api/tts/metadata/:segmentId
 * Récupère les métadonnées d'un segment (timestamps)
 */
router.get('/tts/metadata/:segmentId', requireAuth, async (req, res) => {
    try {
        if (!ttsCache) {
            return res.status(503).json({
                error: 'TTS service not available',
            });
        }

        const { segmentId } = req.params;
        const metadata = await ttsCache.get(segmentId);

        if (!metadata) {
            return res.status(404).json({
                error: 'Segment not found',
                message: `No metadata found for segment: ${segmentId}`,
            });
        }

        res.json({
            success: true,
            data: metadata,
        });

    } catch (error) {
        console.error('❌ [TTS] Metadata retrieval error:', error);

        res.status(500).json({
            error: 'Failed to retrieve metadata',
            message: error.message,
        });
    }
});

/**
 * GET /api/tts/stats
 * Statistiques du service TTS
 */
router.get('/tts/stats', requireAuth, async (req, res) => {
    try {
        if (!ttsService || !ttsCache) {
            return res.status(503).json({
                error: 'TTS service not available',
            });
        }

        const serviceStats = ttsService.getStats();
        const cacheStats = ttsCache.getStats();

        res.json({
            success: true,
            generation: serviceStats,
            cache: cacheStats,
        });

    } catch (error) {
        console.error('❌ [TTS] Stats error:', error);

        res.status(500).json({
            error: 'Failed to retrieve stats',
            message: error.message,
        });
    }
});

/**
 * POST /api/tts/cache/clean
 * Nettoie le cache (entrées orphelines)
 */
router.post('/tts/cache/clean', requireAuth, async (req, res) => {
    try {
        if (!ttsCache) {
            return res.status(503).json({
                error: 'TTS service not available',
            });
        }

        await ttsCache.clean();

        res.json({
            success: true,
            message: 'Cache cleaned successfully',
        });

    } catch (error) {
        console.error('❌ [TTS] Cache clean error:', error);

        res.status(500).json({
            error: 'Failed to clean cache',
            message: error.message,
        });
    }
});

/**
 * DELETE /api/tts/segment/:segmentId
 * Supprime un segment du cache
 */
router.delete('/tts/segment/:segmentId', requireAuth, async (req, res) => {
    try {
        if (!ttsCache) {
            return res.status(503).json({
                error: 'TTS service not available',
            });
        }

        const { segmentId } = req.params;
        await ttsCache.delete(segmentId);

        res.json({
            success: true,
            message: `Segment ${segmentId} deleted`,
        });

    } catch (error) {
        console.error('❌ [TTS] Delete error:', error);

        res.status(500).json({
            error: 'Failed to delete segment',
            message: error.message,
        });
    }
});

export default router;
