import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from './Footer';
import recipesData from '../Dtata/recipesData'; // Updated import path

export default function RecipePage({ route, navigation }) {
  const { recipeId } = route.params; // Get the recipe ID from navigation params
  const recipe = recipesData.find((r) => r.id === recipeId); // Find the selected recipe

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Recipe not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Fixed Image */}
      <Image source={recipe.image} style={styles.recipeImage} />

      {/* Info Container */}
      <View style={styles.infoContainer}>
        {/* Chef Section */}
        <View style={styles.chefSection}>
          <Ionicons name="person-circle" size={30} color="white" />
          <Text style={styles.chefName}>{recipe.chef}</Text>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followText}>Follow +</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContentContainer}>
        {/* Recipe Details */}
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeTitle}>{recipe.name}</Text>
          <Text style={styles.recipeDescription}>{recipe.description}</Text>

          {/* Ingredients Section */}
          <Text style={styles.ingredientsTitle}>Ingredients <Text style={styles.ingredientCount}>({recipe.ingredients.length})</Text></Text>
          <View style={styles.ingredientList}>
            {recipe.ingredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Text style={styles.ingredientText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Method Section */}
          <Text style={styles.methodTitle}>Method</Text>
          <View style={styles.methodList}>
            {recipe.method.map((step, index) => (
              <View key={index} style={styles.methodStep}>
                <Text style={styles.methodText}>{`${index + 1}. ${step}`}</Text>
              </View>
            ))}
          </View>

          {/* Start Cooking with AI Button */}
          <TouchableOpacity
            style={styles.startCookingButton}
            onPress={() => navigation.navigate('AIScreen')}
          >
            <Text style={styles.startCookingText}>Start Cooking with AI</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer Component */}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  recipeImage: { width: '100%', height: 350, position: 'absolute', top: 0, left: 0, right: 0 },
  scrollContent: { flex: 1, marginTop: 280 },
  scrollContentContainer: { paddingBottom: 120 },
  chefSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 0, 0)',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    top: -90,
    width: 250,
  },
  followText: { color: 'white', fontSize: 14 },
  recipeDetails: { padding: 20, marginTop: 20, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  recipeTitle: { fontSize: 24, fontWeight: 'bold' },
  recipeDescription: { color: 'gray', marginVertical: 10, fontSize: 14 },
  ingredientsTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  ingredientCount: { color: '#2ecc71' },
  ingredientList: { marginTop: 10 },
  ingredientItem: { backgroundColor: '#f2f2f2', padding: 12, borderRadius: 10, marginBottom: 8 },
  ingredientText: { fontSize: 14 },
  methodTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  methodList: { marginTop: 10 },
  methodStep: { backgroundColor: '#f2f2f2', padding: 12, borderRadius: 10, marginBottom: 8 },
  methodText: { fontSize: 14 },
  startCookingButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  startCookingText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});