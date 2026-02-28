import { useState } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';

import * as Device from 'expo-device';

import * as Location from 'expo-location';
import ButtonWithActivity from './ButtonWithActivity';
import formatAddress from '../screens/utils/formatAddress';
import Button from './Button';

export default function LocationCheck({ setLocation, address, setAddress }) {
    const [errorMsg, setErrorMsg] = useState(null);
    const [getting, setGetting] = useState(false);

    const marker = "\u{1F4CD}";

    const deleteAddressHandler = () => {
        setAddress('');
        setLocation(null);
        setErrorMsg(null);
    }

    async function getCurrentLocation() {
        try {
            setGetting(true);
            setErrorMsg(null);

            if (Platform.OS === 'android' && !Device.isDevice) {
                setErrorMsg('Try it on your physical device');
                return;
            }

            const { status } = await Location.getForegroundPermissionsAsync();

            if (status !== 'granted') {
                const { status: newStatus } =
                    await Location.requestForegroundPermissionsAsync();

                if (newStatus !== 'granted') {
                    setErrorMsg('Permission denied');
                    return;
                }
            }

            let loc = await Location.getLastKnownPositionAsync();

            if (!loc) {
                loc = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                });
            }

            setLocation(loc.coords);

            const reverse = await Location.reverseGeocodeAsync(loc.coords);

            if (reverse.length > 0) {
                setAddress(formatAddress(reverse[0]));
            } else {
                setErrorMsg('Address not found');
            }

        } catch (err) {
            console.log(err);
            setErrorMsg('Location error');
        } finally {
            setGetting(false);
        }
    }


    let text;
    if (errorMsg) {
        text = errorMsg;
    } else if (address) {
        text = JSON.stringify(address);
    }

    return (
        <View style={styles.container}>
            {address &&
                <View>
                    <Text style={styles.paragraph}>{marker} {text}</Text>
                    <Button  name="Remove" onPress={deleteAddressHandler} style={styles.deleteButton} styleText={styles.deleteBottomText} />
                </View>
            }
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
    deleteButton: {
        width: 80,
        borderWidth: 2,
        borderRadius: 30,
        backgroundColor: "transparent",
        alignSelf: 'center',
        paddingTop: 0,
        paddingBottom: 0,
    },
    deleteBottomText: {
        fontSize: 10,
        opacity: 0.7,
    },
});