import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedText from "../../components/AnimatedText";
import ButtonWithActivity from "../../components/ButtonWithActivity";
import { RadioButton } from "../../components/RadioButton";
import { useState } from "react";
import ImagePicker from "../../components/ImagePicker";
import TakePicture from "../../components/TakePicture";
import LocationCheck from "../../components/LocationCheck";
import { useMyTrips } from "../../context/myTrips/useMyTrips";
import * as Location from 'expo-location';

export default function EditTripScreen({ route }) {
    const { trip } = route.params;
    const [type, setType] = useState(trip.type);
    const [name, setName] = useState(trip.name);
    const [image, setImage] = useState(trip.image_url);
    const [description, setDescription] = useState(trip.short_description);
    const [location, setLocation] = useState(trip.location);
    const [location_name, setLocation_name] = useState(trip.location_name);
    const { isLoading, updateTrip } = useMyTrips();


    const deletePictureHandler = () => {
        setImage(null);
    };

    const updateHandler = async () => {
    try {
        const updatedTrip = {};

        updatedTrip.type = type;
        updatedTrip.name = name;
        updatedTrip.short_description = description;
        updatedTrip.location_name = location_name;

        if (location?.latitude && location?.longitude) {
            updatedTrip.location = {
                type: "Point",
                coordinates: [location.longitude, location.latitude],
            };
        }

        else if (!location && location_name) {
            const result = await Location.geocodeAsync(location_name);

            if (result.length > 0) {
                updatedTrip.location = {
                    type: "Point",
                    coordinates: [result[0].longitude, result[0].latitude],
                };
            }
        }

        else if (!location_name) {
            updatedTrip.location = null;
        }

        console.log("This is the image in the front: ", image);
        console.log("This is the image type: ", typeof image);
        
        /* if (image && typeof image !== "string") {
            console.log("Inside image if"); */
            
            updatedTrip.image = image;
        //}

        console.log("Updated trip:", updatedTrip);

        await updateTrip(trip._id, updatedTrip);

    } catch (err) {
        console.log("Error from edit trip screen: ", err);
    }
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
                            placeholder="Address"
                            placeholderTextColor="#666"
                            multiline
                            style={styles.input}
                            value={location_name}
                            onChangeText={setLocation_name}
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
                            <LocationCheck setLocation={setLocation} address={location_name} setAddress={setLocation_name} />

                            {isLoading && <Text style={{color: 'red',}}>WAIT! It might take a while( usualy 1 min)</Text>}
                            <ButtonWithActivity
                                isLoading={isLoading}
                                name="Save"
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