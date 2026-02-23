import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function usePersistedState(key, initialValue) {
    const [state, setState] = useState(initialValue);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load once
    useEffect(() => {
        async function loadState() {
            try {
                const storedValue = await AsyncStorage.getItem(key);
                if (storedValue) {
                    setState(JSON.parse(storedValue));
                }
            } catch (error) {
                console.error('Failed to load state', error);
            } finally {
                setIsHydrated(true);
            }
        }

        loadState();
    }, [key]);

    // Persist automatically on change
    useEffect(() => {
        if (isHydrated) {
            AsyncStorage.setItem(key, JSON.stringify(state))
                .catch(error => console.error('Failed to save state', error));
        }
    }, [state, isHydrated, key]);

    return [state, setState, isHydrated];
}



/* export function usePersistedState(key, initialValue) {
    const [state, setState] = useState(initialValue);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        async function loadState() {
            try {
                const storedValue = await AsyncStorage.getItem(key);
                console.log("This is the storedValue from the hook: ", storedValue);

                if (storedValue) {
                    setState(JSON.parse(storedValue));
                }

            } catch (error) {
                console.error('Failed to load state', error);
            } finally {
                setIsHydrated(true);
            }
        }

        loadState();
    }, [key]);

    const setPersistedState = async (value) => {
        try {
            const valueToStore = value instanceof Function ? value(state) : value;
            console.log("SETTING AUTH:", valueToStore);
            setState(valueToStore);
            await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error('Failed to save state', error);
        }
    };

    return [state, setPersistedState, isHydrated];
} */
