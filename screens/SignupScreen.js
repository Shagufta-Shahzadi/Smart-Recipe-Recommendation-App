import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios"; // Import Axios
import { MaterialIcons } from "@expo/vector-icons"; // Import icon library

// Base URL for your backend API
const BASE_URL = "http://192.168.1.7:5000"; // Replace with your backend URL

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // 🟢 Handle Sign Up
  const handleSignUp = async () => {
    if (!fullName || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Email Validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    // Password Validation
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      // Send signup request using Axios
      const response = await axios.post(`${BASE_URL}/auth/signup`, {
        fullName,
        email,
        password,
      });

      if (response.status === 201) {
        Alert.alert("Success", "Account created successfully!");
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }], // Navigate to Home screen after signup
        });
      }
    } catch (error) {
      console.error("Signup Error:", error);

      // Handle error response
      if (error.response) {
        Alert.alert("Error", error.response.data.message || "Sign up failed");
      } else {
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: "#28A745" }]}>
      <SafeAreaView style={styles.safeArea}>
        {/* 🖼️ Sign Up Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/signup.png")} // Replace with your image path
            style={styles.image}
          />
        </View>
      </SafeAreaView>

      {/* 🟢 Sign Up Form */}
      <View style={styles.formContainer}>
        <View style={styles.form}>
          {/* Full Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#555"
            value={fullName}
            onChangeText={setFullName}
          />

          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#555"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Password Input with Show/Hide Toggle */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!showPassword} // Toggle secureTextEntry
              placeholder="Password"
              placeholderTextColor="#555"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)} // Toggle password visibility
            >
              <MaterialIcons
                name={showPassword ? "visibility-off" : "visibility"} // Change icon based on state
                size={24}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          {/* 🟢 Sign Up Button */}
          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.signupButtonText}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Or Divider */}
        <Text style={styles.orText}>Or</Text>

        {/* 🔵 Social Sign Up Buttons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../assets/google.png")} // Replace with your Google icon path
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../assets/apple.png")} // Replace with your Apple icon path
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../assets/facebook.png")} // Replace with your Facebook icon path
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>

        {/* 🔹 Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}> Login</Text>
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
    marginTop: -180,
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
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  signupButton: {
    backgroundColor: "#28A745",
    paddingVertical: 8,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
    height: 40,
    width: 200,
    marginLeft: 60,
  },
  signupButtonText: {
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#777",
    fontSize: 16,
  },
  loginLink: {
    color: "#28A745",
    fontSize: 16,
    fontWeight: "bold",
  },
});