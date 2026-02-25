import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../../context/auth/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { validate } from '../utils/authValidation';
import ServerError from '../../components/ServerError';

export default function RegisterScreen({ navigation, setIsLoggedIn }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { register, error, clearError } = useAuth();


    const registerHandler = async () => {
        clearError();

        const isValid = validate.register(setErrors, {
            firstName,
            lastName,
            email,
            password,
            repeatPassword
        });

        console.log(isValid);
        if (!isValid) return;
        

        await register(firstName, lastName, email, password, repeatPassword);
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
                            <ServerError message={error} onClose={() => clearError()} />
                            {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}
                            <TextInput
                                style={styles.input}
                                placeholder="First Name"
                                placeholderTextColor="#ccc"
                                value={firstName}
                                onChangeText={(text) => {
                                    setFirstName(text);
                                    validate.firstName(setErrors, text)
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
                                    validate.lastName(setErrors, text)
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
                                    validate.email(setErrors, text)
                                }}
                            />

                            {errors.password && <Text style={styles.error}>{errors.password}</Text>}
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#ccc"
                                secureTextEntry={true}
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    validate.password(setErrors, text)
                                }}
                            />

                            {errors.repeatPassword && <Text style={styles.error}>{errors.repeatPassword}</Text>}
                            <TextInput
                                style={styles.input}
                                placeholder="Repeat Password"
                                placeholderTextColor="#ccc"
                                secureTextEntry={true}
                                value={repeatPassword}
                                onChangeText={(text) => {
                                    setRepeatPassword(text);
                                    validate.repeatPassword(setErrors, password, text)
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
    input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginVertical: 8, color: "black" },
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