import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';

/**
 * @typedef {Object} WordBoundary
 * @property {string} word - Le mot prononcé
 * @property {number} audioOffset - Timestamp audio en millisecondes
 * @property {number} textOffset - Position dans le texte (caractères)
 * @property {number} duration - Durée du mot en millisecondes
 * @property {number} wordLength - Longueur du mot en caractères
 */

/**
 * @typedef {Object} SegmentOutput
 * @property {string} segmentId - Identifiant du segment
 * @property {string} text - Texte complet du segment
 * @property {string} textHash - Hash SHA-256 du texte (pour cache)
 * @property {string} audioUrl - URL relative du fichier audio
 * @property {WordBoundary[]} words - Timestamps mot par mot
 * @property {number} totalDuration - Durée totale en millisecondes
 * @property {number} charactersUsed - Nombre de caractères (pour coût)
 * @property {string} generatedAt - ISO timestamp de génération
 */

/**
 * Service de génération TTS avec Azure Speech SDK
 * Utilise la voix Vivienne Dragon HD Latest avec word boundaries
 */
export class AzureTTSService {
    /**
     * @param {string} speechKey - Clé Azure Speech API
     * @param {string} speechRegion - Région Azure (ex: 'francecentral')
     */
    constructor(speechKey, speechRegion) {
        if (!speechKey || !speechRegion) {
            throw new Error('Azure Speech credentials are required');
        }

        this.speechKey = speechKey;
        this.speechRegion = speechRegion;
        this.totalCharsGenerated = 0;
        this.generationCount = 0;
    }

    /**
     * Génère un fichier audio + métadonnées avec timestamps mot par mot
     *
     * @param {string} text - Texte à synthétiser
     * @param {string} segmentId - Identifiant unique du segment
     * @param {string} outputDir - Dossier de sortie
     * @returns {Promise<SegmentOutput>} Métadonnées complètes du segment
     */
    async generateSegment(text, segmentId, outputDir) {
        // Validation
        if (!text || text.trim().length === 0) {
            throw new Error('Text cannot be empty');
        }

        if (text.length > 10000) {
            throw new Error('Text too long (max 10,000 characters per segment)');
        }

        // Hash pour cache
        const textHash = crypto.createHash('sha256').update(text).digest('hex');
        const audioPath = path.join(outputDir, `${segmentId}.mp3`);
        const metadataPath = path.join(outputDir, `${segmentId}.json`);

        console.log(`🎤 [TTS] Generating: ${segmentId} (${text.length} chars)`);

        // Configuration Azure Speech
        const speechConfig = sdk.SpeechConfig.fromSubscription(
            this.speechKey,
            this.speechRegion
        );

        // ✅ Configure Vivienne Dragon HD Latest
        speechConfig.speechSynthesisVoiceName = 'fr-FR-Vivienne:DragonHDLatestNeural';

        // ✅ Haute qualité 48kHz 192kbps MP3
        speechConfig.speechSynthesisOutputFormat =
            sdk.SpeechSynthesisOutputFormat.Audio48Khz192KBitRateMonoMp3;

        // AudioConfig null = pas de lecture, juste génération
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, null);

        /** @type {WordBoundary[]} */
        const wordBoundaries = [];

        // ✅ Capture word boundaries en temps réel
        synthesizer.wordBoundary = (s, e) => {
            wordBoundaries.push({
                word: e.text,
                audioOffset: e.audioOffset / 10000, // ticks → ms (1 tick = 100ns)
                textOffset: e.textOffset,
                duration: e.duration ? e.duration.totalMilliseconds : 0,
                wordLength: e.wordLength,
            });
        };

        // Génération asynchrone
        const result = await new Promise((resolve, reject) => {
            synthesizer.speakTextAsync(
                text,
                (result) => {
                    synthesizer.close();
                    resolve(result);
                },
                (error) => {
                    synthesizer.close();
                    reject(new Error(`TTS synthesis failed: ${error}`));
                }
            );
        });

        // Vérification du résultat
        if (result.reason !== sdk.ResultReason.SynthesizingAudioCompleted) {
            throw new Error(`TTS failed: ${result.errorDetails || 'Unknown error'}`);
        }

        if (wordBoundaries.length === 0) {
            console.warn(`⚠️  No word boundaries received for segment ${segmentId}`);
        }

        // Création du dossier de sortie si nécessaire
        await fs.mkdir(outputDir, { recursive: true });

        // Sauvegarde de l'audio
        await fs.writeFile(audioPath, Buffer.from(result.audioData));

        // Métadonnées complètes
        const output = {
            segmentId,
            text,
            textHash,
            audioUrl: `/${segmentId}.mp3`,
            words: wordBoundaries,
            totalDuration: result.audioDuration / 10000, // ticks → ms
            charactersUsed: text.length,
            generatedAt: new Date().toISOString(),
        };

        // Sauvegarde des métadonnées
        await fs.writeFile(metadataPath, JSON.stringify(output, null, 2));

        // Statistiques
        this.totalCharsGenerated += text.length;
        this.generationCount++;

        console.log(`✅ [TTS] Generated: ${segmentId}`);
        console.log(`   Words: ${wordBoundaries.length}`);
        console.log(`   Duration: ${(output.totalDuration / 1000).toFixed(1)}s`);
        console.log(`   Total chars: ${this.totalCharsGenerated.toLocaleString()}`);

        return output;
    }

    /**
     * Vérifie si un segment est déjà en cache avec le même contenu
     *
     * @param {string} metadataPath - Chemin du fichier de métadonnées
     * @param {string} textHash - Hash du texte actuel
     * @returns {Promise<boolean>} true si le cache est valide
     */
    async isCached(metadataPath, textHash) {
        try {
            const content = await fs.readFile(metadataPath, 'utf-8');
            const cached = JSON.parse(content);
            return cached.textHash === textHash;
        } catch {
            return false;
        }
    }

    /**
     * Charge les métadonnées d'un segment depuis le cache
     *
     * @param {string} metadataPath - Chemin du fichier
     * @returns {Promise<SegmentOutput|null>} Métadonnées ou null si non trouvé
     */
    async loadCachedMetadata(metadataPath) {
        try {
            const content = await fs.readFile(metadataPath, 'utf-8');
            return JSON.parse(content);
        } catch {
            return null;
        }
    }

    /**
     * Estime le coût de génération basé sur le nombre de caractères
     *
     * @returns {number} Coût estimé en USD
     */
    getEstimatedCost() {
        // $16 par million de caractères pour Dragon HD
        return (this.totalCharsGenerated / 1_000_000) * 16;
    }

    /**
     * Statistiques de génération
     *
     * @returns {Object} Stats complètes
     */
    getStats() {
        return {
            totalCharsGenerated: this.totalCharsGenerated,
            generationCount: this.generationCount,
            estimatedCost: this.getEstimatedCost(),
            averageCharsPerSegment:
                this.generationCount > 0
                    ? Math.round(this.totalCharsGenerated / this.generationCount)
                    : 0,
        };
    }

    /**
     * Reset les statistiques
     */
    resetStats() {
        this.totalCharsGenerated = 0;
        this.generationCount = 0;
    }
}
