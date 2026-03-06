import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    // Simple toggle: light ↔ dark
    const handleToggle = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const isDark = theme === "dark";

    return (
        <button
            onClick={handleToggle}
            className="relative p-2.5 rounded-xl transition-all duration-200
                       bg-transparent hover:bg-black/5 dark:hover:bg-[var(--color-bg-raised)]/10
                       active:scale-95"
            title={isDark ? "Mode sombre" : "Mode clair"}
            aria-label="Changer de thème"
        >
            <div className="relative w-5 h-5">
                {/* Sun icon - visible in light mode */}
                <Sun
                    size={20}
                    className={`absolute top-0 left-0 transition-all duration-300
                        ${isDark
                            ? "opacity-0 rotate-90 scale-0"
                            : "opacity-100 rotate-0 scale-100"
                        }`}
                    style={{ color: isDark ? undefined : 'var(--color-warning)' }}
                />
                {/* Moon icon - visible in dark mode */}
                <Moon
                    size={20}
                    className={`absolute top-0 left-0 transition-all duration-300
                        ${isDark
                            ? "opacity-100 rotate-0 scale-100"
                            : "opacity-0 -rotate-90 scale-0"
                        }`}
                    style={{ color: isDark ? 'var(--color-accent)' : undefined }}
                />
            </div>

            <span className="sr-only">
                {isDark ? "Mode sombre" : "Mode clair"}
            </span>
        </button>
    );
}

// Compact version for tight spaces
export function ThemeToggleCompact() {
    const { theme, setTheme } = useTheme();

    const handleToggle = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const isDark = theme === "dark";

    return (
        <button
            onClick={handleToggle}
            className="p-1.5 rounded-lg transition-colors
                       hover:bg-black/5 dark:hover:bg-[var(--color-bg-raised)]/10"
            title={isDark ? "Sombre" : "Clair"}
        >
            {isDark ? (
                <Moon size={16} style={{ color: 'var(--color-accent)' }} />
            ) : (
                <Sun size={16} style={{ color: 'var(--color-warning)' }} />
            )}
        </button>
    );
}
