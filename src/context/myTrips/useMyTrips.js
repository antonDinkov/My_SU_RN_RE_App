import { useContext } from "react";
import { TripsContext } from "./MyTripsProvider";

export function useMyTrips() {
    const context = useContext(TripsContext);

    return context;
}