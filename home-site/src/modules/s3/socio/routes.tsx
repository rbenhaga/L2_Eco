import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const SocioLayout = lazy(() => import('./SocioLayout').then(m => ({ default: m.SocioLayout })));
const SocioHome = lazy(() => import('./pages/SocioHome'));
const Chapter1 = lazy(() => import('./pages/Chapter1'));
const Chapter2 = lazy(() => import('./pages/Chapter2'));
const Chapter3 = lazy(() => import('./pages/Chapter3'));
const Chapter4 = lazy(() => import('./pages/Chapter4'));
const Chapter5 = lazy(() => import('./pages/Chapter5'));
const Chapter6 = lazy(() => import('./pages/Chapter6'));
const Chapter7 = lazy(() => import('./pages/Chapter7'));
const Chapter8 = lazy(() => import('./pages/Chapter8'));
const Chapter9 = lazy(() => import('./pages/Chapter9'));
const Chapter10 = lazy(() => import('./pages/Chapter10'));
const RevisionIntensive = lazy(() => import('./pages/RevisionIntensive'));
const Methodologie = lazy(() => import('./pages/Methodologie'));

function ModuleRouteFallback() {
    return (
        <div className="min-h-[40vh] flex items-center justify-center" style={{ background: 'var(--color-canvas)' }}>
            <div className="animate-spin rounded-full h-10 w-10" style={{ border: '3px solid var(--color-border-default)', borderTopColor: 'var(--color-accent)' }} />
        </div>
    );
}

export function SocioRoutes() {
    return (
        <Suspense fallback={<ModuleRouteFallback />}>
            <Routes>
                <Route element={<SocioLayout />}>
                    <Route index element={<SocioHome />} />
                    <Route path="chapitre1" element={<Chapter1 />} />
                    <Route path="chapitre2" element={<Chapter2 />} />
                    <Route path="chapitre3" element={<Chapter3 />} />
                    <Route path="chapitre4" element={<Chapter4 />} />
                    <Route path="chapitre5" element={<Chapter5 />} />
                    <Route path="chapitre6" element={<Chapter6 />} />
                    <Route path="chapitre7" element={<Chapter7 />} />
                    <Route path="chapitre8" element={<Chapter8 />} />
                    <Route path="chapitre9" element={<Chapter9 />} />
                    <Route path="chapitre10" element={<Chapter10 />} />
                    <Route path="revision-intensive" element={<RevisionIntensive />} />
                    <Route path="methodologie" element={<Methodologie />} />
                </Route>
            </Routes>
        </Suspense>
    );
}
