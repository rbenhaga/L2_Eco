import { Routes, Route } from 'react-router-dom';
import { MicroLayout } from './layouts/MicroLayout';
import { MicroHome } from './pages/Home';
import { Chapter1 } from './pages/Chapter1';
import { Chapter2 } from './pages/Chapter2';
import { Chapter3 } from './pages/Chapter3';
import { Chapter4 } from './pages/Chapter4';

export function MicroRoutes() {
    return (
        <Routes>
            <Route element={<MicroLayout />}>
                <Route index element={<MicroHome />} />
                <Route path="chapitre-1" element={<Chapter1 />} />
                <Route path="chapitre-2" element={<Chapter2 />} />
                <Route path="chapitre-3" element={<Chapter3 />} />
                <Route path="chapitre-4" element={<Chapter4 />} />
            </Route>
        </Routes>
    );
}
