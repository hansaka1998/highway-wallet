import { View, Text, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <LinearGradient colors={["#0f0f14", "#2a0a1f", "#0f0f14"]} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 24 }}>

        {/* TITLE */}
        <Text style={{ color: "white", fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 40 }}>
          FORGOT PASSWORD
        </Text>

        {/* EMAIL INPUT */}
        <View style={{ borderWidth: 2, borderColor: "#ff4d6d", borderRadius: 999, marginBottom: 24 }}>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={{
              paddingVertical: 16,
              paddingHorizontal: 24,
              color: "white",
              textAlign: "center",
              backgroundColor: "#000",
              borderRadius: 999,
            }}
          />
        </View>

        {/* SEND RESET BUTTON */}
        <Pressable onPress={() => router.push("/otp-screen")}>
          {({ pressed }) => (
            <LinearGradient
              colors={pressed ? ["#ff758f","#ff006e","#ff758f"] : ["#ff3b30","#b0066b","#ff3b30"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={{ borderRadius: 50, padding: 2.5, marginBottom: 16 }}
            >
              <View style={{ backgroundColor: "#000", borderRadius: 48, paddingVertical: 14 }}>
                <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 18 }}>
                  SEND RESET LINK
                </Text>
              </View>
            </LinearGradient>
          )}
        </Pressable>

        {/* Back to Login */}
        <Pressable onPress={() => router.replace("/login")}>
          <Text style={{ color: "#ff4d6d", textAlign: "center", fontWeight: "600" }}>
            Back to Login
          </Text>
        </Pressable>

      </View>
    </LinearGradient>
  );
}

