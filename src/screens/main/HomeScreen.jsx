import { View, Text, StyleSheet, FlatList, ImageBackground, TextInput, KeyboardAvoidingView, Platform, ScrollView, RefreshControl } from 'react-native';
import { useData } from '../../context/main/useData';
import { useCallback, useEffect, useState } from 'react';
import DestinationCard from '../../components/DestinationCard';
import { RadioButton } from '../../components/RadioButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import AnimatedText from '../../components/AnimatedText';
import ButtonWithActivity from '../../components/ButtonWithActivity';
import { useAuth } from '../../context/auth/useAuth';
import ServerError from '../../components/ServerError'

export default function HomeScreen({ navigation }) {
    const [featuredCountries, setFeaturedCountries] = useState([]);
    const { getFeaturedCountries, getSearchResults, isLoading, error, clearError, errorSearch, clearErrorSearch } = useData();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('country');
    const [searchResults, setSearchResults] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useAuth();

    const loadCountries = async () => {
        clearError();
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

    const detailsHandler = useCallback(
        (item) => {
            navigation.navigate('DetailsModal', { item });
        },
        [navigation]
    );

    const renderFeaturedItem = useCallback(
        ({ item }) => (
            <DestinationCard
                item={item}
                onPress={detailsHandler}
            />
        ),
        [detailsHandler]
    );

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

    const searchHandler = async (name, type) => {
        clearErrorSearch();
        try {
            const results = await getSearchResults(name, type);
            setSearchResults(results);
            setSearchQuery('');
        } catch (err) {
            setSearchResults([]);
            console.log("Error quiering the search: ", err);
        }
    }

    const cleanSearchResultsHandler = () => {
        setSearchResults([]);
    }


    return (
        <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <ImageBackground
                        source={{ uri: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9' }}
                        style={styles.background}
                    >
                        <View style={styles.overlay}>
                            <AnimatedText text={`Welcome to Travel Feever, ${user.firstName}`} />
                            <Text style={styles.subtitle}>Popular Destinations</Text>
                            <ServerError message={error} onClose={() => clearError()} />
                            <FlatList
                                data={featuredCountries}
                                keyExtractor={(item) => item._id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={renderFeaturedItem}
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
                                    <ButtonWithActivity isLoading={isLoading} name="Search" onpress={() => searchHandler(searchQuery, searchType)} styleButton={styles.button} styleText={styles.buttonText} />
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
                                <ServerError message={errorSearch} onClose={() => clearErrorSearch()} />
                                <FlatList
                                    data={searchResults}
                                    keyExtractor={(item) => item._id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={renderFeaturedItem}
                                />
                                <Button onPress={cleanSearchResultsHandler} name="Clean search" style={styles.cleanButton} />
                            </View>
                        </View>
                    </ImageBackground>
                </ScrollView>
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

    listContainer: {
        paddingVertical: 10,
    },

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

    button: {
        backgroundColor: "lightgreen",
        width: 80,
        opacity: 0.7,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 30,
        marginVertical: 10,
    },

    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        alignSelf: "center"
    },

    cleanButton: {
        paddingVertical: 5,
    }
});
