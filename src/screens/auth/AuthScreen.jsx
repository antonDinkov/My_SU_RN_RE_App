import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export default function AuthScreen({ navigation }) {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to Travel Fever</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.registerButton]} 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // леко затъмнение за контраст
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginVertical: 10,
  },
  registerButton: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
