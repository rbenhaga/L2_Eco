/**
 * ContentLists Components
 * List views for TD, QCM, and Annales content
 */

import { Link, useSearchParams } from 'react-router-dom';
import { ClipboardList, Brain, FileText, ChevronRight } from 'lucide-react';
import { TD_DATA, QCM_DATA, ANNALES_DATA } from '../utils';
import type { ModuleId } from '../types';

// TD List
interface TDListProps {
    moduleId: ModuleId;
}

export function TDList({ moduleId }: TDListProps) {
    const [, setSearchParams] = useSearchParams();
    const tds = TD_DATA[moduleId] || [];
    
    const handleTDClick = (tdId: string) => {
        setSearchParams({ tab: 'td', td: tdId });
    };
    
    if (tds.length === 0) {
        return (
            <div className="px-6 py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'var(--color-bg-overlay)' }}>
                    <ClipboardList className="h-8 w-8" style={{ color: 'var(--color-text-muted)' }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    TD bientôt disponibles
                </h3>
                <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                    Les travaux dirigés seront ajoutés prochainement pour vous aider à pratiquer les concepts du cours.
                </p>
            </div>
        );
    }
    
    return (
        <div>
            {tds.map((td, index) => (
                <div key={td.id}>
                    <button 
                        onClick={() => handleTDClick(td.id)}
                        className="w-full group flex items-center gap-4 px-6 py-4 transition-colors duration-200 text-left rounded-xl hover:bg-[var(--color-bg-overlay)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-raised)]"
                    >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-[var(--color-accent-subtle)]">
                            <ClipboardList className="h-5 w-5 text-[var(--color-accent)]" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold mb-2 text-[var(--color-text-primary)]">
                                {td.title}
                            </h3>
                            <p className="text-xs text-[var(--color-text-muted)]">
                                {td.description}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs px-2 py-2 rounded-md bg-[var(--color-bg-overlay)] text-[var(--color-text-secondary)]">
                                {td.count}
                            </span>
                            <ChevronRight className="h-4 w-4 transition-colors text-[var(--color-text-muted)]" />
                        </div>
                    </button>
                    {index < tds.length - 1 && <div className="mx-6" style={{ borderBottom: `1px solid var(--color-border-soft)` }} />}
                </div>
            ))}
        </div>
    );
}

// QCM List
interface QCMListProps {
    moduleId: ModuleId;
}

export function QCMList({ moduleId }: QCMListProps) {
    const [, setSearchParams] = useSearchParams();
    const qcms = QCM_DATA[moduleId] || [];
    
    const handleQCMClick = () => {
        setSearchParams({ tab: 'qcm', qcm: 'start' });
    };
    
    return (
        <div>
            {qcms.map((qcm, index) => (
                <div key={qcm.id}>
                    <button 
                        onClick={handleQCMClick}
                        className="w-full group flex items-center gap-4 px-6 py-4 transition-colors duration-200 text-left rounded-xl hover:bg-[var(--color-bg-overlay)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-raised)]"
                    >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-[var(--color-accent-subtle)]">
                            <Brain className="h-5 w-5 text-[var(--color-accent)]" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold mb-2 text-[var(--color-text-primary)]">
                                {qcm.title}
                            </h3>
                            <p className="text-xs text-[var(--color-text-muted)]">
                                {qcm.subtitle}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs px-2 py-2 rounded-md bg-[var(--color-bg-overlay)] text-[var(--color-text-secondary)]">
                                {qcm.count} questions
                            </span>
                            <ChevronRight className="h-4 w-4 transition-colors text-[var(--color-text-muted)]" />
                        </div>
                    </button>
                    {index < qcms.length - 1 && <div className="mx-6" style={{ borderBottom: `1px solid var(--color-border-soft)` }} />}
                </div>
            ))}
        </div>
    );
}

// Annales List
interface AnnalesListProps {
    baseRoute: string;
}

export function AnnalesList({ baseRoute }: AnnalesListProps) {
    return (
        <div>
            {ANNALES_DATA.map((annale, i) => (
                <div key={annale.path}>
                    <Link 
                        to={`${baseRoute}${annale.path}`}
                        className="group flex items-center gap-4 px-6 py-4 transition-colors duration-200 no-underline rounded-xl hover:bg-[var(--color-bg-overlay)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-raised)]"
                    >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-[var(--color-accent-subtle)]">
                            <FileText className="h-5 w-5 text-[var(--color-accent)]" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{annale.title}</h3>
                                {annale.isNew && <span className="px-2 py-2 rounded text-[10px] font-semibold uppercase tracking-wide bg-[var(--color-success-subtle)] text-[var(--color-success)]">Nouveau</span>}
                            </div>
                            <p className="text-xs text-[var(--color-text-muted)]">{annale.description}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0 transition-colors text-[var(--color-text-muted)]" />
                    </Link>
                    {i < ANNALES_DATA.length - 1 && <div className="mx-6" style={{ borderBottom: `1px solid var(--color-border-soft)` }} />}
                </div>
            ))}
        </div>
    );
}
