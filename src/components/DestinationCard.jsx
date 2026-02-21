import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const DestinationCard = ({ item, onPress }) => {
    console.log(item.image_url);
    
    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => onPress && onPress(item)}
        >
            <ImageBackground
                source={{ uri: item.image_url }}
                style={styles.image}
                imageStyle={styles.imageRadius}
            >
                <View style={styles.overlay} />

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.name}>{item.name}</Text>

                        {item.code && (
                            <View style={styles.codeContainer}>
                                <Text style={styles.code}>{item.code}</Text>
                            </View>
                        )}
                    </View>

                    <Text numberOfLines={2} style={styles.description}>
                        {item.short_description}
                    </Text>

                    {item.featured_rank ? ( <Text style={styles.rank}>⭐ #{String(item.featured_rank)}</Text> ) : null}

                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default DestinationCard;

const styles = StyleSheet.create({
    card: {
        height: 220,
        width: 220,
        marginHorizontal: 16,
        marginVertical: 12,
        borderRadius: 18,
        overflow: 'hidden',
        elevation: 5,
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    imageRadius: {
        borderRadius: 18,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.35)',
    },
    content: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
        marginRight: 8,
    },
    codeContainer: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    code: {
        fontSize: 12,
        fontWeight: '700',
        color: '#000',
    },
    description: {
        marginTop: 8,
        fontSize: 14,
        color: '#eee',
    },
    rank: {
        marginTop: 6,
        fontSize: 12,
        fontWeight: '600',
        color: '#ffd700',
    },
});
