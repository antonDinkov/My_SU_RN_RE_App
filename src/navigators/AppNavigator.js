import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import { useAuth } from "../context/auth/useAuth";
import ThemeLayout from "../components/ThemeLayout";

export default function AppNavigator() {
    const { isAuthenticated } = useAuth();

    return (
        <ThemeLayout>
            {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
        </ThemeLayout>
    );
}