import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyTripsScreen from "../screens/main/MyTripsScreen";
import CreateTripScreen from "../screens/main/CreateTripScreen";
import EditTripScreen from "../screens/main/EditTripScreen";
import PictureScreen from "../screens/main/PictureScreen";

export default function MyTripsNavigator() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={({ route }) => ({
                headerShown: false,})}>
            <Stack.Screen name="MyTrips" component={MyTripsScreen} />
            <Stack.Screen name="CreateTrip" component={CreateTripScreen} options={{
                headerShown: true,
                headerTransparent: true,
                headerTitle: '',
                headerTintColor: "#fff",
            }} />
            <Stack.Screen name="EditTrip" component={EditTripScreen} options={{
                headerShown: true,
                headerTransparent: true,
                headerTitle: '',
                headerTintColor: "#fff",
            }} />
            <Stack.Screen name="Picture" component={PictureScreen} options={{
                headerShown: true,
                headerTransparent: true,
                headerTitle: '',
                headerTintColor: "#fff",
            }} />
        </Stack.Navigator>
    )
}