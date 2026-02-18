import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const RadioButton = ({ label, value, selected, onSelect }) => {

    const isSelected = selected === value;

    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => onSelect(value)}
            activeOpacity={0.7}
        >
            <View style={[
                styles.outer,
                isSelected && styles.outerSelected
            ]}>
                {isSelected && <View style={styles.inner} />}
            </View>

            <Text style={[
                styles.label,
                isSelected && styles.labelSelected
            ]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
    },

    outer: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#aaa',
        alignItems: 'center',
        justifyContent: 'center',
    },

    outerSelected: {
        borderColor: '#FF6B6B',
    },

    inner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#FF6B6B',
    },

    label: {
        marginLeft: 8,
        fontSize: 15,
        color: '#ccc',
    },

    labelSelected: {
        color: '#fff',
        fontWeight: '600',
    },
});
