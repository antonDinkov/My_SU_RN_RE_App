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
                    <TouchableOpacity activeOpacity={0.9}
                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                        style={styles.avatar}
                        onPress={() => navigation.navigate('PictureModal', { imageUrl: user.picture ? user.picture : 'https://spng.pngfind.com/pngs/s/16-168087_wikipedia-user-icon-bynightsight-user-image-icon-png.png' })}>
                        <Image
                            source={{ uri: user.picture ? user.picture : 'https://spng.pngfind.com/pngs/s/16-168087_wikipedia-user-icon-bynightsight-user-image-icon-png.png' }}
                            style={StyleSheet.absoluteFillObject}
                        />
                    </TouchableOpacity>
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
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: "hidden",
        marginBottom: 10, marginTop: 60,
    },

    name: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
    email: { fontSize: 16, color: '#ccc', marginBottom: 20 },
    editButton: { backgroundColor: '#FF6B6B', padding: 10, borderRadius: 8, marginTop: 40 },
    editButtonText: { color: '#fff', fontSize: 16, fontWeight: '600', textAlign: 'center' },
    boxSeparator: {

    },
    sessionBox: {
        alignItems: 'center',
        marginVertical: 30,
    }
});
