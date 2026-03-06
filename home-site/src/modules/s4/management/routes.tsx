import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const ManagementLayout = lazy(() => import('./layouts/ManagementLayout').then(m => ({ default: m.ManagementLayout })));
const ManagementHome = lazy(() => import('./pages/Home').then(m => ({ default: m.ManagementHome })));
const Chapter1 = lazy(() => import('./pages/Chapter1').then(m => ({ default: m.Chapter1 })));
const Chapter2 = lazy(() => import('./pages/Chapter2').then(m => ({ default: m.Chapter2 })));
const Chapter3 = lazy(() => import('./pages/Chapter3').then(m => ({ default: m.Chapter3 })));
const Chapter4 = lazy(() => import('./pages/Chapter4').then(m => ({ default: m.Chapter4 })));

function ModuleRouteFallback() {
    return (
        <div className="min-h-[40vh] flex items-center justify-center" style={{ background: 'var(--color-canvas)' }}>
            <div className="animate-spin rounded-full h-10 w-10" style={{ border: '3px solid var(--color-border-default)', borderTopColor: 'var(--color-accent)' }} />
        </div>
    );
}

export function ManagementRoutes() {
    return (
        <Suspense fallback={<ModuleRouteFallback />}>
            <Routes>
                <Route element={<ManagementLayout />}>
                    <Route index element={<ManagementHome />} />
                    <Route path="chapitre-1" element={<Chapter1 />} />
                    <Route path="chapitre-2" element={<Chapter2 />} />
                    <Route path="chapitre-3" element={<Chapter3 />} />
                    <Route path="chapitre-4" element={<Chapter4 />} />
                </Route>
            </Routes>
        </Suspense>
    );
}
