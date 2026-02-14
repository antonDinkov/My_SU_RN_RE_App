import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import { useAuth } from "../context/auth/useAuth";

export default function AppNavigator() {
    const { isAuthenticated } = useAuth();

    return (
        isAuthenticated ? <MainNavigator /> : <AuthNavigator />
    );
}