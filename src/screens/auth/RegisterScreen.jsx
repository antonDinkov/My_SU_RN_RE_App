import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../../context/auth/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen({ navigation, setIsLoggedIn }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { register, clearError } = useAuth();

    const validate = () => {
        const newErrors = {};

        if (!firstName.trim()) {
            newErrors.firstName = 'First name is required';
        } else if (firstName.trim().length < 4) {
            newErrors.firstName = 'First name must be at least 4 characters';
        }

        if (!lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        } else if (lastName.trim().length < 4) {
            newErrors.lastName = 'Last name must be at least 4 characters';
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (email.trim().length < 10) {
            newErrors.email = 'Email must be at least 10 characters';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else {
            if (password.length < 4) {
                newErrors.password = 'Password must be at least 4 characters';
            }
            if (!/[A-Z]/.test(password)) {
                newErrors.password = 'Password must contain at least one uppercase letter';
            }
            if (!/[0-9]/.test(password)) {
                newErrors.password = 'Password must contain at least one number';
            }
        }

        if (!repeatPassword) {
            newErrors.repeatPassword = 'Please repeat your password';
        } else if (repeatPassword !== password) {
            newErrors.repeatPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const registerHandler = async (firstName, lastName, email, password, repeatPassword) => {
        try {
            clearError();
            if (!validate()) return;

            await register(firstName, lastName, email, password, repeatPassword);
        } catch (err) {
            console.log('REGISTER FAILED', err);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 80}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" >
                    <ImageBackground
                        source={{ uri: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee' }}
                        style={styles.background}
                    >
                        <View style={styles.overlay}>
                            {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}
                            <TextInput
                                style={styles.input}
                                placeholder="First Name"
                                placeholderTextColor="#ccc"
                                value={firstName}
                                onChangeText={(text) => {
                                    setFirstName(text);
                                    validate()
                                }}
                            />

                            {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
                            <TextInput
                                style={styles.input}
                                placeholder="Last Name"
                                placeholderTextColor="#ccc"
                                value={lastName}
                                onChangeText={(text) => {
                                    setLastName(text);
                                    validate()
                                }}
                            />

                            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#ccc"
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    validate()
                                }}
                            />

                            {errors.password && <Text style={styles.error}>{errors.password}</Text>}
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#ccc"
                                secureTextEntry
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    validate()
                                }}
                            />

                            {errors.repeatPassword && <Text style={styles.error}>{errors.repeatPassword}</Text>}
                            <TextInput
                                style={styles.input}
                                placeholder="Repeat Password"
                                placeholderTextColor="#ccc"
                                secureTextEntry
                                value={repeatPassword}
                                onChangeText={(text) => {
                                    setRepeatPassword(text);
                                    validate()
                                }}
                            />

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => registerHandler(firstName, lastName, email, password, repeatPassword)}
                            >
                                <Text style={styles.buttonText}>Register</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.link}>Already have an account?!</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    background: { flex: 1, resizeMode: 'cover' },
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20, textAlign: 'center' },
    input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginVertical: 8 },
    error: {
        color: 'red',
        fontSize: 12,
        marginBottom: 4,
        marginLeft: 4
    },
    button: { backgroundColor: '#FF6B6B', padding: 15, borderRadius: 8, marginTop: 20, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    link: { color: '#fff', marginTop: 20, textAlign: 'center', textDecorationLine: 'underline' },
});






{/* <View style={styles.overlay}>
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
                        <TouchableOpacity style={styles.button} onPress={() => registerHandler(firstName, lastName, email, password, repeatPassword)}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.link}>Already have an account?!</Text>
                        </TouchableOpacity>
                    </View> */}