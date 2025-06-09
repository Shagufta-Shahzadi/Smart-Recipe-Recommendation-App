import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons"; // Icon Library
import Footer from "../components/Footer"; // Import Footer Component
import logo from "../assets/logo2.png"; // Replace with actual logo path

const StartCookingScreen = () => {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const selectLanguage = (lang) => {
    setSelectedLanguage(lang);

    // Jab language select ho to Biryani Recipe Screen par le jaye
    setTimeout(() => {
      navigation.navigate("BiryaniRecipeScreen");
    }, 1000);
  };

  return (
    <View style={styles.container}>
      {/* Close Button (Top Right) */}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="close" size={30} color="black" />
      </TouchableOpacity>

      {/* App Logo */}
      <Image source={logo} style={styles.logo} />

      {/* Language Selection Section */}
      <View style={styles.languageContainer}>
        <Text style={styles.title}>Select Language</Text>
        <Button
          mode="contained"
          style={[styles.button, selectedLanguage === "English" && styles.activeButton]}
          labelStyle={styles.buttonText}
          onPress={() => selectLanguage("English")}
        >
          English
        </Button>
        <Button
          mode="contained"
          style={[styles.button, selectedLanguage === "Urdu" && styles.activeButton]}
          labelStyle={styles.buttonText}
          onPress={() => selectLanguage("Urdu")}
        >
          اردو
        </Button>

        {/* "Done" Text - Appears When a Language is Selected */}
        {selectedLanguage && <Text style={styles.doneText}>Done</Text>}
      </View>

      {/* Below Text */}
      <Text style={styles.infoText}>
        To watch or listen to the cooking method of the recipe, select your language above.
      </Text>

      {/* Footer */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  closeButton: { position: "absolute", top: 50, right: 330, zIndex: 10 },
  logo: { width: 150, height: 150, marginBottom: 20 },
  languageContainer: { width: "80%", padding: 20, borderRadius: 10, backgroundColor: "#f9f9f9", alignItems: "center", elevation: 3 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15 },
  button: { width: "100%", marginVertical: 5, backgroundColor: "#ccc" },
  activeButton: { backgroundColor: "green" },
  buttonText: { fontSize: 18, fontWeight: "bold" },
  doneText: { fontSize: 20, fontWeight: "bold", color: "black", marginTop: 10 },
  infoText: { fontSize: 16, color: "#555", textAlign: "center", marginTop: 15, paddingHorizontal: 20 },
});

export default StartCookingScreen;
