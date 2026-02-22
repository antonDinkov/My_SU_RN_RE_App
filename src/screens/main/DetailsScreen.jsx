import { View, Text, StyleSheet, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth/useAuth';
import { useData } from '../../context/main/useData';

export default function DetailsScreen({ route }) {
    const [favorites, setFavorites] = useState(false);
    const { item } = route.params;
    const {user} = useAuth();
    const { addToFavorites } = useData();

    useEffect(() => {
        const initialSet = async () => {
            
        }
    })

    
    const favoritesHandler = async (userId, itemId, type) => {
        setFavorites(favorites => !favorites);
        await addToFavorites(userId, itemId, type);
    };

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ImageBackground
                    source={{ uri: item.image_url }}
                    style={styles.background}
                >
                    <View style={styles.overlay}>
                        <Text style={styles.title}>{item.name}</Text>

                        <Image source={{ uri: item.image_url }} style={styles.image} />

                        <View style={styles.detailsContainer}>
                            <Text style={styles.description}>{item.short_description}</Text>
                            <TouchableOpacity onPress={() => favoritesHandler(user._id, item._id, item.type)} style={styles.star}>
                                <Ionicons name="star" color={favorites ? "yellow" : "#fff"} size={70} />
                            </TouchableOpacity>
                            <Text style={styles.starText}>Press the star</Text>
                            {/* <Button
                                onPress={() => console.log("Hello from the details screen")}
                                name="Back"
                                style={styles.button}
                            /> */}
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlay: {
        height: 500,
        width: 300,
        backgroundColor: 'rgba(0,0,0,0.55)',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#fff',
        marginTop: 0,
        marginBottom: 6,
        alignSelf: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#ddd',
        marginBottom: 20,
    },
    detailsContainer: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        padding: 16,
        borderRadius: 16,
    },
    description: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
        lineHeight: 22,
    },
    star: {
        alignSelf: 'center'
    },
    starText: {
        alignSelf: 'center',
        color: "yellow"
    },
    button: {
        backgroundColor: "lightgreen",
        opacity: 0.8,
        paddingVertical: 10,
    },
});
