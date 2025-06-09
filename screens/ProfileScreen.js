import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function ProfileScreen({ route }) {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
      <Text style={styles.welcomeText}>Welcome, {user.name}</Text>
      <Text style={styles.userEmail}>{user.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  welcomeText: { fontSize: 24, fontWeight: "bold", marginTop: 10 },
  userEmail: { fontSize: 16, color: "#666", marginTop: 5 },
});