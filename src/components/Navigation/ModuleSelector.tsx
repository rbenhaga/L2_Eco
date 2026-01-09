/**
 * ModuleSelector - Pill-style Module Switcher
 * 
 * Clean pill buttons for switching between modules.
 * Active state with subtle background.
 */

import { useLocation, Link } from 'react-router-dom';

interface Module {
    id: string;
    name: string;
    path: string;
}

const modules: Module[] = [
    { id: 'macro', name: 'Macro', path: '/macro' },
    { id: 'micro', name: 'Micro', path: '/micro' },
    { id: 'stats', name: 'Stats', path: '/stats' },
    { id: 'socio', name: 'Socio', path: '/socio' },
];

export function ModuleSelector() {
    const location = useLocation();

    // Determine active module from current path
    const activeModule = modules.find(m => location.pathname.startsWith(m.path))?.id;

    return (
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-slate-100/50 dark:bg-white/5">
            {modules.map(module => {
                const isActive = activeModule === module.id;

                return (
                    <Link
                        key={module.id}
                        to={module.path}
                        className={`
              px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150
              no-underline
              ${isActive
                                ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
                            }
            `}
                    >
                        {module.name}
                    </Link>
                );
            })}
        </div>
    );
}
