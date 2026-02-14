import { createContext, useState } from "react";
import { authService } from "../../api/";
import { usePersistedState } from "../../hooks/usePersistedState.js";

export const AuthContext = createContext({
    isLoading: false,
    isAuthenticated: false,
    error: null,
    user: null,
    auth: null,
    login: async (email, password) => { },
    register: async (email, password, name) => { },
    clearError: () => { },
    logout: async () => { },
});

export function AuthProvider({ children }) {
    const [auth, setAuth] = usePersistedState("auth", {
        token: null,
        user: null,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        try {
            setIsLoading(true);
            const data = await authService.login(email, password, 0, 0);
            const user = data.user;
            const token = data.token;
            console.log("USER:", data);
            setAuth({ user, token });
        } catch (err) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    }
    const register = async (email, password, name) => {
        try {
            setIsLoading(true);
            const { user, token } = await authService.register(email, password, name);
            setAuth({ user, token });
        } catch (err) {
            setError(err.message || 'An error occurred during registration');
        }
        finally {
            setIsLoading(false);
        }
    }

    const logout = async () => {
        try {
            setIsLoading(true);
            const response = await authService.logout();
            setAuth({
                token: null,
                user: null,
            });
        } catch (err) {
            console.log("Can not log out! ",err.message);
        } finally {
            setIsLoading(false);
        }
    }

    const contextValue = {
        isAuthenticated: !!auth.user,
        isLoading,
        error,
        user: auth.user,
        auth,
        clearError: () => setError(null),
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
