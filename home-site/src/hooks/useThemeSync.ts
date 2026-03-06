import { useEffect } from "react";

/**
 * Forces light mode permanently
 * App is light-first (study-grade design)
 */
export function useThemeSync(forceLight: boolean = true) {
  useEffect(() => {
    if (!forceLight) return;
    
    const root = document.documentElement;
    
    // Force light mode
    root.classList.remove("dark");
    root.classList.add("light");
    root.dataset.theme = "light";
    root.style.colorScheme = "light";
  }, [forceLight]);
}
