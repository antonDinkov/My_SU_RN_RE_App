import { createContext, useState } from "react";

export const DarkThemeContext = createContext({
    isDark: false,
    toggleTheme: () => {},
});

export const DarkThemeProvider = ({children}) => {
    const [isDark, setIsDark] = useState(false);
    
    const toggleTheme = (newValue) => setIsDark(newValue);

    const contextValue ={
        isDark,
        toggleTheme,
    }
    return <DarkThemeContext.Provider value={contextValue}>{children}</DarkThemeContext.Provider>
};