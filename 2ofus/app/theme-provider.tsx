"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

export type Palette = "dew" | "bloom" | "tide" | "slate" | "ember";
export type Theme = "light" | "dark";

type ThemeContextType = {
    palette: Palette;
    theme: Theme;
    setPalette: (palette: Palette) => void;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const validPalettes: Palette[] = [
        "dew", "bloom", "tide", "slate", "ember",
    ];
    const [palette, setPalette] = useState<Palette>("ember");
    const [theme, setTheme] = useState<Theme>("light");
    const [ready, setReady] = useState(false);

    // Load saved preferences.
    useEffect(() => {
        const savedPalette = localStorage.getItem("palette");
        const savedTheme = localStorage.getItem("theme");

        if (validPalettes.includes(savedPalette as Palette)) {
            setPalette(savedPalette as Palette);
        }

        if (savedTheme === "light" || savedTheme === "dark") {
            setTheme(savedTheme);
        }

        setReady(true);
    }, []);

    // Apply preferences to the HTML element.
    useEffect(() => {
        if (!ready) return;

        const root = document.documentElement;

        root.dataset.palette = palette;
        root.dataset.theme = theme;

        localStorage.setItem("palette", palette);
        localStorage.setItem("theme", theme);
    }, [palette, theme, ready]);

    function toggleTheme() {
        setTheme((current) =>
            current === "light" ? "dark" : "light"
        );
    }

    return (
        <ThemeContext.Provider
            value={{ palette, theme, setPalette, setTheme, toggleTheme }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeSettings() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            "useThemeSettings must be used inside ThemeProvider"
        );
    }

    return context;
}