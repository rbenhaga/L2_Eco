import { Routes, Route } from 'react-router-dom';
import { SocioLayout } from './SocioLayout';
import SocioHome from './pages/SocioHome';
import Chapter1 from './pages/Chapter1';
import Chapter2 from './pages/Chapter2';
import Chapter3 from './pages/Chapter3';
import Chapter4 from './pages/Chapter4';
import Chapter5 from './pages/Chapter5';
import Chapter6 from './pages/Chapter6';
import Chapter7 from './pages/Chapter7';
import Chapter8 from './pages/Chapter8';
import Chapter9 from './pages/Chapter9';
import Chapter10 from './pages/Chapter10';
import RevisionIntensive from './pages/RevisionIntensive';
import QCM from './pages/QCM';
import Methodologie from './pages/Methodologie';

export function SocioRoutes() {
    return (
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
                <Route path="qcm" element={<QCM />} />
                <Route path="methodologie" element={<Methodologie />} />
            </Route>
        </Routes>
    );
}
