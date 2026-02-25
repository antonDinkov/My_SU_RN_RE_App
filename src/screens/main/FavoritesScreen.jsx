import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ImageBackground, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedText from '../../components/AnimatedText';
import DestinationCard from '../../components/DestinationCard';
import { useData } from '../../context/main/useData';
import { useAuth } from '../../context/auth/useAuth';


export default function FavoritesScreen() {
    const [refreshing, setRefreshing] = useState(false);
    const { getFavorites, detailsHandler, favorites } = useData();
    const { user } = useAuth();

    useEffect(() => {
        try {
            const favoritesLoad = async () => {
                await getFavorites(user._id);
            }
            favoritesLoad();
        } catch (err) {
            console.log("This the error from the favorites in the front: ", err);

        }
    }, [])


    const onRefresh = async () => {
        try {
            setRefreshing(true);
            await getFavorites(user._id);
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
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <AnimatedText text='Favorite Destinations' styless={styles.section} />
                    {favorites.map(item => {
                        return <DestinationCard key={`${item._id}-${item.slug}`} item={item} onPress={() => detailsHandler(item)} />
                    })}
                    {!favorites.length && <AnimatedText text="No favorites destinations yet" styless={styles.emptyFavorites} />}
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
