import { Image } from "expo-image";
import { ImageBackground, Text, View } from "react-native";

export default function TestImage() {
    return (
        <View>
            <Text>This is abouve the image</Text>
            <Image
                source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/b/be/Russian_church_(37591925970).jpg" }}
                style={{ width: 300, height: 300 }}
                contentFit="cover"
            />
        </View>

    );
}
