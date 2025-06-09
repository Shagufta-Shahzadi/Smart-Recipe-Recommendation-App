import React, { useState, useEffect, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoritesProvider } from './context/FavoritesContext'; // Adjust the path
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import AIScreen from './screens/AIScreen';
import StartScreen from './screens/StartScreen';
import RiceScreen from './screens/RiceScreen';
import RecipeScreen from './components/RecipeScreen';
import DessertsScreen from './screens/DessertsScreen';
import ChickenScreen from './screens/ChickenScreen';
import SnacksScreen from './screens/SnacksScreen';
import StartCookingScreen from './components/StartCookingScreen';
import FavoritesScreen from './components/FavoritesScreen';
import SplashScreen from './screens/SplashScreen';


const Stack = createNativeStackNavigator();
const AuthContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={user ? 'SplashScreen' : 'SplashScreen'}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AIScreen" component={AIScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RecipeScreen" component={RecipeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DessertsScreen" component={DessertsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ChickenScreen" component={ChickenScreen}options={{ headerShown: false }}  />
          <Stack.Screen name="SnacksScreen" component={SnacksScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RiceScreen" component={RiceScreen}options={{ headerShown: false }}  />
          <Stack.Screen name="StartCookingScreen" component={StartCookingScreen}options={{ headerShown: false }}  />
          <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      </FavoritesProvider>
    </AuthContext.Provider>
  );
}

// Custom hook to access auth context
export const useAuth = () => useContext(AuthContext);
