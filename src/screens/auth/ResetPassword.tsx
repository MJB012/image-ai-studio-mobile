import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { Formik, FormikProps } from "formik";
import React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BaseInput from "@/components/base-input/BaseInput";
import { Colors } from "@/constants/theme";
import {
  ResetPasswordValues,
  resetPasswordInitialValues,
  resetPasswordValidationSchema,
} from "@/entity/user.entity";

export default function ResetPassword() {
  const { email, code } = useLocalSearchParams<{ email: string; code: string }>();

  const handleSubmit = (values: ResetPasswordValues) => {
    Alert.alert(
      "Success",
      "Your password has been reset successfully",
      [
        {
          text: "Sign In",
          onPress: () => router.replace("/login"),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <MaterialIcons name="arrow-back" size={24} color="#1a1a2e" />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="lock-outline" size={28} color={Colors.white} />
            </View>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              Create a new password for your account
            </Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Formik
              initialValues={resetPasswordInitialValues}
              validationSchema={resetPasswordValidationSchema}
              onSubmit={handleSubmit}
            >
              {(formik: FormikProps<ResetPasswordValues>) => (
                <View>
                  <BaseInput
                    name="new_password"
                    label="New Password"
                    placeholder="********"
                    secureTextEntry
                    leftIcon={
                      <MaterialIcons
                        name="lock-outline"
                        size={20}
                        color="#9CA3AF"
                      />
                    }
                  />
                  <BaseInput
                    name="confirm_password"
                    label="Confirm Password"
                    placeholder="********"
                    secureTextEntry
                    leftIcon={
                      <MaterialIcons
                        name="lock-outline"
                        size={20}
                        color="#9CA3AF"
                      />
                    }
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => formik.handleSubmit()}
                  >
                    <LinearGradient
                      colors={[Colors.primary, Colors.secondary]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.submitButton}
                    >
                      <Text style={styles.submitText}>Reset Password</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0ff",
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  backButton: {
    marginLeft: 20,
    marginTop: 8,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  header: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 20,
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a2e",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 20,
  },
  card: {
    marginHorizontal: 20,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  submitButton: {
    borderRadius: 9999,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 4,
  },
  submitText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
