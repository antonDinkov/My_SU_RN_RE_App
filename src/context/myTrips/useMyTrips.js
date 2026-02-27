import { useContext } from "react";
import { TripsContext } from "./MyTripsProvider";

export function useData() {
    const context = useContext(TripsContext);

    return context;
}