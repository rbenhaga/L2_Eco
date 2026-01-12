/**
 * Agora Premium - Design Helpers & Meta
 * Enhanced with course colors and icon system
 */

import React from "react";
import {
    TrendingUp,
    Scale,
    BarChart3,
    Users,
    Calculator,
    BookOpen,
    FileText,
    Target,
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
   COURSE METADATA (Apple System Colors - Authentic)
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
        color: "#0A84FF", // iOS Blue (vibrant)
        colorLight: "rgba(10, 132, 255, 0.08)",
        gradient: "linear-gradient(135deg, #0A84FF 0%, #007AFF 100%)",
    },
    stats: {
        short: "Stats",
        icon: BarChart3,
        color: "#5E5CE6", // iOS Indigo (sophisticated)
        colorLight: "rgba(94, 92, 230, 0.08)",
        gradient: "linear-gradient(135deg, #5E5CE6 0%, #5856D6 100%)",
    },
    micro: {
        short: "Micro",
        icon: Scale,
        color: "#BF5AF2", // iOS Purple (elegant)
        colorLight: "rgba(191, 90, 242, 0.08)",
        gradient: "linear-gradient(135deg, #BF5AF2 0%, #AF52DE 100%)",
    },
    socio: {
        short: "Socio",
        icon: Users,
        color: "#FF375F", // iOS Pink (warm)
        colorLight: "rgba(255, 55, 95, 0.08)",
        gradient: "linear-gradient(135deg, #FF375F 0%, #FF2D55 100%)",
    },
    maths: {
        short: "Maths",
        icon: Calculator,
        color: "#30D158", // iOS Green (fresh)
        colorLight: "rgba(48, 209, 88, 0.08)",
        gradient: "linear-gradient(135deg, #30D158 0%, #34C759 100%)",
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
