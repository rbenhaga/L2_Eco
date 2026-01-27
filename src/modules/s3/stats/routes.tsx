import { Routes, Route } from 'react-router-dom';
import { StatsLayout } from './layouts/StatsLayout';
import { StatsHome } from './pages/Home';
import { Chapter1 } from './pages/Chapter1';
import { Chapter2 } from './pages/Chapter2';
import { Chapter3 } from './pages/Chapter3';
import { Chapter4 } from './pages/Chapter4';
import { Chapter5 } from './pages/Chapter5';
import { Revision } from './pages/Revision';
import { Demonstrations } from './pages/Demonstrations';
import { Annales } from './pages/Annales';
import { CorrectionAnnales } from './pages/CorrectionAnnales';
import { RevisionIntensive } from './pages/RevisionIntensive';

export function StatsRoutes() {
    return (
        <Routes>
            <Route element={<StatsLayout />}>
                <Route index element={<StatsHome />} />
                <Route path="chapitre-1" element={<Chapter1 />} />
                <Route path="chapitre-2" element={<Chapter2 />} />
                <Route path="chapitre-3" element={<Chapter3 />} />
                <Route path="chapitre-4" element={<Chapter4 />} />
                <Route path="chapitre-5" element={<Chapter5 />} />
                {/* TD/QCM now integrated in ModuleHub via query params */}
                {/* <Route path="td" element={<TD />} /> */}
                {/* <Route path="qcm" element={<QCM />} /> */}
                <Route path="revision" element={<Revision />} />
                <Route path="demonstrations" element={<Demonstrations />} />
                <Route path="annales" element={<Annales />} />
                <Route path="correction" element={<CorrectionAnnales />} />
                <Route path="revision-intensive" element={<RevisionIntensive />} />
            </Route>
        </Routes>
    );
}
