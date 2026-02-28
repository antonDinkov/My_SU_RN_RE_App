import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import { useAuth } from '../../context/auth/useAuth';
import ButtonWithActivity from '../../components/ButtonWithActivity';
import ImagePicker from '../../components/ImagePicker';

export default function EditProfileScreen({ navigation }) {
    const { user } = useAuth()
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [picture, setPicture] = useState(user.picture);
    const [isLoading, setIsLoading] = useState(false);


    const deletePictureHandler = () => {
        setPicture(null);
    };

    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9' }}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>Edit Profile</Text>

                {picture && (
                    <>
                        <Image
                            source={{ uri: picture }}
                            style={{ width: 200, height: 200, borderRadius: 12, marginBottom: 15 }}
                        />
                        <ButtonWithActivity
                            isLoading={isLoading}
                            name="Delete"
                            onPress={deletePictureHandler}
                            styleButton={styles.deleteButton}
                            styleText={styles.deleteText}
                        />
                    </>
                )}
                <ImagePicker setImage={(img) => {
                    setPicture(img);
                    validateTrip.image(setErrors, img);
                }} />
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#aaa"
                    value={firstName}
                    onChangeText={setFirstName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#aaa"
                    value={lastName}
                    onChangeText={setLastName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 30
    },
    input: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 8,
        padding: 12,
        color: '#fff',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)'
    },
    saveButton: {
        backgroundColor: '#FF6B6B',
        padding: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginTop: 20
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    },
    cancelButton: {
        marginTop: 15
    },
    cancelButtonText: {
        color: '#ccc',
        fontSize: 14
    },
    deleteButton: {
        width: 70,
        borderWidth: 2,
        borderRadius: 10
    },
    deleteText: {
        color: "red",
        alignSelf: 'center'
    },
});