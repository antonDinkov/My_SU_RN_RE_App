import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export default function ButtonWithActivity({ isLoading, name, onpress, styleButton, styleText }) {
    return (
        <TouchableOpacity style={styleButton} onPress={onpress}>
            {isLoading ? (
                <ActivityIndicator color="#fff" size="large" />)
                : (
                    <Text style={styleText}>{name}</Text>
                )}
        </TouchableOpacity>
    )
}