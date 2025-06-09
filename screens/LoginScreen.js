import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Import Vector Icons

// Base URL (replace with your backend URL)
const BASE_URL = "http://192.168.1.7:5000/api/auth"; // Update with your actual backend URL

export default function LoginScreen() {
  const navigation = useNavigation();

  // States for user input, loading, error handling, and password visibility
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle Login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    // Email Validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });

      if (response.data.token) {
        // Store token locally
        await AsyncStorage.setItem("token", response.data.token);
        Alert.alert("Success", "Login Successful!");
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }], // Navigate to Home screen after login
        });
      } else {
        Alert.alert("Login Failed", response.data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.log("Login Error:", error);

      // Handle error response
      if (error.response) {
        Alert.alert("Login Failed", error.response.data.message || "An error occurred. Please try again.");
      } else {
        Alert.alert("Login Failed", "Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: "#28A745" }]}>
      <SafeAreaView style={styles.safeArea}>
        {/* 🖼️ Login Image */}
        <View style={styles.imageContainer}>
          <Image source={require("../assets/login (2).png")} style={styles.image} />
        </View>
      </SafeAreaView>

      {/* 🔵 Login Form */}
      <View style={styles.formContainer}>
        <View style={styles.form}>
          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#555"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password Input with Show/Hide Icon */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              placeholder="Password"
              placeholderTextColor="#555"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* 🟡 Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.orText}>Or</Text>

        {/* 🔵 Social Login */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require("../assets/google.png")} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require("../assets/apple.png")} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require("../assets/facebook.png")} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>

        {/* 🔹 Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.signupLink}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 30,
    paddingTop: 20,
    marginTop: -120,
  },
  form: {
    marginBottom: 20,
    top: 20,
  },
  input: {
    backgroundColor: "#F3F4F6",
    padding: 15,
    borderRadius: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  forgotPassword: {
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    color: "#555",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#28A745",
    paddingVertical: 8,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
    height: 40,
    width: 200,
    marginLeft: 60,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  orText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  socialButton: {
    backgroundColor: "#F3F4F6",
    padding: 15,
    borderRadius: 15,
  },
  socialIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    color: "#777",
    fontSize: 16,
  },
  signupLink: {
    color: "#28A745",
    fontSize: 16,
    fontWeight: "bold",
  },
});