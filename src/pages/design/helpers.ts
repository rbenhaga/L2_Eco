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
   COURSE METADATA (With Colors - Palette épurée)
   Apple/Notion style: 2-3 teintes principales
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
        color: "#0A84FF",           // Apple Blue
        colorLight: "rgba(10, 132, 255, 0.12)",
        gradient: "linear-gradient(135deg, #0A84FF 0%, #0066CC 100%)",
    },
    micro: {
        short: "Micro",
        icon: Target,
        color: "#BF5AF2",           // Apple Purple
        colorLight: "rgba(191, 90, 242, 0.12)",
        gradient: "linear-gradient(135deg, #BF5AF2 0%, #9F44D3 100%)",
    },
    stats: {
        short: "Stats",
        icon: Layers,
        color: "#5AC8FA",           // Apple Cyan
        colorLight: "rgba(90, 200, 250, 0.12)",
        gradient: "linear-gradient(135deg, #5AC8FA 0%, #32ADE6 100%)",
    },
    socio: {
        short: "Socio",
        icon: Users,
        color: "#FF375F",           // Apple Pink
        colorLight: "rgba(255, 55, 95, 0.12)",
        gradient: "linear-gradient(135deg, #FF375F 0%, #FF2D55 100%)",
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
