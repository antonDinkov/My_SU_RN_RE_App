import { createContext, useEffect, useState } from "react";
import { authService } from "../../api/";
import { usePersistedState } from "../../hooks/usePersistedState.js";
import { setAuthToken } from "../../api/client.js";


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
    const [auth, setAuth, isHydrated] = usePersistedState("auth", {
        token: null,
        user: null,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (auth.token) {
            setAuthToken(auth.token || null);
        }
    }, [auth.token]);

    if (!isHydrated) {
        return null;
    }

    const login = async (email, password) => {
        try {
            setIsLoading(true);
            
            const data = await authService.login(email, password, 0, 0);
            console.log("Login response:", data);

            const { user, token } = data;

            setAuth({ user, token });
            console.log("Auth set:", { user, token });

            setAuthToken(token);

        } catch (err) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    }
    const register = async (firstName, lastName, email, password, repass) => {
        try {
            setIsLoading(true);
            const { user, token } = await authService.register(firstName, lastName, email, password, repass, 0, 0);
            setAuth({ user, token });
            setAuthToken(token);
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
            setAuthToken(null)
        } catch (err) {
            console.log("Can not log out! ", err.message);
        } finally {
            setIsLoading(false);
        }
    }

    const contextValue = {
        isAuthenticated: !!auth.user,
        isLoading: isLoading || !isHydrated,
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
