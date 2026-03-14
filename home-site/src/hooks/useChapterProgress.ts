/**
 * useChapterProgress - Hook pour tracker la progression d'un chapitre
 * 
 * Fonctionnalités :
 * - Tracking automatique du temps de lecture
 * - Tracking du scroll
 * - Validation de la lecture
 * - ⚡ Visibility API: ne compte que le temps en premier plan
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { progressService } from '../services/progressService';

interface UseChapterProgressOptions {
    moduleId: string;
    chapterId: string;
    estimatedMinutes?: number;
    enabled?: boolean;
    minimumQCMScore?: number;
}

export function useChapterProgress({
    moduleId,
    chapterId,
    enabled = true,
    minimumQCMScore,
}: UseChapterProgressOptions) {
    const [progress, setProgress] = useState(() =>
        progressService.getChapter(moduleId, chapterId)
    );

    const startTimeRef = useRef<number>(Date.now());
    const isVisibleRef = useRef<boolean>(document.visibilityState === 'visible');
    const accumulatedRef = useRef<number>(0); // accumulated seconds while visible

    // Flush accumulated time to progressService
    const flushTime = useCallback(() => {
        if (isVisibleRef.current) {
            const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
            accumulatedRef.current += elapsed;
            startTimeRef.current = Date.now();
        }

        if (accumulatedRef.current > 0) {
            progressService.updateReadingTime(moduleId, chapterId, accumulatedRef.current);
            accumulatedRef.current = 0;
            setProgress(progressService.getChapter(moduleId, chapterId));
        }
    }, [moduleId, chapterId]);

    // Start reading & handle visibility changes
    useEffect(() => {
        if (!enabled) return;

        progressService.configureChapter(moduleId, chapterId, {
            minimumQCMScore,
        });
        progressService.startReading(moduleId, chapterId);
        startTimeRef.current = Date.now();
        isVisibleRef.current = document.visibilityState === 'visible';
        accumulatedRef.current = 0;

        // Update progress state
        setProgress(progressService.getChapter(moduleId, chapterId));

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                // Page going to background → save elapsed active time
                if (isVisibleRef.current) {
                    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
                    accumulatedRef.current += elapsed;
                }
                isVisibleRef.current = false;
            } else {
                // Page coming back to foreground → reset timer
                isVisibleRef.current = true;
                startTimeRef.current = Date.now();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            // Flush remaining time on unmount
            if (isVisibleRef.current) {
                const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
                accumulatedRef.current += elapsed;
            }
            if (accumulatedRef.current > 0) {
                progressService.updateReadingTime(moduleId, chapterId, accumulatedRef.current);
            }
        };
    }, [moduleId, chapterId, enabled]);

    useEffect(() => {
        if (!enabled) return;

        return progressService.subscribe(() => {
            setProgress(progressService.getChapter(moduleId, chapterId));
        });
    }, [moduleId, chapterId, enabled]);

    // Periodic flush every 10 seconds (only counts foreground time)
    useEffect(() => {
        if (!enabled) return;

        const interval = setInterval(() => {
            if (!isVisibleRef.current) return; // skip if tab is not visible

            const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
            if (elapsed >= 10) {
                accumulatedRef.current += elapsed;
                startTimeRef.current = Date.now();
                flushTime();
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [moduleId, chapterId, enabled, flushTime]);

    return {
        progress,
        isReadComplete: true,
        isQCMUnlocked: true,
        isCompleted: progress?.isCompleted ?? false,
        scrollProgress: 0,
        timeSpent: progress?.timeSpent ?? 0,
        qcmBestScore: progress?.qcmBestScore ?? 0,
    };
}
