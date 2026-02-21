import { useState } from 'react';
import { View, Text, StyleSheet, Switch, ImageBackground, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/auth/useAuth';
import { useTheme } from '../../context/theme/useTheme';

export default function SettingsScreen() {
    const [notifications, setNotifications] = useState(true);
    const { logout } = useAuth();
    const {isDark, toggleTheme} = useTheme();

    const logoutHandler = async () => {
        try {
            await logout();
        } catch (err) {
            console.error('Logout error:', err.message);
            alert(err.message);
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1' }}
            style={styles.background}
        >
            
            <View style={styles.overlay}>
                <Text style={styles.title}>Settings</Text>
                <View style={styles.setting}>
                    <Text style={styles.label}>Notifications</Text>
                    <Switch value={notifications} onValueChange={setNotifications} />
                </View>
                <View style={styles.setting}>
                    <Text style={styles.label}>Dark Mode</Text>
                    <Switch value={isDark} onValueChange={toggleTheme} />
                </View>
                <View style={styles.setting}>
                    <Text style={styles.label}>Language</Text>
                    <Text style={styles.value}>English</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={logoutHandler}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', padding: 20 },
    title: { fontSize: 28, color: '#fff', fontWeight: 'bold', marginBottom: 20 },
    setting: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    label: { fontSize: 18, color: '#fff' },
    value: { fontSize: 18, color: '#ccc' },
    button: {
        width: 100,
        height: 100,
        borderRadius: 50, // половината от width/height
        backgroundColor: '#FF6B6B',
        marginTop: "70%",
        alignItems: 'center',
        justifyContent: 'center',

        alignSelf: 'center', // центрира хоризонтално
        marginBottom: 30,

        shadowColor: '#FF6B6B',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 8,
    },

    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});
