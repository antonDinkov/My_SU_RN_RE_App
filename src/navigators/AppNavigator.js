import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "../screens/startApp/StartScreen";

export default function AppNavigator() {
    const Stack  = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome" component={StartScreen} />
        </Stack.Navigator>
    )
}