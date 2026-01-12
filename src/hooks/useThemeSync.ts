import { useEffect } from "react";

/**
 * Forces dark mode permanently
 * App is dark-only, with Paper Canvas for reading courses
 */
export function useThemeSync(forceDark: boolean = true) {
  useEffect(() => {
    if (!forceDark) return;
    
    const root = document.documentElement;
    
    // Force dark mode
    root.classList.add("dark");
    root.dataset.theme = "dark";
    root.style.colorScheme = "dark";
  }, [forceDark]);
}
