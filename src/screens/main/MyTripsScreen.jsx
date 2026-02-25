import { useState } from 'react';
import { StyleSheet, FlatList, ImageBackground, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedText from '../../components/AnimatedText';
import DestinationCard from '../../components/DestinationCard';
import { useData } from '../../context/main/useData';
import Button from '../../components/Button';

const destinations = [
    { id: '1', name: 'Paris' },
    { id: '2', name: 'Tokyo' },
    { id: '3', name: 'New York' },
    { id: '4', name: 'Rome' },
    { id: '5', name: 'London' },
    { id: '6', name: 'Barcelona' },
];

export default function MyTripsScreen() {
    const [refreshing, setRefreshing] = useState(false);
    const {myTrips} = useData();

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
                source={{ uri: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' }}
                style={styles.background}
            >

                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <AnimatedText text='My destinations' styless={styles.title} />
                    <FlatList
                        data={myTrips}
                        horizontal
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <DestinationCard item={item} />
                        )}
                    />
                    <Button name="Create" onPress={() => console.log("Button Pressed")} style={styles.button} />
                    {!myTrips.length && <AnimatedText text="CREATE YOUR FIRST TRAVEL MEMORY" styless={styles.emptyFavorites} />}
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', padding: 20 },
    title: { marginTop: 30, marginBottom: 10 },
    search: { backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 15 },
    card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, margin: 5, flex: 1 },
    cardText: { fontSize: 16, fontWeight: '600' },
    emptyFavorites: {
        fontSize: 15,
        alignSelf: 'center',
        color: '#fff',
        marginBottom: 50,
    },
    button: {
        opacity: 0.3,
        backgroundColor: "orange"
    }
});
