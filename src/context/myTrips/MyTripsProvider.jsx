import { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { tripService } from "../../api";

export const TripsContext = createContext({
    isLoading: false,
    error: null,
    myTrips: [],
    deletedMsg: '',
    clearError: () => { },
    clearDeletedMsg: () => { },
    createTrip: async () => { },
    getMyTrips: async () => { },
    deleteTrip: async () => { },
    updateTrip: async () => { }
})

export function MyTripsProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const [error, setError] = useState(null);
    const [myTrips, setMyTrips] = useState([]);
    const [deletedMsg, setDeletedMsg] = useState('');

    const createTrip = async (tripInfo) => {
        try {
            setIsLoading(true);
            console.log("This is before the response");

            const trip = await tripService.createTrip(tripInfo);
            console.log("This is inside the provider the response", trip);

            setMyTrips((oldstate) => [...oldstate, trip]);
            console.log("This is inside the provider the state", myTrips);

            navigation.navigate('MyTrips');
            return trip;
        } catch (err) {
            console.log(err.response.data);

            setError(err.response?.data?.message || "Server error 500");
            throw err;
        } finally {
            setIsLoading(false)
        }
    }

    const getMyTrips = async () => {
        try {
            setIsLoading(true);
            const trips = await tripService.getMyTrips();
            setMyTrips(trips);
            return trips;
        } catch (err) {
            setError(err.response?.data?.message || "Server error 500");
            throw err;
        } finally {
            setIsLoading(false)
        }
    }

    const deleteTrip = async (tripId) => {
        try {
            setIsLoading(true);
            const deleteResponse = await tripService.deleteTrip(tripId);
            setDeletedMsg(deleteResponse.message);
            setMyTrips(prev => prev.filter(trip => trip._id !== tripId));
            console.log(deleteResponse.message);

            return deleteResponse.message;
        } catch (err) {
            setError(err.response?.data?.message || "Server error 500");
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    const updateTrip = async (tripId, tripInfo) => {
        try {
            setIsLoading(true);
            const updatedTrip = await tripService.updateTrip(tripId, tripInfo);
            setMyTrips(prev =>
                prev.map(trip =>
                    trip._id === tripId ? updatedTrip : trip
                )
            );
            navigation.navigate('MyTrips');
            return updatedTrip;
        } catch (err) {
            setError(err.response?.data?.message || "Server error 500");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };



    const contextValue = {
        isLoading,
        error,
        myTrips,
        deletedMsg,
        clearError: () => setError(null),
        createTrip,
        getMyTrips,
        deleteTrip,
        clearDeletedMsg: () => setDeletedMsg(''),
        updateTrip,
    };

    return (
        <TripsContext.Provider value={contextValue}>
            {children}
        </TripsContext.Provider>
    );
}


/* const getFeaturedCountries = async () => {
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
    } */