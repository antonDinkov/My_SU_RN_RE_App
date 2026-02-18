import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground, TextInput } from 'react-native';
import { useAuth } from '../../context/auth/useAuth';
import { useData } from '../../context/main/useData';
import { useEffect, useState } from 'react';
import DestinationCard from '../../components/DestinationCard';
import { RadioButton } from '../../components/RadioButton';

export default function HomeScreen({ setIsLoggedIn }) {
    const { logout } = useAuth();
    const [featuredCountries, setFeaturedCountries] = useState([]);
    const { getFeaturedCountries } = useData();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('country');


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
                    renderItem={({ item }) => <DestinationCard item={item} onPress={(selected) => console.log(selected)} />}
                />
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Search..."
                        placeholderTextColor="#ccc"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        style={styles.searchInput}
                    />

                    <View style={styles.radioGroup}>
                        <RadioButton
                            label="Country"
                            value="country"
                            selected={searchType}
                            onSelect={setSearchType}
                        />
                        <RadioButton
                            label="City"
                            value="city"
                            selected={searchType}
                            onSelect={setSearchType}
                        />
                        <RadioButton
                            label="POI"
                            value="poi"
                            selected={searchType}
                            onSelect={setSearchType}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={logoutHandler}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.55)',
        paddingHorizontal: 20,
        paddingTop: 60,
    },

    title: {
        fontSize: 30,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 18,
        color: '#ddd',
        marginBottom: 20,
    },

    /* -------- Featured List -------- */

    listContainer: {
        paddingVertical: 10,
    },

    /* -------- Search Section -------- */

    searchContainer: {
        marginTop: 25,
        backgroundColor: 'rgba(255,255,255,0.08)',
        padding: 16,
        borderRadius: 16,
    },

    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 14,
    },

    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    /* -------- Button -------- */

    button: {
        backgroundColor: '#FF6B6B',
        paddingVertical: 16,
        borderRadius: 14,
        marginTop: 30,
        alignItems: 'center',
        shadowColor: '#FF6B6B',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});
