import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = () => {
    setIsLoggedIn(true);
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1' }} // city background
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
        <TouchableOpacity style={styles.button} onPress={loginHandler}>
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