import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useNavigationState } from '@react-navigation/native';

export default function Footer() {
  const navigation = useNavigation();
  const activeRoute = useNavigationState(state => state?.routes[state.index]?.name);
  
  return (
    <View style={styles.container}>
      <View style={styles.footerContainer}>
        {/* Home Button */}
        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Home')}
        >
          <View style={styles.iconWrapper}>
            <Ionicons 
              name="home" 
              size={24} 
              color={activeRoute === 'Home' ? '#22c55e' : '#9ca3af'} 
            />
            {activeRoute === 'Home' && <View style={styles.activeIndicator} />}
          </View>
          <Text style={[
            styles.iconText, 
            { color: activeRoute === 'Home' ? '#22c55e' : '#9ca3af' }
          ]}>
            Home
          </Text>
        </TouchableOpacity>
        
        {/* Search Screen */}
        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('AiChatScreen')}
        >
          <View style={styles.iconWrapper}>
            <Ionicons 
              name="search" 
              size={24} 
              color={activeRoute === 'AiChatScreen' ? '#22c55e' : '#9ca3af'} 
            />
            {activeRoute === 'AiChatScreen' && <View style={styles.activeIndicator} />}
          </View>
          <Text style={[
            styles.iconText, 
            { color: activeRoute === 'AiChatScreen' ? '#22c55e' : '#9ca3af' }
          ]}>
            Search
          </Text>
        </TouchableOpacity>
        
        {/* Add Recipe / AI Chat Button (Center) - Now directly opens AI Chat */}
        <View style={styles.centerButtonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('AIScreen')}
          >
            <Ionicons name="add" size={26} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Bookmarks */}
        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('BookmarksScreen')}
        >
          <View style={styles.iconWrapper}>
            <Ionicons 
              name="bookmark" 
              size={24} 
              color={activeRoute === 'BookmarksScreen' ? '#22c55e' : '#9ca3af'} 
            />
            {activeRoute === 'BookmarksScreen' && <View style={styles.activeIndicator} />}
          </View>
          <Text style={[
            styles.iconText, 
            { color: activeRoute === 'BookmarksScreen' ? '#22c55e' : '#9ca3af' }
          ]}>
            Saved
          </Text>
        </TouchableOpacity>
        
        {/* Settings */}
        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('SettingsScreen')}
        >
          <View style={styles.iconWrapper}>
            <Ionicons 
              name="settings" 
              size={24} 
              color={activeRoute === 'SettingsScreen' ? '#22c55e' : '#9ca3af'} 
            />
            {activeRoute === 'SettingsScreen' && <View style={styles.activeIndicator} />}
          </View>
          <Text style={[
            styles.iconText, 
            { color: activeRoute === 'SettingsScreen' ? '#22c55e' : '#9ca3af' }
          ]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    paddingTop: 8,
    paddingBottom: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 6,
    zIndex: 2,
  },
  iconButton: {
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  iconText: {
    fontSize: 10,
    marginTop: 1,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -5,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#22c55e',
  },
  centerButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  addButton: {
    backgroundColor: '#22c55e',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#22c55e',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    zIndex: 3,
  }
});