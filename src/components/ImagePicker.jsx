import { useState } from 'react';
import { Alert, Image, View, StyleSheet } from 'react-native';
import * as ImgPicker from 'expo-image-picker';
import Button from './Button';

export default function ImagePicker() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImgPicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    let result = await ImgPicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button name="Upload Image" onPress={pickImage} style={styles.button} />
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
