/**
 * Content Access Rules
 * 
 * Defines which content is available for free users vs premium users.
 * 
 * FREE content includes:
 * - Home pages (/, /macro, /micro, /stats, /socio)
 * - Chapter 1 of each subject (/macro/chapitre-1, etc.)
 * - Revision sheet for Chapter 1 (/macro/revision-ch1, etc.)
 * - QCM page (but only Chapter 1 questions - to be handled separately)
 * - Subscription page
 * - Login page
 * 
 * PREMIUM content includes:
 * - Chapters 2, 3, 4, etc.
 * - Revision sheets for Chapters 2, 3, 4
 * - Exercices, Simulations
 */

/**
 * Check if a URL path represents free content
 */
export function isFreeContent(pathname: string): boolean {
    const path = pathname.toLowerCase();

    // Always free: home, login, subscription pages
    if (path === '/' || path === '/login' || path === '/subscription') {
        return true;
    }

    // Subject home pages are free
    const subjectHomes = ['/macro', '/micro', '/stats', '/socio'];
    if (subjectHomes.includes(path)) {
        return true;
    }

    // Free content patterns for chapter 1
    const freePatterns = [
        /\/chapitre-1$/,           // Chapter 1 of any subject
        /\/revision-ch1$/,          // Revision sheet for Chapter 1
        /\/revision$/,              // Revision index page (shows all chapters)
        /\/qcm$/,                   // QCM page (questions filtered separately)
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
 * Check if a QCM question is free (only Chapter 1 questions are free)
 */
export function isQcmQuestionFree(chapterId: number | string): boolean {
    const chapter = typeof chapterId === 'string' ? parseInt(chapterId, 10) : chapterId;
    return chapter === 1;
}
