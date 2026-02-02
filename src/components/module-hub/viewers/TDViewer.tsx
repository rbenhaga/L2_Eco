/**
 * TDViewer Component
 * Wrapper for TD content with module-specific routing
 * 
 * Note: TD viewers (Stats, Micro, Macro) are kept in a separate file
 * to avoid circular dependencies and keep this file focused on routing
 */

import { ArrowLeft, ClipboardList } from 'lucide-react';
import { TDViewers } from './TDViewers';

interface TDViewerProps {
    moduleId: string;
    tdId: string;
    onBack: () => void;
}

export function TDViewer({ moduleId, tdId, onBack }: TDViewerProps) {
    const tdContent = TDViewers.getTDContent(moduleId, tdId);

    if (!tdContent) {
        return (
            <div className="min-h-screen pb-16" data-theme="light">
                <div className="px-6 lg:px-10">
                    <div className="mx-auto max-w-5xl pt-6">
                        <button 
                            onClick={onBack}
                            className="flex items-center gap-2 mb-6 text-sm font-medium transition-colors"
                            style={{ color: "var(--color-text-secondary)" }}
                            onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-accent)"}
                            onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-secondary)"}
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Retour aux TD
                        </button>
                        
                        <div className="p-8 rounded-2xl border text-center" style={{ background: "var(--color-bg-raised)", borderColor: "var(--color-border-default)" }}>
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: "var(--color-accent-subtle)" }}>
                                <ClipboardList className="h-8 w-8" style={{ color: "var(--color-accent)" }} />
                            </div>
                            <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--color-text-primary)" }}>
                                TD non disponible
                            </h2>
                            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                                Ce TD n'est pas encore disponible pour ce module.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-16" data-theme="light">
            <div className="px-6 lg:px-10">
                <main className="mx-auto max-w-6xl pt-6">
                    <button 
                        onClick={onBack}
                        className="flex items-center gap-2 mb-6 text-sm font-medium transition-colors"
                        style={{ color: "var(--color-text-secondary)" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-accent)"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-secondary)"}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Retour aux TD
                    </button>
                    
                    {tdContent}
                </main>
            </div>
        </div>
    );
}
