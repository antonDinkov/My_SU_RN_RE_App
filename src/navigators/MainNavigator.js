import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/main/HomeScreen";

export default function MainNavigator({ setIsLoggedIn }) {
    const Tabs = createBottomTabNavigator();
    return (
        <Tabs.Navigator>
            <Tabs.Screen name="Home">
                {(props) => (
                    <HomeScreen
                        {...props}
                        setIsLoggedIn={setIsLoggedIn}
                    />
                )}
            </Tabs.Screen>
        </Tabs.Navigator>
    )
}