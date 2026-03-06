import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const StatsLayout = lazy(() => import('./layouts/StatsLayout').then(m => ({ default: m.StatsLayout })));
const StatsHome = lazy(() => import('./pages/Home').then(m => ({ default: m.StatsHome })));
const Chapter6 = lazy(() => import('./pages/Chapter6').then(m => ({ default: m.Chapter6 })));
const Chapter7 = lazy(() => import('./pages/Chapter7').then(m => ({ default: m.Chapter7 })));
const Chapter8 = lazy(() => import('./pages/Chapter8').then(m => ({ default: m.Chapter8 })));
const Chapter9 = lazy(() => import('./pages/Chapter9').then(m => ({ default: m.Chapter9 })));
const Chapter10 = lazy(() => import('./pages/Chapter10').then(m => ({ default: m.Chapter10 })));
const Chapter11 = lazy(() => import('./pages/Chapter11').then(m => ({ default: m.Chapter11 })));
const CorrectionTD3 = lazy(() => import('./pages/CorrectionTD3').then(m => ({ default: m.CorrectionTD3 })));

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
                    <Route path="chapitre-6" element={<Chapter6 />} />
                    <Route path="chapitre-7" element={<Chapter7 />} />
                    <Route path="chapitre-8" element={<Chapter8 />} />
                    <Route path="chapitre-9" element={<Chapter9 />} />
                    <Route path="chapitre-10" element={<Chapter10 />} />
                    <Route path="chapitre-11" element={<Chapter11 />} />
                    <Route path="correction-td-3" element={<CorrectionTD3 />} />
                </Route>
            </Routes>
        </Suspense>
    );
}
