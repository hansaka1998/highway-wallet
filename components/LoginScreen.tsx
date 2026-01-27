import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { auth } from "../firebaseConfig";
import { FormField } from "./FormField";

export default function LoginScreen() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const { email, password } = formData;
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // navigation layout එක මගින් සිදු කරයි
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#0b0b0f]"
    >
      <ScrollView contentContainerClassName="flex-grow justify-center px-8 py-10">
        <View className="mb-10 items-center">
          <Text className="text-3xl font-black uppercase tracking-[4px] text-white">
            Welcome Back
          </Text>
          <Text className="mt-2 text-center text-xs font-bold uppercase tracking-widest text-white/40">
            Login to access your HiWayPay wallet
          </Text>
        </View>

        <View className="space-y-4">
          <FormField
            icon="mail-outline"
            placeholder="Email Address"
            value={formData.email}
            onChangeText={(t) => setFormData({ ...formData, email: t })}
            autoCapitalize="none"
          />
          <FormField
            icon="lock-closed-outline"
            placeholder="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={(t) => setFormData({ ...formData, password: t })}
          />
        </View>

        <Pressable
          onPress={handleLogin}
          className="mt-10 h-16 overflow-hidden rounded-full"
          disabled={loading}
        >
          <LinearGradient
            colors={["#FF5F54", "#FF3B30"]}
            className="flex-1 items-center justify-center"
          >
            <Text className="text-sm font-black uppercase tracking-[4px] text-white">
              {loading ? "Logging In..." : "Login"}
            </Text>
          </LinearGradient>
        </Pressable>

        <Link href="/signup" asChild>
          <Pressable className="mt-8 self-center">
            <Text className="text-xs font-bold uppercase tracking-widest text-white/40">
              Don&apos;t have an account?{" "}
              <Text className="font-black text-white">Create One</Text>
            </Text>
          </Pressable>
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
