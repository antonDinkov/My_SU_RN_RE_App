import { StyleSheet, View } from "react-native";
import { useTheme } from "../context/theme/useTheme";

export default function ThemeLayout({children}) {
    const {isDark} = useTheme();
    return (
        <View style={{flex: 1}}>
            {children}
            {isDark && (<View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' }} pointerEvents="none" />)}
        </View>
    )
}