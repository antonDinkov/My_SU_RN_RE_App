import { createContext, useState } from "react";
import { dataService } from "../../api";
import { useNavigation } from "@react-navigation/native";



export const DataContext = createContext({
    isLoading: false,
    error: false,
    errorSearch: false,
    favorites: [],
    getFeaturedCountries: async () => {},
    getSearchResults: async () => {},
    addToFavorites: async () => {},
    isItFavorite: async () => {},
    getFavorites: async () => {},
    removeFromFavorites: async () => {},
    detailsHandler: () => {},
    clearError: () => {},
    clearErrorSearch: () => {},
})

export function DataProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);
    const [errorSearch, setErrorSearch] = useState(null);

    const getFeaturedCountries = async () => {
        try {
            setIsLoading(true);
            const data = await dataService.getFeateredCountries();
            return data;
        } catch (err) {
            setError(err.response?.data?.message || "Server error 500");
            throw err;
        } finally {
            setIsLoading(false)
        }
    }

    const getSearchResults = async (text, type) => {
        try {
            setIsLoading(true);
            const data = await dataService.getSearchResults(text, type);
            return data;
        } catch (err) {
            setErrorSearch(err.response?.data?.message || "Server error 500");
            throw err;
        } finally {
            setIsLoading(false)
        }
    }

    const addToFavorites = async (userId, itemId, type) => {
        try {
            setIsLoading(true);
            const data = await dataService.addToFavorites(userId, itemId, type);
            const getFav = await getFavorites(userId);
            setFavorites(getFav);
            return data;
        } catch (err) {
            console.log(("No success, try again later. Error: ", err));
        } finally {
            setIsLoading(false)
        }
    }

    const isItFavorite = async (userId, itemId) => {
        try {
            setIsLoading(true);
            const data = await dataService.isItFavorite(userId, itemId);
            return data;
        } catch (err) {
            console.log(("No success, try again later. Error: ", err));
        } finally {
            setIsLoading(false)
        }
    }

    const getFavorites = async (userId) => {
        try {
            setIsLoading(true);
            const data = await dataService.getFavorites(userId);
            setFavorites(data);
            return data;
        } catch (err) {
            console.log(("No success, try again later. Error: ", err));
        } finally {
            setIsLoading(false)
        }
    }

    const removeFromFavorites = async (userId, itemId) => {
        try {
            setIsLoading(true);
            const data = await dataService.removeFromFavotites(userId, itemId);
            const getFav = await getFavorites(userId);
            setFavorites(getFav);
            return data;
        } catch (err) {
            console.log(("No success, try again later. Error: ", err));
        } finally {
            setIsLoading(false)
        }
    }

    const detailsHandler = (item) => {
        navigation.navigate('DetailsModal', { item });
    }

    const contextValue = {
        getFeaturedCountries,
        getSearchResults,
        addToFavorites,
        isItFavorite,
        getFavorites,
        removeFromFavorites,
        detailsHandler,
        clearError: () => setError(null),
        clearErrorSearch: () => setErrorSearch(null),
        favorites,
        isLoading,
        error,
        errorSearch,
    };

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
}
