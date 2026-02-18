/**
 * Progress Service - Gestion de la progression utilisateur
 * 
 * Fonctionnalités :
 * - Tracking du temps de lecture
 * - Validation du scroll (lecture complète)
 * - Validation des QCM avec score minimum
 * - Persistance dans localStorage + Firebase (optionnel)
 */

export interface ChapterProgress {
    chapterId: string;
    moduleId: string;
    
    // Lecture
    startedAt: Date | null;
    lastReadAt: Date | null;
    timeSpent: number; // en secondes
    scrollProgress: number; // 0-100%
    isReadComplete: boolean; // scroll >= 90% && timeSpent >= estimatedTime * 0.5
    
    // QCM
    qcmAttempts: number;
    qcmBestScore: number; // 0-100%
    qcmCompletedAt: Date | null;
    
    // Validation finale
    isCompleted: boolean; // isReadComplete && qcmBestScore >= 70
    completedAt: Date | null;
}

export interface ModuleProgress {
    moduleId: string;
    chapters: Record<string, ChapterProgress>;
    resources?: Record<string, ResourceProgress>;
    totalTimeSpent: number;
    completedChapters: number;
    totalChapters: number;
    lastAccessedAt: Date;
}

export type ResourceType = 'td' | 'td_correction' | 'qcm' | 'annale';

export interface ResourceProgress {
    resourceId: string;
    moduleId: string;
    type: ResourceType;
    visits: number;
    timeSpent: number; // en secondes
    isCompleted: boolean;
    firstAccessedAt: Date | null;
    lastAccessedAt: Date | null;
    completedAt: Date | null;
}

const STORAGE_KEY = 'agora_user_progress';
const MIN_QCM_SCORE = 70; // Score minimum pour valider un chapitre
const MIN_READ_PERCENTAGE = 90; // % de scroll minimum
const MIN_TIME_RATIO = 0.5; // Ratio du temps estimé minimum

class ProgressService {
    private progress: Record<string, ModuleProgress> = {};
    private saveTimeout: number | null = null;
    private listeners = new Set<() => void>();
    private notifyQueued = false;
    
    constructor() {
        this.loadFromStorage();
        if (typeof window !== 'undefined') {
            window.addEventListener('beforeunload', () => this.flushPendingSave());
        }
    }

    subscribe(listener: () => void): () => void {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }
    
    // ============================================
    // LECTURE DU CHAPITRE
    // ============================================
    
    /**
     * Démarre le tracking de lecture d'un chapitre
     */
    startReading(moduleId: string, chapterId: string): void {
        const chapter = this.getOrCreateChapter(moduleId, chapterId);
        
        if (!chapter.startedAt) {
            chapter.startedAt = new Date();
        }
        chapter.lastReadAt = new Date();
        this.updateModuleStats(moduleId);
        this.saveToStorage();
        this.notifyChange();
    }
    
    /**
     * Met à jour le temps passé sur un chapitre
     */
    updateReadingTime(moduleId: string, chapterId: string, seconds: number): void {
        const chapter = this.getOrCreateChapter(moduleId, chapterId);
        chapter.timeSpent += seconds;
        chapter.lastReadAt = new Date();
        
        this.checkReadCompletion(moduleId, chapterId);
        this.checkChapterCompletion(moduleId, chapterId);
        this.updateModuleStats(moduleId);
        this.saveToStorage();
        this.notifyChange();
    }
    
    /**
     * Met à jour la progression du scroll
     */
    updateScrollProgress(moduleId: string, chapterId: string, percentage: number): void {
        const chapter = this.getOrCreateChapter(moduleId, chapterId);
        chapter.scrollProgress = Math.max(chapter.scrollProgress, percentage);
        
        this.checkReadCompletion(moduleId, chapterId);
        this.checkChapterCompletion(moduleId, chapterId);
        this.updateModuleStats(moduleId);
        this.saveToStorage();
        this.notifyChange();
    }
    
    /**
     * Vérifie si la lecture est complète
     */
    private checkReadCompletion(moduleId: string, chapterId: string, estimatedMinutes: number = 30): void {
        const chapter = this.getOrCreateChapter(moduleId, chapterId);
        const estimatedSeconds = estimatedMinutes * 60;
        
        const hasScrolledEnough = chapter.scrollProgress >= MIN_READ_PERCENTAGE;
        const hasSpentEnoughTime = chapter.timeSpent >= estimatedSeconds * MIN_TIME_RATIO;
        
        chapter.isReadComplete = hasScrolledEnough && hasSpentEnoughTime;
    }
    
    // ============================================
    // QCM
    // ============================================
    
    /**
     * Enregistre un résultat de QCM
     */
    recordQCMScore(moduleId: string, chapterId: string, score: number): void {
        const chapter = this.getOrCreateChapter(moduleId, chapterId);
        
        chapter.qcmAttempts += 1;
        chapter.qcmBestScore = Math.max(chapter.qcmBestScore, score);
        
        if (score >= MIN_QCM_SCORE) {
            chapter.qcmCompletedAt = new Date();
        }
        
        this.checkChapterCompletion(moduleId, chapterId);
        this.updateModuleStats(moduleId);
        this.saveToStorage();
        this.notifyChange();
    }
    
