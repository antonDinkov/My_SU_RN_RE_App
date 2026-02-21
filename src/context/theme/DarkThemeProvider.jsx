import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const DarkThemeContext = createContext({
    isDark: false,
    darkOpacity: 0.4,
    toggleTheme: () => {},
    setDarkOpacity: () => {},
});

export const DarkThemeProvider = ({children}) => {
    const [isDark, setIsDark] = useState(false);
    const [darkOpacity, setDarkOpacity] = useState(0.4);

    useEffect(() => {
        const loadSettings = async () => {
            const savedDark = await AsyncStorage.getItem("isDark");
            const savedOpacity = await AsyncStorage.getItem("darkOpacity");
            if (savedDark !== null) setIsDark(savedDark === "true");
            if (savedOpacity !== null) setDarkOpacity(parseFloat(savedOpacity));
        };
        loadSettings();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem("isDark", isDark.toString());
        AsyncStorage.setItem("darkOpacity", darkOpacity.toString());
    }, [isDark, darkOpacity]);
    
    const toggleTheme = (newValue) => setIsDark(newValue);

    const contextValue ={
        isDark,
        darkOpacity,
        toggleTheme,
        setDarkOpacity,
    }
    return <DarkThemeContext.Provider value={contextValue}>{children}</DarkThemeContext.Provider>
};