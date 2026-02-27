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

export default function CreateTripScreen() {
    const [type, setType] = useState("country");
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const { isLoading, createTrip, clearError } = useMyTrips();
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);

    const deletePictureHandler = async () => {
        setImage(null);
    };

    const createHandler = async () => {
        clearError();
        try {
            const response = await createTrip({type, name, short_description: description, location_name: address, location, image})
        } catch (err) {
            console.log("Create error form the create screen catched: ", err.response?.data?.message);
        }
    };

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
                            </View>
                            <View>
                                <LocationCheck setLocation={setLocation} address={address} setAddress={setAddress} />
                            </View>
                            <ButtonWithActivity isLoading={isLoading} name="Create" onpress={createHandler} styleButton={styles.createButton} styleText={styles.buttonText} />
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