import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const MicroLayout = lazy(() => import('./layouts/MicroLayout').then(m => ({ default: m.MicroLayout })));
const MicroHome = lazy(() => import('./pages/Home').then(m => ({ default: m.MicroHome })));
const Chapter0 = lazy(() => import('./pages/Chapter0').then(m => ({ default: m.Chapter0 })));
const Chapter1 = lazy(() => import('./pages/Chapter1').then(m => ({ default: m.Chapter1 })));
const Chapter2 = lazy(() => import('./pages/Chapter2').then(m => ({ default: m.Chapter2 })));
const Chapter3 = lazy(() => import('./pages/Chapter3').then(m => ({ default: m.Chapter3 })));
const Chapter4 = lazy(() => import('./pages/Chapter4').then(m => ({ default: m.Chapter4 })));
const Chapter5 = lazy(() => import('./pages/Chapter5').then(m => ({ default: m.Chapter5 })));
const Chapter6 = lazy(() => import('./pages/Chapter6').then(m => ({ default: m.Chapter6 })));
const Chapter7 = lazy(() => import('./pages/Chapter7').then(m => ({ default: m.Chapter7 })));
const Annales = lazy(() => import('./pages/Annales').then(m => ({ default: m.Annales })));
const RevisionIntensive = lazy(() => import('./pages/RevisionIntensive').then(m => ({ default: m.RevisionIntensive })));
const Methodes = lazy(() => import('./pages/Methodes').then(m => ({ default: m.Methodes })));
const ExamenBlanc = lazy(() => import('./pages/ExamenBlanc').then(m => ({ default: m.ExamenBlanc })));
const FicheExpress = lazy(() => import('./pages/FicheExpress').then(m => ({ default: m.FicheExpress })));

function ModuleRouteFallback() {
    return (
        <div className="min-h-[40vh] flex items-center justify-center" style={{ background: 'var(--color-canvas)' }}>
            <div className="animate-spin rounded-full h-10 w-10" style={{ border: '3px solid var(--color-border-default)', borderTopColor: 'var(--color-accent)' }} />
        </div>
    );
}

export function MicroRoutes() {
    return (
        <Suspense fallback={<ModuleRouteFallback />}>
            <Routes>
                <Route element={<MicroLayout />}>
                    <Route index element={<MicroHome />} />
                    <Route path="chapitre-0" element={<Chapter0 />} />
                    <Route path="chapitre-1" element={<Chapter1 />} />
                    <Route path="chapitre-2" element={<Chapter2 />} />
                    <Route path="chapitre-3" element={<Chapter3 />} />
                    <Route path="chapitre-4" element={<Chapter4 />} />
                    <Route path="chapitre-5" element={<Chapter5 />} />
                    <Route path="chapitre-6" element={<Chapter6 />} />
                    <Route path="chapitre-7" element={<Chapter7 />} />
                    <Route path="annales" element={<Annales />} />
                    <Route path="fiches" element={<RevisionIntensive />} />
                    <Route path="methodes" element={<Methodes />} />
                    <Route path="examen-blanc" element={<ExamenBlanc />} />
                    <Route path="fiche-express" element={<FicheExpress />} />
                </Route>
            </Routes>
        </Suspense>
    );
}
