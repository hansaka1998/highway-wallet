import { View, Text, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function OTPScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#0f0f14","#2a0a1f","#0f0f14"]} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 24 }}>

        {/* TITLE */}
        <Text style={{ color: "white", fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 40 }}>
          ENTER OTP
        </Text>

        {/* OTP INPUT */}
        <TextInput
          placeholder="Enter 6-digit OTP"
          placeholderTextColor="#9ca3af"
          keyboardType="numeric"
          maxLength={6}
          style={{
            backgroundColor: "#000",
            color: "white",
            borderRadius: 16,
            paddingVertical: 16,
            paddingHorizontal: 24,
            textAlign: "center",
            marginBottom: 24,
            borderWidth: 2,
            borderColor: "#ff4d6d"
          }}
        />

        {/* VERIFY BUTTON */}
        <Pressable onPress={() => router.push("/reset-success")}>
          {({ pressed }) => (
            <LinearGradient
              colors={pressed ? ["#ff758f","#ff006e","#ff758f"] : ["#ff3b30","#b0066b","#ff3b30"]}
              start={{ x:0, y:0 }} end={{ x:1, y:1 }}
              style={{ borderRadius: 50, padding: 2.5, marginBottom: 16 }}
            >
              <View style={{ backgroundColor: "#000", borderRadius: 48, paddingVertical: 14 }}>
                <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 18 }}>
                  VERIFY OTP
                </Text>
              </View>
            </LinearGradient>
          )}
        </Pressable>

        {/* Resend Timer */}
        <Text style={{ color: "#9ca3af", textAlign: "center" }}>
          Resend OTP in 00:59
        </Text>

      </View>
    </LinearGradient>
  );
}

