import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/auth/AuthScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

export default function AuthNavigator() {
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="Auth" component={AuthScreen} options={{headerTransparent: true, headerTitle: '', headerTintColor: '#fff'}} />
            <Stack.Screen name="Login" component={LoginScreen} options={{headerTransparent: true, headerTitle: '', headerTintColor: '#fff'}} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerTransparent: true, headerTitle: '', headerTintColor: '#fff'}} />
        </Stack.Navigator>
    )
}