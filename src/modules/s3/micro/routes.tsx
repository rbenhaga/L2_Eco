import { Routes, Route } from 'react-router-dom';
import { MicroLayout } from './layouts/MicroLayout';
import { MicroHome } from './pages/Home';
import { Chapter0 } from './pages/Chapter0';
import { Chapter1 } from './pages/Chapter1';
import { Chapter2 } from './pages/Chapter2';
import { Chapter3 } from './pages/Chapter3';
import { Chapter4 } from './pages/Chapter4';
import { Chapter5 } from './pages/Chapter5';
import { Chapter6 } from './pages/Chapter6';
import { Chapter7 } from './pages/Chapter7';
import { Annales } from './pages/Annales';
import { RevisionIntensive } from './pages/RevisionIntensive';
import { Methodes } from './pages/Methodes';
import { ExamenBlanc } from './pages/ExamenBlanc';
import { FicheExpress } from './pages/FicheExpress';

export function MicroRoutes() {
    return (
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
                {/* TD/QCM now integrated in ModuleHub via query params */}
                {/* <Route path="qcm" element={<QCM />} /> */}
                {/* <Route path="td" element={<TD />} /> */}
                <Route path="annales" element={<Annales />} />
                <Route path="fiches" element={<RevisionIntensive />} />
                <Route path="methodes" element={<Methodes />} />
                <Route path="examen-blanc" element={<ExamenBlanc />} />
                <Route path="fiche-express" element={<FicheExpress />} />
            </Route>
        </Routes>
    );
}
