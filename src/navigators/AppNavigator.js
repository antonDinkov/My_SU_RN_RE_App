import AuthNavigator from "./AuthNavigator";
import { useAuth } from "../context/auth/useAuth";
import ThemeLayout from "../components/ThemeLayout";
import GlobalStackNavigator from "./GlobalStackNavigator";

export default function AppNavigator() {
    const { isAuthenticated } = useAuth();

    return (
        <ThemeLayout>
            {isAuthenticated ? <GlobalStackNavigator /> : <AuthNavigator />}
        </ThemeLayout>
    );
}