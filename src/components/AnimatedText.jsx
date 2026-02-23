import { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

export default function AnimatedText({ text, styless }) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <View>
            <Animated.Text
                style={[
                    styles.textSize,
                    { transform: [{ scale: scaleAnim }] },
                    styless
                ]}
            >
                {text}
            </Animated.Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textSize: {
        fontSize: 30,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 6,
        textAlign: 'center'
    },
});