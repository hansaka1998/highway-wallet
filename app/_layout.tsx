import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f1faee" }}>
      <SafeAreaProvider style={{ flex: 1, backgroundColor: "#f1faee" }}>
        <StatusBar backgroundColor="#f1faee" style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#f1faee" },
          }}
        />
      </SafeAreaProvider>
    </View>
  );
}
