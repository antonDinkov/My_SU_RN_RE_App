import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export default function StartScreen({ navigation }) {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Travel Fever</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Auth')}
        >
          <Text style={styles.buttonText}>Start Your Journey</Text>
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
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 100,
  },
  button: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});






/* import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function StartScreen({ onStart }) {
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>TravelMate</Text>
        <Text style={styles.subtitle}>
          Discover places.{'\n'}Plan memories.
        </Text>
      </View>

      <Pressable style={styles.button} onPress={onStart}>
        <Text style={styles.buttonText}>Start your journey</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B3C49', // travel / ocean vibe
    justifyContent: 'space-between',
    padding: 32,
  },
  textWrapper: {
    marginTop: 120,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#E0F2F1',
    lineHeight: 26,
  },
  button: {
    backgroundColor: '#FFB703', // warm accent
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
}); */