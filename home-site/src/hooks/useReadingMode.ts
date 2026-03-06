/**
 * Reading Mode Hook
 * Manages "Paper Canvas" mode for course reading
 */

import { useState, useEffect } from "react";

export type ReadingMode = "dark" | "paper";

export function useReadingMode(courseKey?: string) {
    const storageKey = courseKey ? `reading-mode-${courseKey}` : "reading-mode-global";
    
    const [mode, setMode] = useState<ReadingMode>(() => {
        if (typeof window === "undefined") return "dark";
        const stored = localStorage.getItem(storageKey);
        return (stored as ReadingMode) || "dark";
    });

    useEffect(() => {
        localStorage.setItem(storageKey, mode);
    }, [mode, storageKey]);

    const toggle = () => {
        setMode(prev => prev === "dark" ? "paper" : "dark");
    };

    return { mode, setMode, toggle, isPaper: mode === "paper" };
}
