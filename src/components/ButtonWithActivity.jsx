import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export default function ButtonWithActivity({ isLoading, name, onpress, styleButton, styleText }) {
    return (
        <TouchableOpacity style={styleButton} onPress={onpress}>
            {isLoading ? (
                <ActivityIndicator color="#fff" />)
                : (
                    <Text style={styleText}>{name}</Text>
                )}
        </TouchableOpacity>
    )
}