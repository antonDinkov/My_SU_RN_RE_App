import { useContext } from "react";
import { DataContext } from "./DataProvider";

export function useData() {
    const context = useContext(DataContext);

    return context;
}