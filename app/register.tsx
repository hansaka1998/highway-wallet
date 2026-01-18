import { View, Text, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    router.replace("/login");
  };

  return (
    <LinearGradient
      colors={["#0f0f14", "#2a0a1f", "#0f0f14"]}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 24 }}>

        {/* TITLE */}
        <View style={{ marginTop: -80, marginBottom: 40 }}>
          <Text style={{ color: "white", fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
            REGISTER
          </Text>
        </View>

        {/* NAME */}
        <View style={{ borderWidth: 2, borderColor: "#ff4d6d", borderRadius: 999, marginBottom: 16 }}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#9ca3af"
            value={name}
            onChangeText={setName}
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

        {/* EMAIL */}
        <View style={{ borderWidth: 2, borderColor: "#ff4d6d", borderRadius: 999, marginBottom: 16 }}>
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
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

        {/* PASSWORD */}
        <View style={{ borderWidth: 2, borderColor: "#ff4d6d", borderRadius: 999, marginBottom: 16 }}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
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

        {/* CONFIRM PASSWORD */}
        <View style={{ borderWidth: 2, borderColor: "#ff4d6d", borderRadius: 999, marginBottom: 12 }}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
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

        {/* ERROR */}
        {error ? (
          <Text style={{ color: "#ef4444", textAlign: "center", marginBottom: 12 }}>
            {error}
          </Text>
        ) : null}

        {/* REGISTER BUTTON */}
        <Pressable onPress={handleRegister}>
          {({ pressed }) => (
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
                marginBottom: 24,
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
                  REGISTER
                </Text>
              </View>
            </LinearGradient>
          )}
        </Pressable>

        {/* LOGIN LINK */}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ color: "#9ca3af" }}>
            Already have an account?{" "}
          </Text>
          <Pressable onPress={() => router.replace("/login")}>
            <Text style={{ color: "#ff4d6d", fontWeight: "600" }}>
              Login
            </Text>
          </Pressable>
        </View>

      </View>
    </LinearGradient>
  );
}
