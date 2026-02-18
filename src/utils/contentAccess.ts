/**
 * Content Access Rules
 * 
 * Defines which content is available for free users vs premium users.
 * 
 * FREE content includes:
 * - Home pages (/, /macro, /micro, /stats, /socio)
 * - FIRST chapter of each subject:
 *   - /macro/chapitre-1 (first is chapter 1)
 *   - /micro/chapitre-0 (first is chapter 0)
 *   - /stats/chapitre-1 (first is chapter 1)
 *   - /socio/chapitre1 (first is chapter 1, no hyphen)
 * - Revision sheet for first chapter
 * - QCM page (first chapter questions only)
 * - Subscription page
 * - Login page
 * 
 * PREMIUM content includes:
 * - All other chapters
 * - Revision sheets for other chapters
 * - Exercices, Simulations
 */

/**
 * Map of subjects to their first (free) chapter patterns
 */
const FIRST_CHAPTERS: Record<string, RegExp> = {
    macro: /^\/(?:s3\/|s4\/)?macro\/chapitre-1$/,
    microS3: /^\/(?:s3\/)?micro\/chapitre-0$/,
    microS4: /^\/s4\/micro\/chapitre-1$/,
    stats: /^\/(?:s3\/|s4\/)?stats\/chapitre-1$/,
    socio: /^\/(?:s3\/)?socio\/chapitre1$/, // Note: no hyphen in socio URLs
    management: /^\/s4\/management\/chapitre-1$/,
};

/**
 * Check if a URL path represents free content
 */
export function isFreeContent(pathname: string): boolean {
    const path = pathname.toLowerCase();

    // Always free: home, login, pricing and subscription pages
    if (path === '/' || path === '/login' || path === '/pricing' || path === '/subscription') {
        return true;
    }

    // Subject home pages are free
    const subjectHomes = [
        '/macro', '/micro', '/stats', '/socio',
        '/s3/macro', '/s3/micro', '/s3/stats', '/s3/socio',
        '/s4/macro', '/s4/micro', '/s4/stats', '/s4/management',
    ];
    if (subjectHomes.includes(path)) {
        return true;
    }

    // Check if this is the first chapter of any subject
    for (const pattern of Object.values(FIRST_CHAPTERS)) {
        if (pattern.test(path)) {
            return true;
        }
    }

    // Free content patterns: first revision and first TD correction only
    const freePatterns = [
        /^\/(?:s3\/|s4\/)?macro\/revision-ch1$/,
        /^\/(?:s3\/)?micro\/revision-ch0$/,
        /^\/(?:s3\/|s4\/)?stats\/revision-ch1$/,
        /^\/(?:s3\/)?socio\/revision-ch1$/,
        /^\/(?:s3\/|s4\/)?management\/revision-ch1$/,
        /^\/(?:s3\/|s4\/)?[^/]+\/correction-td-1$/,
        /^\/(?:s3\/|s4\/)?[^/]+\/td-1$/,
        /^\/(?:s3\/|s4\/)?[^/]+\/qcm$/,
    ];

    for (const pattern of freePatterns) {
        if (pattern.test(path)) {
            return true;
        }
    }

    return false;
}

/**
 * Get the content title for paywall modal based on URL
 */
export function getContentTitle(pathname: string): string {
    const path = pathname.toLowerCase();

    // Chapters
    const chapterMatch = path.match(/chapitre-(\d+)/);
    if (chapterMatch) {
        return `le Chapitre ${chapterMatch[1]}`;
    }

    // Revision sheets
    const revisionMatch = path.match(/revision-ch(\d+)/);
    if (revisionMatch) {
        return `la fiche de révision du Chapitre ${revisionMatch[1]}`;
    }

    // Exercices
    if (path.includes('exercices')) {
        return 'les exercices';
    }

    // Simulations
    if (path.includes('simulations')) {
        return 'les simulations';
    }

    return 'ce contenu';
}

/**
 * Check if a QCM question is free based on subject and chapter
 * 
 * First chapter per subject:
 * - macro: 'islm' (text-based ID) or numeric 1
 * - micro: '0' or 'ch0' (chapter 0)
 * - stats, socio: '1' or 'ch1' (chapter 1)
 */
export function isQcmQuestionFree(chapterId: number | string, subject?: string): boolean {
    const id = String(chapterId).toLowerCase().trim();

    // Handle micro: first chapter is 0
    if (subject === 'micro') {
        return id === '0' || id === 'ch0' || id.startsWith('ch0-') || id.startsWith('0-');
    }

    // Handle macro: first chapter is 'islm' (text-based)
    if (subject === 'macro') {
        return id === 'islm' || id === '1' || id === 'ch1' || id.startsWith('ch1-') || id.startsWith('1-');
    }

    // Handle all other subjects (stats, socio): first chapter is 1
    const numericId = parseInt(id.replace(/\D/g, ''), 10);
    return numericId === 1 || id === 'ch1' || id.startsWith('ch1-');
}

/**
 * Get the first free chapter number for a given subject
 */
export function getFirstFreeChapter(subject: string): number {
    return subject === 'micro' ? 0 : 1;
}

