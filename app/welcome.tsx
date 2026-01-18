import { View, Text, ImageBackground, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Welcome() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/welcome-bg.jpg")}
      style={{ flex: 1,
      width: "100%",
      height: "100%",
    }}
      resizeMode="cover"
    >
      {/* Dark overlay */}
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.55)",
          paddingHorizontal: 24,
          paddingTop: 80,
        }}
      >
        {/* TITLE (TOP) */}
        <View>
          <Text style={{ color: "white", fontSize: 36, fontWeight: "bold",textAlign: "center" }}>
            SMART
          </Text>
          <Text style={{ color: "white", fontSize: 36, fontWeight: "bold", textAlign: "center" }}>
            HIGHWAY
          </Text>
          <Text style={{ color: "white", fontSize: 36, fontWeight: "bold", textAlign: "center" }}>
            WALLET
          </Text>
        </View>

        {/* PUSH CONTENT TO BOTTOM */}
        <View style={{ flex: 1 }} />

        {/* DESCRIPTION (CENTER + SEEDED NEAR BUTTON) */}
        <View style={{ alignItems: "center", marginBottom: 70 }}>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "600",
              textAlign: "center",
              marginBottom: 6,
            }}
          >
            ALL-IN-ONE HIGHWAY COMPANION
          </Text>
          <Text
            style={{
              color: "#d1d5db",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            our digital gateway to cashless, safe, and smart expressway travel.
          </Text>
        </View>

        {/* GET IN BUTTON (BOTTOM) */}
        <Pressable onPress={() => router.replace("/login")}>
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
                marginBottom: 140,
                width: 180,
                alignSelf: "center",
              }}
            >
              
              <View
                style={{
                  backgroundColor: "#000",
                  borderRadius: 48,
                  paddingVertical: 16,
                  paddingHorizontal: 40,
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
                  GET IN
                </Text>
              </View>
            </LinearGradient>
          )}
        </Pressable>
      </View>
    </ImageBackground>
  );
}
