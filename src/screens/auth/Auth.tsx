import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Formik, FormikProps } from "formik";
import React, { useCallback, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
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
  LoginValues,
  loginInitialValues,
  loginValidationSchema,
  SignupValues,
  signupInitialValues,
  signupValidationSchema,
} from "@/entity/user.entity";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);

  const toggleMode = useCallback(() => {
    const goingToSignup = isLogin;
    // Fade out + slide out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: goingToSignup ? -25 : 25,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsLogin((prev) => !prev);
      scrollRef.current?.scrollTo({ y: 0, animated: false });
      // Set entry position
      slideAnim.setValue(goingToSignup ? 25 : -25);
      // Fade in + slide in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [isLogin, fadeAnim, slideAnim]);

  const handleLogin = (values: LoginValues) => {
    if (values.email === "demo@imageai.com" && values.password === "demo123") {
      router.replace("/dashboard");
    } else {
      Alert.alert("Invalid Credentials", "Please use demo@imageai.com / demo123");
    }
  };

  const handleSignup = (values: SignupValues) => {
    if (values.email === "demo@imageai.com" && values.password === "demo123") {
      router.replace("/dashboard");
    } else {
      Alert.alert("Invalid Credentials", "Please use demo@imageai.com / demo123");
    }
  };

  const renderLoginForm = (formik: FormikProps<LoginValues>) => (
    <View>
      <BaseInput
        name="email"
        label="Email"
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        leftIcon={
          <MaterialIcons name="mail-outline" size={20} color="#9CA3AF" />
        }
      />
      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => router.push("/forgot-password")}
        activeOpacity={0.7}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <BaseInput
        name="password"
        label="Password"
        placeholder="********"
        secureTextEntry
        leftIcon={
          <MaterialIcons name="lock-outline" size={20} color="#9CA3AF" />
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
          <Text style={styles.submitText}>Sign In</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderSignupForm = (formik: FormikProps<SignupValues>) => (
    <View>
      <BaseInput
        name="fullName"
        label="Full Name"
        placeholder="Muhammad Jamil"
        autoCapitalize="words"
        leftIcon={
          <MaterialIcons name="person-outline" size={20} color="#9CA3AF" />
        }
      />
      <BaseInput
        name="email"
        label="Email"
        placeholder="demo@imageai.com"
        keyboardType="email-address"
        autoCapitalize="none"
        leftIcon={
          <MaterialIcons name="mail-outline" size={20} color="#9CA3AF" />
        }
      />
      <BaseInput
        name="password"
        label="Password"
        placeholder="********"
        secureTextEntry
        leftIcon={
          <MaterialIcons name="lock-outline" size={20} color="#9CA3AF" />
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
          <Text style={styles.submitText}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name="auto-awesome"
                size={28}
                color={Colors.white}
              />
            </View>
            <Text style={styles.appTitle}>ImageAI Studio</Text>
            <Text style={styles.appSubtitle}>
              Create and edit images with AI
            </Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateX: slideAnim }],
              }}
            >
              <Text style={styles.welcomeText}>
                {isLogin ? "Welcome Back" : "Create Account"}
              </Text>

              {/* Social Buttons */}
              <TouchableOpacity
                style={styles.googleButton}
                activeOpacity={0.7}
              >
                <Image
                  source={{ uri: "https://www.google.com/favicon.ico" }}
                  style={styles.googleIcon}
                />
                <Text style={styles.googleButtonText}>
                  Continue with Google
                </Text>
              </TouchableOpacity>

              {Platform.OS === "ios" && (
                <TouchableOpacity
                  style={styles.appleButton}
                  activeOpacity={0.7}
                >
                  <Ionicons name="logo-apple" size={18} color={Colors.white} />
                  <Text style={styles.appleButtonText}>
                    Continue with Apple
                  </Text>
                </TouchableOpacity>
              )}

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or continue with email</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Form */}
              {isLogin ? (
                <Formik
                  initialValues={loginInitialValues}
                  validationSchema={loginValidationSchema}
                  onSubmit={handleLogin}
                >
                  {renderLoginForm}
                </Formik>
              ) : (
                <Formik
                  initialValues={signupInitialValues}
                  validationSchema={signupValidationSchema}
                  onSubmit={handleSignup}
                >
                  {renderSignupForm}
                </Formik>
              )}

              {/* Toggle Link */}
              <View style={styles.toggleContainer}>
                <Text style={styles.toggleText}>
                  {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                </Text>
                <TouchableOpacity activeOpacity={0.7} onPress={toggleMode}>
                  <Text style={styles.toggleLink}>
                    {isLogin ? "Sign Up" : "Sign In"}
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
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
  header: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 20,
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
  appTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a2e",
  },
  appSubtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 4,
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
  welcomeText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: 12,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 9999,
    paddingVertical: 10,
    marginBottom: 10,
  },
  googleIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  googleButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.black,
  },
  appleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.black,
    borderRadius: 9999,
    paddingVertical: 10,
    marginBottom: 16,
  },
  appleButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.white,
    marginLeft: 8,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#e5e7eb",
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 13,
    color: "#9ca3af",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 12,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
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
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  toggleText: {
    fontSize: 14,
    color: "#6b7280",
  },
  toggleLink: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
  },
});
