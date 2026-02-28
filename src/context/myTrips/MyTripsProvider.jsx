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

            setMyTrips((oldstate) => [...oldstate, trip]);

            navigation.navigate('MyTrips');
            return trip;
        } catch (err) {
            console.log("This is the error: ", err.response.data.message);
            setError(err.response.data.message.length < 60 ? err.response.data.message: "Server error 500" || "Server error 500");
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