import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../../context/auth/useAuth';
import { useData } from '../../context/main/useData';
import { useEffect, useState } from 'react';
import DestinationCard from '../../components/DestinationCard';
import { RadioButton } from '../../components/RadioButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';

export default function HomeScreen({ setIsLoggedIn }) {
    const { logout } = useAuth();
    const [featuredCountries, setFeaturedCountries] = useState([]);
    const { getFeaturedCountries } = useData();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('country');
    const [refreshing, setRefreshing] = useState(false);

    const loadCountries = async () => {
        try {
            const countries = await getFeaturedCountries();
            setFeaturedCountries(countries);
        } catch (err) {
            console.log("Error getting the coutries");
        }
    }

    useEffect(() => {
        loadCountries();
    }, []);

    const onRefresh = async () => {
        try {
            setRefreshing(true);
            loadCountries();
            setSearchQuery('');
        } catch (err) {
            console.log("Error refreshing countries");
        } finally {
            setRefreshing(false);
        }
    };


    const logoutHandler = async () => {
        try {
            await logout();
        } catch (err) {
            console.error('Logout error:', err.message);
            alert(err.message);
        }
    };


    return (
        <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                        <View style={styles.searchContainer}>
                            <View style={styles.searchRow}>
                                <TextInput
                                    placeholder="Search..."
                                    placeholderTextColor="#ccc"
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    style={styles.searchInput}
                                />
                                <Button onPress={() => console.log("Search button pressed")} name="Search" style={styles.button} />
                            </View>

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
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </SafeAreaView>

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
        marginBottom: 15,
        backgroundColor: 'rgba(255,255,255,0.08)',
        padding: 16,
        borderRadius: 16,
    },

    searchRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between'
    },

    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 14,
        width: '68%',
        opacity: 0.7,
    },

    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    /* -------- Button -------- */

    button: {
        backgroundColor: "lightgreen",
        width: 80,
        opacity: 0.7,
        paddingVertical: 8
    },
});
