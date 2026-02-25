import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/auth/AuthScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import StartScreen from "../screens/auth/StartScreen";

export default function AuthNavigator() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="Welcome" component={StartScreen} options={{ headerTransparent: true, headerTitle: '', headerTintColor: '#fff' }} />
            <Stack.Screen name="Auth" component={AuthScreen} options={{ headerTransparent: true, headerTitle: '', headerTintColor: '#fff' }} />
            <Stack.Screen name="Login" options={{
                headerStyle: { backgroundColor: '#000' },
                headerTintColor: '#fff',
                headerTitleStyle: { color: '#fff' },
            }}>{(props) => (
                <LoginScreen
                    {...props}
                />
            )}</Stack.Screen>
            <Stack.Screen name="Register" options={{
                headerStyle: { backgroundColor: '#000' },
                headerTintColor: '#fff',
                headerTitleStyle: { color: '#fff' },
            }}>
                {(props) => (
                    <RegisterScreen
                        {...props}
                    />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    )
}