import { View, Text, StyleSheet, Switch, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/auth/useAuth';
import { useTheme } from '../../context/theme/useTheme';
import Slider from '@react-native-community/slider';
import AnimatedText from '../../components/AnimatedText';

export default function SettingsScreen() {
    const { logout, isLoading } = useAuth();
    const { isDark, toggleTheme, darkOpacity, setDarkOpacity } = useTheme();

    const logoutHandler = async () => {
        try {
            await logout();
        } catch (err) {
            console.error('Logout error:', err.message);
            alert(err.message);
        } finally {

        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1' }}
            style={styles.background}
        >

            <View style={styles.overlay}>
                <AnimatedText text="Settings" styless={styles.title} />
                
                <View style={styles.setting}>
                    <Text style={styles.label}>Dark Mode</Text>
                    <Switch value={isDark} onValueChange={toggleTheme} />
                </View>
                <View style={styles.setting}>
                    <Text style={styles.label}>Language</Text>
                    <Text style={styles.value}>English</Text>
                </View>
                <View style={styles.sliderMode}>
                    {isDark && (<>
                        <Text style={styles.sliderText}>Dark Intensity: {Math.round(darkOpacity * 100)}%</Text>
                        <Slider minimumValue={0} maximumValue={1} step={0.05} value={darkOpacity} onValueChange={setDarkOpacity} />
                    </>)}
                </View>
                <TouchableOpacity style={[styles.button, { marginTop: isDark ? "54.52%" : "70%", }]} onPress={logoutHandler}>
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />)
                        : (
                            <Text style={styles.buttonText}>Logout</Text>
                        )}
                    {/* <Text style={styles.buttonText}>Logout</Text> */}
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', padding: 20 },
    title: { marginTop: 20, marginBottom: 20 },
    setting: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    label: { fontSize: 18, color: '#fff' },
    value: { fontSize: 18, color: '#ccc' },
    button: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FF6B6B',
        marginTop: "70%",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: '#FF6B6B',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 8,
    },

    sliderMode: {
        marginTop: 50,
    },

    sliderText: {
        color: '#fff',
        marginBottom: 10,
        alignSelf: 'center'
    },

    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});
