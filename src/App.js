import { StatusBar, StyleSheet } from "react-native";
import AppNavigator from "./navigators/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/auth/AuthProvider";

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <StatusBar style="auto" />
                <AppNavigator />
            </NavigationContainer>
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
