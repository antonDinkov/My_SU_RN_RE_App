import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ImageBackground, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedText from '../../components/AnimatedText';

const favoriteDestinations = [
    { id: '1', name: 'Bali', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' },
    { id: '2', name: 'New York', image: 'https://images.unsplash.com/photo-1549924231-f129b911e442' },
    { id: '3', name: 'Tokyo', image: 'https://images.unsplash.com/photo-1549693578-d683be217e58' },
];

const followedTravelers = [
    { id: '1', name: 'Maria', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: '2', name: 'John', avatar: 'https://randomuser.me/api/portraits/men/46.jpg' },
    { id: '3', name: 'Sofia', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
];

export default function FavoritesScreen() {
    const [refreshing, setRefreshing] = useState(false);
    const [favorites, setFavorites] = useState([])
    const navigation = useNavigation();

    const onRefresh = async () => {
        try {
            setRefreshing(true);
        } catch (err) {
            console.log("Error refreshing the screen");
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4' }}
                style={styles.background}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <AnimatedText text='Favorite Destinations' styless={styles.section} />
                    {/* <Text style={styles.section}>Favorite Destinations</Text> */}
                    {!favorites.length && <AnimatedText text="No favorites destinations yet" styless={styles.emptyFavorites} />}
                    {/* <FlatList
                        data={favoriteDestinations}
                        horizontal
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('DestinationDetails', { id: item.id })}
                            >
                                <View style={styles.card}>
                                    <Image source={{ uri: item.image }} style={styles.image} />
                                    <Text style={styles.cardText}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        showsHorizontalScrollIndicator={false}
                    /> */}

                    <Text style={styles.section}>Followed Travelers</Text>
                    {/* <FlatList
                        data={followedTravelers}
                        horizontal
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('TravelerProfile', { id: item.id })}
                            >
                                <View style={styles.card}>
                                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                                    <Text style={styles.cardText}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        showsHorizontalScrollIndicator={false}
                    /> */}

                </ScrollView>
            </ImageBackground>
        </SafeAreaView >

    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },

    section: {
        marginTop: 35,
        marginBottom: 10,
        alignSelf: 'center'
    },

    emptyFavorites: {
        fontSize: 15,
        alignSelf: 'center',
        color: 'black',
    },

    card: {
        alignItems: 'center',
        marginRight: 15,
    },

    image: {
        width: 140,
        height: 100,
        borderRadius: 8,
    },

    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },

    cardText: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: '600',
    },
});
