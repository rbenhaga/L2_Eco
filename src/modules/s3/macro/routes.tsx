import { Routes, Route } from 'react-router-dom';
import { MacroLayout } from './layouts/MacroLayout';
import {
    MacroHome,
    Chapter1,
    Chapter2,
    Chapter3,
    Chapter4,
    Revision,
    RevisionCh1,
    RevisionCh2,
    RevisionCh3,
    RevisionCh4,
    Simulations
} from './pages';

export function MacroRoutes() {
    return (
        <Routes>
            <Route element={<MacroLayout />}>
                <Route index element={<MacroHome />} />
                <Route path="chapitre-1" element={<Chapter1 />} />
                <Route path="chapitre-2" element={<Chapter2 />} />
                <Route path="chapitre-3" element={<Chapter3 />} />
                <Route path="chapitre-4" element={<Chapter4 />} />
                {/* TD/QCM now integrated in ModuleHub via query params */}
                {/* <Route path="exercices" element={<Exercices />} /> */}
                {/* <Route path="qcm" element={<QCM />} /> */}
                <Route path="revision" element={<Revision />} />
                <Route path="revision-ch1" element={<RevisionCh1 />} />
                <Route path="revision-ch2" element={<RevisionCh2 />} />
                <Route path="revision-ch3" element={<RevisionCh3 />} />
                <Route path="revision-ch4" element={<RevisionCh4 />} />
                <Route path="simulations" element={<Simulations />} />
            </Route>
        </Routes>
    );
}
