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
import { MaterialIcons } from '@expo/vector-icons'; // For favorite icon
import Footer from '../components/Footer'; // Import your Footer component
import recipesData from '../Dtata/recipesData';

export default function RiceScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]); // State to track favorite recipes
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const riceRecipes = [
    { id: '1', name: 'Chicken Biryani', chef: 'Chef Mehboob Khan', image: require('../assets/Chicken Biryani1.jpg') },
    { id: '2', name: 'Mutton Pulao', chef: 'Chef Rida Aftab', image: require('../assets/Mutton Pulao1.jpg') },
    { id: '3', name: 'Sindhi Biryani', chef: 'Chef Zubaida Tariq', image: require('../assets/Sindhi Biryani.jpg') },
    { id: '4', name: 'Matar Pulao', chef: 'Chef Saadat Siddiqui', image: require('../assets/Matar Pulao.jpg') },
    { id: '5', name: 'Beef Biryani', chef: 'Chef Gulzar', image: require('../assets/Beef Biryani.jpg') },
    { id: '6', name: 'Yakhni Pulao', chef: 'Chef Tahir Chaudhry', image: require('../assets/Yakhni Pulao.jpg') },
    { id: '7', name: 'Tikka Biryani', chef: 'Chef Naheed Ansari', image: require('../assets/Tikka Biryani.webp') },
    { id: '8', name: 'Vegetable Pulao', chef: 'Chef Asad Latif', image: require('../assets/Vegetable Pulao.jpg') },
    { id: '9', name: 'Hyderabadi Biryani', chef: 'Chef Rahat', image: require('../assets/Hyderabadi Biryani.jpg') },
    { id: '10', name: 'Masoor Dal Pulao', chef: 'Chef Samina Jalil', image: require('../assets/Masoor Dal Pulao.jpeg') },
  ];

  // Toggle favorite status
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id)); // Remove from favorites
    } else {
      setFavorites([...favorites, id]); // Add to favorites
    }
  };

  // Filter recipes based on search query
  const filteredRecipes = riceRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500} // Adjust offset if needed
    >
      {/* Header */}
      <View style={styles.header}>
        {/* Header Content */}
        <View style={styles.headerContent}>
          {/* Search Bar in the Middle */}
          <TextInput
            style={styles.searchBar}
            placeholder="Search recipes..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* AI Icon on the Right */}
          <TouchableOpacity onPress={() => navigation.navigate('AIScreen')}>
            <Image source={require('../assets/ai.jpg')} style={styles.aiIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* FlatList for Scrollable Content */}
      <FlatList
        data={filteredRecipes}
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
              <MaterialIcons
                name={favorites.includes(item.id) ? 'favorite' : 'favorite-border'}
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

  /* Header Content (Search Bar, AI Icon) */
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginHorizontal: 10,
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