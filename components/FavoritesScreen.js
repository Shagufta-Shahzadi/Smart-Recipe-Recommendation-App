import React, { useContext } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons'; // For back button and AI icon
import Footer from './Footer';
import { FavoritesContext } from '../context/FavoritesContext'; // Adjust the path

export default function FavoritesScreen({ navigation }) {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* ✅ Fixed Header */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Centered Text */}
        <Text style={styles.headerTitle}>Favorite Items</Text>

        {/* AI Icon on the Right */}
        <TouchableOpacity onPress={() => navigation.navigate('AIScreen')}>
          <Image source={require('../assets/ai.jpg')} style={styles.aiIcon} />
        </TouchableOpacity>
      </View>

      {/* Spacer to push content below the header */}
      <View style={styles.spacer} />

      {/* No Favorites Message */}
      {favorites.length === 0 ? (
        <View style={styles.noFavoritesContainer}>
          <MaterialIcons name="favorite-border" size={50} color="gray" />
          <Text style={styles.noFavoritesText}>No favorite recipes yet</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {favorites.map((recipe) => (
            <View key={recipe.id} style={styles.recipeCard}>
              <Image source={recipe.image} style={styles.recipeImage} />
              <View style={styles.recipeInfo}>
                <Text style={styles.recipeName}>{recipe.name}</Text>
                <Text style={styles.chefText}>By {recipe.chef}</Text>
              </View>
              {/* Delete Button */}
              <TouchableOpacity onPress={() => removeFavorite(recipe.id)} style={styles.deleteButton}>
                <MaterialIcons name="delete" size={22} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Fixed Footer */}
      <Footer navigation={navigation} />
    </View>
  );
}

// ✅ Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },

  /* ✅ Fixed Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Space between back button, title, and AI icon
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    width: '100%',
    position: 'absolute',
    top: 0, // Start from the top (below status bar)
    zIndex: 10,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    marginRight: 10, // Space between back button and title
  },
  headerTitle: {
    fontSize: 18, // Smaller text size
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center', // Center the text
    flex: 1, // Take up remaining space
  },
  aiIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },

  /* Spacer to prevent overlap */
  spacer: { height: 70 }, // Adjust based on header height

  /* No Favorite Message */
  noFavoritesContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noFavoritesText: { fontSize: 18, color: 'gray', marginTop: 10 },

  /* Scroll Container */
  scrollContainer: { padding: 20, paddingBottom: 100 },

  /* Recipe Card */
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
  },
  recipeImage: { width: 80, height: 80, borderRadius: 10 },
  recipeInfo: { flex: 1, marginLeft: 15 },
  recipeName: { fontSize: 18, fontWeight: 'bold' },
  chefText: { fontSize: 14, color: 'gray', marginTop: 5 },

  /* Transparent Delete Button */
  deleteButton: {
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});