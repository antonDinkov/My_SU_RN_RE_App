import { useState } from 'react';
import { Alert, Image, View, StyleSheet } from 'react-native';
import * as ImgPicker from 'expo-image-picker';
import Button from './Button';

export default function TakePicture({setImage}) {

  const pickImage = async () => {
    const permissionResult = await ImgPicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    let result = await ImgPicker.launchCameraAsync({
      mediaTypes: ['images'],
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button name="Take a Picture" onPress={pickImage} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  button: {
        opacity: 0.7,
        backgroundColor: 'transparent',
        borderColor: "black",
        borderWidth: 2,
    },
});
