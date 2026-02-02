/**
 * ContinueCard Component
 * Call-to-action card for continuing or starting the next chapter
 */

import { Link } from 'react-router-dom';
import { PlayCircle, ArrowRight } from 'lucide-react';
import type { ModuleChapter } from '../types';

interface ContinueCardProps {
    chapter: ModuleChapter;
    hasStarted: boolean;
    theme: {
        color: string;
        subtle: string;
    };
}

export function ContinueCard({ chapter, hasStarted, theme }: ContinueCardProps) {
    return (
        <div className="mb-8">
            <Link 
                to={chapter.path} 
                className="relative flex flex-col sm:flex-row items-center justify-between gap-5 p-6 rounded-2xl transition-all duration-200 hover:translate-y-[-2px] no-underline group bg-white overflow-hidden"
                style={{ 
                    border: `2px solid ${theme.subtle}`,
                    boxShadow: "var(--shadow-md)"
                }}
            >
                {/* Hover Gradient */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `linear-gradient(90deg, ${theme.subtle} 0%, transparent 100%)` }} 
                />
                
                <div className="relative flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110 text-white" style={{ 
                        background: theme.color,
                        boxShadow: "var(--shadow-md)"
                    }}>
                        <PlayCircle className="h-7 w-7" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-1 transition-colors" style={{ color: "var(--color-text-primary)" }}>
                            {hasStarted ? 'Reprendre' : 'Commencer'} · Chapitre {chapter.number}
                        </h3>
                        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>{chapter.title}</p>
                    </div>
                </div>
                <span className="relative h-12 px-8 rounded-xl text-sm font-bold inline-flex items-center gap-2 transition-transform duration-200 group-hover:translate-x-1 text-white" style={{ 
                    background: theme.color,
                    boxShadow: "var(--shadow-sm)"
                }}>
                    {hasStarted ? 'Continuer' : 'Commencer'} <ArrowRight className="h-5 w-5" />
                </span>
            </Link>
        </div>
    );
}
