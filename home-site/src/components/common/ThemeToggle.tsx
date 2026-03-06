import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => {
                if (theme === 'dark') {
                    setTheme('light');
                } else if (theme === 'light') {
                    setTheme('dark');
                } else {
                    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    setTheme(isSystemDark ? 'light' : 'dark');
                }
            }}
            className="relative p-2 rounded-full transition-colors duration-75"
            style={{
                background: 'transparent',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-surface-hover)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
            }}
            title="Basculer le thème"
        >
            <div className="relative w-5 h-5">
                <Sun
                    size={20}
                    className="absolute top-0 left-0 transition-all duration-75 rotate-0 scale-100"
                    style={{ color: 'var(--color-warning)' }}  /* Amber 500 - visible in both modes */
                />
                <Moon
                    size={20}
                    className="absolute top-0 left-0 transition-all duration-75 rotate-90 scale-0"
                    style={{ color: 'var(--color-accent)' }}  /* Accent red - matches theme */
                />
            </div>
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
