import { createContext, useState } from "react";
import { dataService } from "../../api";
import { addToFavorites } from "../../api/main";



export const DataContext = createContext({
    isLoading: false,
    getFeaturedCountries: async () => {},
    getSearchResults: async () => {},
    addToFavorites: async () => {},
})

export function DataProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);

    const getFeaturedCountries = async () => {
        try {
            setIsLoading(true);
            const data = await dataService.getFeateredCountries();
            return data;
        } catch (err) {
            console.log("Error loading data: ", err);
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
            console.log("Error loading data: ", err);
        } finally {
            setIsLoading(false)
        }
    }

    const addToFavorites = async (userId, itemId, type) => {
        try {
            setIsLoading(true);
            const data = await dataService.addToFavorites(userId, itemId, type);
            return data;
        } catch (err) {
            console.log(("No success, try again later. Error: ", err));
        } finally {
            setIsLoading(false)
        }
    }

    const contextValue = {
        getFeaturedCountries,
        getSearchResults,
        addToFavorites,
    };

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
}
