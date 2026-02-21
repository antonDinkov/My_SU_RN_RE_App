import { useContext } from "react";
import { DarkThemeContext } from "./DarkThemeProvider";

export function useTheme() {
    const context = useContext(DarkThemeContext);
    return context;
}