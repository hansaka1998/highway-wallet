import { View, Text, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pressed, setPressed] = useState(false);

  return (
    <LinearGradient
      colors={["#0f0f14", "#2a0a1f", "#0f0f14"]}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 24 }}>

        {/* Title */}
        <View style={{ marginTop: -80, marginBottom: 40 }}>
          <Text style={{ color: "white", fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
            LOG IN
          </Text>
        </View>

        {/* Email */}
        <View style={{ borderWidth: 2, borderColor: "#ff4d6d", borderRadius: 50, marginBottom: 20 }}>
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
            style={{paddingVertical: 14,
              paddingHorizontal: 20,
              color: "white",
              textAlign: "center",
              backgroundColor: "black",
              borderRadius: 50,
            }}
          />
        </View>

        {/* Password */}
        <View style={{ borderWidth: 2, borderColor: "#ff4d6d", borderRadius: 50, marginBottom: 12 }}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{
              paddingVertical: 14,
              paddingHorizontal: 20,
              color: "white",
              textAlign: "center",
              backgroundColor: "black",
              borderRadius: 50,
            }}
          />
        </View>

        {/* Error */}
        {error ? (
          <Text style={{ color: "red", textAlign: "center", marginBottom: 12 }}>
            {error}
          </Text>
        ) : null}

        {/* Forgot password */}
      <Pressable
        style={{ marginBottom: 30 }}
        onPress={() => router.push("/forgot-password")}
      >
        <Text style={{ color: "#9ca3af", textAlign: "center" }}>
          Forgot your Password?
        </Text>
      </Pressable>

        {/* LOGIN BUTTON (GRADIENT BORDER) */}
        <Pressable
          onPress={() => router.replace("/")}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
        >
          <LinearGradient
            colors={
              pressed
                ? ["#ff758f", "#ff006e", "#ff758f"]
                : ["#ff3b30", "#b0066b", "#ff3b30"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 50,
              padding: 2.5,
              marginBottom: 28,
            }}
          >
            <View
              style={{
                backgroundColor: "#000",
                borderRadius: 48,
                paddingVertical: 14,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                LOGIN
              </Text>
            </View>
          </LinearGradient>
        </Pressable>

        {/* Register */}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ color: "#9ca3af" }}>
            Don't have an account?{" "}
          </Text>
          <Pressable onPress={() => router.push("/register")}>
            <Text style={{ color: "#ff4d6d", fontWeight: "600" }}>
              Register Now
            </Text>
          </Pressable>
        </View>

      </View>
    </LinearGradient>
  );
}

