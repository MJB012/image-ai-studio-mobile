import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";

interface GalleryImage {
  id: string;
  uri: string;
  prompt: string;
  createdAt: Date;
}

export default function Gallery() {
  const [images] = useState<GalleryImage[]>([]);

  const renderEmptyState = () => (
    <View style={styles.emptyCard}>
      <View style={styles.emptyIconContainer}>
        <MaterialIcons name="photo-library" size={40} color={Colors.primary} />
      </View>
      <Text style={styles.emptyTitle}>No images yet</Text>
      <Text style={styles.emptySubtitle}>
        Start creating amazing images with AI
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/create-image")}
      >
        <LinearGradient
          colors={[Colors.primary, Colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.createButton}
        >
          <Text style={styles.createButtonText}>Create Your First Image</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderImageItem = ({ item }: { item: GalleryImage }) => (
    <View style={styles.imageCard}>
      <Image source={{ uri: item.uri }} style={styles.imageThumb} />
      <Text style={styles.imagePrompt} numberOfLines={1}>
        {item.prompt}
      </Text>
      <Text style={styles.imageDate}>
        {item.createdAt.toLocaleDateString()} at{" "}
        {item.createdAt.toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1a1a2e" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>My Gallery</Text>
          <Text style={styles.headerSubtitle}>
            {images.length} image{images.length !== 1 ? "s" : ""}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/create-image")}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.createNewButton}
          >
            <Text style={styles.createNewText}>Create New</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {images.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={images}
          renderItem={renderImageItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.gridContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0ff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: {
    flex: 1,
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a2e",
  },
  headerSubtitle: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 1,
  },
  createNewButton: {
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  createNewText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: "600",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#e5e7eb",
  },
  emptyCard: {
    flex: 1,
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ede9fe",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 24,
  },
  createButton: {
    borderRadius: 9999,
    paddingHorizontal: 28,
    paddingVertical: 13,
  },
  createButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "600",
  },
  gridContent: {
    padding: 16,
    paddingBottom: 32,
  },
  gridRow: {
    gap: 12,
    marginBottom: 12,
  },
  imageCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  imageThumb: {
    width: "100%",
    height: 160,
  },
  imagePrompt: {
    fontSize: 13,
    color: "#6b7280",
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  imageDate: {
    fontSize: 11,
    color: "#9ca3af",
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 2,
  },
});
