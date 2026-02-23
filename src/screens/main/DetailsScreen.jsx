import { View, Text, StyleSheet, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../../context/auth/useAuth';
import { useData } from '../../context/main/useData';

export default function DetailsScreen({ route, navigation }) {

    const { item } = route.params;
    const { user } = useAuth();
    const { favorites, addToFavorites, removeFromFavorites } = useData();

    const userId = user._id;
    const itemId = item._id;
    const type = item.type;

    /**
     * 1️⃣ Проверяваме дали е favorite според context
     */
    const isFavoriteFromContext = useMemo(() => {
        return favorites?.some(f => f._id === itemId);
    }, [favorites, itemId]);

    /**
     * 2️⃣ Локално състояние за модала
     */
    const [localFavorite, setLocalFavorite] = useState(false);

    /**
     * 3️⃣ Sync-ваме локалното състояние когато context се промени
     */
    useEffect(() => {
        setLocalFavorite(isFavoriteFromContext);
    }, [isFavoriteFromContext]);

    /**
     * 4️⃣ Бутонът променя САМО локалното състояние
     */
    const favoritesHandler = () => {
        setLocalFavorite(prev => !prev);
    };

    /**
     * 5️⃣ Commit към context само при напускане
     */
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', async () => {

            // Ако няма реална промяна → не правим нищо
            if (localFavorite === isFavoriteFromContext) return;

            if (localFavorite) {
                await addToFavorites(userId, itemId, type);
            } else {
                await removeFromFavorites(userId, itemId);
            }
        });

        return unsubscribe;

    }, [navigation, localFavorite, isFavoriteFromContext, userId, itemId, type]);

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ImageBackground
                    source={{ uri: item.image_url }}
                    style={styles.background}
                >
                    <View style={styles.overlay}>
                        <Text style={styles.title}>{item.name}</Text>

                        <Image
                            source={{ uri: item.image_url }}
                            style={styles.image}
                            resizeMode="cover"
                        />

                        <View style={styles.detailsContainer}>
                            <Text style={styles.description}>
                                {item.short_description}
                            </Text>

                            <TouchableOpacity
                                onPress={favoritesHandler}
                                style={styles.star}
                            >
                                <Ionicons
                                    name="star"
                                    size={70}
                                    color={localFavorite ? "yellow" : "#fff"}
                                />
                            </TouchableOpacity>

                            <Text style={styles.starText}>
                                Press the star
                            </Text>
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
        width: '100%',
        height: 180,
        borderRadius: 12,
        marginBottom: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 10,
        alignSelf: 'center',
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
});






/* import { View, Text, StyleSheet, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth/useAuth';
import { useData } from '../../context/main/useData';

export default function DetailsScreen({ route, navigation }) {
    const [favorite, setFavorite] = useState(false);
    const { item } = route.params;
    const { user } = useAuth();
    const { addToFavorites, isItFavorite, removeFromFavorites } = useData();

    const userId = user._id;
    const itemId = item._id;
    const type = item.type;
    useEffect(() => {
        const initialSet = async () => {
            const result = await isItFavorite(userId, itemId);
            setFavorite(result);
        }
        initialSet();
    }, []);

    const favoritesHandler = () => {
        setFavorite(favorite => !favorite);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            if (favorite) {
                console.log("It is favorites: ", favorite);
                
                addToFavorites(userId, itemId, type);
            } else {
                console.log("It is NOT favorites: ", favorite);
                removeFromFavorites(userId, itemId);
            }
        });

        return unsubscribe;
    }, [favorite, userId, itemId, type]);

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
                            <TouchableOpacity onPress={() => favoritesHandler()} style={styles.star}>
                                <Ionicons name="star" color={favorite ? "yellow" : "#fff"} size={70} />
                            </TouchableOpacity>
                            <Text style={styles.starText}>Press the star</Text>
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
 */