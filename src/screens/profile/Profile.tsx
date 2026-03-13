import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";

const stats = [
  { label: "Created", value: "0", color: Colors.primary },
  { label: "Edited", value: "0", color: Colors.secondary },
  { label: "Saved", value: "0", color: "#10b981" },
];

export default function Profile() {
  const [name, setName] = useState("Demo User");
  const [email, setEmail] = useState("demo@imageai.com");

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [sheetVisible, setSheetVisible] = useState(false);

  const openEdit = () => {
    setEditName(name);
    setEditEmail(email);
    setSheetVisible(true);
  };

  const closeSheet = () => {
    setSheetVisible(false);
  };

  const handleSave = () => {
    setName(editName.trim() || name);
    setEmail(editEmail.trim() || email);
    closeSheet();
  };

  const accountDetails = [
    {
      icon: "mail-outline" as const,
      label: "Email",
      value: email,
    },
    {
      icon: "people-outline" as const,
      label: "Name",
      value: name,
    },
    {
      icon: "calendar-today" as const,
      label: "Member Since",
      value: "Unknown",
    },
  ];

  const handleSignOut = () => {
    router.replace("/login");
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
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.backButton} />
      </View>

      <View style={styles.divider} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <LinearGradient
            colors={[Colors.primary, Colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBanner}
          />
          <View style={styles.avatarContainer}>
            <View style={styles.avatarRing}>
              <View style={styles.avatar}>
                <MaterialIcons
                  name="person-outline"
                  size={44}
                  color="#a78bfa"
                />
              </View>
            </View>
          </View>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userEmail}>{email}</Text>

          <View style={styles.statsDivider} />

          <View style={styles.statsRow}>
            {stats.map((stat) => (
              <View key={stat.label} style={styles.statItem}>
                <Text style={[styles.statValue, { color: stat.color }]}>
                  {stat.value}
                </Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Account Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.detailsHeader}>
            <MaterialIcons name="settings" size={20} color="#1a1a2e" />
            <Text style={styles.detailsTitle}>Account Details</Text>
            <TouchableOpacity
              style={styles.editButton}
              activeOpacity={0.7}
              onPress={openEdit}
            >
              <MaterialIcons name="edit" size={16} color={Colors.primary} />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>

          {accountDetails.map((item, index) => (
            <View key={item.label}>
              <View style={styles.detailRow}>
                <MaterialIcons name={item.icon} size={20} color="#9ca3af" />
                <View style={styles.detailText}>
                  <Text style={styles.detailLabel}>{item.label}</Text>
                  <Text style={styles.detailValue}>{item.value}</Text>
                </View>
              </View>
              {index < accountDetails.length - 1 && (
                <View style={styles.detailDivider} />
              )}
            </View>
          ))}
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          style={styles.signOutButton}
          activeOpacity={0.7}
          onPress={handleSignOut}
        >
          <MaterialIcons name="logout" size={20} color="#ef4444" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Edit Profile Modal (bottom sheet style) */}
      <Modal
        visible={sheetVisible}
        transparent
        animationType="slide"
        onRequestClose={closeSheet}
      >
        <Pressable style={styles.modalOverlay} onPress={closeSheet}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.modalKeyboard}
          >
            <Pressable style={styles.sheetContainer} onPress={() => {}}>
              <View style={styles.sheetHandle} />

              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>Edit Profile</Text>
                <TouchableOpacity onPress={closeSheet} activeOpacity={0.7}>
                  <MaterialIcons name="close" size={22} color="#6b7280" />
                </TouchableOpacity>
              </View>

              <Text style={styles.sheetLabel}>Full Name</Text>
              <TextInput
                style={styles.sheetInput}
                value={editName}
                onChangeText={setEditName}
                placeholder="Enter your name"
                placeholderTextColor="#9ca3af"
                autoCapitalize="words"
              />

              <Text style={styles.sheetLabel}>Email Address</Text>
              <TextInput
                style={styles.sheetInput}
                value={editEmail}
                onChangeText={setEditEmail}
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TouchableOpacity activeOpacity={0.8} onPress={handleSave}>
                <LinearGradient
                  colors={[Colors.primary, Colors.secondary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.sheetSaveButton}
                >
                  <Text style={styles.sheetSaveText}>Save Changes</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Pressable>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
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
    padding: 20,
    paddingBottom: 32,
  },
  profileCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  gradientBanner: {
    height: 100,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: -44,
  },
  avatarRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#ede9fe",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a2e",
    textAlign: "center",
    marginTop: 10,
  },
  userEmail: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 2,
  },
  statsDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 20,
    marginTop: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  detailsCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  detailsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a2e",
    flex: 1,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#f3f0ff",
  },
  editButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.primary,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: "#9ca3af",
  },
  detailValue: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1a1a2e",
    marginTop: 2,
  },
  detailDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#e5e7eb",
    marginLeft: 32,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#fecaca",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  signOutText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ef4444",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalKeyboard: {
    justifyContent: "flex-end",
  },
  sheetContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#d1d5db",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 16,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a2e",
  },
  sheetLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1a1a2e",
    marginBottom: 8,
  },
  sheetInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1a1a2e",
    backgroundColor: "#fafafa",
    marginBottom: 20,
  },
  sheetSaveButton: {
    borderRadius: 9999,
    paddingVertical: 13,
    alignItems: "center",
  },
  sheetSaveText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
