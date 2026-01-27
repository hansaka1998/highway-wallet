import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth, db } from "../firebaseConfig";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm Password State
  const [fullName, setFullName] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Password පෙන්වීමට/සැඟවීමට
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    // Basic Validation
    if (!email || !password || !fullName || !emergencyContact) {
      Alert.alert("Error", "කරුණාකර සියලුම විස්තර ඇතුළත් කරන්න.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "මුරපද (Passwords) එකිනෙකට නොගැලපේ.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "මුරපදය අවම වශයෙන් අකුරු 6ක් විය යුතුය.");
      return;
    }

    setLoading(true);
    try {
      // 1. Firebase Auth හරහා User Create කිරීම
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // 2. Firestore හි 'users' collection එකට දත්ත ඇතුළත් කිරීම
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: fullName,
        email: email,
        "phone-number": emergencyContact, // ඔයාගේ DB එකේ ඇති නමට අනුව
        balance: 0, // ආරම්භක බැලන්ස් එක (standardized to 'balance')
        creditActive: false, // Credit status
        creditAmount: 0, // Amount owed from credit
        createdAt: new Date().toISOString(),
      });

      Alert.alert("Success", "ගිණුම සාර්ථකව සාදන ලදී!", [
        { text: "Continue", onPress: () => router.replace("/") },
      ]);
    } catch (error: any) {
      let errorMessage = "ලියාපදිංචි වීම අසාර්ථකයි.";
      if (error.code === "auth/email-already-in-use")
        errorMessage = "මෙම ඊමේල් ලිපිනය දැනටමත් භාවිතයේ පවතී.";
      Alert.alert("Signup Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#0b0b0f]"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-8 pb-10 pt-20">
          {/* Header */}
          <View className="mb-10">
            <Text className="text-4xl font-black tracking-tighter text-white">
              JOIN THE
            </Text>
            <Text className="text-4xl font-black tracking-tighter text-[#FF3B30]">
              FUTURE.
            </Text>
            <Text className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
              Create your secure account
            </Text>
          </View>

          {/* Form Fields */}
          <View className="space-y-4">
            {/* Full Name */}
            <View className="mb-4 flex-row items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-1">
              <MaterialCommunityIcons
                name="account-outline"
                size={20}
                color="white"
              />
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="rgba(255,255,255,0.2)"
                className="ml-3 h-12 flex-1 font-medium text-white"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            {/* Email */}
            <View className="mb-4 flex-row items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-1">
              <MaterialCommunityIcons
                name="email-outline"
                size={20}
                color="white"
              />
              <TextInput
                placeholder="Email Address"
                placeholderTextColor="rgba(255,255,255,0.2)"
                className="ml-3 h-12 flex-1 font-medium text-white"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password with Eye Icon */}
            <View className="mb-4 flex-row items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-1">
              <MaterialCommunityIcons
                name="lock-outline"
                size={20}
                color="white"
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.2)"
                className="ml-3 h-12 flex-1 font-medium text-white"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <MaterialCommunityIcons
                  name={showPassword ? "eye" : "eye-off"}
                  size={20}
                  color="rgba(255,255,255,0.5)"
                />
              </Pressable>
            </View>

            {/* Confirm Password */}
            <View className="mb-4 flex-row items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-1">
              <MaterialCommunityIcons
                name="lock-check-outline"
                size={20}
                color="white"
              />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="rgba(255,255,255,0.2)"
                className="ml-3 h-12 flex-1 font-medium text-white"
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            {/* Emergency Contact */}
            <View className="mb-6 flex-row items-center rounded-2xl border border-red-500/20 bg-white/5 px-4 py-1">
              <MaterialCommunityIcons
                name="phone-alert"
                size={20}
                color="#FF3B30"
              />
              <TextInput
                placeholder="Emergency Contact (e.g. 077...)"
                placeholderTextColor="rgba(255,255,255,0.2)"
                className="ml-3 h-12 flex-1 font-bold text-white"
                keyboardType="phone-pad"
                value={emergencyContact}
                onChangeText={setEmergencyContact}
              />
            </View>
          </View>

          {/* Signup Button */}
          <Pressable
            onPress={handleSignup}
            disabled={loading}
            className="mt-4 h-16 overflow-hidden rounded-full shadow-lg shadow-red-500/20"
          >
            <LinearGradient
              colors={["#FF5F54", "#FF3B30"]}
              className="flex-1 items-center justify-center"
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-sm font-black uppercase tracking-[4px] text-white">
                  Create Account
                </Text>
              )}
            </LinearGradient>
          </Pressable>

          {/* Login Link */}
          <View className="mt-8 flex-row justify-center">
            <Text className="font-bold text-white/40">
              ALREADY HAVE AN ACCOUNT?{" "}
            </Text>
            <Pressable onPress={() => router.push("/login")}>
              <Text className="font-black text-[#FF3B30] underline">
                LOG IN
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
