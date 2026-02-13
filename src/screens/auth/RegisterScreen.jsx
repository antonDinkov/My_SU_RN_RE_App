import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default function RegisterScreen({ navigation, setIsLoggedIn }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const registerHandler = async (email, password, repeatPassword, firstName, lastName, lat, lng, setIsLoggedIn) => {
        try {
            const response = await fetch('https://travelfeverbe.onrender.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-lat': lat?.toString() || '0',
                    'x-user-lng': lng?.toString() || '0',
                },
                body: JSON.stringify({ email, password, repass: repeatPassword, firstName, lastName }),
                credentials: 'include', // за cookie
            });

            const data = await response.json();

            if (!response.ok) {
                // Покажи всички backend validation errors
                throw new Error(data.errors ? data.errors.join(', ') : 'Registration failed');
            }

            console.log('User registered', data.user);

            // Можеш да съхраниш token (ако го връща backend) в AsyncStorage
            // await AsyncStorage.setItem('token', data.token);

            // Логваме потребителя в апликацията
            setIsLoggedIn(true);

            return data.user;

        } catch (err) {
            console.error(err.message);
            alert(err.message);
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee' }}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>Register</Text>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#ccc"
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#ccc"
                    value={lastName}
                    onChangeText={setLastName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#ccc"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#ccc"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Repeat Password"
                    placeholderTextColor="#ccc"
                    secureTextEntry
                    value={repeatPassword}
                    onChangeText={setRepeatPassword}
                />
                <TouchableOpacity style={styles.button} onPress={() => registerHandler(email, password, repeatPassword, firstName, lastName, 0, 0, setIsLoggedIn)}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Already have an account?!</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1, resizeMode: 'cover' },
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20, textAlign: 'center' },
    input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginVertical: 8 },
    button: { backgroundColor: '#FF6B6B', padding: 15, borderRadius: 8, marginTop: 20, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    link: { color: '#fff', marginTop: 20, textAlign: 'center', textDecorationLine: 'underline' },
});
