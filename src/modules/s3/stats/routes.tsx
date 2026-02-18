import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const StatsLayout = lazy(() => import('./layouts/StatsLayout').then(m => ({ default: m.StatsLayout })));
const StatsHome = lazy(() => import('./pages/Home').then(m => ({ default: m.StatsHome })));
const Chapter1 = lazy(() => import('./pages/Chapter1').then(m => ({ default: m.Chapter1 })));
const Chapter2 = lazy(() => import('./pages/Chapter2').then(m => ({ default: m.Chapter2 })));
const Chapter3 = lazy(() => import('./pages/Chapter3').then(m => ({ default: m.Chapter3 })));
const Chapter4 = lazy(() => import('./pages/Chapter4').then(m => ({ default: m.Chapter4 })));
const Chapter5 = lazy(() => import('./pages/Chapter5').then(m => ({ default: m.Chapter5 })));
const Revision = lazy(() => import('./pages/Revision').then(m => ({ default: m.Revision })));
const Demonstrations = lazy(() => import('./pages/Demonstrations').then(m => ({ default: m.Demonstrations })));
const Annales = lazy(() => import('./pages/Annales').then(m => ({ default: m.Annales })));
const CorrectionAnnales = lazy(() => import('./pages/CorrectionAnnales').then(m => ({ default: m.CorrectionAnnales })));
const RevisionIntensive = lazy(() => import('./pages/RevisionIntensive').then(m => ({ default: m.RevisionIntensive })));

function ModuleRouteFallback() {
    return (
        <div className="min-h-[40vh] flex items-center justify-center" style={{ background: 'var(--color-canvas)' }}>
            <div className="animate-spin rounded-full h-10 w-10" style={{ border: '3px solid var(--color-border-default)', borderTopColor: 'var(--color-accent)' }} />
        </div>
    );
}

export function StatsRoutes() {
    return (
        <Suspense fallback={<ModuleRouteFallback />}>
            <Routes>
                <Route element={<StatsLayout />}>
                    <Route index element={<StatsHome />} />
                    <Route path="chapitre-1" element={<Chapter1 />} />
                    <Route path="chapitre-2" element={<Chapter2 />} />
                    <Route path="chapitre-3" element={<Chapter3 />} />
                    <Route path="chapitre-4" element={<Chapter4 />} />
                    <Route path="chapitre-5" element={<Chapter5 />} />
                    <Route path="revision" element={<Revision />} />
                    <Route path="demonstrations" element={<Demonstrations />} />
                    <Route path="annales" element={<Annales />} />
                    <Route path="correction" element={<CorrectionAnnales />} />
                    <Route path="revision-intensive" element={<RevisionIntensive />} />
                </Route>
            </Routes>
        </Suspense>
    );
}
