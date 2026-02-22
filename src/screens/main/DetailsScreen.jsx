import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';

export default function DetailsScreen() {
  const item = {
    name: "Marchela",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s",
    location: "Zambia",
    description: "Some description"
  }//route.params; // получаваш данните от навигацията

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          source={{ uri: item.imageUrl }}
          style={styles.background}
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.location}</Text>

            <View style={styles.detailsContainer}>
              <Text style={styles.description}>{item.description}</Text>
              <Button 
                onPress={() => console.log("Hello from the details screen")} 
                name="Back" 
                style={styles.button} 
              />
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginTop: 20,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    borderRadius: 16,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "lightgreen",
    opacity: 0.8,
    paddingVertical: 10,
  },
});
