/**
 * Agora Premium - Design Helpers & Meta
 * Enhanced with course colors and icon system
 */

import React from "react";
import {
    TrendingUp,
    Target,
    Layers,
    Users,
    BookOpen,
    FileText,
} from "lucide-react";
import type { CourseKey, UpdateItem, ResourceType } from "./types";

export function cx(...parts: Array<string | false | undefined | null>) {
    return parts.filter(Boolean).join(" ");
}

/* ============================================
   ICON SYSTEM (Standardized)
   ============================================ */
export const ICON_SIZES = {
    xs: 14,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
} as const;

export const ICON_STROKE = {
    thin: 1.5,
    regular: 2,
    bold: 2.5,
} as const;

/* ============================================
   COURSE METADATA (With Colors)
   ============================================ */
export const COURSE_META: Record<
    CourseKey,
    {
        short: string;
        icon: React.ElementType;
        color: string;
        colorLight: string;
        gradient: string;
    }
> = {
    macro: {
        short: "Macro",
        icon: TrendingUp,
        color: "var(--color-macro)",
        colorLight: "var(--color-macro-light)",
        gradient: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
    },
    micro: {
        short: "Micro",
        icon: Target,
        color: "var(--color-micro)",
        colorLight: "var(--color-micro-light)",
        gradient: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
    },
    stats: {
        short: "Stats",
        icon: Layers,
        color: "var(--color-stats)",
        colorLight: "var(--color-stats-light)",
        gradient: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
    },
    socio: {
        short: "Socio",
        icon: Users,
        color: "var(--color-socio)",
        colorLight: "var(--color-socio-light)",
        gradient: "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)",
    },
};

export const TYPE_ICON: Record<UpdateItem["type"], React.ElementType> = {
    Chapitre: BookOpen,
    TD: FileText,
    Annale: FileText,
    QCM: Target,
    Fiche: FileText,
    Corrigé: FileText,
};

export const RESOURCE_ICON: Record<ResourceType, React.ElementType> = {
    Cours: BookOpen,
    TD: FileText,
    QCM: Target,
    Annales: FileText,
    Fiches: FileText,
};

export function isNewLabel(meta: string) {
    const m = meta.toLowerCase();
    return m.includes("nouveau") || m.includes("aujourd");
}
