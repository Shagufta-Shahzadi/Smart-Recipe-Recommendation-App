import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from "react-native";
import { WebView } from "react-native-webview";
import { FontAwesome } from "@expo/vector-icons";
import Footer from "../components/Footer";

const BiryaniRecipeScreen = () => {
  const [mainVideoId, setMainVideoId] = useState("uFa6urPkK4c"); // Default Main Video

  // Related YouTube Videos with Thumbnails
  const relatedVideos = [
    { id: "PmqdA05OXuI", title: "Restaurant Style Chicken Biryani" },
    { id: "RuUPbHdnb-s", title: "Degi Biryani Recipe" },
    { id: "Ksn_5RHqZlY", title: "Spicy Chicken Biryani" },
    { id: "OurrYxgvry4", title: "Mutton Biryani Recipe" },
  ];

  return (
    <View style={styles.container}>
      {/* Fixed Video Container */}
      <View style={styles.videoContainer}>
        <WebView
          style={styles.video}
          source={{ uri: `https://www.youtube.com/embed/${mainVideoId}` }}
          allowsFullscreenVideo={true}
        />
      </View>

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Related Videos Title */}
        <Text style={styles.relatedTitle}>Related Videos</Text>

        {/* Related Videos Grid */}
        <View style={styles.relatedVideosContainer}>
          {relatedVideos.map((video, index) => (
            <TouchableOpacity
              key={index}
              style={styles.videoWrapper}
              onPress={() => setMainVideoId(video.id)}
            >
              <Image
                source={{ uri: `https://img.youtube.com/vi/${video.id}/hqdefault.jpg` }}
                style={styles.thumbnail}
              />
              <Text style={styles.videoTitle}>{video.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty Space for Footer Padding */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },

  // Fixed Video Container
  videoContainer: { width: "100%", height: 250, backgroundColor: "black",  marginTop:50},
  video: { flex: 1 },

  relatedTitle: { fontSize: 20, fontWeight: "bold", color: "black", marginTop: 10, alignSelf: "center" , marginTop:40},

  // Related Videos Grid
  relatedVideosContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", paddingHorizontal: 10 },
  videoWrapper: { width: "48%", marginVertical: 10, backgroundColor: "#f9f9f9", borderRadius: 10, paddingBottom: 10, alignItems: "center" },
  thumbnail: { width: "100%", height: 120, borderRadius: 10 },
  videoTitle: { fontSize: 14, color: "black", textAlign: "center", marginTop: 5 },

  // YouTube Button
  youtubeSection: { marginTop: 20, alignItems: "center", marginBottom: 20 },
  moreText: { fontSize: 16, color: "black", marginBottom: 5 },
  youtubeButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#ddd", padding: 5, borderRadius: 10,height:50,width:200,alignContent:"center" },
  youtubeText: { fontSize: 18, color: "black", marginLeft: 10, fontWeight: "bold",textAlign:"center" },
});

export default BiryaniRecipeScreen;
