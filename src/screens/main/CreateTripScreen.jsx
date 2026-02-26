import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedText from "../../components/AnimatedText";
import Button from "../../components/Button";
import ButtonWithActivity from "../../components/ButtonWithActivity";
import { RadioButton } from "../../components/RadioButton";
import { useState } from "react";
import ImagePicker from "../../components/ImagePicker";
import TakePicture from "../../components/TakePicture";
import { useData } from "../../context/main/useData";

export default function CreateTripScreen() {
    const [type, setType] = useState("country");
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const {isLoading} = useData();

    const deletePictureHandler = async () => {
        setImage(null);
    }

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
                            placeholderTextColor="#666"
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />

                        <View style={styles.radioBtns}>
                            <RadioButton label="Country" value="country" selected={type} onSelect={setType} />
                            <RadioButton label="City" value="city" selected={type} onSelect={setType} />
                            <RadioButton label="Place" value="place" selected={type} onSelect={setType} />
                        </View>

                        <TextInput
                            placeholder="Code (optional)"
                            placeholderTextColor="#666"
                            style={styles.input}
                            value={code}
                            onChangeText={setCode}
                        />

                        <TextInput
                            placeholder="Short description"
                            placeholderTextColor="#666"
                            multiline
                            style={[styles.input, { height: 80 }]}
                            value={description}
                            onChangeText={setDescription}
                        />

                        <View style={styles.buttonsWrapper}>
                            {image && (
                                <>
                                    <Image
                                        source={{ uri: image }}
                                        style={{ width: 200, height: 200, borderRadius: 12, marginBottom: 15 }}
                                    />
                                    <ButtonWithActivity isLoading={isLoading} name="Delete" onpress={deletePictureHandler} styleButton={styles.deleteButton} styleText={styles.deleteText} />
                                </>
                            )}
                            <View>
                                <ImagePicker setImage={setImage} />
                            </View>
                            <View>
                                <TakePicture setImage={setImage} />
                                {/* <Button name="Take Picture" onPress={() => console.log("Take picture pressed")} style={styles.button} /> */}
                            </View>
                            <View>
                                <Text style={styles.coordinates}>
                                    00.0000 , 00.0000
                                </Text>
                                <Button name="Get Location" onPress={() => console.log("Get location pressed")} style={styles.button} />
                            </View>
                            <ButtonWithActivity isLoading={isLoading} name="Create" onpress={() => console.log("Create button pressed")} styleButton={styles.createButton} styleText={styles.buttonText} />
                        </View>
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
        marginTop: 60,
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        opacity: 0.6,
    },
    radioBtns: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    buttonsWrapper: {
        alignItems: "center"
    },
    coordinates: {
        color: '#fff',
        marginVertical: 10,
    },
    button: {
        opacity: 0.7,
        backgroundColor: 'transparent',
        borderColor: "black",
        borderWidth: 2,
    },
    createButton: {
        backgroundColor: 'orange',
        marginTop: 20,
        opacity: 0.4,
        width: 200,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 30,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        alignSelf: "center"
    },
    deleteButton: {
        width: 70,
        borderWidth: 2,
        borderRadius: 10
    },
    deleteText: {
        color: "red",
        alignSelf: 'center'
    }
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