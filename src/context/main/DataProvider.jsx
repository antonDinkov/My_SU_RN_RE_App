import { createContext, useState } from "react";
import { dataService } from "../../api";



export const DataContext = createContext({
    isLoading: false,
    getFeaturedCountries: async () => {},
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

    const contextValue = {
        getFeaturedCountries,
    };

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
}