    /**
     * Vérifie si le QCM est débloqué (lecture complète requise)
     */
    isQCMUnlocked(moduleId: string, chapterId: string): boolean {
        const chapter = this.getChapter(moduleId, chapterId);
        return chapter?.isReadComplete ?? false;
    }
    
    // ============================================
    // VALIDATION CHAPITRE
    // ============================================
    
    /**
     * Vérifie si le chapitre est complété (lecture + QCM)
     */
    private checkChapterCompletion(moduleId: string, chapterId: string): void {
        const chapter = this.getOrCreateChapter(moduleId, chapterId);
        
        const wasCompleted = chapter.isCompleted;
        chapter.isCompleted = chapter.isReadComplete && chapter.qcmBestScore >= MIN_QCM_SCORE;
        
        if (chapter.isCompleted && !wasCompleted) {
            chapter.completedAt = new Date();
        } else if (!chapter.isCompleted && wasCompleted) {
            chapter.completedAt = null;
        }
    }
    
    /**
     * Met à jour les stats du module
     */
    private updateModuleStats(moduleId: string): void {
        const module = this.progress[moduleId];
        if (!module) return;
        
        module.completedChapters = Object.values(module.chapters)
            .filter(ch => ch.isCompleted).length;

        const chapterTime = Object.values(module.chapters)
            .reduce((sum, ch) => sum + ch.timeSpent, 0);
        const resourceTime = Object.values(module.resources ?? {})
            .reduce((sum, res) => sum + res.timeSpent, 0);

        module.totalTimeSpent = chapterTime + resourceTime;
        
        module.lastAccessedAt = new Date();
    }
    
    // ============================================
    // GETTERS
    // ============================================
    
    /**
     * Récupère la progression d'un chapitre
     */
    getChapter(moduleId: string, chapterId: string): ChapterProgress | null {
        return this.progress[moduleId]?.chapters[chapterId] ?? null;
    }
    
    /**
     * Récupère la progression d'un module
     */
    getModule(moduleId: string): ModuleProgress | null {
        return this.progress[moduleId] ?? null;
    }

    /**
     * Enregistre l'activite sur une ressource non-cours (TD, correction, QCM, annale)
     */
    recordResourceAccess(
        moduleId: string,
        resourceId: string,
        type: ResourceType,
        options?: { completed?: boolean; timeSpentSeconds?: number }
    ): void {
        const module = this.getOrCreateModule(moduleId);
        if (!module.resources) module.resources = {};

        if (!module.resources[resourceId]) {
            module.resources[resourceId] = {
                resourceId,
                moduleId,
                type,
                visits: 0,
                timeSpent: 0,
                isCompleted: false,
                firstAccessedAt: null,
                lastAccessedAt: null,
                completedAt: null,
            };
        }

        const resource = module.resources[resourceId];
        const now = new Date();

        resource.visits += 1;
        resource.firstAccessedAt = resource.firstAccessedAt ?? now;
        resource.lastAccessedAt = now;
        resource.timeSpent += Math.max(0, options?.timeSpentSeconds ?? 0);
        resource.isCompleted = resource.isCompleted || !!options?.completed;
        if (resource.isCompleted && !resource.completedAt) {
            resource.completedAt = now;
        }

        this.updateModuleStats(moduleId);
        this.saveToStorage();
        this.notifyChange();
    }

    getResource(moduleId: string, resourceId: string): ResourceProgress | null {
        return this.progress[moduleId]?.resources?.[resourceId] ?? null;
    }
    
    /**
     * Trouve le prochain chapitre à lire
     */
    getNextChapter(moduleId: string, chapterIds: string[]): string | null {
        const module = this.progress[moduleId];
        if (!module) return chapterIds[0] ?? null;
        
        // Trouve le premier chapitre non complété
        for (const chapterId of chapterIds) {
            const chapter = module.chapters[chapterId];
            if (!chapter || !chapter.isCompleted) {
                return chapterId;
            }
        }
        
        // Tous complétés, retourne le dernier
        return chapterIds[chapterIds.length - 1] ?? null;
    }
    
    /**
     * Récupère le dernier chapitre consulté
     */
    getLastAccessedChapter(moduleId: string): string | null {
        const module = this.progress[moduleId];
        if (!module) return null;
        
        let lastChapter: ChapterProgress | null = null;
        let lastDate: Date | null = null;
        
        for (const chapter of Object.values(module.chapters)) {
            if (chapter.lastReadAt && (!lastDate || chapter.lastReadAt > lastDate)) {
                lastDate = chapter.lastReadAt;
                lastChapter = chapter;
            }
        }
        
        return lastChapter?.chapterId ?? null;
    }
    
