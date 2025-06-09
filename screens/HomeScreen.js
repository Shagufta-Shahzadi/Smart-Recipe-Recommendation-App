import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';

export default function HomeScreen({ navigation }) {
  // Function to open chef profiles (YouTube, social media, or website)
  const openChefProfile = (chefName) => {
    // Chef profile URLs - verified YouTube channels and alternative platforms
    const chefProfileUrls = {
      'Chef Zakir': 'https://www.youtube.com/@ChefZakirKhan', // Verified
      'Chef Mehboob': 'https://www.youtube.com/watch?v=NBlivg8oU1M&list=PL_omWBKCy7EmVwzdyPtuS-SOHck5T39ZI', // Verified
      'Chef Shireen': 'https://www.youtube.com/watch?v=6L4YVkRoBpo&list=PL_omWBKCy7Enb3Yg4XbS_9R5kWPdU02N3', // Facebook page
      'Chef Gulzar': 'https://www.youtube.com/@ChefGulzarRecipes', // Verified
      'Chef Rahat': 'https://www.youtube.com/watch?v=51kyyMq6ng8&list=PLkSBoVrhPmSOUfzh9eloiQnHGeZ8285pT', // Facebook page
      'Chef Samina': 'https://www.youtube.com/@KhanoorByChefSaminaJalil', // Verified
      'Chef Tahir': 'https://www.facebook.com/ChefTahirChaudhry/', // Facebook page
      'Chef Saadat': 'https://www.youtube.com/@ChefSaadat', // Website profile
      'Chef Asad': 'https://www.youtube.com/@LetsCookwithChefAsad', // Facebook page
      'Chef Naheed': 'https://www.masala.tv/chef/chef-naheed-ansari/', // Website profile
      'Chef Rida': 'https://www.youtube.com/@ChefRidaAftab', // Facebook page
      'Chef Zubaida': 'https://www.youtube.com/watch?v=c8LJJETxDFc&list=PLYotuDSqNpzwjVpmphe6uB1o0OMOlGS9Hwh' // Verified
    };

    const url = chefProfileUrls[chefName];
    if (url) {
      Linking.openURL(url).catch(err => console.error("Couldn't open chef profile:", err));
    }
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.fixedHeader}>
        {/* Header Section */}
        <View style={styles.header}>
          {/* Cooking Prompt and Notification Icon */}
          <View style={styles.headerContent}>
            <Text style={styles.cookingPrompt}>What would you like to cook today?</Text>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
          <TextInput placeholder="Search any recipes" style={styles.searchInput} />
          <Ionicons name="options-outline" size={20} color="gray" style={styles.filterIcon} />
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>

        {/* Category List */}
        <View style={styles.categoryContainer}>
          {[
            { name: "Rice", image: require('../assets/biryani.webp'), screen: 'RiceScreen' },
            { name: "Chicken", image: require('../assets/chicken.jpg'), screen: 'ChickenScreen' },
            { name: "Desserts", image: require('../assets/dessert.jpg'), screen: 'DessertsScreen' },
            { name: "Snacks", image: require('../assets/snacks.jpg'), screen: 'SnacksScreen' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Image source={item.image} style={styles.categoryImage} />
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recommendation Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommendation</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RecommendationScreen')}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Recipe List */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recipeContainer}>
          {[
            { name: "Shahi Tukray", image: require('../assets/Shahi Tukray.jpg'), chef: "Chef Zakir" },
            { name: "Gulab Jamun", image: require('../assets/Gulab Jamun.jpg'), chef: "Chef Mehboob" },
            { name: "Chicken Karahi", image: require('../assets/Chicken Karahi.jpg'), chef: "Chef Shireen Anwar" },
            { name: "Butter Chicken", image: require('../assets/Butter Chicken.jpg'), chef: "Chef Gulzar" }
          ].map((item, index) => (
            <View key={index} style={styles.recipeItem}>
              <Image source={item.image} style={styles.recipeImage} />
              <Text style={styles.recipeText}>{item.name}</Text>
              <Text style={styles.chefText}>By {item.chef}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Recipe of the Week Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recipe of the Week</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.recipeOfWeekContainer}>
          {[
            { name: "Chicken Biryani", image: require('../assets/Chicken Biryani.jpg') },
            { name: "Mutton Pulao", image: require('../assets/Mutton Pulao.webp') },
            { name: "Spring Rolls", image: require('../assets/Spring Roll.webp') },
            { name: "Fried Ice Cream", image: require('../assets/Fried-Ice-Cream.jpg') }
          ].map((item, index) => (
            <View key={index} style={styles.recipeOfWeekItem}>
              <Image source={item.image} style={styles.recipeOfWeekImage} />
              <View style={styles.overlay}>
                <Text style={styles.recipeTitle}>{item.name}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Most Popular Chefs Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Most Popular Chefs</Text>
        </View>

        <View style={styles.chefsContainer}>
          {[
            { name: "Chef Zakir", image: require('../assets/chefs zakir.jpg') },
            { name: "Chef Mehboob", image: require('../assets/chefs mehboob.jpg') },
            { name: "Chef Shireen", image: require('../assets/chefs shireen.jpg') },
            { name: "Chef Gulzar", image: require('../assets/chefs gulzar.jpg') },
            { name: "Chef Rahat", image: require('../assets/chefs rahat.jpg') },
            { name: "Chef Samina", image: require('../assets/chefs samina.jpg') },
            { name: "Chef Tahir", image: require('../assets/chefs tahir.jpg') },
            { name: "Chef Saadat", image: require('../assets/chefs saadat.jpg') },
            { name: "Chef Asad", image: require('../assets/Chefs Asad.jpg') },
            { name: "Chef Naheed", image: require('../assets/Chefs Naheed.jpg') },
            { name: "Chef Rida", image: require('../assets/Chefs Rida.jpg') },
            { name: "Chef Zubaida", image: require('../assets/Chefs Zubaida.jpg') }
          ].map((chef, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.chefCard}
              onPress={() => openChefProfile(chef.name)}
            >
              <Image source={chef.image} style={styles.chefImage} />
              <Text style={styles.chefName}>{chef.name}</Text>
              <View style={styles.platformIconContainer}>
                {chef.name === 'Chef Zakir' || 
                 chef.name === 'Chef Mehboob' || 
                 chef.name === 'Chef Gulzar' || 
                 chef.name === 'Chef Samina' || 
                 chef.name === 'Chef Zubaida' ? (
                  <Ionicons name="logo-youtube" size={16} color="red" />
                ) : chef.name === 'Chef Shireen' || 
                   chef.name === 'Chef Rahat' || 
                   chef.name === 'Chef Tahir' || 
                   chef.name === 'Chef Asad' || 
                   chef.name === 'Chef Rida' ? (
                  <Ionicons name="logo-facebook" size={16} color="#3b5998" />
                ) : (
                  <Ionicons name="globe-outline" size={16} color="#4285f4" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Newsletter Subscription */}
        <View style={styles.newsletterContainer}>
          <Text style={styles.newsletterTitle}>Stay Updated with New Recipes!</Text>
          <Text style={styles.newsletterText}>
            Subscribe to our newsletter and get exclusive recipes straight to your inbox.
          </Text>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeButtonText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  /* ✅ General Container */
  container: { flex: 1, backgroundColor: 'rgb(255, 255, 255)' },

  /* ✅ Fixed Header */
  fixedHeader: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: 'rgb(158, 229, 170)',
    zIndex: 10,
    paddingBottom: 10,
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 60,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cookingPrompt: {
    fontSize: 18, // Reduced font size
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10, // Add margin to separate text and icon
    color: 'rgb(0, 0, 0)', // Assuming black text
  },

  /* ✅ Search Bar */
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgb(245, 245, 245)',
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 10,
    height: 40,
  },
  searchIcon: { marginRight: 10, color: 'rgb(128, 128, 128)' }, // Gray
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
    paddingVertical: 0,
    textAlignVertical: 'center',
    color: 'rgb(0, 0, 0)', // Black text
  },
  filterIcon: { marginLeft: 10, color: 'rgb(128, 128, 128)' }, // Gray

  /* ✅ Scrollable Content */
  scrollContent: { paddingTop: 150, paddingBottom: 0 },

  /* ✅ Section Headings (Categories, Recommendation, Recipe of the Week) */
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: 'rgb(0, 0, 0)' }, // Black
  seeAll: { color: 'rgb(0, 128, 0)', fontSize: 14 }, // Green

  /* ✅ Categories Section */
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  categoryItem: { alignItems: 'center' },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgb(245, 245, 245)',
    padding: 10,
  },
  categoryText: { marginTop: 5, fontSize: 14, fontWeight: 'bold', color: 'rgb(0, 0, 0)' }, // Black

  /* ✅ Recommendation Section */
  recipeContainer: { paddingHorizontal: 20, marginTop: 10 },
  recipeItem: { width: 150, marginRight: 15 },
  recipeImage: { width: '100%', height: 120, borderRadius: 10 },
  recipeText: { fontSize: 16, fontWeight: 'bold', marginTop: 5, color: 'rgb(0, 0, 0)' }, // Black
  chefText: { fontSize: 12, color: 'rgb(128, 128, 128)' }, // Gray

  /* ✅ Recipe of the Week Section */
  recipeOfWeekContainer: { marginTop: 15, paddingHorizontal: 20 },
  recipeOfWeekItem: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: 'rgb(255, 255, 255)',
    elevation: 3,
  },
  recipeOfWeekImage: { width: '100%', height: 300, borderRadius: 10 },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 300,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeTitle: {
    color: 'rgb(255, 255, 255)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  /* ✅ Most Popular Chefs Section */
  chefsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  chefCard: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  chefImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgb(245, 245, 245)',
  },
  chefName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
    color: 'rgb(0, 0, 0)', // Black
  },
  platformIconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  /* ✅ Newsletter Subscription Section */
  newsletterContainer: {
    backgroundColor: 'rgb(180, 236, 243)',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 100,
  },
  newsletterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(51, 51, 51)',
    marginBottom: 5,
  },
  newsletterText: {
    fontSize: 14,
    color: 'rgb(102, 102, 102)',
    textAlign: 'center',
    marginBottom: 10,
  },
  subscribeButton: {
    backgroundColor: 'rgb(40, 167, 69)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: 150,
  },
  subscribeButtonText: {
    color: 'rgb(255, 255, 255)',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});