import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const StartScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../assets/back1.png")} // Place an image in `assets/`
      style={styles.background}
    >
      <LinearGradient colors={["transparent", "rgb(0, 0, 0)"]} style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Cook Like a Chef</Text>
          <Text style={styles.description}>
            Flavour Fusion is a user-friendly recipe app designed for those who are new to cooking
            and want to try new recipes at home.
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  content: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#ddd",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#159A63",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width:250
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign:"center"
  },
});

export default StartScreen;
