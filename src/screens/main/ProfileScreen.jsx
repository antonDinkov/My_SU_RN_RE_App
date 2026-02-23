import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import AnimatedText from '../../components/AnimatedText';

const bookings = [
  { id: '1', destination: 'Rome' },
  { id: '2', destination: 'Tokyo' },
  { id: '3', destination: 'New York' },
];

const followers = [
  { id: '1', name: 'Maria', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '2', name: 'John', avatar: 'https://randomuser.me/api/portraits/men/46.jpg' },
];

const following = [
  { id: '1', name: 'Sofia', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { id: '2', name: 'Alex', avatar: 'https://randomuser.me/api/portraits/men/33.jpg' },
  { id: '3', name: 'Chris', avatar: 'https://randomuser.me/api/portraits/men/77.jpg' },
];

export default function ProfileScreen() {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1503264116251-35a269479413' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
          style={styles.avatar}
        />
        <AnimatedText text='Anton' styless={styles.name} />
        {/* <Text style={styles.name}>Anton</Text> */}
        <Text style={styles.email}>anton@example.com</Text>

        {/* Edit button */}
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <Text style={styles.section}>My Bookings</Text>
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>{item.destination}</Text>
            </View>
          )}
        />

        {/* Followers */}
        <Text style={styles.section}>Followers ({followers.length})</Text>
        <FlatList
          data={followers}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.followCard}>
              <Image source={{ uri: item.avatar }} style={styles.followAvatar} />
              <Text style={styles.cardText}>{item.name}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />

        {/* Following */}
        <Text style={styles.section}>Following ({following.length})</Text>
        <FlatList
          data={following}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.followCard}>
              <Image source={{ uri: item.avatar }} style={styles.followAvatar} />
              <Text style={styles.cardText}>{item.name}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', padding: 20, alignItems: 'center' },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10, marginTop: 20, },
  name: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
  email: { fontSize: 16, color: '#ccc', marginBottom: 20 },
  editButton: { backgroundColor: '#FF6B6B', padding: 10, borderRadius: 8, marginBottom: 20 },
  editButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  section: { fontSize: 18, color: '#fff', fontWeight: '600', marginVertical: 10 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginVertical: 5, width: '100%' },
  cardText: { fontSize: 16, fontWeight: '600' },
  followCard: { alignItems: 'center', marginRight: 15 },
  followAvatar: { width: 60, height: 60, borderRadius: 30 },
});
