import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedText from "../../components/AnimatedText";
import Button from "../../components/Button";


export default function CreateTripScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
            <ImageBackground
                source={{
                    uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVhdXRpZnVsJTIwbGFuZHNjYXBlfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=3000',
                }}
                style={styles.background}
            >
                <View style={styles.overlay}>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <AnimatedText text="Create Destination" styless={styles.title} />

                        <TextInput
                            placeholder="Destination name"
                            style={styles.input}
                        />

                        <TextInput
                            placeholder="Code (optional)"
                            style={styles.input}
                        />

                        <TextInput
                            placeholder="Short description"
                            multiline
                            style={[styles.input, { height: 80 }]}
                        />

                        <TextInput
                            placeholder="Featured rank (optional)"
                            keyboardType="numeric"
                            style={styles.input}
                        />

                        <Button name="📁 Upload Image" />
                        <Button name="📷 Take Picture" />
                        <Button name="📍 Get Current Location" />

                        <Text style={styles.coordinates}>
                            📍 00.0000 , 00.0000
                        </Text>

                        <Button
                            name="Create Destination"
                            style={styles.createButton}
                        />

                    </ScrollView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    background: { flex: 1 },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    title: {
        marginTop: 30,
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        opacity: 0.6
    },
    coordinates: {
        color: '#fff',
        marginVertical: 10,
    },
    createButton: {
        backgroundColor: 'orange',
        marginTop: 20,
    },
});


/* export default function CreateDestinationScreen() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [featuredRank, setFeaturedRank] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  //  Gallery
  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Gallery access is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Camera
  const handleTakePicture = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Camera access is required.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  //  Location
  const handleGetLocation = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Location access is required.');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setCoordinates(location.coords);
  };

  const handleCreate = () => {
    const newDestination = {
      id: Date.now().toString(),
      name,
      code,
      short_description: shortDescription,
      featured_rank: featuredRank ? Number(featuredRank) : null,
      image_url: image,
      coordinates,
    };

    console.log(newDestination);
    Alert.alert('Success', 'Destination created!');
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
      <ImageBackground
        source={{
          uri:
            image ||
            'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
        }}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AnimatedText text="Create Destination" styless={styles.title} />

            <TextInput
              placeholder="Destination name"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />

            <TextInput
              placeholder="Code (optional)"
              style={styles.input}
              value={code}
              onChangeText={setCode}
            />

            <TextInput
              placeholder="Short description"
              multiline
              style={[styles.input, { height: 80 }]}
              value={shortDescription}
              onChangeText={setShortDescription}
            />

            <TextInput
              placeholder="Featured rank (optional)"
              keyboardType="numeric"
              style={styles.input}
              value={featuredRank}
              onChangeText={setFeaturedRank}
            />

            <Button name=" Upload Image" onPress={handlePickImage} />
            <Button name=" Take Picture" onPress={handleTakePicture} />
            <Button name=" Get Current Location" onPress={handleGetLocation} />

            {coordinates && (
              <Text style={styles.coordinates}>
                 {coordinates.latitude.toFixed(4)} ,{' '}
                {coordinates.longitude.toFixed(4)}
              </Text>
            )}

            <Button
              name="Create Destination"
              onPress={handleCreate}
              style={styles.createButton}
            />
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
} */