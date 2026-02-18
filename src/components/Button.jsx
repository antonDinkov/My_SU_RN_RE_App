import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Button ({name, onPress, style}) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.buttonText}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
    backgroundColor: '#007AFF',
    width: 200,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 30,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    alignSelf: "center"
  },
})