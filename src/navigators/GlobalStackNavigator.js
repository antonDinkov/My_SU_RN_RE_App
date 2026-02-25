import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import MainNavigator from "./MainNavigator";
import DetailsScreen from "../screens/main/DetailsScreen";

export default function GlobalStackNavigator() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainNav" component={MainNavigator} />
            <Stack.Screen
                name="DetailsModal"
                component={DetailsScreen}
                options={{
                    presentation: 'modal',
                    title: '',
                    headerShown: true,
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerBackTitleVisible: false,
                    transitionSpec: {
                        open: { animation: 'timing', config: { duration: 400 } },
                        close: { animation: 'timing', config: { duration: 400 } },
                    },
                    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                }}
            />
        </Stack.Navigator>
    )
}