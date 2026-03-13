import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";

export default function CreateImage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [command, setCommand] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setUploadedImage(result.assets[0].uri);
    }
  };

  const handleGenerate = () => {
    // TODO: integrate with AI image generation API
    console.log("Generate image with command:", command);
  };

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
        <Text style={styles.headerTitle}>Image Studio</Text>
        <View style={styles.backButton} />
      </View>

      <View style={styles.divider} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Upload & Result Row */}
        <View style={styles.row}>
          {/* Upload Image Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Upload Image (Optional)</Text>
            <TouchableOpacity
              style={styles.uploadArea}
              onPress={pickImage}
              activeOpacity={0.7}
            >
              {uploadedImage ? (
                <Image
                  source={{ uri: uploadedImage }}
                  style={styles.previewImage}
                />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <MaterialIcons
                    name="cloud-upload"
                    size={36}
                    color="#c4c4c4"
                  />
                  <Text style={styles.uploadText}>Click to upload image</Text>
                  <Text style={styles.uploadSubtext}>Or drag and drop</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Result Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Result</Text>
            <View style={styles.resultArea}>
              {resultImage ? (
                <Image
                  source={{ uri: resultImage }}
                  style={styles.previewImage}
                />
              ) : (
                <View style={styles.resultPlaceholder}>
                  <MaterialIcons
                    name="auto-fix-high"
                    size={36}
                    color="#c4c4c4"
                  />
                  <Text style={styles.resultText}>
                    Your generated image will appear here
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Command Card */}
        <View style={styles.commandCard}>
          <Text style={styles.cardTitle}>Command</Text>
          <TextInput
            style={styles.commandInput}
            placeholder="Describe the image you want to generate..."
            placeholderTextColor="#9ca3af"
            value={command}
            onChangeText={setCommand}
            multiline
            textAlignVertical="top"
          />
          <TouchableOpacity activeOpacity={0.8} onPress={handleGenerate}>
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.generateButton}
            >
              <MaterialIcons name="auto-awesome" size={18} color={Colors.white} />
              <Text style={styles.generateText}>Generate Image</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a2e",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#e5e7eb",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: 12,
  },
  uploadArea: {
    borderWidth: 1.5,
    borderColor: "#d1d5db",
    borderStyle: "dashed",
    borderRadius: 12,
    minHeight: 160,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  uploadPlaceholder: {
    alignItems: "center",
    paddingVertical: 20,
  },
  uploadText: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 8,
    fontWeight: "500",
  },
  uploadSubtext: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
  },
  previewImage: {
    width: "100%",
    height: 160,
    borderRadius: 10,
  },
  resultArea: {
    borderWidth: 1.5,
    borderColor: "#d1d5db",
    borderStyle: "dashed",
    borderRadius: 12,
    minHeight: 160,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  resultPlaceholder: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  resultText: {
    fontSize: 13,
    color: "#9ca3af",
    marginTop: 8,
    textAlign: "center",
  },
  commandCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  commandInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: "#1a1a2e",
    minHeight: 100,
    marginBottom: 14,
    backgroundColor: "#fafafa",
  },
  generateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    paddingVertical: 13,
    gap: 8,
  },
  generateText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "600",
  },
});
