import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useAuth } from '../../context/auth/useAuth';

export default function LoginScreen({ navigation, setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { login, isLoading, error, clearError, isAuthenticated } = useAuth();

    const validate = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 4) {
            newErrors.password = 'Password must be at least 4 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const loginHandler = async () => {
        try {
        clearError();
        if (!validate()) return;

        await login(email, password);
    } catch (err) {
        console.log('LOGIN FAILED', err);
    }
    };

    /* const loginHandler = async (email, password, lat, lng, setIsLoggedIn) => {
      try {
              const response = await fetch('https://travelfeverbe.onrender.com/login', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'x-user-lat': lat?.toString() || '0',
                      'x-user-lng': lng?.toString() || '0',
                  },
                  body: JSON.stringify({ email, password }),
                  credentials: 'include', // за cookie
              });
  
              const data = await response.json();
  
              if (!response.ok) {
                  // Покажи всички backend validation errors
                  throw new Error(data.errors ? data.errors.join(', ') : 'Login failed');
              }
  
              console.log('User logged in', data.user);
  
              // Можеш да съхраниш token (ако го връща backend) в AsyncStorage
              // await AsyncStorage.setItem('token', data.token);
  
              // Логваме потребителя в апликацията
              setIsLoggedIn(true);
  
              return data.user;
  
          } catch (err) {
              console.error(err.message);
              alert(err.message);
          }
    } */

    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1' }}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>Login</Text>
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
                <TouchableOpacity style={styles.button} onPress={() => loginHandler()}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.link}>Not registered yet?!</Text>
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
    button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, marginTop: 20, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    link: { color: '#fff', marginTop: 20, textAlign: 'center', textDecorationLine: 'underline' },
});