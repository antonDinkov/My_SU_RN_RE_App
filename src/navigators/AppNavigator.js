import { useState } from "react";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
export default function AppNavigator() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        isLoggedIn ? <MainNavigator  setIsLoggedIn={setIsLoggedIn} /> : <AuthNavigator setIsLoggedIn={setIsLoggedIn} />
    );
}