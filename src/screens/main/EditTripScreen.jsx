import { Image, ImageBackground, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedText from "../../components/AnimatedText";
import ButtonWithActivity from "../../components/ButtonWithActivity";
import { RadioButton } from "../../components/RadioButton";
import { useState } from "react";
import ImagePicker from "../../components/ImagePicker";
import TakePicture from "../../components/TakePicture";
import { useData } from "../../context/main/useData";
import LocationCheck from "../../components/LocationCheck";

export default function EditTripScreen({ route }) {
    /* const { trip } = route.params; // 👈 получаваме trip */
    const trip = {
  _id: "65f1a2b3c4d5e6f789012345",

  type: "city",

  name: "Paris Getaway",

  code: "PAR",

  short_description: "A romantic escape to the city of lights with amazing food, art, and history.",

  image_url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",

  location_name: "Paris, France",

  location: {
    type: "Point",
    coordinates: [2.3522, 48.8566] // [longitude, latitude]
  },

  createdAt: "2024-01-15T10:30:00.000Z",
  updatedAt: "2024-01-16T12:00:00.000Z"
};

    const [type, setType] = useState(trip.type);
    const [name, setName] = useState(trip.name);
    const [code, setCode] = useState(trip.code || '');
    const [description, setDescription] = useState(trip.short_description);
    const [image, setImage] = useState(trip.image_url);

    const { isLoading } = useData();

    const deletePictureHandler = () => {
        setImage(null);
    };

    const updateHandler = () => {
        const updatedTrip = {
            ...trip,
            type,
            name,
            code,
            short_description: description,
            image_url: image,
        };

        console.log("Updated trip:", updatedTrip);
        // 👉 Тук извикваш update функцията ти от context/API
    };

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
            <ImageBackground
                source={{
                    uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=3000&q=60',
                }}
                style={styles.background}
            >
                <View style={styles.overlay}>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <AnimatedText text={trip.name} styless={styles.title} />

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
                                    <ButtonWithActivity
                                        isLoading={isLoading}
                                        name="Delete"
                                        onpress={deletePictureHandler}
                                        styleButton={styles.deleteButton}
                                        styleText={styles.deleteText}
                                    />
                                </>
                            )}

                            <ImagePicker setImage={setImage} />
                            <TakePicture setImage={setImage} />
                            <LocationCheck />

                            <ButtonWithActivity
                                isLoading={isLoading}
                                name="Save Changes"
                                onpress={updateHandler}
                                styleButton={styles.createButton}
                                styleText={styles.buttonText}
                            />
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