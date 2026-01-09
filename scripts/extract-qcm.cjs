// Script to extract QCM data from TSX files and convert to JSON format
const fs = require('fs');
const path = require('path');

function extractAndConvert(moduleName, inputPath, outputPath) {
    const content = fs.readFileSync(inputPath, 'utf-8');

    // Find the chapters array
    const chaptersMatch = content.match(/const chapters:\s*Chapter\[\]\s*=\s*(\[[\s\S]*?\]);[\s\r\n]*(?:type|export)/);

    if (!chaptersMatch) {
        console.log(`Could not find chapters in ${moduleName}`);
        return false;
    }

    // Extract the array content
    let chaptersStr = chaptersMatch[1];

    // Convert TypeScript object notation to JSON
    // Handle property names without quotes
    chaptersStr = chaptersStr.replace(/(\s)(\w+):/g, '$1"$2":');
    // Handle single quotes to double quotes (careful with escaped ones in strings)
    chaptersStr = chaptersStr.replace(/'/g, '"');
    // Handle trailing commas
    chaptersStr = chaptersStr.replace(/,(\s*[\]\}])/g, '$1');

    try {
        const chapters = eval('(' + chaptersStr + ')');

        // Convert to our QCMConfig format
        const totalQuestions = chapters.reduce((sum, ch) => sum + ch.questions.length, 0);

        const qcmConfig = {
            subject: getSubjectName(moduleName),
            subjectId: moduleName,
            description: `${totalQuestions} questions · tous les chapitres`,
            chapters: chapters.map(ch => ({
                id: ch.id,
                title: ch.title,
                subtitle: ch.subtitle,
                color: getColorHex(ch.color),
                questions: ch.questions.map((q, idx) => ({
                    id: `${ch.id}-${q.id || idx + 1}`,
                    question: q.question,
                    options: q.options,
                    correctIndex: q.correct,
                    explanation: q.explanation
                }))
            }))
        };

        fs.writeFileSync(outputPath, JSON.stringify(qcmConfig, null, 2));
        console.log(`✓ ${moduleName}: Extracted ${totalQuestions} questions from ${chapters.length} chapters`);
        return true;
    } catch (e) {
        console.log(`Error parsing ${moduleName}:`, e.message);
        return false;
    }
}

function getSubjectName(id) {
    const names = {
        micro: 'Microéconomie',
        stats: 'Statistiques',
        socio: 'Sociologie'
    };
    return names[id] || id;
}

function getColorHex(colorName) {
    const colors = {
        emerald: '#10b981',
        blue: '#3b82f6',
        purple: '#8b5cf6',
        amber: '#f59e0b',
        rose: '#f43f5e',
        cyan: '#06b6d4',
        teal: '#14b8a6',
        indigo: '#6366f1'
    };
    return colors[colorName] || '#3b82f6';
}

// Process modules
const base = './src/modules/s2';
const modules = ['micro', 'stats', 'socio'];

modules.forEach(mod => {
    const inputPath = path.join(base, mod, 'pages', 'QCM.tsx');
    const outputDir = path.join(base, mod, 'data');
    const outputPath = path.join(outputDir, 'qcm.json');

    // Create data directory if needed
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    if (fs.existsSync(inputPath)) {
        extractAndConvert(mod, inputPath, outputPath);
    } else {
        console.log(`File not found: ${inputPath}`);
    }
});

console.log('\nDone!');
