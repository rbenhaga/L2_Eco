import { Routes, Route } from 'react-router-dom';
import { StatsLayout } from './layouts/StatsLayout';
import { StatsHome } from './pages/Home';
import { Chapter1 } from './pages/Chapter1';
import { Chapter2 } from './pages/Chapter2';
import { Chapter3 } from './pages/Chapter3';
import { Chapter4 } from './pages/Chapter4';

export function StatsRoutes() {
    return (
        <Routes>
            <Route element={<StatsLayout />}>
                <Route index element={<StatsHome />} />
                <Route path="chapitre-1" element={<Chapter1 />} />
                <Route path="chapitre-2" element={<Chapter2 />} />
                <Route path="chapitre-3" element={<Chapter3 />} />
                <Route path="chapitre-4" element={<Chapter4 />} />
            </Route>
        </Routes>
    );
}
