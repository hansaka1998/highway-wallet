import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* StatusBar set background color to white */}
      <StatusBar backgroundColor="#ffffff" style="dark" />

      {/* Root navigator */}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#ffffff" },
        }}
      />
    </SafeAreaProvider>
  );
}
