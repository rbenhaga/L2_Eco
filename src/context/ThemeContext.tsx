import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

interface ThemeProviderState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
    theme: "light",
    setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme: _defaultTheme = "light",
    storageKey: _storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => {
        // For now, always return light - app is light-first
        // Dark mode support can be added later
        return "light";
    });
    
    // Suppress unused variable warnings (will be used when dark mode is implemented)
    void _defaultTheme;
    void _storageKey;

    // Suppress unused setTheme warning (theme is read-only for now)
    void setTheme;

    useEffect(() => {
        const root = window.document.documentElement;
        
        // Always force light mode for now (study-grade design)
        root.classList.remove("dark");
        root.classList.add("light");
        root.dataset.theme = "light";
        root.style.colorScheme = "light";
    }, [theme]);

    const value = {
        theme,
        setTheme: (_newTheme: Theme) => {
            // For now, ignore theme changes - app is light-only
            // localStorage.setItem(storageKey, _newTheme);
            // setTheme(_newTheme);
        },
    };

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};
