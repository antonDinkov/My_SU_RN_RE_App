import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export default function ButtonWithActivity({ isLoading, name, onPress, styleButton, styleText }) {
    return (
        <TouchableOpacity style={styleButton} onPress={onPress}>
            {isLoading ? (
                <ActivityIndicator color="#fff" />)
                : (
                    <Text style={styleText}>{name}</Text>
                )}
        </TouchableOpacity>
    )
}