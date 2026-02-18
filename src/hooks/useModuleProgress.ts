/**
 * useModuleProgress - Hook pour gérer la progression d'un module
 */

import { useState, useEffect } from 'react';
import { progressService } from '../services/progressService';

export function useModuleProgress(moduleId: string, chapterIds: string[]) {
    const [, setRefreshTick] = useState(0);

    // Refresh only when progress data actually changes.
    useEffect(() => {
        const unsubscribe = progressService.subscribe(() => {
            setRefreshTick((prev) => prev + 1);
        });

        return unsubscribe;
    }, []);

    // Single pass to compute progression stats.
    let chaptersWithProgress = 0;
    let completedChapters = 0;
    for (const id of chapterIds) {
        const chapter = progressService.getChapter(moduleId, id);
        if ((chapter?.scrollProgress ?? 0) > 0 || (chapter?.timeSpent ?? 0) > 0) {
            chaptersWithProgress += 1;
        }
        if (chapter?.isCompleted) {
            completedChapters += 1;
        }
    }
    
    // Completion percentage based on chapters with any progress
    const completionPercentage = chapterIds.length > 0
        ? Math.floor((chaptersWithProgress / chapterIds.length) * 100)
        : 0;
    
    const nextChapterId = progressService.getNextChapter(moduleId, chapterIds);
    const lastAccessedChapterId = progressService.getLastAccessedChapter(moduleId);
    
    const totalTimeSpent = progressService.getModule(moduleId)?.totalTimeSpent ?? 0;
    const totalTimeFormatted = formatTime(totalTimeSpent);
    
    return {
        completedChapters,
        totalChapters: chapterIds.length,
        completionPercentage,
        nextChapterId,
        lastAccessedChapterId,
        totalTimeSpent,
        totalTimeFormatted,
        getChapterProgress: (chapterId: string) => 
            progressService.getChapter(moduleId, chapterId),
    };
}

function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
        return `${hours}h${minutes.toString().padStart(2, '0')}`;
    }
    return `${minutes}min`;
}
