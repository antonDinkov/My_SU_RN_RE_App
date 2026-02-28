import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/main/HomeScreen";
import SettingsScreen from "../screens/main/SettingsScreen";
import FavoritesScreen from "../screens/main/FavoritesScreen";
import MyTripsNavigator from "./MyTripsNavigator";
import ProfileNavigator from "./ProfileNavigator";

export default function MainNavigator({ setIsLoggedIn }) {
    const Tabs = createBottomTabNavigator();

    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "MyTripsNav") {
                        iconName = focused ? "earth" : "earth-outline";
                    } else if (route.name === "ProfileNav") {
                        iconName = focused ? "person" : "person-outline";
                    } else if (route.name === "Settings") {
                        iconName = focused ? "settings" : "settings-outline";
                    } else if (route.name === "Favorites") {
                        iconName = focused ? "star" : "star-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#FF6B6B",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tabs.Screen name="Home">
                {(props) => (
                    <HomeScreen
                        {...props}
                        setIsLoggedIn={setIsLoggedIn}
                    />
                )}
            </Tabs.Screen>
            <Tabs.Screen name="Favorites" component={FavoritesScreen} />
            <Tabs.Screen name="MyTripsNav" component={MyTripsNavigator} options={{title: "My Trips"}} />
            <Tabs.Screen name="ProfileNav" component={ProfileNavigator} />
            <Tabs.Screen name="Settings" component={SettingsScreen} />
        </Tabs.Navigator>
    );
}