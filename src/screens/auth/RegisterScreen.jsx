import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default function RegisterScreen({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const registerHandler = () => {
    setIsLoggedIn(true);
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee' }} // desert background
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Register</Text>
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
        <TouchableOpacity style={styles.button} onPress={registerHandler}>
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
