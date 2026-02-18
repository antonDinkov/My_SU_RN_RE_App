import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { useAuth } from '../../context/auth/useAuth';
import { useData } from '../../context/main/useData';
import { useEffect, useState } from 'react';
import DestinationCard from '../../components/DestinationCard';

export default function HomeScreen({ setIsLoggedIn }) {
    const { logout } = useAuth();
    const [featuredCountries, setFeaturedCountries] = useState([]);
    const {getFeaturedCountries} = useData();

    useEffect(() => {
        const loadCountries = async () => {
            try {
                const countries = await getFeaturedCountries();
                console.log("LOADED: ", countries);
                setFeaturedCountries(countries);
            } catch (err) {
                console.log("Error getting the coutries");
            }
        }
        loadCountries();
    }, []);

    const logoutHandler = async () => {
        try {
            await logout();
        } catch (err) {
            console.error('Logout error:', err.message);
            alert(err.message);
        }
    };


    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9' }}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>Welcome to Travel Feever</Text>
                <Text style={styles.subtitle}>Popular Destinations</Text>
                <FlatList
                    data={featuredCountries}
                    keyExtractor={(item) => item._id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => <DestinationCard item={item} onPress={(selected) => console.log(selected)} />}
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Search Trips</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={logoutHandler}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1, resizeMode: 'cover' },
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
    subtitle: { fontSize: 18, color: '#fff', marginBottom: 15 },
    card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginRight: 10 },
    destination: { fontSize: 16, fontWeight: '500' },
    button: { backgroundColor: '#FF6B6B', padding: 15, borderRadius: 8, marginTop: 20, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
