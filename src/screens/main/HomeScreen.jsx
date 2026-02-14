import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from 'react-native';

const destinations = [
    { id: '1', name: 'Paris' },
    { id: '2', name: 'Rome' },
    { id: '3', name: 'Tokyo' },
];

export default function HomeScreen({ setIsLoggedIn }) {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <Text style={styles.destination}>{item.name}</Text>
        </TouchableOpacity>
    );

    const logoutHandler = async () => {
        try {
            const response = await fetch('https://travelfeverbe.onrender.com/logout', {
                method: 'GET',
                credentials: 'include', // важно, за да изпрати cookie-то
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Logout failed');
            }

            console.log(data.message); // Logout successful
            setIsLoggedIn(false);      // актуализира state във фронта

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
                    data={destinations}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
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
