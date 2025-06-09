import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView, Alert, Share, Linking } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import * as StoreReview from 'expo-store-review';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer'; // Import Footer Component

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // 🌍 Function to Change Language
  const changeLanguage = () => {
    Alert.alert(
      'Select Language',
      'Choose your preferred language',
      [
        { text: 'English', onPress: () => setSelectedLanguage('English') },
        { text: 'Français', onPress: () => setSelectedLanguage('Français') },
        { text: 'Español', onPress: () => setSelectedLanguage('Español') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // ⭐ Function to Rate the App
  const rateApp = async () => {
    if (await StoreReview.hasAction()) {
      StoreReview.requestReview();
    } else {
      Alert.alert(
        'Rate Us',
        'If you enjoy our app, please take a moment to rate us!',
        [
          { text: 'Rate Now', onPress: () => Linking.openURL('https://play.google.com/store/apps/details?id=com.yourapp') },
          { text: 'Later', style: 'cancel' },
        ]
      );
    }
  };

  // 📤 Function to Share the App
  const shareApp = async () => {
    try {
      await Share.share({
        message: 'Check out this amazing Recipe App! Download it here: https://play.google.com/store/apps/details?id=com.yourapp',
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share the app.');
    }
  };

  // 🔐 Function to Open Privacy Policy
  const openPrivacyPolicy = () => {
    Linking.openURL('https://yourwebsite.com/privacy-policy');
  };

  return (
    <View style={styles.container}>
      {/* ✅ Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      {/* Spacer to push content below the header */}
      <View style={styles.spacer} />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* ✅ Account Section */}
        <Text style={styles.sectionTitle}>ACCOUNT</Text>

        {/* Account Settings */}
        <TouchableOpacity style={styles.settingRow} onPress={() => navigation.navigate('AccountSettings')}>
          <FontAwesome5 name="user-circle" size={22} color="#28A745" />
          <View style={styles.settingText}>
            <Text style={styles.settingTitle}>Account Settings</Text>
            <Text style={styles.settingSubtitle}>Manage your profile and preferences</Text>
          </View>
        </TouchableOpacity>

        {/* ✅ General Section */}
        <Text style={styles.sectionTitle}>GENERAL</Text>

        {/* Notifications */}
        <View style={styles.settingRow}>
          <MaterialIcons name="notifications-active" size={22} color="#28A745" />
          <View style={styles.settingText}>
            <Text style={styles.settingTitle}>Notifications</Text>
            <Text style={styles.settingSubtitle}>Recipe updates & reminders</Text>
          </View>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>

        {/* Language */}
        <TouchableOpacity style={styles.settingRow} onPress={changeLanguage}>
          <FontAwesome5 name="language" size={22} color="#28A745" />
          <View style={styles.settingText}>
            <Text style={styles.settingTitle}>Language</Text>
            <Text style={styles.settingSubtitle}>{selectedLanguage}</Text>
          </View>
        </TouchableOpacity>

        {/* ✅ Other Section */}
        <Text style={styles.sectionTitle}>OTHER</Text>

        {/* Feedback & Chat */}
        <TouchableOpacity style={styles.settingRow}>
          <FontAwesome name="comments" size={22} color="green" />
          <View style={styles.settingText}>
            <Text style={styles.settingTitle}>Feedback / Chat</Text>
            <Text style={styles.settingSubtitle}>Share your thoughts with us</Text>
          </View>
        </TouchableOpacity>

        {/* Join Community */}
        <TouchableOpacity style={styles.settingRow}>
          <FontAwesome5 name="users" size={22} color="#5865F2" />
          <View style={styles.settingText}>
            <Text style={styles.settingTitle}>Join Community</Text>
            <Text style={styles.newTag}>NEW</Text>
          </View>
        </TouchableOpacity>

        {/* Rate Us */}
        <TouchableOpacity style={styles.settingRow} onPress={rateApp}>
          <Ionicons name="star" size={22} color="gold" />
          <View style={styles.settingText}>
            <Text style={styles.settingTitle}>Rate Us</Text>
            <Text style={styles.settingSubtitle}>Your experience on the app</Text>
          </View>
        </TouchableOpacity>

        {/* Share App */}
        <TouchableOpacity style={styles.settingRow} onPress={shareApp}>
          <MaterialIcons name="share" size={22} color="#FF9800" />
          <View style={styles.settingText}>
            <Text style={styles.settingTitle}>Share App</Text>
            <Text style={styles.settingSubtitle}>Invite friends & get rewards</Text>
          </View>
        </TouchableOpacity>

        {/* Privacy Policy */}
        <TouchableOpacity style={styles.settingRow} onPress={openPrivacyPolicy}>
          <Ionicons name="shield-checkmark" size={22} color="#28A745" />
          <View style={styles.settingText}>
            <Text style={styles.settingTitle}>Privacy Policy</Text>
            <Text style={styles.settingSubtitle}>Learn about our policies</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* ✅ Footer */}
      <Footer />
    </View>
  );
}

// ✅ Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },

  /* ✅ Header (Moved Down) */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    top: 40, // 👈 Header moved down
    zIndex: 10,
  },
  
  backButton: { marginRight: 10 },
  title: { fontSize: 22, fontWeight: 'bold', color: 'black' },

  /* ✅ Scroll Container */
  scrollContainer: { padding: 20, paddingBottom: 80 },

  /* ✅ Spacer to prevent overlap */
  spacer: { height: 90 }, // 👈 Increased height to match the new header position

  /* ✅ Section Titles */
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: 'black', marginVertical: 10 },

  /* ✅ Settings Row */
  settingRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 10, marginBottom: 10, elevation: 2 },
  settingText: { flex: 1, marginLeft: 15 },
  settingTitle: { fontSize: 16, fontWeight: 'bold' },
  settingSubtitle: { fontSize: 13, color: 'gray', marginTop: 2 },
  newTag: { fontSize: 12, color: 'red', fontWeight: 'bold', marginLeft: 5 },
});
