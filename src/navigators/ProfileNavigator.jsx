import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/main/ProfileScreen";
import EditProfileScreen from "../screens/main/EditProfileScreen";

export default function ProfileNavigator() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} options={{
                headerShown: true,
                headerTransparent: true,
                headerTitle: '',
                headerTintColor: "#fff",
            }} />
            <Stack.Screen name="Edit" component={EditProfileScreen} options={{
                headerShown: true,
                headerTransparent: true,
                headerTitle: '',
                headerTintColor: "#fff",
            }} />
        </Stack.Navigator>
    )
}