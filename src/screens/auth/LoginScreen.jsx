import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../../context/auth/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { validate } from '../utils/authValidation';
import ServerError from '../../components/ServerError';

export default function LoginScreen({ navigation, setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { login, isLoading, error, clearError, isAuthenticated } = useAuth();
    const [serverError, setServerError] = useState();

    const loginHandler = async () => {
        clearError();

        const isValid = validate.login(setErrors, {
            email,
            password
        });

        if (!isValid) return;

        try {
            await login(email, password);
        } catch (err) {
            console.log('LOGIN FAILED');
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
                        source={{ uri: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1' }}
                        style={styles.background}
                    >
                        <View style={styles.overlay}>
                            <ServerError message={error} onClose={() => clearError()} />
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

                            <TouchableOpacity style={styles.button} onPress={loginHandler}>
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text style={styles.link}>Not registered yet?!</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginVertical: 8,
        color: "black"
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginBottom: 4,
        marginLeft: 4,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    link: {
        color: '#fff',
        marginTop: 20,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});