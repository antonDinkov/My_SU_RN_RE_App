import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ImageBackground } from 'react-native';

const destinations = [
  { id: '1', name: 'Paris' },
  { id: '2', name: 'Tokyo' },
  { id: '3', name: 'New York' },
  { id: '4', name: 'Rome' },
  { id: '5', name: 'London' },
  { id: '6', name: 'Barcelona' },
];

export default function DestinationsScreen() {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>My destinations</Text>
        <TextInput style={styles.search} placeholder="Search" placeholderTextColor="#ccc" />
        <FlatList
          data={destinations}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', padding: 20 },
  title: { fontSize: 28, color: '#fff', fontWeight: 'bold', marginBottom: 10 },
  search: { backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 15 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, margin: 5, flex: 1 },
  cardText: { fontSize: 16, fontWeight: '600' },
});
