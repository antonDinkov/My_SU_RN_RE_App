import { StyleSheet } from "react-native";
import AppNavigator from "./navigators/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/auth/AuthProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { DataProvider } from "./context/main/DataProvider";
import { DarkThemeProvider, ThemeProvider } from "./context/theme/DarkThemeProvider";


export default function App() {
    useEffect(() => {
        AsyncStorage.clear();
    }, []);
    return (

        <AuthProvider>
            <DarkThemeProvider>
                <NavigationContainer>
                    <DataProvider>
                        <StatusBar style="light" backgroundColor="#000" />
                        <AppNavigator />
                    </DataProvider>
                </NavigationContainer>
            </DarkThemeProvider>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
