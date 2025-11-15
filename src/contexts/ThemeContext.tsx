import { Children, createContext, useContext, useEffect, useState } from "react";
import type { Theme, ThemeContextType } from "../types/types";

const ThemeContext = createContext<ThemeContextType | null>(null)
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    useEffect(() => {
        const saved = localStorage.getItem("theme") as Theme | null;
        if (saved) setTheme(saved);
    }, []);

    useEffect(() => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
    return ctx;
};