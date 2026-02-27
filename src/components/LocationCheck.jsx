import { useState } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';

import * as Device from 'expo-device';

import * as Location from 'expo-location';
import ButtonWithActivity from './ButtonWithActivity';
import formatAddress from '../screens/utils/formatAddress';

export default function LocationCheck({setLocation, address, setAddress}) {
    const [errorMsg, setErrorMsg] = useState(null);
    const [getting, setGetting] = useState(false);

    const marker = "\u{1F4CD}";

    async function getCurrentLocation() {
        setGetting(true);
        if (Platform.OS === 'android' && !Device.isDevice) {
            setErrorMsg(
                'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
            );
            setGetting(false);
            return;
        }
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            setGetting(false);
            return;
        }

        let loc = await Location.getCurrentPositionAsync({});

        setLocation(loc.coords);

        const reverse = await Location.reverseGeocodeAsync({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
        });
        console.log(reverse);
        
        if (reverse.length > 0) {
            const formatted = formatAddress(reverse[0]);
            setAddress(formatted);
            setGetting(false);
            return;
        } else {
            setErrorMsg('Something went wrong');
            setGetting(false);
        }

        setGetting(false);
    }


    let text;
    if (errorMsg) {
        text = errorMsg;
    } else if (address) {
        text = JSON.stringify(address);
    }

    return (
        <View style={styles.container}>
            {address && <Text style={styles.paragraph}>{marker} {text}</Text>}
            <ButtonWithActivity
                isLoading={getting}
                name="Get Location"
                onpress={getCurrentLocation}
                styleButton={styles.button}
                styleText={styles.buttonText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
        color: "#fff"
    },
    button: {
        opacity: 0.7,
        backgroundColor: 'transparent',
        borderColor: "black",
        borderWidth: 2,
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
});