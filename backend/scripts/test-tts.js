#!/usr/bin/env node

/**
 * Script de test rapide pour vérifier la configuration Azure TTS
 * Usage: node scripts/test-tts.js
 */

import dotenv from 'dotenv';
import { AzureTTSService } from '../tts/azure-tts-service.js';
import { TTSCache } from '../tts/tts-cache.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const TEST_OUTPUT_DIR = path.resolve(__dirname, '../test-output');

async function main() {
  console.log(`
╔═══════════════════════════════════════╗
║   🧪 Test Azure TTS Configuration   ║
╚═══════════════════════════════════════╝
`);

  // 1. Vérifier les credentials
  console.log('1️⃣  Checking Azure credentials...');

  const speechKey = process.env.AZURE_SPEECH_KEY;
  const speechRegion = process.env.AZURE_SPEECH_REGION || 'francecentral';

  if (!speechKey) {
    console.error('❌ AZURE_SPEECH_KEY not found in .env');
    console.log('\n💡 Add this to your .env file:');
    console.log('   AZURE_SPEECH_KEY=your_key_here');
    console.log('   AZURE_SPEECH_REGION=francecentral');
    process.exit(1);
  }

  console.log(`   ✅ Key: ${speechKey.substring(0, 8)}...`);
  console.log(`   ✅ Region: ${speechRegion}`);

  // 2. Initialiser les services
  console.log('\n2️⃣  Initializing services...');

  let ttsService;
  let ttsCache;

  try {
    ttsService = new AzureTTSService(speechKey, speechRegion);
    ttsCache = new TTSCache(TEST_OUTPUT_DIR);
    await ttsCache.initialize();
    console.log('   ✅ Services initialized');
  } catch (error) {
    console.error('   ❌ Initialization failed:', error.message);
    process.exit(1);
  }

  // 3. Générer un segment de test
  console.log('\n3️⃣  Generating test audio...');

  const testText = `Bonjour, ceci est un test de la voix Vivienne Dragon HD Latest.
La qualité audio est exceptionnelle et les timestamps mot par mot fonctionnent parfaitement.
Ce système permettra aux étudiants d'écouter les cours tout en suivant le texte synchronisé.`;

  const segmentId = 'test-segment';

  console.log(`   Text: "${testText.substring(0, 50)}..."`);
  console.log(`   Length: ${testText.length} characters`);

  try {
    const result = await ttsService.generateSegment(
      testText,
      segmentId,
      TEST_OUTPUT_DIR
    );

    console.log('\n   ✅ Audio generated successfully!');
    console.log(`   📄 Audio file: ${TEST_OUTPUT_DIR}/${segmentId}.mp3`);
    console.log(`   📄 Metadata: ${TEST_OUTPUT_DIR}/${segmentId}.json`);
    console.log(`   🎤 Words detected: ${result.words.length}`);
    console.log(`   ⏱️  Duration: ${(result.totalDuration / 1000).toFixed(1)}s`);
    console.log(`   💰 Cost: $${ttsService.getEstimatedCost().toFixed(4)}`);

    // 4. Vérifier les timestamps
    console.log('\n4️⃣  Checking word boundaries...');

    if (result.words.length === 0) {
      console.warn('   ⚠️  No word boundaries detected!');
    } else {
      console.log(`   ✅ ${result.words.length} words with timestamps`);
      console.log('\n   First 5 words:');
      result.words.slice(0, 5).forEach((word, idx) => {
        console.log(
          `      ${idx + 1}. "${word.word}" @ ${word.audioOffset}ms (duration: ${word.duration}ms)`
        );
      });
    }

    // 5. Vérifier le cache
    console.log('\n5️⃣  Testing cache...');

    const textHash = TTSCache.hashText(testText);
    const isCached = await ttsCache.has(segmentId, textHash);

    if (isCached) {
      console.log('   ✅ Segment is cached');
    } else {
      console.log('   ⚠️  Segment not in cache (this is unusual)');
    }

    // 6. Vérifier les fichiers
    console.log('\n6️⃣  Verifying files...');

    const audioPath = path.join(TEST_OUTPUT_DIR, `${segmentId}.mp3`);
    const metadataPath = path.join(TEST_OUTPUT_DIR, `${segmentId}.json`);

    try {
      const audioStats = await fs.stat(audioPath);
      const metadataStats = await fs.stat(metadataPath);

      console.log(`   ✅ Audio file: ${(audioStats.size / 1024).toFixed(1)} KB`);
      console.log(
        `   ✅ Metadata file: ${(metadataStats.size / 1024).toFixed(1)} KB`
      );
    } catch (error) {
      console.error('   ❌ File verification failed:', error.message);
    }

    // 7. Afficher le JSON
    console.log('\n7️⃣  Metadata preview:');

    const metadataContent = await fs.readFile(metadataPath, 'utf-8');
    const metadata = JSON.parse(metadataContent);

    console.log('   {');
    console.log(`      "segmentId": "${metadata.segmentId}",`);
    console.log(`      "audioUrl": "${metadata.audioUrl}",`);
    console.log(`      "words": [${metadata.words.length} items],`);
    console.log(`      "totalDuration": ${metadata.totalDuration},`);
    console.log(`      "charactersUsed": ${metadata.charactersUsed}`);
    console.log('   }');

    // Résultat final
    console.log(`
╔═══════════════════════════════════════╗
║   ✅ Test PASSED!                    ║
╚═══════════════════════════════════════╝

🎉 Azure TTS is configured correctly!

📁 Test files created:
   ${audioPath}
   ${metadataPath}

🎧 Listen to the test audio:
   Open ${audioPath} in your media player

🚀 Next steps:
   1. Verify the audio quality
   2. Check the word boundaries in the JSON
   3. Run 'npm run generate-tts' to generate all courses

💰 Estimated cost for this test: $${ttsService.getEstimatedCost().toFixed(4)}
`);
  } catch (error) {
    console.error('\n❌ Test FAILED:', error.message);
    console.error('\nFull error:', error);

    console.log('\n🔍 Troubleshooting:');
    console.log('   1. Verify your Azure Speech key is correct');
    console.log('   2. Check that the region matches your resource');
    console.log('   3. Ensure you have sufficient quota/credits');
    console.log('   4. Check your internet connection');

    process.exit(1);
  }
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
