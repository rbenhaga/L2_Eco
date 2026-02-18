import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const MacroLayout = lazy(() => import('./layouts/MacroLayout').then(m => ({ default: m.MacroLayout })));
const MacroHome = lazy(() => import('./pages').then(m => ({ default: m.MacroHome })));
const Chapter1 = lazy(() => import('./pages').then(m => ({ default: m.Chapter1 })));
const Chapter2 = lazy(() => import('./pages').then(m => ({ default: m.Chapter2 })));
const Chapter3 = lazy(() => import('./pages').then(m => ({ default: m.Chapter3 })));
const Chapter4 = lazy(() => import('./pages').then(m => ({ default: m.Chapter4 })));
const Revision = lazy(() => import('./pages').then(m => ({ default: m.Revision })));
const RevisionCh1 = lazy(() => import('./pages').then(m => ({ default: m.RevisionCh1 })));
const RevisionCh2 = lazy(() => import('./pages').then(m => ({ default: m.RevisionCh2 })));
const RevisionCh3 = lazy(() => import('./pages').then(m => ({ default: m.RevisionCh3 })));
const RevisionCh4 = lazy(() => import('./pages').then(m => ({ default: m.RevisionCh4 })));
const Simulations = lazy(() => import('./pages').then(m => ({ default: m.Simulations })));

function ModuleRouteFallback() {
    return (
        <div className="min-h-[40vh] flex items-center justify-center" style={{ background: 'var(--color-canvas)' }}>
            <div
                className="animate-spin rounded-full h-10 w-10"
                style={{ border: '3px solid var(--color-border-default)', borderTopColor: 'var(--color-accent)' }}
            />
        </div>
    );
}

export function MacroRoutes() {
    return (
        <Suspense fallback={<ModuleRouteFallback />}>
            <Routes>
                <Route element={<MacroLayout />}>
                    <Route index element={<MacroHome />} />
                    <Route path="chapitre-1" element={<Chapter1 />} />
                    <Route path="chapitre-2" element={<Chapter2 />} />
                    <Route path="chapitre-3" element={<Chapter3 />} />
                    <Route path="chapitre-4" element={<Chapter4 />} />
                    <Route path="revision" element={<Revision />} />
                    <Route path="revision-ch1" element={<RevisionCh1 />} />
                    <Route path="revision-ch2" element={<RevisionCh2 />} />
                    <Route path="revision-ch3" element={<RevisionCh3 />} />
                    <Route path="revision-ch4" element={<RevisionCh4 />} />
                    <Route path="simulations" element={<Simulations />} />
                </Route>
            </Routes>
        </Suspense>
    );
}
