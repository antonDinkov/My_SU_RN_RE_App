import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import AnimatedText from '../../components/AnimatedText';
import { useAuth } from '../../context/auth/useAuth';


export default function ProfileScreen({ navigation }) {
    const { user } = useAuth();
    const iso = user?.loginHistory?.[0]?.date;

    let formattedDate = "It is your first login session";

    if (iso) {
        const date = new Date(iso);

        formattedDate = date.toLocaleString(undefined, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }
    const handleEdit = () => {
        navigation.navigate('Edit');
    }
    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1503264116251-35a269479413' }}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <View style={styles.boxSeparator}>
                    <Image
                        source={{ uri: user.picture? user.picture : 'https://randomuser.me/api/portraits/men/32.jpg' }}
                        style={styles.avatar}
                    />
                    <AnimatedText text={user.firstName} styless={styles.name} />
                    <AnimatedText text={user.lastName} styless={styles.name} />

                    <Text style={styles.email}>{user.email}</Text>

                    <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.sessionBox}>
                    <Text style={styles.email}>Last login session:</Text>
                    <Text style={[styles.email, { fontStyle: "italic" }]}>{formattedDate}</Text>
                </View>

            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', padding: 20, alignItems: 'center', justifyContent: 'space-between' },
    avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10, marginTop: 20, },
    name: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
    email: { fontSize: 16, color: '#ccc', marginBottom: 20 },
    editButton: { backgroundColor: '#FF6B6B', padding: 10, borderRadius: 8, marginTop: 40 },
    editButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    boxSeparator: {

    },
    sessionBox: {
        alignItems: 'center',
        marginVertical: 30,
    }
});
