#!/usr/bin/env node

/**
 * Script de génération batch TTS pour tous les cours
 * Usage: npm run generate-tts
 *
 * Génère des fichiers audio + timestamps pour tous les fichiers Markdown dans /home-site/src/content/
 */

import dotenv from 'dotenv';
import { AzureTTSService } from '../tts/azure-tts-service.js';
import { TTSCache } from '../tts/tts-cache.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import pLimit from 'p-limit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Configuration
const CONTENT_DIR = path.resolve(__dirname, '../../home-site/src/content');
const OUTPUT_DIR = path.resolve(__dirname, '../../home-site/public/audio/generated');
const AZURE_SPEECH_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_SPEECH_REGION = process.env.AZURE_SPEECH_REGION || 'francecentral';

// Paramètres de segmentation
const MAX_CHARS_PER_SEGMENT = 2000; // 2000 chars = ~30-45 secondes d'audio
const DELAY_BETWEEN_REQUESTS = 500; // 500ms entre requêtes pour respecter les limites

/**
 * Parse un fichier Markdown en segments
 */
async function parseMarkdownToSegments(filePath, courseId, chapterId) {
    const content = await fs.readFile(filePath, 'utf-8');

    // Enlever les balises spéciales (aside, graphiques, etc.)
    let cleanContent = content
        .replace(/<aside>[\s\S]*?<\/aside>/g, '') // Enlever les asides
        .replace(/\*\*\[GRAPHIQUE.*?\]\*\*/g, '') // Enlever les marqueurs de graphiques
        .replace(/```[\s\S]*?```/g, '') // Enlever les blocs de code
        .replace(/\$\$[\s\S]*?\$\$/g, '') // Enlever les équations en bloc
        .replace(/\$[^\$]+\$/g, '') // Enlever les équations inline
        .replace(/#{1,6}\s/g, '') // Enlever les # de titres
        .replace(/\*\*/g, '') // Enlever le gras
        .replace(/\*/g, '') // Enlever l'italique
        .replace(/>/g, '') // Enlever les blockquotes
        .replace(/^\s*[-•]\s/gm, '') // Enlever les bullets
        .trim();

    // Diviser en paragraphes
    const paragraphs = cleanContent
        .split(/\n\n+/)
        .map(p => p.replace(/\n/g, ' ').trim())
        .filter(p => p.length > 50); // Au moins 50 caractères

    // Regrouper les paragraphes en segments de taille optimale
    const segments = [];
    let currentSegment = '';
    let segmentIndex = 0;

    for (const paragraph of paragraphs) {
        if (currentSegment.length + paragraph.length > MAX_CHARS_PER_SEGMENT && currentSegment.length > 0) {
            // Segment complet, on le stocke
            segments.push({
                segmentId: `${courseId}-${chapterId}-seg-${String(segmentIndex + 1).padStart(3, '0')}`,
                text: currentSegment.trim(),
                courseId,
                chapterId,
            });
            segmentIndex++;
            currentSegment = paragraph;
        } else {
            currentSegment += (currentSegment ? ' ' : '') + paragraph;
        }
    }

    // Ajouter le dernier segment
    if (currentSegment.trim().length > 0) {
        segments.push({
            segmentId: `${courseId}-${chapterId}-seg-${String(segmentIndex + 1).padStart(3, '0')}`,
            text: currentSegment.trim(),
            courseId,
            chapterId,
        });
    }

    return segments;
}

/**
 * Récupère tous les fichiers Markdown dans le dossier content
 */
async function getAllMarkdownFiles(contentDir) {
    const courses = await fs.readdir(contentDir);
    const files = [];

    for (const course of courses) {
        const coursePath = path.join(contentDir, course);
        const stat = await fs.stat(coursePath);

        if (stat.isDirectory()) {
            const courseFiles = await fs.readdir(coursePath);

            for (const file of courseFiles) {
                if (file.endsWith('.md') || file.endsWith('.MD')) {
                    files.push({
                        courseId: course,
                        chapterId: path.basename(file, path.extname(file)),
                        filePath: path.join(coursePath, file),
                    });
                }
            }
        }
    }

    return files;
}

/**
 * Génère l'audio pour un segment
 */
async function generateSegmentAudio(ttsService, ttsCache, segment, outputDir) {
    const textHash = TTSCache.hashText(segment.text);
    const segmentOutputDir = path.join(outputDir, segment.courseId, segment.chapterId);
    const metadataPath = path.join(segmentOutputDir, `${segment.segmentId}.json`);

    // Vérifier le cache
    if (await ttsCache.has(segment.segmentId, textHash)) {
        console.log(`⚡ [Cache] Skipping ${segment.segmentId} (already generated)`);
        return await ttsCache.get(segment.segmentId);
    }

    // Génération
    console.log(`🎤 [TTS] Generating ${segment.segmentId}...`);

    const result = await ttsService.generateSegment(
        segment.text,
        segment.segmentId,
        segmentOutputDir
    );

    // Mise en cache
    const audioPath = path.join(segmentOutputDir, `${segment.segmentId}.mp3`);
    await ttsCache.set(
        segment.segmentId,
        textHash,
        audioPath,
        metadataPath,
        segment.text.length
    );

    return result;
}

/**
 * Main
 */
async function main() {
    console.log(`
╔═══════════════════════════════════════╗
║   🎤 Génération Audio TTS Batch      ║
╚═══════════════════════════════════════╝
`);

    // Vérifications
    if (!AZURE_SPEECH_KEY) {
        console.error('❌ AZURE_SPEECH_KEY not configured in .env');
        process.exit(1);
    }

    console.log(`📁 Content directory: ${CONTENT_DIR}`);
    console.log(`📁 Output directory:  ${OUTPUT_DIR}`);
    console.log(`🌍 Azure region:      ${AZURE_SPEECH_REGION}\n`);

    // Initialisation des services
    console.log('🚀 Initializing services...');
    const ttsService = new AzureTTSService(AZURE_SPEECH_KEY, AZURE_SPEECH_REGION);
    const ttsCache = new TTSCache(OUTPUT_DIR);
    await ttsCache.initialize();

    // Récupération des fichiers Markdown
    console.log('📚 Scanning markdown files...');
    const markdownFiles = await getAllMarkdownFiles(CONTENT_DIR);

    console.log(`✅ Found ${markdownFiles.length} markdown files\n`);

    if (markdownFiles.length === 0) {
        console.log('⚠️  No markdown files found. Exiting.');
        return;
    }

    // Parsing des segments
    console.log('📝 Parsing segments...');
    const allSegments = [];

    for (const file of markdownFiles) {
        const segments = await parseMarkdownToSegments(
            file.filePath,
            file.courseId,
            file.chapterId
        );

        allSegments.push(...segments);
        console.log(`   ${file.courseId}/${file.chapterId}: ${segments.length} segments`);
    }

    const totalChars = allSegments.reduce((sum, seg) => sum + seg.text.length, 0);

    console.log(`\n✅ Total segments: ${allSegments.length}`);
    console.log(`📊 Total characters: ${totalChars.toLocaleString()}`);
    console.log(`💰 Estimated cost: $${((totalChars / 1_000_000) * 16).toFixed(2)}\n`);

    // Confirmation
    console.log('⚠️  Ready to generate. This will consume Azure Speech credits.');
    console.log('   Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');

    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('🎬 Starting generation...\n');

    // Rate limiting : 2 requêtes concurrentes max
    const limit = pLimit(2);
    const startTime = Date.now();

    const results = await Promise.allSettled(
        allSegments.map((segment, index) =>
            limit(async () => {
                try {
                    await generateSegmentAudio(ttsService, ttsCache, segment, OUTPUT_DIR);

                    // Délai entre requêtes
                    if (index < allSegments.length - 1) {
                        await new Promise(r => setTimeout(r, DELAY_BETWEEN_REQUESTS));
                    }
                } catch (error) {
                    console.error(`❌ Error generating ${segment.segmentId}:`, error.message);
                    throw error;
                }
            })
        )
    );

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    const succeeded = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    // Rapport final
    console.log(`
╔═══════════════════════════════════════╗
║   📊 Génération Terminée             ║
╚═══════════════════════════════════════╝

✅ Succeeded: ${succeeded}/${allSegments.length}
❌ Failed:    ${failed}/${allSegments.length}
⏱️  Duration:  ${duration}s

💰 Estimated cost: $${ttsService.getEstimatedCost().toFixed(2)}
📊 Total chars:    ${ttsService.getStats().totalCharsGenerated.toLocaleString()}

📦 Cache stats:
   Segments: ${ttsCache.getStats().totalSegments}
   Total chars: ${ttsCache.getStats().totalCharacters.toLocaleString()}

🎉 Done! Audio files available in: ${OUTPUT_DIR}
`);

    // Générer un manifest global
    await generateManifest(ttsCache, OUTPUT_DIR);

    if (failed > 0) {
        console.error('\n⚠️  Some segments failed to generate. Check logs above for details.');
        process.exit(1);
    }
}

/**
 * Génère un fichier manifest.json avec tous les segments
 */
async function generateManifest(ttsCache, outputDir) {
    const cacheStats = ttsCache.getStats();
    const entries = Array.from(ttsCache.index.values());

    // Grouper par cours et chapitre
    const manifest = {
        generatedAt: new Date().toISOString(),
        totalSegments: cacheStats.totalSegments,
        totalCharacters: cacheStats.totalCharacters,
        courses: {},
    };

    for (const entry of entries) {
        const [courseId, chapterId] = entry.segmentId.split('-').slice(0, 2);

        if (!manifest.courses[courseId]) {
            manifest.courses[courseId] = {};
        }

        if (!manifest.courses[courseId][chapterId]) {
            manifest.courses[courseId][chapterId] = {
                segments: [],
            };
        }

        manifest.courses[courseId][chapterId].segments.push({
            segmentId: entry.segmentId,
            audioUrl: `/audio/generated/${courseId}/${chapterId}/${entry.segmentId}.mp3`,
            metadataUrl: `/audio/generated/${courseId}/${chapterId}/${entry.segmentId}.json`,
            charactersUsed: entry.charactersUsed,
            generatedAt: entry.generatedAt,
        });
    }

    const manifestPath = path.join(outputDir, 'manifest.json');
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

    console.log(`📄 Manifest generated: ${manifestPath}`);
}

// Lancer le script
main().catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});
