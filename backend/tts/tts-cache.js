import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

/**
 * @typedef {Object} CacheEntry
 * @property {string} segmentId
 * @property {string} textHash
 * @property {string} audioPath
 * @property {string} metadataPath
 * @property {number} charactersUsed
 * @property {string} generatedAt
 */

/**
 * Service de cache pour les fichiers audio générés
 * Évite de régénérer des segments identiques
 */
export class TTSCache {
    /**
     * @param {string} cacheBaseDir - Dossier racine du cache
     */
    constructor(cacheBaseDir) {
        this.cacheBaseDir = cacheBaseDir;
        this.cacheIndexPath = path.join(cacheBaseDir, 'cache-index.json');
        /** @type {Map<string, CacheEntry>} */
        this.index = new Map();
    }

    /**
     * Initialise le cache en chargeant l'index existant
     */
    async initialize() {
        try {
            await fs.mkdir(this.cacheBaseDir, { recursive: true });

            const indexContent = await fs.readFile(this.cacheIndexPath, 'utf-8');
            const indexData = JSON.parse(indexContent);

            for (const entry of indexData.entries) {
                this.index.set(entry.segmentId, entry);
            }

            console.log(`📦 [Cache] Loaded ${this.index.size} cached segments`);
        } catch (error) {
            if (error.code !== 'ENOENT') {
                console.warn(`⚠️  [Cache] Error loading index: ${error.message}`);
            }
            console.log('📦 [Cache] Starting with empty cache');
        }
    }

    /**
     * Vérifie si un segment est en cache avec le même hash
     *
     * @param {string} segmentId - Identifiant du segment
     * @param {string} textHash - Hash SHA-256 du texte
     * @returns {Promise<boolean>}
     */
    async has(segmentId, textHash) {
        const entry = this.index.get(segmentId);

        if (!entry || entry.textHash !== textHash) {
            return false;
        }

        // Vérifier que les fichiers existent toujours
        try {
            await fs.access(entry.audioPath);
            await fs.access(entry.metadataPath);
            return true;
        } catch {
            // Fichiers manquants, supprimer de l'index
            this.index.delete(segmentId);
            await this.saveIndex();
            return false;
        }
    }

    /**
     * Récupère les métadonnées d'un segment en cache
     *
     * @param {string} segmentId
     * @returns {Promise<Object|null>}
     */
    async get(segmentId) {
        const entry = this.index.get(segmentId);

        if (!entry) {
            return null;
        }

        try {
            const content = await fs.readFile(entry.metadataPath, 'utf-8');
            return JSON.parse(content);
        } catch (error) {
            console.warn(`⚠️  [Cache] Error reading ${segmentId}: ${error.message}`);
            this.index.delete(segmentId);
            await this.saveIndex();
            return null;
        }
    }

    /**
     * Ajoute un segment au cache
     *
     * @param {string} segmentId
     * @param {string} textHash
     * @param {string} audioPath
     * @param {string} metadataPath
     * @param {number} charactersUsed
     */
    async set(segmentId, textHash, audioPath, metadataPath, charactersUsed) {
        const entry = {
            segmentId,
            textHash,
            audioPath,
            metadataPath,
            charactersUsed,
            generatedAt: new Date().toISOString(),
        };

        this.index.set(segmentId, entry);
        await this.saveIndex();
    }

    /**
     * Sauvegarde l'index du cache
     */
    async saveIndex() {
        const indexData = {
            version: '1.0',
            updatedAt: new Date().toISOString(),
            entries: Array.from(this.index.values()),
        };

        await fs.writeFile(
            this.cacheIndexPath,
            JSON.stringify(indexData, null, 2)
        );
    }

    /**
     * Supprime un segment du cache
     *
     * @param {string} segmentId
     */
    async delete(segmentId) {
        const entry = this.index.get(segmentId);

        if (entry) {
            try {
                await fs.unlink(entry.audioPath);
                await fs.unlink(entry.metadataPath);
            } catch (error) {
                console.warn(`⚠️  [Cache] Error deleting files: ${error.message}`);
            }

            this.index.delete(segmentId);
            await this.saveIndex();
        }
    }

    /**
     * Nettoie les entrées de cache dont les fichiers sont manquants
     */
    async clean() {
        const toDelete = [];

        for (const [segmentId, entry] of this.index.entries()) {
            try {
                await fs.access(entry.audioPath);
                await fs.access(entry.metadataPath);
            } catch {
                toDelete.push(segmentId);
            }
        }

        for (const segmentId of toDelete) {
            this.index.delete(segmentId);
        }

        if (toDelete.length > 0) {
            await this.saveIndex();
            console.log(`🧹 [Cache] Cleaned ${toDelete.length} invalid entries`);
        }
    }

    /**
     * Calcule le hash d'un texte
     *
     * @param {string} text
     * @returns {string} Hash SHA-256
     */
    static hashText(text) {
        return crypto.createHash('sha256').update(text).digest('hex');
    }

    /**
     * Statistiques du cache
     *
     * @returns {Object}
     */
    getStats() {
        const entries = Array.from(this.index.values());

        return {
            totalSegments: this.index.size,
            totalCharacters: entries.reduce((sum, e) => sum + e.charactersUsed, 0),
            oldestEntry: entries.length > 0
                ? entries.reduce((oldest, e) =>
                    e.generatedAt < oldest.generatedAt ? e : oldest
                ).generatedAt
                : null,
            newestEntry: entries.length > 0
                ? entries.reduce((newest, e) =>
                    e.generatedAt > newest.generatedAt ? e : newest
                ).generatedAt
                : null,
        };
    }

    /**
     * Vide complètement le cache
     */
    async clear() {
        for (const segmentId of this.index.keys()) {
            await this.delete(segmentId);
        }

        this.index.clear();
        await this.saveIndex();

        console.log('🗑️  [Cache] Cleared completely');
    }
}
