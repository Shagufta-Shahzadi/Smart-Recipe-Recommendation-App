import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For favorite icon
import Footer from '../components/Footer'; // Import your Footer component
import recipesData from '../Dtata/recipesData';

export default function DessertsScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]); // State to track favorite recipes
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Dessert Recipes Data - Famous Pakistani Desserts
  const dessertRecipes = [
    { id: '20', name: 'Gulab Jamun', chef: 'Chef Shireen Anwar', image: require('../assets/Gulab Jamun.jpg') },
    { id: '21', name: 'Ras Malai', chef: 'Chef Zubaida Tariq', image: require('../assets/Ras Malai.jpg') },
    { id: '22', name: 'Jalebi', chef: 'Chef Mehboob Khan', image: require('../assets/Jalebi.jpg') },
    { id: '23', name: 'Kheer', chef: 'Chef Rida Aftab', image: require('../assets/Kheer.jpg') },
    { id: '24', name: 'Shahi Tukray', chef: 'Chef Gulzar', image: require('../assets/Shahi Tukray.jpg') },
  ];

  // Toggle Favorite
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id)); // Remove from favorites
    } else {
      setFavorites([...favorites, id]); // Add to favorites
    }
  };

  // Filtered List Based on Search Query
  const filteredDesserts = dessertRecipes.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.chef.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500} // Adjust offset if needed
    >
      {/* Header */}
      <View style={styles.header}>
        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search desserts..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* AI Icon */}
        <TouchableOpacity onPress={() => navigation.navigate('AIScreen')}>
          <Image source={require('../assets/ai.jpg')} style={styles.aiIcon} />
        </TouchableOpacity>
      </View>

      {/* FlatList for Scrollable Content */}
      <FlatList
        data={filteredDesserts}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.scrollContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recipeCard}
            onPress={() => navigation.navigate('RecipeScreen', { recipeId: item.id })}
          >
            <Image source={item.image} style={styles.recipeImage} />
            {/* Favorite Icon */}
            <TouchableOpacity
              style={styles.favoriteIcon}
              onPress={() => toggleFavorite(item.id)}
            >
              <Ionicons
                name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
                size={20}
                color={favorites.includes(item.id) ? 'red' : 'white'}
              />
            </TouchableOpacity>
            <Text style={styles.recipeName}>{item.name}</Text>
            <Text style={styles.chefName}>By: {item.chef}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Footer navigation={navigation} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 10,
  },

  /* Search Bar */
  searchBar: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    fontSize: 16,
    color: 'black',
    marginRight: 10, // Space between search bar and AI icon
  },

  /* AI Icon */
  aiIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },

  /* Scrollable Content */
  scrollContent: { padding: 20, paddingBottom: 80 }, // Add paddingBottom for footer

  /* Grid Layout */
  row: { justifyContent: 'space-between' },

  /* Recipe Card */
  recipeCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: 'relative', // For favorite icon positioning
  },
  recipeImage: { width: '100%', height: 150 },
  recipeName: { fontSize: 16, fontWeight: 'bold', padding: 10 },
  chefName: { fontSize: 14, color: 'gray', paddingHorizontal: 10, paddingBottom: 10 },

  /* Favorite Icon */
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 5,
  },

  /* Footer */
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});