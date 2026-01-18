import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function ResetSuccess() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#0f0f14","#2a0a1f","#0f0f14"]} style={{ flex: 1 }}>
      <View style={{ flex:1, justifyContent:"center", alignItems:"center", paddingHorizontal: 24 }}>

        <Text style={{ color:"#22c55e", fontSize: 28, fontWeight:"bold", marginBottom:20, textAlign:"center" }}>
          Password Reset Successful!
        </Text>

        <Text style={{ color:"white", fontSize:16, marginBottom:40, textAlign:"center" }}>
          You can now login with your new password.
        </Text>

        <Pressable onPress={() => router.replace("/login")}>
          {({ pressed }) => (
            <LinearGradient
              colors={pressed ? ["#ff758f","#ff006e","#ff758f"] : ["#ff3b30","#b0066b","#ff3b30"]}
              start={{ x:0, y:0 }} end={{ x:1, y:1 }}
              style={{ borderRadius:50, padding:2.5 }}
            >
              <View style={{ backgroundColor:"#000", borderRadius:48, paddingVertical:14, paddingHorizontal:50 }}>
                <Text style={{ color:"white", fontWeight:"bold", fontSize:18, textAlign:"center" }}>
                  BACK TO LOGIN
                </Text>
              </View>
            </LinearGradient>
          )}
        </Pressable>

      </View>
    </LinearGradient>
  );
}
