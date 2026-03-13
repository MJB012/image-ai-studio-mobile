import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";

const featureCards = [
  {
    title: "Image Studio",
    description: "Create and edit images with AI-powered tools",
    icon: "photo-library" as const,
    color: "#8c61ff",
    bgColor: "#ede9fe",
    route: "/create-image" as const,
  },
  {
    title: "My Gallery",
    description: "View and manage your saved images",
    icon: "home" as const,
    color: "#f43f5e",
    bgColor: "#ffe4e6",
    route: "/gallery" as const,
  },
  {
    title: "Profile",
    description: "Manage your account settings",
    icon: "people-outline" as const,
    color: "#10b981",
    bgColor: "#d1fae5",
    route: "/profile" as const,
  },
];

const stats = [
  { label: "Images Created", value: "0", color: Colors.primary },
  { label: "Images Edited", value: "0", color: Colors.secondary },
  { label: "Images Saved", value: "0", color: "#10b981" },
  { label: "Projects", value: "0", color: "#f43f5e" },
];

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ImageAI Studio</Text>
        <TouchableOpacity style={styles.signOutButton} activeOpacity={0.7} onPress={() => router.replace("/login")}>
          <MaterialIcons name="logout" size={20} color="#6b7280" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome Back!</Text>
          <Text style={styles.welcomeSubtitle}>
            What would you like to create today?
          </Text>
        </View>

        {/* Feature Cards - Top Row */}
        <View style={styles.cardsRow}>
          {featureCards.slice(0, 2).map((card) => (
            <TouchableOpacity
              key={card.title}
              style={styles.featureCard}
              activeOpacity={0.7}
              onPress={() => card.route && router.push(card.route)}
            >
              <View
                style={[styles.featureIconContainer, { backgroundColor: card.bgColor }]}
              >
                <MaterialIcons name={card.icon} size={24} color={card.color} />
              </View>
              <Text style={styles.featureTitle}>{card.title}</Text>
              <Text style={styles.featureDescription}>{card.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Profile Card - Full Width */}
        <TouchableOpacity
          style={styles.featureCardFull}
          activeOpacity={0.7}
          onPress={() => featureCards[2].route && router.push(featureCards[2].route)}
        >
          <View
            style={[styles.featureIconContainer, { backgroundColor: featureCards[2].bgColor }]}
          >
            <MaterialIcons name={featureCards[2].icon} size={24} color={featureCards[2].color} />
          </View>
          <Text style={styles.featureTitle}>{featureCards[2].title}</Text>
          <Text style={styles.featureDescription}>{featureCards[2].description}</Text>
        </TouchableOpacity>

        {/* Quick Stats */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Quick Stats</Text>
          <View style={styles.statsGrid}>
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
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.primary,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  signOutText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#e5e7eb",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 32,
  },
  welcomeSection: {
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  cardsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  featureCard: {
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
  featureCardFull: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  featureIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 11,
    color: "#6b7280",
    lineHeight: 16,
  },
  statsCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "#6b7280",
    textAlign: "center",
  },
});
