import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Button from '../../components/Button';

export default function AuthScreen({ navigation }) {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to Travel Fever</Text>
        <Button name="Login" onPress={() => navigation.navigate('Login')} />
        <Button name="Register" onPress={() => navigation.navigate('Register')} style={{backgroundColor: '#FF6B6B'}} />
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
});