    /**
     * Calcule le pourcentage de complétion d'un module
     */
    getModuleCompletion(moduleId: string, totalChapters: number): number {
        const module = this.progress[moduleId];
        if (!module || totalChapters === 0) return 0;
        
        return Math.round((module.completedChapters / totalChapters) * 100);
    }

    /**
     * Migre (ou fusionne) la progression d'un ancien identifiant vers un nouveau.
     * Idempotent: utilise max/OR pour eviter les doubles comptages.
     */
    migrateChapterProgress(
        fromModuleId: string,
        fromChapterId: string,
        toModuleId: string,
        toChapterId: string
    ): void {
        const source = this.getChapter(fromModuleId, fromChapterId);
        if (!source) return;

        const target = this.getOrCreateChapter(toModuleId, toChapterId);

        target.startedAt = target.startedAt ?? source.startedAt;
        target.lastReadAt = (!target.lastReadAt || (source.lastReadAt && source.lastReadAt > target.lastReadAt))
            ? source.lastReadAt
            : target.lastReadAt;
        target.timeSpent = Math.max(target.timeSpent, source.timeSpent);
        target.scrollProgress = Math.max(target.scrollProgress, source.scrollProgress);
        target.isReadComplete = target.isReadComplete || source.isReadComplete;
        target.qcmAttempts = Math.max(target.qcmAttempts, source.qcmAttempts);
        target.qcmBestScore = Math.max(target.qcmBestScore, source.qcmBestScore);
        target.qcmCompletedAt = target.qcmCompletedAt ?? source.qcmCompletedAt;
        target.isCompleted = target.isCompleted || source.isCompleted;
        target.completedAt = target.completedAt ?? source.completedAt;

        this.updateModuleStats(toModuleId);
        this.saveToStorage();
        this.notifyChange();
    }
    
    // ============================================
    // HELPERS PRIVÉS
    // ============================================
    
    private getOrCreateModule(moduleId: string): ModuleProgress {
        if (!this.progress[moduleId]) {
            this.progress[moduleId] = {
                moduleId,
                chapters: {},
                resources: {},
                totalTimeSpent: 0,
                completedChapters: 0,
                totalChapters: 0,
                lastAccessedAt: new Date(),
            };
        }

        if (!this.progress[moduleId].resources) {
            this.progress[moduleId].resources = {};
        }

        return this.progress[moduleId];
    }

    private getOrCreateChapter(moduleId: string, chapterId: string): ChapterProgress {
        this.getOrCreateModule(moduleId);

        if (!this.progress[moduleId].chapters[chapterId]) {
            this.progress[moduleId].chapters[chapterId] = {
                chapterId,
                moduleId,
                startedAt: null,
                lastReadAt: null,
                timeSpent: 0,
                scrollProgress: 0,
                isReadComplete: false,
                qcmAttempts: 0,
                qcmBestScore: 0,
                qcmCompletedAt: null,
                isCompleted: false,
                completedAt: null,
            };
        }
        
        return this.progress[moduleId].chapters[chapterId];
    }
    
    // ============================================
    // PERSISTENCE
    // ============================================
    
    private loadFromStorage(): void {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Convertir les dates string en Date objects
                this.progress = this.deserializeDates(parsed);
            }
        } catch (error) {
            console.error('Failed to load progress from storage:', error);
        }
    }
    
    private saveToStorage(): void {
        if (typeof window === 'undefined') return;

        if (this.saveTimeout !== null) {
            window.clearTimeout(this.saveTimeout);
        }

        this.saveTimeout = window.setTimeout(() => {
            this.flushPendingSave();
        }, 250);
    }

    private flushPendingSave(): void {
        try {
            if (typeof window !== 'undefined' && this.saveTimeout !== null) {
                window.clearTimeout(this.saveTimeout);
                this.saveTimeout = null;
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
        } catch (error) {
            console.error('Failed to save progress to storage:', error);
        }
    }

    private notifyChange(): void {
        if (this.notifyQueued) return;
        this.notifyQueued = true;

        const dispatch = () => {
            this.notifyQueued = false;
            for (const listener of this.listeners) {
                listener();
            }
        };

        if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
            window.requestAnimationFrame(dispatch);
            return;
        }

        setTimeout(dispatch, 0);
    }
    
    private deserializeDates(obj: any): any {
        if (obj === null || typeof obj !== 'object') return obj;
        
        if (Array.isArray(obj)) {
            return obj.map(item => this.deserializeDates(item));
        }
        
        const result: any = {};
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
                result[key] = new Date(value);
            } else if (typeof value === 'object') {
                result[key] = this.deserializeDates(value);
            } else {
                result[key] = value;
            }
        }
        return result;
    }
    
    /**
     * Réinitialise toute la progression (dev only)
     */
    reset(): void {
        if (typeof window !== 'undefined' && this.saveTimeout !== null) {
            window.clearTimeout(this.saveTimeout);
            this.saveTimeout = null;
        }
        this.progress = {};
        localStorage.removeItem(STORAGE_KEY);
        this.notifyChange();
    }
}

// Export singleton
export const progressService = new ProgressService();
